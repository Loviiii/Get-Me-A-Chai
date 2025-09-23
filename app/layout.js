import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "GET ME A CHAI",
  description: "A simple app for getting the funds for startups with a chai..",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased text-white`} >
        <SessionWrapper>
        <Navbar />
          <div className="min-h-screen flex flex-col">
          <main className="flex-1 bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)]">{children}</main>
        </div>
        <Footer />
        </SessionWrapper>
      </body>
    </html>
  );
}