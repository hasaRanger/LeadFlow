import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LeadFlow – Smart CRM for Lead & Pipeline Tracking",
  description: "LeadFlow is a full-stack CRM (Customer Relationship Management) application built with Next.js, Node.js, and PostgreSQL. It enables users to manage leads, track sales pipelines, update lead statuses, add notes, and analyze performance through a dashboard with filtering and search capabilities.",
  icons: {
    // add multiple icon entries and a cache-busting query param so browsers pick up updates
    icon: "/favicon.png?v=2",
    shortcut: "/favicon.ico?v=2",
    apple: "/apple-touch-icon.png?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
