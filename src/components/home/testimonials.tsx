import { MaskedText } from "@/components/masked-text";
import Image from "next/image";
import { QuoteText } from "@/components/home/quote-text";

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
  {
    quote:
      "I met Muskan at the gym and have been seeking her Design help ever since! She’s helped me with my website, products, carousels, and so much more. What really stands out is her attention to detail and her never-failing energy for building distinct, functional AND beautiful products. If you’re looking for a curious mind with a lot of knowledge, someone who’s open to learning, experimenting, and constantly improving, Muskan is the one. I absolutely love how open she is to feedback and new ideas, and how much thought she puts into everything she creates.",
    avatar: "/home/ishika.jpg",
    name: "Ishika Jain",
    role: "Client",
  },
] as { quote: string; name: string; role: string; avatar?: string }[];

export function Testimonials() {
  return (
    <section aria-labelledby="kind-words" className="w-full px-page pt-fr-section md:pt-[144px]">
      <div className="mx-auto flex w-full max-w-[1760px] flex-col gap-fr-xxl">
        <div data-reveal className="flex flex-col gap-fr-sm">
          <p className="label-mono text-muted">Kind words</p>
          <h2 id="kind-words" className="t-display-xl">
            <MaskedText text="From people I’ve" onReveal />{" "}
            <em className="font-serif text-[1.06em] font-normal italic tracking-[-0.03em] text-ink">
              <MaskedText text="worked with" start={3} onReveal />
            </em>
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-fr-sm md:grid-cols-2 xl:grid-cols-3">
          {testimonials.map((t) => (
            <figure key={t.name} data-reveal className="flex flex-col justify-between gap-fr-xl rounded-fr-xl bg-surface-1 p-6 md:p-fr-xxl">
              <QuoteText quote={t.quote} name={t.name} />
              <figcaption className="flex items-center gap-fr-sm">
                {t.avatar ? (
                  <Image src={t.avatar} alt="" width={48} height={48} className="size-12 rounded-full object-cover" />
                ) : (
                  <span aria-hidden className="flex size-12 items-center justify-center rounded-full bg-surface-2 t-body-sm text-ink">
                    {t.name.split(" ").map((w) => w[0]).join("")}
                  </span>
                )}
                <span className="flex flex-col">
                  <span className="t-body-sm text-ink">{t.name}</span>
                  <span className="t-caption text-muted">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
