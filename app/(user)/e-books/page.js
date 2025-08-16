"use client";
import React, { useEffect, useRef, useState } from "react";
import AOS from "aos";
import qs from "qs";

import {
  BookCard,
  FilterSidebar,
  FullScreenLoader,
  Loader,
  Tooltip,
} from "@/components";
import { axios } from "@/utils";
import {
  FaBookOpen,
  FaChevronLeft,
  FaChevronRight,
  FaSearch,
} from "react-icons/fa";
import { scrollToTop } from "@/lib/helperFunctions";
import { bgColors } from "@/lib/constants";

export default function Page() {
  const [books, setBooks] = useState([]);
  const [filtersData, setFiltersData] = useState({});
  const [appliedFilters, setAppliedFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [booksLoading, setBooksLoading] = useState(true);

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);

  // Search state
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [totalBooks, setTotalBooks] = useState(0);

  // Abort controller ref for cancelling previous requests
  const controllerRef = useRef(null);

  // ---------- 📌 Reusable book fetcher ----------
  const fetchBooks = async ({ page, limit, filters, search, signal }) => {
    try {
      setBooksLoading(true);

      const params = { page, limit };

      // add filters if present
      for (const key in filters) {
        if (filters[key]?.length) {
          params[key] = filters[key];
        }
      }

      if (search) {
        params.search = search;
      }

      const res = await axios.get("/api/books", {
        params,
        paramsSerializer: (params) =>
          qs.stringify(params, { arrayFormat: "comma" }),
        signal,
      });

      setBooks(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
      setTotalBooks(res.data?.totalBooks || 0);
      scrollToTop();
    } catch (err) {
      const isAbort =
        err?.name === "CanceledError" || err?.message === "canceled";
      if (!isAbort) {
        console.error("Error fetching books:", err);
      }
    } finally {
      setBooksLoading(false);
    }
  };

  // ---------- Init ----------
  useEffect(() => {
    AOS.init({
      once: false,
      duration: 100,
      easing: "ease-in-out",
      offset: 100,
    });

    const fetchFiltersData = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/books/filters");
        setFiltersData(res.data?.data);
      } catch (err) {
        console.error("Error fetching filters data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFiltersData();
  }, []);

  // ---------- Debounce search ----------
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query.trim());
      setPage(1); // reset page when search changes
    }, 400);

    return () => clearTimeout(handler);
  }, [query]);

  // ---------- Reset page when filters change ----------
  useEffect(() => {
    setPage(1);
  }, [appliedFilters]);

  // ---------- Fetch books when dependencies change ----------
  useEffect(() => {
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    const controller = new AbortController();
    controllerRef.current = controller;

    fetchBooks({
      page,
      limit,
      filters: appliedFilters,
      search: debouncedQuery,
      signal: controller.signal,
    });

    return () => controller.abort();
  }, [appliedFilters, page, limit, debouncedQuery]);

  // ---------- Utility setter ----------
  const setAppliedFiltersAndReset = (updater) => {
    setAppliedFilters((prev) =>
      typeof updater === "function" ? updater(prev) : updater
    );
  };

  if (loading) return <FullScreenLoader />;

  return (
    <>
      <main className="bg-gray-50 ">
        <div className="max-w-[1440px] mx-auto px-4 flex flex-col md:flex-row">
          <div className="w-full md:w-64 md:sticky md:top-20 h-fit">
            <FilterSidebar
              filters={filtersData}
              appliedFilters={appliedFilters}
              setAppliedFilters={setAppliedFilters}
              onApply={setAppliedFilters}
              onClear={() => setAppliedFilters({})}
            />
          </div>

          <div className="flex-1">
            <div className="w-full flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 ">
              {/* Search Bar */}
              <div className="flex items-center w-full md:w-96 bg-white border border-blue-200 focus:border-blue-400 rounded-full shadow-inner shadow-blue-200 overflow-hidden">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  placeholder="Search by Title, Author, ISSN..."
                  className="flex-1 px-4 py-2 bg-transparent focus:outline-none text-gray-700"
                />
                <button className="bg-blue-600 hover:bg-blue-700 py-3 text-white px-5 flex items-center justify-center h-full">
                  <FaSearch />
                </button>
              </div>

              {/* Book Count */}
              <div className="text-lg font-semibold text-gray-700">
                Total Books:{" "}
                <span className="text-blue-600 font-bold">
                  {Number(totalBooks).toLocaleString()}
                </span>
              </div>
            </div>
            {!books?.length && !booksLoading ? (
              <NoBooksFound />
            ) : booksLoading ? (
              <div className="h-[60vh] flex-1">
                <Loader />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3  p-4">
                  {books.map((item, index) => {
                    const randomColor = bgColors[index % bgColors.length]; // rotate through colors

                    return (
                      <BookCard
                        book={item}
                        randomColor={randomColor}
                        key={index}
                      />
                    );
                  })}
                </div>

                {/* Pagination */}
                {totalPages > page && (
                  <div className="flex justify-center items-center mt-6 gap-3">
                    {/* Previous Button */}
                    <button
                      disabled={page === 1}
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      className="p-2 bg-white border border-gray-300 rounded-lg shadow-sm 
               hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed
               flex items-center justify-center"
                    >
                      <FaChevronLeft className="text-gray-600" size={16} />
                    </button>

                    {/* Page Info */}
                    <span className="px-3 py-1 text-gray-700 font-medium bg-gray-100 rounded-lg">
                      Page {Number(page).toLocaleString()} of{" "}
                      {Number(totalPages).toLocaleString()}
                    </span>

                    {/* Next Button */}
                    <button
                      disabled={page === totalPages}
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      className="p-2 bg-white border border-gray-300 rounded-lg shadow-sm 
               hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed
               flex items-center justify-center"
                    >
                      <FaChevronRight className="text-gray-600" size={16} />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

function NoBooksFound() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <FaBookOpen className="text-6xl text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold text-gray-700">No Books Found</h2>
      <p className="text-gray-500 max-w-md mt-2">
        We couldn’t find any books matching your search or filters. Try
        adjusting your search criteria or explore other categories.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
      >
        Browse All Books
      </button>
    </div>
  );
}
