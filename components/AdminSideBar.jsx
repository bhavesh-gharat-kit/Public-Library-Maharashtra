"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaBook,
  FaCog,
  FaBars,
  FaCross,
  FaTimes,
} from "react-icons/fa";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const pathname = usePathname();

  const navItems = [
    { label: "Settings", href: "/admin", icon: <FaCog /> },
    { label: "Users", href: "/admin/users", icon: <FaUsers /> },
  ];

  return (
    <>
      {/* Toggle button for small screens */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden  mx-4 m-2 z-[52] p-2 bg-gray-100 border rounded-md shadow"
      >
        <FaBars className="text-xl" />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 shadow-sm transition-transform duration-300 z-[52] sm:z-40 sm:pt-16 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Admin Panel</h2>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden z-[52] p-2 bg-gray-100 rounded-md shadow"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>
        <nav className="p-4">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-100 rounded-lg transition ${
                pathname == item.href && "bg-gray-100"
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              <span className="text-base">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay for small screens */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
}
