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
  tagline: "Early American Indian groups in Texas met their needs mostly by hunting.",
  transmission: {
    claimHeadline: "Early American Indian groups in Texas met their needs mostly by hunting.",
    source: "Early Texas Economic Activity Records",
    loggedAt: "Ways of Meeting Needs File",
  },

  stemMode: "dropdown-open",
  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/ss-4-9a-sc-field-report.jpg",
    imageCaption: "Early Texas Economic Activity Records — Ways of Meeting Needs File",
    notes: "The Caddo lived in villages in East Texas that stayed in one place. They grew corn, beans, and squash. They traded their extra crops with nearby groups. The Karankawa lived along the Gulf Coast. They fished, gathered shellfish, and picked wild plants. The Lipan Apache did depend a lot on hunting bison on the plains. Each group met its needs in its own way. It depended on where they lived and what the land gave them.",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "Some Texas groups hunted. So all early American Indian groups in Texas must have depended mostly on hunting.",
      correctVerdict: "False",
      reasonText: "The Lipan Apache did depend on hunting. But the needs comparison shows farming, fishing, and gathering mattered just as much to other groups. Hunting was not the main way for everyone.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The Karankawa gathered shellfish and fished along the coast to meet their food needs.",
      correctVerdict: "True",
      reasonText: "The food record and the gathering record both show that living on the coast shaped how the Karankawa met their needs.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The Caddo grew crops like corn and beans to meet their food needs.",
      correctVerdict: "True",
      reasonText: "The farming record and the trade record both show the Caddo depended on growing and trading crops, not hunting.",
    },
  ],

  evidenceReadings: [
    { id: "caddo_crops", label: "Caddo farming record", reading: "Grew corn, beans, and squash in villages that stayed in one place.", kind: "document" },
    { id: "caddo_trade", label: "Caddo trade record", reading: "Traded extra crops with nearby groups.", kind: "document" },
    { id: "karankawa_fish", label: "Karankawa food record", reading: "Gathered shellfish and fished along the Gulf Coast.", kind: "document" },
    { id: "karankawa_gather", label: "Karankawa gathering record", reading: "Picked wild plants along the coast to eat.", kind: "document" },
    { id: "apache_hunt", label: "Lipan Apache hunting record", reading: "Depended a lot on hunting bison across the plains.", kind: "document" },
    { id: "needs_summary", label: "Regional needs comparison", reading: "Each group met its needs in its own way, based on where it lived. Farming, fishing, gathering, and hunting were all used.", kind: "document" },
    { id: "pottery_note", label: "Caddo pottery record", reading: "Caddo artists made clay pots with designs on them.", kind: "distractor" },
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
