import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { PrevNext } from "@/components/work/prev-next";
import { FaqAccordion } from "@/components/faq-accordion";
import { KeepReading } from "@/components/work/sections";
import { caseStudies } from "@/content/case-studies";

export const metadata: Metadata = {
  title: "ProPilot AI Mentor — Muskan Designs",
  description:
    "Designing ProPilot's always-available AI mentor from 0→1 for the first 50,000 learners.",
};

const IMG = "/work/ai-mentor/exact/";

function Col({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`mx-auto w-full max-w-[700px] px-6 md:px-0 ${className}`}>{children}</div>
  );
}

function H2({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`font-fraunces text-[28px] font-semibold leading-[1.25] tracking-[-0.5px] md:text-[40px] md:leading-[56px] md:tracking-[-0.8px] ${
        dark ? "text-[#fafafa]" : "text-black"
      }`}
    >
      {children}
    </p>
  );
}

function Eyebrow({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p
      className={`font-satoshi text-[11px] font-medium uppercase tracking-[0.72px] ${
        dark ? "text-[rgba(250,250,250,0.6)]" : "text-black/30"
      }`}
    >
      {children}
    </p>
  );
}

function Divider() {
  return <div className="h-px w-full bg-black/10" />;
}

function StickyNote({
  text,
  bg,
  color,
  className = "",
}: {
  text: string;
  bg: string;
  color: string;
  className?: string;
}) {
  return (
    <div
      className={`flex w-[150px] items-center justify-center px-3 py-2.5 text-center font-satoshi text-[11px] leading-[16px] md:w-[177px] md:text-[13px] md:leading-[22px] ${className}`}
      style={{ backgroundColor: bg, color }}
    >
      {text}
    </div>
  );
}

type Testimonial = {
  name: string;
  role: string;
  bg: string;
  accent: string;
  avatar?: string;
  quote: (ReactNode | string)[];
};

const testimonials: Testimonial[] = [
  {
    name: "Naheer R",
    role: "SDE-1 at a Product-based startup",
    bg: "#d1acf5",
    accent: "#954dd6",
    avatar: IMG + "testi-avatar1.png",
    quote: [
      "Before I used to stop the video and make notes in between. Now I use the notes Propilot makes on YouTube. The quizzes are really helpful for me it ",
      <span key="1" className="text-black">keeps me focussed on the content</span>,
      " and I pay more attention because I'm expecting the questions. But I think the questions should be a little more tough. Anyway it helps me to test my understanding and skills and ",
      <span key="2" className="text-black">gives me more confidence</span>,
      " that I actually learnt something from watching a 2 hour video. It also divides the video on its own into subsections with summaries which is also helpful for me to put attention.",
    ],
  },
  {
    name: "Animesh R",
    role: "SDET for 2 years",
    bg: "#ffe17d",
    accent: "#e1790b",
    quote: [
      "I used the extension for 2 weeks now. You guys have built something really good. I've stopped using the Solutions tab completely on LeetCode because it's soo frustrating to understand someone else's solution. This AI mentor ",
      <span key="1" className="text-black">makes me think about my approach and code</span>,
      " rather than giving me the solution. It is part of my workflow now. ",
      <span key="2" className="text-black">If it is taken away from me, I will be very upset</span>,
      " and it will be a big downgrade, like switching from a bike to a cycle. Some things you can improve are typing lags that happen 60-70% of the time and the transcription from voice to text is not very accurate but the AI responds correctly even with the inaccuracy.",
    ],
  },
  {
    name: "Multiple Consumer VCs",
    role: "In several pitch sessions",
    bg: "#8bd59b",
    accent: "#0f980f",
    avatar: IMG + "testi-avatar2.png",
    quote: [
      "The product is very unique and something like this does not exist in the market. ",
      <span key="1" className="text-black">The UX and design seem very intuitive</span>,
      " for the users adding to the engagement impact.",
    ],
  },
  {
    name: "Eswaresh D",
    role: "4th year B.Tech CSE student",
    bg: "#aaeaf0",
    accent: "#13a7b2",
    avatar: IMG + "testi-avatar3.png",
    quote: [
      "ChatGPT makes me a little lazy and I'm scared to use it for learning problem solving because it gives me direct solution and doesn't let me think myself. I use Propilot AI because it follows step by step approach in response and ",
      <span key="1" className="text-black">the options on the LeetCode screen itself make it very easy</span>,
      " for me to get help where I'm stuck only.",
    ],
  },
  {
    name: "Pratyusha M",
    role: "SDE-2 at Service-based company",
    bg: "#8bd59b",
    accent: "#0f980f",
    avatar: IMG + "testi-avatar4.png",
    quote: [
      "The pop-up style questions that come up in YouTube videos are ",
      <span key="1" className="text-black">very relevant</span>,
      " to the content the creator is talking about. I also like the similar questions that come on the summary part. I like that everything happens on the same screen and I",
      <span key="2" className="text-black"> save the time to go through multiple resources</span>,
      " to get my answer when I'm watching a video because you don't want to open any tabs when you're watching a video right? Earlier I would think about something I will have to Google later but I would forget. Here with Propilot it is always right there with chat and the buttons on the screen. The ",
      <span key="3" className="text-black">interactivity is what I like</span>,
      " over other AI tools I've tried.",
    ],
  },
  {
    name: "Parna",
    role: "2nd year B.Tech CSE student",
    bg: "#aaeaf0",
    accent: "#0d6e76",
    quote: [
      "I use the Key Terms section by Propilot on saved YouTube videos ",
      <span key="1" className="text-black">before my exams </span>,
      "or service based interviews. It helps me ",
      <span key="2" className="text-black">revise important stuff quickly</span>,
      " rather than finding and watching parts of videos I want.",
    ],
  },
  {
    name: "Lokeswar M",
    role: "SDE-1 at Product-based company",
    bg: "#faacc7",
    accent: "#d04f7e",
    avatar: IMG + "testi-avatar5.png",
    quote: [
      <span key="1">My solve time for a LeetCode problem has literally become half of before</span>,
      <span key="2" className="text-[#d04f7e]">
        . Earlier I used to spend 2 hours in a day and could do only 1 problem maybe in it. Now I
        think easily 3-4 problems I can do in 2 hours which matters a lot to me because in
        interviews we don&rsquo;t get as much time as we put on our own.
      </span>,
    ],
  },
];

