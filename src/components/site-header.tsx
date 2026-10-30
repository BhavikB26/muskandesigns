import Link from "next/link";
import { FileText } from "lucide-react";
import { LightPullThemeSwitcher } from "@/components/ui/light-pull-theme-switcher";
import { SiteNav } from "@/components/site-nav";
import { HeaderTone } from "@/components/header-tone";

export const EMAIL = "muskann.designs@gmail.com";

const links = [
  { label: "Home", href: "/" },
  { label: "Case studies", href: "/#work", section: "work" },
  { label: "About", href: "/#about", section: "about" },
  { label: "Contact", href: "#contact", section: "contact" },
];

/**
 * Site navigation: a translucent glass bar that stays at the top while the page scrolls under it (Apple's
 * floating material, after the glass navbars on 21st.dev / Aceternity). Her name in Instrument Serif, the
 * links on the liquid navbar, the résumé (an icon button) and the light/dark pull cord.
 */
export function SiteHeader({ current = "Home" }: { current?: string }) {
  return (
    <header id="site-header" className="glass-bar sticky top-0 z-40 w-full px-page transition-[background-color,box-shadow,color] duration-500">
      <HeaderTone headerId="site-header" />
      <div className="mx-auto flex h-[68px] max-w-[1280px] items-center justify-between gap-6">
        <Link href="/" className="whitespace-nowrap font-serif text-[26px] tracking-tight text-ink sm:text-3xl">
          Muskan Bhatia
        </Link>
        <div className="hidden lg:block">
          <SiteNav links={links} current={current} />
        </div>
        <div className="flex items-center gap-2 self-stretch">
          <div className="group relative flex items-center">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="My resume (PDF, opens in a new tab)"
              className="glass-btn flex size-10 shrink-0 items-center justify-center rounded-full text-ink transition-transform duration-150 active:scale-[0.94] pointer-coarse:size-11"
            >
              <FileText className="size-[17px]" strokeWidth={2} aria-hidden />
            </a>
            {/* a bubble on hover and keyboard focus (the link's aria-label says the same to screen readers) */}
            <span aria-hidden className="resume-bubble">
              My resume
            </span>
          </div>
          <LightPullThemeSwitcher />
        </div>
      </div>
    </header>
  );
}
