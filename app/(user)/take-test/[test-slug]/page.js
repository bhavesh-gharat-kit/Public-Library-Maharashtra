"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Header, Footer, TestOptionsModal } from "@/components";
import {
  FaBrain,
  FaCalendarAlt,
  FaChevronRight,
  FaClock,
} from "react-icons/fa";
import { MONTHS } from "@/lib/constatns";
import { formatDate, formatMonthYear } from "@/lib/helperFunctions";

export default function Page() {
  const [showModal, setShowModal] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedMonthData, setSelectedMonthData] = useState([]);
  const [selectedTestId, setSelectedTestId] = useState(null);

  useEffect(() => {
    AOS.init({ once: true, duration: 100, easing: "ease-in-out" });
  }, []);

  let monthlyData = [
    {
      id: 1,
      createdAt: "2025-07-17T22:28:20.880Z",
    },
    {
      id: 2,
      createdAt: "2025-07-17T22:28:20.880Z",
    },
    {
      id: 3,
      createdAt: "2025-07-17T22:28:20.880Z",
    },
    {
      id: 4,
      createdAt: "2025-07-17T22:28:20.880Z",
    },
    {
      id: 5,
      createdAt: "2025-07-17T22:28:20.880Z",
    },
  ];

  useEffect(() => {
    console.log(selectedMonth);
  }, [selectedMonth]);

  const monthData = {
    2025: [0, 1, 2, 3, 4, 5, 6],
    2024: [8, 9, 10, 11],
  };

  const handleMonthClick = (monthIndex, year) => {
    const mm = String(monthIndex + 1).padStart(2, "0"); // Convert to "01", "02", ...
    const formatted = `${mm}-${year}`;
    setSelectedMonth(formatted);
    setSelectedMonthData(monthlyData);
  };

  const colorRing = [
    "red-500",
    "green-500",
    "blue-500",
    "pink-500",
    "purple-500",
    "orange-500",
    "teal-500",
  ];

  const today = new Date().toDateString();

  return (
    <>
      <section className="bg-gradient-to-b from-blue-50 to-white px-4 py-10 text-center">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          {/* Title */}
          <div
            className="bg-gradient-to-b from-purple-500 to-purple-800 text-white rounded-2xl px-6 py-10 mb-12 text-center shadow-md"
            data-aos="zoom-in"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Best Mock Tests
            </h2>
            <p className="text-lg md:text-xl font-medium">
              Get Access to Free Mock Tests
            </p>
          </div>

          {/* Monthly Sections */}
          {selectedMonth && (
            <div className="mb-12" data-aos="fade-up" data-aos-delay={100}>
              <h2 className="text-2xl font-semibold text-violet-600 mb-6">
                {formatMonthYear(selectedMonth)}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto w-full">
                {selectedMonthData.map((e, i) => (
                  <div
                    key={i}
                    data-aos="zoom-in-up"
                    data-aos-delay={i * 80}
                    className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-left hover:shadow-xl transition-transform transform hover:-translate-y-1"
                  >
                    <div className=" flex justify-center items-center gap-2 mb-2 text-indigo-700 font-semibold">
                      <FaCalendarAlt className="text-indigo-500" />
                      <span>{formatDate(e.createdAt)}</span>
                    </div>

                    <button
                      onClick={() => {
                        setShowModal(true);
                        setSelectedTestId(e.id);
                      }}
                      className="mx-auto flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow-sm transition-all"
                    >
                      <FaBrain />
                      Take Quiz
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <div className="min-h-screen max-w-5xl mx-auto px-4 py-10">
        {Object.entries(monthData).map(([year, months], yearIndex) => (
          <div key={year} className="mb-12">
            <h2
              className="text-xl font-semibold text-gray-800 mb-6"
              data-aos="fade-up"
            >
              {year}
            </h2>
            <div
              className="bg-gray-100 rounded-2xl p-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
              data-aos="fade-up"
              data-aos-delay={yearIndex * 100}
            >
              {months.map((month, index) => (
                <MonthCard
                  key={month}
                  name={MONTHS[month]}
                  borderColor={colorRing[index % colorRing.length]}
                  handleClick={() => handleMonthClick(month, year)}
                  delay={index * 100}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <TestOptionsModal
          onClose={() => setShowModal(false)}
          playLink={`/take-test/current-affairs/play/${selectedTestId}`}
          practiceLink={`/take-test/current-affairs/play/${selectedTestId}`}
          testLink={`/take-test/current-affairs/play/${selectedTestId}`}
          studyLink={`/take-test/current-affairs/play/${selectedTestId}`}
        />
      )}
    </>
  );
}

function MonthCard({ name, borderColor, delay, handleClick }) {
  return (
    <div
      data-aos="zoom-in"
      data-aos-delay={delay}
      onClick={handleClick}
      className={`relative flex items-center justify-between bg-white p-4 rounded-xl transition-all duration-500 cursor-pointer border-l-4 shadow-md hover:shadow-lg hover:shadow-${borderColor} border-${borderColor}`}
    >
      <span className="text-base font-medium text-gray-700">{name}</span>
      <FaChevronRight className="text-gray-500 w-5 h-5" />
    </div>
  );
}
