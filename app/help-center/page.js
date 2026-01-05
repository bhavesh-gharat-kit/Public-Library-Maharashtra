import { Footer, Header } from "@/components";
import React from "react";
// https://youtu.be/cdpsGBOMlLA overview

const helpVideos = [
  {
    title: "How to use EBooks ?",
    youtubeId: "UOg7gV2-zYM",
  },
  {
    title: "How to use test series ?",
    youtubeId: "rLauFkUKZk8",
  },
  {
    title: "How to use current affairs ?",
    youtubeId: "pXWvkZ899Mo",
  },
  {
    title: "How to use manuscript ?",
    youtubeId: "oLD3a7toFCo",
  },
  {
    title: "How to use skills and career development ?",
    youtubeId: "NGHPo2gF28c",
  },
  {
    title: "How to use hobbies and interests ?",
    youtubeId: "CfHY3r04uG4",
  },
  {
    title: "How to use childrens section ?",
    youtubeId: "HZ5LGULgh4Q",
  },
  {
    title: "How to use science and technology ?",
    youtubeId: "pIHjOdBTe_8",
  },
  {
    title: "How to use literature and novels ?",
    youtubeId: "DnS4xbDcY0c",
  },
  {
    title: "How to use history and culture ?",
    youtubeId: "63nr8o1DI7A",
  },
  {
    title: "How to use how to use news and media ?",
    youtubeId: "alT3X3BstqE",
  },
  {
    title: "How to use additional resources ?",
    youtubeId: "RDNYMKt6fXM",
  },
  {
    title: "How to use job training videos ?",
    youtubeId: "",
  },
  {
    title: "How to use primary section ?",
    youtubeId: "vfhD-DRtOeI",
  },
  {
    title: "How to use secondary section ?",
    youtubeId: "ySUvtS_gZ3w",
  },
  {
    title: "How to use education section ?",
    youtubeId: "K0ntkkK_N4E",
  },
  {
    title: "How to use entrance exams ?",
    youtubeId: "Imns1GZjtP8",
  },
  {
    title: "How to use health and wellness ?",
    youtubeId: "6nHIu7mrTgo",
  },
  {
    title: "How to use high school section ?",
    youtubeId: "s_syc4moLRI",
  },
];

const HelpCenter = () => {
  return (
    <>
      <Header />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Overview of the Platform
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            A brief introduction to the platform features and navigation.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-items-center">
          {/* Video Card */}
          <div className="w-full max-w-xl bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Overview (English)
              </h3>

              {/* Responsive Video */}
              <div className="relative w-full overflow-hidden rounded-xl bg-gray-100 aspect-video">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/cdpsGBOMlLA"
                  title="Overview"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Help Centre
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Explore step-by-step video guides to understand features and workflows.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {helpVideos.map((video, index) => (
            <div
              key={index}
              className="w-full bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Card Content */}
              <div className="p-5">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 leading-snug">
                  {video.title}
                </h3>

                {/* Responsive Video */}
                <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-100">
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
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