"use client"
import React from 'react'
import { FaChevronLeft } from 'react-icons/fa'
import { useRouter } from "next/navigation";

const BackButton = ({ className = "" }) => {
    const router = useRouter();
    const handleBackClick = () => {
        router.back();
    };
    return (
        <div className={`${className}`}>
            <button
                onClick={handleBackClick}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg shadow-sm flex items-center gap-2 transition-colors"
            >
                <FaChevronLeft /> Back
            </button>
        </div>
    )
}

export default BackButton