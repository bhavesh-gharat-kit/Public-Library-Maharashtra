import { getRandomItems } from "@/lib/helperFunctionsServerSide";
import prisma from "@/lib/prisma";

// app/api/pdf-proxy/route.js
export async function GET(request) {
  try {
    const test = await prisma.MockTest.findFirst({
      include: { questions: { include: { options: true, answer: true } } },
      where: { id: Number(159) },
    });

    test.questions = getRandomItems(test.questions, 15);
    

//     const questions = await prisma.$queryRaw`
//   SELECT * FROM mock_tests_questions
//   WHERE mockTestId = ${test.id}
//   ORDER BY RAND()
//   LIMIT 15
// `;


    return new Response(JSON.stringify({ test }));
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
