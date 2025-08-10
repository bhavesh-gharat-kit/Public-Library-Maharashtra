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

export const handleCreateCurrentAffairsTest = async () => {};

import OpenAI from "openai";

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

async function generateCurrentAffairsQuestions(count = 100, monthsBack = 6) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not set");
  }

  const prompt = `
Generate ${count} multiple-choice questions on current affairs from the last ${monthsBack} months up to today’s date.
Return ONLY valid JSON array with the following structure:
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

  return questions;
}

// utils/getBookPrompt.js
export const getIBookPrompt = (bookData, contentType) => {
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
