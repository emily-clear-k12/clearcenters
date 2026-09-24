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
  tagline: "Turning off the faucet while you brush your teeth is pointless. It is such a tiny amount of water that it doesn't save anything worth counting.",
  transmission: {
    claimHeadline: "Turning off the faucet while you brush your teeth is pointless. It is such a tiny amount of water that it doesn't save anything worth counting.",
    source: "Household Water Use Log",
    loggedAt: "1-Year Estimate",
  },

  stemMode: "open",
  verdictOptions: ["True", "Misleading", "False"],

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "A running faucet uses about 4 gallons during 2 minutes of brushing, measured directly.",
      correctVerdict: "True",
      reasonText: "A measured 4 gallons for one brushing is a real amount you can count. It is not nothing.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "One family doing this twice a day for a year saves over 2,900 gallons, based on that same rate.",
      correctVerdict: "True",
      reasonText: "Multiplying a small daily amount over a whole year shows how much it really adds up.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Turning off the faucet while brushing does not save anything worth counting.",
      correctVerdict: "False",
      reasonText: "Small conservation actions, repeated every day or by many people, add up to a real effect on water use that you can measure.",
    },
  ],

  evidenceReadings: [
    { id: "faucet_flow_rate", label: "Faucet flow rate", reading: "A running faucet filled a 2-gallon container in about 1 minute.", kind: "data" },
    { id: "brushing_time_test", label: "Brushing session test", reading: "Brushing for 2 minutes with the faucet running used about 4 gallons of water.", kind: "data" },
    { id: "daily_total_calc", label: "Daily savings calculation", reading: "One family brushing twice a day with the faucet off saves that same 4 gallons each time.", kind: "data" },
    { id: "yearly_total_calc", label: "Yearly savings calculation", reading: "Over a year, that family's savings add up to over 2,900 gallons.", kind: "data" },
    { id: "conservation_note", label: "Science note", reading: "Small conservation actions, repeated by many people or every day, add up to a much larger real effect.", kind: "data" },
    { id: "design_solution_note", label: "Science note", reading: "A simple solution, like a habit of shutting off the tap, can cut harm to the environment over time.", kind: "data" },
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
