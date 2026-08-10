import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { WorkProjects } from "@/components/work-projects";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "work — muskan.",
  description: "More projects Muskan has worked on as a product designer.",
};

export default function Work() {
  return (
    <div className="flex flex-1 flex-col bg-white">
      <Nav active="work" />
      <WorkProjects />
      <Footer
        image="/about/footer-envelope.png"
        heading="Always up for a good conversation, drop a hello!"
        ptClassName="pt-16 sm:pt-20 md:pt-[220px]"
      />
    </div>
  );
}
