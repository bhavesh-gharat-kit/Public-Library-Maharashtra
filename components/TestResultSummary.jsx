"use client";

import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";
import {
  CheckCircleIcon,
  ClipboardListIcon,
  ClockIcon,
  Pencil,
  XCircleIcon,
  BookOpen,
  ExternalLink,
  IndianRupee,
} from "lucide-react";
import React, { useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { LatexRenderer } from "@/components";

const COLORS = ["#4ade80", "#f87171", "#fde68a"]; // green, red, yellow

const TestResultSummary = ({ testData, answers, remainingTime }) => {
  const [showAnswers, setShowAnswers] = useState(false);
  const [expanded, setExpanded] = useState({}); // keeps track of which questions are expanded

  const toggleExplanation = (idx) => {
    setExpanded((prev) => ({
      ...prev,
      [idx]: !prev[idx],
    }));
  };

  const toScoreMoreBooks = testData?.toScoreMoreBooks || [];
  const totalQuestions = testData.questions.length;
  const attempted = answers.filter((a) => a !== null).length;
  const correct = testData.questions.reduce((acc, q, idx) => {
    return (
      acc +
      (Number(q.options[answers[idx]]?.id) == Number(q.answer?.optionId)
        ? 1
        : 0)
    );
  }, 0);
  const wrong = attempted - correct;
  const unanswered = totalQuestions - attempted;

  const scorePercent = ((correct / totalQuestions) * 100).toFixed(1);

  const pieData = [
    { name: "Correct", value: correct },
    { name: "Wrong", value: wrong },
    { name: "Unanswered", value: unanswered },
  ];

  const totalSeconds = parseInt(testData.timer.match(/\d+/)?.[0] || "0", 10);
  const timeTaken = totalSeconds - (remainingTime ?? 0);

  const statsData = [
    {
      label: "Total Questions",
      value: totalQuestions,
      icon: <ClipboardListIcon className="w-8 h-8 text-indigo-500 mx-auto" />,
    },
    {
      label: "Attempted",
      value: attempted,
      icon: <Pencil className="w-8 h-8 text-indigo-400 mx-auto" />,
    },
    {
      label: "Correct",
      value: correct,
      icon: <CheckCircleIcon className="w-8 h-8 text-green-600 mx-auto" />,
      valueColor: "text-green-700",
    },
    {
      label: "Wrong",
      value: wrong,
      icon: <XCircleIcon className="w-8 h-8 text-red-600 mx-auto" />,
      valueColor: "text-red-700",
    },
    {
      label: "Unanswered",
      value: unanswered,
      icon: (
        <QuestionMarkCircledIcon className="w-8 h-8 text-yellow-500 mx-auto" />
      ),
      valueColor: "text-yellow-600",
    },
    {
      label: "Time Taken",
      value: `${Math.floor(timeTaken / 60)}m ${timeTaken % 60}s`,
      icon: <ClockIcon className="w-8 h-8 text-indigo-600 mx-auto" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl p-3 md:p-6 space-y-6">
        {/* Summary Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-700 mb-2">
            🎉 Test Completed!
          </h2>
          <p className="text-gray-600 text-lg">
            Your Score: <span className="font-semibold">{scorePercent}%</span>
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto px-4 py-6">
          {statsData.map(({ label, value, icon, valueColor }, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center bg-white shadow-md rounded-lg p-2 md:p-4"
            >
              {icon}
              <p
                className={`mt-3 text-xl md:text-3xl font-extrabold ${
                  valueColor || "text-gray-900"
                }`}
              >
                {value}
              </p>
              <p className="mt-1 text-sm text-gray-500 uppercase tracking-wider">
                {label}
              </p>
            </div>
          ))}
        </div>

        {/* Pie Chart */}
        <div className="flex justify-center mt-6">
          <PieChart width={300} height={300}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </div>

        {/* Recommended Books Section */}
        {toScoreMoreBooks && toScoreMoreBooks.length > 0 && (
          <div className="mt-8 border-t pt-6">
            <div className="flex items-center justify-center gap-2 mb-6">
              <BookOpen className="w-6 h-6 text-indigo-600" />
              <h3 className="text-2xl font-bold text-gray-800">
                Recommended Books to Score More
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {toScoreMoreBooks.map((book) => (
                <div
                  key={book.id}
                  className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
                >
                  {/* Book Thumbnail */}
                  <div className="w-full h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                    {book.thumbnailLink ? (
                      <img
                        src={book.thumbnailLink}
                        alt={book.title}
                        className="h-full object-contain"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />
                    ) : 
                    null}
                    <div
                      className="w-full h-full items-center justify-center"
                      style={{ display: book.thumbnailLink ? "none" : "flex" }}
                    >
                      <BookOpen className="w-16 h-16 text-gray-400" />
                    </div>
                  </div>

                  {/* Book Details */}
                  <div className="p-4 flex flex-col flex-grow">
                    <h4 className="text-sm font-semibold text-gray-800 mb-3 line-clamp-3 min-h-[3rem]">
                      {book.title}
                    </h4>

                    <div className="mt-auto space-y-3">
                      {/* Price */}
                      <div className="flex items-center gap-1 text-lg font-bold text-green-600">
                        <IndianRupee className="w-5 h-5" />
                        <span>{book.price}</span>
                      </div>

                      {/* View Button */}
                      <a
                        href={book.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors duration-200"
                      >
                        View
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center">
          <button
            onClick={() => {
              setShowAnswers((prev) => !prev);
            }}
            className="inline-flex items-center px-5 py-2 border border-indigo-600 text-indigo-600 font-semibold rounded-md hover:bg-indigo-600 hover:text-white transition"
          >
            {showAnswers ? "Hide Question Answers" : "View Question Answers"}
          </button>
        </div>

        {/* Detailed question review */}
        {showAnswers && (
          <ul className="space-y-6 mt-6">
            {testData.questions.map((q, idx) => {
              const userAnswer = answers[idx];
              const isCorrect =
                Number(q.options[userAnswer]?.id) == Number(q.answer?.optionId);
              const isUnanswered = userAnswer === null;

              return (
                <li
                  key={idx}
                  className="border border-gray-200 rounded-lg p-4 space-y-3 shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-800">
                      Q{idx + 1}:
                      <LatexRenderer text={q.question} />
                    </p>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        isUnanswered
                          ? "bg-yellow-100 text-yellow-800"
                          : isCorrect
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {isUnanswered
                        ? "Unanswered"
                        : isCorrect
                        ? "Correct"
                        : "Incorrect"}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = userAnswer === optIdx;
                      const isRight =
                        Number(opt.id) == Number(q.answer?.optionId);

                      return (
                        <div
                          key={optIdx}
                          className={`border px-3 py-2 rounded-md ${
                            isRight
                              ? "border-green-500 bg-green-50"
                              : isSelected
                              ? "border-red-500 bg-red-50"
                              : "border-gray-200"
                          }`}
                        >
                          <LatexRenderer text={opt.text} />
                          {isRight && (
                            <span className="ml-2 text-green-600 font-semibold">
                              ✓
                            </span>
                          )}
                          {isSelected && !isRight && (
                            <span className="ml-2 text-red-600 font-semibold">
                              ✗
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Explanation */}
                  {q.answer?.explanation && (
                    <div className="mt-3">
                      <button
                        onClick={() => toggleExplanation(idx)}
                        className="text-blue-600 text-sm font-medium hover:underline"
                      >
                        {expanded[idx]
                          ? "Hide Explanation"
                          : "View Explanation"}
                      </button>

                      {expanded[idx] && (
                        <div className="mt-2 p-3 bg-blue-50 border-l-4 border-blue-400 text-sm text-blue-700 rounded">
                          <strong>Explanation:</strong>
                          <LatexRenderer text={q.answer?.explanation} />
                        </div>
                      )}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TestResultSummary;