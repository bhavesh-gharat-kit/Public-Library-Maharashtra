import { NextResponse } from "next/server";

export async function POST(request, context) {
  try {
    const { testSlug, testId } = await context.params;
    let body = await request.json();

    if (!testSlug || !testId) {
      console.error("❌ testSlug/testId is missing in route params");
      return NextResponse.json(
        { message: "Missing testSlug" },
        { status: 400 }
      );
    }

    // Destructure user settings with fallback
    const {
      language = "en",
      timer = "60secs",
      gameSound = false,
      questionMode = "full",
      questionCount,
    } = body || {};

    const data = await prisma.MockTest.findFirst({
      include: { questions: { include: { options: true, answer: true } } },
      where: { id: Number(testId) },
    });

    if (!data) {
      if(testSlug=="current-affairs"){
        await handleCreateCurrentAffairsTest();
      }
      return NextResponse.json({ message: "No test found" }, { status: 400 });
    }

    // Select questions based on mode
    let selectedQuestions = [...data.questions];

    if (questionMode === "limited") {
      if (questionCount) {
        selectedQuestions = selectedQuestions.slice(0, questionCount);
      }
    }

    return NextResponse.json({
      testSlug,
      language,
      timer,
      gameSound,
      questions: selectedQuestions,
      testData: { ...data, questions: undefined },
    });
  } catch (error) {
    console.error("❌ Internal server error in fetch route:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
