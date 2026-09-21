// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Math Group Chat — MA.3.3H. TEKS 3.3H — compare two fractions having the same numerator or denominator in problems by reasoning about their sizes and justifying the conclusion using symbols, words, objects, and pictorial models.

export const SERVER_CASE = {
  standard: "MA.3.3H",
  title: "More Slices, More Pizza",
  bigQuestion: "Theo wants 1/8 of a pizza instead of 1/4. Is an eighth really a bigger slice?",
  evidenceBank: [
    "The two pizzas are exactly the same size",
    "One pizza was cut into 8 equal slices and the other into 4",
    "Octavia on top of Quinn covers only half of her",
    "Two Octavias cover one Quinn exactly",
    "Cutting the same whole into more pieces makes each piece smaller"
  ],
  trapLine: "I want the eighth, not the fourth. Eight is bigger than four, so an eighth is a bigger slice.",
  castNames: {
    theo: "Theo",
    octavia: "Octavia",
    quinn: "Quinn",
    twins: "Twin Crusts",
    ada: "Ms. Ada"
  },
  distractors: "Thinking a bigger denominator means a bigger fraction; comparing fractions from wholes that are different sizes; thinking 1/8 is bigger because there are more slices in total; forgetting that all the slices in one pizza must be equal.",
  mustInclude: [
    "It says 1/4 is the bigger slice.",
    "It says the two pizzas are the same size.",
    "It uses Octavia covering only half of Quinn, or two eighths making one fourth.",
    "It explains that more slices means each slice is smaller.",
    "It gives Ms. Ada a rule for comparing fractions like these."
  ],
};
