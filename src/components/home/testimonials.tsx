import { MaskedText } from "@/components/masked-text";
import { GroupChat, type ChatMessage } from "@/components/ui/group-chat";

const testimonials = [
  {
    quote:
      "I had the pleasure of working with Muskan during her time at Builder.ai, and I was consistently impressed by her passion, and dedication to her work. Muskan has always brought fresh ideas to the table and has always been really communicative to express her thoughts. I had the chance to collaborate with Muskan on multiple products and design system and she has always been very dedicated and exceptional in her work. I have seen her grow as a designer overtime working with her. She is always open to feedback and actively sought to improve her design and deliver the best in her capacity. I have no doubt that Muskan will continue to excel in her career.",
    name: "Tushar Verma",
    avatar: "/home/avatar-tushar.webp",
    role: "Senior Product Designer, Builder.ai",
    channel: "builder-design",
  },
  {
    // TODO(testimonial): the copied opening sentence was removed. Confirm with Prachi what she actually wrote.
    quote:
      "I worked with Muskan at Builder.ai. Her ability to communicate design ideas stood out the most to me. We also collaborated on the design system where she created several key components. I’m confident that she’ll continue to thrive in her ux design career.",
    name: "Prachi Rathore",
    avatar: "/home/avatar-prachi.webp",
    role: "Product Designer, Navi",
    channel: "design-system",
  },
  {
    quote:
      "I met Muskan at the gym and have been seeking her Design help ever since! She’s helped me with my website, products, carousels, and so much more. What really stands out is her attention to detail and her never-failing energy for building distinct, functional AND beautiful products. If you’re looking for a curious mind with a lot of knowledge, someone who’s open to learning, experimenting, and constantly improving, Muskan is the one. I absolutely love how open she is to feedback and new ideas, and how much thought she puts into everything she creates.",
    name: "Ishika Jain",
    avatar: "/home/avatar-ishika.webp",
    role: "Client",
    channel: "website",
  },
] as { quote: string; name: string; role: string; avatar: string; channel: string }[];

const MUSKAN = { name: "Muskan", avatar: "/home/avatar-muskan.webp" };

/** A quote as chat messages: one sentence each, word for word, the role next to the name. */
function asMessages(t: (typeof testimonials)[number]): ChatMessage[] {
  return t.quote.split(/(?<=[.!?])\s+/).map((text, i) => ({ name: t.name, text, time: i === 0 ? t.role : undefined }));
}

/**
 * Kind words as chats (21st.dev Group Chat): one per person, between them and Muskan, with their photo, their
 * quote as a run of messages and Muskan typing a reply. Three side by side on wide screens, stacked below.
 */
export function Testimonials() {
  return (
    <section aria-labelledby="kind-words" className="w-full px-page pt-fr-section md:pt-[144px]">
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-fr-xxl">
        <div data-reveal className="flex flex-col gap-fr-sm">
          <h2 id="kind-words" className="t-display-xl">
            <MaskedText text="From people I’ve" onReveal />{" "}
            <em className="font-serif text-[0.96em] font-normal italic tracking-[-0.03em] text-ink">
              <MaskedText text="worked with" start={3} onReveal />
            </em>
          </h2>
          <p className="t-body max-w-[40ch] text-ink-soft">Two designers I worked with at Builder.ai, and a client.</p>
        </div>
        <ul className="grid gap-fr-lg md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.name} data-reveal className="flex">
              <GroupChat
                channel={t.channel}
                members={[t.name, MUSKAN.name]}
                messages={asMessages(t)}
                typing={MUSKAN.name}
                typingText="Thank you! 💜"
                avatars={{ [t.name]: t.avatar, [MUSKAN.name]: MUSKAN.avatar }}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
