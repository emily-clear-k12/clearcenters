// Particle Dissolve Race — server-only answer keys, feedback and grading rubric.
// Never imported by client code (app/api/simulation-lab/* only).
// TEKS 5.6C — compare the properties of substances before and after they are combined into a

export const SERVER_CASE = {
  "standard": "5.6C-SL",
  "title": "Particle Dissolve Race",
  "checkpoints": [
    {
      "id": "cp1",
      "type": "mc",
      "correctChoiceId": "decrease"
    },
    {
      "id": "fair",
      "type": "mc",
      "correctChoiceId": "grind",
      "sceneOnly": true
    }
  ],
  "feedback": {
    "cp1": {
      "yes": "Yes! Finer salt dissolved in less time. Your dots drop as you go right.",
      "hint": "Look again: follow your dots from chunky (left) to powder (right). Do they climb, drop, or stay level?"
    },
    "fair": {
      "yes": "Right! Only the grind level changed. Same amount of salt, same water, same stirring, so it was a fair test.",
      "hint": "Hmm, that one stayed the same every test. What did you change with the + and − buttons?"
    }
  },
  "mustInclude": [
    "States that finer particles dissolve in less time.",
    "References real trial data with numbers.",
    "Explains using surface area / more contact with the water (or equivalent).",
    "Notes that the total mass stayed the same, so the salt is still in the water (matter is conserved)."
  ],
  "modelAnswer": "As the salt was ground finer, it dissolved in less time. At grind level 7 it took 28 seconds, but at level 2 it took 78 seconds. Finer pieces have more surface touching the water, so the water can break them apart faster. The scale stayed the same, so the salt was not gone; it was mixed into the water. In cold water every time was longer, but finer salt was still faster.",
  "aiContext": "Grade 5 Science, TEKS 5.6C (properties before/after forming a solution; matter is conserved in solutions). Salt grind experiment with a scale under the beaker that shows constant total mass. Round 1 warm water: grind 1->90 s, 2->78, 3->66, 4->55, 5->45, 6->36, 7->28, 8->20, 9->12. Round 2 cold water: 1->100 ... 9->22 (same pattern, slower). A complete grade 5 answer states the pattern with real data, explains surface area/contact, and notes conservation (the salt is still there because the mass did not change). Comparing rounds is a bonus, not required."
};
