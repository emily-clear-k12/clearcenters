// Signal Check Weigh-In — companion to 3.6A-SC (magnetism).
// Reuses Field Lab 3 evidence world. G3 dropdown.

export const PUBLIC_CASE = {
  caseShape: "weigh_in",
  standard: "3.6A-SC-WI",
  teksLabel: "3.6A",
  grade: 3,
  subject: "Science",
  title: "Magnet Stick-Off",
  tagline: "Do magnets stick to every metal?",
  stemMode: "dropdown",

  dispute: {
    prompt: "Two Cadets locked in. Who's right?",
    context: "Field Lab 3 tested a bar magnet on metal objects. One Cadet says magnets stick to every metal. The other says only some metals stick.",
  },

  sides: [
    { id: "A", label: "SIDE A", claim: "Magnets stick to every metal object." },
    { id: "B", label: "SIDE B", claim: "Magnets only stick to some metals — not all." },
  ],

  evidence: [
    { id: "paperclip", text: "Paper clip snapped to the magnet from about 2 cm away.", supports: "B" },
    { id: "nail", text: "Iron nail pulled toward the magnet the instant it got close.", supports: "B" },
    { id: "foil", text: "Aluminum foil held flat against the magnet — didn't move at all.", supports: "B" },
    { id: "penny", text: "Copper penny held flat against the magnet — didn't move at all.", supports: "B" },
    { id: "cap", text: "Plastic bottle cap sits off to the side — not metal, never tested.", supports: "neither" },
  ],

  echo: {
    main: "Transmission split, Cadet. Two sides. One stronger signal.",
    sort: "Sort each reading to Side A, Side B, or Neither. Practice only — lock when ready.",
    pick: "Pick the side the evidence backs. Tap your proof from the readings.",
    reflect: "Ruling locked in draft. One more self-check before you send it.",
  },

  selfCheckQuestions: [
    "Did I pick a side, not just leave it blank?",
    "Did I use readings that actually match my side?",
    "Did I notice the foil and penny stayed still?",
    "Did I avoid counting the plastic cap as metal proof?",
    "Would my ruling still make sense if I re-read the readings?",
  ],
};
