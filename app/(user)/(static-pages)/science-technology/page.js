"use client";

import { ResourceCard } from "@/components";
import React from "react";
import {
  FaBook,
  FaGlobe,
  FaLaptop,
  FaLightbulb,
  FaMicrophone,
  FaNewspaper,
} from "react-icons/fa";

const data = [
  {
    title: "Online Courses (STEM)",
    resources: [
      {
        id: 37,
        name: "Scientific American",
        url: "https://www.scientificamerican.com",
        color: "#007bff",
        icon: FaNewspaper,
      },
      {
        id: 38,
        name: "edX STEM Courses",
        url: "https://www.edx.org/learn/stem",
        color: "#007bff",
        icon: FaLaptop,
      },
      {
        id: 39,
        name: "MIT Technology Review",
        url: "https://www.technologyreview.com",
        color: "#007bff",
        icon: FaLightbulb,
      },
      {
        id: 36,
        name: "Google Scholar",
        url: "https://scholar.google.com",
        color: "#007bff",
        icon: FaBook,
      },
      {
        id: 35,
        name: "TechCrunch",
        url: "https://techcrunch.com",
        color: "#007bff",
        icon: FaMicrophone,
      },
      {
        id: 34,
        name: "National Geographic Science",
        url: "https://www.nationalgeographic.com/science",
        color: "#007bff",
        icon: FaGlobe,
      },
    ],
  },
];

function ScienceAndtechnology() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* HEADER PART */}
      <h1 className="text-3xl font-bold text-center my-6">
        Science & Technology
      </h1>

      {data.map((section) => (
        <div key={section.title} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.resources.map((item, index) => (
              <ResourceCard item={item} key={index} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ScienceAndtechnology;
