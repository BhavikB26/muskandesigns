import Link from "next/link";

const LINKEDIN = "https://www.linkedin.com/in/thisismuskan/";

/** The LinkedIn "in" letters on their own, without the square. */
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false" className="h-[23px] w-[23px]" fill="currentColor">
      <circle cx="4.2" cy="4.4" r="2.6" />
      <rect x="1.9" y="8.6" width="4.6" height="13.4" rx="0.4" />
      <path d="M9.4 8.6h4.4v1.9c.7-1.2 2.2-2.3 4.4-2.3 4.3 0 5.1 2.8 5.1 6.4V22h-4.6v-6.6c0-1.6 0-3.6-2.2-3.6-2.2 0-2.5 1.7-2.5 3.5V22H9.4z" />
    </svg>
  );
}

export function OpenToWork({ className = "" }: { className?: string }) {
  return (
    <p
      className={`items-center gap-2 rounded-full border border-line bg-card px-3 py-1.5 text-[13px] text-ink-soft ${className}`}
    >
      <span className="relative flex size-2" aria-hidden>
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-live opacity-50 motion-reduce:hidden" />
        <span className="relative inline-flex size-2 rounded-full bg-live" />
      </span>
      Open to Product / UX roles
    </p>
  );
}

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-transparent px-5 md:px-10 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex w-full max-w-[1320px] items-center justify-between gap-3 py-4 md:py-6">
        <Link
          href="/"
          aria-label="Muskan Bhatia, home"
          className="inline-flex size-11 items-center justify-start"
        >
          <span
            aria-hidden
            className="flex size-8 items-center justify-center rounded-full bg-[#111] pb-[2px] font-display text-[17px] font-semibold leading-none text-white transition-transform duration-200 hover:scale-105 md:size-9 md:text-[19px]"
          >
            m
          </span>
        </Link>
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
          <OpenToWork className="hidden lg:inline-flex" />
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Muskan Bhatia on LinkedIn"
            className="-mr-2.5 inline-flex size-11 items-center justify-center rounded-lg text-[#111] transition-opacity duration-200 hover:opacity-70"
          >
            <LinkedInIcon />
          </a>
        </div>
      </div>
    </header>
  );
}
