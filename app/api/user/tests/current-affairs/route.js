import { generateCurrentAffairQuestions } from "@/lib/generateDailyCurrentAffairQuiz";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // 1. Find the Current Affairs category (assuming slug = "current-affairs")
    const currentAffairsCategory = await prisma.examCategory.findUnique({
      where: { slug: "current-affairs" },
    });

    if (!currentAffairsCategory) {
      console.log("Current affairs category not found...");
      return NextResponse.json(
        { success: false, message: "Current Affairs category not found" },
        { status: 404 }
      );
    }

    // Get today's date in YYYY-MM-DD (ignore time)
    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

    // 2. Try to find today's Current Affairs test
    let todaysCAQuiz = await prisma.mockTest.findFirst({
      where: {
        examCategoryId: currentAffairsCategory.id,
        createdAt: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    // 3. If not found, create one
    if (!todaysCAQuiz) {
      console.log("Today's current affair quiz not found...");
      await generateCurrentAffairQuestions(currentAffairsCategory.id);

      todaysCAQuiz = await prisma.mockTest.create({
        data: {
          title: `Current Affairs - ${startOfDay.toLocaleDateString("en-IN")}`,
          testType: "DAILY",
          date: new Date(), // today's date
          examCategoryId: currentAffairsCategory.id,
        },
      });
    }

    // 4. Return testId
    return NextResponse.json({
      success: true,
      testId: todaysCAQuiz.id,
    });
  } catch (error) {
    console.error("❌ Internal server error in fetch route:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}