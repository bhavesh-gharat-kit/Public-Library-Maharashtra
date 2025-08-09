// components/TestCard.jsx
import Link from "next/link";

export default function TestCard({ card, idx }) {
  return (
    <div
      data-aos={card.aos}
      data-aos-delay={idx * 100}
      className="group bg-white shadow-lg hover:shadow-purple-300 rounded-2xl p-6 transition duration-500 border hover:border-purple-500 flex flex-col justify-between"
    >
      <div>
        <h3 className="text-xl font-semibold text-purple-700 mb-2">
          {card.title}
        </h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          {card.desc}
        </p>
      </div>
      <Link
        href={card.link}
        className="mt-6 inline-block bg-purple-600 text-white font-medium text-sm text-center py-2 px-4 rounded-md hover:bg-purple-700 transition"
      >
        Explore Tests
      </Link>
    </div>
  );
}
