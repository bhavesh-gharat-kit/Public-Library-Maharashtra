import prisma from "@/lib/prisma";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 120000, // 120s (in ms)
  maxRetries: 3, // retry on failure
});

export const addToLog = (type, content) => {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, "0");
  const mm = String(now.getMonth() + 1).padStart(2, "0");
  const yyyy = now.getFullYear();
  const dateStr = `${dd}-${mm}-${yyyy}`;
  const timestamp = now.toISOString();

  const logDir = path.join(process.cwd(), "logs", type || "general");
  const logFile = path.join(logDir, `${dateStr}_log.txt`);
  const lockFile = logFile + ".lock";
  const logEntry = `[${timestamp}] ${JSON.stringify(
    formatErrorContent(content)
  )}\n`;
  // const logEntry = `[${timestamp}] ${content}\n`;

  // Ensure directory exists
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  // Simple lock mechanism
  while (fs.existsSync(lockFile)) {
    // Wait until lock is released
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 100); // waits ~100ms
  }

  try {
    // Create lock
    fs.writeFileSync(lockFile, "locked", "utf8");

    // Read existing content if any
    let existingContent = "";
    if (fs.existsSync(logFile)) {
      existingContent = fs.readFileSync(logFile, "utf-8");
    }

    // Write new content (prepend)
    fs.writeFileSync(logFile, logEntry + existingContent, "utf-8");
  } finally {
    // Release lock
    fs.unlinkSync(lockFile);
  }
};

export const handleCreateCurrentAffairsTest = async (
  categoryId,
  count = 100,
  monthsBack = 6
) => {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set");
  }

  const prompt = `
Generate ${count} multiple-choice questions on current affairs from the last ${monthsBack} months up to today’s date.
Do not mention month/year. Return ONLY valid JSON array with the following structure:
[
  {
    "question": "string",
    "options": ["option1", "option2", "option3", "option4"],
    "answer": "string (must be one of the options)",
    "explanation": "string (max 50 words)"
  }
]
Rules:
- Output only the JSON array, with no extra commentary, markdown, or formatting.
- All questions must be factually correct, based on reliable current events sources.
- The “question” should be concise and clearly related to recent events (last ${monthsBack} months).
- The “answer” must exactly match one of the “options”.
- “explanation” must be a short factual statement (max 50 words).
`;

  const chatResponse = await openai.chat.completions.create({
    model: "gpt-4o-mini", // Faster & cheaper than full GPT-4
    messages: [
      {
        role: "system",
        content: "You are a strict JSON generator for MCQ questions.",
      },
      { role: "user", content: prompt },
    ],
    temperature: 0.3,
  });

  const rawContent = chatResponse.choices[0]?.message?.content || "[]";

  let questions;
  try {
    questions = JSON.parse(rawContent);
  } catch (err) {
    throw new Error(`Invalid JSON from GPT: ${err.message}`);
  }

  // Basic shape validation
  if (!Array.isArray(questions)) {
    throw new Error("Generated content is not an array");
  }

  for (const q of questions) {
    if (
      typeof q.question !== "string" ||
      !Array.isArray(q.options) ||
      q.options.length !== 4 ||
      typeof q.answer !== "string" ||
      typeof q.explanation !== "string"
    ) {
      throw new Error("Invalid question format detected");
    }
  }

  await insertQuestionsByCategory(categoryId, questions);

  return questions;
};

export const generateFromPrompt = async (prompt, options = {}) => {
  try {
    const {
      model = "gpt-3.5-turbo",
      temperature = 0.3,
      systemMessage = "You are a helpful assistant who always follows the prompt exactly.",
    } = options;

    const chatResponse = await openai.chat.completions.create({
      model,
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: prompt },
      ],
      temperature,
    });

    const rawContent = chatResponse.choices[0]?.message?.content?.trim();

    if (!rawContent) {
      throw new Error("No content returned from OpenAI.");
    }

    return rawContent;
  } catch (error) {
    console.error("❌ Error generating content from OpenAI:", error);
    throw new Error(error.message || "Failed to generate content from OpenAI.");
  }
};

