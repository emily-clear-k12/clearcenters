// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Math Group Chat — MA.4.6B. TEKS 4.6B — identify and draw one or more lines of symmetry, if they exist, for a two-dimensional figure.

export const SERVER_CASE = {
  standard: "MA.4.6B",
  title: "The Fold Test",
  bigQuestion: "Paralee the parallelogram looks balanced. Does she have a line of symmetry?",
  evidenceBank: [
    "Folded down the middle, Paralee's halves don't line up",
    "Folded corner to corner, her halves still don't line up",
    "Rex Tangle folds and both halves match exactly, two different ways",
    "Held down Paralee's middle, Mirra shows a shape that isn't Paralee",
    "A line of symmetry means both halves match exactly when folded"
  ],
  trapLine: "Paralee looks perfectly balanced, so she has to have a line of symmetry. She's going on the wall.",
  castNames: {
    zara: "Zara",
    paralee: "Paralee",
    rex: "Rex Tangle",
    crease: "Crease",
    mirra: "Mirra",
    tate: "Mr. Tate"
  },
  distractors: "Thinking a shape that looks balanced or even must be symmetrical; thinking any line through the middle is a line of symmetry; thinking a shape with parallel sides must have symmetry; confusing turning a shape halfway around with folding it.",
  mustInclude: [
    "It says Paralee has no line of symmetry.",
    "It uses what happened when she was folded.",
    "It tries more than one fold line.",
    "It compares her to Rex Tangle, whose halves match.",
    "It gives Mr. Tate a rule: both halves must match exactly when folded."
  ],
};
