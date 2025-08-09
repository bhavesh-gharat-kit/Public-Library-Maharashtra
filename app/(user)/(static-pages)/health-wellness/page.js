"use client";
import React from "react";
import { ResourceCard } from "@/components";
import { FaAppleAlt, FaDumbbell, FaHeart, FaSpa } from "react-icons/fa";

const data = [
  {
    title: "Yoga & Meditation",
    items: [
      {
        id: 58,
        name: "Yoga Journal",
        url: "https://www.yogajournal.com",
        icon: FaSpa,
        color: "#007bff",
      },
    ],
  },
  {
    title: "Mental Health Resources",
    items: [
      {
        id: 59,
        name: "Mental Health Foundation",
        url: "https://www.mentalhealth.org.uk",
        icon: FaHeart,
        color: "#007bff",
      },
    ],
  },
  {
    title: "Fitness Programs",
    items: [
      {
        id: 61,
        name: "Fitness Blender",
        url: "https://www.fitnessblender.com",
        icon: FaDumbbell,
        color: "#007bff",
      },
    ],
  },
  {
    title: "Nutrition & Diet",
    items: [
      {
        id: 60,
        name: "MyFitnessPal",
        url: "https://www.myfitnesspal.com",
        icon: FaAppleAlt,
        color: "#007bff",
      },
    ],
  },
];

const HealthWellnessPage = () => {

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl   ">
      <h1 className="text-3xl font-bold text-center mb-6">Health & Wellness</h1>

      {data.map((section) => (
        <div key={section.title} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.items.map((item, index) => (
             <ResourceCard item={item} key={index} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HealthWellnessPage;
    