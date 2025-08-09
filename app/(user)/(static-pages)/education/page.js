"use client";
import React from "react";
import { ResourceCardFortAwesome } from "@/components";
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

      {data.map((section) => (
        <div key={section.title} className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">{section.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.items.map(({ icon, color, name, url }, index) => (
              <ResourceCardFortAwesome
                key={index}
                icon={icon}
                color={color}
                name={name}
                url={url}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Education;
