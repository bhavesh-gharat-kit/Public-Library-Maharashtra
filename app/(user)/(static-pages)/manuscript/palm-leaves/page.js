"use client";

import React, { useEffect, useState } from "react";
import { FaPenFancy, FaSearch, FaFilePdf } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { base64UrlEncode } from "@/lib/helperFunctions";

// ---------- 🧾 Static Manuscript Data (Palm Leaf Category) ----------
const manuscriptsData = [
  {
    id: 2,
    title: "Caturdasalaksani(चतुरदसालकशनी)",
    author: "-",
    pdf: "https://lrsgm.lalbaugcharaja.com/files/MANUSCRIPTS/palm-leaves/MS-1/257.pdf",
  },
  {
    id: 3,
    title: "Amarakosh(अमरकोश)",
    author: "-",
    pdf: "https://lrsgm.lalbaugcharaja.com/files/MANUSCRIPTS/palm-leaves/MS-1/292.pdf",
  },
  {
    id: 4,
    title: "Sribhasyam(श्रीभाष्यम्)",
    author: "Ramanuja",
    pdf: "https://lrsgm.lalbaugcharaja.com/files/MANUSCRIPTS/palm-leaves/MS-1/254.pdf",
  },
  {
    id: 1,
    title: "Mimamsakaustubhah(मिमांसाकोस्तुभ:)",
    author: "Khandadeva",
    pdf: "https://lrsgm.lalbaugcharaja.com/files/MANUSCRIPTS/palm-leaves/MS-1/251.pdf",
  },
  {
    id: 5,
    title: "Mahabharatam Harivamsah(महाभारतम् हरिवंश:)",
    author: "Ramanuja",
    pdf: "https://lrsgm.lalbaugcharaja.com/files/MANUSCRIPTS/palm-leaves/MS-1/229.pdf",
  },
  {
    id: 6,
    title: "Taittiriyaranyakam(तैत्रियारण्यकम्)",
    author: "-",
    pdf: "https://lrsgm.lalbaugcharaja.com/files/MANUSCRIPTS/palm-leaves/MS-1/272.pdf",
  },
  // {
  //   id: 7,
  //   title: "Mahabharatam - Santiparvan(महाभारतम् शांतिपर्वन्)",
  //   author: "Vyasa",
  //   pdf: "https://lrsgm.lalbaugcharaja.com/files/MANUSCRIPTS/palm-leaves/MS-1/007.pdf",
  // },
];

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

  useEffect(() => {
    AOS.init({ duration: 300, once: true });
  }, []);

  const filtered = manuscriptsData.filter(
    (m) =>
      m.title.toLowerCase().includes(query.toLowerCase()) ||
      m.author.toLowerCase().includes(query.toLowerCase())
  );

  // ---------- 📜 Disclaimer Page ----------
  if (showDisclaimer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-amber-50 to-orange-100 p-6">
        <div
          data-aos="fade-up"
          className="bg-white max-w-3xl p-8 rounded-2xl shadow-xl border border-amber-200 overflow-y-auto scrollbar-sm max-h-[90vh]"
        >
          <div className="flex gap-2 text-3xl justify-center items-center">
            <FaPenFancy className="text-amber-700" />
            <div>
              <h1 className="font-bold text-center text-amber-800">
                Digitised Manuscripts
              </h1>
              <h2 className="text-2xl font-bold text-center text-amber-800 ">
                (Disclaimer)
              </h2>
            </div>
          </div>
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

  // ---------- 📚 Palm-Leaf Manuscript Table ----------
  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header + Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <FaPenFancy className="text-purple-700" />
            Palm-Leaf Manuscripts
          </h1>

          <div className="flex items-center w-full md:w-96 bg-white border border-purple-200 rounded-full shadow-inner overflow-hidden">
            <input
              type="text"
              placeholder="Search manuscripts..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 px-4 py-2 bg-transparent focus:outline-none text-gray-700"
            />
            <button className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-5 flex items-center justify-center">
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-purple-100 text-gray-800 uppercase text-xs font-semibold">
              <tr>
                <th className="px-6 py-3 text-left">Sr</th>
                <th className="px-6 py-3 text-left">Title</th>
                <th className="px-6 py-3 text-left">Author</th>
                <th className="px-6 py-3 text-center">PDF</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((m, i) => (
                  <tr
                    key={m.id}
                    data-aos="fade-up"
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="px-6 py-4">{i + 1}</td>
                    <td className="px-6 py-4 font-medium">{m.title}</td>
                    <td className="px-6 py-4">{m.author}</td>
                    <td className="px-6 py-4 text-center">
                      <Link
                        href={
                          m.pdf
                            ? `/e-books/read-book/${base64UrlEncode(m.pdf)}`
                            : "#"
                        }
                        className="inline-flex items-center gap-2 text-purple-700 hover:text-purple-900 font-medium"
                      >
                        <FaFilePdf className="text-red-600" />
                        Read
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="text-center py-8 text-gray-500 text-base"
                  >
                    No manuscripts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
