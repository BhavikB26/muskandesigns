import { FaqAccordion } from "@/components/faq-accordion";

const faqs = [
  {
    q: "How do you balance user experience with business metrics?",
    a: "I prioritize user-centric design while being mindful of business outcomes. By deeply understanding user needs through research, I create intuitive experiences that naturally drive key metrics. This balance ensures sustainable growth rather than focusing solely on quick wins.",
  },
  {
    q: "Do you approach design from a growth hacking perspective?",
    a: "No. While I have a strong background in growth design and data-driven strategies, I believe in balancing user needs with business goals. My approach is holistic, considering user experience, accessibility, and long-term product success, not just short-term gains.",
  },
  {
    q: "Can you work on projects beyond growth-focused design?",
    a: "Absolutely. I have experience across different design disciplines, from creating seamless onboarding flows to establishing design systems and enhancing brand experiences. My skill set is adaptable and problem-driven, allowing me to work on a wide range of projects.",
  },
  {
    q: "How does responsive web design translate to mobile app design?",
    a: [
      "My portfolio focuses on responsive web design because the companies I've worked with didn't have mobile apps tied to revenue. However, the skills I've honed translate seamlessly to mobile app design.",
      "Responsive design requires crafting user-centered experiences that adapt across devices, which mirrors the challenges of designing intuitive, touch-friendly mobile apps. Both disciplines demand expertise in interaction design, information architecture, accessibility, and solving for constraints like screen size and performance.",
      "Additionally, creating scalable design systems for responsive web has prepared me to build consistent, polished mobile interfaces. My ability to collaborate closely with cross-functional teams ensures smooth execution whether designing for web or mobile. These transferable skills enable me to approach mobile app projects with confidence and a strong foundation in user-first design principles.",
    ],
  },
];

export function Faq() {
  return (
    <FaqAccordion
      title="FAQs"
      items={faqs}
      className="bg-[linear-gradient(161.84deg,rgba(179,222,193,0.102)_0%,rgba(202,187,233,0.102)_50%,rgba(255,173,173,0.078)_100%)]"
    />
  );
}
