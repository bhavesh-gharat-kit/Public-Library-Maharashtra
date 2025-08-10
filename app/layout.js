import "./globals.css";
import "aos/dist/aos.css";
import Providers from "./providers"; // ⬅️ Import your centralized provider
import { lora } from "@/utils/fonts";


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
