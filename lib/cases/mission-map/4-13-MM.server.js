// Mission Map — "Operation Key Quest" — SERVER ONLY.
// Never import this from a client component. See 4-13-MM.public.js for the
// TEKS 4.5A alignment and the note on the keyword trap.

export const SERVER_CASE = {
  standard: "4.13-MM",
  title: "Operation Key Quest",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", correctChoiceId: "a" },
    { id: "cp3", correctChoiceId: "a" },
    { id: "cp4", type: "showdown", correctSide: "B" },
    { id: "cp5", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "My equation is (6 x 24) - 35 = p, and p = 109 ration packs left. The multiplication had to come first because you cannot take away what was eaten until you know how many packs there were to begin with. Six crates of 24 packs is 144 packs, and then 144 - 35 = 109. I did not use the 9 crew members, because the question never asks how the packs get divided between people. Picking the operation from the word 'left' did not work because a keyword can hint at an operation but it cannot tell you the order. The first plan subtracted 35 from a single crate of 24 and got an impossible answer, since the crew ate from all six crates, not one.",

  mustInclude: [
    "Gives the equation with a letter for the unknown — (6 x 24) - 35 = p — not just the arithmetic or just the answer",
    "States 109 as the answer AND justifies the order: the total comes before the subtraction",
    "Identifies the 9 crew members as the unused number, or explains the keyword trap in terms of ORDER rather than saying subtraction was wrong",
  ],
};
