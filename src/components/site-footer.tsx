import type { ReactNode } from "react";
import { Eyes } from "@/components/eyes";
import { EMAIL } from "@/components/site-header";

const LINKEDIN = "https://www.linkedin.com/in/thisismuskan/";

/**
 * Page + footer (after ngan-nguyen.com): the page is a rounded sheet that scrolls up and off a dark footer
 * pinned underneath it. Wrap every page's content in this.
 */
export function WithFooter({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="relative z-10 rounded-b-[28px] bg-background pb-fr-section shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)] md:rounded-b-[44px]">{children}</div>
      <SiteFooter />
    </>
  );
}

const pill =
  "inline-flex min-h-12 items-center gap-fr-sm rounded-full bg-[#b4a8ff] px-fr-lg text-[clamp(1.05rem,0.95rem+0.4vw,1.35rem)] text-[#151412] transition-transform duration-300 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export function SiteFooter() {
  return (
    <footer id="contact" className="sticky bottom-0 z-0 -mt-[44px] w-full bg-[#151412] px-page pb-fr-lg pt-[calc(44px+72px)] text-[#f3efe7] [html[data-theme=dark]_&]:bg-[#1a1630]">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-fr-section">
        <div className="flex items-start justify-between gap-fr-xl">
          <div className="flex flex-col gap-fr-xl">
            <h2 className="font-display text-[clamp(3.2rem,2rem+6vw,7.5rem)] font-medium leading-[0.95] tracking-[-0.035em]">
              Sooooo,
              <br />
              what&rsquo;s next?
            </h2>
            <ul className="flex flex-col items-start gap-fr-sm">
              <li>
                <a href={`mailto:${EMAIL}`} className={pill}>
                  You can email me <span aria-hidden>✉️</span>
                </a>
              </li>
              <li>
                <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className={pill}>
                  Find me on LinkedIn <span aria-hidden>↗</span>
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </li>
              <li>
                <a href="#main" className={pill}>
                  or go again from the top <span aria-hidden>↺</span>
                </a>
              </li>
            </ul>
          </div>
          <Eyes />
        </div>
        <div className="flex flex-wrap items-center justify-between gap-fr-md text-[#cfc8bb]">
          <p className="t-body font-medium text-[#f3efe7]">Muskan Bhatia</p>
          <p className="t-caption">Designed and built by Muskan · © {new Date().getFullYear()}</p>
          <a href={LINKEDIN} target="_blank" rel="noopener noreferrer" className="t-body-sm underline-offset-4 hover:underline">
            LinkedIn<span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