// utils/getBookPrompt.js
export const getIBookPrompt = (bookData, contentType) => {
  if (!bookData || !contentType) return "";

  // Helper to normalize language
  const getIBookBaseContext = (bookData = {}, extra = {}) => {
    const {
      title,
      author,
      language,
      subject,
      publisher,
      publicationYear,
      pdfLink,
    } = bookData || {};

    const normalizeLanguage = (lang) => {
      if (!lang) return "English";
      const l = String(lang).toLowerCase();
      if (["en", "eng", "english"].includes(l)) return "English";
      if (["hi", "hin", "hindi", "हिंदी"].includes(l)) return "Hindi";
      return String(lang); // fall back to whatever user stored
    };

    const outLang = normalizeLanguage(language);

    const meta = `**Book:** ${title || "N/A"}  
**Author:** ${author || "N/A"}  
**Language (target output):** ${outLang}  
**Subject:** ${subject || "N/A"}  
**Publisher:** ${publisher || "N/A"}  
**Year:** ${publicationYear || "N/A"}  
**PDF:** ${pdfLink ? `[Link](${pdfLink})` : "N/A"}`;

    // You can tweak audience/grade once you know it
    const audience =
      extra.audience ||
      "students preparing for exams (secondary/undergrad level)";

    return `
${meta}

**Role:** You are an expert teacher and exam-setter for **${
      subject || "this subject"
    }**.  
**Audience:** Write for ${audience}.  
**Source of truth:** Use only information that can reasonably come from the provided book/pages.  
**Language:** Write **strictly in ${outLang}**. Do not mix languages or translate unless asked.  
**Output format:** **Markdown only**. No HTML, no code fences, no pre/post “assistant” chatter.  
**Heading rules:** Use at most \`#\`, \`##\`, and \`###\`. Keep headings concise.  
**Lists:** Use \`- \` for bullets, \`1.\` for numbered lists. Keep each bullet ≤ 2 lines where possible.  
**Style:** Clear, syllabus-focused, exam-oriented, concise. Avoid fluff and repetition.  
**Facts & honesty:** If the book excerpt doesn’t contain enough info to answer a part, write:  
"*Not enough information in the provided content.*" Do **not** invent facts.  
**Math/terms:** Use plain text (Markdown). If you need formulas, keep them simple.  
**Length control:** Follow length limits given in the task. If none are given, keep it succinct.  
**No extras:** Do **not** add disclaimers, references, or unrelated commentary. Output only the requested content.
`.trim();
  };

  // const meta = formatMeta(bookData);
  const meta = getIBookBaseContext(bookData);

  // Template definitions – Markdown-enabled
  const templates = {
    summary: ({ meta }) =>
      `
${meta}

**Task:** Generate a clear, academic-style summary for each chapter of the book. Follow these rules strictly:

### Style & Tone
- Language: ${bookData.language}
- Writing style: Academic, syllabus-focused, concise, and factual.
- Audience: Students preparing for exams.

### Content Rules
- Length: 150–200 words per chapter.
- Focus only on: 
  - Core concepts  
  - Definitions  
  - Formulas  
  - Key points relevant for exams
- Avoid:
  - Narratives or storytelling
  - Opinions or subjective commentary
  - Redundant or filler content

### Formatting Rules
- Use Markdown strictly:
  - \`# Chapter {Number}: {Title}\` as main heading.
  - Logical subheadings such as \`## Key Points\` or \`## Concepts\`.
  - Bullet points (\`-\`) for listing important ideas.
  - Bold important terms, formulas, and concepts.
- Keep formatting minimal, clean, and ready for direct rendering in a web app.

### Output Requirement
Return a **structured Markdown document**, organized **chapter by chapter**, with no extra notes, explanations, or commentary outside the summaries.


`.trim(),

    notes: ({ meta }) =>
      `
    ${meta}

**Task:** Generate **exam-focused revision notes** ONLY from the given book content. Follow these rules strictly.  

### Style & Tone
- Language: ${bookData.language}
- Writing style: Academic, syllabus-focused, concise, and factual.
- Audience: Students preparing for exams.

### Content Rules:
- Do NOT repeat: "Not enough information", "Author not available", "Year not specified".
- Focus on:
  - **Definitions**
  - **Formulas / Equations**
  - **Important facts**
  - **Core concepts**
- Avoid:
  - Extra commentary
  - Metadata repetition
  - Long explanations or filler

### Formatting Rules:
- Use Markdown strictly:
  - \`# Chapter {Number}: {Title}\` as main heading
  - \`## Revision Notes\` → subheading
  - Bullet points (\`-\`) → each point one line
  - **Bold** for keywords, terms, formulas
- Keep formatting minimal, clean, and ready for direct rendering in a web app.

### Output Requirement:
Return a **structured Markdown document** organized **by bullet points** — no metadata, no disclaimers, no "not available" text.
    `.trim(),

    revisionNotes: ({ meta }) =>
      `
    ${meta}

**Task:** Generate **exam-focused revision notes** ONLY from the given book content. Follow these rules strictly.  

### Style & Tone
- Language: ${bookData.language}
- Writing style: Academic, syllabus-focused, concise, and factual.
- Audience: Students preparing for exams.

### Content Rules:
- Do NOT repeat: "Not enough information", "Author not available", "Year not specified".
- Focus on:
  - **Definitions**
  - **Formulas / Equations**
  - **Important facts**
  - **Core concepts**
- Avoid:
  - Extra commentary
  - Metadata repetition
  - Long explanations or filler

### Formatting Rules:
- Use Markdown strictly:
  - \`# Chapter {Number}: {Title}\` as main heading
  - \`## Revision Notes\` → subheading
  - Bullet points (\`-\`) → each point one line
  - **Bold** for keywords, terms, formulas
- Keep formatting minimal, clean, and ready for direct rendering in a web app.

### Output Requirement:
Return a **structured Markdown document** organized **by bullet points** — no metadata, no disclaimers, no "not available" text.
`.trim(),

    commonMistakes: ({ meta }) =>
      `
${meta}

**Task:** Generate a clear, syllabus-focused list of **common mistakes students make** in this subject, and explain the correct approach.  

### Style & Tone
- Language: ${bookData.language}
- Writing style: Academic, syllabus-focused, concise, and factual.
- Audience: Students preparing for exams.

### Content Rules:
- Keep all points **directly exam-relevant**.
- For each mistake:
  - State the **mistake** in **bold**.
  - Immediately follow with the **correct concept / approach** in plain text.
- Keep explanations **short, factual, and corrective** (not narrative or opinionated).
- Avoid repeating: "Not available", "Not enough information", or other placeholders.

### Formatting Rules:
- Use Markdown strictly:
  - \`# Common Mistakes\` → main heading
  - Bullet points (\`-\`) → each mistake + correction
  - **Bold** → for the incorrect part
  - / Use plain text for corrections (1–2 lines max)

### Output Requirement:
Return ONLY the **list of common mistakes with corrections**, in Markdown, with no extra commentary or metadata.
`.trim(),

    studyTricks: ({ meta }) =>
      `
    ${meta}

**Task:** Generate practical, syllabus-aligned **study tricks** to help students master this subject.  

 ### Style & Tone
 - Language: ${bookData.language}
 - Writing style: Academic, syllabus-focused, concise, and factual.
 - Audience: Students preparing for exams.
    
### Content Rules:
- Content must be **strictly based on the book/syllabus concepts** (not generic motivation).  
- Focus on techniques that improve **memory retention, recall speed, and exam performance**.  
- Include:
  - **Mnemonics** (short, easy-to-remember phrases or acronyms).  
  - **Memory aids** (visual or logical associations).  
  - **Diagram descriptions** (describe diagrams in text so students can sketch them).  
  - **Quick revision hacks** (shortcuts for recalling formulas, definitions, or sequences).  
- Keep each trick short (1–3 lines max).  
- Avoid storytelling, unnecessary theory, or filler content.  
    
### Formatting Rules:
- Use Markdown strictly:  
  - \`# Study Tricks\` → main heading  
  - Bullet points (\`-\`) → each trick  
  - **Bold** for mnemonics, keywords, or formulas  
  - Use *( )* to explain a mnemonic or diagram briefly  
    
### Output Requirement:
Return ONLY the **list of study tricks** in Markdown, no extra commentary or metadata.
    `.trim(),

    definitions: ({ meta }) =>
      `
${meta}

**Task:** List accurate **definitions of key terms and core concepts** from this subject.  

### Style & Tone
Language: ${bookData.language}
Writing style: Academic, syllabus-focused, concise, and factual.
Audience: Students preparing for exams.

### Content Rules:
- Each definition should be **1–2 concise lines**, no filler.  
- Definitions must be **precise, syllabus-relevant, and exam-ready** (avoid vague explanations).  
- Prioritize terms that are **core to understanding the subject**.  
- Use only information that can be derived from the book/syllabus.  
- No generic or invented terms outside the subject.  

### Formatting Rules:
- Use Markdown strictly:
  - Heading: \`# Key Definitions & Concepts\`  
  - Bullet points: \`- **Term:** Definition\`  
  - Keep spacing neat, no extra commentary  

### Output Requirement:
Return ONLY the **list of definitions** in Markdown.
`.trim(),

    mcq: ({ meta }) =>
      `
${meta}

**Task:** Generate syllabus-relevant **multiple-choice questions (MCQs)** from the book’s content.  

### Style & Tone
- Language: ${bookData.language}
- Writing style: Academic, syllabus-focused, concise, and factual.
- Audience: Students preparing for exams.

### Content Rules:
- Each question must have **exactly 4 options (A–D)**.  
- Only **one correct answer** per question.  
- Questions should be **fact-based, exam-oriented, and directly tied to the subject matter**.  
- Avoid vague or opinion-based questions.  
- Do not repeat questions.  

### Formatting Rules:
- Heading: \`# Multiple-Choice Questions\`  
- Numbered questions (1, 2, 3, …).  
- Options formatted as:
  - A) Option 1  
  - B) Option 2  
  - C) Option 3  
  - D) Option 4  
- Correct answer indicated clearly at the end in **bold**:  
  \`**Answer:** B) Option text\`  

### Output Requirement:
Return ONLY the MCQs in clean Markdown format.
`.trim(),

    questionPaper: ({ meta }) =>
      `
${meta}

**Task:** Generate an **exam-style question paper** ONLY from the given book content. Follow these rules strictly.  

### Style & Tone
- Language: ${bookData.language}
- Writing style: Academic, syllabus-focused, clear, and exam-oriented.
- Audience: Students preparing for exams.

### Content Rules:
- Structure the paper into **two sections**:
  - **Section A: Short Questions** (5–10 concise questions)
  - **Section B: Long Questions** (5–10 descriptive/analytical questions)
- Ensure questions are **syllabus-relevant** and cover **core concepts**.
- Do NOT provide answers or hints — only list questions.
- Avoid repetition, filler, or commentary.

### Formatting Rules:
- Use Markdown strictly:
  - \`# Question Paper\` as main heading
  - \`## Section A: Short Questions\` → subheading
  - \`## Section B: Long Questions\` → subheading
  - Numbered list (\`1.\`, \`2.\`, …) for each question
- Keep formatting minimal, clean, and ready for direct rendering in a web app.

### Output Requirement:
Return a **structured Markdown document** with **clear numbering** under each section — no metadata, no disclaimers, no answers.
`.trim(),

    questionAnswer: ({ meta }) =>
      `
${meta}

**Task:** Generate a set of **exam-style questions with answers** ONLY from the given book content. Follow these rules strictly.  

### Style & Tone
- Language: ${bookData.language}
- Writing style: Academic, syllabus-focused, clear, and exam-oriented.
- Audience: Students preparing for exams.

### Content Rules:
- Include both **short-form** and **long-form** questions.
- Each question must be followed by its **concise, accurate answer**.
- Focus answers on **definitions, formulas, facts, and core concepts**.
- Avoid commentary, repetition, or extra explanation beyond what is necessary.

### Formatting Rules:
- Use Markdown strictly:
  - \`# Questions with Answers\` as main heading
  - Numbered list (\`1.\`, \`2.\`, …) for questions
  - Each item formatted as:
    - \`**Q:** {Question}\`
    - \`**A:** {Answer}\`
- Keep formatting minimal, clean, and ready for direct rendering in a web app.

### Output Requirement:
Return a **structured Markdown document** with **numbered questions and answers** — no metadata, no disclaimers.
    `.trim(),

    suggestedVideos: ({ meta }) =>
      `
    ${meta}

    **Task:** Recommend relevant, high-quality YouTube or educational videos.  
    
    ### Rules (Follow Strictly)
    1. Each entry must contain:  
       - **Title** in Markdown bold (\`**Title**\`)  
       - A short, factual description (1–2 sentences only)  
       - A **working YouTube link** in Markdown format:  
         \`[Watch here](URL){:target="_blank"}\`  
    
    2. Use bullet points (\`-\`) for all entries.  
    3. Always include the **exact video link** (never omit or invent).  
    4. Do **not** add any extra commentary, intros, or sections outside the bullet points.  
    5. Keep formatting clean, ready to render in a web app.  
    
    ### Output Requirement
    Return only the **list of videos in Markdown bullet points** with title, description, and link.
    `.trim(),
  };

  // Look up template and render
  const generator = templates[contentType];
  return generator ? generator({ meta }) : "";
};

