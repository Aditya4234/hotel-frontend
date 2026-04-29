import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "HotelHub - Hotel Management Dashboard",
    template: "%s | HotelHub",
  },
  description: "Modern hotel management admin dashboard for efficient hotel operations",
  keywords: ["hotel", "management", "dashboard", "booking", "hospitality"],
  authors: [{ name: "HotelHub" }],
  robots: {
    index: false,
    follow: false,
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-slate-50">{children}</body>
    </html>
  );
}