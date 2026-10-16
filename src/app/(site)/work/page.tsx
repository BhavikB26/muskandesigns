import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { WithFooter } from "@/components/site-footer";
import { Work } from "@/components/home/work";
import { WORK_TILES } from "@/content/work";

export const metadata: Metadata = {
  title: "Case studies",
  description: "Every case study by Muskan Bhatia, product designer.",
  alternates: { canonical: "/work" },
};

export default function WorkIndex() {
  return (
    <WithFooter>
      <SiteHeader />
      <main id="main" tabIndex={-1} className="page-in flex w-full flex-col">
        <Work tiles={WORK_TILES} heading="All case" emphasis="studies" sub={`${WORK_TILES.length} projects: shipped work, a design system, research and a few concepts.`} headingLevel="h1" />
      </main>
    </WithFooter>
  );
}
