// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Math Group Chat — MA.4.3E. TEKS 4.3E — represent and solve addition and subtraction of fractions with equal denominators using objects and pictorial models that build to the number line.

export const SERVER_CASE = {
  standard: "MA.4.3E",
  title: "The Trail Math",
  bigQuestion: "Priya hiked 3/8 of the trail this morning and 2/8 after lunch. How much of the trail did she hike in all?",
  evidenceBank: [
    "Winding Wendy is marked in 8 equal sections",
    "Priya passed 3 section markers in the morning and 2 more after lunch",
    "5/16 is less than the 3/8 Priya had already hiked by lunch",
    "Lina's three jumps of 1/8, then two more, land on 5/8",
    "Adding fractions with the same denominator adds how many pieces, not the size of the pieces"
  ],
  trapLine: "Add the tops, add the bottoms. 3/8 plus 2/8 is 5/16. That's what I'm logging.",
  castNames: {
    priya: "Priya",
    wendy: "Winding Wendy",
    dev: "Dev",
    lina: "Lina",
    bo: "Ranger Bo"
  },
  distractors: "Adding numerators and denominators separately; thinking a bigger denominator means a bigger amount; losing track that each piece stays one-eighth in size; not checking an answer against what was already hiked or against the benchmark 1/2.",
  mustInclude: [
    "It says Priya hiked 5/8 of the trail.",
    "It explains the denominator stays 8 because the sections did not change size.",
    "It uses the trail sections or Lina's number line jumps.",
    "It points out that 5/16 is less than what she had already hiked.",
    "It gives Ranger Bo a rule for adding fractions with the same denominator."
  ],
};
