// Settlement Distance Test — server-only answer keys, feedback and grading rubric.
// Never imported by client code (app/api/simulation-lab/* only).
// TEKS SS 4.7A — explain the geographic factors such as landforms and climate that influence

export const SERVER_CASE = {
  "standard": "SS.4.7A-SL",
  "title": "Settlement Distance Test",
  "checkpoints": [
    {
      "id": "cp1",
      "type": "mc",
      "correctChoiceId": "decrease"
    },
    {
      "id": "fair",
      "type": "mc",
      "correctChoiceId": "miles",
      "sceneOnly": true
    }
  ],
  "feedback": {
    "cp1": {
      "yes": "Yes! Farther from the river, fewer families settled. Your dots drop as you go right.",
      "hint": "Look again: follow your dots from near the river (left) to far away (right). Do they climb, drop, or stay level?"
    },
    "fair": {
      "yes": "Right! Only the distance from the river changed. Same river, same wagons, same year, so it was a fair test.",
      "hint": "Hmm, that one stayed the same every test. What did you change on the map?"
    }
  },
  "mustInclude": [
    "States that sites farther from the river attract fewer settler families.",
    "References one real trial (miles and families).",
    "Gives a geographic why: water for drinking and farming, fertile land, or travel/trade on the river (rocky land is harder to farm)."
  ],
  "modelAnswer": "As a site got farther from the river, fewer families settled there. At 5 miles, 20 families settled. People settled near the river because they needed water for drinking and farming, and the land near the river was easier to farm.",
  "aiContext": "Grade 4 Social Studies, TEKS 4.7A (geographic factors such as landforms and climate influence patterns of settlement). Model of 1800s Texas settlement. Round 1: 1 mile->36 families, 2->32 ... 9->4. Round 2 (land farther out is rocky): 1->34, 2->29, 3->24, 4->19, 5->14, 6->10, 7->6, 8->3, 9->1 (steeper drop). A complete answer states the pattern, cites one real trial and gives a geographic reason (water, fertile land, transportation; rocky land is harder to farm)."
};
