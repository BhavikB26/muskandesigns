import Link from "next/link";

const links = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Resume", href: "/resume.pdf", external: true },
  { label: "Contact", href: "/#contact" },
];

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
          <nav aria-label="Main">
            <ul className="flex items-center gap-3 text-[13px] text-ink-soft sm:gap-6 sm:text-[15px] md:gap-8">
              {links.map((l) => (
                <li key={l.label}>
                  {l.external ? (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center underline-offset-4 transition-colors hover:text-ink hover:underline"
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} className="inline-flex min-h-11 items-center underline-offset-4 transition-colors hover:text-ink hover:underline">
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
