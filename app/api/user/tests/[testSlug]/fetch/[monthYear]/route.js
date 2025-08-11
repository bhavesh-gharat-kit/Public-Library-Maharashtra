import { handleCreateCurrentAffairsTest } from "@/lib/helperFunctionsServerSide";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request, context) {
  try {
    const { testSlug, monthYear } = await context.params;

    if (!testSlug || !monthYear) {
      console.error("❌ testSlug/monthYear is missing in route params");
      return NextResponse.json(
        { message: "Missing testSlug/monthYear" },
        { status: 400 }
      );
    }

    const examCategory = await prisma.ExamCategory.findFirst({
      where: { slug: testSlug },
    });

    if (!examCategory) {
      return NextResponse.json({ message: "No test found" }, { status: 404 });
    }

    const [month, year] = monthYear.split("-").map(Number);
    const now = new Date();

    const startOfMonth = new Date(year, month - 1, 1, 0, 0, 0, 0);
    let endDate;

    const isCurrentMonthYear =
      year === now.getFullYear() && month - 1 === now.getMonth();

    if (isCurrentMonthYear) {
      endDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        23,
        59,
        59,
        999
      );
    } else {
      endDate = new Date(year, month, 0, 23, 59, 59, 999);
    }

    const tests = await prisma.MockTest.findMany({
      where: {
        examCategoryId: examCategory.id,
        createdAt: { gte: startOfMonth, lte: endDate },
      },
    });

    // ✅ If current month/year and today's test not found → generate it
    if (isCurrentMonthYear) {
      const todayStart = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        0,
        0,
        0,
        0
      );

      const todayTest = tests.find(
        (t) => t.createdAt >= todayStart && t.createdAt <= endDate
      );

      if (!todayTest) {
        console.log(
          "ℹ No test found for today, generating current affairs quiz..."
        );
        await handleCreateCurrentAffairsTest(examCategory.id, 100, 6);
        // Optionally re-fetch after creating
        const updatedTests = await prisma.MockTest.findMany({
          where: {
            examCategoryId: examCategory.id,
            createdAt: { gte: startOfMonth, lte: endDate },
          },
        });
        return NextResponse.json({ tests: updatedTests });
      }
    }

    return NextResponse.json({ tests });
  } catch (error) {
    console.error("❌ Internal server error in fetch route:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
