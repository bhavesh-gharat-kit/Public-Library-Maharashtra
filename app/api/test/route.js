import {
  getRandomItems,
  insertMockTestWithQuestions,
} from "@/lib/helperFunctionsServerSide";
import prisma from "@/lib/prisma";

// app/api/pdf-proxy/route.js
export async function GET(request) {
  try {
    let q = [
      {
        question: "What is the primary definition of income in accounting?",
        options: [
          "Revenue generated from sales",
          "Total assets minus liabilities",
          "Net profit after taxes",
          "Cash inflows from financing activities",
        ],
        answer: "Revenue generated from sales",
        explanation:
          "Income is primarily defined as the revenue generated from the sale of goods or services.",
      },
    ];

    // let test = insertMockTestWithQuestions("CA Foundation daily test", 2, q);

    return new Response(JSON.stringify({ test }));
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
