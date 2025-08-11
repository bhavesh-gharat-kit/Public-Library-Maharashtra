"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaBookOpen,
  FaSearch,
  FaUserFriends,
  FaLaptopCode,
} from "react-icons/fa";
import { Footer, Header } from "@/components";

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const [showModal, setShowModal] = useState(false);

  const images = [
    "/assets/img/home/img1.jpg",
    "/assets/img/home/img2.jpg",
    "/assets/img/home/img3.jpg",
    "/assets/img/home/img4.jpg",
    "/assets/img/home/img-ai.jpg", // middle
    "/assets/img/home/img5.jpg",
    "/assets/img/home/img6.jpg",
    "/assets/img/home/img7.jpg",
    "/assets/img/home/img8.jpg",
  ];

  return (
    <>
      <Header />
      <main className=" min-h-screen max-w-6xl mx-auto p-6 flex flex-col items-center gap-24">
        <section className="bg-yellow-50 border border-yellow-300 rounded-md max-w-4xl mx-auto p-5 md:p-10 relative font-sans">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src="/logo.png" alt="Logo" className="w-32 md:w-48 h-auto" />
          </div>

          {/* Main Heading in Marathi */}
          <h1
            className="text-center text-4xl font-bold text-red-600 mb-3"
            style={{ fontFamily: "'Baloo 2', cursive" }}
          >
            लालबागचा राजा सार्वजनिक गणेशोत्सव मंडळ
          </h1>

          {/* Subheading */}
          <p
            className="text-center text-blue-900 text-lg mb-3"
            style={{ fontFamily: "'Noto Sans Devanagari', sans-serif" }}
          >
            संचालित,
          </p>

          {/* Secondary Heading */}
          <h2
            className="text-center text-2xl text-red-600 font-semibold mb-4"
            style={{ fontFamily: "'Baloo 2', cursive" }}
          >
            लालबागचा राजा <span className="font-extrabold">AI</span> अंकिय ग्रंथालय
          </h2>

          {/* English Heading */}
          <h3
            className="text-center text-xl text-red-600 font-extrabold tracking-wide"
            style={{ fontFamily: "'Baloo 2', cursive" }}
          >
            LALBAUGCHA RAJA <span className="font-extrabold">AI</span> DIGITAL
            LIBRARY
          </h3>

          {/* Button */}
          <div className="flex justify-end mt-8">
            <Link
              href="/home"
              className="bg-blue-900 text-white rounded-full px-5 py-2 hover:bg-blue-700 transition-colors text-sm font-semibold"
            >
              Go to Digital Library
            </Link>
          </div>

          {/* Image Grid */}
          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {images.map((src, index) => (
              <div
                key={index}
                className="flex justify-center"
              >
                <img
                  src={src}
                  alt={`Library ${index + 1}`}
                  className={`shadow-sm shadow-orange-200 hover:shadow-md transition-all duration-500 object-cover ${
                    index === 4
                      ? "rounded-full w-40 h-40 sm:w-48 sm:h-48"
                      : "rounded-md w-full h-auto"
                  }`}
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
