// Mission Map — "Sequence Story Gate" — SERVER ONLY.
// Never import this from a client component. See 3-15-MM.public.js for the
// TEKS 3.8C alignment and the design notes.

export const SERVER_CASE = {
  standard: "3.15-MM",
  title: "Sequence Story Gate",

  checkpoints: [
    { id: "cp1", correctChoiceId: "b" },
    { id: "cp2", correctChoiceId: "c" },
    { id: "cp3", type: "sequence", correctOrder: ["a", "b", "c", "d"] },
    { id: "cp4", correctChoiceId: "a" },
    { id: "cp5", type: "showdown", correctSide: "B" },
    { id: "cp6", correctChoiceId: "b" },
  ],

  modelAnswer:
    "The problem was that the kite string snapped, and the kite got stuck on the snack stand roof. Jada asked the worker for help, but he was too busy. The turning point was when Jada remembered the park ranger's long flag pole. The problem was solved when the ranger used the pole to lift the kite down. The kite's colors do not move the story because nothing happens because of them. If the kite were blue, the story would still go the same way.",

  mustInclude: [
    "Names the problem — the string snaps and the kite is stuck on the roof",
    "Names the turning point (remembering the ranger's flag pole) AND the resolution (the ranger lifts the kite down), in the right order",
    "Explains that the kite's colors are a description that does not cause any later event, unlike the busy worker, which leads Jada to find another plan",
  ],
};
