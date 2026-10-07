import type { Metadata } from "next";
import {
  Caveat,
  Noto_Sans_Devanagari,
  Noto_Sans_JP,
  Noto_Sans_SC,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";

// Headings (and the hero headline): a readable handwritten face
const caveat = Caveat({
  variable: "--font-serif-face",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

// Fallbacks for the rolling greeting's Hindi, Chinese and Japanese words.
const notoDevanagari = Noto_Sans_Devanagari({ variable: "--font-deva", weight: "400", subsets: ["devanagari"], preload: false, display: "swap" });
const notoSC = Noto_Sans_SC({ variable: "--font-sc", weight: "400", preload: false, display: "swap" });
const notoJP = Noto_Sans_JP({ variable: "--font-jp", weight: "400", preload: false, display: "swap" });

// Body text
const bodyFont = Plus_Jakarta_Sans({
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const title = "Muskan Bhatia — Product Designer";
const description =
  "Muskan Bhatia is an early-career product designer with a computer science background. She has designed real products at Preplaced and Builder.ai, from an AI mentor extension to a design system.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://muskandesigns.vercel.app"
  ),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Muskan Bhatia",
    url: "/",
    images: [
      { url: "/og/banner.jpg", width: 1200, height: 630, type: "image/jpeg" },
      { url: "/og/square.jpg", width: 1200, height: 1200, type: "image/jpeg" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og/banner.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${caveat.variable} ${bodyFont.variable} ${notoDevanagari.variable} ${notoSC.variable} ${notoJP.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-ink" suppressHydrationWarning>
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-ink px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
