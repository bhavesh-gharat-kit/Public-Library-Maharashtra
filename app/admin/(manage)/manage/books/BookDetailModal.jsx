"use client";
import React from "react";
import { FaTimes, FaBook, FaUser, FaCalendar, FaTag, FaGlobe, FaLink } from "react-icons/fa";

export default function BookDetailModal({ isOpen, onClose, book }) {
  if (!isOpen || !book) return null;

  const DetailRow = ({ label, value, icon: Icon }) => (
    <div className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-b-0">
      <div className="flex items-center justify-center w-10 h-10 bg-blue-50 rounded-lg flex-shrink-0">
        <Icon className="text-blue-600" size={18} />
      </div>
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-600 mb-1">{label}</p>
        <p className="text-gray-900">{value || "-"}</p>
      </div>
    </div>
  );

  return (
  <div className="fixed inset-0 z-50 overflow-y-auto">
    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
      {/* Overlay - render FIRST */}
      <div className="fixed inset-0 transition-opacity bg-gray-900/40" onClick={onClose} />

      {/* Modal - render SECOND with relative positioning and higher z-index */}
      <div className="inline-block relative z-10 w-full max-w-3xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <div className="flex items-center gap-3">
            <FaBook size={24} />
            <h2 className="text-2xl font-bold">Book Details</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-lg transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Thumbnail */}
          {book.thumbnailLink && (
            <div className="mb-6 flex justify-center">
              <img
                src={book.thumbnailLink}
                alt={book.title}
                className="max-w-xs max-h-64 rounded-lg shadow-lg object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>
          )}

          {/* Basic Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">{book.title || "Untitled"}</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DetailRow label="Book ID" value={`#${book.id}`} icon={FaTag} />
              <DetailRow label="Author" value={book.author} icon={FaUser} />
              <DetailRow label="Publisher" value={book.publisher} icon={FaBook} />
              <DetailRow
                label="Year of Publication"
                value={book.yearOfPublication}
                icon={FaCalendar}
              />
              <DetailRow label="ISSN" value={book.issn} icon={FaTag} />
              <DetailRow label="Medium" value={book.medium} icon={FaGlobe} />
              <DetailRow label="Standard/Grade" value={book.standard} icon={FaBook} />
              <DetailRow label="Subject" value={book.subject} icon={FaBook} />
              <DetailRow label="Syllabus" value={book.syllabus} icon={FaBook} />
            </div>
          </div>

          {/* Type & Content */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-600 mb-2">Book Type</p>
              <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${book.bookType === "eBook" ? "bg-blue-600 text-white" : "bg-purple-600 text-white"
                }`}>
                {book.bookType}
              </span>
            </div>
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm font-semibold text-gray-600 mb-2">Content Type</p>
              <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${book.contentType === "openAccess" ? "bg-green-600 text-white" : "bg-yellow-600 text-white"
                }`}>
                {book.contentType === "openAccess" ? "Open Access" : "Premium"}
              </span>
            </div>
          </div>

          {/* Description */}
          {book.description && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-semibold text-gray-600 mb-2">Description</h4>
              <p className="text-gray-900 leading-relaxed">{book.description}</p>
            </div>
          )}

          {/* Links */}
          <div className="space-y-3">
            {book.pdfLink && (
              <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                <FaLink className="text-red-600" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-600">PDF Link</p>
                  <a
                    href={book.pdfLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm truncate block"
                  >
                    {book.pdfLink}
                  </a>
                </div>
              </div>
            )}

            {book.thumbnailLink && (
              <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                <FaLink className="text-purple-600" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-600">Thumbnail Link</p>
                  <a
                    href={book.thumbnailLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline text-sm truncate block"
                  >
                    {book.thumbnailLink}
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Metadata */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Created: {new Date(book.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
  );
}