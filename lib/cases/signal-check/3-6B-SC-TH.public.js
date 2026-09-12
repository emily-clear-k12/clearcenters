// Signal Check Thread — companion to 3.6B-SC (sugar / solid vs liquid).

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "3.6B-SC-TH",
  teksLabel: "3.6B",
  grade: 3,
  subject: "Science",
  title: "Thread: Sugar Is Liquid?",
  tagline: "Kitchen Counter chat is heating up.",
  stemMode: "dropdown",

  transmission: {
    claimHeadline: "Sugar poured into a cup behaves just like water, so sugar must count as a liquid.",
    source: "Kitchen Counter Feed",
    loggedAt: "Trial #2",
  },

  comments: [
    { id: "c1", persona: "Cadet Whisk", text: "It poured into the cup! That's what liquids do — case closed.", correctFlag: "misleading" },
    { id: "c2", persona: "Cadet Cube", text: "Look closer — sugar made a cone pile. Water went flat.", correctFlag: "helpful" },
    { id: "c3", persona: "Cadet Lens", text: "Under the lens, each grain is still a tiny hard cube.", correctFlag: "helpful" },
    { id: "c4", persona: "Cadet Pop", text: "Can we investigate the cookie recipe next?", correctFlag: "off_topic" },
    { id: "c5", persona: "Cadet Dust", text: "Flour pours the same way and flour is a solid — pour ≠ liquid.", correctFlag: "helpful" },
    { id: "c6", persona: "Cadet Glow", text: "Sugar is whiter this month so it must be a different state of matter.", correctFlag: "misleading" },
    { id: "c7", persona: "Cadet Echo", text: "Maybe it's both solid AND liquid somehow?", correctFlag: "needs_evidence" },
  ],

  evidence: [
    { id: "cone_shape", text: "Poured sugar forms a sloped pile with a peak." },
    { id: "water_compare", text: "Poured water spreads out flat and level." },
    { id: "grain_photo", text: "Grains stay tiny hard cubes whether piled or spread." },
    { id: "flour_compare", text: "Flour pours and piles too — and flour is a solid." },
    { id: "definition_note", text: "Liquids take the container's shape; solids keep their own." },
  ],

  echo: {
    main: "Thread ping, Cadet. Flag the noise from the signal.",
    flag: "Mark each comment: Helpful, Misleading, Off-topic, or Needs evidence.",
    reply: "Reply to the claim. Use readings. Keep it Cadet-short.",
    reflect: "Flags + reply set. Self-check, then send.",
  },

  selfCheckQuestions: [
    "Did I flag every comment?",
    "Did I mark cone/grain/flour comments as helpful?",
    "Did I catch 'pours = liquid' as misleading?",
    "Did my reply say sugar is still a solid?",
    "Did I use at least one real reading in my reply?",
  ],
};
