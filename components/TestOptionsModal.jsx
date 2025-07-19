"use client";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGamepad,
  faChalkboardTeacher,
  faFileAlt,
  faBookOpen,
} from "@fortawesome/free-solid-svg-icons";

export default function Modal({
  onClose,
  playLink,
  practiceLink,
  testLink,
  studyLink,
}) {
  const modes = [
    { label: "play", link: playLink, icon: faGamepad },
    { label: "practice", link: practiceLink, icon: faChalkboardTeacher },
    { label: "test", link: testLink, icon: faFileAlt },
    { label: "study", link: studyLink, icon: faBookOpen },
  ];
  return (
    <>
      {/* 🔲 Black overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-80 z-40"></div>

      {/* ⬜ White Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="relative bg-white bg-opacity text-black rounded-lg shadow-2xl px-8 py-10 w-full max-w-md mx-auto border border-gray-200">
          {/* ❌ Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-4 text-gray-800 text-lg font-bold hover:text-red-400 transition duration-200"
          >
            ✕
          </button>

          {/* 📌 Modal Heading */}
          <h2 className="text-2xl font-bold text-center mb-6">Choose Mode</h2>

          {/* 🎮 Action Buttons */}
          <div className="flex flex-col gap-4">
            {modes.map(({ label, link, icon }, idx) => (
              <Link
                key={idx}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <button className="w-full border font-bold border-black text-black py-2 rounded-md hover:text-red-400 hover:bg-black  transition duration-300">
                  <span className="capitalize flex items-center justify-center gap-2">
                    {label}
                    <FontAwesomeIcon icon={icon} className="text-lg" />
                  </span>
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
