"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; 
import {Header, Footer} from "@/components";

export default function Page() {
  useEffect(() => {
    AOS.init({
      once: false,
      duration: 500,
      easing: "ease-in-out",
      offset: 100,
    });
  }, []);

  const allResources = [
    {
      title: "Digital Marketing in Hindi",
      videoUrl: "https://www.youtube.com/watch?v=zdi5hEDNmzY",
      file: "/books/English-Balbharti.pdf",
      desc: "A beginner-friendly video course in Hindi explaining the fundamentals of digital marketing, including SEO, social media, content strategy, and more — perfect for students, entrepreneurs, and freelancers.",
      aos: "fade-up",
    },
    {
      title: "The Complete Android App Developer Course",
      videoUrl: "https://www.youtube.com/watch?v=NLvaOL6Cm48",
      file: "/books/solar-cells.pdf",
      desc: "Kickstart your career in app development! Learn to build powerful Android apps using Java and Android Studio in this hands-on course for beginners.",
      aos: "zoom-in",
    },
    {
      title: "Film Production",
      videoUrl: "https://www.youtube.com/watch?v=puF9CkvmJt0",
      file: "/books/power-quality.pdf",
      desc: "Lights, camera, ACTION! 🎥 Get a behind-the-scenes look at how films are made from idea to final cut — explained in a super engaging format.",
      aos: "slide-up",
    },
    {
      title: "Introduction to Anthropology",
      videoUrl: "https://www.youtube.com/watch?v=LYUzIf12qac",
      file: "/books/biotech.pdf",
      desc: "Why do humans live the way we do? Dive into anthropology to explore evolution, culture, rituals, and everything that makes us US",
      aos: "flip-up",
    },
    {
      title: "Biotechnology: Fundamentals",
      videoUrl: "https://www.youtube.com/watch?v=RrTCjp2015M",
      file: "/books/biodiversity.pdf",
      desc: "Learn how DNA, cells, and science shape the future! This beginner-friendly course breaks down biotech basics and their use in medicine, farming, and innovation.",
      aos: "fade-down",
    },
    {
      title: "Modern and Contemporary American Poetry",
      videoUrl: "https://www.youtube.com/watch?v=PUok9h6uvO0",
      file: "/books/biochemistry.pdf",
      desc: "Take a journey through American poetry, from modernist classics to bold contemporary voices. A must-watch for lit lovers and curious minds alike.",
      aos: "zoom-out",
    },
  ];

  const getYouTubeID = (url) => {
    const match = url.match(/(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  };

  return (
    <>
      
      <main className="bg-gray-50 py-12 px-4 md:px-10 lg:px-20">
        <div className="max-w-[1440px] mx-auto">
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-10 text-center">
           Job Training Videos
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allResources.map((item, index) => {
              const videoId = getYouTubeID(item.videoUrl);
              const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300 flex flex-col min-h-[240px]"
                  data-aos={item.aos}
                  data-aos-delay={index * 100}
                >
                  {/* Thumbnail */}
                  <div
                    className="h-52 w-full cursor-pointer"
                    onClick={() => window.open(item.videoUrl, "_blank")}
                  >
                    <img
                      src={thumbnailUrl}
                      alt={item.title}
                      className="w-full h-full object-cover rounded-t-2xl"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 px-5 py-4 flex flex-col justify-between gap-2">
                    <h3 className="text-base font-semibold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {item.desc}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="px-5 pb-5 mt-auto flex gap-3">
                    <a
                      href={item.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-1/2 text-center text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-800 border border-indigo-800 rounded-md py-2 transition-all duration-300"
                    >
                      Watch →
                    </a>
                    <a
                      href={item.file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-1/2 text-center text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-800 border border-indigo-800 rounded-md py-2 transition-all duration-300"
                    >
                      Bookmark 📌
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      
    </>
  );
}
