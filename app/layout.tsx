import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: "T-Shirt Store - Premium Quality T-Shirts",
  description: "Discover our collection of 60+ premium t-shirts for men, women, and kids",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
