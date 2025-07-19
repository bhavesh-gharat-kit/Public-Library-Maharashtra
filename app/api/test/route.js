import { MONTHS } from '@/lib/constatns';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';



export async function GET() {
  try {
    const currentAffairsCategory = await prisma.examCategory.findFirst({
      where: {
        slug: 'current-affairs',
      },
    });

    if (!currentAffairsCategory) {
      return NextResponse.json({ error: 'Current Affairs category not found' }, { status: 404 });
    }

    const tests = await prisma.mockTest.findMany({
      where: {
        examCategoryId: currentAffairsCategory.id,
      },
      select: {
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const result = {};

    for (const test of tests) {
      const date = new Date(test.createdAt);
      const year = date.getFullYear().toString();
      const monthName = MONTHS[date.getMonth()];

      if (!result[year]) {
        result[year] = [];
      }

      if (!result[year].includes(monthName)) {
        result[year].push(monthName);
      }
    }

    Object.keys(result).forEach((year) => {
      result[year].sort((a, b) => MONTHS.indexOf(a) - MONTHS.indexOf(b));
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching months:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
