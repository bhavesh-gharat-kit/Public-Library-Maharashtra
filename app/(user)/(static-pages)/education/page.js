"use client";
import React from "react";
import {
  faBookReader,
  faBookOpen,
  faLaptop,
  faBook,
  faChalkboardTeacher,
  faUniversity,
  faVideo,
  faChalkboard,
  faLaptopMedical,
  faLaptopCode,
  faLightbulb,
  faGraduationCap,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import toast from "react-hot-toast";

const data = [
  {
    title: "School Curriculum",
    items: [
      {
        id: 4,
        name: "Maharashtra Textbooks",
        url: "http://ebalbharati.in",
        icon: faBookReader,
        color: "#007bff",
      },
      {
        id: 3,
        name: "Karnataka Textbooks",
        url: "https://ktbs.kar.nic.in/New/index.html#!/textbook",
        icon: faBookOpen,
        color: "#dc3545",
      },
      {
        id: 2,
        name: "ePathshala",
        url: "https://epathshala.nic.in",
        icon: faLaptop,
        color: "#28a745",
      },
      {
        id: 1,
        name: "NCERT Textbooks",
        url: "https://ncert.nic.in",
        icon: faBook,
        color: "#ffc107",
      },
    ],
  },
  {
    title: "Higher Education",
    items: [
      {
        id: 7,
        name: "Swayam",
        url: "https://swayam.gov.in",
        icon: faChalkboardTeacher,
        color: "#007bff",
      },
      {
        id: 6,
        name: "MIT OpenCourseWare",
        url: "https://ocw.mit.edu",
        icon: faUniversity,
        color: "#dc3545",
      },
      {
        id: 5,
        name: "NPTEL",
        url: "https://nptel.ac.in",
        icon: faVideo,
        color: "#28a745",
      },
    ],
  },
  {
    title: "Online Classes & Tutorials",
    items: [
      {
        id: 13,
        name: "Unacademy",
        url: "https://unacademy.com",
        icon: faBookReader,
        color: "#007bff",
      },
      {
        id: 12,
        name: "edX",
        url: "https://www.edx.org",
        icon: faChalkboard,
        color: "#dc3545",
      },
      {
        id: 11,
        name: "Coursera",
        url: "https://www.coursera.org",
        icon: faLaptop,
        color: "#28a745",
      },
    ],
  },
  {
    title: "Study Materials & Notes",
    items: [
      {
        id: 16,
        name: "Toppr",
        url: "https://www.toppr.com",
        icon: faLaptopMedical,
        color: "#007bff",
      },
      {
        id: 15,
        name: "ExamFear",
        url: "https://www.examfear.com",
        icon: faVideo,
        color: "#dc3545",
      },
      {
        id: 14,
        name: "Study Tonight",
        url: "https://www.studytonight.com",
        icon: faBook,
        color: "#28a745",
      },
    ],
  },
  {
    title: "Educational Videos",
    items: [
      {
        id: 10,
        name: "Byju's",
        url: "https://www.byjus.com",
        icon: faLaptopCode,
        color: "#007bff",
      },
      {
        id: 9,
        name: "TED-Ed",
        url: "https://ed.ted.com",
        icon: faLightbulb,
        color: "#dc3545",
      },
      {
        id: 8,
        name: "Khan Academy",
        url: "https://www.khanacademy.org",
        icon: faGraduationCap,
        color: "#28a745",
      },
    ],
  },
];

const Education = () => {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center my-6">Education</h1>

      {/* <div className="text-right mb-6">
        <a
          href="/bookmark/index"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          View Bookmarks
        </a>
      </div> */}

      {data.map((section) => (
        <div key={section.title} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.items.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-lg shadow-md p-6 text-center"
              >
                <FontAwesomeIcon
                  icon={item.icon}
                  size="3x"
                  style={{ color: item.color }}
                />
                <h5 className="text-lg font-medium mt-4 text-blue-600">
                  {item.name}
                </h5>
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
                    onClick={() =>
                      toast.success(`Bookmark added for ${item.name}`)
                    }
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

export default Education;