export function getRandomItems(arr, count) {
  return arr
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .slice(0, count)
    .map(({ item }) => item);
}

export async function insertQuestionsByCategory(examCategoryId, questions) {
  try {
    console.log(`Inserting questions for ExamCategory ID: ${examCategoryId}`);

    for (const q of questions) {
      // 1️⃣ Create question linked to examCategoryId
      const questionRecord = await prisma.examCategoryQuestion.create({
        data: {
          examCategoryId,
          question: q.question,
          options: {
            create: q.options.map((optText) => ({ text: optText })),
          },
        },
        include: {
          options: true, // so we can get option IDs immediately
        },
      });

      // 2️⃣ Find the correct option by text match (case-insensitive)
      const correctOption = questionRecord.options.find(
        (o) => o.text.trim().toLowerCase() === q.answer.trim().toLowerCase()
      );

      if (!correctOption) {
        console.warn(
          `⚠️ No matching correct option for question: ${q.question}`
        );
        continue; // skip creating answer if no match
      }

      // 3️⃣ Create answer record
      await prisma.mockTestAnswer.create({
        data: {
          questionId: questionRecord.id,
          optionId: correctOption.id,
          explanation: q.explanation || "",
        },
      });

      console.log(`✅ Inserted question: "${q.question}"`);
    }

    console.log("🎯 All questions inserted successfully!");
  } catch (err) {
    console.error("❌ Error inserting questions:", err);
  } finally {
    await prisma.$disconnect();
  }
}

