// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric for this Signal Check case.
// Math Signal Check — MA.5.6B-SC. TEKS 5.6B — determine the volume of a rectangular prism with whole number side lengths in problems related to the number of layers times the number of unit cubes in the area of the base.

export const SERVER_CASE = {
  standard: "MA.5.6B-SC",
  title: "The Taller Box",
  stemMode: "open",
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Finds 12 cubes in the base of Box A.",
        "Notes Box A has 2 layers.",
      ],
    },
    B: {
      correctVerdict: "True",
      mustInclude: [
        "Finds 4 cubes in the base of Box B.",
        "Multiplies by 6 layers to get 24.",
      ],
    },
    C: {
      correctVerdict: "False",
      mustInclude: [
        "States both boxes hold 24 cubes.",
        "Explains height alone doesn't decide volume.",
      ],
    },
  },
};
