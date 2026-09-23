// Mission Map — "Main Idea Treasure Map" — SERVER ONLY.
// Never import this from a client component. See 3-14-MM.public.js for the
// TEKS 3.6G alignment and the design notes.

export const SERVER_CASE = {
  standard: "3.14-MM",
  title: "Main Idea Treasure Map",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", correctChoiceId: "b" },
    { id: "cp3", correctChoiceId: "a" },
    { id: "cp4", type: "showdown", correctSide: "B" },
    { id: "cp5", type: "quickScan", correctChoiceId: "c" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "The main idea is that many animals build homes to stay safe. One detail that supports it is that prairie dogs dig tunnels that hide them from hawks. Another detail is that a beaver lodge has its door under the water, so enemies cannot get in. The cheetah fact does not belong because it is about how fast a cheetah runs, not about an animal home. It is true and fun, but it does not help prove the main idea.",

  mustInclude: [
    "States the main idea — animals build homes to stay safe — not just the topic 'animal homes'",
    "Gives TWO supporting details from the article (nests keep eggs warm and off the ground; prairie dog tunnels hide them from hawks; beaver lodge door under water)",
    "Explains that the cheetah fact is true but does not support the main idea because it is not about homes or safety",
  ],
};
