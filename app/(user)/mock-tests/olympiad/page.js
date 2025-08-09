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
      title: "AFCAT, Defense, Agniveer",
      description: "Prepare for defense services with focused, exam-oriented mock tests.",
      link: "/take-test/afcat-defense-agniveer",
      aos: "fade-up",
    },
    {
      title: "Banking",
      description: "Practice IBPS, SBI, RBI-level questions curated by top mentors.",
      link: "/take-test/banking",
      aos: "fade-down",
    },
    {
      title: "MPSC & State Commission",
      description: "MCQ-based mock tests for State PSC, UPSC prep and more.",
      link: "/take-test/mpsc-state-commission",
      aos: "flip-up",
    },
    {
      title: "Railway",
      description: "Master RRB NTPC, Group D & more with topic-wise test sets.",
      link: "/take-test/railway",
      aos: "Slide-down",
    },
  ];

let data = [{
  "id": "47",
  "slug": "olympiad-class-1-computers",
  "name": "Class 1 - Computers"
},
{
  "id": "48",
  "slug": "olympiad-class-1-english",
  "name": "Class 1 - English"
},
{
  "id": "49",
  "slug": "olympiad-class-1-maths",
  "name": "Class 1 - Maths"
},
{
  "id": "50",
  "slug": "olympiad-class-1-science",
  "name": "Class 1 - Science"
},
{
  "id": "51",
  "slug": "olympiad-class-10-english",
  "name": "Class 10 - English"
},
{
  "id": "52",
  "slug": "olympiad-class-10-maths",
  "name": "Class 10 - Maths"
},
{
  "id": "53",
  "slug": "olympiad-class-10-science",
  "name": "Class 10 - Science"
},
{
  "id": "54",
  "slug": "olympiad-class-2-computers",
  "name": "Class 2 - Computers"
},
{
  "id": "55",
  "slug": "olympiad-class-2-english",
  "name": "Class 2 - English"
},
{
  "id": "56",
  "slug": "olympiad-class-2-maths",
  "name": "Class 2 - Maths"
},
{
  "id": "57",
  "slug": "olympiad-class-2-science",
  "name": "Class 2 - Science"
},
{
  "id": "58",
  "slug": "olympiad-class-3-computers",
  "name": "Class 3 - Computers"
},
{
  "id": "59",
  "slug": "olympiad-class-3-english",
  "name": "Class 3 - English"
},
{
  "id": "60",
  "slug": "olympiad-class-3-maths",
  "name": "Class 3 - Maths"
},
{
  "id": "61",
  "slug": "olympiad-class-3-science",
  "name": "Class 3 - Science"
},
{
  "id": "62",
  "slug": "olympiad-class-4-computers",
  "name": "Class 4 - Computers"
},
{
  "id": "63",
  "slug": "olympiad-class-4-english",
  "name": "Class 4 - English"
},
{
  "id": "64",
  "slug": "olympiad-class-4-maths",
  "name": "Class 4 - Maths"
},
{
  "id": "65",
  "slug": "olympiad-class-4-science",
  "name": "Class 4 - Science"
},
{
  "id": "66",
  "slug": "olympiad-class-5-computers",
  "name": "Class 5 - Computers"
},
{
  "id": "67",
  "slug": "olympiad-class-5-english",
  "name": "Class 5 - English"
},
{
  "id": "68",
  "slug": "olympiad-class-5-maths",
  "name": "Class 5 - Maths"
},
{
  "id": "69",
  "slug": "olympiad-class-5-science",
  "name": "Class 5 - Science"
},
{
  "id": "70",
  "slug": "olympiad-class-6-computers",
  "name": "Class 6 - Computers"
},
{
  "id": "71",
  "slug": "olympiad-class-6-english",
  "name": "Class 6 - English"
},
{
  "id": "72",
  "slug": "olympiad-class-6-maths",
  "name": "Class 6 - Maths"
},
{
  "id": "73",
  "slug": "olympiad-class-6-science",
  "name": "Class 6 - Science"
},
{
  "id": "74",
  "slug": "olympiad-class-7-computers",
  "name": "Class 7 - Computers"
},
{
  "id": "75",
  "slug": "olympiad-class-7-english",
  "name": "Class 7 - English"
},
{
  "id": "76",
  "slug": "olympiad-class-7-maths",
  "name": "Class 7 - Maths"
},
{
  "id": "77",
  "slug": "olympiad-class-7-science",
  "name": "Class 7 - Science"
},
{
  "id": "78",
  "slug": "olympiad-class-8-computers",
  "name": "Class 8 - Computers"
},
{
  "id": "79",
  "slug": "olympiad-class-8-maths",
  "name": "Class 8 - Maths"
},
{
  "id": "80",
  "slug": "olympiad-class-8-science",
  "name": "Class 8 - Science"
},
{
  "id": "81",
  "slug": "olympiad-class-9-computers",
  "name": "Class 9 - Computers"
},
{
  "id": "82",
  "slug": "olympiad-class-9-english",
  "name": "Class 9 - English"
},
{
  "id": "83",
  "slug": "olympiad-class-9-science",
  "name": "Class 9 - Science"
},
]

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
              Best Mock Tests for COMPETITIVE EXAMS
            </h2>
            <p className="text-lg md:text-xl font-medium">
              Get Access to Free COMPETITIVE EXAMS Mock Tests
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
