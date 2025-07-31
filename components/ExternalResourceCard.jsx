import React from "react";

export default function ResourceCard({
  item,
  handleBookmark = () => {
    console.log("no function");
  },
}) {
  return (
    <div
      key={item.id}
      className="bg-white rounded-2xl shadow-lg p-6 text-center transition-transform hover:scale-[1.02] hover:shadow-xl"
      data-aos="zoom-in"
    >
      <item.icon
        className="text-4xl mx-auto mb-4"
        style={{ color: item.color || "#1d4ed8" }}
      />

      <h5 className="text-xl font-semibold text-blue-700 mb-2">{item.name}</h5>

      <div className="flex justify-center gap-4 mt-4">
        <a
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className="bg-green-600 hover:bg-green-700 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition"
        >
          View
        </a>

        <button
          onClick={() => handleBookmark(item.id, item.name)}
          className="bg-yellow-400 hover:bg-yellow-500 text-black text-sm font-medium px-5 py-2.5 rounded-lg transition"
        >
          Bookmark
        </button>
      </div>
    </div>
  );
}
