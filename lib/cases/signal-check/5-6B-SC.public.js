// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.6B covers demonstrating
// and explaining that some mixtures maintain the physical properties of
// the substances that make them up, such as iron filings and sand or sand
// and water. Freshly framed for Signal Check — NOT a reworded version of
// any Group Chat trap line (see COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "5.6B-SC",
  teksLabel: "5.6B",
  grade: 5,
  subject: "Science",
  title: "Did Mixing Make Something Brand New?",
  tagline: "Once the iron filings and sand are mixed together, they've become one whole new substance — there's no getting the sand back out.",
  transmission: {
    claimHeadline: "Once the iron filings and sand are mixed together, they've become one whole new substance — there's no getting the sand back out.",
    source: "Iron Filings & Sand Mix Test",
    loggedAt: "Trial 1",
  },

  stemMode: "open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "A magnet pulled through the mixed pile pulls out only the iron filings, leaving the sand behind.",
      correctVerdict: "True",
      reasonText: "If they had become one new substance, a magnet wouldn't be able to separate them so easily.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "The recovered iron filings still stick to a magnet on their own, and the leftover sand still looks and feels exactly like the sand did before mixing.",
      correctVerdict: "True",
      reasonText: "Both materials kept their own original properties, which is exactly what happens in a mixture, not a new substance.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "The iron filings and sand became one new substance, impossible to separate.",
      correctVerdict: "False",
      reasonText: "Mixing sand and iron filings creates a mixture — the two materials keep their own separate properties and can be separated again.",
    },
  ],

  evidenceReadings: [
    { id: "magnet_pull", label: "Magnet pull test", reading: "Pulling a magnet through the mixed pile lifts out only the iron filings.", kind: "data" },
    { id: "sand_left_behind", label: "Sand check", reading: "The sand stays behind in the pile after the magnet passes through.", kind: "data" },
    { id: "recovered_filings_test", label: "Recovered filings test", reading: "The recovered iron filings still snap onto a magnet on their own.", kind: "data" },
    { id: "sand_property_check", label: "Recovered sand check", reading: "The leftover sand still looks, feels, and pours exactly like it did before mixing.", kind: "data" },
    { id: "mixture_definition_note", label: "Science note", reading: "In a mixture, each substance keeps its own physical properties and can usually be separated again.", kind: "data" },
    { id: "new_substance_note", label: "Science note", reading: "Only a chemical change creates a truly new substance that can't be separated back into its original parts.", kind: "data" },
    { id: "pile_size_note", label: "Pile note", reading: "The mixed pile filled about half of a small plastic cup.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["magnet_pull", "sand_left_behind"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["recovered_filings_test", "sand_property_check"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["mixture_definition_note", "new_substance_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["pile_size_note"] },
  ],

  echo: {
    main: "Transmission incoming, Cadet. Let's see if it holds up.",
    scan: "Three signals, seven raw readings — nothing's sorted yet. Read carefully.",
    sort: "All seven readings sorted. Check your work before you lock it in.",
    submit: "No stems, no chips this time — write both the verdict and the reasoning yourself.",
    reflect: "Three verdicts filed. Give the full report one more read before you send it in.",
  },

  selfCheckQuestions: [
    "Did I write a verdict AND a reason for all three signals?",
    "Did I mention what happened when a magnet was pulled through the pile?",
    "Did I mention what the recovered iron filings and sand looked like afterward?",
    "Did I explain the difference between a mixture and a new substance?",
    "Did I avoid saying the sand and iron filings became one unseparable substance?",
  ],
};
