import Image from "next/image";
import type { ReactNode } from "react";
import { PillButton } from "@/components/ui/pill-button";

export function SectionShell({
  children,
  className = "",
  bg,
}: {
  children: ReactNode;
  className?: string;
  bg?: string;
}) {
  return (
    <section
      className={`flex w-full flex-col items-center px-6 py-12 md:px-[72px] md:py-[100px] ${className}`}
      style={bg ? { background: bg } : undefined}
    >
      <div className="flex w-full max-w-[1376.8px] flex-col gap-6">
        {children}
      </div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="font-script text-base tracking-[0.4px] text-muted">
      {children}
    </p>
  );
}

export function SectionHeading({
  children,
  center,
}: {
  children: ReactNode;
  center?: boolean;
}) {
  return (
    <h2
      className={`max-w-[700px] text-[28px] leading-[1.15] tracking-[-0.4px] text-ink md:text-[40px] md:leading-[46px] ${
        center ? "mx-auto text-center" : ""
      }`}
    >
      {children}
    </h2>
  );
}

export function BodyText({ children }: { children: ReactNode }) {
  return (
    <div className="flex max-w-[700px] flex-col gap-4 text-base tracking-[0.2px] text-muted">
      {children}
    </div>
  );
}

export function ResultLine({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-[700px] text-base font-semibold tracking-[0.2px] text-ink-soft">
      {children}
    </p>
  );
}

