import { Footer, Header } from "@/components";
import React from "react";

const helpVideos = [
  {
    title: "How to use digital library ?",
    youtubeId: "dQw4w9WgXcQ", // Replace with actual video ID
  },
  {
    title: "How to use test series ?",
    youtubeId: "eY52Zsg-KVI", // Replace with actual video ID
  },
  {
    title: "How library admin can add users and manage validity ?",
    youtubeId: "z9Ug-3qhrwY", // Replace with actual video ID
  },
];

const HelpCenter = () => {
  return (
    <>
      <Header />
      <section className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-10">Help Center</h2>
        <div className="space-y-10 ">
          {helpVideos.map((video, index) => (
            <div className="" key={index}>
              <h3 className="text-xl font-semibold mb-4">{video.title}</h3>
              <div className="aspect-w-16 max-w-64  aspect-h-9">
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
