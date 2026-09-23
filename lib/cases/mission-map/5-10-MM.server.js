// Mission Map — "Volume Vault" — SERVER ONLY.
// Never import this from a client component. See 5-10-MM.public.js for the
// TEKS 5.6B alignment and the layers-times-the-base note.

export const SERVER_CASE = {
  standard: "5.10-MM",
  title: "Volume Vault",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", correctChoiceId: "b" },
    { id: "cp3", type: "quickScan", correctChoiceId: "c" },
    { id: "cp4", type: "showdown", correctSide: "B" },
    { id: "cp5", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "The crate holds 60 cubic units. I built it from the base: the floor measures 5 cubes across and 3 cubes deep, so one full layer is 5 x 3 = 15 cubes. The crate stands 4 cubes tall and every layer is packed the same, so there are 4 identical layers. That makes 15 x 4 = 60 cubes in all. Counting only the cubes visible through the window gave 15, which is the number in a single layer. The front face is flat, so counting it measures the area of one layer rather than the space inside the whole crate. The three layers stacked behind it are still full of cubes, and volume has to count all of them.",

  mustInclude: [
    "Gives 60 with a volume unit (cubic units or cubes), not a bare number or a square unit",
    "Shows the layers-times-base structure: 15 cubes in the base layer and 4 layers, rather than only stating 5 x 3 x 4",
    "Explains the rejected report as measuring one layer or a flat face, not as a counting or arithmetic mistake",
  ],
};
