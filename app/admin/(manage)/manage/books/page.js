"use client";
import React, { useEffect, useState, useRef } from "react";
import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaFilter,
  FaDownload,
  FaChevronLeft,
  FaChevronRight,
  FaBook,
  FaList
} from "react-icons/fa";
import { axios } from "@/utils";
import qs from "qs";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { Loader, FullScreenLoader } from "@/components";
import BookFormModal from "./BookFormModal";
import BookDetailModal from "./BookDetailModal";
import BookChaptersManager from "./BookChaptersManager";

export default function AdminBooksPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [booksLoading, setBooksLoading] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(20);
  const [totalPages, setTotalPages] = useState(1);
  const [totalBooks, setTotalBooks] = useState(0);

  // Search and filters
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filters, setFilters] = useState({
    bookType: "",
    contentType: "",
    medium: "",
    standard: "",
    subject: ""
  });

  // Modals and views
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isChaptersViewOpen, setIsChaptersViewOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [modalMode, setModalMode] = useState("create"); // create | edit

  const controllerRef = useRef(null);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query.trim());
      setPage(1);
    }, 400);
    return () => clearTimeout(handler);
  }, [query]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [filters]);

  // Fetch books
  useEffect(() => {
    if (!isChaptersViewOpen) {
      fetchBooks();
    }
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [page, limit, debouncedQuery, filters, isChaptersViewOpen]);

  const fetchBooks = async () => {
    try {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      const controller = new AbortController();
      controllerRef.current = controller;

      setBooksLoading(true);

      const params = { page, limit };

      if (debouncedQuery) params.search = debouncedQuery;

      Object.keys(filters).forEach(key => {
        if (filters[key]) params[key] = filters[key];
      });

      const res = await axios.get("/api/admin/books", {
        params,
        paramsSerializer: (params) =>
          qs.stringify(params, { arrayFormat: "comma" }),
        signal: controller.signal,
      });

      setBooks(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
      setTotalBooks(res.data.totalBooks || 0);

      if (loading) setLoading(false);
    } catch (err) {
      if (err?.name !== "CanceledError") {
        console.error("Error fetching books:", err);
        toast.error("Failed to fetch books");
      }
    } finally {
      setBooksLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedBook(null);
    setModalMode("create");
    setIsFormModalOpen(true);
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
    setModalMode("edit");
    setIsFormModalOpen(true);
  };

  const handleView = (book) => {
    setSelectedBook(book);
    setIsDetailModalOpen(true);
  };

  const handleManageChapters = (book) => {
    setSelectedBook(book);
    setIsChaptersViewOpen(true);
  };

  const handleBackToBooks = () => {
    setIsChaptersViewOpen(false);
    setSelectedBook(null);
  };

  const handleDelete = async (book) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Delete "${book.title}"? This action cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel"
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`/api/admin/books/${book.id}`);
        toast.success("Book deleted successfully");
        fetchBooks();
      } catch (err) {
        console.error("Error deleting book:", err);
        toast.error(err.response?.data?.message || "Failed to delete book");
      }
    }
  };

  const handleFormSuccess = () => {
    setIsFormModalOpen(false);
    fetchBooks();
  };

  const exportToCSV = () => {
    const headers = ["ID", "Title", "Author", "Publisher", "Type", "Content Type", "Medium", "Standard", "Subject", "ISSN", "Year"];
    const rows = books.map(book => [
      book.id,
      book.title || "",
      book.author || "",
      book.publisher || "",
      book.bookType,
      book.contentType,
      book.medium || "",
      book.standard || "",
      book.subject || "",
      book.issn || "",
      book.yearOfPublication || ""
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(","))
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `books-export-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) return <FullScreenLoader />;

  // Show chapters manager view
  if (isChaptersViewOpen && selectedBook) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 md:p-6">
        <div className="max-w-[1600px] mx-auto">
          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={handleBackToBooks}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg shadow-sm flex items-center gap-2 transition-colors"
            >
              <FaChevronLeft /> Back to Books List
            </button>
          </div>

          {/* Chapters Manager */}
          <BookChaptersManager
            bookId={selectedBook.id}
            bookTitle={selectedBook.title}
          />
        </div>
      </div>
    );
  }

  // Show books list view
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Books Management</h1>
              <p className="text-gray-600 mt-1">Manage your library collection</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={exportToCSV}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg shadow-sm flex items-center gap-2 transition-colors"
              >
                <FaDownload /> Export CSV
              </button>
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm flex items-center gap-2 transition-colors"
              >
                <FaPlus /> Add New Book
              </button>
            </div>
          </div>
        </div>

        {/* Filters & Search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="flex items-center bg-gray-50 border border-gray-300 rounded-lg overflow-hidden">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by title, author, ISSN..."
                  className="flex-1 px-4 py-2 bg-transparent focus:outline-none text-gray-700"
                />
                <button className="bg-blue-600 hover:bg-blue-700 py-3 px-4 text-white">
                  <FaSearch />
                </button>
              </div>
            </div>

            {/* Book Type Filter */}
            <select
              value={filters.bookType}
              onChange={(e) => setFilters({ ...filters, bookType: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">All Books</option>
              <option value="iBook">Syllabus</option>
              <option value="eBook">Other</option>
            </select>

            {/* Content Type Filter */}
            <select
              value={filters.standard}
              onChange={(e) => setFilters({ ...filters, standard: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            >
              <option value="">All Standards</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>Standard {i + 1}</option>
              ))}
            </select>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setFilters({ bookType: "", contentType: "", medium: "", standard: "", subject: "" });
                setQuery("");
              }}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
            >
              Clear
            </button>

            {/* Total Count */}
            <div className="flex items-center justify-center lg:justify-end">
              <span className="text-gray-700 font-semibold">
                Total: <span className="text-blue-600">{totalBooks.toLocaleString()}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {booksLoading ? (
            <div className="h-96"><Loader /></div>
          ) : books.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No books found</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-100 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Title</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Author</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Type</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Standard</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Subject</th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {books.map((book) => (
                      <tr key={book.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-900">{book.id}</td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                            {book.title || "Untitled"}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{book.author || "-"}</td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${book.bookType === "eBook" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"
                            }`}>
                            {book.bookType === "eBook" ? "Other" : "Syllabus"}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">{book.standard || "-"}</td>
                        <td className="px-6 py-4 text-sm text-gray-700">{book.subject || "-"}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => handleManageChapters(book)}
                              className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                              title="Manage Chapters"
                            >
                              <FaList />
                            </button>
                            <button
                              onClick={() => handleView(book)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="View Details"
                            >
                              <FaEye />
                            </button>
                            <button
                              onClick={() => handleEdit(book)}
                              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={() => handleDelete(book)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-700">Rows per page:</span>
                    <select
                      value={limit}
                      onChange={(e) => {
                        setLimit(Number(e.target.value));
                        setPage(1);
                      }}
                      className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    >
                      <option value="10">10</option>
                      <option value="20">20</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      disabled={page === 1}
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaChevronLeft className="text-gray-600" />
                    </button>

                    <span className="text-sm text-gray-700">
                      Page {page.toLocaleString()} of {totalPages.toLocaleString()}
                    </span>

                    <button
                      disabled={page === totalPages}
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <FaChevronRight className="text-gray-600" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      {isFormModalOpen && (
        <BookFormModal
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          book={selectedBook}
          mode={modalMode}
          onSuccess={handleFormSuccess}
        />
      )}

      {isDetailModalOpen && (
        <BookDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          book={selectedBook}
        />
      )}
    </div>
  );
}