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
    // Months in JS are 0-based: Jan = 0, Jul = 6
    const startOfMonth = new Date(year, month - 1, 1);
    const endOfMonth = new Date(year, month, 0);

    const tests = await prisma.MockTest.findMany({
      where: {
        examCategoryId: examCategory.id,
        createdAt: { gte: startOfMonth, lt: endOfMonth },
      },
    });

    return NextResponse.json({ tests });
  } catch (error) {
    console.error("❌ Internal server error in fetch route:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
