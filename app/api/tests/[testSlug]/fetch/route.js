import { NextResponse } from "next/server";

export async function POST(request, context) {
  try {
    const {testSlug} = await context.params;

    if (!testSlug) {
      console.error("❌ testSlug is missing in route params");
      return NextResponse.json(
        { message: "Missing testSlug" },
        { status: 400 }
      );
    }

    let body = {};
    try {
      body = await request.json(); // ✅ catch bad JSON body
    } catch (err) {
      console.error("❌ Invalid JSON in request body");
      return NextResponse.json(
        { message: "Invalid or missing JSON body" },
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
      questionRange,
    } = body || {};

    // Debug logs (safe to remove in prod)
    console.log("✅ Received testSlug:", testSlug);
    console.log("🧾 User settings:", {
      language,
      timer,
      gameSound,
      questionMode,
      questionCount,
      questionRange,
    });

    // Dummy full question bank (simulate as DB)
    const allQuestions = [
      {
        question: "Who is the current Chief Minister of Maharashtra?",
        options: [
          "Devendra Fadnavis",
          "Uddhav Thackeray",
          "Eknath Shinde",
          "Sharad Pawar",
        ],
        correctAnswer: 2,
      },
      {
        question: "Which country hosted the G20 Summit in 2023?",
        options: ["India", "USA", "Japan", "Indonesia"],
        correctAnswer: 0,
      },
      {
        question: "What is the name of India’s third moon mission?",
        options: [
          "Chandrayaan-1",
          "Chandrayaan-2",
          "Chandrayaan-3",
          "Mangalyaan",
        ],
        correctAnswer: 2,
      },
      {
        question:
          "Which Indian state launched the ‘Mukhyamantri Seekho-Kamao Yojana’?",
        options: ["Madhya Pradesh", "Bihar", "Uttar Pradesh", "Rajasthan"],
        correctAnswer: 0,
      },
      {
        question: "Who won the Nobel Peace Prize in 2023?",
        options: [
          "Volodymyr Zelenskyy",
          "Narges Mohammadi",
          "Greta Thunberg",
          "Malala Yousafzai",
        ],
        correctAnswer: 1,
      },
      {
        question: "Which bank recently merged with HDFC Ltd?",
        options: ["ICICI Bank", "Axis Bank", "HDFC Bank", "SBI"],
        correctAnswer: 2,
      },
      {
        question: "Which city will host the Summer Olympics in 2028?",
        options: ["Paris", "Los Angeles", "Tokyo", "Brisbane"],
        correctAnswer: 1,
      },
      {
        question: "Which Indian state is the largest producer of solar energy?",
        options: ["Gujarat", "Rajasthan", "Tamil Nadu", "Karnataka"],
        correctAnswer: 1,
      },
      {
        question: "India's first indigenous aircraft carrier is called?",
        options: ["INS Vikrant", "INS Virat", "INS Arihant", "INS Chakra"],
        correctAnswer: 0,
      },
      {
        question:
          "Which planet is the target of ISRO's 'Shukrayaan-1' mission?",
        options: ["Mars", "Venus", "Jupiter", "Mercury"],
        correctAnswer: 1,
      },
      {
        question: "Which film won Best Picture at the Oscars 2023?",
        options: [
          "Top Gun: Maverick",
          "Avatar: The Way of Water",
          "Everything Everywhere All at Once",
          "The Fabelmans",
        ],
        correctAnswer: 2,
      },
      {
        question: "Which Indian city has the largest metro rail network?",
        options: ["Delhi", "Bengaluru", "Mumbai", "Hyderabad"],
        correctAnswer: 0,
      },
      {
        question:
          "Which organization released the ‘World Economic Outlook 2024’?",
        options: ["UNESCO", "World Bank", "IMF", "WTO"],
        correctAnswer: 2,
      },
      {
        question: "Which Indian state topped the SDG India Index 2023?",
        options: ["Kerala", "Punjab", "Himachal Pradesh", "Tamil Nadu"],
        correctAnswer: 0,
      },
      {
        question: "What is India's rank in the Global Innovation Index 2023?",
        options: ["25th", "40th", "46th", "52nd"],
        correctAnswer: 2,
      },
    ];

    // Select questions based on mode
    let selectedQuestions = [...allQuestions];

    if (questionMode === "limited") {
      if (questionCount) {
        selectedQuestions = selectedQuestions.slice(0, questionCount);
      } else if (questionRange?.from && questionRange?.to) {
        selectedQuestions = selectedQuestions.slice(
          questionRange.from - 1,
          questionRange.to
        );
      }
    }

    // Final debug log
    console.log(
      `📦 Returning ${selectedQuestions.length} questions for test: ${testSlug}`
    );

    return NextResponse.json({
      testSlug,
      language,
      timer,
      gameSound,
      questions: selectedQuestions,
    });
  } catch (error) {
    console.error("❌ Internal server error in fetch route:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
