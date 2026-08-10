import type { ReactNode } from "react";
import { SparkleIcon } from "./sparkle-icon";

function Value({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <SparkleIcon />
      <p className="font-urbanist text-xs font-medium text-black sm:text-base">
        {children}
      </p>
    </div>
  );
}

export function AboutDesignValues() {
  return (
    <section className="flex flex-col items-start gap-8 px-6 sm:gap-8 md:px-0">
      <h2 className="font-urbanist text-xl font-bold text-ink sm:text-[24px]">
        How my design stands out
      </h2>
      <div className="flex max-w-[650px] flex-col items-start gap-5 sm:gap-10">
        <Value>
          Iterate, Iterate and Iterate more. I aim for perfection and
          don&rsquo;t stop until the final solution is absolutely spot-on.
        </Value>
        <Value>
          Beauty lies in the details, and I obsess over them. My attention to
          detail is like an artist painting a masterpiece.
        </Value>
        <Value>
          I place users at the heart of every design decision. I believe in
          walking in the user&rsquo;s shoes.
        </Value>
        <Value>
          I believe the best designs are born from diverse perspectives and
          collaborative efforts.
        </Value>
      </div>
    </section>
  );
}
