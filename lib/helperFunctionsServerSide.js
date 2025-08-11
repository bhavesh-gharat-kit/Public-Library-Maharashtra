import OpenAI from "openai";

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

  await insertMockTestWithQuestions(
    "Current Affair Daily Test",
    categoryId,
    questions
  );

  return questions;
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
export const getIBookPromptO = (bookData, contentType) => {
  if (!bookData || !contentType) return "";

  // Helper to format book metadata safely
  const formatMeta = ({
    title,
    author,
    language,
    subject,
    publisher,
    publicationYear,
    pdfLink,
  }) =>
    `
Book: ${title || "N/A"}
Author: ${author || "N/A"}
Language: ${language || "N/A"}
Subject: ${subject || "N/A"}
Publisher: ${publisher || "N/A"}
Year: ${publicationYear || "N/A"}
PDF: ${pdfLink || "N/A"}
  `.trim();

  const meta = formatMeta(bookData);

  // Template definitions – easily extendable
  const templates = {
    summary: ({ meta }) =>
      `
${meta}

Task: Write a concise syllabus-focused summary for each chapter (150–200 words each). 
Highlight only core concepts and key points useful for academic understanding. 
Use headings per chapter.
    `.trim(),

    notes: ({ meta }) =>
      `
${meta}

Task: List exam-focused notes in bullet points. 
Include only facts, formulas, definitions, and explanations most likely to be asked in exams. 
Keep each point short and precise.
    `.trim(),

    revisionNotes: ({ meta }) =>
      `
${meta}

Task: Create ultra-short revision notes in point form for quick recall before exams. 
Use keywords and concise phrases only. No long sentences.
    `.trim(),

    commonMistakes: ({ meta }) =>
      `
${meta}

Task: List common mistakes students make with this subject based on the book. 
For each, explain briefly the correct approach. Keep list practical and syllabus-relevant.
    `.trim(),

    studyTricks: ({ meta }) =>
      `
${meta}

Task: Suggest practical study tricks to master this subject. 
Include mnemonics, diagrams, memory aids, and tips that align with the book’s content.
    `.trim(),

    definitions: ({ meta }) =>
      `
${meta}

Task: List accurate definitions of key terms and core concepts from the book. 
Each definition should be 1–2 lines and clear enough for quick learning.
    `.trim(),

    suggestedVideos: ({ meta }) =>
      `
${meta}

Task: Recommend relevant high-quality YouTube or educational videos to complement the book. 
Include title, short description, and the video link.
    `.trim(),
  };

  // Look up template and render
  const generator = templates[contentType];
  return generator ? generator({ meta }) : "";
};

