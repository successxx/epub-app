import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SkipNav from "../components/SkipNav";
import ReadingProgress from "../components/ui/ReadingProgress";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://epub.ai"),
  title: {
    default: "ePubAI — AI‑Crafted Ghostwritten Books for Founders and Teams",
    template: "%s — ePubAI",
  },
  description:
    "AI‑generated lead magnet books, in your voice. A premium automated process delivering a publish‑ready book in 5 minutes. Starting at $499.",
  keywords: [
    "AI ghostwriting",
    "website to book",
    "founder book",
    "authority marketing",
    "B2B content book",
    "ePubAI automated",
  ],
  openGraph: {
    type: "website",
    url: "https://epub.ai",
    title: "ePubAI — AI‑Crafted Ghostwritten Books",
    description:
      "Transform your website into a publish‑ready book in 5 minutes. Automated AI generation, professional quality, instant delivery.",
    images: [
      {
        url: "/api/og?title=ePubAI%20%E2%80%94%20AI%E2%80%91Crafted%20Ghostwritten%20Books",
        width: 1200,
        height: 630,
        alt: "ePubAI — AI‑Crafted Ghostwritten Books",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ePubAI — AI‑Crafted Ghostwritten Books",
    description:
      "AI‑generated lead magnet books, in your voice. Premium automated process delivering a publish‑ready book in 5 minutes. Starting at $499.",
    images: [
      "/api/og?title=ePubAI%20%E2%80%94%20AI%E2%80%91Crafted%20Ghostwritten%20Books",
    ],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/favicon.png",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReadingProgress />
        <SkipNav />
        <Header />
        <main id="content" role="main" className="min-h-[60vh] focus:outline-none">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
