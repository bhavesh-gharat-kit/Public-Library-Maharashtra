"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import ThemeProvider from "@/flipbook/_providers/theme-provider";

export default function Providers({ children }) {
  return (
    <SessionProvider>
      <Toaster position="top-right" reverseOrder={false} />
      {/* <ThemeProvider attribute="class"> */}
        {children}
      {/* </ThemeProvider> */}
    </SessionProvider>
  );
}
