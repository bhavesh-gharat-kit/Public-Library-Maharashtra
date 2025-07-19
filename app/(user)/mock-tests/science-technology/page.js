"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  faChalkboardTeacher,
  faNewspaper,
  faFlask,
  faVideo,
  faBookOpen,
  faFileAlt,
  faL,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Page() {
  useEffect(() => {
    AOS.init({
      once: false,
      duration: 700,
      easing: "ease-in-out",
      offset: 120,
    });
  }, []);

  const allResources = [
    {
      type: "Online Courses (STEM)",
      title: "edX STEM Courses",
      icon: faChalkboardTeacher,
      color: "text-sky-600",
      aos: "slide-right",
      link: "https://www.edx.org/learn/stem",
    },
    {
      type: "Technology News",
      title: "TechCrunch",
      icon: faNewspaper,
      color: "text-rose-500",
      aos: "slide-up",
      link: "https://techcrunch.com/",
    },
    {
      type: "Innovation & Discoveries",
      title: "MIT Technology Review",
      icon: faFlask,
      color: "text-yellow-500",
      aos: "slide-left",
      link: "https://www.technologyreview.com/",
    },
    {
      type: "Science Documentaries",
      title: "National Geographic Science",
      icon: faVideo,
      color: "text-red-500",
      aos: "slide-right",
      link: "https://www.nationalgeographic.com/science",
    },
    {
      type: "Science Magazines",
      title: "Scientific American",
      icon: faBookOpen,
      color: "text-orange-400",
      aos: "slide-up",
      link: "https://www.scientificamerican.com/",
    },
    {
      type: "Research Papers & Journals",
      title: "Google Scholar",
      icon: faFileAlt,
      color: "text-indigo-600",
      aos: "slide-left",
      link: "https://scholar.google.com/",
    },
  ];

  return (
    <>
      
      <main className="min-h-screen bg-white text-gray-500">
        <section className="py-14">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-center text-4xl font-extrabold text-emerald-400 mb-16 drop-shadow-md">
              📚 Science & Technology
            </h1>

            <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
              {allResources.map((res, i) => (
                <div
                  key={i}
                  className="relative p-4 rounded-5xl border border-white/30 bg-white/20 backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
                  data-aos={res.aos}
                  data-aos-delay={i * 100}
                >
                  {/* Tag */}
                  <div className="absolute -top-3 left-1/2 w-60 transform -translate-x-1/2 bg-gray/50 px-5 py-2 text-sm font-medium text-blue-400 rounded-full shadow backdrop-blur-sm border border-blue/30">
                    {res.type}
                  </div>

                  {/* Icon */}
                  <div className={`text-3xl mt-6 mb-4 ${res.color}`}>
                    <FontAwesomeIcon icon={res.icon} />
                  </div>

                  {/* Title */}
                  <h3 className="text-md font-bold text-gray-800 mb-4 leading-snug">
                    {res.title}
                  </h3>

                  {/* Link */}
                  <a
                    href={res.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm py-2 px-6 rounded-2xl font-semibold mt-auto
  bg-white/20 backdrop-blur-md border border-white/30 text-black
  hover:bg-white/30 hover:backdrop-blur-xl hover:text-black hover:font-bold 
  transition duration-300 ease-in-out shadow-md"

                  >
                    View Details 
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
    </>
  );
}
