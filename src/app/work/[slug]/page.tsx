import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PrevNext } from "@/components/work/prev-next";
import { KeepReading } from "@/components/work/sections";
import { caseStudies, getCaseStudy } from "@/content/case-studies";
import { deckSlides, type DeckSlide } from "@/content/deck-slides";

// Case studies presented as their original Figma slides. ProPilot has its own
// hand-built page at /work/ai-mentor, which takes precedence over this route.
export const dynamicParams = false;

export function generateStaticParams() {
  return Object.keys(deckSlides).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return {
    title: `${study.shortName} — Muskan Designs`,
    description: study.summary,
  };
}

const LINK_LABELS: [RegExp, string][] = [
  [/figma\.com\/proto/, "Open the interactive prototype"],
  [/./, "Source"],
];

function linkLabel(href: string) {
  return LINK_LABELS.find(([re]) => re.test(href))![1];
}

// Internal working files (not meant for public sharing) are not linked.
const HIDDEN_LINKS = /figma\.com\/design\//;

function SlideText({ slide }: { slide: DeckSlide }) {
  const links = (slide.links ?? []).filter((l) => !HIDDEN_LINKS.test(l));
  if (!slide.text && links.length === 0) return null;
  return (
    <div className="flex flex-col gap-3 px-1">
      {links.length > 0 && (
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((href) => (
            <a
              key={href}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-base tracking-[0.2px] text-ink-soft underline underline-offset-4 hover:text-ink"
            >
              {linkLabel(href)} ↗
            </a>
          ))}
        </div>
      )}
      {slide.text && (
        <details className="group text-base tracking-[0.2px] text-muted">
          <summary className="cursor-pointer select-none text-sm text-ink-soft/80 hover:text-ink">
            Read the text on this slide
          </summary>
          <div className="mt-3 flex max-w-[800px] flex-col gap-3">
            {slide.text.map((t, i) => (
              <p key={i}>{t}</p>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}

export default async function DeckCaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  const slides = deckSlides[slug];
  if (!study || !slides) notFound();

  const seamless = slides.every((s) => s.seamless);
  const total = slides.length;
  const related = caseStudies
    .filter((s) => s.slug !== slug)
    .slice(0, 2)
    .map(({ slug, logo, logoWidth, logoHeight, title, summary, gradientFrom, gradientTo }) => ({
      slug, logo, logoWidth, logoHeight, title, summary, gradientFrom, gradientTo,
    }));

  return (
    <>
      <Nav />
      <main className="flex w-full flex-col items-center overflow-x-hidden">
        <PrevNext slug={slug} />

        <section className="flex w-full justify-center px-6 pb-10 pt-12 md:px-[72px] md:pb-16 md:pt-16">
          <div className="flex w-full max-w-[1376.8px] flex-col items-start gap-5">
            {study.label && (
              <p className="text-sm font-semibold uppercase tracking-[0.8px] text-ink-soft/70">
                {study.label}
              </p>
            )}
            <h1 className="max-w-[1000px] text-[36px] font-medium leading-[1.1] tracking-[-0.4px] text-ink md:text-[56px] md:leading-[64px]">
              {study.title}
            </h1>
            <p className="max-w-[800px] text-lg tracking-[0.2px] text-muted">
              {study.summary}
            </p>
          </div>
        </section>

        <section className="flex w-full justify-center px-4 pb-16 md:px-[72px] md:pb-[100px]">
          <div
            className={`flex w-full max-w-[1376.8px] flex-col ${
              seamless ? "gap-0 overflow-hidden rounded-[20px] shadow-[0px_20px_30px_-8px_rgba(0,0,0,0.15)]" : "gap-8 md:gap-12"
            }`}
          >
            {slides.map((slide, i) => (
              <figure key={slide.src} className={seamless ? "contents" : "flex flex-col gap-4"}>
                <Image
                  src={slide.src}
                  alt={`${study.shortName}, slide ${i + 1} of ${total}`}
                  width={slide.width}
                  height={slide.height}
                  sizes="(min-width: 1520px) 1377px, (min-width: 768px) calc(100vw - 144px), calc(100vw - 32px)"
                  preload={i === 0}
                  className={`h-auto w-full ${
                    seamless ? "block" : "rounded-[16px] shadow-[0px_12px_24px_-10px_rgba(0,0,0,0.2)]"
                  }`}
                />
                {!seamless && <SlideText slide={slide} />}
              </figure>
            ))}
          </div>
        </section>

        {seamless && slides.some((s) => s.text || s.links) && (
          <section className="flex w-full justify-center px-6 pb-16 md:px-[72px]">
            <div className="flex w-full max-w-[1376.8px] flex-col">
              {slides.map((slide) => (
                <SlideText key={slide.src} slide={slide} />
              ))}
            </div>
          </section>
        )}

        <KeepReading cases={related} />
      </main>
      <Footer />
    </>
  );
}
