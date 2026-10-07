import Link from "next/link";

const LINKEDIN = "https://www.linkedin.com/in/thisismuskan/";

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden focusable="false" className="size-7" fill="currentColor">
      <path d="M20.45 2H3.55A1.55 1.55 0 0 0 2 3.55v16.9C2 21.31 2.69 22 3.55 22h16.9c.86 0 1.55-.69 1.55-1.55V3.55C22 2.69 21.31 2 20.45 2ZM8.06 19.04H5.03V9.25h3.03v9.79ZM6.55 7.92a1.76 1.76 0 1 1 0-3.52 1.76 1.76 0 0 1 0 3.52Zm12.49 11.12h-3.03v-4.76c0-1.13-.02-2.59-1.58-2.59-1.58 0-1.82 1.24-1.82 2.51v4.84H9.58V9.25h2.9v1.34h.04c.4-.76 1.39-1.56 2.86-1.56 3.06 0 3.63 2.01 3.63 4.63v5.38Z" />
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
          className="inline-flex min-h-11 items-center whitespace-nowrap font-display text-[16px] font-medium tracking-[-0.2px] sm:text-[18px] md:text-[20px]"
        >
          Muskan Bhatia
        </Link>
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
          <OpenToWork className="hidden lg:inline-flex" />
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Muskan Bhatia on LinkedIn"
            className="-mr-2 inline-flex size-11 items-center justify-center rounded-lg text-ink transition-[color,transform] duration-200 hover:-translate-y-0.5 hover:text-accent"
          >
            <LinkedInIcon />
          </a>
        </div>
      </div>
    </header>
  );
}
