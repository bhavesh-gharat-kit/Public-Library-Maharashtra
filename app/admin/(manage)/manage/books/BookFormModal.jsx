"use client";
import React, { useState, useEffect } from "react";
import { FaTimes, FaSave, FaUpload } from "react-icons/fa";
import { axios } from "@/utils";
import toast from "react-hot-toast";

export default function BookFormModal({ isOpen, onClose, book, mode, onSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publisher: "",
    yearOfPublication: "",
    medium: "",
    standard: "",
    issn: "",
    subject: "",
    syllabus: "",
    description: "",
    contentType: "openAccess",
    bookType: "eBook",
    pdfLink: "",
    thumbnailLink: ""
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (book && mode === "edit") {
      setFormData({
        title: book.title || "",
        author: book.author || "",
        publisher: book.publisher || "",
        yearOfPublication: book.yearOfPublication || "",
        medium: book.medium || "",
        standard: book.standard || "",
        issn: book.issn || "",
        subject: book.subject || "",
        syllabus: book.syllabus || "",
        description: book.description || "",
        contentType: book.contentType || "openAccess",
        bookType: book.bookType || "eBook",
        pdfLink: book.pdfLink || "",
        thumbnailLink: book.thumbnailLink || ""
      });
    }
  }, [book, mode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    
    if (formData.yearOfPublication && (
      isNaN(formData.yearOfPublication) || 
      formData.yearOfPublication < 1000 || 
      formData.yearOfPublication > new Date().getFullYear()
    )) {
      newErrors.yearOfPublication = "Invalid year";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        yearOfPublication: formData.yearOfPublication ? parseInt(formData.yearOfPublication) : null
      };

      if (mode === "edit") {
        await axios.put(`/api/admin/books/${book.id}`, payload);
        toast.success("Book updated successfully");
      } else {
        await axios.post("/api/admin/books", payload);
        toast.success("Book created successfully");
      }

      onSuccess();
    } catch (err) {
      console.error("Error saving book:", err);
      toast.error(err.response?.data?.message || "Failed to save book");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity bg-gray-900/40 bg-opacity-75" onClick={onClose} />

        <div className="inline-block relative z-10 w-full max-w-4xl my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <h2 className="text-2xl font-bold">
              {mode === "edit" ? "Edit Book" : "Add New Book"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <FaTimes size={20} />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.title ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter book title"
                />
                {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter author name"
                />
              </div>

              {/* Publisher */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Publisher
                </label>
                <input
                  type="text"
                  name="publisher"
                  value={formData.publisher}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter publisher name"
                />
              </div>

              {/* Year of Publication */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Year of Publication
                </label>
                <input
                  type="number"
                  name="yearOfPublication"
                  value={formData.yearOfPublication}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.yearOfPublication ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="YYYY"
                  min="1000"
                  max={new Date().getFullYear()}
                />
                {errors.yearOfPublication && (
                  <p className="text-red-500 text-sm mt-1">{errors.yearOfPublication}</p>
                )}
              </div>

              {/* ISSN */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ISSN
                </label>
                <input
                  type="text"
                  name="issn"
                  value={formData.issn}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter ISSN"
                />
              </div>

              {/* Book Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Book Type
                </label>
                <select
                  name="bookType"
                  value={formData.bookType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="eBook">eBook</option>
                  <option value="iBook">iBook</option>
                </select>
              </div>

              {/* Content Type */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Content Type
                </label>
                <select
                  name="contentType"
                  value={formData.contentType}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="openAccess">Open Access</option>
                  <option value="premium">Premium</option>
                </select>
              </div>

              {/* Medium */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Medium
                </label>
                <input
                  type="text"
                  name="medium"
                  value={formData.medium}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., English, Hindi"
                />
              </div>

              {/* Standard */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Standard/Grade
                </label>
                <input
                  type="text"
                  name="standard"
                  value={formData.standard}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 10th, 12th"
                />
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Mathematics, Physics"
                />
              </div>

              {/* Syllabus */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Syllabus
                </label>
                <input
                  type="text"
                  name="syllabus"
                  value={formData.syllabus}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., CBSE, ICSE"
                />
              </div>

              {/* PDF Link */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  PDF Link
                </label>
                <input
                  type="url"
                  name="pdfLink"
                  value={formData.pdfLink}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/book.pdf"
                />
              </div>

              {/* Thumbnail Link */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Thumbnail Link
                </label>
                <input
                  type="url"
                  name="thumbnailLink"
                  value={formData.thumbnailLink}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/thumbnail.jpg"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter book description"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm flex items-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <FaSave /> {mode === "edit" ? "Update" : "Create"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}