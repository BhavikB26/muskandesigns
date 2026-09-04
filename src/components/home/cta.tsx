import { PillButton } from "@/components/ui/pill-button";

export function Cta() {
  return (
    <section
      id="contact"
      className="flex w-full items-center justify-center px-6 py-16 md:px-[72px] md:py-[100px]"
    >
      <div className="flex w-full max-w-[1376.8px] flex-col items-center gap-8 rounded-[24px] bg-gradient-to-br from-pink/10 via-purple/10 to-green/10 p-10 text-center md:p-16">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-[32px] leading-[1.15] tracking-[-0.4px] text-ink md:text-[40px] md:leading-[46px]">
            Let&rsquo;s work together
          </h2>
          <p className="text-base tracking-[0.2px] text-ink-soft">
            Get strategic UX and product design without the agency price tag.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <PillButton href="#connect" variant="pink">
            Book a free discovery call
          </PillButton>
          <PillButton href="#work" variant="white">
            View services
          </PillButton>
        </div>
      </div>
    </section>
  );
}
