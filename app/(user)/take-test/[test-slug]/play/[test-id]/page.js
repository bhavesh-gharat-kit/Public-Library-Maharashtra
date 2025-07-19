"use client";

import React, { useState, useEffect } from "react";
import { CountdownScreen, TestSettingsModal } from "@/components";
import { useRouter, useParams } from "next/navigation";
import { axios } from "@/utils";

const PlayTestPage = () => {
  const router = useRouter();
  const { "test-slug": testSlug, "test-id": testId } = useParams();

  const [showSettings, setShowSettings] = useState(true);
  const [showCountdown, setShowCountdown] = useState(false);
  const [testData, setTestData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  const wasTimeout = remainingTime === 0 && !answers.includes(null);

  // Called when user clicks 'Start' in modal
  const handleStart = async (settings) => {
    try {
      const res = await axios.post(`/api/tests/${testSlug}/fetch`, settings);
      setTestData(res.data);
      setAnswers(new Array(res.data.questions.length).fill(null));
      setShowCountdown(true);
    } catch (error) {
      console.error("Failed to load test data", error);
    }
  };

  // Start test after countdown completes
  const startTestAfterCountdown = () => {
    setShowCountdown(false);
  };

  const handleAnswer = (optionIndex) => {
    if (answers[currentQuestionIndex] !== null) return;

    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = optionIndex;
    setAnswers(updatedAnswers);

    if (currentQuestionIndex < testData.questions.length - 1) {
      setTimeout(() => setCurrentQuestionIndex((i) => i + 1), 800);
    } else {
      setTimeout(() => setCompleted(true), 800);
    }
  };

  useEffect(() => {
    if (!testData || showCountdown) return;

    const totalSeconds = parseInt(testData.timer.match(/\d+/)?.[0] || "0", 10);
    setRemainingTime(totalSeconds);

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          setCompleted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [testData, showCountdown]);

  if (showSettings) {
    return (
      <TestSettingsModal
        onCancel={() => router.back()}
        setShowSettings={setShowSettings}
        setSavedSettings={(settings) => {
          handleStart(settings);
        }}
      />
    );
  }

  if (showCountdown) {
    return <CountdownScreen onComplete={startTestAfterCountdown} count={3} />;
  }

  if (!testData) return null;

  if (completed) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 flex justify-center">
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-xl p-6 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-700">
              🎉 Test Completed
            </h2>
            <p className="text-sm text-gray-600">Review your answers below</p>
          </div>

          <ul className="space-y-6">
            {testData.questions.map((q, idx) => {
              const userAnswer = answers[idx];
              const isCorrect = userAnswer === q.correctAnswer;
              const isUnanswered = userAnswer === null;

              return (
                <li
                  key={idx}
                  className="border border-gray-200 rounded-lg p-4 space-y-3 shadow-sm"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-800">
                      Q{idx + 1}: {q.question}
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
                      const isRight = q.correctAnswer === optIdx;

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
                          {opt}
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

                  {/* Explanation (optional if available in data) */}
                  {q.explanation && (
                    <div className="mt-2 p-3 bg-blue-50 border-l-4 border-blue-400 text-sm text-blue-700 rounded">
                      <strong>Explanation:</strong> {q.explanation}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          {wasTimeout && (
            <div className="text-center mt-4">
              <p className="text-red-500 text-sm font-medium">
                ⚠️ Test auto-submitted due to timeout.
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  const currentQ = testData.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-xl p-6 space-y-6">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>
            Question {currentQuestionIndex + 1} of {testData.questions.length}
          </span>
          {/* {testData.timer && <span>Time: {testData.timer}</span>} */}
          {remainingTime !== null && !completed && (
            <span className="font-mono text-red-500 text-sm">
              ⏱️ Time Left:{" "}
              {String(Math.floor(remainingTime / 60)).padStart(2, "0")}:
              {String(remainingTime % 60).padStart(2, "0")}
            </span>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800">
            {currentQ.question}
          </h3>
          <ul className="mt-4 space-y-2">
            {currentQ.options.map((opt, idx) => (
              <li key={idx}>
                <button
                  disabled={answers[currentQuestionIndex] !== null}
                  onClick={() => handleAnswer(idx)}
                  className={`w-full text-left px-4 py-2 rounded-md border transition
                    ${
                      answers[currentQuestionIndex] === idx
                        ? "bg-green-500 text-white border-green-500"
                        : "hover:bg-gray-100 border-gray-300"
                    }`}
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PlayTestPage;
