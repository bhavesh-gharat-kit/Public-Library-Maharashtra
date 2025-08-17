// File: app/api/scrape-current-affairs/route.js (Next.js App Router)

import { NextResponse } from "next/server";
import * as cheerio from "cheerio";
import fs from "fs/promises";
import {
  handleCreateCurrentAffairsTest,
  insertQuestionsByCategory,
} from "@/lib/helperFunctionsServerSide";

const BASE_URL =
  "https://www.gktoday.in/quizbase/current-affairs-quiz-august-2025";

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) " +
    "AppleWebKit/537.36 (KHTML, like Gecko) " +
    "Chrome/114.0.0.0 Safari/537.36",
};

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getLastPage() {
  try {
    const res = await fetch(BASE_URL, { headers: HEADERS });
    const html = await res.text();
    const $ = cheerio.load(html);

    const pagination = $("ul.basic_quiz_pagination");
    if (!pagination.length) return 1;

    const pageNumbers = [];
    pagination.find("a").each((i, el) => {
      const num = parseInt($(el).text().trim());
      if (!isNaN(num)) pageNumbers.push(num);
    });

    return pageNumbers.length ? Math.max(...pageNumbers) : 1;
  } catch (err) {
    console.error("Error fetching first page for pagination info:", err);
    return 1;
  }
}

function cleanQuestionText(text) {
  text = text.trim();
  text = text.replace(/^\d+\.\s*/, ""); // remove leading numbers
  if (text.includes(". ")) text = text.split(". ")[1];
  return text;
}

async function parseQuizPage(pageNum) {
  const url = `${BASE_URL}?pageno=${pageNum}`;
  console.log(`Fetching page ${pageNum}: ${url}`);

  try {
    const res = await fetch(url, { headers: HEADERS });
    const html = await res.text();
    const $ = cheerio.load(html);

    const questions = [];

    $("div.sques_quiz").each((i, block) => {
      const questionDiv = $(block)
        .find("div.wp_quiz_question.testclass")
        .first();
      if (!questionDiv.length) return;

      let questionText = cleanQuestionText(questionDiv.text());

      const optionsDiv = $(block).find("div.wp_quiz_question_options").first();
      let options = [];
      if (optionsDiv.length) {
        let innerHTML = optionsDiv.html();
        let rawOptions = innerHTML.split("<br/>");
        if (rawOptions.length === 1) rawOptions = innerHTML.split("<br>");
        options = rawOptions
          .map((opt) => {
            opt = opt.trim();
            if (!opt) return null;
            if (opt.startsWith("[")) {
              const closePos = opt.indexOf("]");
              if (closePos !== -1) opt = opt.slice(closePos + 1).trim();
            }
            return opt;
          })
          .filter(Boolean);
      }

      let answer = "";
      let explanation = "";
      const answerBlock = $(block).find("div.wp_basic_quiz_answer").first();
      if (answerBlock.length) {
        const correctDiv = answerBlock.find("div.ques_answer").first();
        if (correctDiv.length) {
          let ansText = correctDiv.text().replace("Correct Answer:", "").trim();
          const match = ansText.match(/\[(.*)\]/);
          answer = match ? match[1].trim() : ansText.slice(1).trim();
        }

        const explDiv = answerBlock.find("div.answer_hint").first();
        if (explDiv.length) {
          explanation = explDiv.text().replace("Notes:", "").trim();
        }
      }

      questions.push({ question: questionText, options, answer, explanation });
    });

    return questions;
  } catch (err) {
    console.error(`Error fetching page ${pageNum}:`, err);
    return [];
  }
}

async function scrapeAllPages() {
  const allQuestions = [];
  const lastPage = await getLastPage();
  console.log(`Detected last page: ${lastPage}`);

  for (let pageNum = 1; pageNum <= lastPage; pageNum++) {
    const questions = await parseQuizPage(pageNum);
    allQuestions.push(...questions);
    await sleep(1000); // polite delay
  }

  return allQuestions;
}

async function saveToJson(data, filename = "quiz_data.json") {
  await fs.writeFile(filename, JSON.stringify(data, null, 2), "utf-8");
  console.log(`Saved ${data.length} questions to ${filename}`);
}

export async function generateCurrentAffairQuestions(examCategoryId) {
  console.log("scraping data from gktoday.in ...");
  const data = await scrapeAllPages();
  if (data.length < 5) {
    await insertQuestionsByCategory(examCategoryId, data);
  } else {
    console.log("no data found, generating from ai ...");
    await handleCreateCurrentAffairsTest();
  }
}
