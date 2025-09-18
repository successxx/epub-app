import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "ePub.AI - Professional Lead Magnet Generation",
  description: "Generate professional 100-250 page lead magnet ebooks in 5 minutes from just your website URL",
  keywords: "lead generation, ebook creator, content marketing, AI writing, business growth",
  openGraph: {
    title: "ePub.AI - Professional Lead Magnet Generation",
    description: "Generate professional 100-250 page lead magnet ebooks in 5 minutes",
    type: "website",
    url: "https://epub.ai",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 antialiased`}>
        {children}
      </body>
    </html>
  );
}
