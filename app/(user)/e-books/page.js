"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import qs from "qs";

import {
  BookCard,
  FilterSidebar,
  FullScreenLoader,
  Tooltip,
} from "@/components";
import Link from "next/link";
import { FaPenNib } from "react-icons/fa";
import { axios } from "@/utils";

export default function Page() {
  const [data, setData] = useState([]);
  const [filtersData, setFiltersData] = useState({});
  const [appliedFilters, setAppliedFilters] = useState({});
  const [loading, setLoading] = useState(false);
  const FiltersData = {
    yearOfPublication: [2025, 2024, 2023, 2010, 2007],
    languages: ["Marathi", "Hindi", "English", "Urdu"],
    subjects: ["Math", "Science", "Civics", "Languages"],
    publishers: ["Balbharati", "NLB", "NCERT", "NIOS", "Other Publishers"],
    authors: ["Author A", "Author B", "Author C"],
    contentTypes: ["open access", "premium"],
  };


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

  useEffect(()=>{console.log(filtersData)},[filtersData])
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const params = {};

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

        setData(res.data.data);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [appliedFilters]);


  const bgColors = [
    "bg-blue-600",
    "bg-green-600",
    "bg-red-500",
    "bg-purple-600",
    "bg-pink-500",
    "bg-yellow-500",
    "bg-indigo-600",
  ];

  if (loading) return <FullScreenLoader />;

  return (
    <>
      <main className="bg-gray-50 py-10">
        <div className="max-w-[1440px] mx-auto px-4 flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-fit md:sticky md:top-24 h-full z-10">
            <FilterSidebar
              filters={filtersData}
              appliedFilters={appliedFilters}
              setAppliedFilters={setAppliedFilters}
              onApply={setAppliedFilters}
              onClear={() => setAppliedFilters({})}
            />
          </div>

          <div className="flex-1 max-h-screen overflow-y-auto scrollbar-sm p-4">
            <h1 className="text-3xl md:text-4xl text-center font-extrabold text-blue-700 mb-8">
              Public Library Maharashtra Digital Knowledge Centre (PLMDKC)
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 " >
              {data.map((item, index) => {
                const randomColor = bgColors[index % bgColors.length]; // rotate through colors

                return (
                  <BookCard book={item} randomColor={randomColor} key={index} />
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
