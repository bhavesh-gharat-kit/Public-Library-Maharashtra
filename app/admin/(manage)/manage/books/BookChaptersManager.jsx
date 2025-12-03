"use client";
import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaEdit,
  FaTrash,
  FaBook,
  FaTimes,
  FaSave,
  FaChevronDown,
  FaChevronUp
} from "react-icons/fa";
import { axios } from "@/utils";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Loader } from "@/components";
import ChapterContents from "./ChapterContents";

export default function BookChaptersManager({ bookId, bookTitle }) {
  const [chapters, setChapters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedChapter, setSelectedChapter] = useState(null);
  const [expandedChapter, setExpandedChapter] = useState(null);

  useEffect(() => {
    if (bookId) {
      fetchChapters();
    }
  }, [bookId]);

  const fetchChapters = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`/api/admin/books/${bookId}/chapters`);
      setChapters(res.data.data || []);
    } catch (err) {
      console.error("Error fetching chapters:", err);
      toast.error("Failed to fetch chapters");
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedChapter(null);
    setIsModalOpen(true);
  };

  const handleEdit = (chapter) => {
    setSelectedChapter(chapter);
    setIsModalOpen(true);
  };

  const handleDelete = async (chapter) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Delete Chapter ${chapter.chapterNumber}? This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/admin/books/chapters/${chapter.id}`);
        toast.success("Chapter deleted successfully");
        fetchChapters();
      } catch (err) {
        console.error("Error deleting chapter:", err);
        toast.error("Failed to delete chapter");
      }
    }
  };

  const toggleExpand = (chapterId) => {
    setExpandedChapter(expandedChapter === chapterId ? null : chapterId);
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-6">
        <Loader />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <FaBook className="text-blue-600" />
              Book Chapters
            </h2>
            <p className="text-gray-600 mt-1">
              {bookTitle} - {chapters.length} chapter(s)
            </p>
          </div>
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm flex items-center gap-2 transition-colors"
          >
            <FaPlus /> Add Chapter
          </button>
        </div>
      </div>

      <div className="p-6">
        {chapters.length === 0 ? (
          <div className="text-center py-12">
            <FaBook className="text-6xl text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg">No chapters added yet</p>
            <button
              onClick={handleCreate}
              className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
            >
              Add First Chapter
            </button>
          </div>
        ) : (
          <div className="space-y-4"> 
              {chapters.length === 0 ? (
                <div className="text-center py-12">
                  <FaBook className="text-6xl text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">No chapters added yet</p>
                  <button
                    onClick={handleCreate}
                    className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                  >
                    Add First Chapter
                  </button>
                </div>
              ) : (
                <ChapterContents
                  chapters={chapters}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              )} 
          </div>
        )}
      </div>

      {isModalOpen && (
        <ChapterFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          bookId={bookId}
          chapter={selectedChapter}
          onSuccess={() => {
            setIsModalOpen(false);
            fetchChapters();
          }}
        />
      )}
    </div>
  );
}


function LinkBadge({ label, url, color }) {
  const colors = {
    red: "bg-red-100 text-red-700 hover:bg-red-200",
    blue: "bg-blue-100 text-blue-700 hover:bg-blue-200",
    purple: "bg-purple-100 text-purple-700 hover:bg-purple-200",
    green: "bg-green-100 text-green-700 hover:bg-green-200",
  };

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${colors[color]} px-3 py-2 rounded-lg text-sm font-medium text-center transition-colors`}
    >
      {label}
    </a>
  );
}

function ChapterFormModal({ isOpen, onClose, bookId, chapter, onSuccess }) {
  const [formData, setFormData] = useState({
    chapterNumber: "",
    title: "",
    summary: "",
    chapterOverview: "",
    keyConcepts: "",
    commonMistakes: "",
    detailedNotes: "",
    studyTips: "",
    practiceQuestions: "",
    sampleQuestionPaper: "",
    mcqPracticeBank: "",
    pdfLink: "",
    videoLink: "",
    audioLink: "",
    thumbnailLink: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (chapter) {
      setFormData({
        chapterNumber: chapter.chapterNumber || "",
        title: chapter.title || "",
        summary: chapter.summary || "",
        chapterOverview: chapter.chapterOverview || "",
        keyConcepts: chapter.keyConcepts || "",
        commonMistakes: chapter.commonMistakes || "",
        detailedNotes: chapter.detailedNotes || "",
        studyTips: chapter.studyTips || "",
        practiceQuestions: chapter.practiceQuestions || "",
        sampleQuestionPaper: chapter.sampleQuestionPaper || "",
        mcqPracticeBank: chapter.mcqPracticeBank || "",
        pdfLink: chapter.pdfLink || "",
        videoLink: chapter.videoLink || "",
        audioLink: chapter.audioLink || "",
        thumbnailLink: chapter.thumbnailLink || "",
      });
    }
  }, [chapter]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.chapterNumber) {
      toast.error("Chapter number is required");
      return;
    }

    setLoading(true);

    try {
      if (chapter) {
        await axios.put(`/api/admin/books/chapters/${chapter.id}`, formData);
        toast.success("Chapter updated successfully");
      } else {
        await axios.post(`/api/admin/books/${bookId}/chapters`, formData);
        toast.success("Chapter created successfully");
      }
      onSuccess();
    } catch (err) {
      console.error("Error saving chapter:", err);
      toast.error(err.response?.data?.message || "Failed to save chapter");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20">
        {/* <div className="fixed inset-0 bg-gray-900 bg-opacity-75" onClick={onClose} /> */}

        <div className="relative inline-block w-full max-w-4xl bg-white rounded-lg shadow-xl">
          <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <h2 className="text-2xl font-bold">
              {chapter ? "Edit Chapter" : "Add New Chapter"}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg">
              <FaTimes size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 max-h-[80vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Chapter Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="chapterNumber"
                  value={formData.chapterNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  min="1"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Summary</label>
                <textarea
                  name="summary"
                  value={formData.summary}
                  onChange={handleChange}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Chapter Overview</label>
                <textarea
                  name="chapterOverview"
                  value={formData.chapterOverview}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Key Concepts</label>
                <textarea
                  name="keyConcepts"
                  value={formData.keyConcepts}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Detailed Notes</label>
                <textarea
                  name="detailedNotes"
                  value={formData.detailedNotes}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Common Mistakes</label>
                <textarea
                  name="commonMistakes"
                  value={formData.commonMistakes}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Study Tips</label>
                <textarea
                  name="studyTips"
                  value={formData.studyTips}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Practice Questions</label>
                <textarea
                  name="practiceQuestions"
                  value={formData.practiceQuestions}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Sample Question Paper</label>
                <textarea
                  name="sampleQuestionPaper"
                  value={formData.sampleQuestionPaper}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">MCQ Practice Bank</label>
                <textarea
                  name="mcqPracticeBank"
                  value={formData.mcqPracticeBank}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Thumbnail Link</label>
                <input
                  type="url"
                  name="thumbnailLink"
                  value={formData.thumbnailLink}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">PDF Link</label>
                <input
                  type="url"
                  name="pdfLink"
                  value={formData.pdfLink}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Video Link</label>
                <input
                  type="url"
                  name="videoLink"
                  value={formData.videoLink}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Audio Link</label>
                <input
                  type="url"
                  name="audioLink"
                  value={formData.audioLink}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 mt-6 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? "Saving..." : <><FaSave /> {chapter ? "Update" : "Create"}</>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}