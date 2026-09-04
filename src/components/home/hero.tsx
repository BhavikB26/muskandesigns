import Image from "next/image";
import { PillButton } from "@/components/ui/pill-button";

export function Hero() {
  return (
    <section className="flex w-full flex-col items-center gap-10 px-6 pb-16 pt-16 md:flex-row md:justify-center md:gap-[72px] md:px-[72px] md:pb-[100px] md:pt-[60px]">
      <div className="flex max-w-[960px] flex-col items-start gap-6 text-center md:text-left">
        <p className="font-script text-base tracking-[0.4px] text-muted">
          Hi, I&rsquo;m Muskan 👋
        </p>
        <h1 className="text-[36px] leading-[1.1] tracking-[-0.4px] text-ink md:text-[56px] md:leading-[64.4px]">
          I design websites and apps that drive{" "}
          <span className="font-bold italic">results.</span>
        </h1>
        <p className="text-base tracking-[0.2px] text-muted md:whitespace-nowrap">
          I blend UX craft with growth strategy to help startups and small
          businesses boost conversion and retention.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
          <PillButton href="#work" variant="white">
            View my work
          </PillButton>
          <PillButton href="#contact" variant="pink">
            Book a free discovery call
          </PillButton>
        </div>
      </div>
      <div className="relative size-[220px] shrink-0 overflow-hidden rounded-full md:size-[345px]">
        <Image
          src="/home/hero-illustration.png"
          alt="Illustration of Muskan"
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
}
