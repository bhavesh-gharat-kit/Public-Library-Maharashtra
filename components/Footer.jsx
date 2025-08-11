"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6 border-t border-gray-200 mt-12">
      <div className="max-w-6xl mx-auto px-4 text-center">
        {/* Links */}
        {/* <ul className="flex justify-center flex-wrap gap-6 mb-4">
          <li>
            <Link
              href="#"
              className="text-sm text-gray-600 hover:text-gray-900 hover:underline transition"
            >
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link
              href="#"
              className="text-sm text-gray-600 hover:text-gray-900 hover:underline transition"
            >
              Terms &amp; Conditions
            </Link>
          </li>
        </ul> */}

        {/* Copy */}
        <p className="text-xs text-gray-500">
          © 2025-26{" "}
          <span className="font-semibold text-gray-700">
          LALBAUGCHA RAJA AI DIGITAL LIBRARY
          </span>
          . Powered by{" "}
          <a
            href="https://noeticindia.com"
            target="_blank"
            className="text-blue-600 cursor-pointer hover:text-blue-700 font-medium"
          >
            Noetic Technologies
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
