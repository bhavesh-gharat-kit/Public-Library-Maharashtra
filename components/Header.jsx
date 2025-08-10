"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaBookOpen,
  FaQuestionCircle,
  FaUserShield,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import toast from "react-hot-toast";
import { CustomConfirm } from "@/components";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();
  const pathname = usePathname();

  const navLinks = [
    {
      href: "/home",
      label: "Digital Library",
      icon: <FaBookOpen />,
      color: "text-teal-600",
    },
    {
      href: "/help-center",
      label: "Help Center",
      icon: <FaQuestionCircle />,
      color: "text-green-600",
    },
  ];

  const handleLogout = () => {
    CustomConfirm({
      isOpen: true,
      message: "Are you sure you want to logout?",
      onConfirm: async () => {
        await signOut();
        toast.success("Logged out successfully!");
      },
      onCancel: () => {},
    });
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <img src="/assets/img/nlb.jpg" alt="Logo" className="h-10 w-auto" />
            <span className="font-bold text-gray-900 text-lg">
              Public Library Maharashtra
            </span>
          </Link>

          {/* Mobile toggle button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 p-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((item, index) => (
              <NavItem
                item={item}
                key={index}
                isActive={pathname.startsWith(item.href)}
              />
            ))}

            {status === "authenticated" ? (
              <>
                {session.user.role === "admin" && (
                  <Link href="/admin">
                    <span
                      className={`flex flex-row items-center gap-2 font-semibold text-sm ${
                        pathname.startsWith("/admin") ? "underline" : ""
                      } hover:underline transition text-green-700 whitespace-nowrap`}
                    >
                      <FaUserShield />
                      Admin
                    </span>
                  </Link>
                )}
                <button className="block w-full" onClick={handleLogout}>
                  <span
                    className={`flex flex-row items-center gap-2 font-semibold text-sm hover:underline transition text-red-700 whitespace-nowrap`}
                  >
                    <FaSignOutAlt />
                    Logout
                  </span>
                </button>
              </>
            ) : (
              <Link
                href="/login"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <span
                  className={`flex flex-row items-center gap-2 font-semibold text-sm hover:underline transition text-green-700 whitespace-nowrap`}
                >
                  <FaUserCircle />
                  Login
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 px-4 py-3 shadow-inner rounded-b">
          <div className="flex flex-col items-center space-y-4">
            {navLinks.map((item, index) => (
              <NavItem
                item={item}
                key={index}
                isActive={pathname.startsWith(item.href)}
              />
            ))}

            {status === "authenticated" ? (
              <>
                {session.user.role === "admin" && (
                  <Link href="/admin" className="block w-full">
                    <span
                      className={`flex flex-row mr-auto items-center gap-2 font-semibold text-sm ${
                        isActive ? "underline" : ""
                      } hover:underline transition text-green-700 whitespace-nowrap`}
                    >
                      <FaUserShield />
                      Admin
                    </span>
                  </Link>
                )}
                <button className="block w-full" onClick={handleLogout}>
                  <span
                    className={`flex flex-row items-center gap-2 font-semibold text-sm hover:underline transition text-red-700 whitespace-nowrap`}
                  >
                    <FaSignOutAlt />
                    Logout
                  </span>
                </button>
              </>
            ) : (
              <Link
                href="/login"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <span className="flex flex-row items-center gap-2 font-semibold text-sm hover:underline transition text-green-700 whitespace-nowrap">
                  <FaUserCircle />
                  Login
                </span>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

function NavItem({ item, isActive }) {
  return (
    <Link href={item.href} rel="noopener noreferrer" className="block w-full">
      <span
        className={`flex flex-row items-center gap-2 font-semibold text-sm ${
          isActive ? "underline" : ""
        } hover:underline transition ${item.color} whitespace-nowrap`}
      >
        {item.icon}
        {item.label}
      </span>
    </Link>
  );
}
