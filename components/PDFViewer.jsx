"use client";

import { useState, useCallback, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import {
  FaSearch,
  FaPlus,
  FaMinus,
  FaChevronLeft,
  FaChevronRight,
  FaThLarge,
} from "react-icons/fa";
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

//

import workerSrc from "pdfjs-dist/build/pdf.worker.min.mjs?url";
pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

export default function PDFViewer({ fileUrl, className = "" }) {
  const [fileExists, setFileExists] = useState(false);
  const [checked, setChecked] = useState(false);

  const [numPages, setNumPages] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(1.0);
  const [searchTerm, setSearchTerm] = useState("");

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const highlightSearch = useCallback(
    ({ str }) => {
      if (!searchTerm) return str;
      const regex = new RegExp(`(${searchTerm})`, "gi");
      const parts = str.split(regex);
      return parts.map((part, index) =>
        regex.test(part) ? <mark key={index}>{part}</mark> : part
      );
    },
    [searchTerm]
  );

  useEffect(() => {
    async function checkFileExists(url) {
      try {
        const res = await fetch(url, { method: "HEAD" });
        setFileExists(res.ok); // true if 200, false if 404
      } catch (err) {
        setFileExists(false);
      } finally {
        setChecked(true);
      }
    }

    checkFileExists(fileUrl);
  }, [fileUrl]);

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className={`${
        className.trim() ? className : " w-full max-w-3xl mx-auto"
      } p-4 overflow-hidden bg-white rounded-xl shadow-lg flex flex-col gap-4 border border-gray-200`}
    >
      {/* Header Toolbar */}
      <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-3">
        {/* Search */}
        <div className="flex items-center gap-2 flex-grow">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search text..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded px-3 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Tool Buttons */}
        <div className="flex items-center gap-2">
          <button className="p-2 rounded bg-indigo-200 hover:bg-indigo-500 text-indigo-500 hover:text-white transition-all">
            <FaThLarge title="Thumbnail view (coming soon)" />
          </button>
          <button
            onClick={() => setZoom((z) => Math.max(z - 0.2, 0.5))}
            className="p-2 rounded bg-indigo-100 hover:bg-indigo-500 hover:text-white transition-all"
          >
            <FaMinus />
          </button>
          <span className="text-sm w-12 text-center">
            {(zoom * 100).toFixed(0)}%
          </span>
          <button
            onClick={() => setZoom((z) => Math.min(z + 0.2, 3))}
            className="p-2 rounded bg-indigo-100 hover:bg-indigo-500 hover:text-white transition-all"
          >
            <FaPlus />
          </button>
        </div>
      </header>

      {/* PDF Main Area */}
      <main className="scrollbar-sm overflow-auto max-w-full min-h-[400px]">
        <div className="overflow-auto border rounded bg-gray-50 max-h-[80vh] mx-auto scrollbar-sm">
          {checked ? (
            fileExists ? (
              <Document
                file={fileUrl}
                onLoadSuccess={onDocumentLoadSuccess}
                loading="Loading PDF..."
              >
                <Page
                  pageNumber={currentPage}
                  scale={zoom}
                  customTextRenderer={highlightSearch}
                  renderAnnotationLayer
                  renderTextLayer
                />
              </Document>
            ) : (
              <div className="text-center text-red-500 text-lg font-medium">
                ❌ File not found: <code>{fileUrl}</code>
              </div>
            )
          ) : (
            <div className="text-center text-gray-500">Checking file...</div>
          )}
        </div>
      </main>

      {/* Footer Navigation */}
      <footer className="flex flex-wrap items-center justify-between border-t pt-3 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="p-2 bg-indigo-100 rounded hover:bg-indigo-500 hover:text-white disabled:opacity-50 transition-all"
          >
            <FaChevronLeft />
          </button>
          <span>
            Page {currentPage} of {numPages || "?"}
          </span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, numPages))}
            disabled={currentPage === numPages}
            className="p-2 bg-indigo-100 rounded hover:bg-indigo-500 hover:text-white disabled:opacity-50 transition-all"
          >
            <FaChevronRight />
          </button>
        </div>

        <div className="flex gap-2">
          <button className="text-gray-400 cursor-not-allowed">
            Thumbnails
          </button>
          <button className="text-gray-400 cursor-not-allowed">
            Bookmarks
          </button>
        </div>
      </footer>
    </div>
  );
}
