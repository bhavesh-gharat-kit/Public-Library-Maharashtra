"use client";
import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGamepad,
  faRocket,
  faStar,
  faBolt,
  faSmileWink,
} from "@fortawesome/free-solid-svg-icons";

export default function Modal({ onClose, playLink }) {
  return (
    <>
      {/* 🔲 Black overlay */}
      <div className="fixed inset-0 bg-black/50 bg-opacity-80 z-40"></div>

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

          {/* 🕹️ Header */}
          <h2 className="text-3xl font-extrabold text-center mb-4">
            Get Ready to Play!
          </h2>
          <p className="text-center text-gray-600 mb-6 text-sm">
            Boost your skills while having fun <FontAwesomeIcon icon={faSmileWink} />
          </p>

          {/* 🎮 Play Button */}
          <div className="flex flex-col gap-4">
            <Link
              href={playLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full"
            >
              <button className="w-full bg-black text-white font-bold py-3 rounded-md hover:bg-red-600 transition duration-300 flex items-center justify-center gap-3 text-lg">
                <FontAwesomeIcon icon={faGamepad} className="text-xl" />
                Start Test
              </button>
            </Link>
          </div>

          {/* 🎉 Decorative Icons Section */}
          <div className="mt-8 flex justify-around text-gray-400 text-sm">
            <div className="flex flex-col items-center">
              <FontAwesomeIcon icon={faRocket} className="text-xl mb-1" />
              <span>Challenge</span>
            </div>
            <div className="flex flex-col items-center">
              <FontAwesomeIcon icon={faStar} className="text-xl mb-1" />
              <span>Fun</span>
            </div>
            <div className="flex flex-col items-center">
              <FontAwesomeIcon icon={faBolt} className="text-xl mb-1" />
              <span>Speed</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
