"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaBookOpen,
  FaSearch,
  FaUserFriends,
  FaLaptopCode,
} from "react-icons/fa";
import { Footer, Header } from "@/components";

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 600, once: true });
  }, []);

  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Header />
      <main className=" min-h-screen max-w-5xl mx-auto py-16 px-6 flex flex-col items-center gap-24">
        {/* HERO SECTION */}
        <section className="max-w-[1280px] w-full grid lg:grid-cols-2 gap-12 items-center">
          {/* TEXT */}
          <div data-aos="fade-right" className="space-y-6">
            <h1 className="text-5xl font-bold text-gray-900 leading-tight">
              Welcome to the{" "}
              <span className="text-[#c78117]">Public Library</span>
            </h1>
            <p className="text-lg text-gray-600">
              Explore a universe of knowledge. From timeless classics to modern
              research, we bring the world of books to your fingertips.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/home">
                <button className="bg-[#c78117] hover:bg-[#ff9a02] text-white px-6 py-3 rounded-md text-sm font-semibold transition duration-300 shadow">
                  📖 Browse Collection
                </button>
              </Link>
              <button
                onClick={() => setShowModal(true)}
                className="bg-gray-200 hover:bg-gray-300 text-[#c78117] px-6 py-3 rounded-md text-sm font-semibold transition"
              >
                🌞 Daily Inspiration
              </button>
            </div>
          </div>

          {/* IMAGE */}
          <div data-aos="fade-left">
            <img
              src="/assets/img/li.png"
              alt="Library Illustration"
              className="w-full max-h-[400px] object-contain"
            />
          </div>
        </section>

        {/* STATS SECTION */}
        <section
          className="w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          data-aos="fade-up"
        >
          {[
            { label: "Books Available", value: "35K+" },
            { label: "Registered Readers", value: "12K+" },
            { label: "E-Resources", value: "8K+" },
            { label: "Events Hosted", value: "250+" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg transition duration-300"
            >
              <p className="text-3xl font-bold text-[#c78117]">{item.value}</p>
              <p className="text-sm mt-2 text-gray-600">{item.label}</p>
            </div>
          ))}
        </section>

        {/* CATEGORIES SECTION */}
        <section className="w-full max-w-6xl">
          <h2
            className="text-3xl font-bold mb-10 text-center"
            data-aos="fade-up"
          >
            What You Can Explore
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Books & Novels",
                icon: FaBookOpen,
                desc: "Thousands of physical and eBooks from all genres and languages.",
              },
              {
                title: "Research Journals",
                icon: FaLaptopCode,
                desc: "Access to peer-reviewed articles and academic journals.",
              },
              {
                title: "Community Events",
                icon: FaUserFriends,
                desc: "Workshops, storytelling, author meetups and more.",
              },
              {
                title: "E-Library",
                icon: FaSearch,
                desc: "24x7 digital access from your home, mobile or tablet.",
              },
            ].map((item, i) => (
              <div
                key={i}
                // data-aos="zoom-in"
                // data-aos-delay={i * 100}
                className="bg-white border rounded-xl p-6 text-center shadow hover:shadow-xl transition duration-500 hover:-translate-y-2"
              >
                <item.icon className="text-4xl text-[#c78117] mb-4 mx-auto" />
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA SECTION */}
        <section
          className="w-full max-w-6xl bg-[#c97725] text-white py-10 px-8 rounded-xl shadow-md text-center"
          data-aos="fade-up"
        >
          <h2 className="text-2xl font-bold mb-4">Become a Member Today</h2>
          <p className="mb-6 text-sm">
            Join thousands of passionate readers, thinkers, and learners in your
            city!
          </p>
          <Link href="/register">
            <button className="bg-white text-[#c78117] hover:text-white hover:bg-[#ff9a02] px-6 py-3 rounded-md font-semibold transition duration-300">
              🚀 Register Now
            </button>
          </Link>
        </section>

        {/* DAILY INSPIRATION MODAL */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-fade-in">
              <div className="flex justify-between items-center border-b pb-3">
                <h5 className="text-xl font-semibold">Daily Inspiration</h5>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-500 hover:text-gray-800 text-xl font-bold"
                >
                  &times;
                </button>
              </div>
              <div className="py-5">
                <p className="text-lg mb-3">
                  📚 “The only thing that you absolutely have to know, is the
                  location of the library.”
                </p>
                <p className="text-sm text-gray-500">&ndash; Albert Einstein</p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

// 'use client';
// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import AOS from 'aos';
// import 'aos/dist/aos.css';
// import {Header, Footer} from "@/components";

// export default function Home() {
//   useEffect(() => {
//     AOS.init({ duration: 500, once: false });
//   }, []);

//   const [showModal, setShowModal] = useState(false);

//   return (
//     <>
//       <Header />
//       <main className="bg-white min-h-screen py-10 px-4 flex flex-col items-center justify-start gap-12">

//         {/* QUOTE BOX */}
//         <div className="bg-[#c97725] text-white text-center px-6 py-5 rounded-md shadow-lg max-w-lg w-full hover:bg-[#ff9a02] scale-95 transition-transform duration-100" data-aos="slide-right">
//           <p className="italic text-lg leading-relaxed">
//             “Reading is not just an escape. It is access to a better way of life, a deeper understanding of the world,
//             and a constant source of ideas that shape our minds and hearts.”
//           </p>
//           <p className="mt-3 font-semibold">– Oprah Winfrey</p>
//         </div>

//         {/* DAILY INSPIRATION BUTTON */}
//         <button
//           onClick={() => setShowModal(true)}
//           className="bg-[#c78117] hover:bg-[#ff9a02] text-white font-medium px-6 py-2 rounded-md transition duration-300 shadow"
//           data-aos="flip-down"
//           data-aos-delay="100"
//         >
//           🌞 Daily Inspiration
//         </button>

//         {/* HERO SECTION */}
//         <section className="max-w-[1280px] w-full flex flex-col-reverse lg:flex-row items-center justify-between px-4 lg:px-12 py-10 gap-10">
//           {/* TEXT SECTION */}
//           <div className="lg:w-1/2 text-left" data-aos="fade-right">
//             <h1 className="text-4xl font-bold mb-4 text-gray-900">
//               Expand Your Mind, Read a Book
//             </h1>
//             <p className="text-lg text-gray-700 mb-6 leading-relaxed">
//               Books are magical. They can teach us, transform us, heal us, make us feel safe,
//               push us out of our comfort zone, and make us feel like we know people and places that never existed before.
//               Books make us feel at home. <strong>Writers make us feel <em>understood</em></strong>.
//             </p>
//             <Link href="/home">
//               <button className="bg-[#c78117] hover:bg-[#ff9a02] text-white px-6 py-3 rounded-md text-sm font-semibold transition duration-300">
//                 Exploring Why, How & What
//               </button>
//             </Link>
//           </div>

//           {/* IMAGE SECTION */}
//           <div className="lg:w-1/2 w-full" data-aos="slide-up">
//             <img
//               src="/assets/img/li.png"
//               alt="Library Room Illustration"
//               className="w-full h-auto object-contain mx-auto"
//               loading="lazy"
//             />
//           </div>
//         </section>

//         {/* MODAL OVERLAY */}
//         {showModal && (
//           <div className="fixed inset-0  bg-opacity-50 z-50 flex items-center justify-center px-4">
//             <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
//               <div className="flex justify-between items-center border-b pb-3">
//                 <h5 className="text-xl font-semibold">Daily Inspiration</h5>
//                 <button
//                   onClick={() => setShowModal(false)}
//                   className="text-gray-500 hover:text-gray-800 text-xl font-bold"
//                 >
//                   &times;
//                 </button>
//               </div>
//               <div className="py-5">
//                 <p className="text-lg mb-3">📖 “A reader lives a thousand lives before he dies... The man who never reads lives only one.”</p>
//                 <p className="text-sm text-gray-500">&ndash; George R.R. Martin</p>
//               </div>
//             </div>
//           </div>
//         )}
//       </main>
//       <Footer />
//     </>
//   );
// }
