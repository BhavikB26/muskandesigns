const logos = [
  { src: "/home/logos/gusto.png", alt: "Gusto" },
  { src: "/home/logos/therabody.png", alt: "Therabody" },
  { src: "/home/logos/builderai.png", alt: "Builder.ai" },
  { src: "/home/logos/preplaced.png", alt: "Preplaced" },
  { src: "/home/logos/eldahealth.png", alt: "Elda Health" },
  { src: "/home/logos/wildflower.png", alt: "Wildflower" },
];

export function LogoMarquee() {
  return (
    <div className="relative flex w-full items-center overflow-hidden bg-white py-6">
      <div className="flex w-max animate-marquee items-center gap-[72px]">
        {[...logos, ...logos].map((logo, i) => (
          <img
            key={`${logo.alt}-${i}`}
            src={logo.src}
            alt={logo.alt}
            className="h-5 w-auto shrink-0 object-contain"
          />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-14 bg-gradient-to-r from-white to-transparent md:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-14 bg-gradient-to-l from-white to-transparent md:w-24" />
    </div>
  );
}
