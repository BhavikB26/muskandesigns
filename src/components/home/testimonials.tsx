import { MaskedText } from "@/components/masked-text";
import Image from "next/image";

const testimonials = [
  {
    quote:
      "I had the pleasure of working with Muskan during her time at Builder.ai, and I was consistently impressed by her passion, and dedication to her work. Muskan has always brought fresh ideas to the table and has always been really communicative to express her thoughts. I had the chance to collaborate with Muskan on multiple products and design system and she has always been very dedicated and exceptional in her work. I have seen her grow as a designer overtime working with her. She is always open to feedback and actively sought to improve her design and deliver the best in her capacity. I have no doubt that Muskan will continue to excel in her career.",
    avatar: "/home/testimonial-1.png",
    name: "Tushar Verma",
    role: "Senior Product Designer, Builder.ai",
  },
  {
    // TODO(testimonial): the copied opening sentence was removed. Confirm with Prachi what she actually wrote.
    quote:
      "I worked with Muskan at Builder.ai. Her ability to communicate design ideas stood out the most to me. We also collaborated on the design system where she created several key components. I’m confident that she’ll continue to thrive in her ux design career.",
    avatar: "/home/testimonial-2.png",
    name: "Prachi Rathore",
    role: "Product Designer, Navi",
  },
];

export function Testimonials() {
  return (
    <section aria-labelledby="kind-words" className="w-full px-page pt-28  md:pt-40">
      <div className="mx-auto flex w-full max-w-[1760px] flex-col gap-10">
        <div data-reveal className="flex flex-col gap-3">
          <p className="label-mono text-muted">(03) Kind words</p>
          <h2 id="kind-words" className="font-display text-[clamp(2.4rem,1.4rem+3.4vw,5rem)] font-medium leading-[1] tracking-[0.01em]">
            <MaskedText text="From people I’ve" onReveal />{" "}
            <em className="font-serif text-[1.06em] font-normal italic tracking-[-0.01em] text-accent">
              <MaskedText text="worked with" start={3} onReveal />
            </em>
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {testimonials.map((t) => (
            <figure key={t.name} data-reveal className="flex flex-col justify-between gap-8 rounded-[8px] bg-card p-7 ring-1 ring-line md:p-10">
              <blockquote className="text-[clamp(1rem,0.95rem+0.25vw,1.15rem)] leading-[1.65] text-ink-soft">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="flex items-center gap-3">
                <Image src={t.avatar} alt="" width={48} height={48} className="size-12 rounded-full object-cover" />
                <span className="flex flex-col">
                  <span className="text-[16px] font-semibold">{t.name}</span>
                  <span className="label-mono normal-case tracking-normal text-muted">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
