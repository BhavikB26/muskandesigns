import type { ReactNode } from "react";
import HalftoneWordmarkFooter from "@/components/ui/halftone-wordmark-footer";
import { FooterFit } from "@/components/footer-fit";

const LINKEDIN = "https://www.linkedin.com/in/thisismuskan/";

/**
 * Page + footer (after ngan-nguyen.com): the page is a rounded sheet that scrolls up and off a dark footer
 * pinned underneath it. Wrap every page's content in this. The header goes outside the sheet so it stays
 * pinned to the window while the sheet slides off the footer (inside it, it would ride up with the sheet).
 */
export function WithFooter({ children, header }: { children: ReactNode; header?: ReactNode }) {
  return (
    <>
      {header}
      <div className="relative z-10 rounded-b-[28px] bg-background pb-fr-section shadow-[0_30px_60px_-30px_rgba(0,0,0,0.35)] md:rounded-b-[44px]">{children}</div>
      <SiteFooter />
    </>
  );
}

// The tilt-and-whiten hover lives in globals.css (.footer-pill).
const pill =
  "footer-pill inline-flex min-h-12 items-center gap-fr-sm rounded-full bg-[#b4a8ff] px-fr-lg text-[length:var(--fs-h4)] text-[#151412] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

export function SiteFooter() {
  return (
    <footer id="contact" className="sticky bottom-0 z-0 -mt-[44px] w-full bg-[#151412] px-page pb-fr-lg pt-[calc(44px+72px)] text-[#f3efe7] [html[data-theme=dark]_&]:bg-[#1a1630]">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-fr-section">
        <div className="flex items-start justify-between gap-fr-xl">
          <div className="flex flex-col gap-fr-xl">
            <h2 className="t-display-xxl">
              Sooooo,
              <br />
              what&rsquo;s next?
            </h2>
            <ul className="flex flex-col items-start gap-fr-sm">
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
        </div>
      </div>
      {/* 21st.dev Halftone Wordmark Footer: her name set enormous in halftone dots, cropped by the bottom
          edge (its studio line, columns, back-to-top and grain are off). Full bleed; the background is
          see-through so it sits on the footer's own colour in both themes, and pushed dots warm to the CTAs'
          lilac. A div, since it is inside this footer. */}
      {/* Edge to edge, but kept short: more of the word hangs below the bottom edge (crop), so the footer
          still fits under the top nav. */}
      <div aria-hidden className="-mx-[max(24px,4vw)] -mb-fr-lg mt-fr-xl md:mt-fr-xxl">
        <HalftoneWordmarkFooter
          as="div"
          chrome={false}
          wordmark="muskan"
          palette={{ background: "transparent", warm: "#b4a8ff" }}
          grain={0}
          fontFamily="var(--font-body)"
          // The word's size follows the width; a third of its height hangs below the edge, and the box is just
          // tall enough for the rest (no empty band above it).
          crop={0.34}
          height="max(48px, 12.8vw)"
        />
      </div>
      <FooterFit />
    </footer>
  );
}
