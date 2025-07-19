"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

// Reusable Card Component
function ResourceCard({ resource, delay = 0 }) {
  return (
    <div
      className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center text-center transition-transform hover:scale-[102%] hover:shadow-lg"
      data-aos={resource.animation}
      data-aos-delay={delay}
    >
      <div className={`text-3xl mb-4 ${resource.color}`}>
        <i className={resource.icon}></i>
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
    AOS.init({ once: false, duration: 800 });
  }, []);

  const resources = [
    {
      title: "Ebooks",
      icon: "fas fa-book-open",
      color: "text-blue-600",
      description: "Generic | Academic | Competitive Exams",
      link: "/e-books",
      animation: "fade-in",
    },
    {
      title: "Test Series",
      icon: "fas fa-pencil-alt",
      color: "text-red-600",
      description: "NEET | JEE | UPSC | SSC | Banking | Railways",
      link: "/mock-tests",
      animation: "zoom-in",
    },
    {
      title: "Current Affairs",
      icon: "fas fa-newspaper",
      color: "text-green-600",
      description: "UPSC | SSC | Defence | State PSCs",
      link: "/current-affairs",
      animation: "fade-left",
    },
    {
      title: "Education",
      icon: "fas fa-book",
      color: "text-blue-600",
      description:
        "Higher Education | Educational Videos | School Curriculum | Study Materials & No... & more",
      link: "/education",
      animation: "fade-up",
    },
    {
      title: "Entrance Exams",
      icon: "fas fa-graduation-cap",
      color: "text-red-500",
      description:
        "Government Jobs | Management | Engineering | Medical & more",
      link: "/entrance-exams",
      animation: "fade-up",
    },
    {
      title: "Skills & Career Development",
      icon: "fas fa-briefcase",
      color: "text-green-600",
      description: "Job Related | Language Learning | IT & Software & more",
      link: "/skills-career",
      animation: "fade-up",
    },
    {
      title: "Hobbies & Interests",
      icon: "fas fa-palette",
      color: "text-yellow-500",
      description: "Art & Craft | Cooking | Gardening | Photography & more",
      link: "/hobbies-interests",
      animation: "fade-up",
    },
    {
      title: "Children's Section",
      icon: "fas fa-child",
      color: "text-orange-500",
      description:
        "Learning Videos (Alphabet, Numbers, Colors) | Fun Science Experiments | Children... & more",
      link: "/children",
      animation: "fade-up",
    },
    {
      title: "Science & Technology",
      icon: "fas fa-flask",
      color: "text-purple-600",
      description:
        "Technology News | Innovation & Discoveries | Science Documentaries | Online Cour... & more",
      link: "/science-technology",
      animation: "fade-up",
    },
    {
      title: "Literature & Novels",
      icon: "fas fa-book-open",
      color: "text-blue-600",
      description:
        "Poetry | Non-Fiction | Online Libraries & E-books | Book Reviews & Recommendatio... & more",
      link: "/literature-novels",
      animation: "fade-up",
    },
    {
      title: "History & Culture",
      icon: "fas fa-landmark",
      color: "text-pink-600",
      description:
        "World History | Historical Sites & Museums (Virtual Tours) | Biographies | Cultu... & more",
      link: "/history-culture",
      animation: "fade-up",
    },
    {
      title: "News & Media",
      icon: "fas fa-newspaper",
      color: "text-blue-700",
      description:
        "News Portals & Websites | TV News Channels (Live Streaming) | Podcasts & Radio |... & more",
      link: "/news-media",
      animation: "fade-up",
    },
    {
      title: "Health & Wellness",
      icon: "fas fa-heartbeat",
      color: "text-green-500",
      description:
        "Fitness Programs | Yoga & Meditation | Mental Health Resources | Nutrition & Die... & more",
      link: "/health-wellness",
      animation: "fade-up",
    },
    {
      title: "Additional Resources",
      icon: "fas fa-book",
      color: "text-cyan-600",
      description: "Marathi Books | External Digital Library & more",
      link: "/additional-resources",
      animation: "fade-up",
    },
    {
      title: "Job Training Videos",
      icon: "fas fa-video",
      color: "text-yellow-500",
      description: "Skills Training Videos & more",
      link: "/job-training-videos",
      animation: "fade-up",
    },
    {
      title: "Primary",
      icon: "fas fa-briefcase",
      color: "text-green-600",
      description:
        "Creativity & Performing Arts | Fun & Edutainment | Health & Well-being | Environ... & more",
      link: "/primary",
      animation: "fade-up",
    },
    {
      title: "Secondary",
      icon: "fas fa-university",
      color: "text-pink-600",
      description:
        "Academic Learning | Digital Literacy & Tech Skills | Life Skills & Personal Deve... & more",
      link: "/secondary",
      animation: "fade-up",
    },
    {
      title: "High School",
      icon: "fas fa-graduation-cap",
      color: "text-red-500",
      description:
        "Fun & Edutainment | Language & Communication | Environment & Social Responsibili... & more",
      link: "/high-school",
      animation: "fade-up",
    },
  ];

  return (
    <main className="py-10">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-center text-3xl sm:text-4xl font-extrabold text-blue-700 mb-6">
          📚 Public Library Maharashtra Digital Knowledge Centre (PLMDKC)
        </h1>
        <h2 className="text-center text-md sm:text-lg font-bold text-blue-500 mb-2">
          सार्वजनिक पुस्तकालय महाराष्ट्र, अंकीय ज्ञान केंद्र
        </h2>
        <p className="text-center text-md sm:text-lg font-bold text-blue-500 mb-8">
          1 to 100, We’ve Got a Book for Every Curious Kid, Dreamy Teen, Busy
          Adult & Wise Soul!
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <ResourceCard key={index} resource={resource} delay={100} />
          ))}
        </div>
      </div>
    </main>
  );
}
