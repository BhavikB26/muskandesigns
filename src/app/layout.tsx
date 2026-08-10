import type { Metadata } from "next";
import { Urbanist, Red_Hat_Display } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

const redHatDisplay = Red_Hat_Display({
  variable: "--font-red-hat-display",
  weight: "900",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "muskan. — product designer",
  description: "muskan's portfolio — product designer based in Delhi.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${urbanist.variable} ${redHatDisplay.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white" suppressHydrationWarning>{children}</body>
    </html>
  );
}
