import "./globals.css";
import "aos/dist/aos.css";
import Providers from "./providers"; // ⬅️ Import your centralized provider
import { lora } from "@/utils/fonts";

export const metadata = {
  title: "लालबागचा राजा AI अंकीय ग्रंथालय",
  description: "Welcome to लालबागचा राजा AI अंकीय ग्रंथालय",
  icons: {
    icon: "/favicon.ico", // 32×32 or 48×48
    shortcut: "/favicon.ico", // optional, for legacy browsers
    apple: "/apple-touch-icon.png", // for iOS home screen
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>{/* Optional: add your scripts here */}</head>
      <body className={`${lora.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
