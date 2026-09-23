// Mission Map — "Decimal Tenths Treasure" — SERVER ONLY.
// Never import this from a client component. See 4-12-MM.public.js for the
// TEKS 4.2B alignment and the note on why this is not 4.2G.

export const SERVER_CASE = {
  standard: "4.12-MM",
  title: "Decimal Tenths Treasure",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", correctChoiceId: "a" },
    { id: "cp3", correctChoiceId: "a" },
    { id: "cp4", type: "showdown", correctSide: "B" },
    { id: "cp5", correctChoiceId: "a" },
    { id: "cp6", type: "quickScan", correctChoiceId: "a" },
  ],

  modelAnswer:
    "The dial should read 0.4. The grid in the lid is one whole cut into 10 equal columns, and 4 of them are shaded, so it shows four of ten equal parts. As a fraction that is 4/10, and as a decimal it is 0.4, because the first place after the decimal point is the tenths place. 0.4 and 0.04 are not the same, even though both are written with a 4. In 0.04 the 4 has moved one place further right into the hundredths, so it is worth only one tenth as much. On a hundredths grid, 0.4 covers 40 small squares and 0.04 covers only 4. The digit stayed the same; its position changed, and the position is what sets the value.",

  mustInclude: [
    "Links all three representations — the shaded grid, the fraction 4/10, and the decimal 0.4 — rather than only giving the decimal",
    "Names the tenths place explicitly as the reason the 4 is worth four tenths",
    "Explains the 0.4 / 0.04 difference as a change of POSITION, not a change of digit or a matter of how many digits are written",
  ],
};
