import type { Metadata } from "next";
import {
  Caveat,
  Fraunces,
  Geist_Mono,
  Inter,
  Inter_Tight,
} from "next/font/google";
import "./globals.css";
import { Motion } from "@/components/motion";

// Headings: a tight, highly legible grotesk (the pattern most inspiration sites share).
const interTight = Inter_Tight({ variable: "--font-heading-face", subsets: ["latin"], display: "swap" });
// Labels and metadata
const geistMono = Geist_Mono({ variable: "--font-mono-face", subsets: ["latin"], display: "swap", preload: false });

// Small handwritten accent (the hero greeting only). Never used for headings or body.
const caveat = Caveat({
  variable: "--font-accent-face",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
});

// Hero headline: stand-in for PP Editorial New (Pangram Pangram), which needs
// its official files. TODO(editorial): add PP Editorial New .woff2 files to
// src/fonts and load them here with next/font/local under the same variable.
const editorial = Fraunces({
  variable: "--font-editorial-face",
  style: ["italic"],
  axes: ["opsz"],
  subsets: ["latin"],
  display: "swap",
});

// Body text
const bodyFont = Inter({ variable: "--font-body", subsets: ["latin"], display: "swap" });

const title = "Muskan Bhatia — Product Designer";
const description =
  "Muskan Bhatia is an early-career product designer with a computer science background. She has designed real products at Preplaced and Builder.ai, from an AI mentor extension to a design system.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://muskandesigns.vercel.app"
  ),
  title: { default: title, template: "%s — Muskan Bhatia" },
  description,
  applicationName: "Muskan Bhatia",
  authors: [{ name: "Muskan Bhatia", url: "https://www.linkedin.com/in/thisismuskan/" }],
  keywords: ["Product Designer", "UX Designer", "UI Designer", "Design Systems", "Portfolio", "Muskan Bhatia"],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
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
      suppressHydrationWarning
      className={`${interTight.variable} ${geistMono.variable} ${caveat.variable} ${editorial.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-ink" suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.dataset.theme='dark'}catch(e){}",
          }}
        />
        <Motion />
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-ink px-4 py-2 text-background focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
