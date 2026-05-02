"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import { FaBookOpen } from "react-icons/fa";
import Link from "next/link";
import { MockTestSubCard } from "@/components";

export default function Page() {

  const testCards = [
    {
      title: "IAS",
      description: "Comprehensive mock tests for UPSC IAS prelims and mains with detailed analysis.",
      link: "/take-test/advance/adv-ias",
      aos: "fade-up",
    },
    {
      title: "राज्यसेवा पूर्व व मुख्य परीक्षा",
      description: "राज्यसेवा पूर्व व मुख्य परीक्षेसाठी संपूर्ण अभ्यासक्रमावर आधारित मॉक टेस्ट व सराव प्रश्नसंच.",
      link: "/take-test/advance/adv-rajyaseva-prelims-mains",
      aos: "fade-up",
    },
    {
      title: "PSI / STI / ASST.",
      description: "PSI, STI आणि Assistant पदांसाठी परीक्षानिहाय सराव प्रश्नसंच व मॉक टेस्ट.",
      link: "/take-test/advance/adv-psi-sti-asst",
      aos: "fade-up",
    },
    {
      title: "महाराष्ट्र अराजपत्रित गट-ब (संयुक्त) पूर्व व मुख्य परीक्षा",
      description: "अराजपत्रित गट-ब संयुक्त पूर्व व मुख्य परीक्षेसाठी सविस्तर सराव प्रश्नसंच व मॉक टेस्ट.",
      link: "/take-test/advance/adv-maharashtra-arajpatrit-group-b",
      aos: "fade-up",
    },
    {
      title: "नागरी सेवा राजपत्रित (राज्यसेवा) पूर्व परीक्षा",
      description: "राज्यसेवा पूर्व परीक्षेसाठी संपूर्ण अभ्यासक्रमावर आधारित मॉक टेस्ट व सराव प्रश्नसंच.",
      link: "/take-test/advance/adv-rajyaseva-prelims",
      aos: "fade-up",
    },
    {
      title: "MPSC",
      description: "Comprehensive mock tests for MPSC prelims and mains with detailed analysis.",
      link: "/take-test/advance/adv-mpsc",
      aos: "fade-up",
    },
    {
      title: "PSI / STI / ASO",
      description: "Targeted practice sets for PSI, STI, and ASO exams with exam-level questions.",
      link: "/take-test/advance/adv-psi-sti-aso",
      aos: "fade-up",
    },
    {
      title: "राज्य उत्पादन शुल्क निरीक्षक",
      description: "राज्य उत्पादन शुल्क निरीक्षक परीक्षेसाठी खास तयार केलेले सराव प्रश्नसंच व मॉक टेस्ट.",
      link: "/take-test/advance/adv-rajya-utpadan-shulk-nirikshak",
      aos: "fade-up",
    },
    {
      title: "कर सहायक",
      description: "कर सहायक परीक्षेसाठी विषयानुसार व पूर्ण लांबीचे मॉक टेस्टसह तयारी करा.",
      link: "/take-test/advance/adv-kar-sahayak",
      aos: "fade-up",
    },
    {
      title: "ARTI",
      description: "Focused mock tests for ARTI exams to improve accuracy and conceptual clarity.",
      link: "/take-test/advance/adv-arti",
      aos: "fade-up",
    },
    {
      title: "लिपिक-टंकलेखक",
      description: "लिपिक-टंकलेखक परीक्षेसाठी सराव प्रश्नसंच व मॉक टेस्टद्वारे प्रभावी तयारी करा.",
      link: "/take-test/advance/adv-lipik-tanklekhak",
      aos: "fade-up",
    },
    {
      title: "DEPT PSI",
      description: "Departmental PSI exam preparation with real exam pattern mock tests.",
      link: "/take-test/advance/adv-dept-psi",
      aos: "fade-up",
    },
    {
      title: "महाराष्ट्र नागरी सेवक (राजपत्रित संयुक्त)",
      description: "राजपत्रित संयुक्त पूर्व व मुख्य परीक्षेसाठी संपूर्ण अभ्यास व मॉक टेस्ट.",
      link: "/take-test/advance/adv-maharashtra-nagari-sevak",
      aos: "fade-up",
    },
    {
      title: "तलाठी",
      description: "तलाठी भरती परीक्षेसाठी अद्ययावत अभ्यासक्रमावर आधारित मॉक टेस्ट.",
      link: "/take-test/advance/adv-talathi",
      aos: "fade-up",
    },
    {
      title: "ग्रामसेवक",
      description: "ग्रामसेवक परीक्षेसाठी संरचित व सरावाधारित मॉक टेस्टद्वारे तयारी करा.",
      link: "/take-test/advance/adv-gramsevak",
      aos: "fade-up",
    },
    {
      title: "वनरक्षक",
      description: "वनरक्षक परीक्षेसाठी महत्त्वाच्या विषयांवर आधारित मॉक टेस्ट.",
      link: "/take-test/advance/adv-vanrakshak",
      aos: "fade-up",
    },
    {
      title: "कृषी सहायक",
      description: "कृषी सहायक परीक्षेसाठी विषयनिहाय सराव व मॉक टेस्ट.",
      link: "/take-test/advance/adv-krushi-sahayak",
      aos: "fade-up",
    },
    {
      title: "TCS / IBPS",
      description: "Highly useful mock tests for banking and TCS-based exams like IBPS.",
      link: "/take-test/advance/adv-tcs-ibps",
      aos: "fade-up",
    }
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
              ADVANCE LEVEL MOCK TESTS
            </h2>
            <p className="text-lg md:text-xl font-medium">
              Get Access to Free Advance Level Mock Tests
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