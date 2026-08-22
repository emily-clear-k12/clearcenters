// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.

export const SERVER_CASE = {
  standard: "5.10B",
  title: "The Viral Rock Video",
  bigQuestion: "Could a viral video really show \"real sedimentary rock\" made in 5 minutes with a hydraulic press?",
  evidenceBank: [
    "A real rock sample shows 5 distinct visible layers (bands) of compacted sediment",
    "Coal sample: compressed plant material, geologic record shows millions of years",
    "Compacting loose sediment into solid rock requires sustained pressure over long spans, not a single squeeze",
    "Side-by-side comparison: a real layered model builds gradually vs. the video's \"instant\" claim"
  ],
  trapLine: "Watch this \u2014 dirt plus a good squish, and BAM, instant rock! Didn't even need a lunch break.",
  castNames: {
    freddy: "Freddy the Fast-Forward Geologist",
    lenny: "Lenny the Layer",
    pearl: "Pearl the Pressure",
    faye: "Faye the Fact-Checker"
  },
  distractors: "Thinking all rocks form the same way (not distinguishing sedimentary from igneous/metamorphic); confusing fossil fuel formation with the fossilization of bones/shells.",
  mustInclude: [
    "Names at least 2 required ingredients (layering, pressure, heat, time)",
    "Uses the layer-count or time evidence to argue against instant formation",
    "Corrects the video's claim",
    "Connects coal formation to compressed plant material over time",
    "States that rock formation is a slow process"
  ],
};
