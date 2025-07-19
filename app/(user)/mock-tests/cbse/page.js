"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Header, Footer } from "@/components";
import { FaBookOpen } from "react-icons/fa";
import Link from "next/link";

export default function Page() {
  useEffect(() => {
    AOS.init({ once: true, duration: 800, easing: "ease-in-out" });
  }, []);

  const testCards = [
    {
      title: "Class 10 - Mathematics",
      description:
        "Sharpen your math skills with these chapter-wise Class 10 mock tests.",
      link: "/take-test/class-10-mathematics",
      aos: "fade-up",
    },
    {
      title: "Class 10 - Science",
      description:
        "Test your knowledge of Physics, Chemistry, and Biology for Class 10.",
      link: "/take-test/class-10-science",
      aos: "slide-up",
    },
    {
      title: "Class 10 - Social Science",
      description:
        "Practice History, Civics, Geography, and Economics for Class 10.",
      link: "/take-test/class-10-social-science",
      aos: "flip-up",
    },
    {
      title: "Class 09 - Mathematics",
      description:
        "Practice algebra, geometry, and more for Class 9 Mathematics.",
      link: "/take-test/class-9-mathematics",
      aos: "fade-down",
    },
    {
      title: "Class 09 - Science",
      description:
        "Concept-based tests covering Class 9 Physics, Chemistry, and Biology.",
      link: "/take-test/class-9-science",
      aos: "slide-left",
    },
    {
      title: "Class 09 - Social Science",
      description:
        "Get ready for SST with topic-wise tests aligned to CBSE syllabus.",
      link: "/take-test/class-9-social-science",
      aos: "zoom-in",
    },
    {
      title: "Class 08 - Mathematics",
      description:
        "Revise key concepts and practice problems for Class 8 Maths.",
      link: "/take-test/class-8-mathematics",
      aos: "fade-down",
    },
    {
      title: "Class 08 - Science",
      description:
        "Cover core chapters with MCQs from Class 8 Science curriculum.",
      link: "/take-test/class-8-science",
      aos: "slide-right",
    },
    {
      title: "Class 08 - Social Science",
      description:
        "Practice questions from Civics, History, and Geography - Class 8.",
      link: "/take-test/class-8-social-science",
      aos: "flip-right",
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
              Free CBSE Mock Tests for Class 8, 9, and 10
            </h2>
            <p className="text-lg md:text-xl font-medium">
              Topic-wise test series crafted for CBSE students. Practice
              anytime, no sign-up needed.
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
