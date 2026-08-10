import { ProjectCard } from "./project-card";

const OYO_PROTOTYPE_URL =
  "https://www.figma.com/proto/KEABZM1GitiLCq9YTXJdu6/Portfolio-projects?node-id=12-27&p=f&t=Y20RqmDAm1hgkhVt-1&scaling=scale-down&content-scaling=fixed&page-id=0%3A1";
const BASECAMP_PROTOTYPE_URL =
  "https://www.figma.com/proto/KEABZM1GitiLCq9YTXJdu6/Portfolio-projects?node-id=2-27608&t=o4NFwkih26GfaZn6-1&scaling=scale-down&content-scaling=fixed&page-id=1%3A3";
const SWIPING_LOOP_PROTOTYPE_URL =
  "https://www.figma.com/proto/KEABZM1GitiLCq9YTXJdu6/Portfolio-projects?node-id=12-1382&p=f&t=fP0MWJ5sB2nQTSaj-1&scaling=scale-down&content-scaling=fixed&page-id=1%3A5";
const STUDIO_STORE_PROTOTYPE_URL =
  "https://www.figma.com/proto/KEABZM1GitiLCq9YTXJdu6/Portfolio-projects?node-id=2-4686&p=f&t=cF8m7oWoP80mAmKg-1&scaling=scale-down&content-scaling=fixed&page-id=1%3A6";

const TITLE_CLASS = "text-lg sm:text-xl md:text-2xl";
const DESCRIPTION_CLASS = "text-sm sm:text-base md:text-base";

export function WorkProjects() {
  return (
    <section className="flex flex-col items-center gap-10 px-6 pt-12 sm:gap-12 sm:pt-16 md:px-[120px] md:pt-[87px]">
      <h2 className="w-full max-w-[1680px] font-urbanist text-lg font-semibold text-muted sm:text-3xl md:text-[28px]">
        more projects I&rsquo;ve worked on...
      </h2>
      <div className="grid w-full max-w-[1680px] grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2 md:gap-y-[120px]">
        <ProjectCard
          image="/work/oyo.png"
          imageWidth={3232}
          imageHeight={1856}
          crop={{ top: "-0.08%", left: "-0.05%", width: "127.42%" }}
          imageAlt="Ratings & Reviews: OYO"
          title="Ratings & Reviews: OYO"
          href={OYO_PROTOTYPE_URL}
          titleClassName={TITLE_CLASS}
          descriptionClassName={DESCRIPTION_CLASS}
        >
          A Rating &amp; Review SaaS built for OYO: designed a reward-driven
          system to incentivize guests to submit quality reviews
          post-checkout, directly improving OYO&rsquo;s feedback loop and
          listing credibility.
        </ProjectCard>

        <ProjectCard
          image="/work/basecamp.png"
          imageWidth={1440}
          imageHeight={941}
          crop={{ top: "0%", left: "-11.95%", width: "111.97%" }}
          imageAlt="Basecamp Redesign"
          title="Basecamp Redesign"
          href={BASECAMP_PROTOTYPE_URL}
          titleClassName={TITLE_CLASS}
          descriptionClassName={DESCRIPTION_CLASS}
        >
          Revamped the Basecamp website with a clean, conversion-focused
          interface that improves navigation, feature discoverability, and
          overall user engagement.
        </ProjectCard>

        <ProjectCard
          image="/work/swiping-loop.png"
          imageWidth={3232}
          imageHeight={2528}
          crop={{ top: "0%", left: "0%", width: "100%" }}
          imageAlt="Study about dating apps — the swiping loop"
          title="Study about dating apps"
          href={SWIPING_LOOP_PROTOTYPE_URL}
          titleClassName={TITLE_CLASS}
          descriptionClassName={DESCRIPTION_CLASS}
        >
          Researched why swipe-based dating apps leave users frustrated &amp;
          disengaged, uncovering the &ldquo;Swipe Loop&rdquo; pattern &amp;
          proposed design fixes that prioritize direct communication &amp;
          user control over algorithmic matchmaking.
        </ProjectCard>

        <ProjectCard
          image="/work/studio-store.png"
          imageWidth={1920}
          imageHeight={1080}
          crop={{ top: "0%", left: "0%", width: "100%" }}
          imageAlt="Studio Store"
          title="Studio Store"
          href={STUDIO_STORE_PROTOTYPE_URL}
          titleClassName={TITLE_CLASS}
          descriptionClassName={DESCRIPTION_CLASS}
        >
          Designed the onboarding and dashboard experience for Studio Store:
          an e-commerce platform for small business owners, simplifying
          store setup and surfacing key business insights from day one.
        </ProjectCard>
      </div>
    </section>
  );
}
