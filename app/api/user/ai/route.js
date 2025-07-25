import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET() {
  try {
    const chatResponse = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: "Say hello and tell me a joke." },
      ],
      temperature: 0.7,
    });

    const reply = chatResponse.choices[0]?.message?.content || "No response";
    console.log("✅ GPT-4 reply:", reply);

    return NextResponse.json({ chatResponse }, { status: 200 });
  } catch (error) {
    console.error("❌ Error calling GPT-4 via SDK:", error);
    return NextResponse.json(
      { message: "OpenAI SDK error", error: error.message },
      { status: 500 }
    );
  }
}
