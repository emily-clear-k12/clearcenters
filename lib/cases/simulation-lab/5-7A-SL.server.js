// Tug Balance Test — server-only answer keys, feedback and grading rubric.
// Never imported by client code (app/api/simulation-lab/* only).
// TEKS 5.7A — investigate and explain how equal and unequal forces acting on an object cause

export const SERVER_CASE = {
  "standard": "5.7A-SL",
  "title": "Tug Balance Test",
  "checkpoints": [
    {
      "id": "cp1",
      "type": "mc",
      "correctChoiceId": "increase"
    },
    {
      "id": "fair",
      "type": "mc",
      "correctChoiceId": "diff",
      "sceneOnly": true
    }
  ],
  "feedback": {
    "cp1": {
      "yes": "Yes! A bigger force difference sent the cart farther. Your dots climb as you go right.",
      "hint": "Look again: follow your dots from left to right. Do they climb, drop, or stay level?"
    },
    "fair": {
      "yes": "Right! Only the force difference changed. Same cart, same left winch, same track, so it was a fair test.",
      "hint": "Hmm, that one stayed the same every test. What did you change with the + and − buttons?"
    }
  },
  "mustInclude": [
    "States that a larger unbalanced force moves the cart farther.",
    "Notes that 0 N difference (balanced forces) means no motion.",
    "References real trial data."
  ],
  "modelAnswer": "As the force difference got bigger, the cart rolled farther. At 5 N difference it rolled 15 m with the light cart. At 0 N the forces were balanced, so the cart did not move. The heavier cart followed the same pattern but rolled shorter distances, like 10 m at 5 N.",
  "aiContext": "Grade 5 Science, TEKS 5.7A (equal and unequal forces cause patterns of motion). Two winches pull a cart; the variable is the force difference. Round 1 light cart: 0 N->0 m, 1->3 ... 8->24 (3 m per N). Round 2 heavier cart: 0->0, 1->2 ... 8->16 (2 m per N). A complete grade 5 answer states the pattern, cites real data and explains that balanced forces (0 N) cause no motion. Comparing rounds is a bonus."
};
