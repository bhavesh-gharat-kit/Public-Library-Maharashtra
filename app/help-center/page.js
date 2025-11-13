import { Footer, Header } from "@/components";
import React from "react";

const helpVideos = [
  {
    title: "How to use EBooks ?",
    youtubeId: "4S2neTgTOOY", 
  },
  {
    title: "How to use test series ?",
    youtubeId: "yWvd2ldKXPU",
  },
  {
    title: "How to use current affairs ?",
    youtubeId: "Mrm2DPRCTaY",
  },
  {
    title: "How to use manuscript ?",
    youtubeId: "gvyD7n_9mVA",
  },
  {
    title: "How to use skills and career development ?",
    youtubeId: "ZVPoPKNzBfQ",
  }, 
  {
    title: "How to use hobbies and interests ?",
    youtubeId: "TKOiWcDHR7A",
  },
  {
    title: "How to use childrens section ?",
    youtubeId: "VNrHTB6w2Q4",
  },
  {
    title: "How to use science and technology ?",
    youtubeId: "THhvF5PftgA",
  },
  {
    title: "How to use literature and novels ?",
    youtubeId: "mDwqZywVYAo",
  },
  {
    title: "How to use history and culture ?",
    youtubeId: "Dy41OFmDyD8",
  },
  {
    title: "How to use how to use news and media ?",
    youtubeId: "bpEaWi1DRWw",
  },
  {
    title: "How to use additional resources ?",
    youtubeId: "gCvoDUt73Rk",
  },
  {
    title: "How to use job training videos ?",
    youtubeId: "NGsfOJeMrQg",
  },
  {
    title: "How to use primary section ?",
    youtubeId: "3EjAeJP2HMU",
  },
  {
    title: "How to use secondary section ?",
    youtubeId: "9caEuzm7JKg",
  },
  {
    title: "How to use education section ?",
    youtubeId: "RkZqrWZhURM",
  },
  {
    title: "How to use entrance exams ?",
    youtubeId: "aLSQSHnDCoM",
  },
  {
    title: "How to use health and wellness ?",
    youtubeId: "tDViI78_94g",
  },
  {
    title: "How to use high school section ?",
    youtubeId: "GTj2F1kNTx8",
  },
];

const HelpCenter = () => {
  return (
    <>
      <Header />
      <section className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-10">Help Centre</h2>
        <div className="space-y-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {helpVideos.map((video, index) => (
            <div className="w-fit" key={index}>
              <h3 className=" font-semibold mb-4">{video.title}</h3>
              <div className="aspect-w-36 max-w-96 h-52  aspect-h-18">
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
