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

export default function Page() {
  const [books, setBooks] = useState([]);
  const [filtersData, setFiltersData] = useState({});
  const [appliedFilters, setAppliedFilters] = useState({});
  const [loading, setLoading] = useState(true);
  const [booksLoading, setBooksLoading] = useState(true);

  // Pagination state
  const [page, setPage] = useState(1); // current page
  const [limit] = useState(12); // books per page
  const [totalPages, setTotalPages] = useState(1);

  // search state
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [totalBooks, setTotalBooks] = useState(0);

  // Abort controller ref for cancelling previous requests
  const controllerRef = useRef(null);

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
        const params = {};

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

  useEffect(() => {
    const handler = setTimeout(() => {
      // Trim whitespace and set debounced value
      setDebouncedQuery(query.trim());
      // reset to first page whenever a new search term is applied
      setPage(1);
    }, 400);

    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setBooksLoading(true);
        const params = { page, limit };

        for (const key in appliedFilters) {
          if (appliedFilters[key]?.length) {
            params[key] = appliedFilters[key]; // keep arrays
          }
        }

        const res = await axios.get("/api/books", {
          params,
          paramsSerializer: (params) => {
            return qs.stringify(params, { arrayFormat: "comma" }); // => key=a,b,c
          },
        });

        setBooks(res.data.data);
        setTotalPages(res.data.totalPages || 1);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setBooksLoading(false);
      }
    };

    fetchBooks();
  }, [appliedFilters, page, limit]);

  const setAppliedFiltersAndReset = (updater) => {
    setAppliedFilters((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      return next;
    });
    setPage(1);
  };

  useEffect(() => {
    // Build params
    const params = { page, limit };

    // add filters arrays to params if present
    for (const key in appliedFilters) {
      if (appliedFilters[key]?.length) {
        params[key] = appliedFilters[key];
      }
    }

    // add search params if debouncedQuery exists
    if (debouncedQuery) {
      params.search = debouncedQuery;
    }

    // Cancel previous request if any
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    const controller = new AbortController();
    controllerRef.current = controller;

    const fetchBooks = async () => {
      try {
        scrollToTop();
        setBooksLoading(true);

        const res = await axios.get("/api/books", {
          params,
          paramsSerializer: (params) =>
            qs.stringify(params, { arrayFormat: "comma" }),
          signal: controller.signal, // cancelable
        });

        // adapt to your API shape:
        setBooks(res.data.data || []);
        setTotalPages(res.data.totalPages || 1);
        // try different possible keys for total count:
        setTotalBooks(res.data?.totalBooks);
      } catch (err) {
        // ignore abort cancellations; log others
        const isAbort =
          err?.name === "CanceledError" || err?.message === "canceled";
        if (!isAbort) {
          console.error("Error fetching books:", err);
        }
      } finally {
        setBooksLoading(false);
      }
    };

    fetchBooks();

    // cleanup: abort if effect re-runs or unmounts
    return () => {
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedFilters, page, limit, debouncedQuery]);

  // const bgColors = [
  //   "bg-blue-600",
  //   "bg-green-600",
  //   "bg-red-500",
  //   "bg-purple-600",
  //   "bg-pink-500",
  //   "bg-yellow-500",
  //   "bg-indigo-600",
  //   "bg-cyan-600",
  //   "bg-teal-600",
  //   "bg-orange-600",
  //   "bg-rose-600",
  //   "bg-fuchsia-600",
  //   "bg-violet-600",
  //   "bg-lime-600",
  //   "bg-emerald-600",
  //   "bg-amber-600",
  //   "bg-sky-600",
  //   "bg-slate-700",
  //   "bg-zinc-700",
  //   "bg-neutral-700",
  // ];

  const bgColors = [
    "bg-gradient-to-r from-blue-600 to-indigo-600",
    "bg-gradient-to-r from-green-500 to-emerald-600",
    "bg-gradient-to-r from-red-500 to-pink-600",
    "bg-gradient-to-r from-purple-500 to-fuchsia-600",
    "bg-gradient-to-r from-pink-500 to-rose-600",
    "bg-gradient-to-r from-yellow-500 to-amber-600",
    "bg-gradient-to-r from-indigo-500 to-violet-600",
    "bg-gradient-to-r from-cyan-500 to-sky-600",
    "bg-gradient-to-r from-teal-500 to-emerald-600",
    "bg-gradient-to-r from-orange-500 to-red-600",
    "bg-gradient-to-r from-rose-500 to-pink-600",
    "bg-gradient-to-r from-fuchsia-500 to-pink-600",
    "bg-gradient-to-r from-violet-500 to-purple-600",
    "bg-gradient-to-r from-lime-500 to-green-600",
    "bg-gradient-to-r from-emerald-500 to-teal-600",
    "bg-gradient-to-r from-amber-500 to-orange-600",
    "bg-gradient-to-r from-sky-500 to-cyan-600",
    "bg-gradient-to-r from-slate-600 to-slate-800",
    "bg-gradient-to-r from-zinc-600 to-zinc-800",
    "bg-gradient-to-r from-neutral-600 to-neutral-800",
  ];

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
