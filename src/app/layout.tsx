import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

// Headings
const bricolage = Bricolage_Grotesque({
  variable: "--font-display-face",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

// Body text: Gilroy, self-hosted from the files used in portfolio-v2.
// TODO(gilroy): confirm the Gilroy licence covers web use.
const bodyFont = localFont({
  variable: "--font-body",
  display: "swap",
  src: [
    { path: "../fonts/gilroy/Gilroy-Regular.woff", weight: "400", style: "normal" },
    { path: "../fonts/gilroy/Gilroy-RegularItalic.woff", weight: "400", style: "italic" },
    { path: "../fonts/gilroy/Gilroy-Medium.woff", weight: "500", style: "normal" },
    { path: "../fonts/gilroy/Gilroy-SemiBold.woff", weight: "600", style: "normal" },
    { path: "../fonts/gilroy/Gilroy-Bold.woff", weight: "700", style: "normal" },
  ],
  fallback: ["Arial", "Helvetica", "sans-serif"],
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
      className={`${bricolage.variable} ${bodyFont.variable} h-full antialiased`}
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
