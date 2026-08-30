// Mission Map — "Rescue the Pollination Path" — SERVER ONLY.
// Never import this from a client component (same rule as every other
// engine's server case files — see lib/cases/signal-check/index.server.js).
//
// Holds its own copy of each checkpoint's correct answer (independent of the
// public file, even though this particular checkpoint's correct answer is
// also shipped public for instant client-side feedback — same discipline
// Signal Check's dropdown-mode cases already use) plus the rubric for the
// one genuinely open-ended piece: the Final Unlock written response.

export const SERVER_CASE = {
  standard: "3.1-MM",
  title: "Rescue the Pollination Path",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", correctChoiceId: "a" },
    { id: "cp3", correctChoiceId: "a" },
    { id: "cp4", correctChoiceId: "a" },
  ],

  modelAnswer:
    "Pollination happens when pollen moves from flower to flower, often carried by a bee or another pollinator. Once a flower has been pollinated, it can form a seed. That seed can grow into a new plant, which will eventually flower again — continuing the cycle. Colorful petals can help attract pollinators in the first place, but color alone doesn't create a seed; the actual transfer of pollen does.",

  mustInclude: [
    "Names pollination (pollen moving from flower to flower) as the necessary step, not just 'the flower looks nice'",
    "Connects pollination to a seed actually forming — not just to a flower blooming",
    "Explains that the resulting seed can grow into a new plant, continuing the cycle",
  ],
};
