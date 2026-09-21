// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Math Group Chat — MA.5.4F. TEKS 5.4F — simplify numerical expressions that do not involve exponents, including up to two levels of grouping.

export const SERVER_CASE = {
  standard: "MA.5.4F",
  title: "Left to Right",
  bigQuestion: "The expression for the team's score is 3 + 4 x 2. What is the real score?",
  evidenceBank: [
    "The team made one 3-point shot and four 2-point baskets",
    "Four 2-point baskets is 4 x 2 = 8 points",
    "3 + 8 = 11, which matches the scoreboard",
    "Nia's 14 would only be right if the expression were (3 + 4) x 2",
    "Multiply and divide before you add and subtract, unless grouping symbols say otherwise"
  ],
  trapLine: "You always go left to right, like reading. 3 plus 4 is 7, times 2 is 14.",
  castNames: {
    nia: "Nia",
    scotty: "Scotty",
    logan: "Logan",
    paren: "Paren Twins",
    dom: "Referee Dom"
  },
  distractors: "Working an expression strictly left to right; thinking addition comes first because it is written first; ignoring what the numbers stand for; thinking parentheses are optional decoration.",
  mustInclude: [
    "It says the real score is 11.",
    "It uses the game log: one 3-pointer and four 2-point baskets.",
    "It shows multiplying 4 x 2 before adding the 3.",
    "It explains that 14 would only be right with parentheses around 3 + 4.",
    "It gives a rule: multiply and divide before you add and subtract, unless grouping symbols say otherwise."
  ],
};
