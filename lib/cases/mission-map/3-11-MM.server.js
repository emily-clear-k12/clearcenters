// Mission Map — "Fraction Path Unlock" — SERVER ONLY.
// Never import this from a client component. See 3-11-MM.public.js for the
// TEKS 3.7A alignment and the 3.3C equal-parts note.

export const SERVER_CASE = {
  standard: "3.11-MM",
  title: "Fraction Path Unlock",

  checkpoints: [
    { id: "cp1", correctChoiceId: "a" },
    { id: "cp2", correctChoiceId: "b" },
    { id: "cp3", correctChoiceId: "a" },
    { id: "cp4", type: "showdown", correctSide: "B" },
    { id: "cp5", type: "quickScan", correctChoiceId: "a" },
    { id: "cp6", correctChoiceId: "a" },
  ],

  modelAnswer:
    "The whole is the distance from 0 to 1. Three marks cut that distance into 4 equal spaces, so each space is one fourth. The plank for 3/4 goes at the third mark, because I counted 3 equal spaces starting from 0. The line with uneven parts cannot hold the plank. It has 4 parts, but the parts are different sizes, so none of them is really one fourth. A fraction on a number line is a distance from 0, and you can only measure that distance if every part matches.",

  mustInclude: [
    "Identifies the whole as the distance from 0 to 1, not as the number 1 alone",
    "Places 3/4 by counting 3 equal spaces from 0, showing the count rather than only naming the mark",
    "Rejects the uneven line for the right reason — the parts are not equal, so they are not fourths — rather than for having the wrong number of marks",
  ],
};
