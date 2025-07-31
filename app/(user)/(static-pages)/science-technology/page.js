"use client";

import { ExternalResourceCard } from "@/components";
import React from "react";
import {
  FaBook,
  FaGlobe,
  FaLaptop,
  FaLightbulb,
  FaMicrophone,
  FaNewspaper,
} from "react-icons/fa";

const resources = [
  {
    id: 37,
    name: "Scientific American",
    link: "https://www.scientificamerican.com",
    color: "#007bff",
    icon: FaNewspaper,
  },
  {
    id: 38,
    name: "edX STEM Courses",
    link: "https://www.edx.org/learn/stem",
    color: "#007bff",
    icon: FaLaptop,
  },
  {
    id: 39,
    name: "MIT Technology Review",
    link: "https://www.technologyreview.com",
    color: "#007bff",
    icon: FaLightbulb,
  },
  {
    id: 36,
    name: "Google Scholar",
    link: "https://scholar.google.com",
    color: "#007bff",
    icon: FaBook,
  },
  {
    id: 35,
    name: "TechCrunch",
    link: "https://techcrunch.com",
    color: "#007bff",
    icon: FaMicrophone,
  },
  {
    id: 34,
    name: "National Geographic Science",
    link: "https://www.nationalgeographic.com/science",
    color: "#007bff",
    icon: FaGlobe,
  },
];

function ScienceAndtechnology() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* HEADER PART */}
      <h1 className="text-3xl font-bold text-center my-6">
        Science & Technology
      </h1>
      {/* <div className="text-right mb-6">
                <a
                    href="/bookmark/index"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    View Bookmarks
                </a>
            </div> */}

      {/*Online Courses (STEM) */}
      <h2 className="text-2xl font-semibold my-6">Online Courses (STEM)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((item, index) => (
          <ExternalResourceCard item={item} key={index} />
        ))}
      </div>
    </div>
  );
}

export default ScienceAndtechnology;