import Image from "next/image";
import type { CSSProperties } from "react";

const testimonials = [
  {
    quote: [
      "I had the pleasure of working with Muskan during her time at Builder.ai, and I was consistently impressed by her passion, and dedication to her work. Muskan has always brought fresh ideas to the table and has always been really communicative to express her thoughts. I had the chance to collaborate with Muskan on multiple products and design system and she has always been very dedicated and exceptional in her work. I have seen her grow as a designer overtime working with her. She is always open to feedback and actively sought to improve her design and deliver the best in her capacity. I have no doubt that Muskan will continue to excel in her career.",
    ],
    tint: "rgba(255,173,173,0.08)",
    avatar: "/home/testimonial-1.png",
    name: "Tushar Verma",
    role: "Senior Product Designer, Builder.ai",
  },
  {
    // TODO(testimonial): The copied opening sentence was removed. The next
    // sentence ("She is an expert in her craft and always takes the time to
    // make the best recommendations.") was dropped too because it didn't read
    // naturally on its own. Confirm with Prachi what she actually wrote.
    quote: [
      "I worked with Muskan at Builder.ai. Her ability to communicate design ideas stood out the most to me. We also collaborated on the design system where she created several key components. I’m confident that she’ll continue to thrive in her ux design career.",
    ],
    tint: "rgba(202,187,233,0.08)",
    avatar: "/home/testimonial-2.png",
    name: "Prachi Rathore",
    role: "Product Designer, Navi",
  },
];

export function Testimonials() {
  return (
    <section className="relative flex w-full items-center justify-center overflow-hidden bg-[linear-gradient(155.6deg,rgba(202,187,233,0.251)_0%,rgba(255,173,173,0.2)_50%,rgba(179,222,193,0.251)_100%)] px-6 py-16 md:px-[72px] md:py-[124px]">
      <div className="pointer-events-none absolute right-[10%] top-[35%] size-[200px] rounded-full bg-[#cc9bff] opacity-60 blur-[100px]" />
      <div className="relative flex w-full max-w-[1376.8px] flex-col items-start gap-10">
        <h2 className="text-[32px] font-medium leading-[1.15] tracking-[-0.4px] text-ink md:text-[40px] md:leading-[46px]">
          Testimonials
        </h2>
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col items-start gap-8 rounded-2xl bg-[linear-gradient(to_bottom,#ffffff,var(--tint))] px-6 py-8"
              style={{ "--tint": t.tint } as CSSProperties}
            >
              <div className="flex flex-col gap-4">
                {t.quote.map((paragraph, i) => (
                  <p key={i} className="text-base tracking-[0.2px] text-ink-soft">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="flex items-center gap-[9px]">
                <div className="relative size-[52px] shrink-0 overflow-hidden rounded-full">
                  <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                </div>
                <div className="flex flex-col items-start">
                  <p className="text-lg font-semibold tracking-[0.18px] text-ink">
                    {t.name}
                  </p>
                  <p className="text-base tracking-[0.2px] text-ink-soft">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
