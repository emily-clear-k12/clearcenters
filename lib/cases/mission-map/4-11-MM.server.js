// Mission Map — "Area and Perimeter Labyrinth" — SERVER ONLY.
// Never import this from a client component. See 4-11-MM.public.js for the
// TEKS 4.5D alignment.

export const SERVER_CASE = {
  standard: "4.11-MM",
  title: "Area and Perimeter Labyrinth",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", correctChoiceId: "a" },
    { id: "cp3", correctChoiceId: "b" },
    { id: "cp4", type: "showdown", correctSide: "B" },
    { id: "cp5", correctChoiceId: "a" },
    { id: "cp6", type: "quickScan", correctChoiceId: "a" },
  ],

  modelAnswer:
    "The garden bed is a rectangle 12 feet by 8 feet. The edging runs along the outside, so that order needs the perimeter: 12 + 8 + 12 + 8 = 40 feet of edging. The mulch covers the ground inside the bed, so that order needs the area: 12 x 8 = 96 square feet of mulch. I decided by asking what each job actually touches. Edging follows the border, which is a distance, so it is measured in feet. Mulch fills the space inside, which is a covering, so it is measured in square feet. The form that came back added the sides correctly, but it used the distance around for a job that needed the space inside.",

  mustInclude: [
    "Gives both answers with the correct units — 40 feet of edging and 96 square feet of mulch — not one or the other, and not both in the same unit",
    "Shows the work for each: all four sides added for perimeter, the two dimensions multiplied for area",
    "Explains the decision rule in terms of what the job does (border versus cover), not by naming a formula",
  ],
};
