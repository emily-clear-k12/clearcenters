// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.5.22C, TEKS 5.22C).

export const SERVER_CASE = {
  standard: "SS.5.22C",
  title: "It Only Changed One Thing",
  bigQuestion: "How can innovations in medicine, communication, and transportation create benefits for both individuals and society?",
  evidenceBank: [
    "A vaccine can protect an individual from a disease.",
    "A telephone can send information across long distances quickly.",
    "An airplane can move people and goods across long distances much faster than earlier travel."
  ],
  trapLine: "One invention, one benefit. Anything more is overthinking it.",
  castNames: {
    zoe: "Zoe One-Thing",
    med: "Dr. Mira Medicine",
    comms: "Cal Communication",
    transit: "Tia Transportation",
    link: "Link the Systems"
  },
  distractors: "Listing inventions without effects; giving only direct uses; claiming every innovation benefits everyone equally; confusing a possible effect with a guaranteed effect; ignoring individual vs society scale.",
  mustInclude: [
    "Explains a medicine benefit.",
    "Explains a communication benefit.",
    "Explains a transportation benefit.",
    "Traces a benefit beyond the direct use.",
    "Distinguishes individual and society-wide benefits."
  ],
};
