import Image from "next/image";
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
    <header className="sticky top-0 z-40 w-full border-b border-transparent bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 w-full max-w-[1320px] items-center justify-between gap-4 px-5 md:h-[72px] md:px-10">
        <Link href="/" aria-label="Muskan Bhatia, home" className="flex items-center gap-3">
          <Image src="/home/nav-logo-navy.png" alt="" width={36} height={36} className="size-8 object-contain" />
          <span className="hidden font-display text-[17px] font-medium tracking-[-0.2px] sm:inline">
            Muskan Bhatia
          </span>
        </Link>
        <div className="flex items-center gap-5">
          <OpenToWork className="hidden lg:inline-flex" />
          <nav aria-label="Main">
            <ul className="flex items-center gap-4 text-[15px] text-ink-soft sm:gap-6">
              {links.map((l) => (
                <li key={l.label}>
                  {l.external ? (
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-4 transition-colors hover:text-ink hover:underline"
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link href={l.href} className="underline-offset-4 transition-colors hover:text-ink hover:underline">
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
