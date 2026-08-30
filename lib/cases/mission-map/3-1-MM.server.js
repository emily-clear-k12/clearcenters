// Mission Map — "Rescue the Pollination Path" — SERVER ONLY.
// Never import this from a client component. Revised Aug 30 (v2) to match
// the deepened 6-checkpoint public case and the 3-part Final Unlock
// requirement (see 3-1-MM.public.js for what changed and why).

export const SERVER_CASE = {
  standard: "3.1-MM",
  title: "Rescue the Pollination Path",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", correctChoiceId: "a" },
    { id: "cp3", correctChoiceId: "a" },
    { id: "cp4", correctChoiceId: "a" },
    { id: "cp5", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "Pollination happens when pollen moves from the stamen of one flower to the pistil of another — often carried by a bee or another pollinator, the way the trail camera caught a bee carrying pollen from a marigold to a zinnia. But that pollen only works if it lands on the same species or a close relative — that's why the zinnia never formed a seed pod even though the bee visited it, while the marigold (pollinated by another marigold, or by a compatible flower) did form one. The caged-marigold test shows this isn't just a hunch: with insects excluded and only wind reaching the flower, zero seed pods formed, while the insect-visited marigold produced several — proving wind alone wasn't enough for this flower, and that the neighbor's claim doesn't hold up here.",

  mustInclude: [
    "Explains that pollen moves from one flower's stamen to another flower's (or the same flower's) pistil, and names a pollinator (e.g. the bee) as the real mechanism — not just 'the flower blooms'",
    "Explains that pollen only works on the same species or a close relative — and connects this to why the zinnia specifically didn't form a pod",
    "Uses the caged-marigold evidence (Cage A = wind only = zero pods; Cage B = open to insects = several pods) to explain why the wind-is-enough claim is wrong for this flower",
  ],
};
