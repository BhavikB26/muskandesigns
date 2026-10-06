import Image from "next/image";
import Link from "next/link";
import { CaseStudiesDropdown } from "@/components/case-studies-dropdown";
import { AboutDropdown } from "@/components/about-dropdown";
import { MobileMenu } from "@/components/mobile-menu";

export function Nav({ variant = "solid" }: { variant?: "solid" | "overlay" }) {
  const overlay = variant === "overlay";

  return (
    <header
      className={
        overlay
          ? "relative z-30 flex w-full justify-center px-6 pt-5 md:px-[42px] md:pt-4"
          : "sticky top-0 z-50 flex w-full justify-center bg-white px-6 py-4 shadow-[0px_0.3px_0.3px_-1.25px_rgba(0,0,0,0.18),0px_1.1px_1.1px_-2.5px_rgba(0,0,0,0.16),0px_5px_5px_-3.75px_rgba(0,0,0,0.06)] md:px-[72px]"
      }
    >
      <div
        className={`flex w-full items-center justify-between ${
          overlay ? "max-w-[1376.8px]" : "max-w-[1600px]"
        }`}
      >
        <Link href="/" className="relative block size-10 shrink-0">
          <Image
            src="/home/nav-logo-navy.png"
            alt="Muskan Designs"
            width={256}
            height={256}
            className="size-10 object-contain"
            priority
          />
        </Link>
        <nav
          className={`hidden items-center gap-6 text-base text-ink-soft md:flex md:gap-10 ${
            overlay ? "font-medium" : ""
          }`}
        >
          <CaseStudiesDropdown />
          <AboutDropdown />
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ink"
          >
            Resume
          </a>
        </nav>
        <MobileMenu />
      </div>
    </header>
  );
}
