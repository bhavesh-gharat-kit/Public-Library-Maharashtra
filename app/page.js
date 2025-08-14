"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Footer, Header } from "@/components";

export default function Home() {
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
      {/* <main className=" min-h-screen bg-yellow-50 mx-auto p-6 flex flex-col items-center gap-24">
        <section className="bg-yellow-50 border border-yellow-300 rounded-md max-w-4xl mx-auto p-5 md:p-10 relative">
          <div className="flex justify-center mb-6">
            <img src="/logo.png" alt="Logo" className="w-32 md:w-48 h-auto" />
          </div>

          <h1 className="text-center text-4xl text-red-600 mb-3 font-bold">
            लालबागचा राजा सार्वजनिक गणेशोत्सव मंडळ
          </h1>

          <p className="text-center text-blue-900 text-lg mb-3">संचालित,</p>

          <h2 className="text-center text-2xl text-red-600 font-semibold mb-4">
            लालबागचा राजा <span className="font-extrabold">AI</span> अंकिय
            ग्रंथालय
          </h2>

          <h3 className="text-center text-xl text-red-600 font-extrabold tracking-wide">
            LALBAUGCHA RAJA <span className="font-extrabold">AI</span> DIGITAL
            LIBRARY
          </h3>

          <div className="flex justify-end mt-8">
            <Link
              href="/home"
              className="bg-blue-900 text-white rounded-full px-5 py-2 hover:bg-blue-700 transition-colors text-sm font-semibold"
            >
              Go to Digital Library
            </Link>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {images.map((src, index) => (
              <div key={index} className="flex justify-center">
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
      </main> */}
      <div className="w-full h-auto bg-[#fffbd5] min-h-[90vh] md:hidden">
        <div className="relative">
          <img
            src="/assets/img/home/front-page-o.jpg"
            className="w-full h-auto max-w-[900px] mx-auto"
          />
          <div className="flex justify-end mt-8 absolute right-[5%] md:right-[10%] top-[35%]">
            <Link
              href="/home"
              className="bg-blue-900 text-white rounded-full px-5 py-2 hover:bg-blue-700 transition-colors text-sm font-semibold"
            >
              Go to Digital Library
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full h-auto items-center justify-center bg-[#fffbd5] min-h-[90vh] hidden md:flex">
        <div className="relative">
          <img
            src="/assets/img/home/front-page.jpg"
            className="w-auto md:h-[85vh]  mx-auto"
          />
          <div className="flex justify-end mt-8 absolute right-[5%] md:right-[0%] top-[20%]">
            <Link
              href="/home"
              className="bg-blue-900 text-white rounded-full px-3 py-2 hover:bg-blue-700 transition-colors text-xs font-semibold"
            >
              Go to Digital Library
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}
