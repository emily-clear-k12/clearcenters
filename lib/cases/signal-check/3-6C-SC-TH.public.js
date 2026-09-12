// Signal Check Thread — companion to 3.6C-SC (condensation).

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "3.6C-SC-TH",
  teksLabel: "3.6C",
  grade: 3,
  subject: "Science",
  title: "Thread: Leaky Can?",
  tagline: "Picnic Table feed says the can is leaking.",
  stemMode: "dropdown",

  transmission: {
    claimHeadline: "This ice-cold can is leaking from the inside — that's the only way it could get wet.",
    source: "Picnic Table Feed",
    loggedAt: "Trial #4",
  },

  comments: [
    { id: "c1", persona: "Cadet Sip", text: "It's wet outside = soda escaping. Obvious!", correctFlag: "misleading" },
    { id: "c2", persona: "Cadet Seal", text: "Tab's still sealed and I see zero holes.", correctFlag: "helpful" },
    { id: "c3", persona: "Cadet Clear", text: "Those drops are clear. The soda is dark brown.", correctFlag: "helpful" },
    { id: "c4", persona: "Cadet Chill", text: "Warm can next to it stayed dry — cold is the clue.", correctFlag: "helpful" },
    { id: "c5", persona: "Cadet Chip", text: "Anyone else want chips with their soda?", correctFlag: "off_topic" },
    { id: "c6", persona: "Cadet Peel", text: "The peeling label proves soda is sneaking out the side.", correctFlag: "misleading" },
    { id: "c7", persona: "Cadet Mist", text: "Maybe water in the air turns to drops on cold things?", correctFlag: "needs_evidence" },
  ],

  evidence: [
    { id: "sealed_check", text: "Pull tab fully sealed — never opened." },
    { id: "drop_color", text: "Outside drops are completely clear." },
    { id: "soda_color", text: "Soda inside is dark brown." },
    { id: "warm_can", text: "Warm sealed can stayed completely dry." },
    { id: "cooling_note", text: "Water in the air can turn into drops on a much colder surface." },
  ],

  echo: {
    main: "Thread locked. Flag the picnic chatter.",
    flag: "Helpful / Misleading / Off-topic / Needs evidence — tap each one.",
    reply: "Reply to the leak claim. Bring readings. Keep it punchy.",
    reflect: "Almost clear, Cadet. Self-check, then send the report.",
  },

  selfCheckQuestions: [
    "Did I flag every comment?",
    "Did I mark seal/color/warm-can notes as helpful?",
    "Did I catch the leak claim and label story as misleading?",
    "Did my reply say the drops came from the air?",
    "Did I avoid saying the can is leaking?",
  ],
};
