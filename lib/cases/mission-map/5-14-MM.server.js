// Mission Map — "Paired Text Portal" — SERVER ONLY.
// Never import this from a client component. See 5-14-MM.public.js for the
// TEKS 5.7B alignment and the design notes.

export const SERVER_CASE = {
  standard: "5.14-MM",
  title: "Paired Text Portal",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", correctChoiceId: "a" },
    { id: "cp3", correctChoiceId: "b" },
    { id: "cp4", type: "showdown", correctSide: "B" },
    { id: "cp5", type: "quickScan", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "b" },
  ],

  modelAnswer:
    "Both texts are about coral reefs, and both describe reefs as full of life. Text 1 mainly informs readers that reefs are fragile and need protecting; for example, it explains that corals can turn white and die when water stays too warm for too long. Text 2 mainly shares the wonder of seeing a reef for the first time; for example, the narrator says the world \"exploded with color\" and could not stop grinning. The article wants readers to understand a danger, while the story wants readers to feel amazement. Sharing a topic is not the same as sharing a message, because two authors can write about the same subject for completely different purposes.",

  mustInclude: [
    "Identifies a similarity (both about coral reefs / both show reefs as full of life) AND a meaningful difference in key idea or purpose (warning/informing vs. wonder/experience)",
    "Supports the comparison with evidence from BOTH texts (e.g., warm water and bleaching from Text 1; 'exploded with color' or the grinning narrator from Text 2)",
    "Explains that texts can share a topic while developing different messages or purposes",
  ],
};
