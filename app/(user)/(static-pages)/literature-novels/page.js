"use client";

import { ResourceCard } from "@/components";
import React from "react";
import {
  FaBookOpen,
  FaBook,
  FaStar,
  FaBookReader,
  FaFeatherAlt,
  FaUniversity,
} from "react-icons/fa";

const data = [
  {
    title: "Classic Literature",
    resources: [
      {
        id: 40,
        name: "Project Gutenberg",
        url: "https://www.gutenberg.org",
        icon: FaBookOpen,
        color: "#007bff",
      },
      {
        id: 45,
        name: "Google Books",
        url: "https://books.google.com",
        icon: FaBook, // originally a string, now mapped
        color: "#007bff",
      },
      {
        id: 44,
        name: "Book Riot",
        url: "https://bookriot.com",
        icon: FaStar,
        color: "#007bff",
      },
      {
        id: 41,
        name: "Goodreads",
        url: "https://www.goodreads.com",
        icon: FaBookReader,
        color: "#007bff",
      },
      {
        id: 43,
        name: "Poetry Foundation",
        url: "https://www.poetryfoundation.org",
        icon: FaFeatherAlt,
        color: "#007bff",
      },
      {
        id: 42,
        name: "Open Library",
        url: "https://openlibrary.org",
        icon: FaUniversity,
        color: "#007bff",
      },
    ],
  },
];

function LiteratureAndNovels() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* HEADER PART */}
      <h1 className="text-3xl font-bold text-center my-6">
        Literature & Novels
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

export default LiteratureAndNovels;