export function getYearMonthMap(startDate) {
  const start = new Date(startDate);
  const end = new Date();
  const yearMonthMap = new Map();

  let current = new Date(start.getFullYear(), start.getMonth(), 1);

  while (current <= end) {
    const year = current.getFullYear();
    const month = current.getMonth();

    if (!yearMonthMap.has(year)) {
      yearMonthMap.set(year, []);
    }
    if (!yearMonthMap.get(year).includes(month)) {
      yearMonthMap.get(year).push(month);
    }

    current.setMonth(current.getMonth() + 1);
  }

  // Sort years descending, months ascending
  const sortedMap = new Map(
    [...yearMonthMap.entries()]
      .sort((a, b) => b[0] - a[0])
      .map(([year, months]) => [year, months.sort((a, b) => a - b)])
  );

  // Convert Map back to plain object while preserving order
  const sorted = Object.fromEntries(sortedMap);

  return sorted;
}

export function getDatesForMonth(monthYear) {
  const [monthStr, yearStr] = monthYear.split("-");
  const month = parseInt(monthStr, 10) - 1; // JS months 0-indexed
  const year = parseInt(yearStr, 10);

  const startOfMonth = new Date(year, month, 1);
  const endOfMonth = new Date(year, month + 1, 0); // last day of month
  const today = new Date();
  const minDate = new Date(2025, 7, 11); // 2025-08-11

  const dates = [];
  let id = 1;

  for (
    let d = new Date(endOfMonth);
    d >= startOfMonth;
    d.setDate(d.getDate() - 1)
  ) {
    if (d < minDate || d > today) continue;
    dates.push({ id: id++, date: d.toLocaleDateString("en-GB") });
  }

  return dates;
}

export function getTodayISTDate() {
  const now = new Date();
  // Convert to IST
  const istOffset = 5.5 * 60; // minutes
  const localOffset = now.getTimezoneOffset(); // in minutes
  const diff = (istOffset + localOffset) * 60 * 1000;
  return new Date(now.getTime() + diff).toISOString().split("T")[0];
}

export const convertBigIntToString = (obj) => {
  return JSON.parse(
    JSON.stringify(obj, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
};
