"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import { FaBookOpen } from "react-icons/fa";
import { MockTestSubCard } from "@/components";

export default function Page() {
  useEffect(() => {
    AOS.init({ once: true, duration: 800, easing: "ease-in-out" });
  }, []);

  const testCards = [
    {
      title: "NCERT (UPSC) हिंदी",
      desc: "UPSC तैयारी के लिए एनसीईआरटी आधारित मॉक टेस्ट, विशेष रूप से हिंदी माध्यम के छात्रों के लिए।",
      link: "/take-test/upsc-ncert-hindi",
      aos: "fade-up",
    },
    {
      title: "NCERT Geography",
      desc: "Master NCERT Geography with UPSC-focused mock tests covering physical, human, and Indian geography.",
      link: "/take-test/upsc-ncert-geography",
      aos: "fade-down",
    },
    {
      title: "NCERT History",
      desc: "Revise NCERT History with exam-oriented tests on Ancient, Medieval, and Modern India.",
      link: "/take-test/upsc-ncert-history",
      aos: "fade-down",
    },
    {
      title: "NCERT Indian Polity",
      desc: "Sharpen your understanding of NCERT Polity concepts with UPSC-style questions and tests.",
      link: "/take-test/upsc-ncert-polity",
      aos: "fade-down",
    },
    {
      title: "Reasoning and Aptitude",
      desc: "Enhance logical reasoning and quantitative aptitude with practice sets designed for competitive exams.",
      link: "/take-test/upsc-reasoning-aptitude",
      aos: "fade-down",
    },
    {
      title: "सामान्य बुद्धि एवं तर्कशक्ति",
      desc: "सामान्य अध्ययन के लिए बुद्धि एवं तर्कशक्ति से जुड़े प्रश्नों का अभ्यास करें और अपनी तैयारी मजबूत करें।",
      link: "/take-test/upsc-samanya-buddhi",
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
              Best Mock Tests for UPSC
            </h2>
            <p className="text-lg md:text-xl font-medium">
              Get Access to Free UPSC Mock Tests
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