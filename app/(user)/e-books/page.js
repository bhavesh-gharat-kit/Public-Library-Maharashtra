"use client";
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Header, Footer, FilterSidebar } from "@/components";
import Link from "next/link";
export default function Page() {
  useEffect(() => {
    AOS.init({
      once: false,
      duration: 100,
      easing: "ease-in-out",
      offset: 100,
    });
  }, []);

  const filters = [
    {
      title: "Year of Publication",
      options: ["2025", "2024", "2023", "2010", "2007"],
    },
    {
      title: "Mediums / Languages",
      options: ["Marathi", "Hindi", "English", "Urdu"],
    },
    { title: "Subjects", options: ["Math", "Science", "Civics", "Languages"] },
    {
      title: "Publisher",
      options: ["Balbharati", "NLB", "NCERT", "NIOS", "Other Publishers"],
    },
    { title: "Authors", options: ["Author A", "Author B", "Author C"] },
    { title: "ISSN / ISBN", options: ["123-4567890123", "987-6543210987"] },
    { title: "Content Types", options: ["open access", "premium"] },
    { title: "Content", options: ["ebooks", "videos", "articles"] },
  ];

  const allResources = [
    {
      title: "English Balbharti",
      image: "/assets/img/englishbalbharti.jpg",
      file: "/English-Balbharti.pdf",
      author: "Dr Sunil Magar",
      category: "Ebooks",
      edition: "1st Edition",
      publisher: "Vivek Uttam Gosavi",
      desc: "Textbook for students of English medium",
      aos: "fade-down",
      type: "ebook",
    },
    {
      title: "Biology",
      image: "/assets/img/biology.jpg",
      file: "/biology.pdf",
      author: "Dr. Chandrashekhar V. Murumkar",
      category: "Ebooks",
      edition: "1st Edition",
      desc: "Solar cells dye-sensitized devices",
      aos: "zoom-out",
      type: "ebook",
    },
    {
      title: "i-Book",
      image: "/assets/img/biology.jpg",
      file: "/biology.pdf",
      author: "Dr. Chandrashekhar V. Murumkar",
      category: "Ebooks",
      edition: "1st Edition",
      desc: "Solar cells dye-sensitized devices",
      aos: "zoom-out",
      type: "ibook",
    },
    {
      title: "Chemistry",
      image: "/assets/img/chemi.jpg",
      file: "/chemistry.pdf",
      author: "Shri. Rajiv Arun Patole",
      category: "Ebooks",
      edition: "2nd Edition",
      desc: "Power Quality Monitoring, Analysis & Enhancement",
      aos: "slide-up",
      type: "ebook",
    },
    {
      title: "Defence Studies",
      image: "/assets/img/defence.jpg",
      file: "/defence_studies.pdf",
      author: "Shri. Nandkumar Borse",
      category: "Ebooks",
      edition: "1st Edition",
      desc: "Advances In Applied Biotechnology",
      aos: "flip-up",
      type: "ebook",
    },
    {
      title: "French",
      image: "/assets/img/french.jpg",
      file: "/french.pdf",
      author: "Smt. Anjali Lokur",
      category: "Ebooks",
      edition: "1st Edition",
      desc: "Career Awareness & Future Readiness",
      aos: "fade-down",
      type: "ebook",
    },
    {
      title: "Chemistry",
      image: "/assets/img/chemi.jpg",
      file: "/chemistry.pdf",
      author: "Shri. Rajiv Arun Patole",
      category: "Ebooks",
      edition: "1st Edition",
      desc: "Life forms from genes to ecosystems",
      aos: "flip-right",
      type: "ebook",
    },
  ];

  const [filteredResources, setFilteredResources] = useState(allResources);

  const applyFilters = (selected) => {
    console.log("Selected Filters:", selected);
    setFilteredResources(allResources); // Replace with actual filtering
  };

  return (
    <>
      
      <main className="bg-gray-50 py-10">
        <div className="max-w-[1440px] mx-auto px-4 flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-96 md:sticky md:top-24 h-full z-10">
            <FilterSidebar
              filters={filters}
              onApply={applyFilters}
              onClear={() => setFilteredResources(allResources)}
            />
          </div>

          <div className="flex-1">
            <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 mb-8">
              Public Library Maharashtra Digital Knowledge Centre (PLMDKC)
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((item, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden flex flex-col h-[420px]"
                  data-aos={item.aos}
                  data-aos-delay={index * 100}
                >
                  <div className="h-[60%] w-full">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-fit rounded-t-xl"
                    />
                  </div>

                  <div className="h-[30%] px-4 py-3 flex flex-col justify-between">
                    <h3 className="text-base font-bold text-gray-900 truncate">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600 truncate">
                      👤 {item.author}
                    </p>
                    <p className="text-sm text-gray-600 truncate">
                      📘 {item.category} • 📝 {item.edition}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {item.desc}
                    </p>
                  </div>

                  <div className="h-[10%] w-full px-4 pb-4">
                    <Link
                      href={item.type=="ibook"?`/e-books/read-i-book${item.file}`:`/e-books/read-book${item.file}`}
                      target="_self"
                      rel="noopener noreferrer"
                      className="block w-full text-center text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-800 border border-indigo-800 rounded-md py-2 transition-all duration-300 hover:shadow-md hover:scale-[1.01]"
                    >
                      View →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
    </>
  );
}