export const getIBookPrompt = (bookData, contentType) => {
  if (!bookData || !contentType) return "";

  // Helper to format book metadata in Markdown
  const formatMeta = ({
    title,
    author,
    language,
    subject,
    publisher,
    publicationYear,
    pdfLink,
  }) =>
    `
**Book:** ${title || "N/A"}  
**Author:** ${author || "N/A"}  
**Language:** ${language || "N/A"}  
**Subject:** ${subject || "N/A"}  
**Publisher:** ${publisher || "N/A"}  
**Year:** ${publicationYear || "N/A"}  
**PDF:** ${pdfLink ? `[Download PDF](${pdfLink})` : "N/A"}  
`.trim();

  const meta = formatMeta(bookData);

  // Template definitions – Markdown-enabled
  const templates = {
    summary: ({ meta }) =>
      `
${meta}

**Task:** Write a concise syllabus-focused summary for each chapter.  
- Limit to 150–200 words per chapter.  
- Highlight only **core concepts** and **key points** useful for academic understanding.  
- Use proper Markdown headings:  
  - \`# Chapter Title\` for chapters  
  - \`## Subheading\` for sections  
- Use bullet points for lists.  
- Keep formatting clean for direct rendering in a web app.
`.trim(),

    notes: ({ meta }) =>
      `
${meta}

**Task:** List **exam-focused notes** in bullet points.  
- Include only **facts**, **formulas**, **definitions**, and **explanations** most likely to be asked in exams.  
- Keep each point short and precise.  
- Use bullet points (\`-\`) in Markdown format.  
- Use **bold** for important terms.
`.trim(),

    revisionNotes: ({ meta }) =>
      `
${meta}

**Task:** Create ultra-short **revision notes** for quick recall before exams.  
- Use concise keywords and phrases only (no long sentences).  
- Format as bullet points in Markdown (\`-\`).  
- Highlight key terms in **bold**.
`.trim(),

    commonMistakes: ({ meta }) =>
      `
${meta}

**Task:** List **common mistakes** students make in this subject.  
- For each, use a bullet point with the **mistake** in bold, followed by a short explanation of the correct approach.  
- Keep practical and syllabus-relevant.
`.trim(),

    studyTricks: ({ meta }) =>
      `
${meta}

**Task:** Suggest practical **study tricks** to master this subject.  
- Use bullet points.  
- Include **mnemonics**, diagrams (described in text), memory aids, and tips aligned with the book’s content.  
- Use **bold** for key ideas.
`.trim(),

    definitions: ({ meta }) =>
      `
${meta}

**Task:** List accurate definitions of **key terms** and **core concepts**.  
- Each definition should be 1–2 lines.  
- Format as a bullet point: \`- **Term:** Definition\`.  
- Keep Markdown formatting clean.
`.trim(),

    mcq: ({ meta }) =>
      `
${meta}

**Task:** Create multiple-choice questions (MCQs) from the book's content.  
- 4 options per question (A, B, C, D)  
- Only one correct answer per question  
- Highlight the correct answer in **bold** at the end of each question.  
- Keep questions syllabus-relevant and fact-based.  
- Format:  
  1. Question text  
     - A) Option 1  
     - B) Option 2  
     - C) Option 3  
     - D) Option 4  
     **Answer:** B) Correct Option
`.trim(),

    questionPaper: ({ meta }) =>
      `
${meta}

**Task:** Generate an exam-style question paper from the book’s content.  
- Include **Section A (Short Questions)** and **Section B (Long Questions)**.  
- 5–10 questions in each section.  
- Use clear numbering and syllabus relevance.  
- Avoid giving answers — only list questions.
`.trim(),

    questionAnswer: ({ meta }) =>
      `
${meta}

**Task:** Create a set of exam-style questions **with answers** from the book's content.  
- Include both short and long-form questions.  
- Provide concise, accurate answers after each question.  
- Format in Markdown with \`Q:\` and \`A:\` labels.  
- Keep language simple and precise for students.
`.trim(),

    suggestedVideos: ({ meta }) =>
      `
${meta}

You are tasked with recommending relevant, high-quality YouTube or educational videos.  
Follow these rules strictly:  
1. For each video, include:  
   - Title in **bold** (Markdown bold format)  
   - Short description in plain text (1–2 sentences)  
   - Markdown link to the video in the format: "[Watch here](URL){:target="_blank"}" so the link opens in a new tab.  
2. Use bullet points for all entries.  
3. Always include the video link; do not omit it.  
4. Do not include extra commentary or sections; only the bullet points with the required info.
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

async function insertMockTestWithQuestions(title, examCategoryId, questions) {
  try {
    // 1️⃣ Create the mock test entry
    const mockTest = await prisma.mockTest.create({
      data: {
        title,
        examCategoryId,
        date: new Date(), // optional
      },
    });

    console.log(`✅ Created MockTest: ${mockTest.id}`);

    // 2️⃣ Loop through each question
    for (const q of questions) {
      // Create question
      const questionRecord = await prisma.mockTestQuestion.create({
        data: {
          mockTestId: mockTest.id,
          question: q.question,
        },
      });

      // Create options
      const optionRecords = [];
      for (const optText of q.options) {
        const option = await prisma.mockTestOption.create({
          data: {
            questionId: questionRecord.id,
            text: optText,
          },
        });
        optionRecords.push(option);
      }

      // Find correct option (case-insensitive match)
      const correctOption = optionRecords.find(
        (o) => o.text.trim().toLowerCase() === q.answer.trim().toLowerCase()
      );

      if (!correctOption) {
        console.warn(
          `⚠️ No matching correct option for question: ${q.question}`
        );
        continue;
      }

      // Create answer entry
      await prisma.mockTestAnswer.create({
        data: {
          questionId: questionRecord.id,
          optionId: correctOption.id,
          explanation: q.explanation || "",
        },
      });
    }

    console.log("🎯 All questions inserted successfully!");
  } catch (err) {
    console.error("❌ Error inserting mock test data:", err);
  } finally {
    await prisma.$disconnect();
  }
}
