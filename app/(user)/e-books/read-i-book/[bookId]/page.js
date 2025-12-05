"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { axios } from "@/utils";
import { Loader, FullScreenLoader } from "@/components";
import {
  FaChevronLeft,
  FaBook,
  FaBookOpen,
  FaListOl,
  FaInfoCircle,
  FaCalendar,
  FaUser,
  FaBuilding,
  FaGlobe,
  FaGraduationCap,
  FaTags
} from "react-icons/fa";
import Link from "next/link";

export default function IBookChaptersPage({ params }) {
  const router = useRouter();
  const unwrappedParams = use(params);
  const { bookId, chapterId } = unwrappedParams;

  const [book, setBook] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!bookId) {
      toast.error("Book not found!");
      router.back();
      return;
    }

    const fetchData = async () => {
      try {
        const { data } = await axios.get(`/api/books/${bookId}`);
        setBook(data.book);
        setChapters(data.book?.chapters || []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load book chapters");
        router.back();
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [bookId, router]);

  const handleChapterClick = (chapter) => {
    router.push(`/e-books/read-i-book/${bookId}/${chapter.id}`);
  };

  const handleBackClick = () => {
    router.back();
  };

  if (isLoading) return <FullScreenLoader />;

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Book not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-[1400px] mx-auto">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={handleBackClick}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg shadow-sm flex items-center gap-2 transition-colors"
          >
            <FaChevronLeft /> Back
          </button>
        </div>

        {/* Book Header */}
        <div className="bg-white max-w-4xl mx-auto rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Book Thumbnail */}
            {book.thumbnailLink && (
              <div className="flex-shrink-0">
                <img
                  src={book.thumbnailLink}
                  alt={book.title}
                  className="w-full md:w-48 h-64 object-cover rounded-lg shadow-md"
                />
              </div>
            )}

            {/* Book Details */}
            <div className="flex-1">
              <div className="flex items-start gap-3 mb-4">
                <FaBook className="text-blue-600 text-2xl mt-1" />
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {book.title}
                  </h1>
                  <p className="text-gray-600">Click on chapter name to open</p>
                </div>
              </div>

              {/* Book Metadata Grid */}
              <div className="flex justify-center items-center flex-wrap gap-4 mt-4">
                {/* Chapters List */}
                {!chapters || chapters.length === 0 ? (
                  <div className="text-center py-6 md:col-span-2">
                    <FaInfoCircle className="text-gray-400 text-5xl mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No chapters found for this book</p>
                  </div>
                ) : (
                  chapters.map((chapter, index) => (
                    <Link
                      key={index}
                      href={`/e-books/read-i-book/${bookId}/${chapter.id}`}
                      className="flex shrink-0 items-center gap-2 px-4 py-2 rounded-full shadow-sm border border-gray-200 bg-gradient-to-r from-purple-100 to-pink-100 hover:from-purple-200 hover:to-pink-200 transition duration-300 ease-in-out text-sm font-medium text-gray-800 hover:shadow-lg hover:scale-[1.01]"
                    >
                      <span className="">{chapter.chapterNumber}</span>
                      {chapter.title}
                    </Link>
                  ))
                )}

              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}