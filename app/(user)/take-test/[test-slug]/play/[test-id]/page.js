"use client";

import React, { useState, useEffect } from "react";
import {
  CountdownScreen,
  FullScreenLoader,
  TestResultSummary,
  TestSettingsModal,
} from "@/components";
import { useRouter, useParams } from "next/navigation";
import { axios } from "@/utils";

const PlayTestPage = () => {
  const router = useRouter();
  const { "test-slug": testSlug, "test-id": testId } = useParams();

  const [showSettings, setShowSettings] = useState(true);
  const [settings, setSettings] = useState(undefined);
  const [showCountdown, setShowCountdown] = useState(false);
  const [startAudio, setStartAudio] = useState(null);
  const [testData, setTestData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  const [loading, setLoading] = useState(false);
  const wasTimeout = remainingTime === 0 && !completed;

  // Called when user clicks 'Start' in modal
  const handleStart = async (settings) => {
    setLoading(true);
    setSettings(settings);

    try {
      const res = await axios.post(
        `/api/user/tests/${testSlug}/${testId}/fetch`,
        settings
      );
      setTestData(res.data);
      setAnswers(new Array(res.data.questions.length).fill(null));
      setShowCountdown(true);
    } catch (error) {
      console.error("Failed to load test data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (completed || showCountdown === false) {
      // Pause sound if playing
      if (startAudio) {
        startAudio.pause();
        startAudio.currentTime = 0; // Reset to beginning
      }
    }
  }, [completed, showCountdown]);

  // Start test after countdown completes
  const startTestAfterCountdown = () => {
    setShowCountdown(false);
  };

  const handleAnswer = (optionIndex) => {
    if (answers[currentQuestionIndex] !== null) return;

    if (settings?.gameSound) {
      const audio = new Audio("/assets/audio/click-sound.mp3");
      audio.play().catch((err) => {
        console.warn("Sound playback failed:", err);
      });
    }

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
    if (!testData || showCountdown || completed) return;

    if (settings?.gameSound) {
      const audio = new Audio("/assets/audio/bg-music.mp3");
      audio.play().catch((err) => {
        console.warn("Sound playback failed:", err);
      });
      setStartAudio(audio);
    }

    const totalSeconds = parseInt(testData.timer.match(/\d+/)?.[0] || "0", 10);
    setRemainingTime(totalSeconds);

    const interval = setInterval(() => {
      if (completed) return clearInterval(interval);
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
  }, [testData, showCountdown, completed]);

  if (loading) return <FullScreenLoader />;

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
      <TestResultSummary
        testData={testData}
        answers={answers}
        remainingTime={remainingTime}
      />
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
                  {opt.text}
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