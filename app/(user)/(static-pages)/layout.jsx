// app/admin/layout.js
import React from "react";

export default async function AdminLayout({ children }) {
  return <div className="max-w-5xl mx-auto px-4">{children}</div>;
}
