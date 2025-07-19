"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import { Header, Footer, TestOptionsModal } from "@/components";

export default function page() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    AOS.init({ once: true, duration: 100, easing: "ease-in-out" });
  }, []);

  const allWeeks = [
    {
      week: "Week 1",
      days: [
        { day: "Monday", topics: "🚀 ISRO Moon Mission" },
        { day: "Tuesday", topics: "🌍 G20 Delhi Summit" },
        { day: "Wednesday", topics: "🏆 IPL Awards" },
        { day: "Thursday", topics: "🛰️ NASA SpaceX Crew Update" },
        { day: "Friday", topics: "💰 RBI Repo Rate Update" },
        { day: "Saturday", topics: "📱 India Tech Startup Round" },
        { day: "Sunday", topics: "📰 Weekly News Wrap" },
      ],
    },
    {
      week: "Week 2",
      days: [
        { day: "Monday", topics: "🚨 Cybersecurity Laws 2025" },
        { day: "Tuesday", topics: "🏛️ Parliament Budget Review" },
        { day: "Wednesday", topics: "🎬 Filmfare Awards 2025" },
        { day: "Thursday", topics: "🚢 Indo-Pacific Strategy Meet" },
        { day: "Friday", topics: "📊 Indian Stock Market Trends" },
        { day: "Saturday", topics: "🌧️ Monsoon Forecasts" },
        { day: "Sunday", topics: "🗞️ Policy Digest Roundup" },
      ],
    },
    {
      week: "Week 3",
      days: [
        { day: "Monday", topics: "🛡️ Defense Expo Highlights" },
        { day: "Tuesday", topics: "🏫 NEP 2025 Implementation" },
        { day: "Wednesday", topics: "🌐 BRICS Economic Forum" },
        { day: "Thursday", topics: "📡 5G Rollout in Rural India" },
        { day: "Friday", topics: "🧠 AI Ethics Summit" },
        { day: "Saturday", topics: "🏅 Khelo India Winners" },
        { day: "Sunday", topics: "📰 Sunday Global Summary" },
      ],
    },
  ];

  const getToday = () => new Date().toDateString();

  return (
    <>
      

      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-10 text-center">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Weekly Quizzes</h1>
        <p className="text-base sm:text-lg text-gray-600 mb-6">
          Revise key current affairs – week by week 🧠
        </p>

        {/* Weekly Groups */}
        <div className="space-y-16 max-w-6xl mx-auto">
          {allWeeks.map((week, weekIndex) => (
            <div key={week.week}>
              <h2
                className="text-2xl font-semibold text-violet-600 mb-6 underline underline-offset-4"
                data-aos="fade-right"
              >
                {week.week}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {week.days.map((dayItem, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-xl shadow-md p-6 transition-transform transform hover:scale-105"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <h3 className="text-lg font-bold text-indigo-700 mb-2">
                      📅 {dayItem.day}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{dayItem.topics}</p>
                    <p className="text-xs text-gray-400">📆 {getToday()}</p>
                    <button
                      onClick={() => setShowModal(true)}
                      className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium"
                    >
                      Take Quiz 🧠
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Quiz Modal */}
      {showModal && <TestOptionsModal onClose={() => setShowModal(false)} playLink="#" practiceLink="#" testLink="#" studyLink="#" />}
      
    </>
  );
}
