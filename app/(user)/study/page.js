"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Header, Footer } from "@/components";

export default function Page() {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [showQuestions, setShowQuestions] = useState(false);

  const questions = [
    {
      id: 1,
      question: "Which of these is a JavaScript framework?",
      options: ["Django", "Laravel", "React", "Spring Boot"],
      answer: "React",
      explanation: "React is a popular JavaScript library for building user interfaces.",
    },
    {
      id: 2,
      question: "What does CSS stand for?",
      options: [
        "Creative Style Sheets",
        "Cascading Style Sheets",
        "Computer Style Syntax",
        "Colorful Style System",
      ],
      answer: "Cascading Style Sheets",
      explanation: "CSS is used to style and layout web pages, and stands for Cascading Style Sheets.",
    },
    {
      id: 3,
      question: "Which HTML tag is used to link JavaScript?",
      options: ["<js>", "<javascript>", "<script>", "<link rel='js'>"],
      answer: "<script>",
      explanation: "The <script> tag is used in HTML to embed or reference JavaScript code.",
    },
    {
      id: 4,
      question: "Which of the following is NOT a programming language?",
      options: ["Python", "HTML", "Java", "C++"],
      answer: "HTML",
      explanation: "HTML is a markup language, not a programming language. It structures content on the web.",
    },
    {
      id: 5,
      question: "Which symbol is used for single-line comments in JavaScript?",
      options: ["//", "/* */", "#", "<!-- -->"],
      answer: "//",
      explanation: "In JavaScript, single-line comments begin with //.",
    },
  ];

  useEffect(() => {
    AOS.init({ once: true, duration: 200, easing: "ease-in-out" });
  }, []);

  return (
    <>
      

      <main className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Title */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800">📚 Study Mode</h1>
            <p className="text-sm text-gray-500 mt-1">
              5 Questions to strengthen your basics
            </p>
          </div>

          {/* Language Select + Start */}
          {!showQuestions && (
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Preferred Language
                </label>
                <select
                  name="selectedlang"
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="w-full border border-gray-300 rounded px-4 py-2 text-sm focus:ring-2 focus:ring-green-400"
                >
                  <option value="" disabled>
                    -- Choose Language --
                  </option>
                  <option value="hindi">Hindi</option>
                  <option value="english">English</option>
                </select>
              </div>

              <div className="flex justify-end gap-4">
                <button
                  className="px-5 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
                >
                  Back
                </button>
                <button
                  onClick={() => {
                    if (selectedLanguage) {
                      setShowQuestions(true);
                    } else {
                      alert("Please select a language first");
                    }
                  }}
                  className="px-5 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
                >
                  Study
                </button>
              </div>
            </div>
          )}

          {/* MCQ Section */}
          {showQuestions && (
            <div className="space-y-6 mt-8">
              {questions.map((q) => (
                <div
                  key={q.id}
                  className="bg-white border border-gray-200 p-6 rounded-xl shadow hover:shadow-lg transition-all"
                  data-aos="fade-up"
                >
                  <p className="text-lg font-semibold text-gray-800 mb-3">
                    Q{q.id}. {q.question}
                  </p>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {q.options.map((opt, i) => (
                      <li
                        key={i}
                        className={`px-4 py-2 rounded-md border text-sm ${
                          opt === q.answer
                            ? "bg-green-100 text-green-800 border-green-300"
                            : "bg-gray-50 text-gray-700 border-gray-200"
                        }`}
                      >
                        {opt}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-gray-600 italic border-t pt-2">
                    💡 <span className="font-medium">Explanation:</span>{" "}
                    {q.explanation}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
