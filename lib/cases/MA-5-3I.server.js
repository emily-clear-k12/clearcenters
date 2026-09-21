// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Math Group Chat — MA.5.3I. TEKS 5.3I — represent and solve multiplication of a whole number and a fraction that refers to the same whole using objects and pictorial models, including area models.

export const SERVER_CASE = {
  standard: "MA.5.3I",
  title: "The Half-Batch Problem",
  bigQuestion: "The recipe needs 6 cups of flour. Omar is making the recipe times 1/2. How much flour does he need?",
  evidenceBank: [
    "The recipe calls for 6 cups of flour",
    "Six half-cups of flour make 3 whole cups",
    "Arie shades half of each of the 6 cups and gets 3",
    "6 x 2 = 12, 6 x 1 = 6, and 6 x 1/2 = 3",
    "Multiplying by a number less than 1 gives less than you started with"
  ],
  trapLine: "We're making it times 1/2. Multiplying always makes things bigger, so we need more than 6 cups.",
  castNames: {
    omar: "Omar",
    cardie: "Cardie",
    cuppy: "Cuppy",
    arie: "Arie",
    rina: "Aunt Rina"
  },
  distractors: "Thinking multiplication always makes a number bigger; confusing 6 x 1/2 with 6 + 1/2 or 6 ÷ 1/2; thinking half a batch needs more because there is multiplying involved; losing track of what the whole is.",
  mustInclude: [
    "It says Omar needs 3 cups of flour.",
    "It uses Cuppy's six half-cups or Arie's shading.",
    "It uses the pattern: as the number you multiply by gets smaller, the answer gets smaller.",
    "It says Aunt Rina's 4 cups is enough.",
    "It gives a rule: multiplying by a number less than 1 gives less than you started with."
  ],
};
