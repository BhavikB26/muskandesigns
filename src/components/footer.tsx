import Link from "next/link";
import { caseStudies } from "@/content/case-studies";

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/thisismuskan/",
    icon: "/home/icon-linkedin.svg",
    from: "rgba(255,173,173,0.45)",
    to: "rgba(202,187,233,0.35)",
    iconFrom: "rgba(202,187,233,0.4)",
    iconTo: "rgba(255,173,173,0.4)",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/_muskanb07_/",
    icon: "/home/icon-instagram.svg",
    from: "rgba(179,222,193,0.45)",
    to: "rgba(202,187,233,0.45)",
    iconFrom: "rgba(202,187,233,0.4)",
    iconTo: "rgba(179,222,193,0.4)",
  },
];

export function Footer() {
  return (
    <footer
      id="connect"
      className="flex w-full flex-col items-center px-6 pb-6 pt-16 md:px-[72px] md:pt-[100px]"
    >
      <div className="flex w-full max-w-[1376.8px] flex-col items-center gap-6">
        <div className="flex w-full flex-col items-center gap-16 rounded-[40px] border-[0.8px] border-border bg-white p-8 shadow-[0.24px_0.6px_0.65px_-1.25px_rgba(199,199,199,0.36),0.92px_2.29px_2.47px_-2.5px_rgba(199,199,199,0.32),4px_10px_10.77px_-3.75px_rgba(199,199,199,0.13)] md:p-[72px]">
          <div className="flex w-full flex-col items-start gap-3">
            <h2 className="text-[32px] font-medium leading-[1.15] tracking-[-0.4px] text-ink-soft md:text-[40px] md:leading-[46px]">
              Let&rsquo;s connect
            </h2>
            <p className="text-base tracking-[0.2px] text-[rgba(48,46,44,0.85)]">
              Open to new projects, collaborations, and conversations.
            </p>
          </div>
          <div className="flex w-full flex-col gap-10 md:flex-row">
            <div className="flex flex-1 flex-col gap-8 sm:flex-row">
              <div className="flex flex-1 flex-col items-start gap-6">
                <p className="text-lg font-semibold tracking-[0.18px] text-ink">
                  Navigation
                </p>
                <div className="flex flex-col items-start gap-3 text-base tracking-[0.2px] text-ink">
                  <Link href="/" className="underline">
                    Home
                  </Link>
                  <Link href="/#about">About</Link>
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                    Resume
                  </a>
                </div>
              </div>
              <div className="flex flex-1 flex-col items-start gap-6">
                <p className="text-lg font-semibold tracking-[0.18px] text-ink">
                  Case studies
                </p>
                <div className="flex flex-col items-start gap-3 text-base tracking-[0.2px] text-ink">
                  {caseStudies.map((study) => (
                    <Link key={study.slug} href={`/work/${study.slug}`}>
                      {study.shortName}
                    </Link>
                  ))}
                  <a
                    href="https://www.figma.com/proto/KEABZM1GitiLCq9YTXJdu6/Portfolio-projects?node-id=12-27&t=AEx2XrQmEeZD8e6M-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=12%3A27&show-proto-sidebar=1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View more...
                  </a>
                </div>
              </div>
            </div>
            <div className="flex flex-1 flex-col items-start gap-4">
              <p className="text-lg font-semibold tracking-[0.18px] text-ink">
                Elsewhere
              </p>
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center gap-2.5 rounded-3xl py-4 pl-[19px] pr-6"
                  style={{
                    backgroundImage: `linear-gradient(151deg, ${social.from} 8%, ${social.to} 92%)`,
                  }}
                >
                  <div
                    className="flex size-[52px] shrink-0 items-center justify-center rounded-xl"
                    style={{
                      backgroundImage: `linear-gradient(152deg, ${social.iconFrom} 8%, ${social.iconTo} 92%)`,
                    }}
                  >
                    <img src={social.icon} alt="" className="size-6 object-contain" />
                  </div>
                  <div className="flex flex-1 items-center justify-between">
                    <p className="text-base font-semibold tracking-[0.3px] text-ink-soft">
                      {social.label}
                    </p>
                    <img src="/home/icon-arrow-out.svg" alt="" className="size-5 object-contain" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-between gap-2 text-[13px] italic tracking-[0.13px] text-[#494343] md:flex-row">
          <p>© 2026 – Muskan Designs</p>
          <p>Crafting impactful design solutions with empathy and strategy.</p>
        </div>
      </div>
    </footer>
  );
}
