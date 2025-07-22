import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "aos/dist/aos.css";
import { Toaster } from "react-hot-toast";

// ✅ Font setup
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Metadata
export const metadata = {
  title: "PLMDKC",
  description: "Library App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Font Awesome CDN */}
        {/* <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        /> */}

        {/* ✅ Google Translate Init Script */}
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              function googleTranslateElementInit() {
                new google.translate.TranslateElement(
                  { pageLanguage: 'en', includedLanguages: 'en,hi,mr' },
                  'google_translate_element'
                );
              }
            `,
          }}
        /> */}

        {/* ✅ Google Translate JS API */}
        <script src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ✅ Toast Notification */}
        <Toaster position="top-right" reverseOrder={false} />

        {/* ✅ Google Translate Dropdown */}
        {/* <div id="google_translate_element" className="fixed top-28 right-4 z-50"></div> */}

        {/* ✅ Page Content */}
        {children}
      </body>
    </html>
  );
}
