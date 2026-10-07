import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/projects";

const skills = ["UX & product design", "UI & visual design", "Design systems", "Prototyping"];

export function WorkGrid() {
  return (
    <section id="work" aria-labelledby="work-heading" className="w-full scroll-mt-20 px-page ">
      <div className="mx-auto grid w-full max-w-[1760px] grid-cols-1 gap-10 lg:grid-cols-[220px_1fr] lg:gap-12">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <h2 id="work-heading" className="sr-only">
            Selected work
          </h2>
          <p className="font-display text-[30px] leading-[1.1] tracking-[-0.6px]">I do</p>
          <ul className="mt-3 flex flex-wrap gap-2 lg:flex-col lg:items-start">
            {skills.map((s) => (
              <li key={s} className="rounded-full border border-line bg-card px-3.5 py-1.5 text-[14px] text-ink-soft">
                {s}
              </li>
            ))}
          </ul>
          <p className="mt-3 font-display text-[30px] leading-[1.1] tracking-[-0.6px]">
            and the product
            <br className="hidden lg:block" /> thinking in between.
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map((p, i) => (
            <li key={p.slug} className="rise-on-scroll">
              <Link href={`/work/${p.slug}`} className="group flex flex-col gap-4 rounded-[20px]">
                <div
                  className="relative aspect-square overflow-hidden rounded-[20px]"
                  style={{ backgroundColor: p.tint }}
                >
                  <Image
                    src={p.cover.src}
                    alt={p.cover.alt}
                    fill
                    sizes="(min-width: 1280px) 340px, (min-width: 640px) 45vw, 92vw"
                    preload={i < 3}
                    className={`${p.coverFit === "contain" ? "object-contain p-4" : "object-cover"} transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-[1.04]`}
                  />
                  <span className="absolute right-3 top-3 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.8px] text-ink backdrop-blur">
                    {p.tag}
                  </span>
                </div>
                <div className="flex flex-col gap-1 px-1">
                  <h3 className="font-display text-[22px] leading-[1.15] tracking-[-0.4px] underline-offset-4 group-hover:underline">
                    {p.name}
                  </h3>
                  <p className="text-[15px] leading-[1.5] text-muted">{p.tagline}</p>
                  <p className="text-[13px] text-muted">
                    {p.meta.company} · {p.meta.type}
                  </p>
                </div>
              </Link>
            </li>
          ))}
          <li className="rise-on-scroll">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex aspect-square flex-col justify-between rounded-[20px] border border-line bg-card p-7 transition-shadow duration-300 hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.25)]"
            >
              <span className="text-[13px] font-semibold uppercase tracking-[0.8px] text-muted">Short on time?</span>
              <span className="font-display text-[34px] leading-[1.05] tracking-[-0.8px]">
                Read the one-page version
                <span aria-hidden className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                  ↗
                </span>
              </span>
              <span className="text-[15px] text-muted">Resume, PDF</span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
