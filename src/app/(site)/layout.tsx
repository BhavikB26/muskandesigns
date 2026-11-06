import type { Metadata } from "next";
import { Gaegu, Google_Sans, Instrument_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Motion } from "@/components/motion";
import { BackToTop } from "@/components/back-to-top";

// Headings and italic accents: Instrument Serif (licensed). It has one weight; headings are thickened in
// globals.css (a hairline outline in the text colour) for the bolder look.
const editorial = Instrument_Serif({
  variable: "--font-editorial-face",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

// Internshala's type specimen is set in the typeface she chose for it (loaded only when used).
const instrumentSans = Instrument_Sans({ variable: "--font-instrument-sans", subsets: ["latin"], display: "swap", preload: false });

// Handwritten notes on case study screens (OYO's annotated phones), in the hand her deck used: Gaegu has
// 300/400/700; 700 is its semibold-ish weight. Loaded only when used.
const hand = Gaegu({ variable: "--font-hand", weight: ["400", "700"], subsets: ["latin"], display: "swap", preload: false });

// Everything else (body, labels, UI): Google Sans (licensed), variable 400–700.
const bodyFont = Google_Sans({ variable: "--font-body", subsets: ["latin"], display: "swap" });

const title = "Muskan Bhatia, Product Designer";
const description =
  "Muskan Bhatia is an early-career product designer with a computer science background. She has designed real products at Preplaced and Builder.ai, from an AI mentor extension to a design system.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://muskandesigns.vercel.app"
  ),
  title: { default: title, template: "%s | Muskan Bhatia" },
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
      className={`${editorial.variable} ${instrumentSans.variable} ${hand.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-ink" suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "document.documentElement.classList.add('js');setTimeout(function(){if(!window.__motion)document.documentElement.classList.remove('js')},4000);try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.dataset.theme='dark'}catch(e){}" +
              // Ngetic Modern headings: mark the page once the (local-only) font loads, for its spacing tweaks.
              "try{document.fonts.load('italic 1em \"Ngetic Modern\"').then(function(f){if(f.length)document.documentElement.classList.add('has-ngetic')})}catch(e){}",
          }}
        />
        <Motion />
        <BackToTop />
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
