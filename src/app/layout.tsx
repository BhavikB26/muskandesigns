import type { Metadata } from "next";
import {
  Albert_Sans,
  Playwrite_US_Modern,
  Fraunces,
  Gochi_Hand,
  Instrument_Serif,
} from "next/font/google";
import "./globals.css";

const albertSans = Albert_Sans({
  variable: "--font-albert-sans",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

const playwriteUsModern = Playwrite_US_Modern({
  variable: "--font-playwrite-us-modern",
  weight: "400",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  weight: ["500", "600"],
  subsets: ["latin"],
});

const gochiHand = Gochi_Hand({
  variable: "--font-gochi-hand",
  weight: "400",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: "italic",
  subsets: ["latin"],
});

const title = "Muskan Designs — Product Designer";
const description =
  "Muskan is a Delhi-based product designer helping mission-driven teams turn ideas into digital experiences that drive growth.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Muskan Designs",
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
      className={`${albertSans.variable} ${playwriteUsModern.variable} ${fraunces.variable} ${gochiHand.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col bg-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
