// Insulation Wrap Test — server-only answer keys, feedback and grading rubric.
// Never imported by client code (app/api/simulation-lab/* only).
// TEKS 4.8B — identify conductors and insulators of thermal and electrical energy. Grade 4 Science.

export const SERVER_CASE = {
  "standard": "4.8B-SL",
  "title": "Insulation Wrap Test",
  "checkpoints": [
    {
      "id": "cp1",
      "type": "mc",
      "correctChoiceId": "increase"
    },
    {
      "id": "fair",
      "type": "mc",
      "correctChoiceId": "layers",
      "sceneOnly": true
    }
  ],
  "feedback": {
    "cp1": {
      "yes": "Yes! More layers kept the cocoa hot longer. Your dots climb as you go right.",
      "hint": "Look again: follow your dots from left to right. Do they climb, drop, or stay level?"
    },
    "fair": {
      "yes": "Right! Only the number of layers changed. The mug, the cocoa and the room stayed the same, so it was a fair test.",
      "hint": "Hmm, that one stayed the same every test. What did you change with the + and − buttons?"
    }
  },
  "mustInclude": [
    "States that more insulation layers keep the drink hot longer.",
    "References one real trial (layers and minutes) from either round.",
    "Gives a simple why: insulation slows thermal energy (heat) leaving the drink."
  ],
  "modelAnswer": "As I added more insulation layers, the mug stayed hot longer. With 4 layers, it stayed hot for 20 minutes. Insulation slows down thermal energy leaving the cocoa.",
  "aiContext": "Grade 4 Science, TEKS 4.8B (conductors and insulators of thermal energy). Mug wrap experiment. Round 1 still room: 0 layers->5 min, 1->8, 2->12, then +4 per layer to 8->36. Round 2 breezy room: 0->3, 1->5, 2->8, then +3 per layer to 8->26 (same pattern, cools sooner). A complete grade 4 answer states the pattern, cites one real trial, and gives a simple reason (insulation slows heat/thermal energy leaving)."
};
