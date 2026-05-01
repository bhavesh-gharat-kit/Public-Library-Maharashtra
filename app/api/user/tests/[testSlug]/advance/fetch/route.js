import { getYearMonthMap } from "@/lib/helperFunctionsServerSide";
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

    const monthsData = getYearMonthMap("2026-05-01");

    return NextResponse.json({
      testData: { examCategory, monthsData: monthsData },
    });
  } catch (error) {
    console.error("❌ Internal server error in fetch route:", error);
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
