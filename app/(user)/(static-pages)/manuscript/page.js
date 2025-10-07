"use client";

import React, { useEffect } from "react";
import { FaPenFancy, FaLeaf, FaBookOpen, FaScroll, FaFeatherAlt } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

export default function ManuscriptCategoriesPage() {
  useEffect(() => {
    AOS.init({ duration: 400, once: true });
  }, []);

  const categories = [
    {
      id: 1,
      name: "Palm Leaf Manuscripts",
      link: "/manuscript/palm-leaves",
      icon: <FaLeaf className="text-green-600 text-3xl" />,
      description: "Ancient scriptures etched meticulously on dried palm leaves, preserved through generations.",
      color: "bg-green-50 hover:bg-green-100",
    },
    // {
    //   id: 2,
    //   name: "Copper Plate Records",
    //   link: "#",
    //   icon: <FaScroll className="text-amber-600 text-3xl" />,
    //   description: "Royal decrees and land grants engraved on copper plates — historical and legal treasures.",
    //   color: "bg-amber-50 hover:bg-amber-100",
    // },
    // {
    //   id: 3,
    //   name: "Paper Manuscripts",
    //   link: "#",
    //   icon: <FaBookOpen className="text-blue-600 text-3xl" />,
    //   description: "Delicate handwritten works on paper — poetry, philosophy, and early scientific texts.",
    //   color: "bg-blue-50 hover:bg-blue-100",
    // },
    // {
    //   id: 4,
    //   name: "Birch Bark Texts",
    //   link: "#",
    //   icon: <FaFeatherAlt className="text-rose-600 text-3xl" />,
    //   description: "Texts inscribed on birch bark — ancient writing tradition found in Northern India.",
    //   color: "bg-rose-50 hover:bg-rose-100",
    // },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 py-12 px-4">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title Section */}
        <h1
          data-aos="fade-down"
          className="text-4xl font-bold text-gray-800 mb-4 flex justify-center items-center gap-2"
        >
          <FaPenFancy className="text-purple-700" />
          Manuscripts
        </h1>
        <p data-aos="fade-up" className="text-gray-600 max-w-2xl mx-auto mb-10">
          Explore India’s timeless heritage through preserved manuscripts — each
          a reflection of devotion, scholarship, and artistry.
        </p>

        {/* Category Cards Grid */}
        <div
          data-aos="fade-up"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((cat) => (
            <Link href={cat.link}
              key={cat.id}
              className={`${cat.color} p-6 rounded-2xl shadow-md hover:shadow-lg transition cursor-pointer`}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-4">{cat.icon}</div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {cat.name}
                </h2>
                <p className="text-gray-600 text-sm">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
