"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {Header, Footer} from "@/components";

export default function Page() {
  useEffect(() => {
    AOS.init({ once: true, duration: 800, easing: "ease-in-out" });
  }, []);

  const [filter, setFilter] = useState("Daily");

 const quizData = [
  { date: "Jul 7, 2025",  type: "Daily" },
  { date: "Jul 6, 2025", type: "Daily" },
  { date: "Jul 5, 2025", type: "Daily" },
   { date: "Jul 4, 2025",  type: "Daily" },
  { date: "Jul 3, 2025", type: "Daily" },
  { date: "Jul 2, 2025", type: "Daily" },


  { date: "Jun 2025", type: "Monthly" },
  { date: "May 2025",  type: "Monthly" },
  { date: "Apr 2025", type: "Monthly" },
  { date: "Mar 2025", type: "Monthly" },
  { date: "Feb 2025", type: "Monthly" },
  { date: "Jan 2025", type: "Monthly" },

  { date: "2025", type: "Yearly" },
  { date: "2024", type: "Yearly" },
  { date: "2023", type: "Yearly" },
  { date: "2022", type: "Yearly" }
];


  const filteredData = quizData.filter((q) => q.type === filter);

  return (
    <>
      
      <main className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gradient-to-b from-blue-50 to-white text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Best Mock Tests for CA Executive</h1>
        <p className="text-lg text-gray-600 mb-8">Get Access to Free CA Mock Executive</p>

        {/* 🔘 Filter Tabs */}
        <div className="flex space-x-4 mb-8">
          {["Daily", "Monthly", "Yearly"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-full border transition-all duration-200 ${
                filter === type
                  ? "bg-indigo-500 text-white"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* 📚 Quiz Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl w-full">
          {filteredData.map((quiz, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 transform transition-transform duration-300 hover:scale-105"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-1">{quiz.date}</h2>
              
              <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full">
                Take Quiz 🧠
              </button>
            </div>
          ))}
        </div>
      </main>
      
    </>
  );
}

