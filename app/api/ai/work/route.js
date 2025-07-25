// import { NextResponse } from "next/server";
// import OpenAI from "openai";
// import fs from "fs/promises";
// import path from "path";

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// const topicsFilePath = path.join(process.cwd(), "data", "topics.json");
// const outputDir = path.join(process.cwd(), "data", "subtopics");

// async function fileExists(filePath) {
//   try {
//     await fs.access(filePath);
//     return true;
//   } catch {
//     return false;
//   }
// }

// async function generateSubtopicsForTopic(topicName) {
//   const prompt = `
// You are an expert academic assistant.

// Generate a list of 365 unique subtopics for the subject "${topicName}".
// These subtopics should comprehensively cover beginner, intermediate, and advanced level topics relevant to Indian competitive exams and academic boards.

// Return ONLY a JSON array of strings like this:

// [
//   "Kinematics: Displacement and Velocity",
//   "Newton's Second Law of Motion",
//   ...
// ]
// Do NOT include any explanations or extra text.
// `;

//   const chatResponse = await openai.chat.completions.create({
//     model: "gpt-4",
//     messages: [
//       {
//         role: "system",
//         content: "You are a helpful assistant that returns JSON only.",
//       },
//       { role: "user", content: prompt },
//     ],
//     temperature: 0.3,
//     max_tokens: 4000,
//   });

//   return chatResponse.choices[0]?.message?.content?.trim();
// }

// export async function GET() {
//   try {
//     // Ensure subtopics folder exists
//     await fs.mkdir(outputDir, { recursive: true });

//     const rawData = await fs.readFile(topicsFilePath, "utf-8");
//     const topics = JSON.parse(rawData);

//     let successCount = 0;
//     let skippedCount = 0;

//     for (const topic of topics) {
//       const jsonPath = path.join(outputDir, `${topic.name}.json`);
//       const rawPath = path.join(outputDir, `${topic.name}.raw.json`);

//       if ((await fileExists(jsonPath)) || (await fileExists(rawPath))) {
//         console.log(`⏭️ Skipping ${topic.name} (already exists)`);
//         skippedCount++;
//         continue;
//       }

//       console.log(`🚀 Generating subtopics for: ${topic.name}`);
//       const rawOutput = await generateSubtopicsForTopic(topic.name);

//       try {
//         // Try parsing cleaned JSON
//         let fixed = rawOutput;
//         fixed = fixed.replace(/,\s*([\]}])/g, "$1");
//         fixed = fixed.slice(fixed.indexOf("["));

//         const subTopics = JSON.parse(fixed);

//         await fs.writeFile(
//           jsonPath,
//           JSON.stringify(
//             {
//               id: topic.id,
//               name: topic.name,
//               subTopics,
//             },
//             null,
//             2
//           ),
//           "utf-8"
//         );
//         console.log(`✅ Saved: ${topic.name} (${subTopics.length} subtopics)`);
//         successCount++;
//       } catch (err) {
//         console.error(`❌ Parse failed: ${topic.name}`);
//         await fs.writeFile(
//           rawPath,
//           JSON.stringify(
//             {
//               id: topic.id,
//               name: topic.name,
//               subTopics: rawOutput,
//             },
//             null,
//             2
//           ),
//           "utf-8"
//         );

//         console.log(`📝 Raw output saved for ${topic.name}`);
//       }
//     }

//     return NextResponse.json(
//       {
//         message: "Completed subtopic generation.",
//         generated: successCount,
//         skipped: skippedCount,
//         total: topics.length,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("❌ API route error:", error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }