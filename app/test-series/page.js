'use client';

import React, { useEffect, useState } from 'react';
import { Header, Footer } from '@/components';
import 'aos/dist/aos.css';
import { FaArrowRight, FaBook, FaLightbulb, FaChalkboardTeacher } from 'react-icons/fa';
import Link from 'next/link';

const tests = [
  {
    title: 'CA CS CMA',
    desc: 'Professional exams for commerce students.',
    logo: '/assets/img/ca.png',
    link: './CACSCMA',
    aos: 'fade-up',
  },
  {
    title: 'CBSE',
    desc: 'Mock tests from class 6th to 12th.',
    logo: '/assets/img/cbse.png',
    link: '#',
    aos: 'flip-up',
  },
  {
    title: 'Competitive Exams',
    desc: 'UPSC, SSC, Railways & more.',
    logo: '/assets/img/competitive.jpg',
    link: '#',
    aos: 'zoom-out',
  },
  {
    title: 'CUET',
    desc: 'UG entrance test practice series.',
    logo: '/assets/img/cuet.png',
    link: '#',
    aos: 'slide-left',
  },
  {
    title: 'Olympiad',
    desc: 'Practice for SOF and other olympiads.',
    logo: '/assets/img/olympaid.jpg',
    link: '#',
    aos: 'fade-down',
  },
  {
    title: 'NEET',
    desc: 'Medical entrance mock tests.',
    logo: '/assets/img/neet.jpg',
    link: '#',
    aos: 'flip-right',
  },
];

function FlipCard({ test, delay }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="relative [perspective:1000px] h-80 w-full cursor-pointer"
      data-aos={test.aos}
      data-aos-delay={delay}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full duration-700 transform-style-preserve-3d transition-transform ${
          flipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front Side */}
        <div className="absolute w-full h-full bg-white rounded-xl shadow-lg flex flex-col justify-center items-center p-4 gap-4 backface-hidden border border-gray-200">
          <img
            src={test.logo}
            alt={test.title}
            className="w-20 h-20 object-contain"
            loading="lazy"
          />
          <h3 className="text-lg font-bold text-purple-700">{test.title}</h3>
          <span className="text-gray-400 text-sm">Tap to flip</span>
        </div>

        {/* Back Side */}
        <div className="absolute w-full h-full bg-purple-600 text-white rounded-xl flex flex-col justify-center items-center text-center px-6 py-4 rotate-y-180 backface-hidden">
          <p className="text-sm leading-relaxed">{test.desc}</p>
          <Link
            href={test.link}
            className="mt-4 inline-flex items-center gap-2 bg-white text-purple-700 px-4 py-2 text-sm font-semibold rounded-full hover:bg-gray-100 transition"
          >
            Start Test <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function MockTests() {
  useEffect(() => {
    import('aos').then((AOS) => {
      AOS.init({
        duration: 700,
        easing: 'ease-in-out',
        once: false,
      });
    });
  }, []);

  return (
    <>
      <Header />
      <main className="py-16 bg-gradient-to-b from-white to-gray-100 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Heading */}
          <div className="text-center mb-12" data-aos="fade-down">
            <h2 className="text-4xl sm:text-5xl font-extrabold text-purple-700 mb-3 flex justify-center items-center gap-3">
              <FaLightbulb className="text-yellow-400" />
              Best Mock Tests
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto text-sm sm:text-base">
              Choose from a wide variety of practice tests designed for excellence.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tests.map((test, i) => (
              <FlipCard key={i} test={test} delay={i * 100} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
