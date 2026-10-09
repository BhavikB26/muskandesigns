import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Block, Img, Project } from "@/content/projects";
import type { Brand } from "@/content/brand";
import { ThemeToggle } from "@/components/theme-toggle";
import { MotionToggle } from "@/components/motion";

/*
 * Editorial case study building blocks.
 * Layout: a narrow left rail (identity, nav, project facts) beside a wide content column
 * of colour panels with short text between them. Phones get a single stacked column.
 */

export const LINKEDIN = "https://www.linkedin.com/in/thisismuskan/";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "About", href: "/#about" },
  { label: "Resume", href: "/resume.pdf", external: true },
  { label: "Contact", href: "#contact" },
];

function NavList({ className = "" }: { className?: string }) {
  return (
    <ul className={className}>
      {navLinks.map((l) => (
        <li key={l.label}>
          <a
            href={l.href}
            {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="case-link inline-flex min-h-8 items-center text-[14px] text-ink-soft hover:text-ink"
          >
            {l.label}
            {l.external && <span className="sr-only"> (PDF, opens in a new tab)</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}

/** Section A: identity + navigation. Desktop: part of the sticky side rail. Phone: one compact row. */
export function Identity() {
  return (
    <div className="flex flex-col gap-4">
      <Link href="/" className="case-link inline-flex min-h-8 items-center gap-2.5 self-start font-display text-[17px] font-semibold tracking-[0.01em] text-ink">
        <span aria-hidden className="flex size-7 items-center justify-center rounded-[2px] bg-ink pb-[2px] text-[16px] leading-none text-background">
          m
        </span>
        Muskan Bhatia
      </Link>
      <nav aria-label="Main">
        <NavList className="flex flex-wrap gap-x-5 md:flex-col md:gap-x-0" />
      </nav>
    </div>
  );
}

export function Toggles() {
  return (
    <div className="flex items-center gap-3">
      <MotionToggle />
      <ThemeToggle />
    </div>
  );
}

/** Project facts, only those that are known. */
export function Facts({ p }: { p: Project }) {
  const items: [string, string | undefined][] = [
    ["Company", p.meta.company],
    ["My role", p.meta.role],
    ["Type", p.meta.type],
    ["Timeline", p.meta.timeline],
  ];
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-1">
      {items
        .filter((i): i is [string, string] => Boolean(i[1]))
        .map(([k, v]) => (
          <div key={k} className="flex flex-col gap-1">
            <dt className="case-meta-label">{k}</dt>
            <dd className="text-[14.5px] leading-[1.45] text-ink">{v}</dd>
          </div>
        ))}
    </dl>
  );
}

/** Section B: category, title, descriptor and a short summary. */
export function CaseIntro({ p }: { p: Project }) {
  const category = p.tag === "Concept" ? p.meta.type : "Case study";
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-x-10">
      <div className="flex flex-col gap-4 lg:col-span-7">
        <p className="case-meta-label">{category}</p>
        <h1 className="case-title">{p.name}</h1>
        <p className="max-w-[34ch] font-serif text-[clamp(1.35rem,1.1rem+0.9vw,1.9rem)] italic leading-[1.25] text-ink-soft">{p.tagline}</p>
      </div>
      <p className="case-body max-w-[52ch] self-end lg:col-span-5">{p.intro}</p>
    </div>
  );
}

/** Section C: a wide brand-colour hero with an oversized title and the project's cover. */
export function CaseHero({ p, brand, art }: { p: Project; brand: Brand; art: ReactNode }) {
  const light = brand.ink === "light";
  return (
    <div className="hero-reveal relative isolate overflow-hidden" style={{ backgroundColor: brand.base }}>
      <div className="grid grid-cols-1 items-center gap-8 p-[6%] md:min-h-[min(72vh,700px)] md:grid-cols-12 md:gap-[4%] md:p-[5%]">
        <p
          aria-hidden
          className={`font-display text-[clamp(3rem,1rem+6.4vw,8.5rem)] font-semibold leading-[0.9] tracking-[-0.01em] md:col-span-7 md:self-end ${light ? "text-white" : "text-[#151412]"}`}
        >
          {p.name}
        </p>
        <div className="relative mx-auto aspect-square w-full max-w-[600px] md:col-span-5">{art}</div>
      </div>
    </div>
  );
}

/* ---------- Section D: colour panels with art-directed compositions ---------- */

const isPhone = (i: Img) => i.height / i.width > 1.6;
const isTall = (i: Img) => i.height / i.width > 1.15;

function Shot({ img, sizes, className = "" }: { img: Img; sizes: string; className?: string }) {
  return (
    <Image src={img.src} alt={img.alt} width={img.width} height={img.height} sizes={sizes} className={`h-auto w-full rounded-[4px] ring-1 ring-line ${className}`} />
  );
}

/**
 * Lays out one group of screens on the page background at a medium size, so screenshots read as
 * artefacts with whitespace around them. True aspect ratios; tall screens stay narrow.
 */
function Composition({ images }: { images: Img[] }) {
  if (images.every(isPhone)) {
    return (
      <div className="flex flex-wrap justify-start gap-x-[4%] gap-y-8">
        {images.map((img, i) => (
          <div key={img.src} className={`w-[42%] max-w-[200px] sm:w-[28%] md:w-[17%] ${i % 2 ? "md:mt-12" : ""}`}>
            <Shot img={img} sizes="(min-width: 768px) 200px, 42vw" />
          </div>
        ))}
      </div>
    );
  }
  if (images.length === 1) {
    const img = images[0];
    return (
      <div className={isTall(img) ? "w-[62%] max-w-[300px]" : "w-full md:w-[62%]"}>
        <Shot img={img} sizes="(min-width: 768px) 40vw, 92vw" />
      </div>
    );
  }
  // Two columns of medium pieces; the second column sits lower for an editorial stagger.
  return (
    <div className="grid grid-cols-1 items-start gap-x-[5%] gap-y-10 sm:grid-cols-2">
      {images.map((img, i) => (
        <div key={img.src} className={`${i % 2 ? "sm:mt-16" : ""} ${isTall(img) ? "w-[70%] max-w-[300px]" : "w-full max-w-[520px]"}`}>
          <Shot img={img} sizes="(min-width: 640px) 34vw, 92vw" />
        </div>
      ))}
    </div>
  );
}

/** One idea per group: screens on the page background with captions underneath. */
export function Panel({ images }: { images: Img[] }) {
  const captions = images.filter((i) => i.caption);
  return (
    <figure data-reveal className="flex flex-col gap-5">
      <Composition images={images} />
      {captions.length > 0 && (
        <figcaption className="case-caption flex max-w-[60ch] flex-col gap-1">
          {captions.map((c) => (
            <span key={c.src}>{c.caption}</span>
          ))}
        </figcaption>
      )}
    </figure>
  );
}

/* ---------- Section E/F: text that sits between panels ---------- */

export function TextBlock({ block }: { block: Extract<Block, { kind: "text" }> }) {
  return (
    <section data-reveal className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-x-10">
      <h2 className="case-h2 md:col-span-4">{block.heading}</h2>
      <div className="flex max-w-[60ch] flex-col gap-4 md:col-span-8">
        {block.body.map((t, i) => (
          <p key={i} className="case-body">
            {t}
          </p>
        ))}
        {block.list && (
          <ul className="flex flex-col gap-3">
            {block.list.map((t, i) => (
              <li key={i} className="case-body grid grid-cols-[1.75rem_1fr]">
                <span aria-hidden className="font-mono text-[12px] leading-[2] text-muted">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export function Quote({ block }: { block: Extract<Block, { kind: "quote" }> }) {
  return (
    <figure data-reveal className="flex max-w-[46ch] flex-col gap-4 md:ml-[33.4%]">
      <blockquote className="font-serif text-[clamp(1.5rem,1.2rem+1vw,2.2rem)] italic leading-[1.25] text-ink">&ldquo;{block.text}&rdquo;</blockquote>
      <figcaption className="case-caption">{block.by}</figcaption>
    </figure>
  );
}

/** Section H: closing notes (outcome, learnings, next steps) in two calm columns. */
export function Outcome({ blocks, concept }: { blocks: Extract<Block, { kind: "text" }>[]; concept: boolean }) {
  if (!blocks.length && !concept) return null;
  return (
    <section data-reveal aria-labelledby="outcome-heading" className="flex flex-col gap-10 border-t border-line pt-10">
      <h2 id="outcome-heading" className="case-meta-label">
        Where it ended up
      </h2>
      {concept && (
        <p className="case-body max-w-[60ch]">
          This is a self-initiated concept, not a shipped product. The designs show how I would approach the problem.
        </p>
      )}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-16">
        {blocks.map((b) => (
          <div key={b.heading} className="flex flex-col gap-3">
            <h3 className="case-h2">{b.heading}</h3>
            {b.body.map((t, i) => (
              <p key={i} className="case-body">
                {t}
              </p>
            ))}
            {b.list && (
              <ul className="flex flex-col gap-2.5">
                {b.list.map((t, i) => (
                  <li key={i} className="case-body grid grid-cols-[1.75rem_1fr]">
                    <span aria-hidden className="font-mono text-[12px] leading-[2] text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/** Section J: next project and the closing links. */
export function CaseFooter({ next, nextArt }: { next: Project; nextArt: ReactNode }) {
  const links = [
    { label: "All work", href: "/#work" },
    { label: "About", href: "/#about" },
    { label: "LinkedIn", href: LINKEDIN, external: true },
    { label: "Resume (PDF)", href: "/resume.pdf", external: true },
  ];
  return (
    <footer id="contact" className="flex scroll-mt-10 flex-col gap-14 border-t border-line pb-10 pt-10">
      <Link href={`/work/${next.slug}`} className="group grid grid-cols-1 items-end gap-6 sm:grid-cols-[minmax(0,220px)_1fr] sm:gap-10">
        <div className="relative aspect-square w-full max-w-[220px] overflow-hidden rounded-[4px]">{nextArt}</div>
        <div className="flex flex-col gap-2">
          <span className="case-meta-label">Next project</span>
          <span className="font-display text-[clamp(2rem,1.3rem+3vw,4.5rem)] font-medium leading-[1] tracking-[0.01em] text-ink">
            {next.name} <span aria-hidden className="case-arrow text-accent">→</span>
          </span>
          <span className="case-body text-muted">{next.tagline}</span>
        </div>
      </Link>
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <p className="case-meta-label">Contact</p>
          <p className="case-body max-w-[46ch]">I&rsquo;m looking for Product Designer and UX Designer roles. The fastest way to reach me is LinkedIn.</p>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-1">
          {links.map((l) => (
            <li key={l.label}>
              <a
                href={l.href}
                {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="case-link inline-flex min-h-10 items-center text-[15px] font-medium text-ink"
              >
                {l.label}
                {l.external && <span className="sr-only"> (opens in a new tab)</span>}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <p className="case-meta-label">© {new Date().getFullYear()} Muskan Bhatia</p>
    </footer>
  );
}
