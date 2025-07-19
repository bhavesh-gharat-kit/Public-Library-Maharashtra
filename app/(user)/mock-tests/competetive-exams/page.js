"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Header, Footer } from "@/components";

export default function Page() {
  useEffect(() => {
    AOS.init({ once: true, duration: 100, easing: "ease-in-out" });
  }, []);

  const testCards = [
    {
      title: "AFCAT, Defense, Agniveer",
      description: "Prepare for defense services with focused, exam-oriented mock tests.",
      link: "./CA",
      aos: "fade-up",
    },
    {
      title: "Banking",
      description: "Practice IBPS, SBI, RBI-level questions curated by top mentors.",
      link: "./CMA",
      aos: "fade-down",
    },
    {
      title: "MPSC & State Commission",
      description: "MCQ-based mock tests for State PSC, UPSC prep and more.",
      link: "./CS",
      aos: "flip-up",
    },
    {
      title: "Railway",
      description: "Master RRB NTPC, Group D & more with topic-wise test sets.",
      link: "./CS",
      aos: "Slide-down",
    },
  ];

  return (
    <>
      
      <main className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-indigo-50 px-6 py-12">
        {/* Hero Section */}
        <section className="max-w-4xl mx-auto text-center mb-12" data-aos="slide-right">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-indigo-500 mb-4">
            Free Mock Tests for Competitive Exams
          </h1>
          <p className="text-lg sm:text-xl text-gray-700">
            Stay ahead of the competition with updated, real-exam-style test series — no registration required.
          </p>
        </section>

        {/* Cards Grid */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testCards.map((card, idx) => (
            <div
              key={idx}
              data-aos={card.aos}
              data-aos-delay={idx * 100}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-transparent hover:border-indigo-600 p-6 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-indigo-700 group-hover:text-indigo-900 transition-colors duration-200 mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                  {card.description}
                </p>
              </div>
              <a
                href={card.link}
                className="mt-6 inline-block text-center text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg px-5 py-2 transition"
              >
                Explore Tests
              </a>
            </div>
          ))}
        </section>
      </main>
      
    </>
  );
}
