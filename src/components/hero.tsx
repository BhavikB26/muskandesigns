import Image from "next/image";

export function Hero() {
  return (
    <section id="top" className="flex justify-center px-6 pt-8 sm:pt-16 md:pt-[87px]">
      <div className="flex flex-col items-center gap-1.5 text-center sm:items-start sm:gap-5 sm:text-left">
        <p className="font-urbanist text-lg font-semibold text-ink sm:text-4xl md:text-[40px]">
          muskan&rsquo;s
        </p>
        <div className="relative">
          <h1 className="font-red-hat text-[48px] uppercase leading-[52px] text-black sm:text-[80px] sm:leading-[0.9] md:text-[96px] md:leading-[100px]">
            <span className="block">port</span>
            <span className="block">folio</span>
          </h1>
          <Image
            src="/hero/leaf.png"
            alt=""
            fill
            className="pointer-events-none translate-x-[11.5%] object-contain"
          />
        </div>
        <p className="font-urbanist text-lg font-semibold text-ink sm:text-4xl md:text-[40px]">
          <span className="typewriter">product designer</span>
        </p>
        <p className="max-w-[220px] font-urbanist text-xs font-medium text-muted sm:max-w-sm sm:text-xl md:max-w-md md:text-base">
          based in delhi, practising yoga,
          <br className="hidden md:block" /> playing badminton &amp;
          listening to good music
        </p>
      </div>
    </section>
  );
}
