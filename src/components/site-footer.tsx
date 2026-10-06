const contacts = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/thisismuskan/" },
  { label: "Resume (PDF)", href: "/resume.pdf" },
  { label: "Instagram", href: "https://www.instagram.com/_muskanb07_/" },
  // TODO(embee): add an email address here if you want one on the site.
];

export function SiteFooter() {
  return (
    <footer id="contact" className="w-full scroll-mt-20 px-5 pb-10 pt-24 md:px-10 md:pt-32">
      <div className="mx-auto flex w-full max-w-[1320px] flex-col gap-14">
        <div className="flex flex-col gap-6 border-t border-line pt-10 md:flex-row md:items-end md:justify-between">
          <h2 className="font-display text-[44px] font-medium leading-[1] tracking-[-1.5px] md:text-[80px] md:tracking-[-3px]">
            Let&rsquo;s talk.
          </h2>
          <p className="max-w-[420px] text-[17px] leading-[1.55] text-muted">
            I&rsquo;m looking for Product Designer and UX Designer roles. The fastest way to reach me is LinkedIn.
          </p>
        </div>
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {contacts.map((c) => (
            <li key={c.label}>
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between rounded-2xl border border-line bg-card px-6 py-5 text-[17px] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-12px_rgba(0,0,0,0.25)]"
              >
                {c.label}
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="text-[13px] text-muted">© {new Date().getFullYear()} Muskan Bhatia</p>
      </div>
    </footer>
  );
}