function WhatWorked({
  worked,
  didnt,
}: {
  worked: string[];
  didnt: string[];
}) {
  return (
    <div className="flex flex-1 flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="font-satoshi text-base text-black">What worked</p>
        <div className="flex flex-col gap-2">
          {worked.map((w) => (
            <div key={w} className="flex gap-2">
              <span>✅</span>
              <p className="font-satoshi text-base leading-[26px] text-black/60">{w}</p>
            </div>
          ))}
        </div>
      </div>
      {didnt.length > 0 && (
        <div className="flex flex-col gap-3">
          <p className="font-satoshi text-base text-black">What didn&rsquo;t work</p>
          <div className="flex flex-col gap-2">
            {didnt.map((w) => (
              <div key={w} className="flex gap-2">
                <span>❌</span>
                <p className="font-satoshi text-base leading-[26px] text-black/60">{w}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatBar({
  bg,
  stats,
}: {
  bg: string;
  stats: { value: string; label: string }[];
}) {
  return (
    <div
      className="flex w-full flex-wrap gap-6 p-6 md:flex-nowrap md:gap-5"
      style={{ backgroundColor: bg }}
    >
      {stats.map((s) => (
        <div key={s.label} className="flex min-w-[130px] flex-1 flex-col gap-1">
          <p className="font-satoshi text-[32px] font-black leading-[1] tracking-[-1.5px] text-black md:text-[44px]">
            {s.value}
          </p>
          <p className="font-satoshi text-[13px] leading-[20px] tracking-[-0.28px] text-black md:text-[14px] md:leading-[24px]">
            {s.label}
          </p>
        </div>
      ))}
    </div>
  );
}

const faqs = [
  {
    q: "Why design an AI mentor on top of LeetCode and YouTube instead of building a standalone product?",
    a: "Our research showed developers weren't short on content, they were short on guidance while using the content they already trusted. Competing with LeetCode or YouTube would have meant asking users to change habits built over months and years. Meeting them where they already were removed that adoption cost entirely.",
  },
  {
    q: "How did you decide what the AI mentor should and shouldn't do?",
    a: "Watching 30+ hours of real 1:1 mentorship sessions taught us that good mentors ask questions before giving answers. Every interaction pattern, from the Socratic follow-ups to the tone settings, was designed to nudge users toward thinking it through themselves rather than copy-pasting a solution.",
  },
  {
    q: "What was the hardest tradeoff in this project?",
    a: "Context-awareness versus screen real estate. Users wanted the mentor to always know what page or video they were on, but early versions ate into their working area and got in the way. The split-tab redesign solved this, but it took two failed iterations and a lot of user interviews to get there.",
  },
];

const related = caseStudies
  .filter((s) => s.slug !== "ai-mentor")
  .slice(0, 2)
  .map((s) => ({
    slug: s.slug,
    logo: s.logo,
    logoWidth: s.logoWidth,
    logoHeight: s.logoHeight,
    title: s.title,
    summary: s.summary,
    gradientFrom: s.gradientFrom,
    gradientTo: s.gradientTo,
  }));

export default function AiMentorCaseStudy() {
  return (
    <>
      <Nav />
      <main className="flex w-full flex-col items-center overflow-x-hidden">
        <PrevNext slug="ai-mentor" />

        {/* HERO */}
        <Col className="flex flex-col items-center gap-11 pb-16 pt-16 md:pb-20 md:pt-16">
          <p className="font-fraunces text-center text-[32px] font-semibold leading-[1.2] tracking-[-1px] text-black md:text-[58px] md:leading-[81px] md:tracking-[-1.74px]">
            Designing AI Mentor experience from 0→1 for the first 50,000 learners
          </p>
          <div className="flex w-full flex-col gap-6">
            <Divider />
            <div className="grid grid-cols-2 gap-6 md:flex md:gap-8">
              <div className="flex flex-col gap-1">
                <p className="font-satoshi text-[11px] tracking-[0.56px] text-black/60">
                  PRODUCT NAME
                </p>
                <p className="font-satoshi text-base text-black">Propilot AI by Preplaced</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-satoshi text-[11px] tracking-[0.56px] text-black/60">
                  TIMELINE
                </p>
                <p className="font-satoshi text-base text-black">
                  Oct – Dec 2023
                  <br />
                  (3 months, during my Preplaced term)
                </p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-satoshi text-[11px] tracking-[0.56px] text-black/60">
                  PRODUCT TYPE
                </p>
                <p className="font-satoshi text-base text-black">Google Chrome Extension</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-satoshi text-[11px] tracking-[0.56px] text-black/60">
                  MY ROLE
                </p>
                <p className="font-satoshi text-base text-black">Product Designer</p>
              </div>
            </div>
            <Divider />
          </div>
        </Col>

        <div className="flex w-full gap-6 overflow-x-auto px-6 pb-4 md:justify-center md:gap-8 md:px-[72px]">
          <div className="h-[420px] w-[210px] shrink-0 shadow-[3px_3px_0px_0px_#a39f7e] md:h-[420px] md:w-[210px]">
            <Image src={IMG + "hero1.png"} alt="" width={549} height={1024} className="size-full object-cover" />
          </div>
          <div className="h-[420px] w-[210px] shrink-0">
            <Image src={IMG + "hero2.png"} alt="" width={1004} height={2048} className="size-full object-contain" />
          </div>
          <div className="h-[300px] w-[420px] shrink-0 shadow-[3px_3px_0px_0px_#a29e7e] md:h-[300px] md:w-[420px]">
            <Image src={IMG + "hero3.png"} alt="" width={910} height={648} className="size-full object-cover" />
          </div>
          <div className="h-[420px] w-[210px] shrink-0 shadow-[3px_3px_0px_0px_#a39f7e] md:h-[420px] md:w-[210px]">
            <Image src={IMG + "hero4.png"} alt="" width={1400} height={997} className="size-full object-cover" />
          </div>
        </div>

        {/* INTRO */}
        <Col className="flex flex-col gap-16 py-16 md:py-24">
          <Divider />
          <p className="font-satoshi text-[22px] leading-[36px] tracking-[-0.4px] text-black md:text-[32px] md:leading-[52px]">
            This is the{" "}
            <span className="text-black/40 line-through decoration-1">case study</span> story of
            how 50,000 developers who would study online solo, found valuable mentorship without
            changing platforms they&rsquo;ve been used to for months and years.
          </p>
          <p className="font-satoshi text-[22px] leading-[36px] tracking-[-0.4px] text-black md:text-[32px] md:leading-[52px]">
            They found it so useful that{" "}
            <span className="text-[#3000df]">40% kept coming back</span> even after 4 weeks ❤️
          </p>
          <Divider />
        </Col>

        {/* BEFORE PROPILOT QUOTE */}
        <Col className="flex flex-col items-center gap-12 pb-16 md:pb-24">
          <H2>
            Before Propilot AI, this is what developers would say about learning solo&nbsp;-
          </H2>
          <div className="flex w-full flex-col-reverse items-center gap-8 md:flex-row md:items-center md:justify-between">
            <p className="font-gochi max-w-[420px] rotate-1 text-[19px] leading-[30px] text-black">
              Every time I get stuck while solving a coding question, I have to go to YouTube or
              the Solutions section. It{" "}
              <span className="text-[#ff2d2d]">doesn&rsquo;t answer my specific doubt</span>{" "}
              because it is generic.{" "}
              <span className="text-[#ff2d2d]">
                Decoding a stranger&rsquo;s solution is very time consuming.
              </span>{" "}
              To get some personalised guidance, I have to copy-paste my code and all context to
              LLMs and it takes too much time. It also ends up giving me the full solution and I
              feel like I didn&rsquo;t learn anything. All this doubles my solve time and leaves
              me{" "}
              <span className="text-[#ff2d2d]">
                feeling confused, inefficient, tired and tbh, lonely.
              </span>
            </p>
            <div className="size-[180px] shrink-0 shadow-[0px_2px_2px_rgba(0,0,0,0.5)] md:size-[220px]">
              <Image
                src={IMG + "beforequote-avatar.png"}
                alt=""
                width={512}
                height={512}
                className="size-full object-cover"
              />
            </div>
          </div>
        </Col>

        {/* TESTIMONIAL WALL */}
        <div className="flex w-full flex-col gap-8 bg-[#f7f7f5] py-16 md:py-24">
          <Col>
            <H2>...And THIS is what they say now ❤️</H2>
            <p className="mt-2 font-satoshi text-base text-black/60">
              These are testimonials that I personally heard from users in interviews.
              They&rsquo;ve been fuel on days when things get a lil tough. The VC testimonial is
              collected from one of our co-founders.
            </p>
          </Col>
          <div className="flex w-full gap-6 overflow-x-auto px-6 pb-4 md:px-[72px]">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className={`flex w-[260px] shrink-0 flex-col justify-between gap-6 p-5 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.15)] md:w-[300px] md:p-6 ${
                  i % 2 === 0 ? "rotate-1" : "-rotate-1"
                }`}
                style={{ backgroundColor: t.bg }}
              >
                <span className="self-center rounded bg-[#fc3131] px-2.5 py-1 text-[10px] text-white">
                  🤍🤍🤍🤍
                </span>
                <p className="font-gochi text-[15px] leading-[24px]" style={{ color: t.accent }}>
                  {t.quote}
                </p>
                <div className="flex items-center gap-2.5">
                  {t.avatar ? (
                    <div className="size-9 shrink-0 overflow-hidden rounded-full">
                      <Image src={t.avatar} alt="" width={200} height={200} className="size-full object-cover" />
                    </div>
                  ) : (
                    <div className="size-9 shrink-0 rounded-full bg-white/40" />
                  )}
                  <div className="flex flex-col">
                    <p className="font-satoshi text-sm text-black">{t.name}</p>
                    <p className="font-satoshi text-xs" style={{ color: t.accent }}>
                      {t.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ORIGIN */}
        <Col className="flex flex-col items-center gap-16 py-16 text-center md:py-24">
          <Divider />
          <p className="font-satoshi text-[22px] leading-[36px] tracking-[-0.4px] text-black md:text-[32px] md:leading-[52px]">
            In 2024, we experimented with a few solutions around the concept of an AI Mentor
            called ProPilot. Our focus was on AI generated lessons to execute roadmaps. Focussing
            on content wasn&rsquo;t solving any real issues.
          </p>
          <div className="flex flex-col gap-4">
            <p className="font-satoshi text-[22px] leading-[36px] tracking-[-0.4px] text-black md:text-[32px] md:leading-[52px]">
              In early 2025, we asked :
            </p>
            <p className="font-satoshi text-[22px] leading-[36px] tracking-[-0.4px] text-[#3000df] md:text-[32px] md:leading-[52px]">
              What if instead of competing with content, we augment learning experience on
              platforms that already have tons of it?
            </p>
          </div>
          <Divider />
        </Col>

        {/* MVP */}
        <Col className="flex flex-col gap-8 pb-16 md:pb-24">
          <H2>It all started with an MVP - an existing feature in ProPilot&rsquo;s lessons</H2>
          <p className="font-satoshi text-base leading-7 text-black/60">
            Some of the career roadmap lessons on ProPilot (our first AI Mentor) were resource
            based - a curated YouTube video or a LeetCode/GFG coding problem that learner could
            learn from.
          </p>
          <p className="font-satoshi text-xl leading-8 tracking-[-0.4px] text-black">
            The ProPilot extension (MVP launched in beta) would travel with the user and open in
            the browser right on top of the resource.
          </p>
          <p className="font-satoshi text-base leading-7 text-black/60">
            The user could ask the mentor any doubt or query they had, or if they were stuck to
            solve the coding problem or a follow-up question about something the video creator
            just said.
          </p>
          <p className="font-satoshi text-xl leading-8 tracking-[-0.4px] text-black">
            We tested this for 2 weeks to understand how learners would interact with an
            &ldquo;always available AI mentor&rdquo;.
          </p>
          <div className="flex w-full items-center justify-center bg-black p-4 md:p-8">
            <div className="w-full max-w-[636px] border-4 border-[#d5cc48]">
              <Image
                src={IMG + "mvp-screenshot.png"}
                alt=""
                width={1024}
                height={576}
                className="w-full object-cover"
              />
            </div>
          </div>
        </Col>

        {/* PROBLEM 1 + 2 */}
        <Col className="flex flex-col gap-16 pb-16 md:pb-24">
          <H2>This test showed us some major behavioural problems to solve for</H2>

          <div className="flex flex-col gap-6 md:flex-row md:gap-10">
            <div className="w-full shrink-0 border-4 border-[#3ba8f6] md:w-[326px]">
              <Image src={IMG + "problem1.png"} alt="" width={649} height={1024} className="w-full object-cover" />
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Eyebrow>problem #1</Eyebrow>
                <p className="font-satoshi text-xl leading-8 tracking-[-0.4px] text-black">
                  Users find friction in initiating conversations with AI Mentor and then
                  maintaining them.
                </p>
                <p className="font-satoshi text-base leading-7 text-black/60">
                  For example, on LeetCode, when a user reads the Two Sum problem description and
                  does not know how to start thinking about it (a perfect use case for the
                  extension), they underwent a lot of friction to move their cursor all the way
                  across the screen and ask the AI Mentor.
                </p>
              </div>
              <Divider />
              <div className="flex flex-col gap-3 font-satoshi text-sm leading-[22px] tracking-[-0.28px] text-[#da2929]">
                <p>
                  Users don&rsquo;t want to type. The mentor has to be more than a chatbot by
                  anticipating user&rsquo;s needs.
                </p>
                <p>
                  Message initiation was 17% with engagement as 2 messages per user. Our W1
                  retention was ~10% and W2 was ~3%
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:gap-10">
            <div className="w-full shrink-0 border-4 border-[#f993f4] md:w-[326px]">
              <Image src={IMG + "problem2.png"} alt="" width={703} height={1024} className="w-full object-cover" />
            </div>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Eyebrow>problem #2</Eyebrow>
                <p className="font-satoshi text-xl leading-8 tracking-[-0.4px] text-black">
                  Users switch browser tabs a lot while learning and expect the mentor to be aware
                  of this switch.
                </p>
                <p className="font-satoshi text-base leading-7 text-black/60">
                  The floating tab remained in position when user switches tabs. It&rsquo;s a
                  natural expectation from users that it would respond with context of this new
                  tab. This was a technical constraint and I would have to accommodate my designs
                  with the solution which the developers would bring to solve for this fundamental
                  problem.
                </p>
              </div>
              <Divider />
              <p className="font-satoshi text-sm leading-[22px] tracking-[-0.28px] text-[#da2929]">
                Qualitative feedback showed us this was a core disappointment affecting engagement
                and retention for &gt;75% of users we interviewed.
              </p>
            </div>
          </div>
        </Col>

        {/* RESEARCH CONTEXT */}
        <Col className="flex flex-col items-center gap-6 pb-16 text-center md:pb-24">
          <Divider />
          <p className="font-satoshi text-xl leading-8 tracking-[-0.4px] text-black">
            Since we were focussed on deploying AI mentor on specific platforms that were most
            used by software developers{" "}
            <span className="text-black/30">
              (so coding platforms like LeetCode, GFG used by &gt;92% of aspiring SDEs and YouTube
              used by &gt;95% coders to learn)
            </span>
            , <span className="underline">we conducted strong research</span> to understand what
            problems are faced in the context of specific platforms that a mentor generally helps
            with.
          </p>
          <Divider />
        </Col>

        {/* MENTORSHIP NEEDS - PROBLEM 3 + 4 */}
        <Col className="flex flex-col gap-16 pb-16 md:pb-24">
          <H2>Mentorship needs of learners on coding platforms and YouTube</H2>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <Eyebrow>problem #3</Eyebrow>
              <p className="font-satoshi text-xl leading-8 tracking-[-0.4px] text-black">
                On coding platforms, users feel blocked in diverse stages from approach to
                optimisation. Existing solutions are not personalised to them.
              </p>
              <p className="font-satoshi text-base leading-7 text-black/60">
                if they get stuck in solving a question, coders would look for help on YouTube or
                the Solutions tab on respective platforms. They needed relevant guidance in a
                step-by-step manner and personalised to their own approaches and code.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 py-4">
              <StickyNote text="THIS YOUTUBER CAN'T SEE MY CODE!!" bg="#eff4d6" color="#6a7b12" />
              <StickyNote text="HOW DO TOP SDE-S APPROACH THIS?" bg="#eff4d6" color="#6a7b12" />
              <div className="size-[140px] shrink-0 shadow-[0px_2px_3px_rgba(0,0,0,0.5)] md:size-[180px]">
                <Image src={IMG + "problem3-char.png"} alt="" width={512} height={512} className="size-full object-cover" />
              </div>
              <StickyNote text="I HAVE TO DECODE HOW THIS PERSON CODED THIS SOLUTION..." bg="#eff4d6" color="#6a7b12" />
              <StickyNote text="THIS VIDEO DOESN'T ANSWER MY DOUBT..." bg="#eff4d6" color="#6a7b12" />
              <StickyNote text="I'LL HAVE TO COPY PASTE ALL OF THIS TO CHATGPT NOW.. UGH" bg="#eff4d6" color="#6a7b12" />
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <Eyebrow>problem #4</Eyebrow>
              <p className="font-satoshi text-xl leading-8 tracking-[-0.4px] text-black">
                On YouTube, learners would invest a lot of time learning but still felt a lack in
                confidence.
              </p>
              <p className="font-satoshi text-base leading-7 text-black/60">
                Almost every person we know learns on YouTube. Users spent a lot of time on videos
                either learning something new, unblocking themselves or revising something old.
                Although they were very happy with the content, they would have difficulty being
                confident about their learnings compared to learning something with a
                friend/mentor.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 py-4">
              <StickyNote text="WHAT ARE SOME OTHER EXAMPLES OF THIS?" bg="#ede2f7" color="#7334b2" />
              <StickyNote text="WATCHED 3 VIDEOS... DID I WASTE MY TIME?" bg="#ede2f7" color="#7334b2" />
              <div className="size-[140px] shrink-0 shadow-[0px_2px_3px_rgba(0,0,0,0.5)] md:size-[180px]">
                <Image src={IMG + "problem4-char.png"} alt="" width={512} height={512} className="size-full object-cover" />
              </div>
              <StickyNote text="LET ME EXPLAIN THIS video's concept TO MYSELF AS A TEST" bg="#ede2f7" color="#7334b2" />
              <StickyNote text="LOST FOCUS AGAIN... LET'S REWATCH" bg="#ede2f7" color="#7334b2" />
              <StickyNote text="INTERVIEW IS IN 2 HRS... HAVE TO REVISE 3 LONG VIDEOS" bg="#ede2f7" color="#7334b2" />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-satoshi text-xl leading-8 tracking-[-0.4px] text-black">
              Thus, our problem statement became -
            </p>
            <div className="bg-[#da2a2a] p-6 shadow-[6px_6px_0px_0px_#d6f0f5,3px_3px_0px_0px_#ffbf7f]">
              <p className="font-satoshi text-xl leading-8 tracking-[-0.4px] text-white">
                How might we provide personalised mentorship for software developers so that they
                can feel accompanied as well as supported enough to become independent and
                confident problem solvers?
              </p>
            </div>
          </div>
        </Col>

        {/* SOLUTIONS - BLACK SECTION */}
        <div className="flex w-full flex-col gap-16 bg-black py-16 md:gap-24 md:py-24">
          <Col className="flex flex-col gap-3">
            <H2 dark>Solutions and Impact we brought</H2>
            <p className="font-satoshi text-base leading-7 text-[rgba(250,250,250,0.7)]">
              I brought in the simplest design solutions after intense research and understanding
              technical possibilities and constraints from our developers.
            </p>
          </Col>

          {/* Solution 1 */}
          <Col className="flex flex-col gap-6">
            <Eyebrow dark>SOLUTION #1</Eyebrow>
            <p className="font-satoshi text-xl leading-8 tracking-[-0.4px] text-[#fafafa]">
              I designed &ldquo;Easy Actions&rdquo; right into the LeetCode interface
            </p>
            <p className="font-satoshi text-base leading-[26px] text-[rgba(250,250,250,0.7)]">
              This simple solution didn&rsquo;t just make it super accessible and easy to start
              talking to mentor, the position of the elements directly next to their code, and
              their errors, made the users instantly feel like the help they would get would be{" "}
              <span className="text-[#fafafa]">100% personalised</span> to their own work.
            </p>
            <div className="bg-[rgba(250,250,250,0.08)] p-6 md:p-12">
              <div className="border-4 border-[#f993f4]">
                <Image src={IMG + "sol1.png"} alt="" width={910} height={648} className="w-full object-cover" />
              </div>
            </div>
            <StatBar
              bg="#f993f4"
              stats={[
                { value: "5x", label: "message initiation from 17% to 84% of total installs" },
                { value: "10x", label: "engagement from 2→20 messages per user" },
                { value: "50%", label: "Week 1 retention which was 10% before" },
                { value: "38%", label: "Week 4 retention which was 3% before" },
              ]}
            />
          </Col>

          {/* Solution 2 */}
          <Col className="flex flex-col gap-6">
            <Eyebrow dark>SOLUTION #2</Eyebrow>
            <p className="font-satoshi text-xl leading-8 tracking-[-0.4px] text-[#fafafa]">
              I redesigned the floating chat to a second split tab design - enabling devs to
              change context as user switched tabs, making the AI mentor truly aware.
            </p>
            <p className="font-satoshi text-base leading-[26px] text-[rgba(250,250,250,0.7)]">
              This solution was proposed by our developers to overcome the technical challenge of
              context switch. This redesign also gave us an opportunity for a more mature look. It
              also allowed users to access the extension without it taking up space in their
              working area.
            </p>
            <div className="flex flex-col gap-4 bg-[rgba(250,250,250,0.08)] p-6 md:p-12">
              <div className="border-4 border-[#f69f3b]">
                <Image src={IMG + "sol2-after.png"} alt="" width={1024} height={633} className="w-full object-cover" />
              </div>
              <p className="font-gochi text-center text-sm text-[#f69f3b]">Changes context</p>
            </div>
            <div className="flex flex-col items-center gap-6 bg-[rgba(250,250,250,0.08)] p-6 md:flex-row md:justify-center md:gap-12 md:p-12">
              <div className="flex flex-col items-center gap-4">
                <p className="font-satoshi text-sm tracking-[9px] text-[#fafafa]">BEFORE</p>
                <div className="w-[180px] border-4 border-[#f69f3b]">
                  <Image src={IMG + "sol2-before-small.png"} alt="" width={548} height={1024} className="w-full object-cover" />
                </div>
                <p className="font-gochi text-center text-sm text-[#f69f3b]">
                  Floats on top of content
                </p>
              </div>
              <div className="flex flex-col items-center gap-4">
                <p className="font-satoshi text-sm tracking-[9px] text-[#fafafa]">AFTER</p>
                <div className="w-[180px] border-4 border-[#f69f3b]">
                  <Image src={IMG + "sol2-after-small.png"} alt="" width={552} height={1024} className="w-full object-cover" />
                </div>
                <p className="font-gochi text-center text-sm text-[#f69f3b]">
                  Opens as a split side tab
                </p>
              </div>
            </div>
            <StatBar
              bg="#f69f3b"
              stats={[
                {
                  value: "60",
                  label:
                    "NPS with “It always has context of what I’m doing” chosen as the top reason by promoters",
                },
                {
                  value: "92%",
                  label:
                    "users in interviews mentioned that “it always knows what page I’m on”",
                },
              ]}
            />
          </Col>

          {/* Solution 3 */}
          <Col className="flex flex-col gap-6">
            <Eyebrow dark>SOLUTION #3</Eyebrow>
            <p className="font-satoshi text-xl leading-8 tracking-[-0.4px] text-[#fafafa]">
              On YouTube, we introduced Dynamic Follow-ups and Quizzes as overlays on the video
              player&rsquo;s interface.
            </p>
            <p className="font-satoshi text-base leading-[26px] text-[rgba(250,250,250,0.7)]">
              These follow-up questions were designed to answer doubts or create curiosity about
              the content and dig deeper. The quizzes popping up in between would keep users
              attentive and validate their learning. Their frequencies were decided after a series
              of A/B tests.
            </p>
            <div className="flex flex-col gap-3 bg-[rgba(250,250,250,0.08)] p-6 md:p-12">
              <div className="border-4 border-[#3ba8f6]">
                <Image src={IMG + "sol3-video.png"} alt="" width={566} height={404} className="w-full object-cover" />
              </div>
              <p className="font-satoshi text-xs italic text-[rgba(250,250,250,0.7)]">
                Dynamic Follow-ups come up in between. Propilot is always available on the video
                with other static follow-ups as well.
              </p>
            </div>
            <div className="flex flex-col gap-3 bg-[rgba(250,250,250,0.08)] p-6 md:p-12">
              <div className="border-4 border-[#3ba8f6]">
                <Image src={IMG + "sol3-quiz.png"} alt="" width={1024} height={796} className="w-full object-cover" />
              </div>
              <p className="font-satoshi text-xs italic text-[rgba(250,250,250,0.7)]">
                Quizzes spaced out between videos
              </p>
            </div>
            <StatBar
              bg="#3ba8f6"
              stats={[
                { value: "87%", label: "users mention increase in confidence, retention" },
                { value: "23%", label: "increase in interactions" },
                { value: "51K", label: "quizzes taken" },
                { value: "10.5K", label: "dynamic follow-ups clicked" },
              ]}
            />
          </Col>

          {/* Solution 4 */}
          <Col className="flex flex-col gap-6">
            <Eyebrow dark>SOLUTION #4</Eyebrow>
            <p className="font-satoshi text-xl leading-8 tracking-[-0.4px] text-[#fafafa]">
              We created downloadable Summaries and Key Terms on YouTube with follow-up questions
              inside to aid retention, revision and saving time.
            </p>
            <p className="font-satoshi text-base leading-[26px] text-[rgba(250,250,250,0.7)]">
              Users take a lot of notes and never return to them. Also, a lot of them have saved
              videos that they refer to before exams or interviews to review key definitions or
              concepts. The time-stamped summaries and key terms help them save time from
              scrubbing hours of videos.
            </p>
            <div className="flex flex-col gap-3 bg-[rgba(250,250,250,0.08)] p-6 md:p-12">
              <div className="border-4 border-[#d5cc48]">
                <Image src={IMG + "sol4-summary.png"} alt="" width={910} height={520} className="w-full object-cover" />
              </div>
              <p className="font-satoshi text-xs italic text-[rgba(250,250,250,0.7)]">
                Summary and Key Notes are generated on request
              </p>
            </div>
            <div className="flex flex-col gap-6 bg-[rgba(250,250,250,0.08)] p-6 md:flex-row md:p-8">
              <div className="flex flex-1 flex-col gap-3">
                <div className="border-4 border-[#d5cc48]">
                  <Image src={IMG + "sol4-detail1.png"} alt="" width={512} height={682} className="w-full object-cover" />
                </div>
                <p className="font-satoshi text-xs italic text-[rgba(250,250,250,0.7)]">
                  Time-stamped summaries with follow-ups
                </p>
              </div>
              <div className="flex flex-1 flex-col gap-3">
                <div className="border-4 border-[#d5cc48]">
                  <Image src={IMG + "sol4-detail2.png"} alt="" width={646} height={946} className="w-full object-cover" />
                </div>
                <p className="font-satoshi text-xs italic text-[rgba(250,250,250,0.7)]">
                  Key Terms used in the video
                </p>
              </div>
            </div>
            <StatBar
              bg="#d5cc48"
              stats={[
                { value: "15.5K", label: "summaries and key terms generated" },
                { value: "50%", label: "users mention ease in revising before imp. events" },
                { value: "30%", label: "users mention using summaries to filter long videos" },
                { value: "25%", label: "download rate" },
              ]}
            />
          </Col>

          {/* Achievements */}
          <Col className="flex flex-col gap-3">
            <H2 dark>Major Achievements that followed</H2>
            <p className="font-satoshi text-base leading-7 text-[rgba(250,250,250,0.7)]">
              Propilot AI as an extension has seen remarkable growth since its launch. The
              solutions we worked on in the first 3 months worked and have constantly given us
              direction since.
            </p>
          </Col>
          <Col className="flex flex-col items-center gap-8 md:flex-row md:items-start">
            <div className="w-full max-w-[280px] shrink-0">
              <Image src={IMG + "achievements-phone.png"} alt="" width={369} height={694} className="w-full object-contain" />
            </div>
            <div className="flex w-full flex-1 flex-col gap-4">
              <div className="bg-[#f993f4] p-6">
                <p className="font-satoshi text-[32px] font-black tracking-[-1.5px] text-black md:text-[40px]">
                  50,000 users
                </p>
                <p className="font-satoshi text-sm text-black">in 6 months ⚡️</p>
              </div>
              <div className="bg-[#f69f3b] p-6">
                <p className="font-satoshi text-[32px] font-black tracking-[-1.5px] text-black md:text-[40px]">
                  Featured
                </p>
                <p className="font-satoshi text-sm text-black">
                  tag given by Chrome in just 2 months
                </p>
              </div>
              <div className="bg-[#3ba8f6] p-6">
                <p className="font-satoshi text-[32px] font-black tracking-[-1.5px] text-black md:text-[40px]">
                  Rated 4.6 ⭐️
                </p>
                <p className="font-satoshi text-sm text-black">by 600 users</p>
              </div>
            </div>
          </Col>

          {/* Quote */}
          <Col className="pt-8">
            <p className="font-satoshi text-[22px] leading-[36px] tracking-[-0.4px] text-[#fafafa] md:text-[32px] md:leading-[52px]">
              Propilot AI was definitely a success! Metrics aside, we would constantly hear from
              our users how it has become a{" "}
              <span className="text-[#c6f300]">part of their workflows,</span> helps them solve
              problems in <span className="text-[#c6f300]">half the time</span> and most
              importantly, how it has been designed to{" "}
              <span className="text-[#c6f300]">get them to think</span> - not to give them a
              solution.
            </p>
          </Col>
        </div>

        {/* RESEARCH */}
        <Col className="flex flex-col gap-3 pb-12 pt-16 md:pt-24">
          <H2>Research that drove the project</H2>
          <p className="font-satoshi text-base leading-7 text-black/60">
            This lasted for around 2 weeks. However, we kept validating the findings in our user
            interviews in the later months. This helped us to add even more use cases over time.
          </p>
        </Col>

        <Col className="flex flex-col gap-16 pb-16 md:pb-24">
          <div className="flex flex-col gap-6">
            <p className="font-satoshi text-xl leading-8 tracking-[-0.4px] text-black">
              I watched and analysed 30+ hours of human mentorship sessions
            </p>
            <p className="font-satoshi text-base leading-7 text-black/60">
              As India&rsquo;s only 1:1 Long Term Mentorship platform, Preplaced has a
              surmountable amount of valuable session recordings. With the consent of software
              development mentors, I personally analysed some sessions to understand how they are
              conducted, if there are any patterns in different users and any other insight that
              could give me ideas about interface solutions.
            </p>
            <div className="bg-black p-4">
              <div className="border-4 border-[#fe8902]">
                <Image src={IMG + "research-zoomcall.png"} alt="" width={1024} height={499} className="w-full object-cover" />
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="w-[170px] shrink-0">
              <Image src={IMG + "research-phone.png"} alt="" width={341} height={693} className="w-full object-cover" />
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-satoshi text-xl leading-8 tracking-[-0.4px] text-black">
                I took 20+ phone interviews with our users to understand what are the problems
                they face when learning on YouTube.
              </p>
              <p className="font-satoshi text-base leading-7 text-black/60">
                These users were chosen to cover all kinds of personas - freshers in 2nd and 4th
                year of their college, working professionals in SDE/SDET/QA roles in all sorts of
                companies and with different levels of experience. While most were preparing for
                interviews, some were just upskilling. YouTube is a common platform to learn from
                for all these personas.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="w-[170px] shrink-0">
              <Image src={IMG + "research-whatsapp.png"} alt="" width={341} height={694} className="w-full object-cover" />
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-satoshi text-xl leading-8 tracking-[-0.4px] text-black">
                We organised study groups on WhatsApp to understand common problems and emotional
                challenges.
              </p>
              <p className="font-satoshi text-base leading-7 text-black/60">
                This exercise proved to be super useful in understanding how different levels of
                developers have unique problems and what are their other motivational
                expectations beyond just coding help. For example, beginners would freak out about
                time to solve problems whereas intermediates generally want to understand more
                efficient solutions from the community.
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-8 md:flex-row">
            <div className="flex w-full shrink-0 flex-col gap-4 md:w-[220px]">
              <Image src={IMG + "research-reddit.png"} alt="Reddit" width={512} height={267} className="w-full object-cover" />
              <div className="border border-black/10">
                <Image src={IMG + "research-tuf.png"} alt="take U forward" width={512} height={274} className="w-full object-cover" />
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-satoshi text-xl leading-8 tracking-[-0.4px] text-black">
                Developers are very active on Reddit and love Striver&rsquo;s YouTube content.
              </p>
              <p className="font-satoshi text-base leading-7 text-black/60">
                Platforms like Reddit validate common &ldquo;stuck&rdquo; points of developers
                when they attempt problem solving alone. They also usually consume a lot of
                Striver&rsquo;s content on YouTube (TuF) and even follow his DSA sheet
                religiously. Studying these helped us determine what kind of guidance works for
                this audience. All wasn&rsquo;t perfect here though. Even after his fantastic
                content, we heard from people about feelings of despair and no progress. Studying
                this helped us develop solutions for YouTube and plan features for the future.
              </p>
            </div>
          </div>
        </Col>

        {/* FINDINGS */}
        <Col className="flex flex-col gap-3 pb-12">
          <H2>Findings and insights that drove my design decisions</H2>
          <p className="font-satoshi text-base leading-7 text-black/60">
            These insights were driven from the research we conducted. They did not just give us
            ideas for solutions, but also provided direction for things like what UX language to
            adopt.
          </p>
        </Col>

        <Col className="flex flex-col gap-16 pb-16 md:pb-24">
          {/* Finding 1 */}
          <div className="flex flex-col gap-4">
            <Eyebrow>FINDING #1</Eyebrow>
            <p className="font-satoshi text-xl leading-8 tracking-[-0.4px] text-black">
              💡 Within all the technical jargon in questions on Reddit, WhatsApp or mentorship
              sessions, there were clear patterns.
            </p>
            <p className="font-satoshi text-base leading-7 text-black/60">
              I collected several questions that mentees would ask in varied technical ways and
              tried to reduce them to a more standardised form. Before this exercise, everything
              seemed to be very random. It was then easy to categorise these into buckets.
            </p>
            <Image src={IMG + "finding-notebook.png"} alt="" width={1400} height={1086} className="w-full object-cover" />
          </div>

          {/* Finding 2 */}
          <div className="flex flex-col gap-4">
            <Eyebrow>FINDING #2</Eyebrow>
            <p className="font-satoshi text-xl leading-8 tracking-[-0.4px] text-black">
              Solo YouTube learners blamed themselves for some persistent emotional struggles.
              Those under human mentors, don&rsquo;t.
            </p>
            <p className="font-satoshi text-base leading-7 text-black/60">
              The following 3 problems were recurring in almost every user I spoke to. Human
              mentors have a way of keeping up attention and motivation in their mentees using
              many tools like accountability, evaluations, etc. We could do the same for these
              struggling learners.
            </p>
            <div className="flex flex-col gap-6 pt-4 md:flex-row">
              <div className="flex flex-1 flex-col shadow-[3px_3px_0px_0px_#8b8b7c]">
                <div className="flex flex-1 flex-col gap-4 bg-[#f2f2f2] p-5">
                  <p className="font-satoshi text-[15px] text-black">
                    🔴 Confused because too much to choose from on &ldquo;Home&rdquo; and
                    &ldquo;Recommended&rdquo;
                  </p>
                  <p className="font-satoshi text-sm leading-6 text-black/60">
                    Possible solutions to this could be a personalised roadmap, relevancy scores
                    next to videos, etc. This would require more than we could afford and
                    developer manpower.
                  </p>
                  <div className="mt-auto flex flex-col gap-1 pt-3 font-satoshi text-sm text-black">
                    <p>Effort : High</p>
                    <p>Impact : Medium</p>
                  </div>
                </div>
                <div className="flex items-center justify-center bg-[#c4c4ba] py-2">
                  <p className="font-satoshi text-[10px] tracking-[1.2px] text-[#404040]">
                    ❌ PICK UP LATER
                  </p>
                </div>
              </div>
              <div className="flex flex-1 flex-col shadow-[3px_3px_0px_0px_#0d730d]">
                <div className="flex flex-1 flex-col gap-4 bg-[#d9f5da] p-5">
                  <p className="font-satoshi text-[15px] text-black">
                    🔴 Lack of confidence in whether they learnt something fully and all queries
                    are answered
                  </p>
                  <p className="font-satoshi text-sm leading-6 text-black/60">
                    Spacing out quizzes in a session of learning increases content retention and
                    allows learners to feel tested. Predicting queries and showing them at times
                    without distraction could also help.
                  </p>
                  <div className="mt-auto flex flex-col gap-1 pt-3 font-satoshi text-sm text-black">
                    <p>Effort : Low</p>
                    <p>Impact : High</p>
                  </div>
                </div>
                <div className="flex items-center justify-center bg-[#8de28f] py-2">
                  <p className="font-satoshi text-[10px] tracking-[1.2px] text-[#128614]">
                    ✅ CHOSEN TO SOLVE
                  </p>
                </div>
              </div>
              <div className="flex flex-1 flex-col shadow-[3px_3px_0px_0px_#0d730d]">
                <div className="flex flex-1 flex-col gap-4 bg-[#d9f5da] p-5">
                  <p className="font-satoshi text-[15px] text-black">
                    🔴 Anxious about wasting time revising concepts from long videos
                  </p>
                  <p className="font-satoshi text-sm leading-6 text-black/60">
                    Some people said that making notes helps with this, but building this habit is
                    also a struggle. We thought that if Propilot could aid revision in a helpful
                    way with attached time stamps, that&rsquo;d help.
                  </p>
                  <div className="mt-auto flex flex-col gap-1 pt-3 font-satoshi text-sm text-black">
                    <p>Effort : Medium</p>
                    <p>Impact : High</p>
                  </div>
                </div>
                <div className="flex items-center justify-center bg-[#8de28f] py-2">
                  <p className="font-satoshi text-[10px] tracking-[1.2px] text-[#128614]">
                    ✅ CHOSEN TO SOLVE
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 pt-4 text-center md:flex-row">
              <p className="font-gochi flex-1 text-lg text-[#138715]">
                This led to quizzes and dynamic queries overlay on the video player
              </p>
              <p className="font-gochi flex-1 text-lg text-[#138715]">
                Time stamped summary, key terms and relevant followups inside them
              </p>
            </div>
          </div>

          {/* Finding 3 */}
          <div className="flex flex-col gap-4">
            <Eyebrow>FINDING #3</Eyebrow>
            <p className="font-satoshi text-xl leading-8 tracking-[-0.4px] text-black">
              💡 Some areas of the screen were used more than most. These are where I designed our
              interaction points.
            </p>
            <p className="font-satoshi text-base leading-7 text-black/60">
              I noticed that more than 90% developers have a tendency to highlight specific
              portions of the screen. They did this not just when they had a question for the
              mentor but also when they were thinking about it by themselves.
            </p>
            <p className="font-satoshi text-base leading-7 text-black/60">
              On YouTube&rsquo;s video player, the edges remain free of main content. We used this
              space for dynamic follow up questions to not encroach useful space and still design
              with relevance. The recommendations section was also eyed a lot. We utilised that
              for summaries and key terms.
            </p>
            <div className="flex flex-col gap-8 bg-black p-4 md:p-8">
              <div className="flex flex-col gap-3">
                <div className="border-4 border-[#1691f5]">
                  <Image src={IMG + "finding-heatmap1.png"} alt="" width={1024} height={679} className="w-full object-cover" />
                </div>
                <p className="font-satoshi text-xs italic text-white/50">
                  This is a heatmap I designed for my understanding based on what I saw on the
                  shared screens in coding sessions
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <div className="border-[1.6px] border-[#1691f5]">
                  <Image src={IMG + "finding-heatmap2.png"} alt="" width={1024} height={555} className="w-full object-cover" />
                </div>
                <p className="font-satoshi text-xs italic text-white/50">
                  I used this to understand where to design dynamic follow-ups and summary
                  sections
                </p>
              </div>
            </div>
          </div>

          {/* Finding 4 */}
          <div className="flex flex-col gap-4">
            <Eyebrow>FINDING #4</Eyebrow>
            <p className="font-satoshi text-xl leading-8 tracking-[-0.4px] text-black">
              💡 UX copy and AI responses should be inspired from the best of favourite mentors and
              educators people swear by.
            </p>
            <p className="font-satoshi text-base leading-7 text-black/60">
              Although below I&rsquo;ve only included images of people who are recognisable names
              in the industry, this exercise was mostly inspired by our own 2 years of experience
              with the amazing Preplaced mentors who have taught us the most about peak mentor
              etiquette.
            </p>
            <Image src={IMG + "finding-mentors.png"} alt="" width={700} height={543} className="w-full object-cover" />
          </div>
        </Col>

        {/* DESIGN ITERATIONS */}
        <Col className="flex flex-col gap-3 pb-12">
          <H2>3 major design iterations that made it to production</H2>
          <p className="font-satoshi text-base leading-7 text-black/60">
            During the course of the project, we carried out 3 design iterations. The 3rd
            iteration is currently on production. It&rsquo;s scalable and mature enough to remain
            unchanged for some time.
          </p>
        </Col>

        <Col className="flex flex-col gap-16 pb-16 md:pb-24">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="font-satoshi text-xl leading-8 tracking-[-0.4px] text-black">
                Design #1 : The MVP, tested by 100 people
              </p>
              <p className="font-satoshi text-base leading-7 text-black/60">
                Released as a part of ProPilot&rsquo;s lessons, this design was a floating tab on
                top of resources, to give the impression of the mentor always being present. We
                watched people use the product and also conducted short phone interviews to
                understand the pros and cons of it.
              </p>
            </div>
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="w-full shrink-0 border-4 border-[#f69f3b] md:w-[220px]">
                <Image src={IMG + "design1.png"} alt="" width={548} height={1024} className="w-full object-cover" />
              </div>
              <WhatWorked
                worked={[
                  "It was simple enough to hand off to developers in less than an hour",
                  "Users said it felt like the mentor was always present",
                ]}
                didnt={[
                  "The extension when open took space in the active tab, encroaching user’s working area.",
                  "It was difficult to differentiate between messages sent by AI Mentor and by user",
                  "Options to minimise, maximise and close the extension were confusing",
                  "Closed state of the extension also took up a lot of space",
                  "The design was not mature",
                ]}
              />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="font-satoshi text-xl leading-8 tracking-[-0.4px] text-black">
                Design #2 : The MVP improvement, tested for 2 months
              </p>
              <p className="font-satoshi text-base leading-7 text-black/60">
                This design was well received by the users who said it was a massive improvement
                over the MVP. However, when we thought of scaling the product to add more
                features, we kept running into design problems. Users also faced some delayed
                processing around the input area.
              </p>
            </div>
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="w-full shrink-0 border-4 border-[#3ba8f6] md:w-[220px]">
                <Image src={IMG + "design2.png"} alt="" width={552} height={1024} className="w-full object-cover" />
              </div>
              <WhatWorked
                worked={[
                  "Now the extension opened as a split second tab, not coming in the way of any active tab user was interacting with",
                  "Now there was clear distinction between mentor/mentee messages",
                  "This design removed confusing minimise/maximise options",
                  "The closed state of the extension is minimal in appearance",
                  "The design looks mature",
                ]}
                didnt={[
                  "It was not scalable. Features other than chat would be difficult to add here",
                  "A lot of actions cluttered around the text input field",
                ]}
              />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="font-satoshi text-xl leading-8 tracking-[-0.4px] text-black">
                Design #3 : Latest design in production for last few months
              </p>
              <p className="font-satoshi text-base leading-7 text-black/60">
                I designed this latest version to support future scalability and adding much more
                clarity for users about their primary actions and secondary ones (like support
                centre, share, etc). This version has been used by thousands of users and is also
                monetised.
              </p>
            </div>
            <div className="flex flex-col gap-8 md:flex-row">
              <div className="w-full shrink-0 border-4 border-[#f993f4] md:w-[220px]">
                <Image src={IMG + "design3.png"} alt="" width={549} height={1024} className="w-full object-cover" />
              </div>
              <WhatWorked
                worked={[
                  "We achieved scalability. New features like Paths now have their respective pages.",
                  "Dedicated side navigation improves information architecture.",
                  "The options that were once cluttering now rest in the sidebar in the bottom, with lesser hierarchy than the main features",
                ]}
                didnt={[]}
              />
            </div>
          </div>
        </Col>

        {/* CLOSING */}
        <Col className="flex flex-col gap-6 pb-20">
          <p className="font-satoshi text-base leading-7 text-black">
            This has been one of my favourite projects I&rsquo;ve worked on at Preplaced. I took
            on a lot of ownership and responsibility for the first time and oversaw not just
            design and research, but setting up analytics, MixPanel reports, writing PRDs, product
            testing and even prompt engineering.
          </p>
          <p className="font-satoshi text-base leading-7 text-black">
            Throughout the project I was constantly in touch with a lot of our users and had a
            good idea of what the pull in the market was for and even better, what I knew would
            most probably not generate enough interest to cause business impact. This led my
            co-founder and CPO also contribute to the product roadmap and feature strategies.
          </p>
          <p className="font-satoshi text-base text-black">Thank you for reading :)</p>
        </Col>

        <FaqAccordion title="Have questions?" items={faqs} />

        <KeepReading cases={related} />
      </main>
      <Footer />
    </>
  );
}
