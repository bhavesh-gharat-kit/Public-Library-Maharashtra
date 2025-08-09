"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";
import { FaExternalLinkAlt, FaLink } from "react-icons/fa";

export default function ResourceCard({ icon, color, name, url }, key) {
  if (!icon) {
    console.log({ key });
  }
  return (
    <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-200 hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-200 hover:-translate-y-1 transition-all duration-300">
      {/* Icon */}
      <div className="flex justify-center items-center w-16 h-16 mx-auto rounded-full bg-gray-100 group-hover:scale-110 transition-transform duration-300">
        <FontAwesomeIcon icon={icon} size="2x" style={{ color }} />
      </div>

      {/* Title */}
      <h5 className="text-xl font-semibold mt-4 text-blue-700 group-hover:text-blue-900 transition-colors">
        {name}
      </h5>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 border border-green-600 text-green-600 font-medium rounded-md hover:bg-green-600 hover:text-white transition-all duration-200 shadow-sm"
        >
          <FaLink className="w-4 h-4" />
          View
        </a>
      </div>

      {/* Bottom bar animation */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-blue-500 group-hover:w-full transition-all duration-300"></div>
    </div>
  );
}
