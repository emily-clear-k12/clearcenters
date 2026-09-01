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
  tagline: "Something is only scarce when there's none left at all.",
  transmission: {
    claimHeadline: "Something is only scarce when there's none left at all.",
    source: "Westview School Store",
    loggedAt: "Monday Morning Inventory",
  },

  stemMode: "dropdown",
  verdictOptions: ["True", "Misleading", "False"],

  fieldReport: {
    image: "/signal-check/ss-3-6b-sc-field-report.jpg",
    imageCaption: "Westview School Store — Monday Morning Inventory",
    notes: "The school store has 3 glittery notebooks left and 30 plain notebooks — 33 notebooks in total. A survey of Ms. Ruiz's class of 25 kids found that 20 of them want a glittery notebook. Five more kids added their names to a waitlist for one this morning, and the manager says the next glittery restock won't arrive for two weeks.",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "3 glittery notebooks for 20 kids who want one counts as scarce, even with a few still on the shelf.",
      correctVerdict: "True",
      reasonText: "Only 3 glittery notebooks remain while 20 kids in one class alone want one — that gap makes it scarce, even though the shelf isn't empty.",
      stemEvidenceIds: ["glitter_count", "class_survey"],
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Since the store has 33 notebooks in total between both kinds, there's no real shortage in the school store.",
      correctVerdict: "Misleading",
      reasonText: "It's true the store has plenty of notebooks overall, but that total mixes in 30 plain notebooks nobody's short on — it hides that the specific kind everyone wants is running out.",
      stemEvidenceIds: ["plain_count", "total_notebook_count"],
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Something is only scarce when a store has completely sold out, with none left at all.",
      correctVerdict: "False",
      reasonText: "Even with 3 glittery notebooks still on the shelf, the waitlist keeps growing and the restock is two weeks away — it's already scarce, not just when the last one sells.",
      stemEvidenceIds: ["waitlist_note", "restock_delay"],
    },
  ],

  evidenceReadings: [
    { id: "glitter_count", label: "Glittery notebook count", reading: "Only 3 glittery notebooks left on the shelf.", kind: "data" },
    { id: "class_survey", label: "Class want-survey", reading: "20 out of 25 kids in Ms. Ruiz's class want a glittery notebook.", kind: "data" },
    { id: "plain_count", label: "Plain notebook count", reading: "30 plain notebooks still stacked on the shelf.", kind: "data" },
    { id: "total_notebook_count", label: "Store notebook inventory", reading: "33 total notebooks in stock: 3 glittery, 30 plain.", kind: "data" },
    { id: "waitlist_note", label: "Waitlist sign-up sheet", reading: "5 more kids added their names to the glittery notebook waitlist this morning.", kind: "data" },
    { id: "restock_delay", label: "Manager's note", reading: "The next glittery notebook restock won't arrive for two weeks.", kind: "data" },
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