export function FullImage({
  src,
  width,
  height,
  alt = "",
  rounded = true,
  fit = "cover",
  bordered = true,
}: {
  src: string;
  width: number;
  height: number;
  alt?: string;
  rounded?: boolean;
  fit?: "cover" | "contain";
  bordered?: boolean;
}) {
  return (
    <div
      className={`relative w-full overflow-hidden ${
        bordered ? "border border-black/[0.16]" : ""
      } ${rounded ? "rounded-2xl" : ""}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={fit === "contain" ? "object-contain" : "object-cover"}
      />
    </div>
  );
}

export function TwoColImageText({
  eyebrow,
  heading,
  body,
  image,
  imageWidth,
  imageHeight,
  reverse,
}: {
  eyebrow?: string;
  heading: string;
  body: ReactNode;
  image: string;
  imageWidth: number;
  imageHeight: number;
  reverse?: boolean;
}) {
  return (
    <div
      className={`flex flex-col items-center gap-10 md:gap-16 ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div className="flex flex-1 flex-col items-start gap-4">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h3 className="text-[28px] leading-[1.15] tracking-[-0.4px] text-ink md:text-[40px] md:leading-[46px]">
          {heading}
        </h3>
        <div className="flex flex-col gap-2 text-base tracking-[0.2px] text-muted">
          {body}
        </div>
      </div>
      <div
        className="relative w-full flex-1 overflow-hidden rounded-2xl border border-black/[0.16]"
        style={{ aspectRatio: `${imageWidth} / ${imageHeight}` }}
      >
        <Image src={image} alt="" fill className="object-cover" />
      </div>
    </div>
  );
}

export function StatCallout({
  title,
  stats,
  from,
  to,
}: {
  title: string;
  stats: { label: string; value: string }[];
  from: string;
  to: string;
}) {
  return (
    <div
      className="flex w-full max-w-[638px] flex-col gap-4 rounded-2xl p-6"
      style={{ backgroundImage: `linear-gradient(to bottom, ${from}, ${to})` }}
    >
      <p className="text-lg font-semibold tracking-[0.18px] text-ink-soft">
        {title}
      </p>
      <ul className="flex list-disc flex-col gap-2 pl-6 text-base tracking-[0.2px] text-ink-soft">
        {stats.map((s) => (
          <li key={s.label}>
            <span className="font-semibold">{s.label}:</span> {s.value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BulletList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex list-disc flex-col gap-2 pl-6 text-base tracking-[0.2px] text-muted">
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

export function PersonaCards({
  cards,
}: {
  cards: { icon: string; iconBg: string; title: string; body: string }[];
}) {
  return (
    <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2">
      {cards.map((c) => (
        <div
          key={c.title}
          className="flex items-center gap-4 rounded-lg border border-black/[0.16] bg-white p-6 shadow-[0px_2px_8px_1px_rgba(0,0,0,0.04)]"
        >
          <div
            className={`flex size-[54px] shrink-0 items-center justify-center rounded-lg ${c.iconBg}`}
          >
            <img src={c.icon} alt="" className="size-8 object-contain" />
          </div>
          <div className="flex flex-col gap-0.5">
            <p className="text-lg font-semibold tracking-[0.18px] text-ink">
              {c.title}
            </p>
            <p className="text-base tracking-[0.2px] text-ink-soft">
              {c.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function TestimonialQuote({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-[883px] rounded-2xl bg-white px-6 py-8">
      <div className="flex flex-col gap-4 text-base font-semibold tracking-[0.2px] text-ink-soft [&_p]:font-normal">
        {children}
      </div>
    </div>
  );
}

export function ABTestPair({
  control,
  variation,
  controlWidth,
  controlHeight,
  variationWidth,
  variationHeight,
}: {
  control: string;
  variation: string;
  controlWidth: number;
  controlHeight: number;
  variationWidth: number;
  variationHeight: number;
}) {
  return (
    <div className="flex w-full flex-col items-center gap-4 md:flex-row md:items-start">
      <div className="flex w-full flex-1 flex-col gap-2">
        <p className="text-[13px] italic tracking-[0.13px] text-muted">
          Control
        </p>
        <div
          className="relative w-full overflow-hidden rounded-2xl border border-black/[0.16] shadow-[0px_2px_3px_0px_rgba(84,79,79,0.1)]"
          style={{ aspectRatio: `${controlWidth} / ${controlHeight}` }}
        >
          <Image src={control} alt="" fill className="object-cover" />
        </div>
      </div>
      <img
        src="/home/icon-arrow-out.svg"
        alt=""
        className="hidden size-6 rotate-45 shrink-0 self-center md:block"
      />
      <div className="flex w-full flex-1 flex-col gap-2">
        <p className="text-[13px] italic tracking-[0.13px] text-muted">
          Variation
        </p>
        <div
          className="relative w-full overflow-hidden rounded-2xl border-[1.6px] border-[#fe7a78]"
          style={{ aspectRatio: `${variationWidth} / ${variationHeight}` }}
        >
          <Image src={variation} alt="" fill className="object-cover" />
        </div>
      </div>
    </div>
  );
}

export function StatRow({
  stats,
}: {
  stats: { value: string; label: string }[];
}) {
  return (
    <div className="flex w-full flex-wrap gap-14">
      {stats.map((s) => (
        <div key={s.label} className="flex flex-col gap-2">
          <p className="text-[32px] leading-[1.15] tracking-[-0.4px] text-ink md:text-[40px] md:leading-[46px]">
            {s.value}
          </p>
          <p className="max-w-[300px] text-base tracking-[0.2px] text-ink-soft">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}

type RelatedCase = {
  slug: string;
  logo: string;
  logoWidth: number;
  logoHeight: number;
  title: string;
  summary: string;
  gradientFrom: string;
  gradientTo: string;
};

export function KeepReading({ cases }: { cases: RelatedCase[] }) {
  return (
    <section className="flex w-full flex-col items-center gap-16 px-6 pb-16 pt-16 md:px-[72px] md:pb-[100px] md:pt-[72px]">
      <div className="flex w-full max-w-[1376.8px] flex-col gap-2">
        <h2 className="text-[32px] leading-[1.15] tracking-[-0.4px] text-ink md:text-[40px] md:leading-[46px]">
          Keep reading
        </h2>
        <p className="text-base tracking-[0.2px] text-muted">
          More examples of design that drives results.
        </p>
      </div>
      <div className="flex w-full max-w-[1376.8px] flex-col gap-8 md:flex-row md:gap-[72px]">
        {cases.map((c) => (
          <div
            key={c.slug}
            className="flex flex-1 flex-col items-start justify-center gap-6 rounded-2xl px-12 py-14"
            style={{
              backgroundImage: `linear-gradient(to bottom, ${c.gradientFrom}, ${c.gradientTo})`,
              boxShadow: "0px 20px 30px -8px rgba(0, 0, 0, 0.15), 0px 8px 12px -6px rgba(0, 0, 0, 0.15)",
            }}
          >
            {c.logo && (
              <Image
                src={c.logo}
                alt=""
                width={c.logoWidth}
                height={c.logoHeight}
                className="h-3.5 w-auto object-contain"
              />
            )}
            <h3 className="text-[28px] font-medium leading-[1.15] tracking-[-0.4px] text-ink">
              {c.title}
            </h3>
            <p className="text-base tracking-[0.2px] text-ink-soft">
              {c.summary}
            </p>
            <PillButton
              href={`/work/${c.slug}`}
              variant="white"
              className="w-full md:w-auto"
            >
              Read case study
            </PillButton>
          </div>
        ))}
      </div>
    </section>
  );
}
