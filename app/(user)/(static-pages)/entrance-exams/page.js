"use client";
import React from "react";
import {
  faBriefcase,
  faCogs,
  faHeartbeat,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";

const examData = [
  {
    title: "Management",
    items: [
      {
        id: 19,
        name: "CAT",
        url: "https://iimcat.ac.in",
        icon: faBriefcase,
        color: "#007bff",
      },
    ],
  },
  {
    title: "Engineering",
    items: [
      {
        id: 17,
        name: "JEE Main",
        url: "https://jeemain.nta.nic.in",
        icon: faCogs,
        color: "#007bff",
      },
    ],
  },
  {
    title: "Medical",
    items: [
      {
        id: 18,
        name: "NEET",
        url: "https://www.shiksha.com/medicine-health-sciences/neet-exam",
        icon: faHeartbeat,
        color: "#007bff",
      },
    ],
  },
  {
    title: "Government Jobs",
    items: [
      {
        id: 20,
        name: "UPSC",
        url: "https://upsc.gov.in",
        icon: faGlobe,
        color: "#007bff",
      },
    ],
  },
];

const EntranceExamsPage = () => {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-6">Entrance Exams</h1>

      {/* <div className="text-right mb-6">
        <a href="/bookmark/index" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          View Bookmarks
        </a>
      </div> */}

      {examData.map((section) => (
        <div key={section.title} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-6 text-center">
                <FontAwesomeIcon icon={item.icon} size="3x" style={{ color: item.color }} />
                <h5 className="text-lg font-medium mt-4 text-blue-600">{item.name}</h5>
                <div className="flex justify-center gap-3 mt-4">
                  <a
                    href={item.url}
                    target="_blank"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    rel="noreferrer"
                  >
                    View
                  </a>
                  <button
                    onClick={() => toast.success(`Bookmark added for ${item.name}`)}
                    className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
                  >
                    Bookmark
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EntranceExamsPage;
