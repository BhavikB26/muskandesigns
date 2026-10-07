const contacts = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/thisismuskan/" },
  { label: "Resume (PDF)", href: "/resume.pdf" },
  { label: "Instagram", href: "https://www.instagram.com/_muskanb07_/" },
  // TODO(embee): add an email address here if you want one on the site.
];

export function SiteFooter() {
  return (
    <footer id="contact" className="w-full scroll-mt-20 px-page pb-10 pt-24  md:pt-32">
      <div className="mx-auto flex w-full max-w-[1760px] flex-col gap-14">
        <p className="label-mono border-t border-line pt-4 text-muted">(04) Contact</p>
        <div data-reveal className="-mt-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2 className="font-editorial text-[clamp(3rem,1.6rem+5.4vw,7rem)] font-normal italic leading-[0.95] tracking-[-0.02em]">
            Let&rsquo;s talk.
          </h2>
          <p className="max-w-[420px] text-[17px] leading-[1.55] text-muted">
            I&rsquo;m looking for Product Designer and UX Designer roles. The fastest way to reach me is LinkedIn.
          </p>
        </div>
        <ul data-reveal-group className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {contacts.map((c) => (
            <li key={c.label} data-reveal>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex min-h-16 items-center justify-between rounded-[6px] border border-line bg-card px-6 py-5 text-[17px] font-medium transition-[transform,box-shadow,border-color] duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-line-strong hover:text-accent focus-visible:border-line-strong focus-visible:text-accent"
              >
                {c.label}
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="label-mono text-muted">© {new Date().getFullYear()} Muskan Bhatia</p>
      </div>
    </footer>
  );
}
