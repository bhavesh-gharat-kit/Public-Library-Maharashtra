"use client";

import {
  faCamera,
  faPaintBrush,
  faSeedling,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { ResourceCardFortAwesome } from "@/components";

const data = [
  {
    title: "Art & Craft",
    items: [
      {
        id: 26,
        title: "Pinterest Art & Craft",
        url: "https://alison.com/tag/arts-and-crafts",
        icon: faPaintBrush,
        color: "#007bff",
      },
    ],
  },
  {
    title: "Cooking",
    items: [
      {
        id: 26,
        title: "AllRecipes",
        url: "https://www.allrecipes.com",
        icon: faUtensils,
        color: "#007bff",
      },
    ],
  },
  {
    title: "Photography",
    items: [
      {
        id: 25,
        title: "Photography Life",
        url: "https://photographylife.com",
        icon: faCamera,
        color: "#007bff",
      },
    ],
  },
  {
    title: "Gardening",
    items: [
      {
        id: 27,
        title: "Gardener's World",
        url: "https://www.gardenersworld.com",
        icon: faSeedling,
        color: "#007bff",
      },
    ],
  },
];

function HobbiesAndInterest() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* HEADER PART */}
      <h1 className="text-3xl font-bold text-center my-6">
        Hobbies & Interests
      </h1>

      {data.map((section) => (
        <div key={section.title} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.items.map(({ icon, color, name, url }, index) => (
              <ResourceCardFortAwesome
                key={index}
                icon={icon}
                color={color}
                name={name}
                url={url}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default HobbiesAndInterest;
