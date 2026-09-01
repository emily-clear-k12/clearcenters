// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 3 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 3.7C covers matching
// government services to the right level of government. Stored with an
// "SS." prefix so this code can never collide with a Science case using
// the same bare TEKS number.
//
// Freshly scripted scenario (a community services directory) — not a
// reworded version of Group Chat's SS.3.7C case, per the Signal Check
// checklist's anti-duplication rule.

export const PUBLIC_CASE = {
  standard: "SS.3.7C-SC",
  teksLabel: "3.7C",
  grade: 3,
  subject: "Social Studies",
  title: "Whose Job Is It?",
  tagline: "If a service helps people, any level of government could be the one responsible for it.",
  transmission: {
    claimHeadline: "If a service helps people, any level of government could be the one responsible for it.",
    source: "Community Services Directory",
    loggedAt: "Government Services Guide",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/ss-3-7c-sc-field-report.jpg",
    imageCaption: "Community Services Directory — Government Services Guide",
    notes: "The city crew patches potholes on neighborhood streets like Main and Oak. The Texas Department of Public Safety issues driver's licenses at offices across the state. The U.S. Postal Service delivers mail to every address, and federal law says only the postal service can do that — not local governments. A student wrote, \"Since they're all government services, any one of them could handle any of these jobs.\"",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The city crew is who patches potholes on neighborhood streets.",
      correctVerdict: "True",
      reasonText: "The work order shows the City of Westview's own public works crew patched the potholes on Main Street.",
      stemEvidenceIds: ["pothole_log", "city_crew"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The state is who issues driver's licenses, not the local city.",
      correctVerdict: "True",
      reasonText: "The license paperwork is printed with the Texas state seal and issued by the state's Department of Public Safety, not any city office.",
      stemEvidenceIds: ["license_office", "state_seal"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Since all three are government services, the local city could just as easily handle mail delivery too.",
      correctVerdict: "False",
      reasonText: "Mail delivery is handled by the U.S. Postal Service, and federal law reserves that job for the postal service — a local city government isn't allowed to take it over.",
      stemEvidenceIds: ["mail_log", "postal_law"],
    },
  ],

  evidenceReadings: [
    { id: "pothole_log", label: "City work order", reading: "City crew patched 6 potholes on Main Street this week.", kind: "data" },
    { id: "city_crew", label: "City crew ID badge", reading: "Badge reads \"City of Westview Public Works.\"", kind: "data" },
    { id: "license_office", label: "License office visit", reading: "Driver's license office is run by the Texas Department of Public Safety.", kind: "data" },
    { id: "state_seal", label: "License paperwork", reading: "New license printed with the state seal of Texas.", kind: "data" },
    { id: "mail_log", label: "Mail delivery record", reading: "Mail carrier delivers letters and packages every weekday for the U.S. Postal Service.", kind: "data" },
    { id: "postal_law", label: "Postal service rule", reading: "Federal law reserves mail delivery for the U.S. Postal Service, not local governments.", kind: "data" },
    { id: "park_bench", label: "Park bench photo", reading: "A new bench was added to Westview Park this spring.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["pothole_log", "city_crew"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["license_office", "state_seal"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["mail_log", "postal_law"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["park_bench"] },
  ],

  echo: {
    main: "Services directory just came in, Cadet. Let's see if this claim holds up.",
    scan: "Three services, three different levels of government — read every record carefully.",
    sort: "Notice how each service pairs with proof of who's actually responsible for it.",
    submit: "Tap each blank and pick your proof. No typing required, Cadet.",
    reflect: "Three verdicts filed. Give the report one more look before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict for all three signals?",
    "Did I mention that the city crew handles potholes?",
    "Did I mention that the state, not the city, issues driver's licenses?",
    "Did I mention that federal law reserves mail delivery for the postal service?",
    "Did I avoid saying any government service could be handled by any level of government?",
  ],
};
