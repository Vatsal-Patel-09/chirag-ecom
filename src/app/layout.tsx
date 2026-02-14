import type { Metadata } from "next";
import { Permanent_Marker, Caveat } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/providers/session-provider";
import { Toaster } from "sonner";

const permanentMarker = Permanent_Marker({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marker",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
});

export const metadata: Metadata = {
  title: {
    default: "MYOTEES — Hand-Picked Tees for Every Vibe",
    template: "%s | MYOTEES",
  },
  description:
    "Shop unique, hand-picked t-shirts at MYOTEES. Browse men's, women's, unisex, kids, sports and premium collections with free delivery across India.",
  keywords: [
    "t-shirts",
    "tees",
    "MYOTEES",
    "men t-shirts",
    "women t-shirts",
    "streetwear",
    "premium t-shirts",
    "online t-shirt store",
    "buy tees online India",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${permanentMarker.variable} ${caveat.variable}`}>
      <body className="antialiased">
        <AuthProvider>
          {children}
          <Toaster position="top-right" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
