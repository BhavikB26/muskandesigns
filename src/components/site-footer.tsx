import { MaskedText } from "@/components/masked-text";
const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/thisismuskan/", tint: "#fbe7e5" },
  { label: "Resume (PDF)", href: "/resume.pdf", tint: "#ebe8f8" },
  { label: "Instagram", href: "https://www.instagram.com/_muskanb07_/", tint: "#e6f2ea" },
  // TODO(embee): add an email address once you confirm you want it on the site.
];

export function SiteFooter() {
  return (
    <footer id="contact" className="w-full scroll-mt-20 px-page pb-fr-xl pt-fr-section md:pt-[144px]">
      <div className="mx-auto flex w-full max-w-[1760px] flex-col gap-fr-lg">
        <div data-reveal className="flex flex-col gap-fr-xxl rounded-fr-xl bg-surface-1 p-6 sm:p-fr-xxl md:p-16">
          <div className="flex flex-col gap-fr-md">
            <p className="label-mono text-muted">Contact</p>
            <h2 className="t-display-xxl">
              <MaskedText text="Let’s" onReveal />{" "}
              <em className="font-serif font-normal italic tracking-[-0.03em] text-ink">
                <MaskedText text="talk." start={1} onReveal />
              </em>
            </h2>
            <p className="t-body-lg max-w-[460px] text-ink">
              I&rsquo;m looking for Product Designer and UX Designer roles. The fastest way to reach me is LinkedIn.
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-fr-sm sm:grid-cols-3">
            {links.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tinted t-body-lg group flex min-h-16 items-center justify-between rounded-fr-lg px-fr-lg py-fr-lg font-medium text-ink transition-transform duration-200 ease-[var(--ease-out-expo)] active:scale-[0.98]"
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
        <p className="t-caption px-fr-xs text-muted">© {new Date().getFullYear()} Muskan Bhatia</p>
      </div>
    </footer>
  );
}
