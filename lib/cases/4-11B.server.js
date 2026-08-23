// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (4.11B).

export const SERVER_CASE = {
  standard: "4.11B",
  title: "Plug Says Nobody Would Miss Him",
  bigQuestion: "If the power went out for 24 hours, what would actually stop — and how far past the lights does the list go?",
  evidenceBank: [
    "No electricity means no pump, which means no water pressure",
    "The clinic fridge spoils its whole cabinet after six hours warm",
    "Grocery shelves run down in about 3 days without fuel deliveries",
    "The town cut its energy use by 18% with LEDs and insulation",
    "The same drill was much harder to cover in 2019"
  ],
  trapLine: "Nobody would miss me much. You'd read a book. It'd be a boring evening and that's the whole of it.",
  castNames: {
    plug: "Plug",
    tower: "The Water Tower",
    clinic: "The Clinic Fridge",
    grocer: "The Grocery",
    led: "The LED Bulb",
    coun: "Councillor Reyes"
  },
  distractors: "Thinking energy resources mainly power entertainment and convenience; missing services that depend on electricity indirectly, such as water pressure or refrigerated medicine; stopping at the first effect and missing knock-on effects like deliveries; treating conservation as a gesture rather than something that measurably changes what an outage costs.",
  mustInclude: [
    "The chat names something essential that stops.",
    "It uses a specific figure from the evidence.",
    "It follows the effect past the thing that lost power.",
    "It brings in conservation or recycling.",
    "It answers Plug's 'boring evening' claim."
  ],
};
