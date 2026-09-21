// SERVER ONLY. Never import this from a "use client" component. Holds the
// grading rubric for this Signal Check case.
// Math Signal Check — MA.3.8B-SC. TEKS 3.8B — solve one- and two-step problems using categorical data represented with a frequency table, dot plot, pictograph, or bar graph with scaled intervals.

export const SERVER_CASE = {
  standard: "MA.3.8B-SC",
  title: "The Lunch Vote",
  stemMode: "dropdown",
  modelAnswer:
    "\"Pizza got more votes than any other single lunch.\" is TRUE because the pizza bar reaches 14, which is higher than tacos at 8, salad at 6, and soup at 4. \"Pizza got more votes than tacos, salad, and soup added together.\" is FALSE because tacos, salad, and soup add up to 8 + 6 + 4 = 18 votes, which is more than pizza's 14. \"Most of the class picked pizza.\" is MISLEADING because pizza was the top pick, but 14 is less than half of the 32 students who voted.",
  mustInclude: [
    "Signal A marked True.",
    "Signal B marked False.",
    "Signal C marked Misleading.",
    "Evidence picks name Pizza bar or Other bars for Signal A.",
    "Evidence picks name Adding the others or Graph scale for Signal B.",
  ],
  // Per-signal verdicts, so the grade-3 submit route can score the verdicts automatically.
  statements: {
    A: {
      correctVerdict: "True",
      mustInclude: [
        "Notes that pizza's bar (14) is higher than each other bar.",
        "Reads the bars using the scale.",
      ],
    },
    B: {
      correctVerdict: "False",
      mustInclude: [
        "Adds the other lunches to get 18.",
        "States 18 is more than 14.",
      ],
    },
    C: {
      correctVerdict: "Misleading",
      mustInclude: [
        "Agrees pizza was the top single choice.",
        "Explains 14 is less than half of 32.",
      ],
    },
  },
};
