// Mission Map — "Text Feature Code Breaker" — SERVER ONLY.
// Never import this from a client component. See 3-16-MM.public.js for the
// TEKS 3.10C alignment and the design notes.

export const SERVER_CASE = {
  standard: "3.16-MM",
  title: "Text Feature Code Breaker",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", correctChoiceId: "b" },
    { id: "cp3", type: "quickScan", correctChoiceId: "a" },
    { id: "cp4", type: "showdown", correctSide: "B" },
    { id: "cp5", correctChoiceId: "b" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "The caption helps a reader because it explains what the photo shows. Without it, I would not know the yellow balls are pollen in baskets on the bee's legs. The diagram also helps because it shows where bees keep eggs, honey, and pollen inside the honeycomb. The flower border does not help because it only decorates the page. It does not tell the reader anything about bees.",

  mustInclude: [
    "Names TWO real text features from the article (heading, caption, diagram, bold print/glossary)",
    "Explains the specific job of each feature for a reader — what it helps them find, preview, or understand — not just that it is there",
    "Explains that the flower border is decoration and gives no information",
  ],
};
