"use client";
import React, { useEffect, useState } from "react";
import {
  FaFilter,
  FaChevronDown,
  FaChevronUp,
  FaBook,
  FaSchool,
} from "react-icons/fa";
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
    setAppliedFilters({});
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

  return (
    <div className="w-full md:w-fit">
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
        <aside className="bg-white border border-gray-200 shadow-lg rounded-lg p-5 space-y-6">
          <div className="pb-3 border-b border-gray-200">
            <h2 className="text-lg font-bold text-indigo-600 flex items-center gap-2">
              <span>
                <FaBook />
              </span>
              Filter Books
            </h2>
          </div>

          {/* Publication Year */}
          {/* <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span>
                <FaCalendar />
              </span>
              Year of Publication
            </h3>
            <ul className="flex justify-between flex-wrap gap-3 max-h-48 overflow-y-auto custom-scrollbar">
              {filters.yearOfPublication?.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start shrink-0   gap-2 text-sm text-gray-700"
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
          </div> */}

          {/* Syllabus */}
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span>
                <FaBook />
              </span>
              Syllabus
            </h3>
            <ul className="flex flex-wrap gap-3 max-h-48 overflow-y-auto custom-scrollbar">
              {filters.syllabuses?.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start shrink-0 gap-2 text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={
                      appliedFilters.syllabuses?.includes(item) ? true : false
                    }
                    onChange={(e) => handleUpdateFilters(e, "syllabuses", item)}
                    className="accent-indigo-600 h-4 w-4 cursor-pointer transform transition-transform duration-150 hover:scale-110"
                  />
                  <label className="cursor-pointer break-words">{item}</label>
                </li>
              ))}
            </ul>
          </div>

          {/* Languages */}
          {/* <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span>
                <FaLanguage />
              </span>
              Languages
            </h3>
            <ul className="flex flex-wrap gap-3 max-h-48 overflow-y-auto custom-scrollbar">
              {filters.languages?.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start shrink-0 gap-2 text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={
                      appliedFilters.languages?.includes(item) ? true : false
                    }
                    onChange={(e) => handleUpdateFilters(e, "languages", item)}
                    className="accent-indigo-600 h-4 w-4 cursor-pointer transform transition-transform duration-150 hover:scale-110"
                  />
                  <label className="cursor-pointer break-words">{item}</label>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Standard */}
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span>
                <FaSchool />
              </span>
              Standard
            </h3>
            <ul className="flex flex-wrap gap-3 max-h-48 overflow-y-auto custom-scrollbar">
              {filters.standards?.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start shrink-0 gap-2 text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={
                      appliedFilters.standards?.includes(item) ? true : false
                    }
                    onChange={(e) => handleUpdateFilters(e, "standards", item)}
                    className="accent-indigo-600 h-4 w-4 cursor-pointer transform transition-transform duration-150 hover:scale-110"
                  />
                  <label className="cursor-pointer break-words">{item}</label>
                </li>
              ))}
            </ul>
          </div>

          {/* Publishers */}
          {/* <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span>
                <FaBookOpen />
              </span>
              Publishers
            </h3>
            <ul className="flex flex-wrap gap-3 max-h-48 overflow-y-auto custom-scrollbar">
              {filters.publishers?.map((item, index) => (
                <li
                  key={index}
                  className=" flex items-start gap-2 text-sm text-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={
                      appliedFilters.publishers?.includes(item) ? true : false
                    }
                    onChange={(e) => handleUpdateFilters(e, "publishers", item)}
                    className="accent-indigo-600 h-4 w-4 shrink-0 cursor-pointer transform transition-transform duration-150 hover:scale-110"
                  />
                  <label className="cursor-pointer">{item}</label>
                </li>
              ))}
            </ul>
          </div> */}

          {/* Content Type */}
          {/* <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-md font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <span>
                <FaFilter />
              </span>
              Content Types
            </h3>
            <ul className="flex flex-wrap gap-3 max-h-48 overflow-y-auto custom-scrollbar">
              {filters.contentTypes?.map((item, index) => (
                <li
                  key={index}
                  className="flex items-start shrink-0   gap-2 text-sm text-gray-700"
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
          </div> */}

          {/* Buttons */}
          <div className="pt-4 border-t border-gray-200 flex flex-col gap-3">
            {/* <button
              onClick={handleApply}
              className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              <FiCheckSquare className="text-lg" /> Apply Filters
            </button> */}
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
