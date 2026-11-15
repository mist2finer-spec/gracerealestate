import type { Metadata } from "next";
import { Inter, Playfair_Display, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { ContentHydrator } from "@/components/site/content-hydrator";
import { getPublishedContent } from "@/lib/content-server";

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
  title: "Grace Choi Real Estate — Bergen County, NJ | 버겐 카운티 부동산",
  description:
    "Bilingual (Korean / English) real estate guidance for buyers and sellers in Bergen County, New Jersey: seller and buyer guides, NJ closing cost calculators, and town & school information.",
  keywords: [
    "Grace Choi",
    "Bergen County real estate",
    "NJ realtor",
    "Korean realtor NJ",
    "버겐 카운티 부동산",
    "뉴저지 한인 부동산",
    "NJ closing costs",
    "Bergen County schools",
  ],
  authors: [{ name: "Grace Choi" }],
  openGraph: {
    title: "Grace Choi Real Estate — Bergen County, NJ",
    description: "Bilingual seller & buyer guidance, closing cost calculators, and town & school info for Bergen County.",
    siteName: "Grace Choi Real Estate",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Grace Choi Real Estate — Bergen County, NJ",
    description: "Bilingual real estate guidance for Bergen County, NJ.",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Published site content (cached; refreshed when the admin publishes).
  const content = await getPublishedContent();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ContentHydrator initial={content}>{children}</ContentHydrator>
        <SonnerToaster richColors position="top-right" />
        <Toaster />
      </body>
    </html>
  );
}
