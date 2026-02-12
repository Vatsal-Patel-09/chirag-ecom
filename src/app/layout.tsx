import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/components/providers/session-provider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: {
    default: "TeeStore — Premium T-Shirts for Every Style",
    template: "%s | TeeStore",
  },
  description:
    "Shop premium quality t-shirts at TeeStore. Browse men's, women's, unisex, kids, sports and premium collections with free shipping on orders over $50.",
  keywords: [
    "t-shirts",
    "tees",
    "men t-shirts",
    "women t-shirts",
    "streetwear",
    "premium t-shirts",
    "online t-shirt store",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          {children}
          <Toaster position="top-right" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
