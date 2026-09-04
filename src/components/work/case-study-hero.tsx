import Image from "next/image";
import type { ReactNode } from "react";

type DetailRow = {
  label: string;
  value: ReactNode;
};

export function CaseStudyHero({
  logo,
  logoWidth,
  logoHeight,
  eyebrow,
  title,
  paragraphs,
  result,
  note,
  details,
  columnGap = 64,
  textFlex = 1,
  detailsFlex = 1,
  detailsWidth,
  detailsGap = 32,
}: {
  logo: string;
  logoWidth: number;
  logoHeight: number;
  eyebrow: string;
  title: ReactNode;
  paragraphs: string[];
  result?: ReactNode;
  note?: string;
  details: DetailRow[];
  /** Gap in px between the text column and the details box (Figma: 64 for Wildflower/Gusto, 40 for Therabody). */
  columnGap?: number;
  /** Relative flex-grow for the text column when detailsWidth isn't set (Figma flex-basis, e.g. 656.4 / 1088.8). */
  textFlex?: number;
  /** Relative flex-grow for the details box when detailsWidth isn't set (Figma flex-basis, e.g. 612.8). */
  detailsFlex?: number;
  /** Fixed px width for the details box (Figma: 248 for Therabody). Omit to have it share space with the text column via textFlex/detailsFlex. */
  detailsWidth?: number;
  /** Gap in px between each Role/Team/Timeframe/etc. row inside the details box (Figma: 40 for Therabody, 32 elsewhere). */
  detailsGap?: number;
}) {
  return (
    <section className="flex w-full items-center justify-center bg-white px-6 py-10 md:px-[72px] md:py-10">
      <div
        className="flex w-full max-w-[1376.8px] flex-col gap-10 md:flex-row"
        style={{ columnGap: `${columnGap}px` }}
      >
        <div
          className="flex flex-col items-start justify-center gap-6"
          style={{ flex: detailsWidth ? "1 1 0%" : `${textFlex} 0 0%` }}
        >
          <Image
            src={logo}
            alt=""
            width={logoWidth}
            height={logoHeight}
            className="h-8 w-auto object-contain"
          />
          <p className="font-script text-base tracking-[0.4px] text-muted">
            {eyebrow}
          </p>
          <h1 className="text-[36px] leading-[1.1] tracking-[-0.4px] text-ink md:text-[56px] md:leading-[64.4px]">
            {title}
          </h1>
          <div className="flex flex-col gap-4">
            {paragraphs.map((p, i) => (
              <p key={i} className="text-base tracking-[0.2px] text-muted">
                {p}
              </p>
            ))}
            {result && (
              <p className="text-base tracking-[0.2px] text-muted">
                <span className="font-semibold text-ink-soft">
                  The result:{" "}
                </span>
                {result}
              </p>
            )}
          </div>
          {note && (
            <p className="text-[13px] italic tracking-[0.13px] text-muted">
              {note}
            </p>
          )}
        </div>
        <div
          className={`flex flex-col justify-center rounded-2xl bg-pink/10 p-6 ${
            detailsWidth ? "shrink-0" : ""
          }`}
          style={{
            gap: `${detailsGap}px`,
            width: detailsWidth ? `${detailsWidth}px` : undefined,
            flex: detailsWidth ? undefined : `${detailsFlex} 0 0%`,
          }}
        >
          {details.map((d) => (
            <div key={d.label} className="flex flex-col items-start gap-2">
              <p className="font-script text-base font-bold tracking-[0.4px] text-ink-soft">
                {d.label}
              </p>
              <p className="text-[13px] italic tracking-[0.13px] text-ink-soft">
                {d.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
