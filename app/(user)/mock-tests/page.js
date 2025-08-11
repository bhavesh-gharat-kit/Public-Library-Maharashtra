"use client";

import React, { useEffect, useState } from "react";
import { Header, Footer } from "@/components";

import {
  FaArrowRight,
  FaBook,
  FaLightbulb,
  FaChalkboardTeacher,
} from "react-icons/fa";
import Link from "next/link";

const tests = [
  {
    title: "IIT JEE",
    desc: "Engineering entrance exam preparation.",
    logo: "/assets/img/mocktest-logos/jee.jpeg",
    link: "/mock-tests/jee",
    aos: "flip-left",
  },
  {
    title: "Competitive Exams",
    desc: "UPSC, SSC, Railways & more.",
    logo: "/assets/img/mocktest-logos/competitive.jpeg",
    link: "/mock-tests/competetive-exams",
    aos: "zoom-out",
  },
  {
    title: "UPSC",
    desc: "Union Public Service Commission exams.",
    logo: "/assets/img/mocktest-logos/upsc.jpeg",
    link: "/mock-tests/upsc",
    aos: "slide-right",
  },
  {
    title: "MPSC",
    desc: "Maharashtra Public Service Commission preparation.",
    logo: "/assets/img/mocktest-logos/mpsc.jpeg",
    link: "/mock-tests/mpsc",
    aos: "slide-up",
  },
  // {
  //   title: "NEET",
  //   desc: "Medical entrance mock tests.",
  //   logo: "/assets/img/mocktest-logos/neet.jpeg",
  //   link: "/mock-tests/neet",
  //   aos: "flip-right",
  // },
  {
    title: "CA CS CMA",
    desc: "Professional exams for commerce students.",
    logo: "/assets/img/mocktest-logos/cacscma.jpeg",
    link: "/mock-tests/cacscma",
    aos: "fade-up",
  },
  // {
  //   title: "CTET",
  //   desc: "Central Teacher Eligibility Test preparation.",
  //   logo: "/assets/img/mocktest-logos/ctet.png",
  //   link: "/mock-tests/ctet",
  //   aos: "zoom-in",
  // },
  // {
  //   title: "CUET",
  //   desc: "UG entrance test practice series.",
  //   logo: "/assets/img/mocktest-logos/cuet.jpeg",
  //   link: "/mock-tests/cuet",
  //   aos: "slide-left",
  // },
  // {
  //   title: "English Grammar",
  //   desc: "Grammar practice for competitive exams.",
  //   logo: "/assets/img/mocktest-logos/english.png",
  //   link: "/mock-tests/english-grammar",
  //   aos: "fade-right",
  // },
  // {
  //   title: "CBSE",
  //   desc: "Mock tests from class 6th to 12th.",
  //   logo: "/assets/img/mocktest-logos/cbse.png",
  //   link: "/mock-tests/cbse",
  //   aos: "flip-up",
  // },
  // {
  //   title: "NTSE",
  //   desc: "National Talent Search Examination practice.",
  //   logo: "/assets/img/mocktest-logos/ntse.jpeg",
  //   link: "/mock-tests/ntse",
  //   aos: "fade-left",
  // },
  // {
  //   title: "Olympiad",
  //   desc: "Practice for SOF and other olympiads.",
  //   logo: "/assets/img/mocktest-logos/olympiad.png",
  //   link: "/mock-tests/olympiad",
  //   aos: "fade-down",
  // },
];

function FlipCard({ test, delay }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative [perspective:1000px] h-56 w-full cursor-pointer"
      data-aos={test.aos}
      data-aos-delay={delay}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full duration-700 transform-style-preserve-3d transition-transform ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front Side */}
        <div className="absolute w-full h-full bg-white rounded-xl shadow-lg hover:shadow-purple-300 transition-shadow duration-500 flex flex-col justify-center items-center p-4 gap-4 backface-hidden border border-gray-200">
          <img
            src={test.logo}
            alt={test.title}
            className="w-20 h-20 object-contain"
            loading="lazy"
          />
          <h3 className="text-lg font-bold text-purple-700">{test.title}</h3>
          <span className="text-gray-400 text-sm">Tap to flip</span>
        </div>

        {/* Back Side */}
        <div className="absolute w-full h-full bg-purple-600 text-white rounded-xl flex flex-col justify-center items-center text-center px-6 py-4 rotate-y-180 backface-hidden">
          <p className="text-sm leading-relaxed">{test.desc}</p>
          <Link
            href={test.link}
            className="mt-4 inline-flex items-center gap-2 bg-white text-purple-700 px-4 py-2 text-sm font-semibold rounded-full hover:bg-gray-100 transition"
          >
            Start Test <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function MockTests() {
  useEffect(() => {
    import("aos").then((AOS) => {
      AOS.init({
        duration: 700,
        easing: "ease-in-out",
        once: true,
      });
    });
  }, []);

  return (
    <>
      <section className="py-4 md:py-8 bg-gradient-to-b from-white to-gray-100 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          {/* Heading */}
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

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tests.map((test, i) => (
              <FlipCard key={i} test={test} delay={i * 100} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
