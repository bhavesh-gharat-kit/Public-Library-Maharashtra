"use client";
import React from "react";
import toast from "react-hot-toast";
import {
  FaBook,
  FaFlask,
  FaGamepad,
  FaMusic,
  FaTv,
  FaVideo,
} from "react-icons/fa";
import { ExternalResourceCard } from "@/components";

const sections = [
  {
    title: "Learning Videos (Alphabet, Numbers, Colors)",
    resources: [
      {
        id: 32,
        name: "ABCmouse",
        url: "https://www.abcmouse.com",
        icon: FaVideo,
        color: "#007bff",
      },
    ],
  },
  {
    title: "Fun Science Experiments",
    resources: [
      {
        id: 31,
        name: "Science Bob",
        url: "https://sciencebob.com/category/experiments",
        icon: FaFlask,
        color: "#007bff",
      },
    ],
  },
  {
    title: "Rhymes & Songs",
    resources: [
      {
        id: 33,
        name: "Nursery Rhymes",
        url: "https://www.youtube.com/channel/UCbCmjCuTUZos6Inko4u57UQ",
        icon: FaMusic,
        color: "#007bff",
      },
    ],
  },
  {
    title: "Educational Games",
    resources: [
      {
        id: 30,
        name: "PBS Kids Games",
        url: "https://pbskids.org/games",
        icon: FaGamepad,
        color: "#007bff",
      },
    ],
  },
  {
    title: "Cartoons & Animated Series",
    resources: [
      {
        id: 28,
        name: "Cartoon Network",
        url: "https://www.cartoonnetwork.com",
        icon: FaTv,
        color: "#007bff",
      },
    ],
  },
  {
    title: "Children's Books & Stories",
    resources: [
      {
        id: 29,
        name: "Storyberries",
        url: "https://www.storyberries.com",
        icon: FaBook,
        color: "#007bff",
      },
    ],
  },
];

const ChildrenSectionPage = () => {
  const handleBookmark = (id, name) => {
    // Placeholder for actual bookmark logic
    toast.success(`Bookmark added for ${name}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">
        Children's Section
      </h1>

      {/* <div className="text-right mb-6">
        <a
          href="/bookmark/index"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View Bookmarks
        </a>
      </div> */}

      {sections.map((section) => (
        <div key={section.title} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.resources.map((item, index) => (
              <ExternalResourceCard item={item} key={index} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChildrenSectionPage;
