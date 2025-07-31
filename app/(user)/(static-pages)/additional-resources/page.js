"use client";
import React from "react";
import { ExternalResourceCard } from "@/components";
import { FaChartLine } from "react-icons/fa";

const resources = [
  {
    title: "External Digital Library",
    resources: [
      {
        id: 583,
        name: "Arvind Gupta Toys",
        url: "https://www.arvindguptatoys.com/",
        icon: FaChartLine,
        color: "#007bff",
      },
      {
        id: 581,
        name: "Edubridge",
        url: "https://www.edubridgeindia.com/",
        icon: FaChartLine,
        color: "#dc3545",
      },
      {
        id: 580,
        name: "EDX",
        url: "https://www.edx.org/?utm_source=affiliate&utm_medium=Ecom%20EWAY&utm_campaign=Online%20Tracking%20Link_&utm_content=ONLINE_TRACKING_LINK&irgwc=1&irclickid=QfdW-E1nAxyKTyg3Cr0WIVJKUkCzLY17TQzYXY0",
        icon: FaChartLine,
        color: "#28a745",
      },
      {
        id: 579,
        name: "Vidwan",
        url: "https://vidwan.inflibnet.ac.in/",
        icon: FaChartLine,
        color: "#ffc107",
      },
      {
        id: 578,
        name: "Swayam",
        url: "https://swayam.gov.in/",
        icon: FaChartLine,
        color: "#fd7e14",
      },
      {
        id: 450,
        name: "National Digital Library of India",
        icon: FaChartLine,
        url: "https://ndl.iitkgp.ac.in/",
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
        icon: FaChartLine,
        color: "#007bff",
      },
      {
        id: 449,
        name: "Rajya Marathi Vikas Samstha",
        url: "https://rmvs.marathi.gov.in/books",
        icon: FaChartLine,
        color: "#dc3545",
      },
      {
        id: 448,
        name: "Marathi Books",
        url: "https://sahitya.marathi.gov.in/%e0%a4%87-%e0%a4%ac%e0%a5%81%e0%a4%95-%e0%a4%a1%e0%a4%be%e0%a4%8a%e0%a4%a8%e0%a4%b2%e0%a5%8b%e0%a4%a1/",
        icon: FaChartLine,
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

        {/* <div className="text-right mb-6">
          <a
            href="/bookmark/index"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            View Bookmarks
          </a>
        </div> */}

        {resources.map((section) => (
          <div key={section.section} className="mb-10 ">
            <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.resources.map((item, index) => (
                <ExternalResourceCard item={item} key={index} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdditionalResourcesPage;
