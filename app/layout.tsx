import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://om-upadhyay.vercel.app"),
  title: {
    default: "Om Upadhyay | AI & Data Analytics Engineer",
    template: "%s | Om Upadhyay"
  },
  description:
    "Premium AI Engineer portfolio for Om Upadhyay, focused on AI, NLP, machine learning, data analytics, Flask, SQL, and intelligent systems.",
  keywords: [
    "Om Upadhyay",
    "AI Engineer",
    "Data Analytics Engineer",
    "Machine Learning",
    "NLP",
    "Python",
    "Flask",
    "Portfolio"
  ],
  authors: [{ name: "Om Upadhyay" }],
  creator: "Om Upadhyay",
  openGraph: {
    title: "Om Upadhyay | AI & Data Analytics Engineer",
    description:
      "Building intelligent systems using AI, NLP, Machine Learning and Data Analytics.",
    url: "https://om-upadhyay.vercel.app",
    siteName: "Om Upadhyay Portfolio",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Om Upadhyay | AI & Data Analytics Engineer",
    description:
      "Building intelligent systems using AI, NLP, Machine Learning and Data Analytics."
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="noise" />
        {children}
      </body>
    </html>
  );
}
