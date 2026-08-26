// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 4 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 4.11B covers explaining the
// critical role of energy resources in modern life and how conservation,
// disposal, and recycling of natural resources impact the environment.
// Freshly framed for Signal Check — NOT a reworded version of any Group
// Chat trap line (see COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "4.11B-SC",
  teksLabel: "4.11B",
  grade: 4,
  subject: "Science",
  title: "One Battery Won't Make a Difference?",
  tagline: "It's just one used-up battery — tossing it in the regular trash instead of recycling it won't make any difference.",
  transmission: {
    claimHeadline: "It's just one used-up battery — tossing it in the regular trash instead of recycling it won't make any difference.",
    source: "Battery Recycling Log",
    loggedAt: "One School Year",
  },

  stemMode: "dropdown-open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "One classroom of 22 students collected over 200 dead batteries in a single year.",
      correctVerdict: "True",
      reasonText: "A large collected total shows 'just one battery' really adds up once everyone thinks the same way.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Batteries in a landfill can leak chemicals into the soil and water, but recycled batteries have those materials safely reused.",
      correctVerdict: "True",
      reasonText: "That's a real difference in what happens to the material afterward, not just where it physically ends up.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "One battery in the regular trash makes no difference to the environment.",
      correctVerdict: "False",
      reasonText: "One battery's impact is small by itself, but the same small choice repeated by everyone adds up to a real difference.",
    },
  ],

  evidenceReadings: [
    { id: "battery_count", label: "Yearly total", reading: "One classroom collected over 200 dead batteries in a single year.", kind: "data" },
    { id: "classroom_count_note", label: "Classroom size", reading: "That same classroom has only 22 students.", kind: "data" },
    { id: "landfill_leak_note", label: "Science note", reading: "Batteries in a landfill can leak chemicals into the soil and water over time.", kind: "data" },
    { id: "recycle_reuse_note", label: "Science note", reading: "A recycling center safely separates and reuses the metals inside a battery instead of letting them leak.", kind: "data" },
    { id: "per_battery_note", label: "Science note", reading: "One single battery, by itself, only contains a tiny amount of these chemicals.", kind: "data" },
    { id: "repeat_choice_note", label: "Science note", reading: "The same small choice, repeated by thousands of people, adds up to a much bigger effect.", kind: "data" },
    { id: "battery_size_note", label: "Battery note", reading: "The batteries collected were a mix of AA and AAA sizes.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["battery_count", "classroom_count_note"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["landfill_leak_note", "recycle_reuse_note"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["per_battery_note", "repeat_choice_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["battery_size_note"] },
  ],

  echo: {
    main: "Transmission incoming, Cadet. Let's see if it holds up.",
    scan: "Three signals, seven raw readings — nothing's sorted yet. Read carefully.",
    sort: "All seven readings sorted. Check your work before you lock it in.",
    submit: "Pick the verdict, then write your own reasoning — no stem this time.",
    reflect: "Three verdicts filed. Give the report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict for all three signals?",
    "Did I mention how many batteries one classroom collected in a year?",
    "Did I compare what happens to batteries in a landfill versus at a recycling center?",
    "Did I explain why one small choice can still matter?",
    "Did I avoid saying one battery in the trash makes no difference?",
  ],
};
