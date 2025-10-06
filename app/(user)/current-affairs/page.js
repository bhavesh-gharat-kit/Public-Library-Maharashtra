"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaNewspaper, FaGlobe, FaCalendarAlt, FaPlay } from "react-icons/fa";
import { axios } from "@/utils";
import { FullScreenLoader, Loader } from "@/components";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function CurrentAffairsPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  useEffect(() => {
    AOS.init({ once: true, duration: 600, easing: "ease-in-out" });
  }, []);

  const features = [
    {
      icon: <FaNewspaper className="w-10 h-10 text-indigo-600" />,
      title: "Daily News",
      desc: "Stay updated with the most important national and international events.",
    },
    {
      icon: <FaGlobe className="w-10 h-10 text-green-600" />,
      title: "Global Coverage",
      desc: "Comprehensive coverage of world affairs, economy, science, and politics.",
    },
    {
      icon: <FaCalendarAlt className="w-10 h-10 text-pink-600" />,
      title: "Daily Tests",
      desc: "Practice with daily current affairs tests designed for exam preparation.",
    },
  ];

  const redirectToCurrentAffairs = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/api/user/tests/current-affairs");
      const testId = res?.data?.testId;
      if (!testId) return toast.error("Please try again");

      router.push(`/take-test/current-affairs/play/${testId}`);
    } catch (err) {
      console.error("Error fetching filters data:", err);
    } finally {
      setLoading(false);
    }
  };
  if (loading) return <FullScreenLoader />;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col">
      {/* Hero Section */}
      <section className="text-center px-6 py-16">
        <h1
          className="text-3xl sm:text-5xl font-bold text-gray-800 mb-4"
          data-aos="fade-up"
        >
          Current Affairs
        </h1>
        <p
          className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto mb-4"
          data-aos="fade-up"
          data-aos-delay={100}
        >
          Boost your preparation with daily Current Affairs. Stay ahead in exams
          with well-structured updates and quizzes.
        </p>
        <button
          className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-medium shadow-lg transition-all mx-auto"
          data-aos="zoom-in"
          data-aos-delay={200}
          onClick={redirectToCurrentAffairs}
        >
          <FaPlay />
          Start Quiz
        </button>
      </section>

      {/* Features Section */}
      <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto px-6 pb-12">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md p-6 text-center"
            data-aos="fade-up"
            data-aos-delay={idx * 150}
          >
            <div className="flex justify-center mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm">{feature.desc}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
