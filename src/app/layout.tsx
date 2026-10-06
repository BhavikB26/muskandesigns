import type { Metadata } from "next";
import { Albert_Sans, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
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
      className={`${albertSans.variable} ${bricolage.variable} h-full antialiased`}
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
