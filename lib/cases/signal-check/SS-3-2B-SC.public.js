// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 3 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 3.2B covers meeting
// community needs. Stored with an "SS." prefix so this code can never
// collide with a Science case using the same bare TEKS number.
//
// Freshly scripted scenario (a street-crossing safety upgrade) — not a
// reworded version of Group Chat's SS.3.2B case, per the Signal Check
// checklist's anti-duplication rule.

export const PUBLIC_CASE = {
  standard: "SS.3.2B-SC",
  teksLabel: "3.2B",
  grade: 3,
  subject: "Social Studies",
  title: "Fix It the Same Way?",
  tagline: "If two streets need a safer crossing, they should get the exact same fix.",
  transmission: {
    claimHeadline: "If two streets need a safer crossing, they should get the exact same fix.",
    source: "City Public Works Department",
    loggedAt: "Street Safety Review",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/ss-3-2b-sc-field-report.jpg",
    imageCaption: "City Public Works — Street Safety Review",
    notes: "About 400 cars pass through Elm Street every hour during school pickup, and kids were waiting a long time to cross. The city installed a stoplight with a walk signal there. Birch Lane, near the park, only sees about 20 cars an hour, most driving slowly — so the city just painted a crosswalk and added a stop sign. Birch Lane hasn't had a single crossing incident reported all year, and a stoplight there would have cost the city far more than the crosswalk did. A parent still asked why every street couldn't just get the same stoplight Elm Street got, to be extra safe.",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Elm Street got a stoplight because so many cars pass through every hour.",
      correctVerdict: "True",
      reasonText: "About 400 cars an hour pass Elm Street during pickup — that's why the city installed a full stoplight with a walk signal there.",
      stemEvidenceIds: ["elm_traffic", "elm_fix"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Birch Lane got a painted crosswalk and stop sign instead, because its traffic is much lighter.",
      correctVerdict: "True",
      reasonText: "Birch Lane only sees about 20 cars an hour, so a crosswalk and stop sign were enough — it didn't need a full stoplight.",
      stemEvidenceIds: ["birch_traffic", "birch_fix"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Since both streets needed a safer crossing, Birch Lane should have gotten the exact same stoplight as Elm Street.",
      correctVerdict: "False",
      reasonText: "Birch Lane hasn't had a single crossing incident all year, and a stoplight costs far more to install than a crosswalk and sign — giving it the exact same fix as Elm Street wouldn't actually fix a real problem.",
      stemEvidenceIds: ["birch_incidents", "stoplight_cost"],
    },
  ],

  evidenceReadings: [
    { id: "elm_traffic", label: "Elm Street traffic count", reading: "About 400 cars pass Elm Street every hour during school pickup.", kind: "data" },
    { id: "elm_fix", label: "Elm Street work order", reading: "City installed a stoplight with a walk signal at Elm and 5th.", kind: "data" },
    { id: "birch_traffic", label: "Birch Lane traffic count", reading: "About 20 cars pass Birch Lane every hour, most driving slowly.", kind: "data" },
    { id: "birch_fix", label: "Birch Lane work order", reading: "City painted a crosswalk and added a stop sign near the park entrance.", kind: "data" },
    { id: "birch_incidents", label: "Birch Lane safety log", reading: "Zero crossing incidents reported on Birch Lane in the past year.", kind: "data" },
    { id: "stoplight_cost", label: "City cost estimate", reading: "A new stoplight costs about $50,000 to install — far more than a painted crosswalk and sign.", kind: "data" },
    { id: "sign_color", label: "Elm Street pole photo", reading: "The new stoplight pole was painted green to match the streetlights nearby.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["elm_traffic", "elm_fix"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["birch_traffic", "birch_fix"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["birch_incidents", "stoplight_cost"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["sign_color"] },
  ],

  echo: {
    main: "Public Works sent over their street safety review, Cadet. Let's check this claim.",
    scan: "One busy street, one quiet lane — read every work order carefully.",
    sort: "Notice how each street's fix pairs with its own traffic and safety data.",
    submit: "Tap each blank and pick your proof. No typing required, Cadet.",
    reflect: "Three verdicts filed. Give the report one more look before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict for all three signals?",
    "Did I mention how many cars pass Elm Street every hour?",
    "Did I mention how light Birch Lane's traffic is?",
    "Did I mention that Birch Lane hasn't had any crossing incidents?",
    "Did I avoid saying every street needs the exact same safety fix?",
  ],
};
