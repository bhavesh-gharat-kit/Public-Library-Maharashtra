import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  try {
    const { testSlug } = await context.params;

    if (!testSlug) {
      console.error("❌ testSlug is missing in route params");
      return NextResponse.json(
        { message: "Missing testSlug" },
        { status: 400 }
      );
    }

    const examCategory = await prisma.ExamCategory.findFirst({
      where: { slug: testSlug },
    });

    if (!examCategory) {
      return NextResponse.json({ message: "No test found" }, { status: 404 });
    }

    const now = new Date();

    const todayEnd = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      23,
      59,
      59,
      999
    );

    const monthYears = (
      await prisma.$queryRaw`
      SELECT DISTINCT 
        YEAR(createdAt) AS year,
        MONTH(createdAt) - 1 AS month
      FROM mock_tests
      WHERE examCategoryId = ${examCategory.id}
      AND createdAt < ${todayEnd}
      ORDER BY year DESC, month ASC;
    `
    ).map((row) => ({
      year: Number(row.year),
      month: Number(row.month),
    }));

    const monthData = monthYears.reduce((acc, { year, month }) => {
      if (!acc[year]) acc[year] = [];
      acc[year].push(month);
      return acc;
    }, {});

    // ✅ Special case: "current-affairs" → Ensure current month is included
    if (testSlug === "current-affairs") {
      const currentYear = now.getFullYear();
      const currentMonth = now.getMonth(); // already 0-indexed

      if (!monthData[currentYear]) {
        monthData[currentYear] = [];
      }
      if (!monthData[currentYear].includes(currentMonth)) {
        monthData[currentYear].push(currentMonth);

        // keep months sorted ascending
        monthData[currentYear].sort((a, b) => a - b);
      }
    }

    return NextResponse.json({
      testData: { examCategory, monthsData: monthData },
    });
  } catch (error) {
    console.error("❌ Internal server error in fetch route:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
