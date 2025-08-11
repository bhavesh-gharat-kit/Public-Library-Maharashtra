// components/TestCard.jsx
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function TestCard({ card, idx }) {
  return (
    <div
      key={idx}
      data-aos={card.aos}
      data-aos-delay={idx * 100}
      className="group bg-white shadow-lg hover:shadow-purple-300 rounded-2xl p-6 transition duration-500 border hover:border-purple-500 flex flex-col justify-between"
    >
      <div>
        <h3 className="text-xl font-bold text-purple-700 mb-2 group-hover:underline">
          {card.title}
        </h3>
        <p className="text-gray-600 mb-6">{card.description ||card.desc}</p>
      </div>
      <Link
        href={card.link}
        className="mt-auto inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-purple-600 hover:bg-purple-800 border border-purple-800 rounded-md py-2 px-4 transition-all duration-300"
      >
        Explore Tests
        <FaArrowRight />
      </Link>
    </div>
  );
}
