// Mission Map — "Open the Perimeter Gate" — SERVER ONLY.
// Never import this from a client component. See 3-9-MM.public.js for the
// TEKS 3.7B alignment and the note on why this is not 3.6C.

export const SERVER_CASE = {
  standard: "3.9-MM",
  title: "Open the Perimeter Gate",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", correctChoiceId: "a" },
    { id: "cp3", type: "showdown", correctSide: "B" },
    { id: "cp4", correctChoiceId: "a" },
    { id: "cp5", type: "quickScan", correctChoiceId: "b" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "The side with no label is 25 feet, because a rectangle has two pairs of matching sides and the side across from it is 25 feet. Then I added every side one time: 40 + 25 + 40 + 25 = 130 feet. Adding only two sides is wrong because a fence goes all the way around the playground. Leo's 65 feet would only cover the top and one end, and then the fence would stop. Perimeter is the distance all the way around, so the answer is 130 feet, not 130 square feet.",

  mustInclude: [
    "States the missing side as 25 feet AND gives the reason — a rectangle's opposite sides match — rather than just asserting the number",
    "Shows the perimeter as all four sides added once (40 + 25 + 40 + 25 = 130), not length plus width",
    "Explains why two sides is not enough, in terms of the fence going all the way around rather than just 'you add all of them'",
  ],
};
