import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from "react-hot-toast";
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
  title: {
    default: "Ragment- AI Research Assistant",
    template: "%s | Ragment_",
  },
  description:
    "Ragment is an AI-powered research assistant that helps you analyze, organize, and extract insights from documents and web content.",
  keywords: [
    "AI research assistant",
    "LLM research",
    "document analysis",
    "RAG",
    "AI notes",
    "knowledge management",
  ],
  authors: [{ name: "Ragment_" }],
  creator: "Ragment_",
  metadataBase: new URL("https://ragment.in"), 
  alternates: {
    canonical: "/",
  },
    robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "Ragment_ – AI Research Assistant",
    description:
      "Your AI research assistant for smarter document understanding and faster insights.",
    url: "https://ragment.in",
    siteName: "Ragment_",
    images: [
      {
        url: "/og-image.png", // add this file in /public
        width: 1200,
        height: 630,
        alt: "Ragment AI Research Assistant",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ragment_ – AI Research Assistant",
    description:
      "Analyze documents and web content faster using AI-powered research tools.",
    images: ["/og-image.png"],
    creator: "@ragment", // optional
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/public/logo.svg",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider afterSignOutUrl={'/sign-in'}>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
    </ClerkProvider>
  );
}
