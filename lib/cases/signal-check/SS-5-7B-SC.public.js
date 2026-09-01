// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 5 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 5.7B: geographic
// factors that influence settlement patterns and the growth of towns.
//
// Rowan's Ford and Gault Hollow are freshly invented fictional settlements
// for this case — not the "Cedar Junction" scenario used in the Group Chat
// version of this standard (see COVERAGE_MAP.md / checklist rule 8).

export const PUBLIC_CASE = {
  standard: "SS.5.7B-SC",
  teksLabel: "5.7B",
  grade: 5,
  subject: "Social Studies",
  title: "Anywhere Will Do?",
  tagline: "A town can grow into a major city almost anywhere, as long as enough people move there.",
  transmission: {
    claimHeadline: "A town can grow into a major city almost anywhere, as long as enough people move there.",
    source: "Settlement Survey Records",
    loggedAt: "Founding-era survey",
  },

  stemMode: "open",

  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/ss-5-7b-sc-field-report.jpg",
    imageCaption: "Settlement Survey Records — Rowan's Ford & Gault Hollow",
    notes: "Two settlements founded around the same time tell very different stories. A land survey shows Gault Hollow sitting on dry, rocky soil with no nearby water source — and a founding record lists forty families who arrived hoping to build a town there. A later census shows Gault Hollow's population had barely changed decades after founding. Rowan's Ford, meanwhile, was built at a natural, shallow river crossing used by traders, with soil surveys showing flat, fertile farmland surrounding the settlement. Rowan's Ford grew steadily; Gault Hollow never did, despite its early founding crowd.",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Gault Hollow grew into a major town because enough people wanted to settle there.",
      correctVerdict: "False",
      reasonText: "Gault Hollow sat on dry, rocky land far from water or trade routes and never grew past a few families, no matter how many people wanted to settle there.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Rowan's Ford grew near a dependable river crossing that made it easy for goods and travelers to pass through.",
      correctVerdict: "True",
      reasonText: "Being on a trade route gave Rowan's Ford a steady reason to keep growing.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "A large group of settlers did try to found a town at Gault Hollow, so the site must have been a good choice.",
      correctVerdict: "Misleading",
      reasonText: "A big founding crowd couldn't make up for the site's lack of water and trade access, and the settlement stalled anyway.",
    },
    {
      id: "D",
      tag: "SIGNAL D",
      text: "Rowan's Ford also sat next to flat, fertile farmland, giving families a practical reason to settle there and stay.",
      correctVerdict: "True",
      reasonText: "Good farmland gave people a reason to stay long-term, helping the town keep growing.",
    },
  ],

  evidenceReadings: [
    { id: "gault_survey", label: "Gault Hollow land survey", reading: "A land survey shows Gault Hollow sitting on dry, rocky soil with no nearby water source.", kind: "document" },
    { id: "rowan_river", label: "Rowan's Ford river record", reading: "River records show Rowan's Ford built at a natural, shallow river crossing used by traders.", kind: "document" },
    { id: "gault_founders", label: "Gault Hollow founding record", reading: "A founding record lists forty families who first arrived to settle Gault Hollow.", kind: "document" },
    { id: "rowan_farmland", label: "Rowan's Ford soil survey", reading: "Soil surveys show flat, fertile farmland surrounding Rowan's Ford.", kind: "document" },
    { id: "gault_census", label: "Gault Hollow later census", reading: "A later census shows Gault Hollow's population had barely changed decades after founding.", kind: "data" },
    { id: "unrelated_weather", label: "Unrelated weather log", reading: "A weather log from a different, unconnected town, kept the same year.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["gault_survey", "gault_census"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["rowan_river"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["gault_founders"] },
    { id: "D", label: "SIGNAL D", correctItemIds: ["rowan_farmland"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["unrelated_weather"] },
  ],

  echo: {
    main: "An old settlement claim surfaced in the survey records, Cadet. Let's see if it holds up.",
    scan: "Four signals, six raw records — nothing's sorted yet. A 'grow anywhere' claim deserves a close look at both settlements.",
    sort: "Sorted. Notice how the survey and the census both back up the same signal about Gault Hollow.",
    submit: "No stems, no chips this time — write both the verdict and the reasoning yourself.",
    reflect: "Four verdicts filed. Give the full report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I write a verdict AND a reason for all four signals?",
    "Did I explain why Gault Hollow didn't grow despite having settlers?",
    "Did I mention the river crossing as a reason Rowan's Ford grew?",
    "Did I explain why a big founding crowd wasn't enough for Gault Hollow?",
    "Did I mention farmland as another reason Rowan's Ford kept growing?",
  ],
};
