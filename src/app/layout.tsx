import type { Metadata } from "next";
import { Inter, Playfair_Display, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Grace Choi — Find Your Next Home | Real Estate Made Simple",
  description:
    "Browse thousands of homes, condos, land, and commercial properties for sale or rent across New York and New Jersey. Connect with trusted local agents and find your next place with Grace Choi.",
  keywords: [
    "real estate",
    "homes for sale",
    "condos",
    "land for sale",
    "commercial real estate",
    "find an agent",
    "Grace Choi",
    "NY real estate",
    "NJ real estate",
  ],
  authors: [{ name: "Grace Choi" }],
  openGraph: {
    title: "Grace Choi — Find Your Next Home",
    description: "Real estate made simple. Browse homes, condos, land, and commercial properties across NY and NJ.",
    siteName: "Grace Choi Real Estate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grace Choi — Find Your Next Home",
    description: "Real estate made simple. NY & NJ.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <SonnerToaster richColors position="top-right" />
        <Toaster />
      </body>
    </html>
  );
}
