import Navbar from "@/components/Navbar";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata = {
  title: "Wealthyfied Watch | Premium Men's Timepieces & Jewelry",
  description: "Discover our exclusive collection of luxury wristwatches and premium men's jewelry. Elevate your status with Wealthyfied.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} antialiased bg-[#0a0a0a] text-[#fafafa]`}>
        <Navbar />
        <main className="min-h-screen pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}
