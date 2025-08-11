import "./globals.css";
import "aos/dist/aos.css";
import Providers from "./providers";
import { lora, tiroMarathi } from "@/utils/fonts";

export const metadata = {
  title: "लालबागचा राजा AI अंकीय ग्रंथालय",
  description: "Welcome to लालबागचा राजा AI अंकीय ग्रंथालय",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>{/* Optional: add your scripts here */}</head>
      <body className={`${tiroMarathi.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
