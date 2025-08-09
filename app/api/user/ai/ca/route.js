import { CAQUESTIONS } from "@/lib/constants";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
// could you please rewrite the below prompt to generate latest current affairs questions?
// export async function GET() {
//   try {
//     const prompt = `
// Generate 100 multiple choice questions on current affairs.
// Return ONLY valid JSON array with the following structure:
// [
//   {
//     "question": "string",
//     "options": ["option1", "option2", "option3", "option4"],
//     "answer": "string (must be one of the options)",
//     "explanation": "string (max 50 words)"
//   }
// ]
// Rules:
// - Do NOT include any extra commentary or formatting.
// - All questions must be factually correct and from current events (last 6 months).
// - Keep questions concise.
// `;

//     const chatResponse = await openai.chat.completions.create({
//       model: "gpt-4o-mini", // Faster & cheaper than full GPT-4
//       messages: [
//         { role: "system", content: "You are a strict JSON generator for MCQ questions." },
//         { role: "user", content: prompt },
//       ],
//       temperature: 0.3, // Low randomness for consistency
//     });

//     const rawContent = chatResponse.choices[0]?.message?.content || "[]";

//     let questions;
//     try {
//       questions = JSON.parse(rawContent);
//     } catch (err) {
//       console.error("❌ JSON parsing failed", err);
//       return NextResponse.json(
//         { message: "Invalid JSON from GPT", rawContent },
//         { status: 500 }
//       );
//     }

//     return NextResponse.json({ questions }, { status: 200 });
//   } catch (error) {
//     console.error("❌ Error calling OpenAI:", error);
//     return NextResponse.json(
//       { message: "OpenAI SDK error", error: error.message },
//       { status: 500 }
//     );
//   }
// }

export async function GET() {
  try {
    async function insertMockTestWithQuestions(
      title,
      examCategoryId,
      questions
    ) {
      try {
        // 1️⃣ Create the mock test entry
        const mockTest = await prisma.mockTest.create({
          data: {
            title,
            examCategoryId,
            // testType defaults to DAILY per schema
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

          console.log(`   ➡️ Inserted Question ID ${questionRecord.id}`);
        }

        console.log("🎯 All questions inserted successfully!");
      } catch (err) {
        console.error("❌ Error inserting mock test data:", err);
      } finally {
        await prisma.$disconnect();
      }
    }

    const catest = await prisma.ExamCategory.findUnique({
      where: { slug: "current-affairs" },
    });

    await insertMockTestWithQuestions("Hello", 22, CAQUESTIONS);

    return NextResponse.json(
      { title: "Hello", id: 22, CAQUESTIONS },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error calling OpenAI:", error);
    return NextResponse.json(
      { message: "OpenAI SDK error", error: error.message },
      { status: 500 }
    );
  }
}
