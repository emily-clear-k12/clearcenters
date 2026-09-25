// Stacking Cups — server-only answer keys, feedback and grading rubric.
// Never imported by client code (app/api/simulation-lab/* only).
// TEKS Math 5.8C — graph in the first quadrant of the coordinate plane ordered pairs of

export const SERVER_CASE = {
  "standard": "MA.5.8C-SL",
  "title": "Stacking Cups",
  "checkpoints": [
    {
      "id": "cp1",
      "type": "mc",
      "correctChoiceId": "sameStep"
    },
    {
      "id": "fair",
      "type": "mc",
      "correctChoiceId": "count",
      "sceneOnly": true
    }
  ],
  "feedback": {
    "cp1": {
      "yes": "Yes! Each cup adds the same amount, so the points line up in a straight line on the graph.",
      "hint": "Look at your table: find how much the height grows from one row to the next. Is the jump the same each time?"
    },
    "fair": {
      "yes": "Right! The input was the number of cups. The cup type, the table and the ruler stayed the same.",
      "hint": "Hmm, that one stayed the same every stack. What did you change with the + and − buttons?"
    }
  },
  "mustInclude": [
    "States that each added cup increases the height by the same amount (2 cm for the first cups; 3 cm for the taller cups).",
    "Cites at least two real ordered pairs (cups, height) from the table or graph.",
    "Describes the rule (start height plus the same step per cup) or explains that the points form a straight line."
  ],
  "modelAnswer": "Each cup I added made the stack 2 cm taller. With 3 cups the stack was 12 cm, so one pair is (3, 12), and with 6 cups it was 18 cm, (6, 18). The first cup is 8 cm and every extra cup adds 2 cm, so the points make a straight line. With the taller cups, each cup added 3 cm instead, like (4, 21).",
  "aiContext": "Grade 5 Mathematics, TEKS 5.8C (graph ordered pairs from real-world problems and input-output tables; also 5.4D additive patterns). Nested cup stack. Round 1 short cups: cups n -> height 2n + 6 cm (1->8, 2->10, 3->12 ... 10->26). Round 2 taller cups: 3n + 9 cm (1->12, 2->15 ... 10->39). A complete answer names the constant step (2 cm, then 3 cm), cites at least two real ordered pairs and describes the rule or straight-line pattern. Accept 'adds 2 each time' style wording; do not require algebraic notation."
};
