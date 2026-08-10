import Image from "next/image";
import type { ReactNode } from "react";

function Quote({ children, attribution }: { children: ReactNode; attribution: string }) {
  return (
    <div className="flex w-full max-w-[400px] flex-col items-start gap-2 sm:gap-5">
      <Image src="/about/icon-quote.png" alt="" width={84} height={50} className="h-auto w-8 sm:w-[60px]" />
      <div className="flex flex-col items-start gap-2">
        <p className="font-urbanist text-xs font-medium tracking-[-0.2px] text-[#212121] sm:text-base">
          {children}
        </p>
        <p className="font-urbanist text-xs font-medium tracking-[-0.2px] text-muted sm:text-base">
          {attribution}
        </p>
      </div>
    </div>
  );
}

export function AboutQuotes() {
  return (
    <section className="flex flex-col items-start gap-10 px-6 sm:gap-12 md:px-0">
      <h2 className="font-urbanist text-xl font-bold text-ink sm:text-[28px]">
        A few things I&rsquo;ve read that changed how I see things
      </h2>
      <div className="flex w-full flex-col items-start gap-10 md:flex-row md:gap-[180px]">
        <Quote attribution="Natko Hasić, Designer">
          Designing experiences for people who dedicated a part of their time
          to use the product I worked on is a unique privilege, I don&rsquo;t
          take it lightly.
        </Quote>
        <Quote attribution="Naval Ravikant, Angel Investor">
          Happiness is a choice and a skill, and you can dedicate yourself to
          learning that skill and making that choice.
        </Quote>
      </div>
    </section>
  );
}
