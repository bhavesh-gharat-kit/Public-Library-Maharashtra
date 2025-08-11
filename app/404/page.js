// app/404/page.jsx
"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen, faSearch, faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50 text-gray-900 px-3 sm:px-6">
      <div className="text-center max-w-lg p-8 rounded-2xl bg-white shadow-2xl shadow-yellow-200 border border-gray-200">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-yellow-100 p-4 rounded-full shadow-inner">
            <FontAwesomeIcon icon={faSearch} className="text-yellow-600 text-4xl" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-6xl font-bold text-yellow-500 mb-3">404</h1>
        <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>

        {/* Message */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          Oops! The page you’re looking for is missing from LALBAUGCHA RAJA AI DIGITAL LIBRARY.  
          It may have been moved, removed, or the URL might be incorrect.
        </p>

        {/* Decorative library icon row */}
        <div className="flex items-center justify-center space-x-3 text-gray-400">
          <FontAwesomeIcon icon={faBookOpen} className="text-lg" />
          <FontAwesomeIcon icon={faQuestionCircle} className="text-lg" />
          <FontAwesomeIcon icon={faBookOpen} className="text-lg" />
        </div>

        {/* Go Back Button */}
        <div className="mt-8 space-x-4">
          <a
            href="/"
            className="inline-block mt-2 sm:mt-0 bg-gray-300 hover:bg-gray-400 transition-colors px-6 py-3 rounded-lg font-medium text-gray-800 shadow-lg"
            >
            Go to Homepage
          </a>
          <a
            href="/login"
            className="inline-block bg-yellow-500 hover:bg-yellow-600 transition-colors px-6 py-3 rounded-lg font-medium text-white shadow-lg"
          >
            Go to Login
          </a>
        </div>
      </div>
    </div>
  );
}
