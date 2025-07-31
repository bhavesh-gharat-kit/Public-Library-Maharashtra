"use client";

import { ExternalResourceCard } from "@/components";
import React from "react";
import {
  FaBookOpen,
  FaBook,
  FaStar,
  FaBookReader,
  FaFeatherAlt,
  FaUniversity,
} from "react-icons/fa";

const resources = [
  {
    id: 40,
    name: "Project Gutenberg",
    link: "https://www.gutenberg.org",
    icon: FaBookOpen,
    color: "#007bff",
  },
  {
    id: 45,
    name: "Google Books",
    link: "https://books.google.com",
    icon: FaBook, // originally a string, now mapped
    color: "#007bff",
  },
  {
    id: 44,
    name: "Book Riot",
    link: "https://bookriot.com",
    icon: FaStar,
    color: "#007bff",
  },
  {
    id: 41,
    name: "Goodreads",
    link: "https://www.goodreads.com",
    icon: FaBookReader,
    color: "#007bff",
  },
  {
    id: 43,
    name: "Poetry Foundation",
    link: "https://www.poetryfoundation.org",
    icon: FaFeatherAlt,
    color: "#007bff",
  },
  {
    id: 42,
    name: "Open Library",
    link: "https://openlibrary.org",
    icon: FaUniversity,
    color: "#007bff",
  },
];

function LiteratureAndNovels() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* HEADER PART */}
      <h1 className="text-3xl font-bold text-center my-6">
        Literature & Novels
      </h1>
      <div className="text-right mb-6">
        <a
          href="/bookmark/index"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View Bookmarks
        </a>
      </div>

      {/* CLASSIC LITERATURE */}
      <h2 className="text-2xl font-semibold my-6">Classic Literature</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((item, index) => (
          <ExternalResourceCard item={item} key={index} />
        ))}
      </div>
    </div>
  );
}

export default LiteratureAndNovels;
