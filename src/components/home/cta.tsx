import { PillButton } from "@/components/ui/pill-button";

export function Cta() {
  return (
    <section
      id="contact"
      className="flex w-full items-center justify-center bg-[linear-gradient(163.59deg,rgba(255,173,173,0.102)_0%,rgba(202,187,233,0.102)_50%,rgba(179,222,193,0.102)_100%)] px-6 py-16 md:px-[72px] md:py-[100px]"
    >
      <div className="flex w-full max-w-[1376.8px] flex-col items-center gap-8 rounded-[24px] bg-[linear-gradient(169.79deg,rgba(255,173,173,0.251)_0%,rgba(202,187,233,0.251)_50%,rgba(179,222,193,0.251)_100%)] p-10 text-center md:min-h-[248px] md:flex-row md:justify-between md:gap-4 md:p-16 md:text-left">
        <div className="flex flex-1 flex-col gap-4">
          <h2 className="text-[32px] font-medium leading-[1.15] tracking-[-0.4px] text-ink md:text-[40px] md:leading-[46px]">
            Let&rsquo;s work together
          </h2>
          <p className="text-base tracking-[0.2px] text-ink-soft">
            Can&rsquo;t wait to join your team and build something great together.
          </p>
        </div>
        <div className="flex w-full flex-col gap-6 md:w-[246.65px] md:shrink-0">
          <PillButton
            href="https://cal.com/muskandesigns/30min"
            variant="pink"
            target="_blank"
            className="w-full"
          >
            Book a free discovery call
          </PillButton>
        </div>
      </div>
    </section>
  );
}
