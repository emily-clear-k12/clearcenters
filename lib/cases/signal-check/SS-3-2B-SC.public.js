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
    notes: "About 400 cars drive down Elm Street every hour at school pickup. Kids had to wait a long time to cross. So the city put in a stoplight with a walk signal. Birch Lane is near the park. Only about 20 cars go by in an hour, and most drive slowly. So the city painted a crosswalk and added a stop sign. No one has had a crossing problem on Birch Lane all year. A stoplight there would have cost much more than the crosswalk. Still, a parent asked a question. Why can't every street get a stoplight like Elm Street, just to be safe?",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Elm Street got a stoplight because so many cars go by every hour.",
      correctVerdict: "True",
      reasonText: "About 400 cars an hour pass Elm Street at pickup. That is why the city put in a stoplight with a walk signal.",
      stemEvidenceIds: ["elm_traffic", "elm_fix"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Birch Lane got a crosswalk and stop sign because it has much less traffic.",
      correctVerdict: "True",
      reasonText: "Only about 20 cars an hour pass Birch Lane. A crosswalk and stop sign were enough. It did not need a stoplight.",
      stemEvidenceIds: ["birch_traffic", "birch_fix"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Both streets needed a safer crossing. So Birch Lane should get the same stoplight as Elm Street.",
      correctVerdict: "False",
      reasonText: "Birch Lane has had no crossing problems all year. A stoplight costs far more than a crosswalk and sign. The same fix as Elm Street would not solve a real problem.",
      stemEvidenceIds: ["birch_incidents", "stoplight_cost"],
    },
  ],

  evidenceReadings: [
    { id: "elm_traffic", label: "Elm Street traffic count", reading: "About 400 cars pass Elm Street every hour at school pickup.", kind: "data" },
    { id: "elm_fix", label: "Elm Street work order", reading: "The city put in a stoplight with a walk signal at Elm and 5th.", kind: "data" },
    { id: "birch_traffic", label: "Birch Lane traffic count", reading: "About 20 cars pass Birch Lane every hour, most driving slowly.", kind: "data" },
    { id: "birch_fix", label: "Birch Lane work order", reading: "The city painted a crosswalk and added a stop sign near the park gate.", kind: "data" },
    { id: "birch_incidents", label: "Birch Lane safety log", reading: "Zero crossing problems reported on Birch Lane in the past year.", kind: "data" },
    { id: "stoplight_cost", label: "City cost estimate", reading: "A new stoplight costs about $50,000. That is far more than a painted crosswalk and sign.", kind: "data" },
    { id: "sign_color", label: "Elm Street pole photo", reading: "The new stoplight pole was painted green to match the street lights nearby.", kind: "distractor" },
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
