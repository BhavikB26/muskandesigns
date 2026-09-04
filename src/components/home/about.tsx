import Image from "next/image";

const traits = [
  { label: "ENFP-T", icon: "/home/icon-mbti.svg", bg: "bg-pink" },
  { label: "Cancer", icon: "/home/icon-zodiac.svg", bg: "bg-purple" },
  { label: "Enneagram 5", icon: "/home/icon-enneagram.svg", bg: "bg-green" },
];

export function About() {
  return (
    <section
      id="about"
      className="flex w-full flex-col items-center px-6 py-16 md:px-[72px] md:py-[100px]"
    >
      <div className="flex w-full max-w-[1376.8px] flex-col items-center gap-10 md:flex-row md:gap-16">
        <div className="relative grid w-full max-w-[656px] grid-cols-2 gap-4">
          <div className="relative row-span-2 h-[420px] overflow-hidden rounded-[16px] md:h-[655px]">
            <Image
              src="/home/about-photo-1.png"
              alt="Muskan"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-[200px] overflow-hidden rounded-[24px] md:h-[313px]">
            <Image
              src="/home/about-photo-2.png"
              alt="Muskan with friends"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-[200px] overflow-hidden rounded-[24px] md:h-[313px]">
            <Image
              src="/home/about-photo-3.png"
              alt="Muskan"
              fill
              className="object-cover object-top"
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col items-start gap-6">
          <h2 className="text-[32px] leading-[1.15] tracking-[-0.4px] text-ink md:text-[40px] md:leading-[46px]">
            About me
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            {traits.map((trait) => (
              <div
                key={trait.label}
                className={`flex items-center gap-2 rounded-lg px-3 py-2 ${trait.bg}`}
              >
                <img src={trait.icon} alt="" className="size-5 object-contain" />
                <p className="text-base font-semibold tracking-[0.3px] text-ink">
                  {trait.label}
                </p>
              </div>
            ))}
          </div>
          <p className="text-base tracking-[0.2px] text-muted">
            I&rsquo;m a Delhi-based product designer and growth strategist. I
            help mission-driven teams turn ideas into digital experiences
            that drive growth, build loyalty, and keep users coming back.
            Outside of Figma, I&rsquo;m usually working on becoming a little
            stronger in body and mind.
          </p>
        </div>
      </div>
    </section>
  );
}
