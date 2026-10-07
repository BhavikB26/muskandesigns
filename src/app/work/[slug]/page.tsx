import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { getNextProject, getProject, projects, type Block, type Img, type Project } from "@/content/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.name}: ${p.meta.type} — Muskan Bhatia`,
    description: p.tagline,
    openGraph: { title: p.name, description: p.tagline, images: [{ url: p.cover.src }] },
  };
}

function MetaStrip({ p }: { p: Project }) {
  const items = [
    ["Company", p.meta.company],
    ["My role", p.meta.role],
    ["Timeline", p.meta.timeline],
    ["Type", p.meta.type],
  ].filter((i): i is [string, string] => Boolean(i[1]));
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-5 border-y border-line py-6 md:grid-cols-4">
      {items.map(([k, v]) => (
        <div key={k} className="flex flex-col gap-1">
          <dt className="text-[12px] font-semibold uppercase tracking-[0.8px] text-muted">{k}</dt>
          <dd className="text-[16px] leading-[1.4]">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function Figure({ image, tint, priority = false }: { image: Img; tint: string; priority?: boolean }) {
  const tall = image.height > image.width * 1.15;
  return (
    <figure className="flex flex-col gap-3">
      <div className="flex items-center justify-center overflow-hidden rounded-[20px]" style={{ backgroundColor: tint }}>
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          preload={priority}
          sizes="(min-width: 1320px) 1240px, 100vw"
          className={tall ? "h-auto max-h-[720px] w-auto max-w-full py-8" : "h-auto w-full"}
        />
      </div>
      {image.caption && <figcaption className="px-1 text-[14px] text-muted">{image.caption}</figcaption>}
    </figure>
  );
}

function BlockView({ block, tint }: { block: Block; tint: string }) {
  if (block.kind === "images") {
    const [first, ...rest] = block.images;
    const single = block.images.length === 1;
    const odd = block.images.length % 2 === 1;
    return (
      <div className="rise-on-scroll flex flex-col gap-4">
        {single || odd ? <Figure image={first} tint={tint} /> : null}
        {!single && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {(odd ? rest : block.images).map((img) => (
              <Figure key={img.src} image={img} tint={tint} />
            ))}
          </div>
        )}
      </div>
    );
  }
  if (block.kind === "quote") {
    return (
      <figure className="rise-on-scroll mx-auto flex max-w-[860px] flex-col gap-4 py-6 text-center">
        <blockquote className="font-display text-[26px] leading-[1.3] md:text-[32px]">
          &ldquo;{block.text}&rdquo;
        </blockquote>
        <figcaption className="text-[15px] text-muted">{block.by}</figcaption>
      </figure>
    );
  }
  return (
    <div className="rise-on-scroll grid grid-cols-1 gap-4 md:grid-cols-[1fr_2fr] md:gap-10">
      <h2 className="font-display text-[24px] leading-[1.15] md:text-[28px]">{block.heading}</h2>
      <div className="flex max-w-[760px] flex-col gap-5 text-[18px] leading-[1.65] text-ink-soft">
        {block.body.map((t, i) => (
          <p key={i}>{t}</p>
        ))}
        {block.list && (
          <ul className="flex flex-col gap-3">
            {block.list.map((t, i) => (
              <li key={i} className="relative pl-6 before:absolute before:left-0 before:top-[0.7em] before:h-[2px] before:w-3 before:bg-accent">
                {t}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();
  const next = getNextProject(slug);

  return (
    <>
      <SiteHeader />
      <main id="main" className="w-full px-page ">
        <article className="mx-auto flex w-full max-w-[1240px] flex-col gap-16 pb-10 pt-10 md:gap-24 md:pt-16">
          <header className="rise flex flex-col gap-8">
            <Link href="/#work" className="self-start text-[15px] text-muted underline-offset-4 hover:text-ink hover:underline">
              ← All work
            </Link>
            <div className="flex flex-col gap-5">
              <span className="self-start rounded-full bg-accent-soft px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.8px] text-accent">
                {p.tag === "Concept" ? p.meta.type : "Case study"}
              </span>
              <h1 className="font-display text-[48px] font-normal leading-[1] md:text-[88px]">
                {p.name}
              </h1>
              <p className="max-w-[820px] text-[22px] leading-[1.35] text-muted md:text-[28px]">{p.tagline}</p>
            </div>
            <MetaStrip p={p} />
            {p.links && (
              <div className="flex flex-wrap gap-3">
                {p.links.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-ink px-5 py-2.5 text-[15px] text-white transition-opacity hover:opacity-85"
                  >
                    {l.label} ↗
                  </a>
                ))}
              </div>
            )}
          </header>

          <Figure image={p.cover} tint={p.tint} priority />

          <p className="rise-on-scroll max-w-[920px] font-display text-[26px] leading-[1.35] md:text-[34px]">
            {p.intro}
          </p>

          {p.blocks.map((b, i) => (
            <BlockView key={i} block={b} tint={p.tint} />
          ))}

          <Link
            href={`/work/${next.slug}`}
            className="group mt-6 grid grid-cols-1 items-center gap-6 rounded-[24px] bg-card p-5 md:grid-cols-[280px_1fr] md:p-6"
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-[16px]" style={{ backgroundColor: next.tint }}>
              <Image
                src={next.cover.src}
                alt=""
                fill
                sizes="280px"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-[13px] font-semibold uppercase tracking-[0.8px] text-muted">Next project</span>
              <span className="font-display text-[32px] leading-[1.1] group-hover:underline group-hover:underline-offset-4">
                {next.name} →
              </span>
              <span className="text-[16px] text-muted">{next.tagline}</span>
            </div>
          </Link>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
