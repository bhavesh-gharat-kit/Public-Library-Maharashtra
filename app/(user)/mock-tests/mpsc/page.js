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
        "Comprehensive mock tests for MPSC and other state commissions covering all major subjects and previous-year patterns.",
      link: "/take-test/mpsc-state-commission",
      aos: "fade-up",
    },
    {
      title: "MPSC Assistant Section Officer",
      description:
        "Practice ASO-specific mock tests focusing on reasoning, Marathi grammar, and administrative aptitude.",
      link: "/take-test/mpsc-assistant-section-officer",
      aos: "fade-up",
    },
    {
      title: "Forest Services – English",
      description:
        "Solve mock papers for Forest Services in English with topic-wise and full-length test options.",
      link: "/take-test/mpsc-forest-services-english",
      aos: "fade-up",
    },
    {
      title: "PSI – Police Sub Inspector English",
      description:
        "Prepare for PSI exams with dedicated English-medium tests focusing on GK, reasoning, and aptitude.",
      link: "/take-test/mpsc-psi-police-sub-inspector-english",
      aos: "fade-up",
    },
    {
      title: "Rajyaseva Prelims",
      description:
        "Attempt full-length mock tests for MPSC Rajyaseva prelims covering all subjects as per the latest syllabus.",
      link: "/take-test/mpsc-rajyaseva-prelims",
      aos: "fade-up",
    },
    {
      title: "राज्यसेवा पूर्व परीक्षा",
      description:
        "मराठी माध्यमातील राज्यसेवा पूर्व परीक्षेचे मॉक टेस्ट्स सरावासाठी उपलब्ध, संपूर्ण अभ्यासक्रम कव्हर करणारे.",
      link: "/take-test/mpsc-राज्यसेवा-पूर्व-परीक्षा",
      aos: "fade-up",
    },
    {
      title: "वन सेवा परीक्षा – Marathi",
      description:
        "वन सेवा परीक्षेसाठी मराठी माध्यमातील प्रश्नपत्रिका, विषयवार आणि पूर्ण लांबीचे सराव पेपर्स.",
      link: "/take-test/mpsc-वन्-सेवा-परीक्षा-marathi",
      aos: "fade-up",
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
