// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric Claude uses to score each statement's typed verdict +
// reasoning (grade 5 is fully open response — no chips to check).
//
// Standard verified against Emily's official Texas Grade 5 Science TEKS
// reference (see lib/cases/TEKS_STANDARDS.md) — 5.6A, physical properties
// of matter including magnetism.

export const SERVER_CASE = {
  standard: "5.6A-SC",
  title: "Does a Magnet Catch Every Piece of Metal?",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies that the magnet works on the steel objects.",
        "Uses evidence that the steel paperclip and nail stuck instantly.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Identifies that the magnet does not work on the aluminum or copper objects.",
        "Uses evidence that the can and penny did not stick even after repeated tries.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States that a magnet cannot pick up any piece of metal.",
        "Explains that magnetism is a property only some metals, like iron and steel, have.",
      ],
    },
  },
};
