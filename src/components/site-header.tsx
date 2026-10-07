import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

const LINKEDIN = "https://www.linkedin.com/in/thisismuskan/";

/** The LinkedIn "in" letters on their own, without the square. */
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false" className="size-4" fill="currentColor">
      <circle cx="4.2" cy="4.4" r="2.6" />
      <rect x="1.9" y="8.6" width="4.6" height="13.4" rx="0.4" />
      <path d="M9.4 8.6h4.4v1.9c.7-1.2 2.2-2.3 4.4-2.3 4.3 0 5.1 2.8 5.1 6.4V22h-4.6v-6.6c0-1.6 0-3.6-2.2-3.6-2.2 0-2.5 1.7-2.5 3.5V22H9.4z" />
    </svg>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full px-page bg-background/80 backdrop-blur-md transition-colors duration-500 supports-[backdrop-filter]:bg-background/65">
      <div className="mx-auto flex w-full max-w-[1760px] items-center justify-between gap-3 py-[30px] md:py-[38px]">
        <Link
          href="/"
          aria-label="Muskan Bhatia, home"
          className="-my-1.5 inline-flex size-11 items-center justify-start"
        >
          <span
            aria-hidden
            className="flex size-8 items-center justify-center rounded-[2px] bg-ink pb-[2px] font-display text-[19px] font-semibold leading-none text-background transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-rotate-6 hover:scale-105"
          >
            m
          </span>
        </Link>
        <div className="flex items-center gap-3 sm:gap-5">
          <ThemeToggle />
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Muskan Bhatia on LinkedIn"
            className="-my-1.5 -mr-2.5 inline-flex size-11 items-center justify-center rounded-lg text-ink transition-opacity duration-200 hover:opacity-70"
          >
            <LinkedInIcon />
          </a>
        </div>
      </div>
    </header>
  );
}
