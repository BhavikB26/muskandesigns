import { ProjectCard } from "./project-card";

const BUILDER_UNIVERSITY_PROTOTYPE_URL =
  "https://www.figma.com/proto/KEABZM1GitiLCq9YTXJdu6/Portfolio-projects?node-id=2-14772&p=f&t=2NKvOK9p6nzn3qAa-1&scaling=scale-down&content-scaling=fixed&page-id=1%3A2";
const INTERNSHALA_PROTOTYPE_URL =
  "https://www.figma.com/proto/KEABZM1GitiLCq9YTXJdu6/Portfolio-projects?node-id=8-62&p=f&t=RRWn0sYZki8SCBWw-1&scaling=scale-down&content-scaling=fixed&page-id=1%3A4";

const TITLE_CLASS = "text-lg sm:text-xl md:text-2xl";
const DESCRIPTION_CLASS = "text-sm sm:text-base md:text-base";

export function CuratedWork() {
  return (
    <section
      id="work"
      className="flex flex-col items-center gap-12 px-6 pt-16 sm:gap-16 sm:pt-20 md:gap-[60px] md:px-[120px] md:pt-[220px]"
    >
      <h2 className="w-full max-w-[1680px] font-urbanist text-lg font-semibold text-muted sm:text-4xl md:text-[28px]">
        curated work
      </h2>
      <div className="flex w-full max-w-[1680px] flex-col gap-16 lg:flex-row lg:gap-10">
        <ProjectCard
          image="/projects/builder-university.jpg"
          imageWidth={1440}
          imageHeight={649}
          crop={{ top: "-0.08%", left: "-8.89%", width: "162.35%" }}
          imageAlt="Builder University onboarding platform"
          title="Builder University"
          href={BUILDER_UNIVERSITY_PROTOTYPE_URL}
          titleClassName={TITLE_CLASS}
          descriptionClassName={DESCRIPTION_CLASS}
        >
          An internal learning platform for{" "}
          <span className="underline underline-offset-2">Builder.ai</span> to
          automate and scale onboarding for hundreds of global hires and
          third-party experts, with structured learning plans, gamification,
          and a full course hub to keep them engaged.
        </ProjectCard>

        <ProjectCard
          image="/projects/internshala.jpg"
          imageWidth={1500}
          imageHeight={1500}
          crop={{ top: "0.01%", left: "-0.01%", width: "100%", height: "136.67%" }}
          imageAlt="Internshala Redesign"
          title="Internshala Redesign"
          href={INTERNSHALA_PROTOTYPE_URL}
          titleClassName={TITLE_CLASS}
          descriptionClassName={DESCRIPTION_CLASS}
        >
          Spotted the gaps in Internshala&rsquo;s internship experience and
          redesigned search, application, and tracking to actually work for
          freshers.
        </ProjectCard>
      </div>
      <a
        href="/work"
        className="flex items-center justify-center rounded-full bg-pill px-4 py-3 font-urbanist text-xs font-semibold tracking-[-0.25px] text-white transition-opacity hover:opacity-90 sm:px-10 sm:py-4 sm:text-base md:h-[60px] md:w-[188px] md:px-0 md:py-0 md:text-[18px]"
      >
        view more
      </a>
    </section>
  );
}
