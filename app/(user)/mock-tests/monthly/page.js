"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Header, Footer, TestOptionsModal } from "@/components";

export default function Page() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    AOS.init({ once: true, duration: 100, easing: "ease-in-out" });
  }, []);

  const monthlyData = [
    {
      month: "July 2025",
      days: [
        {
          date: "Jul 1",
          topics: "Union Budget 2025 Highlights",
          getToday: function () {
            return new Date().toDateString();
          },
        },
        {
          date: "Jul 2",
          topics: "NASA Mars Mission Update",
          getToday: function () {
            return new Date().toDateString();
          },
        },
        {
          date: "Jul 3",
          topics: "ISRO Moon Mission, IPL Awards",
          getToday: function () {
            return new Date().toDateString();
          },
        },
      ],
    },
    {
      month: "June 2025",
      days: [
        {
          date: "Jun 15",
          topics: "GST Council Decisions",
          getToday: function () {
            return new Date().toDateString();
          },
        },
        {
          date: "Jun 20",
          topics: "Monsoon Forecast Released",
          getToday: function () {
            return new Date().toDateString();
          },
        },
        {
          date: "Jun 25",
          topics: "Global Stock Trends Report",
          getToday: function () {
            return new Date().toDateString();
          },
        },
      ],
    },
  ];

  return (
    <>
      
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-10 text-center">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Monthly Quiz</h1>
        <p className="text-base sm:text-lg text-gray-600 mb-6">
          Explore quizzes day-by-day, month-wise 🗓️
        </p>

        {/* Monthly Sections */}
        {monthlyData.map((month, idx) => (
          <div key={idx} className="mb-12" data-aos="fade-up" data-aos-delay={idx * 100}>
            <h2 className="text-2xl font-semibold text-violet-600 mb-6">{month.month}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
              {month.days.map((day, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl shadow-md p-6 transition-transform transform hover:scale-105"
                  data-aos="zoom-in-up"
                  data-aos-delay={i * 80}
                >
                  <h3 className="text-lg font-bold text-indigo-700 mb-2">
                    📅 {day.date}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">📰 {day.topics}</p>
                  <p className="text-xs text-gray-400">🕒 {day.getToday()}</p>
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
      </main>

      {/* Modal */}
      {showModal && <TestOptionsModal onClose={() => setShowModal(false)} playLink="#" practiceLink="#" testLink="#" studyLink="#" />}
      
    </>
  );
}
