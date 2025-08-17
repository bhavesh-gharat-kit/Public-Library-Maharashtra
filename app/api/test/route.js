// File: app/api/scrape-current-affairs/route.js (Next.js App Router)

import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import fs from "fs/promises";
import {
  convertBigIntToString,
  insertQuestionsByCategory,
} from "@/lib/helperFunctionsServerSide";

export async function GET() {
  try {
    const needed = 5;

    const data = await prisma.$queryRaw`
  SELECT 
    q.id              AS questionId,
    q.question        AS questionText,
    q.examCategoryId  AS categoryId,

    o.id              AS optionId,
    o.text            AS optionText,

    a.id              AS answerId,
    a.optionId        AS correctOptionId,
    a.explanation     AS explanation

  FROM exam_category_questions q
  JOIN mock_tests_options o
    ON q.id = o.questionId
  LEFT JOIN mock_tests_answers a
    ON q.id = a.questionId

  WHERE q.examCategoryId = ${1}
  ORDER BY RAND()
  LIMIT ${needed};
`;

    // then fetch options/answer for ids OR join if columns separate

    return NextResponse.json({
      success: true,
      data: convertBigIntToString(data),
    });
    return NextResponse.json({ success: true, total: data.length });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ success: false, error: err.message });
  }
}
