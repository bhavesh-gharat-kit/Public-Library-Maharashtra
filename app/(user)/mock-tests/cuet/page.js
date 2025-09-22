"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import { FaBookOpen } from "react-icons/fa";
import Link from "next/link";

export default function Page() {
  useEffect(() => {
    AOS.init({ once: true, duration: 800, easing: "ease-in-out" });
  }, []);

  const testCards = [
    {
      title: "CUET Accountancy",
      description:
        "Practice CUET Accountancy domain-specific mock tests with detailed solutions to boost your preparation.",
      link: "/take-test/cuet-accountancy",
      aos: "fade-up",
    },
    {
      title: "CUET Biology",
      description:
        "Revise key concepts of Biology and test your knowledge with CUET-level mock questions and explanations.",
      link: "/take-test/cuet-biology",
      aos: "fade-down",
    },
    {
      title: "CUET Business Studies",
      description:
        "Attempt CUET Business Studies tests covering case studies, MCQs, and analysis-based questions.",
      link: "/take-test/cuet-business-studies",
      aos: "fade-up",
    },
    {
      title: "CUET Chemistry",
      description:
        "Prepare with topic-wise CUET Chemistry practice tests, including Physical, Organic, and Inorganic Chemistry.",
      link: "/take-test/cuet-chemistry",
      aos: "fade-down",
    },
    {
      title: "CUET Economics",
      description:
        "Strengthen your Economics preparation with CUET-level practice sets and numerical questions.",
      link: "/take-test/cuet-economics",
      aos: "flip-up",
    },
    {
      title: "CUET Maths",
      description:
        "Solve CUET Mathematics mock tests with step-by-step solutions to improve accuracy and speed.",
      link: "/take-test/cuet-maths",
      aos: "flip-down",
    },
    {
      title: "CUET Physics",
      description:
        "Attempt CUET Physics practice papers focusing on numerical problem-solving and conceptual clarity.",
      link: "/take-test/cuet-physics",
      aos: "zoom-in",
    },
    {
      title: "CUET Quantitative",
      description:
        "Boost your quantitative aptitude with CUET-specific practice sets and detailed solution explanations.",
      link: "/take-test/cuet-quantitative",
      aos: "zoom-in-up",
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
              Best Mock Tests for CUET EXAMS
            </h2>
            <p className="text-lg md:text-xl font-medium">
              Get Access to Free CUET EXAMS Mock Tests
            </p>
          </div>

          {/* Cards Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
            {testCards.map((card, idx) => (
              <div
                key={idx}
                data-aos={card.aos}
                data-aos-delay={idx * 100}
                className="group bg-white shadow-lg hover:shadow-purple-300 rounded-2xl p-6 transition duration-500 border hover:border-purple-500 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-semibold text-purple-700 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {card.description}
                  </p>
                </div>
                <Link
                  href={card.link}
                  className="mt-6 inline-block bg-purple-600 text-white font-medium text-sm text-center py-2 px-4 rounded-md hover:bg-purple-700 transition"
                >
                  Explore Tests
                </Link>
              </div>
            ))}
          </section>
        </div>
      </section>
    </>
  );
}
