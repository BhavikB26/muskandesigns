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
        <div className="relative grid w-full max-w-[656px] grid-cols-2 gap-x-4 gap-y-6 md:gap-y-8">
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
              className="object-cover object-[center_20%]"
            />
          </div>
        </div>
        <div className="flex flex-1 flex-col items-start gap-6">
          <h2 className="text-[32px] leading-[1.15] tracking-[-0.4px] text-ink md:text-[40px] md:leading-[46px]">
            About me
          </h2>
          <div className="flex flex-nowrap items-center gap-2 md:flex-wrap md:gap-4">
            {traits.map((trait) => (
              <div
                key={trait.label}
                className={`flex items-center gap-1.5 rounded-lg px-2 py-1.5 md:gap-2 md:px-3 md:py-2 ${trait.bg}`}
              >
                <img
                  src={trait.icon}
                  alt=""
                  className="size-3.5 shrink-0 object-contain md:size-5"
                />
                <p className="whitespace-nowrap text-xs font-semibold tracking-[0.3px] text-ink md:text-base">
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
