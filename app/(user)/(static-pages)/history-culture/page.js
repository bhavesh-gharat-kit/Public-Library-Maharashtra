"use client";

import React from "react";
import { FaBook, FaGlobe, FaLandmark, FaFilm, FaUser } from "react-icons/fa";

import { ResourceCard } from "@/components";

function HistoryAndCulture() {
  const data = [
    {
      title: "Cultural Documentaries",
      items: [
        {
          id: 48,
          name: "Smithsonian Channel",
          url: "https://www.smithsonianchannel.com",
          icon: FaFilm,
          color: "#007bff",
        },
      ],
    },
    {
      title: "Indian History",
      items: [
        {
          id: 46,
          name: "History India",
          url: "https://thebetterindia.com/topics/culture/history/",
          icon: FaLandmark,
          color: "#007bff",
        },
      ],
    },

    {
      title: "Historical Sites & Museums (Virtual Tours)",
      items: [
        {
          id: 50,
          name: "Google Arts & Culture",
          url: "https://artsandculture.google.com/",
          icon: FaUser,
          color: "#007bff",
        },
      ],
    },
    {
      title: "Biographies",
      items: [
        {
          id: 50,
          name: "Biography",
          url: "https://celadonbooks.com/what-is-a-biography/",
          icon: FaUser,
          color: "#007bff",
        },
      ],
    },
    {
      title: "Mythology & Folklore",
      items: [
        {
          id: 51,
          name: "Mythopedia",
          url: "https://mythopedia.com",
          icon: FaBook,
          color: "#007bff",
        },
      ],
    },
    {
      title: "World History",
      items: [
        {
          id: 47,
          name: "BBC History",
          url: "https://www.bbc.co.uk/history",
          icon: FaGlobe,
          color: "#007bff",
        },
      ],
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* HEADER PART */}
      <h1 className="text-3xl font-bold text-center my-6">History & Culture</h1>

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
}

export default HistoryAndCulture;
