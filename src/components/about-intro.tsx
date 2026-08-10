import Image from "next/image";

export function AboutIntro() {
  return (
    <section className="flex flex-col-reverse items-center gap-12 px-6 md:flex-row md:items-center md:gap-[100px] md:px-0">
      <div className="flex max-w-md flex-col items-start gap-5 text-left">
        <p className="font-urbanist text-xs font-medium text-muted sm:text-base">Hey There</p>
        <p className="font-urbanist text-xl font-bold text-ink sm:text-[28px] sm:font-semibold md:text-[32px]">
          I&rsquo;m Muskan, a product designer from India, passionate about
          making designs that are easy
          <br className="hidden md:block" /> to use by everyone.
        </p>
        <p className="font-urbanist text-xs font-medium text-muted sm:text-base">
          I&rsquo;m the person on your team who will keep in touch with users
          everyday and knows their motivations by heart.
          <br className="hidden md:block" /> I&rsquo;m particularly
          interested in evolving UX of AI workflows.
        </p>
      </div>
      <div className="relative aspect-[392/515] w-[300px] shrink-0 sm:w-[320px] md:w-[392px]">
        <Image src="/about/profile-card.png" alt="Muskan" fill className="object-contain" />
      </div>
    </section>
  );
}
