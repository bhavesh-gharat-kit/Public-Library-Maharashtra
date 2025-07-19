"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Header, Footer, Modal, Month } from "@/components";
import Link from "next/link";

export default function Page() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    AOS.init({ once: true, duration: 300, easing: "ease-in-out" });
  }, []);

  const categories = [
    { type: "Daily", path: "/Daily" },
    { type: "Weekly", path: "/Weekly" },
    { type: "Monthly", path: "/Monthly" },
  ];

  const daily = [
    {
      id: 1,
      day: "Monday",
      topics: "ISRO Moon Mission",
      getToday: function () {
        return new Date().toDateString();
      },
      getDay: function () {
        return this.day;
      },
    },
    {
      id: 2,
      day: "Tuesday",
      topics: "G20 Delhi Summit",
      getToday: function () {
        return new Date().toDateString();
      },
      getDay: function () {
        return this.day;
      },
    },
    {
      id: 3,
      day: "Wednesday",
      topics: "IPL Awards",
      getToday: function () {
        return new Date().toDateString();
      },
      getDay: function () {
        return this.day;
      },
    },
    {
      id: 4,
      day: "Thursday",
      topics: "ISRO Moon Mission, G20 Delhi Summit, IPL Awards",
      getToday: function () {
        return new Date().toDateString();
      },
      getDay: function () {
        return this.day;
      },
    },
    {
      id: 5,
      day: "Friday",
      topics: "RBI Repo Rate Update",
      getToday: function () {
        return new Date().toDateString();
      },
      getDay: function () {
        return this.day;
      },
    },
    {
      id: 6,
      day: "Saturday",
      topics: "Chandrayaan-4 Prep",
      getToday: function () {
        return new Date().toDateString();
      },
      getDay: function () {
        return this.day;
      },
    },
    {
      id: 7,
      day: "Sunday",
      topics: "US Tax Acts",
      getToday: function () {
        return new Date().toDateString();
      },
      getDay: function () {
        return this.day;
      },
    },
  ];

  return (
    <>
      
      <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-10 text-center">
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
          Current Affairs
        </h1>
        <p className="text-base sm:text-lg text-gray-600 mb-6">
          Stay updated with the latest news and events
        </p>

        {/* Navigation Buttons */}
        <div className="flex space-x-4 justify-center mb-10">
          {categories.map((cat, index) => (
            <Link
              key={index}
              href={cat.path}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="px-6 py-2 rounded-full text-lg font-semibold transition-all duration-200 shadow-sm bg-white text-gray-800 border border-gray-300 hover:bg-gray-100 hover:scale-105"
            >
              {cat.type}
            </Link>
          ))}
        </div>

        {/* Daily Content Shown by Default */}
        <h2 className="text-2xl font-bold text-indigo-600 mb-6">Daily Quiz</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto w-full">
          {daily.map((quiz, index) => (
            <div
              key={quiz.id}
              className="bg-white rounded-xl shadow-md p-6 transition-transform transform hover:scale-105"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <h3 className="text-lg font-bold text-indigo-700 mb-2">
                📅 {quiz.getDay()}
              </h3>
              <p className="text-sm text-gray-600 mb-2">📰 {quiz.topics}</p>
              <p className="text-xs text-gray-400">📆 {quiz.getToday()}</p>
              <button
                onClick={() => setShowModal(true)}
                className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium"
              >
                Take Quiz 🧠
              </button>
            </div>
          ))}
        </div>
      </main>

      {/* Modal */}
      {showModal && <TestOptionsModal onClose={() => setShowModal(false)} playLink="#" practiceLink="#" testLink="#" studyLink="#" />}
      
    </>
  );
}
