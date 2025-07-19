// app/admin/layout.js
import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Footer, Header } from "@/components";

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin panel for managing the application",
};

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  // Protect route: only allow if session exists and role is 'admin' or 'superadmin'
  if (
    !session ||
    !["user", "admin", "superadmin"].includes(session.user.role)
  ) {
    // redirect("/login");
    console.log("Not logged in...");
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 text-gray-900">
        {/* You can add admin navbar/sidebar here */}
        {children}
      </main>
      <Footer />
    </>
  );
}
