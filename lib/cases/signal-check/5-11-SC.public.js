// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.11 has no sub-letter in
// the real TEKS (same trouble spot as 5.9). It covers designing and
// explaining solutions that minimize the environmental impact of using
// natural resources, including conservation, recycling, and proper
// disposal. Freshly framed for Signal Check — NOT a reworded version of
// any Group Chat trap line (see COVERAGE_MAP.md rule).
//
// No fieldReport photo yet — falls back to the raw evidenceReadings list.
// Add a fieldReport object here once Emily has an image processed.

export const PUBLIC_CASE = {
  standard: "5.11-SC",
  teksLabel: "5.11",
  grade: 5,
  subject: "Science",
  title: "Does Turning Off the Faucet Actually Save Anything?",
  tagline: "Turning off the faucet while brushing your teeth is pointless — it's such a tiny amount of water, it doesn't actually save anything worth counting.",
  transmission: {
    claimHeadline: "Turning off the faucet while brushing your teeth is pointless — it's such a tiny amount of water, it doesn't actually save anything worth counting.",
    source: "Household Water Use Log",
    loggedAt: "1-Year Estimate",
  },

  stemMode: "open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "A running faucet uses about 4 gallons during a 2-minute brushing session, measured directly.",
      correctVerdict: "True",
      reasonText: "A direct measurement of 4 gallons for one brushing session shows this is a real, countable amount, not nothing.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "One family doing this twice a day for a year adds up to over 2,900 gallons saved, based on that same measured rate.",
      correctVerdict: "True",
      reasonText: "Multiplying a small daily amount out over a whole year shows how much it can really add up.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Turning off the faucet while brushing doesn't save anything worth counting.",
      correctVerdict: "False",
      reasonText: "Small conservation actions repeated daily, or by many people, add up to a real, measurable effect on water use.",
    },
  ],

  evidenceReadings: [
    { id: "faucet_flow_rate", label: "Faucet flow rate", reading: "A running faucet was measured filling a 2-gallon container in about 1 minute.", kind: "data" },
    { id: "brushing_time_test", label: "Brushing session test", reading: "A 2-minute brushing session with the faucet left running used about 4 gallons of water.", kind: "data" },
    { id: "daily_total_calc", label: "Daily savings calculation", reading: "One family brushing teeth twice a day with the faucet off saves that same 4 gallons each time.", kind: "data" },
    { id: "yearly_total_calc", label: "Yearly savings calculation", reading: "Multiplied out over a year, that same family's savings add up to over 2,900 gallons.", kind: "data" },
    { id: "conservation_note", label: "Science note", reading: "Small conservation actions repeated by many people, or repeated daily, add up to a much larger real effect.", kind: "data" },
    { id: "design_solution_note", label: "Science note", reading: "Designing a simple solution, like a shut-off habit, can measurably reduce environmental impact over time.", kind: "data" },
    { id: "sink_color_note", label: "Sink note", reading: "The bathroom sink is white porcelain.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["faucet_flow_rate", "brushing_time_test"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["daily_total_calc", "yearly_total_calc"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["conservation_note", "design_solution_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["sink_color_note"] },
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
    "Did I mention how much water one brushing session actually used?",
    "Did I mention the yearly total for one family?",
    "Did I explain why a small action repeated often can matter?",
    "Did I avoid saying turning off the faucet doesn't save anything worth counting?",
  ],
};
