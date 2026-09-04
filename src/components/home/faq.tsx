import { FaqAccordion } from "@/components/faq-accordion";

const faqs = [
  {
    q: "How do you balance user experience with business metrics?",
    a: "I treat them as the same goal, not competing ones — the best UX decisions are the ones that also move the metric, and I design experiments to prove it before committing engineering time.",
  },
  {
    q: "Do you approach design from a growth hacking perspective?",
    a: "I blend growth thinking with craft: I look for the smallest, most testable change that unlocks the biggest lift, then layer in the polish once the direction is validated.",
  },
  {
    q: "Can you work on projects beyond growth-focused design?",
    a: "Yes — growth is my specialty, but I regularly work on brand, product, and 0-to-1 design work where the goal is clarity and trust rather than a single conversion metric.",
  },
  {
    q: "How does responsive web design translate to mobile app design?",
    a: "The underlying principles (hierarchy, touch targets, content priority) carry over, but I design mobile app flows natively rather than shrinking a desktop layout down.",
  },
];

export function Faq() {
  return <FaqAccordion title="FAQs" items={faqs} />;
}
