// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.4.4B, TEKS 4.4B).
// NOTE: this export did not include a "distractors" field — left blank
// rather than fabricated. Not read at runtime by app/api/submission.

export const SERVER_CASE = {
  standard: "SS.4.4B",
  title: "The Cattle Trail Boom",
  bigQuestion: "Why did the cattle industry grow in Texas, and how did it change the state?",
  evidenceBank: [
    "Demand for beef grew in other parts of the United States.",
    "Cattle drives and later railroads helped move cattle to distant markets.",
    "Ranchers such as Charles Goodnight, Richard King, and Lizzie Johnson helped develop ranching businesses."
  ],
  trapLine: "The cattle industry grew mostly because Texas had a lot of cows.",
  castNames: {
    ben: "Ben Lots-of-Cows",
    market: "Maya Market File",
    trail: "Troy Trail File",
    ranch: "Rosa Ranch File",
    impact: "Ivy Impact File"
  },
  distractors: "",
  mustInclude: [
    "Connects demand to industry growth.",
    "Connects transportation to markets.",
    "Uses a rancher example.",
    "Explains an effect on Texas.",
    "Rejects the 'lots of cattle' only explanation."
  ],
};
