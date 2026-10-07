import Image from "next/image";
import Link from "next/link";
import { projects, type Project } from "@/content/projects";

const skills = ["UX & product design", "UI & visual design", "Design systems", "Prototyping"];

// Varying card shapes give the grid a gentle, Cosmos-like rhythm while reading order stays row by row.
const SHAPES = ["aspect-[4/5]", "aspect-square", "aspect-[5/4]", "aspect-square", "aspect-[4/5]", "aspect-[5/4]"];

function year(p: Project) {
  const m = p.meta.timeline?.match(/(20\d\d)(?!.*20\d\d)/);
  return m ? m[1] : undefined;
}

function WorkCard({ p, i }: { p: Project; i: number }) {
  const meta = [p.meta.role, p.meta.company, year(p)].filter(Boolean).join(" · ");
  return (
    <li data-reveal className="group relative flex flex-col gap-4">
      <div
        className={`relative ${SHAPES[i % SHAPES.length]} overflow-hidden rounded-[24px] transition-[transform,box-shadow] duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1 group-hover:shadow-[0_24px_48px_-24px_rgba(17,17,17,0.45)] group-has-[a:focus-visible]:-translate-y-1 group-has-[a:focus-visible]:shadow-[0_24px_48px_-24px_rgba(17,17,17,0.45)]`}
        style={{ backgroundColor: p.tint }}
      >
        <Image
          src={p.cover.src}
          alt=""
          fill
          sizes="(min-width: 1536px) 30vw, (min-width: 768px) 45vw, 92vw"
          preload={i < 2}
          className={`${
            p.coverFit === "contain" ? "object-contain p-6" : "object-cover"
          } transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-[1.045] group-has-[a:focus-visible]:scale-[1.045] motion-reduce:transform-none`}
        />
        <span className="label-mono absolute left-4 top-4 rounded-full bg-white/90 px-2.5 py-1 text-[#111] backdrop-blur">
          {p.tag === "Concept" ? p.meta.type : "Case study"}
        </span>
      </div>
      <div className="flex flex-col gap-1.5 px-1">
        <p className="label-mono text-muted">{meta}</p>
        <h3 className="font-display text-[clamp(1.35rem,1.1rem+0.6vw,1.75rem)] font-medium leading-[1.15] tracking-[-0.01em]">
          {/* The whole card is one link: its ::after covers the card, its accessible name is the project. */}
          <Link
            href={`/work/${p.slug}`}
            className="outline-none after:absolute after:inset-0 after:rounded-[24px] after:content-[''] focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-[var(--color-accent)]"
          >
            {p.name}
            <span aria-hidden className="ml-2 inline-block transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-1">
              →
            </span>
          </Link>
        </h3>
        <p className="max-w-[46ch] text-[15px] leading-[1.55] text-muted">{p.tagline}</p>
      </div>
    </li>
  );
}

export function WorkGrid() {
  return (
    <section id="work" aria-labelledby="work-heading" className="w-full scroll-mt-24 px-page">
      <div className="mx-auto flex w-full max-w-[1760px] flex-col gap-10">
        <div className="flex flex-wrap items-end justify-between gap-4 border-t border-[#111]/15 pt-5">
          <h2 id="work-heading" className="font-display text-[clamp(1.75rem,1.3rem+1.4vw,2.75rem)] font-medium tracking-[-0.02em]">
            Selected work <span className="label-mono align-middle text-muted">({projects.length})</span>
          </h2>
          <ul className="flex flex-wrap gap-2" aria-label="What I do">
            {skills.map((s) => (
              <li key={s} className="label-mono rounded-full border border-[#111]/15 px-3 py-1.5 text-ink-soft">
                {s}
              </li>
            ))}
          </ul>
        </div>

        <ul data-reveal-group className="grid grid-cols-1 items-start gap-x-6 gap-y-14 md:grid-cols-2 2xl:grid-cols-3">
          {projects.map((p, i) => (
            <WorkCard key={p.slug} p={p} i={i} />
          ))}
          <li data-reveal className="relative">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex aspect-[5/4] flex-col justify-between rounded-[24px] bg-[#111] p-8 text-white transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1"
            >
              <span className="label-mono text-white/70">Short on time?</span>
              <span className="font-editorial text-[clamp(2rem,1.4rem+2vw,3.25rem)] font-light italic leading-[1.05]">
                Read the one-page version
                <span aria-hidden className="ml-2 inline-block not-italic transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </span>
              <span className="label-mono text-white/70">Resume · PDF</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
