// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Math Group Chat — MA.3.5B. TEKS 3.5B — represent and solve one- and two-step multiplication and division problems within 100 using arrays, strip diagrams, and equations.

export const SERVER_CASE = {
  standard: "MA.3.5B",
  title: "The Altogether Rule",
  bigQuestion: "There are 6 tables with 4 cupcakes on each one. How many cupcakes are there altogether?",
  evidenceBank: [
    "There are 6 tables, and each table has 4 cupcakes",
    "The tables are 6 equal groups of 4",
    "Captain Grid lines them up in 6 rows of 4 and counts 24",
    "Ms. Lin has already sold 20 cupcakes and still has some left",
    "The word 'altogether' shows up in both adding and multiplying problems"
  ],
  trapLine: "It says 'altogether,' so you add. Six tables and four cupcakes. That's 10.",
  castNames: {
    milo: "Milo",
    wordy: "Wordy",
    crew: "Row Crew",
    grid: "Captain Grid",
    lin: "Ms. Lin"
  },
  distractors: "Choosing the operation from a keyword instead of the situation; adding the two numbers in the problem; thinking 'altogether' always means add; not checking an answer against other facts in the story.",
  mustInclude: [
    "It says there are 24 cupcakes.",
    "It explains there are 6 equal groups of 4.",
    "It uses Captain Grid's rows or multiplication, 6 x 4.",
    "It uses the fact that Ms. Lin sold 20 and still had some left, so 10 can't be right.",
    "It gives a rule: look at what the groups are doing, not just the keyword."
  ],
};
