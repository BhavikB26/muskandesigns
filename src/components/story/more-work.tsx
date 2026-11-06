import Image from "next/image";
import Link from "next/link";
import { MORE_STORIES } from "@/content/stories/more";

/** /work: projects beyond the main nine, each a card with its thumbnail. Not used on the homepage. */
export function MoreWork() {
  if (!MORE_STORIES.length) return null;
  return (
    <section id="more" aria-labelledby="more-h" className="mx-auto flex w-full max-w-[1240px] scroll-mt-24 flex-col gap-8 px-page pb-24 pt-8">
      <div className="flex flex-col gap-2">
        <h2 id="more-h" className="font-serif text-[clamp(36px,4vw,56px)] leading-none text-ink">
          More projects
        </h2>
        <p className="max-w-[60ch] text-[17px] leading-[1.6] text-ink-soft">Team projects across recruitment, operations, finance and education, told through the screens.</p>
      </div>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {MORE_STORIES.map((s) => (
          <li key={s.slug}>
            <Link href={`/work/${s.slug}`} className="group flex flex-col gap-3">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] ring-1 ring-line" style={{ background: s.more!.gem[0] }}>
                <Image src={s.more!.thumb.src} alt={s.more!.thumb.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]" />
              </div>
              <span className="text-[17px] font-medium leading-snug text-ink transition-colors group-hover:text-accent">{s.more!.name}</span>
              <span className="-mt-2 text-[15px] leading-snug text-muted">{s.more!.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
