"use client";
import React from "react";
import { ResourceCard } from "@/components";
import { FaBook, FaBookOpen, FaBookReader, FaChalkboardTeacher, FaFileAlt, FaGlobe, FaGraduationCap, FaTools, FaUserTie } from "react-icons/fa";


const data = [
  {
    title: "External Digital Library",
    resources: [
      {
        id: 583,
        name: "Arvind Gupta Toys",
        url: "https://www.arvindguptatoys.com/",
        icon: FaTools,
        color: "#007bff",
      },
      {
        id: 581,
        name: "Edubridge",
        url: "https://www.edubridgeindia.com/",
        icon: FaGraduationCap,
        color: "#dc3545",
      },
      {
        id: 580,
        name: "EDX",
        url: "https://www.edx.org/",
        icon: FaGlobe,
        color: "#28a745",
      },
      {
        id: 579,
        name: "Vidwan",
        url: "https://vidwan.inflibnet.ac.in/",
        icon: FaUserTie,
        color: "#ffc107",
      },
      {
        id: 578,
        name: "Swayam",
        url: "https://swayam.gov.in/",
        icon: FaChalkboardTeacher,
        color: "#fd7e14",
      },
      {
        id: 450,
        name: "National Digital Library of India",
        url: "https://ndl.iitkgp.ac.in/",
        icon: FaBookReader,
        color: "#6f42c1",
      },
    ],
  },
  {
    section: "Marathi Books",
    resources: [
      {
        id: 582,
        name: "Mahanmk Question Papers",
        url: "https://mahanmk.com/question-papers/",
        icon: FaFileAlt,
        color: "#007bff",
      },
      {
        id: 449,
        name: "Rajya Marathi Vikas Samstha",
        url: "https://rmvs.marathi.gov.in/books",
        icon: FaBookOpen,
        color: "#dc3545",
      },
      {
        id: 448,
        name: "Marathi Books",
        url: "https://sahitya.marathi.gov.in/...",
        icon: FaBook,
        color: "#28a745",
      },
    ],
  },
];

const AdditionalResourcesPage = () => {
  return (
    <>
      {/* main content start */}
      <div className="container mx-auto px-4 py-8 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">
          Additional Resources
        </h1>

        {data.map((section, index) => (
          <div key={index} className="mb-10 ">
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.resources.map((item, index) => (
                <ResourceCard
                  item={item}
                  key={index}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdditionalResourcesPage;
