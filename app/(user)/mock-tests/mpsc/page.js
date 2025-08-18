"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import { FaBookOpen } from "react-icons/fa";
import Link from "next/link";
import { MockTestSubCard } from "@/components";

export default function Page() {
  useEffect(() => {
    AOS.init({ once: true, duration: 800, easing: "ease-in-out" });
  }, []);

  const testCards = [
    {
      title: "MPSC & State Commission",
      description:
        "Prepare for state services with focused, exam-oriented mock tests.",
      link: "/take-test/mpsc-state-commission",
      aos: "fade-up",
    },
    {
      title: "MPSC Assistant Section Officer",
      description: "MCQ-based mock tests for State PSC.",
      link: "/take-test/mpsc-assistant-section-officer",
      aos: "fade-down",
    },
    {
      title: "MPSC Marathi",
      description: "MCQ-based mock tests for State PSC in Marathi.",
      link: "/take-test/mpsc-marathi",
      aos: "fade-down",
    },
  ];

  return (
    <>
      <section className="min-h-screen flex flex-col items-center px-4 py-4 md:py-8 bg-gradient-to-b from-purple-50 to-white">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          {/* Hero Section */}
          <div
            className="bg-gradient-to-b from-purple-500 to-purple-800 text-white rounded-2xl px-6 py-10 mb-12 text-center shadow-md"
            data-aos="zoom-in"
          >
            <h2 className="text-4xl font-extrabold text-white mb-4 flex justify-center items-center gap-3">
              <FaBookOpen />
              Best Mock Tests for MPSC EXAMS
            </h2>
            <p className="text-lg md:text-xl font-medium">
              Get Access to Free MPSC EXAMS Mock Tests
            </p>
          </div>

          {/* Cards Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
            {testCards.map((card, idx) => (
              <MockTestSubCard key={idx} card={card} idx={idx} />
            ))}
          </section>
        </div>
      </section>
    </>
  );
}