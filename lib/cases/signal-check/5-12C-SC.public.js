// Signal Check — safe to import from client components.
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.12C covers describing
// the characteristics of a healthy ecosystem and explaining how human
// activities can be both beneficial and harmful to ecosystems. Freshly
// framed for Signal Check — NOT a reworded version of any Group Chat trap
// line (see COVERAGE_MAP.md rule).
//

export const PUBLIC_CASE = {
  standard: "5.12C-SC",
  teksLabel: "5.12C",
  grade: 5,
  subject: "Science",
  title: "Will Paving the Lot Really Not Affect Anything Else?",
  tagline: "That empty lot is just dirt and weeds. Paving it for parking won't really affect anything nearby.",
  transmission: {
    claimHeadline: "That empty lot is just dirt and weeds. Paving it for parking won't really affect anything nearby.",
    source: "Neighborhood Runoff Survey",
    loggedAt: "One Year Comparison",
  },

  stemMode: "open",
  verdictOptions: ["True", "Misleading", "False"],

  // The Scan screen leads with this — one photo plus a short field-note
  // paragraph — instead of a list of separate evidence cards. The discrete
  // evidenceReadings below still exist and still drive Sensor Sort and the
  // "Review the Evidence Again" panel on the Verdict screen; this is just
  // what the student reads first, written as a single field report.
  fieldReport: {
    image: "/signal-check/5-12c-sc-field-report.jpg",
    imageCaption: "Neighborhood Runoff Survey — paved lot meeting the field",
    notes: "The photo shows the edge of a parking lot meeting a strip of bare dirt, then taller grass and a line of trees. Where pavement covers the ground, rainwater can't soak in the way it did when the lot was soil and weeds. It runs off instead. That change in how water moves is one way paving can affect the land next door.",
  },

  statements: [
    {
      id: "A",
      tag: "SIGNAL A",
      text: "After a lot nearby was paved, rainwater that used to soak into the ground now runs straight into the storm drain.",
      correctVerdict: "True",
      reasonText: "A real change you can measure in where the water goes shows that paving does affect the area around it.",
    },
    {
      id: "B",
      tag: "SIGNAL B",
      text: "A rain garden next to a different paved lot now catches and filters that same kind of runoff. Within a year, frogs and dragonflies moved back in.",
      correctVerdict: "True",
      reasonText: "This shows a human change near a paved lot can also help an ecosystem, not just harm one.",
    },
    {
      id: "C",
      tag: "SIGNAL C",
      text: "Paving over the lot won't affect anything else nearby.",
      correctVerdict: "False",
      reasonText: "Human actions can harm an ecosystem, like the extra runoff from paving. They can also help one, like a rain garden that filters and slows that runoff.",
    },
  ],

  evidenceReadings: [
    { id: "runoff_before", label: "Runoff, before paving", reading: "Before a nearby lot was paved, rainwater soaked into the ground there during storms.", kind: "data" },
    { id: "runoff_after", label: "Runoff, after paving", reading: "After that lot was paved, the same rainwater now runs straight into the storm drain.", kind: "data" },
    { id: "rain_garden_result", label: "Rain garden result", reading: "A rain garden next to a different paved lot now catches and filters that runoff.", kind: "data" },
    { id: "wildlife_return_result", label: "Wildlife return result", reading: "Within a year of the rain garden being built, frogs and dragonflies moved back in.", kind: "data" },
    { id: "runoff_impact_note", label: "Science note", reading: "Paving over soil takes away ground that used to soak up rain. That changes how water moves through the area.", kind: "data" },
    { id: "human_impact_note", label: "Science note", reading: "Human actions can harm an ecosystem, like extra runoff from paving, or help one, like a rain garden that filters and slows that runoff.", kind: "data" },
    { id: "lot_size_note", label: "Lot note", reading: "The paved lot covers about half an acre.", kind: "distractor" },
  ],

  sortBins: [
    { id: "A", label: "SIGNAL A", correctItemIds: ["runoff_before", "runoff_after"] },
    { id: "B", label: "SIGNAL B", correctItemIds: ["rain_garden_result", "wildlife_return_result"] },
    { id: "C", label: "SIGNAL C", correctItemIds: ["runoff_impact_note", "human_impact_note"] },
    { id: "none", label: "DOESN'T BELONG", correctItemIds: ["lot_size_note"] },
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
    "Did I compare where the rainwater went before and after the nearby lot was paved?",
    "Did I mention what happened at the rain garden?",
    "Did I explain how human activity can both harm and help an ecosystem?",
    "Did I avoid saying paving the lot won't affect anything else nearby?",
  ],
};
