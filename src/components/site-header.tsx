import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { MotionToggle } from "@/components/motion";

const LINKEDIN = "https://www.linkedin.com/in/thisismuskan/";
export const EMAIL = "muskann.designs@gmail.com";

const links = [
  { label: "Case studies", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Journey", href: "/#journey" },
];

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

/** Same dark square for the "m" logo and LinkedIn. */
const square =
  "flex size-8 items-center justify-center rounded-[2px] bg-ink text-background transition-transform duration-500 ease-[var(--ease-out-expo)]";

/** Top bar (after idoshitty.art): logo, one floating pill with the sections and the call to action, then settings. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full px-page pt-fr-sm">
      <div className="mx-auto flex h-14 w-full max-w-[1760px] items-center justify-between gap-fr-sm">
        <Link href="/" aria-label="Muskan Bhatia, home" className="inline-flex size-11 items-center justify-start">
          <span aria-hidden className={`${square} pb-[2px] font-display text-[19px] font-semibold leading-none hover:-rotate-6 hover:scale-105`}>
            m
          </span>
        </Link>

        <nav aria-label="Main" className="flex items-center gap-1 rounded-full bg-surface-1/85 p-1 ring-1 ring-line backdrop-blur-md supports-[backdrop-filter]:bg-surface-1/70">
          <ul className="hidden items-center sm:flex">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="t-body-sm inline-flex min-h-9 items-center rounded-full px-fr-md text-ink-soft transition-colors hover:bg-surface-2 hover:text-ink">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <a href={`mailto:${EMAIL}`} className="t-body-sm inline-flex min-h-9 items-center rounded-full bg-ink px-fr-md font-medium text-background transition-opacity hover:opacity-85">
            Let&rsquo;s work together
          </a>
        </nav>

        <div className="flex items-center gap-fr-xs">
          <div className="hidden items-center gap-fr-xs md:flex">
            <MotionToggle />
            <ThemeToggle />
          </div>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" aria-label="Muskan Bhatia on LinkedIn (opens in a new tab)" className="inline-flex size-11 items-center justify-end">
            <span aria-hidden className={`${square} hover:rotate-6 hover:scale-105`}>
              <LinkedInIcon />
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
