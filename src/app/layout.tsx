import type { Metadata } from "next";
import { Albert_Sans, Playwrite_US_Modern } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Muskan Designs — Product Designer",
  description:
    "Muskan is a Delhi-based product designer and growth strategist helping mission-driven teams turn ideas into digital experiences that drive growth.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${albertSans.variable} ${playwriteUsModern.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
