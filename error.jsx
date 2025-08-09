// app/error.jsx
"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBug, faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";

export default function Error({ error, reset }) {
  // `reset()` will re-render the nearest error boundary when called (useful in dev)
  const router = useRouter();

  useEffect(() => {
    // log to console for dev; in production you would report to your logging service
    console.error("Unhandled exception (render error):", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900 px-6">
      <div className="text-center max-w-lg p-8 rounded-2xl bg-white shadow-2xl border border-gray-200">
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 p-4 rounded-full shadow-inner">
            <FontAwesomeIcon icon={faExclamationTriangle} className="text-red-600 text-4xl" />
          </div>
        </div>

        <h1 className="text-5xl font-bold text-red-500 mb-2">Something went wrong</h1>
        <p className="text-gray-600 mb-6 leading-relaxed">
          We hit an unexpected issue on the server. Our team has been notified.
          You can try again or return to the homepage.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => router.push("/")}
            className="inline-block bg-red-500 hover:bg-red-600 transition-colors px-6 py-3 rounded-lg font-medium text-white shadow-lg"
          >
            Return to Home
          </button>

          <button
            onClick={() => {
              // In App Router, calling reset() attempts to re-render the segment
              if (typeof reset === "function") reset();
              else router.refresh();
            }}
            className="inline-block bg-gray-200 hover:bg-gray-300 transition-colors px-6 py-3 rounded-lg font-medium text-gray-800 shadow"
          >
            Try Again
          </button>
        </div>

        {/* DEV: show error message only in development if desired */}
        <details className="mt-6 text-left text-sm text-gray-500">
          <summary className="cursor-pointer">Technical details</summary>
          <pre className="whitespace-pre-wrap mt-2 text-xs">{error?.message}</pre>
        </details>
      </div>
    </div>
  );
}
