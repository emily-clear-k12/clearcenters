// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 3 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 3.6A covers supply and
// demand: "Explain how supply and demand affect the price of a good or
// service." Stored with an "SS." prefix so this code can never collide with
// a Science case using the same bare TEKS number (Science 3.6A is about
// magnetism, an entirely different topic).

export const PUBLIC_CASE = {
  standard: "SS.3.6A-SC",
  teksLabel: "3.6A",
  grade: 3,
  subject: "Social Studies",
  title: "Hot Day, Higher Price",
  tagline: "Lemonade always costs the same, no matter how hot it is outside.",
  transmission: {
    claimHeadline: "Lemonade always costs the same, no matter how hot it is outside.",
    source: "Maple Street Lemonade Stand",
    loggedAt: "One Week Sales Log",
  },

  // Grade 3: every blank is a tap-to-pick chip — no typing required.
  stemMode: "dropdown",

  verdictOptions: ["True", "Misleading", "False"],

  // The Scan screen leads with this — one photo plus a short field-note
  // paragraph — instead of a list of separate evidence cards. The discrete
  // evidenceReadings below still exist and still drive Sensor Sort and the
  // "Review the Evidence Again" panel on the Verdict screen; this is just
  // what the student reads first, written as a single field report.
  fieldReport: {
    image: "/signal-check/ss-3-6a-sc-field-report.jpg",
    imageCaption: "Maple Street Lemonade Stand — one week of sales",
    notes: "The lemonade stand wrote down its price every day. On the hottest day, the price went up to $2 a cup, and the stand sold out in an hour. On a cooler day, the price stayed at $1, and cups were left over. One day the stand almost ran out — only six cups left — so the price went up to $2.50. That same week, on a morning with a full pitcher, the price stayed at $1. Just to see what would happen, the stand tried charging $100 for one cup. Nobody bought it.",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The price of lemonade goes up on the hottest days.",
      correctVerdict: "True",
      reasonText: "On the hottest day in the log, the stand raised its price and still sold out fast — more people wanted lemonade, so the price went up.",
      stemEvidenceIds: ["hot_day", "cool_day"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "A cup of lemonade costs more when the stand is almost out of lemonade.",
      correctVerdict: "True",
      reasonText: "When only a few cups were left, the price went up compared to a morning with a full pitcher.",
      stemEvidenceIds: ["low_supply", "full_supply"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The stand could charge $100 for one cup and people would still buy it.",
      correctVerdict: "False",
      reasonText: "When the stand actually tried a much higher price, almost nobody bought a cup — customers walked right past.",
      stemEvidenceIds: ["overprice_day", "hot_day"],
    },
  ],

  // `reading` is a raw, un-categorized observation — deliberately NOT a
  // pre-sorted label so Screen 2 doesn't spoil the Sensor Sort game or the
  // Verdict reveal. Sort correctness is driven entirely by
  // sortBins.correctItemIds below, not by this text.
  evidenceReadings: [
    { id: "hot_day", label: "Saturday sales log", reading: "92°F outside — price raised to $2/cup — sold out in an hour.", kind: "data" },
    { id: "cool_day", label: "Tuesday sales log", reading: "74°F outside — price stayed at $1/cup — cups left over at closing.", kind: "data" },
    { id: "low_supply", label: "Sunday afternoon log", reading: "Only 6 cups of lemonade left — price raised to $2.50/cup for the rest of the day.", kind: "data" },
    { id: "full_supply", label: "Sunday morning log", reading: "Just opened with a full pitcher — price at $1/cup.", kind: "data" },
    { id: "overprice_day", label: "Wednesday experiment", reading: "Price raised to $100/cup for one hour — zero cups sold.", kind: "data" },
    { id: "sign_color", label: "Price sign", reading: "The price sign was painted a new color that day — same price as before.", kind: "distractor" },
  ],

  // sortBins are labeled by signal only — no sublabel that would hint at
  // the correct verdict before the student reaches the Verdict step.
  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["hot_day", "cool_day"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["low_supply", "full_supply"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["overprice_day"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["sign_color"] },
  ],

  echo: {
    main: "Sales log incoming, Cadet. Let's see if this claim holds up.",
    scan: "Three signals, six raw readings — nothing's sorted yet. Read carefully.",
    sort: "Nice work — notice how some readings pair up to prove the same signal.",
    submit: "Tap each blank and pick your proof. No typing required, Cadet.",
    reflect: "Three verdicts filed. Give the report one more look before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict for all three signals?",
    "Did I mention that the price went up on the hottest day?",
    "Did I mention that a low supply of lemonade made the price go up?",
    "Did I explain why almost nobody bought lemonade at $100 a cup?",
    "Did I avoid saying the price always stays exactly the same?",
  ],
};
