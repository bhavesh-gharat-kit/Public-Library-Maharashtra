"use client";
import React, { useEffect, useState } from "react";
import { FaFilter, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FiCheckSquare, FiXCircle } from "react-icons/fi";

export default function FilterSidebar({
  filters = {},
  appliedFilters = {},
  setAppliedFilters,
  onApply,
  onClear,
}) {
  const [isOpen, setIsOpen] = useState(false); // for mobile toggle

  const handleApply = () => {
    onApply && onApply(selectedFilters);
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelectedFilters({});
    onClear && onClear();
  };

  const handleUpdateFilters = (event, category, value) => {
    setAppliedFilters((prev) => {
      const current = prev[category] || [];

      const updated = event.target.checked
        ? [...current, value] // add
        : current.filter((v) => v !== value); // remove

      return {
        ...prev,
        [category]: updated,
      };
    });
  };

  useEffect(() => {
    console.log(appliedFilters);
  }, [appliedFilters]);

  return (
    <div className="w-fit md:w-80">
      {/* Mobile Toggle */}
      <div className="md:hidden mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition-all"
        >
          <span className="flex items-center gap-2 font-semibold">
            <FaFilter /> {isOpen ? "Hide Filters" : "Show Filters"}
          </span>
          {isOpen ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>

      {/* Filter Panel */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:block transition-all duration-300 ease-in-out`}
      >
        <aside className="bg-white max-h-screen overflow-y-auto scrollbar-sm border border-gray-200 shadow-lg rounded-xl p-5 space-y-6 md:sticky md:top-24">
          <div className="pb-3 border-b border-gray-200">
            <h2 className="text-lg font-bold text-indigo-600">
              📚 Filter Books
            </h2>
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span>📅</span>
              Year of Publication
            </h3>
            <ul className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto custom-scrollbar">
              {filters.yearOfPublication?.map((item, index) => (
                <li
                  key={index}
                  className="w-[48%] flex items-center  gap-2 text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={
                      appliedFilters.yearOfPublication?.includes(item)
                        ? true
                        : false
                    }
                    onChange={(e) =>
                      handleUpdateFilters(e, "yearOfPublication", item)
                    }
                    className="accent-indigo-600 h-4 w-4 cursor-pointer transform transition-transform duration-150 hover:scale-110"
                  />
                  <label className="cursor-pointer">{item}</label>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span>📅</span>
              Languages
            </h3>
            <ul className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto custom-scrollbar">
              {filters.languages?.map((item, index) => (
                <li
                  key={index}
                  className="w-[48%] flex items-center  gap-2 text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={
                      appliedFilters.languages?.includes(item) ? true : false
                    }
                    onChange={(e) => handleUpdateFilters(e, "languages", item)}
                    className="accent-indigo-600 h-4 w-4 cursor-pointer transform transition-transform duration-150 hover:scale-110"
                  />
                  <label className="cursor-pointer">{item}</label>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span>📅</span>
              Publishers
            </h3>
            <ul className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto custom-scrollbar">
              {filters.publishers?.map((item, index) => (
                <li
                  key={index}
                  className="w-[48%] flex items-center  gap-2 text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={
                      appliedFilters.publishers?.includes(item) ? true : false
                    }
                    onChange={(e) => handleUpdateFilters(e, "publishers", item)}
                    className="accent-indigo-600 h-4 w-4 cursor-pointer transform transition-transform duration-150 hover:scale-110"
                  />
                  <label className="cursor-pointer">{item}</label>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span>📅</span>
              Content Types
            </h3>
            <ul className="grid grid-cols-2 gap-3 max-h-48 overflow-y-auto custom-scrollbar">
              {filters.contentTypes?.map((item, index) => (
                <li
                  key={index}
                  className="w-[48%] flex items-center  gap-2 text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={
                      appliedFilters.contentTypes?.includes(item) ? true : false
                    }
                    onChange={(e) =>
                      handleUpdateFilters(e, "contentTypes", item)
                    }
                    className="accent-indigo-600 h-4 w-4 cursor-pointer transform transition-transform duration-150 hover:scale-110"
                  />
                  <label className="cursor-pointer">{item}</label>
                </li>
              ))}
            </ul>
          </div>

          {/* Buttons */}
          <div className="pt-4 border-t border-gray-200 flex flex-col gap-3">
            <button
              onClick={handleApply}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              <FiCheckSquare className="text-lg" /> Apply Filters
            </button>
            <button
              onClick={handleClear}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-200 transition flex items-center justify-center gap-2"
            >
              <FiXCircle className="text-lg" /> Clear All
            </button>
          </div>

        </aside>
      </div>
    </div>
  );
}
