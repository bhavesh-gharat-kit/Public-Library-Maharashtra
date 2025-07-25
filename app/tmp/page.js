// pages/api/test-summary.js
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // === STEP 1: Set your uploaded file ID here ===
    const fileId = "file-KfxmBDW4NkJTAngBhzoznN"; // replace with your uploaded file ID

    // === STEP 2: Create vector store and upload file ===
    const vectorStore = await openai.vectorStores.create({
      name: "Book Summary Vector Store",
    });

    const fileBatch = await openai.vectorStores.fileBatches.uploadAndPoll({
      vectorStoreId: vectorStore.id,
      files: [{ file_id: fileId }],
    });

    console.log("✅ File batch status:", fileBatch.status);

    // === STEP 3: Create assistant with file_search ===
    const assistant = await openai.beta.assistants.create({
      name: "Book Summarizer",
      instructions:
        "You are a helpful assistant. Summarize the book chapter-wise in clean JSON format.",
      model: "gpt-4o",
      tools: [{ type: "file_search" }],
      tool_resources: {
        file_search: { vector_store_ids: [vectorStore.id] },
      },
    });

    // === STEP 4: Create thread and add user prompt ===
    const thread = await openai.beta.threads.create({
      messages: [
        {
          role: "user",
          content:
            "Summarize the book chapter-wise in JSON format like: { \"chapter_1\": { \"title\": \"...\", \"summary\": \"...\" }, ... }",
        },
      ],
    });

    // === STEP 5: Run assistant ===
    const run = await openai.beta.threads.runs.create({
      assistant_id: assistant.id,
      thread_id: thread.id,
    });

    // Poll for completion
    let runStatus;
    do {
      await new Promise((r) => setTimeout(r, 2000));
      runStatus = await openai.beta.threads.runs.retrieve({
        thread_id: thread.id,
        run_id: run.id,
      });
    } while (runStatus.status !== "completed");

    // === STEP 6: Get messages ===
    const messages = await openai.beta.threads.messages.list({
      thread_id: thread.id,
    });

    const summary = messages.data?.[0]?.content?.[0]?.text?.value || "No summary found.";

    return res.status(200).json({ summary });

  } catch (error) {
    console.error("❌ Error:", error);
    return res.status(500).json({ error: error.message || "Something went wrong." });
  }
}
