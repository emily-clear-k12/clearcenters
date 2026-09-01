// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 4 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 4.9A covers how early
// American Indian groups in Texas met their economic needs. Stored with an
// "SS." prefix so this code can never collide with a Science case using
// the same bare TEKS number.
//
// Freshly scripted scenario (an economic activity records file) — not a
// reworded version of Group Chat's SS.4.9A case, per the Signal Check
// checklist's anti-duplication rule.

export const PUBLIC_CASE = {
  standard: "SS.4.9A-SC",
  teksLabel: "4.9A",
  grade: 4,
  subject: "Social Studies",
  title: "How Do We Meet Our Needs?",
  tagline: "Early American Indian groups in Texas mostly met their needs by hunting.",
  transmission: {
    claimHeadline: "Early American Indian groups in Texas mostly met their needs by hunting.",
    source: "Early Texas Economic Activity Records",
    loggedAt: "Ways of Meeting Needs File",
  },

  stemMode: "dropdown-open",
  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/ss-4-9a-sc-field-report.jpg",
    imageCaption: "Early Texas Economic Activity Records — Ways of Meeting Needs File",
    notes: "The Caddo grew crops like corn, beans, and squash in permanent villages in East Texas, and traded surplus crops with neighboring groups. The Karankawa gathered shellfish, fished, and collected wild plants along the Gulf Coast. The Lipan Apache did rely heavily on hunting bison across the plains. Different groups met their needs in different ways depending on where they lived and what their environment offered.",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Since some Texas groups hunted, all early American Indian groups in Texas must have relied mainly on hunting.",
      correctVerdict: "False",
      reasonText: "The Lipan Apache did rely on hunting, but the needs comparison shows farming, fishing, and gathering were just as central for other groups — hunting wasn't the main method for everyone.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The Karankawa gathered shellfish and fished along the coast to meet their food needs.",
      correctVerdict: "True",
      reasonText: "The food and gathering records both show the Karankawa's coastal environment shaped how they met their needs.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The Caddo grew crops like corn and beans to meet their food needs.",
      correctVerdict: "True",
      reasonText: "The farming record and trade record both show the Caddo relied on growing and trading crops, not hunting.",
    },
  ],

  evidenceReadings: [
    { id: "caddo_crops", label: "Caddo farming record", reading: "Grew corn, beans, and squash in permanent villages.", kind: "document" },
    { id: "caddo_trade", label: "Caddo trade record", reading: "Traded surplus crops with neighboring groups.", kind: "document" },
    { id: "karankawa_fish", label: "Karankawa food record", reading: "Gathered shellfish and fished along the Gulf Coast.", kind: "document" },
    { id: "karankawa_gather", label: "Karankawa gathering record", reading: "Collected wild plants along the coast as part of their diet.", kind: "document" },
    { id: "apache_hunt", label: "Lipan Apache hunting record", reading: "Relied heavily on hunting bison across the plains.", kind: "document" },
    { id: "needs_summary", label: "Regional needs comparison", reading: "Groups met their needs differently depending on where they lived — farming, fishing, gathering, and hunting were all used.", kind: "document" },
    { id: "pottery_note", label: "Caddo pottery record", reading: "Caddo artisans made decorated clay pottery.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["apache_hunt", "needs_summary"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["karankawa_fish", "karankawa_gather"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["caddo_crops", "caddo_trade"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["pottery_note"] },
  ],

  echo: {
    main: "Economic activity records incoming, Cadet. Let's see if this claim holds up.",
    scan: "Farming, fishing, and hunting — read every record carefully.",
    sort: "Notice how each group's method matches their own environment.",
    submit: "Pick the verdict, then write your own reasoning using the evidence.",
    reflect: "Three verdicts filed. Give the report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict for all three signals?",
    "Did I mention that the Caddo farmed crops?",
    "Did I mention that the Karankawa fished and gathered along the coast?",
    "Did I mention that different groups used different methods depending on where they lived?",
    "Did I avoid saying all early Texas groups relied mainly on hunting?",
  ],
};
