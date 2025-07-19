"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { TestOptionsModal } from "@/components";

export default function Page() {
  const [selectedMonth, setSelectedMonth] = useState("Jun");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    AOS.init({ once: true, duration: 800, easing: "ease-in-out" });
  }, []);

  const quizData = [
    // ==== APRIL ====
    { date: "Apr 01, 2025", topics: "World Health Day Preview", type: "Daily" },
    { date: "Apr 02, 2025", topics: "NASA Launch Updates", type: "Daily" },
    {
      date: "Apr 03, 2025",
      topics: "IPL 2025 Opening Ceremony",
      type: "Daily",
    },

    // ==== MAY ====
    {
      date: "May 01, 2025",
      topics: "Labour Day India & International News",
      type: "Daily",
    },
    {
      date: "May 02, 2025",
      topics: "Elections 2025: Phase 1 Begins",
      type: "Daily",
    },
    {
      date: "May 03, 2025",
      topics: "UNESCO Heritage Additions",
      type: "Daily",
    },

    // ==== JUNE ====
    { date: "Jun 01, 2025", topics: "ISRO Moon Mission", type: "Daily" },
    { date: "Jun 04, 2025", topics: "New Education Bill", type: "Daily" },
    { date: "Jun 05, 2025", topics: "Startup India", type: "Daily" },
    { date: "Jun 06, 2025", topics: "India-China Border", type: "Daily" },
    { date: "Jun 07, 2025", topics: "GST Council Decisions", type: "Daily" },
    { date: "Jun 08, 2025", topics: "Lok Sabha Polls Recap", type: "Daily" },
    { date: "Jun 09, 2025", topics: "UN Climate Report", type: "Daily" },
    { date: "Jun 10, 2025", topics: "Cannes Film Fest", type: "Daily" },
    {
      date: "Jun 11–30, 2025",
      topics: "Cannes Film Fest Ongoing",
      type: "Daily",
    },

    // ==== JULY ====
    { date: "Jul 02, 2025", topics: "Wimbledon Finals", type: "Daily" },
    { date: "Jul 03, 2025", topics: "Union Budget", type: "Daily" },
  ];

  const filteredData = quizData.filter((quiz) =>
    quiz.date.startsWith(selectedMonth)
  );

  return (
    <>
      <main className="min-h-screen px-4 py-12 bg-gradient-to-b from-blue-50 to-white text-center">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-3 tracking-tight">
          🗓️ Monthly Current Affairs
        </h1>
        <p className="text-gray-600 mb-8 text-sm sm:text-base">
          Click a month to view daily quiz topics from the respective month.
        </p>

        {/* Month Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {["Apr", "May", "Jun", "Jul"].map((month) => (
            <button
              key={month}
              onClick={() => setSelectedMonth(month)}
              className={`px-5 py-2 rounded-full border text-sm font-medium transition-all duration-200 ${
                selectedMonth === month
                  ? "bg-indigo-600 text-white shadow-md"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-indigo-50"
              }`}
            >
              {month}
            </button>
          ))}
        </div>

        {/* Quiz Cards */}
        {filteredData.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filteredData.map((quiz, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow hover:shadow-lg p-6 transition transform hover:-translate-y-1"
                data-aos="fade-up"
                data-aos-delay={index * 60}
              >
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {quiz.date}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{quiz.topics}</p>
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold"
                >
                  Take Quiz 🧠
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mt-10 text-sm">
            No data found for {selectedMonth} 2025.
          </p>
        )}
      </main>

      {/* Modal */}
      {showModal && <TestOptionsModal onClose={() => setShowModal(false)} playLink="#" practiceLink="#" testLink="#" studyLink="#" />}
    </>
  );
}
