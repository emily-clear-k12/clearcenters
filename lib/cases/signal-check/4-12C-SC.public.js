// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 4 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 4.12C covers identifying
// and describing past environments based on fossil evidence, including
// common Texas fossils. Freshly framed for Signal Check — NOT a reworded
// version of any Group Chat trap line (see COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "4.12C-SC",
  teksLabel: "4.12C",
  grade: 4,
  subject: "Science",
  title: "Did Someone Just Drop a Seashell up Here?",
  tagline: "Somebody must have carried that seashell fossil up the hill and dropped it. Shells don't end up on a hilltop by themselves.",
  transmission: {
    claimHeadline: "Somebody must have carried that seashell fossil up the hill and dropped it. Shells don't end up on a hilltop by themselves.",
    source: "Hilltop Fossil Survey",
    loggedAt: "Site Visit 1",
  },

  stemMode: "dropdown-open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "The shell shape is stuck inside the solid rock layer. It is not lying loose on the dirt.",
      correctVerdict: "True",
      reasonText: "A fossil inside solid rock had to form there over a very long time. It could not have been dropped there lately.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "Two more matching shell fossils were found in the same rock layer in other spots on the hill.",
      correctVerdict: "True",
      reasonText: "A whole pattern of matching fossils in one rock layer rules out one visitor dropping one shell.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Somebody carried the shell up the hill and dropped it there.",
      correctVerdict: "False",
      reasonText: "This hilltop's rock layer formed underwater long ago, when an ancient sea covered the area. The shell fossil formed right where it is.",
    },
  ],

  evidenceReadings: [
    { id: "embedded_check", label: "Embedded check", reading: "The shell shape is stuck inside the solid rock layer. It is not sitting loose on top.", kind: "data" },
    { id: "surface_check", label: "Surface check", reading: "A new shell dropped by a person would sit on top of the dirt, not inside solid rock.", kind: "data" },
    { id: "matching_fossils_1", label: "Matching fossil, spot 2", reading: "A second matching shell fossil was found in the same rock layer thirty feet away.", kind: "data" },
    { id: "matching_fossils_2", label: "Matching fossil, spot 3", reading: "A third matching shell fossil was found in that rock layer on the other side of the hill.", kind: "data" },
    { id: "ancient_sea_note", label: "Science note", reading: "This hilltop's rock layer formed underwater long ago, when an ancient sea covered the area.", kind: "data" },
    { id: "texas_fossil_note", label: "Science note", reading: "Sea shell fossils like this one are common in Texas rock layers that used to be underwater.", kind: "data" },
    { id: "hill_height_note", label: "Hilltop note", reading: "The hilltop is about 200 feet above the nearest creek.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["embedded_check", "surface_check"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["matching_fossils_1", "matching_fossils_2"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["ancient_sea_note", "texas_fossil_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["hill_height_note"] },
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
    "Did I mention whether the shell was embedded in the rock or lying loose?",
    "Did I mention the other matching fossils found nearby?",
    "Did I explain what this hilltop's rock layer used to be?",
    "Did I avoid saying someone dropped the shell there?",
  ],
};
