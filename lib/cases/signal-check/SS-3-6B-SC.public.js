// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 3 Social Studies
// TEKS reference (see lib/cases/TEKS_STANDARDS.md) — 3.6B covers scarcity.
// Stored with an "SS." prefix so this code can never collide with a
// Science case using the same bare TEKS number.
//
// Freshly scripted scenario (a school store notebook shortage) — not a
// reworded version of Group Chat's SS.3.6B case, per the Signal Check
// checklist's anti-duplication rule.

export const PUBLIC_CASE = {
  standard: "SS.3.6B-SC",
  teksLabel: "3.6B",
  grade: 3,
  subject: "Social Studies",
  title: "Three Left, Twenty-Five Want One",
  tagline: "Something is only scarce when there is none left at all.",
  transmission: {
    claimHeadline: "Something is only scarce when there is none left at all.",
    source: "Westview School Store",
    loggedAt: "Monday Morning Inventory",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/ss-3-6b-sc-field-report.jpg",
    imageCaption: "Westview School Store — Monday Morning Inventory",
    notes: "The school store has 3 glittery notebooks left. It also has 30 plain notebooks. That makes 33 notebooks in all. Ms. Ruiz asked the 25 kids in her class. 20 of them want a glittery notebook. This morning, five more kids signed a waitlist for one. The manager says new glittery notebooks will not come for two weeks.",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "3 glittery notebooks for 20 kids who want one is scarce, even with a few left.",
      correctVerdict: "True",
      reasonText: "Only 3 glittery notebooks are left. 20 kids in just one class want one. That gap makes them scarce, even though the shelf is not empty.",
      stemEvidenceIds: ["glitter_count", "class_survey"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The store has 33 notebooks in all, so there is no real shortage.",
      correctVerdict: "Misleading",
      reasonText: "The store does have lots of notebooks. But 30 of them are plain ones that nobody is short on. The total hides that the kind everyone wants is running out.",
      stemEvidenceIds: ["plain_count", "total_notebook_count"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Something is only scarce when the store has sold out and none are left.",
      correctVerdict: "False",
      reasonText: "There are still 3 glittery notebooks on the shelf. But the waitlist keeps growing, and more will not come for two weeks. They are already scarce.",
      stemEvidenceIds: ["waitlist_note", "restock_delay"],
    },
  ],

  evidenceReadings: [
    { id: "glitter_count", label: "Glittery notebook count", reading: "Only 3 glittery notebooks left on the shelf.", kind: "data" },
    { id: "class_survey", label: "Class want-survey", reading: "20 out of 25 kids in Ms. Ruiz's class want a glittery notebook.", kind: "data" },
    { id: "plain_count", label: "Plain notebook count", reading: "30 plain notebooks still stacked on the shelf.", kind: "data" },
    { id: "total_notebook_count", label: "Store notebook inventory", reading: "33 notebooks in all: 3 glittery, 30 plain.", kind: "data" },
    { id: "waitlist_note", label: "Waitlist sign-up sheet", reading: "5 more kids signed the glittery notebook waitlist this morning.", kind: "data" },
    { id: "restock_delay", label: "Manager's note", reading: "New glittery notebooks will not come for two weeks.", kind: "data" },
    { id: "store_hours", label: "Store hours sign", reading: "The school store is open from 8:00 to 8:15 every morning.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["glitter_count", "class_survey"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["plain_count", "total_notebook_count"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["waitlist_note", "restock_delay"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["store_hours"] },
  ],

  echo: {
    main: "School store inventory just came in, Cadet. Let's see if this claim holds up.",
    scan: "Two kinds of notebooks, one big difference in demand — read every reading carefully.",
    sort: "Notice how the totals and the waitlist tell two different stories.",
    submit: "Tap each blank and pick your proof. No typing required, Cadet.",
    reflect: "Three verdicts filed. Give the report one more look before you send it in.",
  },

  selfCheckQuestions: [
    "Did I give a verdict for all three signals?",
    "Did I mention how many glittery notebooks are left compared to how many kids want one?",
    "Did I explain why the store's total notebook count can be misleading?",
    "Did I mention the waitlist and the two-week restock delay?",
    "Did I avoid saying something is only scarce once there's absolutely none left?",
  ],
};
