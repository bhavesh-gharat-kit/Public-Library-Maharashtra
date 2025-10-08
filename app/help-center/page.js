import { Footer, Header } from "@/components";
import React from "react";

const helpVideos = [
  {
    title: "How to use digital library ?",
    youtubeId: "m6ocbrhSXkM", 
  },
  {
    title: "How to use test series ?",
    youtubeId: "L9BxfaeKcqM",
  }, 
  {
    title: "How library admin can add users and manage validity ?",
    youtubeId: "6esEUJ9hVy8",
  },
  {
    title: "How to highlight content and take notes ?",
    youtubeId: "BHEwSBVrpnQ",
  },
];

const HelpCenter = () => {
  return (
    <>
      <Header />
      <section className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-10">Help Centre</h2>
        <div className="space-y-10 ">
          {helpVideos.map((video, index) => (
            <div className="" key={index}>
              <h3 className="text-xl font-semibold mb-4">{video.title}</h3>
              <div className="aspect-w-24 max-w-96 h-48  aspect-h-18">
                <iframe
                  className="w-full h-full rounded-xl"
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default HelpCenter;
