import { MaskedText } from "@/components/masked-text";
const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/thisismuskan/", tint: "#fbe7e5" },
  { label: "Resume (PDF)", href: "/resume.pdf", tint: "#ebe8f8" },
  { label: "Instagram", href: "https://www.instagram.com/_muskanb07_/", tint: "#e6f2ea" },
  // TODO(embee): add an email address once you confirm you want it on the site.
];

export function SiteFooter() {
  return (
    <footer id="contact" className="w-full scroll-mt-20 px-page pb-8 pt-28 md:pt-40">
      <div className="mx-auto flex w-full max-w-[1760px] flex-col gap-6">
        <div data-reveal className="flex flex-col gap-10 rounded-[8px] bg-card p-7 ring-1 ring-line sm:p-10 md:gap-14 md:p-16">
          <div className="flex flex-col gap-4">
            <p className="label-mono text-muted">(04) Contact</p>
            <h2 className="font-display text-[clamp(3rem,1.6rem+5vw,7rem)] font-medium leading-[0.95] tracking-[0.01em]">
              <MaskedText text="Let’s" onReveal />{" "}
              <em className="font-serif font-normal italic tracking-[-0.01em] text-accent">
                <MaskedText text="talk." start={1} onReveal />
              </em>
            </h2>
            <p className="max-w-[460px] text-[17px] leading-[1.55] text-ink-soft">
              I&rsquo;m looking for Product Designer and UX Designer roles. The fastest way to reach me is LinkedIn.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {links.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tinted group flex min-h-16 items-center justify-between rounded-[8px] px-6 py-5 text-[17px] font-medium text-ink ring-1 ring-line transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 focus-visible:-translate-y-0.5"
                  style={{ "--tint": c.tint } as React.CSSProperties}
                >
                  {c.label}
                  <span aria-hidden className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="label-mono px-2 text-muted">© {new Date().getFullYear()} Muskan Bhatia</p>
      </div>
    </footer>
  );
}
