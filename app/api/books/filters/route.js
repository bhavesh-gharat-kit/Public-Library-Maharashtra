import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const [years, subjects, publishers, authors, mediums, contentTypes] =
      await Promise.all([
        prisma.book.findMany({
          where: {
            yearOfPublication: { not: null },
          },
          distinct: ["yearOfPublication"],
          select: { yearOfPublication: true },
          orderBy: { yearOfPublication: "desc" },
        }),
        prisma.book.findMany({
          where: { subject: { not: null } },
          distinct: ["subject"],
          select: { subject: true },
          orderBy: { subject: "asc" },
        }),
        prisma.book.findMany({
          where: { publisher: { not: null } },
          distinct: ["publisher"],
          select: { publisher: true },
          orderBy: { publisher: "asc" },
        }),
        prisma.book.findMany({
          where: { author: { not: null } },
          distinct: ["author"],
          select: { author: true },
          orderBy: { author: "asc" },
        }),
        prisma.book.findMany({
          where: { medium: { not: null } },
          distinct: ["medium"],
          select: { medium: true },
          orderBy: { medium: "asc" },
        }),
        prisma.book.findMany({
          distinct: ["contentType"],
          select: { contentType: true },
        }),
      ]);

    const FiltersData = {
      yearOfPublication: years.map((item) => item.yearOfPublication),
      languages: mediums.map((item) => item.medium),
      subjects: subjects.map((item) => item.subject),
      publishers: publishers.map((item) => item.publisher),
      authors: authors.map((item) => item.author),
      contentTypes: contentTypes.map((item) => item.contentType),
    };

    return NextResponse.json({ success: true, data: FiltersData });
  } catch (error) {
    console.error("Error fetching filters:", error);
    return NextResponse.json(
      { error: "Failed to fetch filters" },
      { status: 500 }
    );
  }
}
