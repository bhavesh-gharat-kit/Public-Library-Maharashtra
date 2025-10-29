import { Footer, Header } from "@/components";
import React from "react";

const helpVideos = [
  {
    title: "How to use EBooks ?",
    youtubeId: "sssQKX7yx9c", 
  },
  {
    title: "How to use test series ?",
    youtubeId: "Wacsz7GzR7Y",
  },
  {
    title: "How to use current affairs ?",
    youtubeId: "0FCfZ3c9cQ0",
  },
  {
    title: "How to use manuscript ?",
    youtubeId: "h7ga9d8kOmw",
  },
  {
    title: "How to use skills and career development ?",
    youtubeId: "Czwk7pfYfjQ",
  }, 
  {
    title: "How to use hobbies and interests ?",
    youtubeId: "Qs_IMfmYuzw",
  },
  {
    title: "How to use childrens section ?",
    youtubeId: "CcXyl3s3C4g",
  },
  {
    title: "How to use science and technology ?",
    youtubeId: "nXqOha0YKB4",
  },
  {
    title: "How to use literature and novels ?",
    youtubeId: "eybSutbQuZk",
  },
  {
    title: "How to use history and culture ?",
    youtubeId: "S47NWOQCg2k",
  },
  {
    title: "How to use how to use news and media ?",
    youtubeId: "9OohGa2-ny0",
  },
  {
    title: "How to use additional resources ?",
    youtubeId: "Cb1LRRj1OWg",
  },
  {
    title: "How to use job training videos ?",
    youtubeId: "XcP5YvV05D8",
  },
  {
    title: "How to use primary section ?",
    youtubeId: "GKfd69n-tY4",
  },
  {
    title: "How to use secondary section ?",
    youtubeId: "h4PuOU_G2Ac",
  },
  {
    title: "How to use education section ?",
    youtubeId: "VUK0tkICM9g",
  },
  {
    title: "How to use entrance exams ?",
    youtubeId: "YQfV9swF2IE",
  },
  {
    title: "How to use health and wellness ?",
    youtubeId: "koe2jn5NNhU",
  },
  {
    title: "How to use high school section ?",
    youtubeId: "ma5cNfwf-uc",
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
