"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Header, Footer } from "@/components";
import { FaBookOpen, FaArrowRight } from "react-icons/fa";
import Link from "next/link";

export default function Page() {
  useEffect(() => {
    AOS.init({ once: true, duration: 800, easing: "ease-in-out" });
  }, []);

  const testCards = [
    {
      title: "CA Foundation",
      description:
        "Practice mock tests curated for aspiring Chartered Accountants.",
      link: "/take-test/ca-foundation",
      aos: "fade-up",
    },
    {
      title: "CMA Foundation",
      description:
        "Ace your Cost & Management Accounting entrance with these tests.",
      link: "/take-test/cma-foundation",
      aos: "slide-up",
    },
    {
      title: "CS Executive",
      description:
        "Boost your Company Secretary prep with structured mock exams.",
      link: "/take-test/cs-executive",
      aos: "flip-up",
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
              <FaBookOpen  />
              CA, CS & CMA Mock Tests
            </h2>
            <p className="text-lg md:text-xl font-medium">
            Get instant access to free, high-quality mock test series.
            </p>
          </div>

          {/* Cards Section */}
          <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {testCards.map((card, idx) => (
              <div
                key={idx}
                data-aos={card.aos}
                data-aos-delay={idx * 100}
                className="group bg-white shadow-lg hover:shadow-purple-300 rounded-2xl p-6 transition duration-500 border hover:border-purple-500 flex flex-col justify-between"
              >
                <div>
                  <h3 className="text-xl font-bold text-purple-700 mb-2 group-hover:underline">
                    {card.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{card.description}</p>
                </div>
                <Link
                  href={card.link}
                  className="mt-auto inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-800 border border-purple-800 rounded-md py-2 px-4 transition-all duration-300"
                >
                  Explore Tests
                  <FaArrowRight />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
