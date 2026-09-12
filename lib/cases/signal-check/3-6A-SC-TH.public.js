// Signal Check Thread — companion to 3.6A-SC (magnetism).
// Soft Crystal thread of Cadet chatter about the Field Lab 3 claim.

export const PUBLIC_CASE = {
  caseShape: "thread",
  standard: "3.6A-SC-TH",
  teksLabel: "3.6A",
  grade: 3,
  subject: "Science",
  title: "Thread: Every Metal?",
  tagline: "Cadets are buzzing about magnets and metal.",
  stemMode: "dropdown",

  transmission: {
    claimHeadline: "Magnets stick to every metal object.",
    source: "Field Lab 3 Feed",
    loggedAt: "07:42:19",
  },

  comments: [
    { id: "c1", persona: "Cadet Spark", text: "Paper clip AND iron nail both jumped to the magnet — so metals stick!", correctFlag: "needs_evidence" },
    { id: "c2", persona: "Cadet Quill", text: "Hold up — the foil and penny are metal too, and they just sat there.", correctFlag: "helpful" },
    { id: "c3", persona: "Cadet Zoom", text: "My lunch tray is metal-colored so magnets must stick to it too.", correctFlag: "misleading" },
    { id: "c4", persona: "Cadet Nova", text: "What's for snack after lab?", correctFlag: "off_topic" },
    { id: "c5", persona: "Cadet Beam", text: "If foil and penny didn't move, the claim 'every metal' is cracked.", correctFlag: "helpful" },
    { id: "c6", persona: "Cadet Drift", text: "Plastic cap didn't stick either — that proves all metals fail!", correctFlag: "misleading" },
  ],

  evidence: [
    { id: "paperclip", text: "Paper clip snapped straight to the magnet." },
    { id: "nail", text: "Iron nail pulled in the moment it got close." },
    { id: "foil", text: "Aluminum foil — metal — didn't move at all." },
    { id: "penny", text: "Copper penny — metal — didn't move at all." },
    { id: "cap", text: "Plastic cap isn't metal; it wasn't part of the magnet test." },
  ],

  echo: {
    main: "Thread locked in, Cadet. Flag the chatter before you reply.",
    flag: "Tap each comment: Helpful, Misleading, Off-topic, or Needs evidence.",
    reply: "Craft your reply. Pull proof from the readings — keep it short.",
    reflect: "Flags + reply ready. Self-check, then beam it up.",
  },

  selfCheckQuestions: [
    "Did I flag every comment in the thread?",
    "Did I mark the foil/penny comments as helpful?",
    "Did I catch the plastic-cap mix-up as misleading?",
    "Did my reply use real readings, not just vibes?",
    "Did I say the 'every metal' claim doesn't hold?",
  ],
};
