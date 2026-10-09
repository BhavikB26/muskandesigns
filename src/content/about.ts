/*
 * About section copy. Edit freely: this is a first draft in Muskan's voice.
 * (The earlier headline and paragraph matched another designer's site word for word, so they were replaced.)
 */
export const about = {
  headline: { lead: "I came to design through code.", italic: "I never really left." },
  paragraphs: [
    "I studied computer science, but the part I kept coming back to was how things felt to use. Design let me work on that directly, and knowing how things get built keeps my ideas grounded.",
    "Since then I’ve designed for an AI app builder, a mentorship platform and a health startup. Different problems, same habit: talk to the people using it, and keep at the details until it works for them.",
  ],
  // Personality chips (decorative labels).
  chips: [
    { label: "ENFP-T", icon: "puzzle", tint: "#f8c9c6" },
    { label: "Cancer", icon: "cancer", tint: "#d9cff2" },
    { label: "Enneagram 5", icon: "brain", tint: "#c6e7d2" },
  ],
} as const;
