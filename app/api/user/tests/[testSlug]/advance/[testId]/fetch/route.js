import prisma from "@/lib/prisma";
import {
  convertBigIntToString,
  getRandomItems,
} from "@/lib/helperFunctionsServerSide";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

export async function POST(request, context) {
  try {
    const { testSlug, testId } = await context.params;
    let body = await request.json();

    if (!testSlug || !testId) {
      console.error("❌ testSlug/testId is missing in route params");
      return NextResponse.json(
        { message: "Missing testSlug/testId", success: false },
        { status: 400 }
      );
    }

    const examCategory = await prisma.ExamCategory.findUnique({
      where: { slug: testSlug },
    });

    // Destructure user settings with fallback
    const {
      language = "en",
      timer = "60secs",
      gameSound = false,
      questionMode = "full",
      questionCount,
    } = body || {};

    //  Fetch questions based on examCategoryId
    // Special case: if testType is DAILY, fetch only today's current affairs
    const isCurrentAffair = testSlug === "current-affairs";

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const endOfToday = new Date();
    endOfToday.setHours(23, 59, 59, 999);

    let whereClause = Prisma.sql`WHERE q.examCategoryId = ${examCategory.id} AND q.source = 'AIGENERATED'`;
    if (isCurrentAffair) {
      whereClause = Prisma.sql`${whereClause} AND q.currentAffairsDate > ${startOfToday}`;
    }

    // Step 1: Fetch questions (with answers)
    const questionRows = await prisma.$queryRaw`
SELECT 
  q.id              AS questionId,
  q.question        AS questionText,
  q.examCategoryId  AS categoryId,
  q.currentAffairsDate,

  a.id              AS answerId,
  a.questionId      AS answerQuestionId,
  a.optionId        AS correctOptionId,
  a.explanation     AS explanation

FROM exam_category_questions q
LEFT JOIN mock_tests_answers a
  ON q.id = a.questionId
 ${whereClause}
ORDER BY RAND()
LIMIT 15;
`;


    // Build base questions object
    const questionsMap = {};
    questionRows.forEach((r) => {
      questionsMap[r.questionId] = {
        id: r.questionId,
        examCategoryId: r.categoryId,
        question: r.questionText,
        currentAffairsDate: r.currentAffairsDate,
        options: [], // will be filled later
        answer: r.answerId
          ? {
            id: r.answerId,
            questionId: r.answerQuestionId,
            optionId: r.correctOptionId,
            explanation: r.explanation,
          }
          : null,
      };
    });

    // Step 2: Fetch options for only those questions
    const questionIds = Object.keys(questionsMap).map(Number);

    if (questionIds.length) {
      const optionRows = await prisma.MockTestOption.findMany({
        where: {
          questionId: { in: questionIds },
        },
        select: {
          id: true,
          text: true,
          questionId: true,
        },
      });

      // Attach options to corresponding question
      optionRows.forEach((opt) => {
        if (questionsMap[opt.questionId]) {
          questionsMap[opt.questionId].options.push({
            id: opt.id,
            text: opt.text,
          });
        }
      });
    }

    let questions = Object.values(questionsMap);
    if (questionMode === "limited" && questionCount) {
      questions = questions.slice(0, questionCount);
    }

    if (!questions || questions.length === 0) {
      return NextResponse.json(
        { message: "No questions found for this test", success: false },
        { status: 404 }
      );
    }

    const toScoreMoreBooks = await prisma.$queryRaw`
    SELECT 
      *
    FROM suggested_books
    WHERE examCategoryId = ${examCategory?.id}
    ORDER BY RAND()
    LIMIT 4;
    `;

    return NextResponse.json({
      testSlug,
      language,
      timer,
      gameSound,
      toScoreMoreBooks: convertBigIntToString(toScoreMoreBooks),
      questions: convertBigIntToString(questions),
      testData: {
        id: testId,
        title: "Daily Quiz",
        testType: "Daily",
      },
    });
  } catch (error) {
    console.error("❌ Internal server error in fetch route:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
