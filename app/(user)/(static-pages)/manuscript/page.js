"use client";

import React, { useEffect, useState } from "react";
import {
  FaPenFancy,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

// ---------- 🧾 Static Manuscript Data ----------
const manuscriptsData = [
  {
    id: 1,
    title: "Vedanta Treatise on Palm Leaf",
    description:
      "A 16th-century philosophical commentary exploring Vedantic principles inscribed in Granthlipi script.",
    author: "Sri Vedacharya",
    color: "bg-purple-100",
  },
  {
    id: 2,
    title: "Bhagavata Purana Excerpts",
    description:
      "Excerpts narrating devotional stories, written meticulously on palm leaves preserved for centuries.",
    author: "Anonymous Devotee",
    color: "bg-amber-100",
  },
  {
    id: 3,
    title: "Kanchi Sampradaya Notes",
    description:
      "Manuscript containing ritual practices and traditions followed at Kancheepuram temple.",
    author: "Sri Kanchi Acharya",
    color: "bg-teal-100",
  },
  {
    id: 4,
    title: "Hymns of the Alvars",
    description:
      "Collection of Tamil hymns dedicated to Lord Vishnu — a blend of devotion and philosophy.",
    author: "Various Alvars",
    color: "bg-rose-100",
  },
  {
    id: 5,
    title: "Granthlipi Grammar Treatise",
    description:
      "A rare manuscript analyzing the structural beauty of Granthlipi and Sanskrit syntax.",
    author: "Acharya Raghavan",
    color: "bg-blue-100",
  },
];

// ---------- 📜 Disclaimer Text ----------
const DISCLAIMER_TEXT = `
This manuscript, written more than 450 years ago on palm leaves in Granthlipi script, is a rare treasure of our cultural and spiritual heritage. It reflects the timeless tradition of preserving wisdom through the art of palm-leaf writing, where every letter was inscribed with devotion, care, and discipline. Such manuscripts are not merely historical records but enduring testaments to the knowledge, culture, and values passed down across generations.

The original manuscripts are reverently preserved at Sri Kanchi Prativadi Bhayankar Mutt, N. No. 31, Old No. 13, Varadaraja Temple Sannidhi Street, Kancheepuram – 631501, Tamil Nadu. Their survival through centuries is truly remarkable, as palm leaves are inherently fragile and require meticulous conservation. Each folio bears the imprint of time, yet continues to embody the resilience of India’s manuscript tradition.

We express our deep gratitude to the Ananthacharya Indological Research Institute for graciously permitting the display of this invaluable manuscript, offering scholars, seekers, and visitors a rare opportunity to engage with this legacy firsthand.

To ensure its preservation in the digital era, this manuscript has been professionally digitised by Noetic Technologies for the Ananthacharya Indological Research Institute, safeguarding its scholarly content  for future generations. This application of new technology bridges the ancient with the modern, enabling timeless knowledge to endure in a sustainable form.

This exhibition, therefore, is more than the presentation of an artifact—it is a tribute to heritage, to the spirit of preservation, and to our shared responsibility of safeguarding such treasures for the benefit of human society.
`;

export default function ManuscriptPage() {
  const [showDisclaimer, setShowDisclaimer] = useState(true);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const limit = 4;

  useEffect(() => {
    AOS.init({ duration: 300, once: true });
  }, []);

  const filtered = manuscriptsData.filter(
    (m) =>
      m.title.toLowerCase().includes(query.toLowerCase()) ||
      m.author.toLowerCase().includes(query.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / limit);
  const displayed = filtered.slice((page - 1) * limit, page * limit);

  // ---------- 📘 Main Page ----------
  if (showDisclaimer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-orange-100 p-6">
        <div
          data-aos="fade-up"
          className="bg-white max-w-3xl p-8 rounded-2xl shadow-xl border border-amber-200 overflow-y-auto scrollbar-sm max-h-[90vh]"
        >
          <h1 className="text-3xl font-bold text-center text-amber-800 mb-6 flex items-center justify-center gap-2">
            <FaPenFancy className="text-amber-700" />
            Manuscript Disclaimer
          </h1>
          <p className="whitespace-pre-line text-gray-700 leading-relaxed text-justify mb-6">
            {DISCLAIMER_TEXT}
          </p>
          <div className="text-center">
            <button
              onClick={() => setShowDisclaimer(false)}
              className="bg-amber-700 hover:bg-amber-800 text-white px-6 py-2 rounded-lg shadow-md transition"
            >
              I Understand & Continue
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ---------- 📚 Manuscript List View ----------
  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header + Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <FaPenFancy className="text-purple-700" />
            Manuscripts Collection
          </h1>

          <div className="flex items-center w-full md:w-96 bg-white border border-purple-200 rounded-full shadow-inner overflow-hidden">
            <input
              type="text"
              placeholder="Search manuscripts..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              className="flex-1 px-4 py-2 bg-transparent focus:outline-none text-gray-700"
            />
            <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-5 flex items-center justify-center">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.length > 0 ? (
            displayed.map((m) => (
              <div
                key={m.id}
                data-aos="fade-up"
                className={`${m.color} p-5 rounded-2xl shadow-sm hover:shadow-md transition`}
              >
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {m.title}
                </h2>
                <p className="text-gray-600 text-sm mb-2 italic">{m.author}</p>
                <p className="text-gray-700 text-sm">{m.description}</p>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600 text-lg">No manuscripts found.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-10 gap-3">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="p-2 bg-white border border-gray-300 rounded-lg shadow-sm 
              hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaChevronLeft className="text-gray-600" />
            </button>

            <span className="px-3 py-1 text-gray-700 font-medium bg-gray-100 rounded-lg">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="p-2 bg-white border border-gray-300 rounded-lg shadow-sm 
              hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FaChevronRight className="text-gray-600" />
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
