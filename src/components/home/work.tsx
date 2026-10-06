import Image from "next/image";
import { PillButton } from "@/components/ui/pill-button";
import { caseStudies } from "@/content/case-studies";

export function Work() {
  return (
    <section id="work" className="w-full">
      <div className="flex w-full justify-center px-6 pt-8 md:px-[72px] md:pb-[7px] md:pt-[73px]">
        <h2 className="w-full max-w-[1376.8px] text-[32px] font-medium leading-[1.15] tracking-[-0.4px] text-ink md:px-2 md:text-[40px] md:leading-[46px]">
          My work
        </h2>
      </div>
      <div className="flex w-full flex-col items-center gap-8 bg-[linear-gradient(180deg,#ffffff_0%,rgba(255,173,173,0.078)_12%,#ffffff_30%,rgba(202,187,233,0.078)_70%,rgba(179,222,193,0.078)_100%)] px-6 pb-16 pt-6 md:gap-[72px] md:px-[72px] md:pb-[100px] md:pt-[50px]">
      {caseStudies.map((study) => (
        <article
          key={study.slug}
          className="flex w-full max-w-[1376.8px] flex-col items-center gap-10 rounded-[24px] px-8 py-10 md:flex-row md:gap-16 md:px-20 md:py-16"
          style={{
            backgroundImage: `linear-gradient(to bottom, ${study.gradientFrom}, ${study.gradientTo})`,
            boxShadow: "0px 20px 30px -8px rgba(0, 0, 0, 0.15), 0px 8px 12px -6px rgba(0, 0, 0, 0.15)",
          }}
        >
          <div className="flex flex-1 flex-col items-start justify-center gap-10">
            <div className="flex flex-col items-start gap-6">
              {study.logo && (
                <Image
                  src={study.logo}
                  alt=""
                  width={study.logoWidth}
                  height={study.logoHeight}
                  className="h-3.5 w-auto object-contain md:h-5"
                />
              )}
              {study.label && (
                <p className="text-sm font-semibold uppercase tracking-[0.8px] text-ink-soft/70">
                  {study.label}
                </p>
              )}
              <h3 className="text-[28px] font-medium leading-[1.15] tracking-[-0.4px] text-ink md:text-[40px] md:leading-[46px]">
                {study.title}
              </h3>
              <p className="text-base tracking-[0.2px] text-ink-soft">
                {study.summary}
              </p>
            </div>
            <PillButton
              href={`/work/${study.slug}`}
              variant="white"
              className="w-full md:w-auto"
            >
              Read case study
            </PillButton>
          </div>
          <div className="flex flex-1 flex-col items-center gap-8">
            <div className="w-full overflow-hidden rounded-[16px]">
              <Image
                src={study.shot}
                alt={`${study.title} preview`}
                width={study.shotWidth}
                height={study.shotHeight}
                className="h-auto w-full object-contain"
              />
            </div>
            {study.stats.length > 0 && (
              <div className="flex w-full gap-3">
                {study.stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="flex flex-1 flex-col items-center gap-0.5"
                  >
                    <p className="text-base font-semibold tracking-[0.3px] text-ink">
                      {stat.label}
                    </p>
                    <p className="text-[32px] leading-[46px] tracking-[-0.4px] text-ink md:text-[40px]">
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </article>
      ))}
      </div>
    </section>
  );
}
