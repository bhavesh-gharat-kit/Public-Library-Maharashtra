// app/admin/layout.js
import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SuperAdminSidebar, Footer, Header } from "@/components";

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin panel for managing the application",
};

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  // Protect route: only allow if session exists and role is 'admin' or 'superadmin'
  if (!session || !["admin", "superadmin"].includes(session.user.role)) {
    redirect("/admin");
    console.log("Not logged in..."); //todo remove
  }

  return (
    <>
      <Header />
      <main className="relative">
        <SuperAdminSidebar />

        <div className="min-h-screen sm:ml-64  flex-1 bg-gray-50 text-gray-900">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
