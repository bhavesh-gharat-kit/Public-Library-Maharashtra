"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import {
  FaBookOpen,
  FaPencilAlt,
  FaNewspaper,
  FaBook,
  FaGraduationCap,
  FaBriefcase,
  FaPalette,
  FaChild,
  FaFlask,
  FaLandmark,
  FaHeartbeat,
  FaVideo,
  FaUniversity,
  FaPenFancy,
} from "react-icons/fa";
import Link from "next/link"; 

// Reusable Card Component
function ResourceCard({ resource, delay = 0 }) {
  return (
    <div
      className="bg-white shadow-md shadow-yellow-200 rounded-lg p-6 flex flex-col items-center text-center transition-transform hover:scale-[102%] hover:shadow-lg"
      data-aos={resource.animation}
      data-aos-delay={delay}
    >
      <div className={`text-3xl mb-4 ${resource.color}`}>
        <resource.icon className={`${resource.color}`} />
      </div>
      <h3 className="text-lg font-bold mb-2">{resource.title}</h3>
      <p className="text-sm text-gray-600 mb-4">{resource.description}</p>
      <Link
        href={resource.link}
        className="block w-full bg-yellow-400 text-black text-sm font-medium px-10 py-2 rounded hover:bg-yellow-500 text-center"
      >
        View Details
      </Link>
    </div>
  );
}

export default function ResourcesPage() {
  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);

  const resources = [
    {
      title: "Ebooks",
      icon: FaBookOpen,
      color: "text-blue-600",
      description: "Generic | Academic | Competitive Exams",
      link: "/e-books",
      animation: "fade-in",
    },
    {
      title: "Test Series",
      icon: FaPencilAlt,
      color: "text-red-600",
      description: "NEET | JEE | UPSC | SSC | Banking | Railways",
      link: "/mock-tests",
      animation: "zoom-in",
    },
    {
      title: "Current Affairs",
      icon: FaNewspaper,
      color: "text-green-600",
      description: "UPSC | SSC | Defence | State PSCs",
      link: "/current-affairs",
      animation: "fade-left",
    },
    {
      title: "Manuscript",
      icon: FaPenFancy, 
      color: "text-purple-600",
      description:
        "Research Papers | Book Drafts | Article Submissions | Creative Writing & more",
        link: "/manuscript",
        animation: "fade-up",
      },    
    {
      title: "Education",
      icon: FaBook,
      color: "text-blue-600",
      description:
        "Higher Educations | Educational Videos | School Curriculum | Study Materials & more",
      link: "/education",
      animation: "fade-up",
    },
    {
      title: "Entrance Exams",
      icon: FaGraduationCap,
      color: "text-red-500",
      description:
        "Government Jobs | Management | Engineering | Medical & more",
      link: "/entrance-exams",
      animation: "fade-up",
    },
    {
      title: "Skills & Career Development",
      icon: FaBriefcase,
      color: "text-green-600",
      description: "Job Related | Language Learning | IT & Software & more",
      link: "/skills-career",
      animation: "fade-up",
    },
    {
      title: "Hobbies & Interests",
      icon: FaPalette,
      color: "text-yellow-500",
      description: "Art & Craft | Cooking | Gardening | Photography & more",
      link: "/hobbies-interests",
      animation: "fade-up",
    },
    {
      title: "Children's Section",
      icon: FaChild,
      color: "text-orange-500",
      description:
        "Learning Videos (Alphabet, Numbers, Colors) | Fun Science Experiments | Children & more",
      link: "/children",
      animation: "fade-up",
    },
    {
      title: "Science & Technology",
      icon: FaFlask,
      color: "text-purple-600",
      description:
        "Technology News | Innovation & Discoveries | Science Documentaries | Online Courses & more",
      link: "/science-technology",
      animation: "fade-up",
    },
    {
      title: "Literature & Novels",
      icon: FaBookOpen,
      color: "text-blue-600",
      description:
        "Poetry | Non-Fiction | Online Libraries & E-books | Book Reviews & Recommendations & more",
      link: "/literature-novels",
      animation: "fade-up",
    },
    {
      title: "History & Culture",
      icon: FaLandmark,
      color: "text-pink-600",
      description:
        "World History | Historical Sites & Museums (Virtual Tours) | Biographies | Culture & more",
      link: "/history-culture",
      animation: "fade-up",
    },
    {
      title: "News & Media",
      icon: FaNewspaper,
      color: "text-blue-700",
      description:
        "News Portals & Websites | TV News Channels (Live Streaming) | Podcasts & Radio & more",
      link: "/news-media",
      animation: "fade-up",
    },
    {
      title: "Health & Wellness",
      icon: FaHeartbeat,
      color: "text-green-500",
      description:
        "Fitness Programs | Yoga & Meditation | Mental Health Resources | Nutrition & Diet & more",
      link: "/health-wellness",
      animation: "fade-up",
    },
    {
      title: "Additional Resources",
      icon: FaBook,
      color: "text-cyan-600",
      description: "Marathi Books | External Digital Library & more",
      link: "/additional-resources",
      animation: "fade-up",
    },
    {
      title: "Job Training Videos",
      icon: FaVideo,
      color: "text-yellow-500",
      description: "Skills Training Videos & more",
      link: "/job-training-videos",
      animation: "fade-up",
    },
    {
      title: "Primary",
      icon: FaBriefcase,
      color: "text-green-600",
      description:
        "Creativity & Performing Arts | Fun & Edutainment | Health & Well-being | Environment & more",
      link: "/primary",
      animation: "fade-up",
    },
    {
      title: "Secondary",
      icon: FaUniversity,
      color: "text-pink-600",
      description:
        "Academic Learning | Digital Literacy & Tech Skills | Life Skills & Personal Development & more",
      link: "/secondary",
      animation: "fade-up",
    },
    {
      title: "High School",
      icon: FaGraduationCap,
      color: "text-red-500",
      description:
        "Fun & Edutainment | Language & Communication | Environment & Social Responsibility & more",
      link: "/high-school",
      animation: "fade-up",
    },
  ];

  return (
    <main className="py-5 bg-[#fffbd5]">
      <div className="max-w-5xl mx-auto px-4">

        <img src="/assets/img/name.jpg" className="w-full max-w-[800px] h-auto mx-auto" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-5 md:py-10">
          {resources.map((resource, index) => (
            <ResourceCard key={index} resource={resource} delay={100} />
          ))}
        </div>
      </div>
    </main>
  );
}
