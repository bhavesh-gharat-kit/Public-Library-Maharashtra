"use client";
import React from "react";
import {
  faBriefcase,
  faCogs,
  faHeartbeat,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";

import { ResourceCardFortAwesome } from "@/components";

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

      {examData.map((section) => (
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

export default EntranceExamsPage;
