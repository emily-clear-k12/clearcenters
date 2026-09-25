// Motion Path Test — server-only answer keys, feedback and grading rubric.
// Never imported by client code (app/api/simulation-lab/* only).
// TEKS 3.7B — plan and conduct a descriptive investigation to demonstrate and explain how

export const SERVER_CASE = {
  "standard": "3.7B-SL",
  "title": "Motion Path Test",
  "checkpoints": [
    {
      "id": "cp1",
      "type": "mc",
      "correctChoiceId": "increase"
    },
    {
      "id": "fair",
      "type": "mc",
      "correctChoiceId": "push",
      "sceneOnly": true
    }
  ],
  "feedback": {
    "cp1": {
      "yes": "Yes! A stronger push made the crate slide farther. Your dots climb as you go right.",
      "hint": "Look again: follow your dots from left to right. Do they climb, drop, or stay level?"
    },
    "fair": {
      "yes": "Right! Only the push strength changed. The crate, the floor and the starting line stayed the same, so it was a fair test.",
      "hint": "Hmm, that one stayed the same every time. What did you change with the + and − buttons?"
    }
  },
  "mustInclude": [
    "States the relationship: a stronger push makes the crate slide farther.",
    "References one real trial (a push strength and a distance in tiles), from either round.",
    "Uses 'push' or 'force' correctly."
  ],
  "modelAnswer": "When the push got stronger, the crate slid farther. At push strength 6, it slid 12 floor tiles on the smooth floor.",
  "aiContext": "Grade 3 Science, TEKS 3.7B (pushes and pulls change position and motion). Two-round push/slide experiment. Round 1 smooth floor: push 1->2 tiles, 2->4 ... 9->18. Round 2 carpet: push 1->1 ... 9->9 (same pattern, shorter slides). Grade 3: one clear sentence with one real data point is enough; do not require a Round 1 vs Round 2 comparison."
};
