import React from "react";
import { FaPenNib } from "react-icons/fa";
import { Tooltip } from "@/components";
import Link from "next/link";
import { base64UrlEncode } from "@/lib/helperFunctions";

const BookCard = ({ book, randomColor }) => {

  return (
    <div
      className="bg-white shadow-md hover:shadow-xl rounded-md  hover:scale-[1.01] transition-all duration-300 overflow-hidden flex flex-col"
      style={{
        boxShadow: `0 4px 10px ${randomColor}`, // apply random color here
      }}
    >
      {/* Thumbnail or Dynamic Title Cover */}
      <div
        className={`relative h-52 m-4  flex items-center justify-center text-white text-center ${randomColor}`}
      >
        {
          book.thumbnailLink ?
            <img
              src={book.thumbnailLink}
              alt={book.title}
              className="w-full h-full object-fill" />
            :
            <h2 className="text-xl font-semibold leading-snug px-4">
              {book.title.length > 50 ? book.title.slice(0, 50) + "…" : book.title}
            </h2>

        }

        {/* eBook badge */}
        <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded shadow-md">
          {book.bookType}
        </span>
      </div>

      {/* Book Info */}
      <div className="p-4 pt-0 space-y-1 text-sm text-gray-700">
        <h3 className="text-sm font-semibold text-gray-900">
          {book.title?.length > 50 ? (
            <Tooltip content={book.title}>
              {book.title.slice(0, 50) +
                "…" +
                (book.medium ? ` (${book.medium})` : "")}
            </Tooltip>
          ) : (
            book.title + " " + (book.medium ? ` (${book.medium})` : "")
          )}
        </h3>

        {book.author ? (
          <div className="flex items-center gap-2 text-gray-600">
            <span>
              <FaPenNib />
            </span>
            {book.author?.length > 25 ? (
              <Tooltip content={book.author}>
                <span className="text-xs">
                  {book.author.slice(0, 25) + "…"}
                </span>
              </Tooltip>
            ) : (
              <span className="text-xs">{book?.author || "N/A"}</span>
            )}
          </div>
        ) : (
          ""
        )}
      </div>

      {/* View Button */}
      <div className="px-4 pb-4 mt-auto">
        <Link
          href={
            book.id
              ? book.chapters?.length
                ? `/e-books/read-i-book/${book.id}`
                : `/e-books/read-book/${book.id}`
              : "#"
          }
          className={`block w-full px-8  text-center text-sm font-semibold text-white ${randomColor}  rounded-lg py-2 transition-all`}
        >
          Read →
        </Link>
      </div>
    </div>
  );
};

export default BookCard;
