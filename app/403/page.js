// app/403/page.jsx
"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faBookOpen, faBan } from "@fortawesome/free-solid-svg-icons";

export default function ForbiddenPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 text-gray-900 px-6">
      <div className="text-center max-w-lg p-8 rounded-2xl bg-white shadow-2xl shadow-red-200 border border-gray-200">
        
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full shadow-inner">
            <FontAwesomeIcon icon={faBan} className="text-red-600 text-4xl" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-6xl font-bold text-red-500 mb-3">403</h1>
        <h2 className="text-2xl font-semibold mb-2">Access Forbidden</h2>
        <h2 className="text-3xl font-semibold mb-2 text-red-600">LALBAUGCHA RAJA AI DIGITAL LIBRARY</h2>

        {/* Message */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          We’re sorry, but your IP address is not on the allowed list for LALBAUGCHA RAJA AI DIGITAL LIBRARY.  
          Please contact the administrator if you believe this is a mistake.
        </p>

        {/* Decorative library icon row */}
        <div className="flex items-center justify-center space-x-3 text-gray-400">
          <FontAwesomeIcon icon={faLock} className="text-lg" />
          <FontAwesomeIcon icon={faBookOpen} className="text-lg" />
          <FontAwesomeIcon icon={faLock} className="text-lg" />
        </div>

        {/* Go Back Button */}
        <div className="mt-8">
          <a
            href="/"
            className="inline-block bg-red-500 hover:bg-red-600 transition-colors px-6 py-3 rounded-lg font-medium text-white shadow-lg"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
}
