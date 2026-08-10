import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { AboutIntro } from "@/components/about-intro";
import { AboutHobbies } from "@/components/about-hobbies";
import { AboutQuotes } from "@/components/about-quotes";
import { AboutDesignValues } from "@/components/about-design-values";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "about — muskan.",
  description: "A little more about Muskan, a product designer based in Delhi.",
};

export default function About() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <Nav active="about" />
      <div className="mx-auto flex w-full max-w-[992px] flex-col gap-16 pt-12 sm:gap-20 sm:pt-16 md:gap-[220px] md:pt-[87px]">
        <AboutIntro />
        <AboutHobbies />
        <AboutQuotes />
        <AboutDesignValues />
      </div>
      <Footer
        image="/about/footer-envelope.png"
        heading="Always up for a good conversation, drop a hello!"
        ptClassName="pt-16 sm:pt-20 md:pt-[220px]"
      />
    </div>
  );
}
