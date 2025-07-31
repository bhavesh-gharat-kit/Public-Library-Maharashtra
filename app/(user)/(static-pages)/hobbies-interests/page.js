"use client";

import {
  faCamera,
  faSeedling,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const gardeningResources = [
  {
    id: 27,
    title: "Gardener's World",
    url: "https://www.gardenersworld.com",
    icon: faSeedling,
    color: "#007bff",
  },
];

const photographyResources = [
  {
    id: 25,
    title: "Photography Life",
    url: "https://photographylife.com",
    icon: faCamera,
    color: "#007bff",
  },
];

const cookingResources = [
  {
    id: 26,
    title: "AllRecipes",
    url: "https://www.allrecipes.com",
    icon: faUtensils,
    color: "#007bff",
  },
];

function HobbiesAndInterest() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* HEADER PART */}
      <h1 className="text-3xl font-bold text-center my-6">
        Hobbies & Interests
      </h1>
      {/* <div className="text-right mb-6">
                <a
                    href="/bookmark/index"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    View Bookmarks
                </a>
            </div> */}

      {/* Gardening */}
      <h2 className="text-2xl font-semibold my-6">Gardening</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {gardeningResources.map((resource) => (
          <ResourceCard
            key={resource.id}
            id={resource.id}
            icon={resource.icon}
            color={resource.color}
            title={resource.title}
            url={resource.url} 
          />
        ))}
      </div>

      {/* PHOTOGRAPHY */}
      <h2 className="text-2xl font-semibold my-6">Photography</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photographyResources.map((resource) => (
          <ResourceCard
            key={resource.id}
            id={resource.id}
            icon={resource.icon}
            color={resource.color}
            title={resource.title}
            url={resource.url} 
          />
        ))}
      </div>

      {/* COOKING */}
      <h2 className="text-2xl font-semibold my-6">Cooking</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cookingResources.map((resource) => (
          <ResourceCard
            key={resource.id}
            id={resource.id}
            icon={resource.icon}
            color={resource.color}
            title={resource.title}
            url={resource.url} 
          />
        ))}
      </div>
    </div>
  );
}

function ResourceCard({ id, icon, color, title, url }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center">
      <FontAwesomeIcon icon={icon} size="3x" style={{ color }} />
      <h5 className="text-lg font-medium mt-4">{title}</h5>
      <div className="flex justify-center gap-3 mt-4">
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          View
        </a>
        <button 
          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
        >
          Bookmark
        </button>
      </div>
    </div>
  );
}

export default HobbiesAndInterest;
