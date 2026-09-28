// Supply & Price Test — server-only answer keys, feedback and grading rubric.
// Never imported by client code (app/api/simulation-lab/* only).
// TEKS SS 5.11B — evaluate the effects of supply and demand on industry and agriculture,

export const SERVER_CASE = {
  "standard": "SS.5.11B-SL",
  "title": "Supply & Price Test",
  "checkpoints": [
    {
      "id": "cp1",
      "type": "mc",
      "correctChoiceId": "decrease"
    },
    {
      "id": "fair",
      "type": "mc",
      "correctChoiceId": "crates",
      "sceneOnly": true
    }
  ],
  "feedback": {
    "cp1": {
      "yes": "Yes! More crates for sale meant a lower price. Your dots drop as you go right.",
      "hint": "Look again: follow your dots from few crates (left) to many crates (right). Do they climb, drop, or stay level?"
    },
    "fair": {
      "yes": "Right! Only the supply changed. Same farm, same market, the same crowd of shoppers, so it was a fair test.",
      "hint": "Hmm, that one stayed the same every Saturday. What did you change with the + and − buttons?"
    }
  },
  "mustInclude": [
    "States that greater supply lowers the price (when demand stays the same).",
    "References real trial data.",
    "Uses supply and demand correctly, e.g. higher demand raised prices at every supply level."
  ],
  "modelAnswer": "As the supply of crates went up, the price went down. With 10 crates the price was 25 credits, but with 4 crates it was 40. During festival week demand was higher, so prices were higher at every supply level, but more supply still lowered the price. Supply and demand work together to set the price.",
  "aiContext": "Grade 5 Social Studies, TEKS 5.11B (effects of supply and demand on industry and agriculture). Strawberry farm market model. Round 1 normal week: 2 crates->45 credits, 4->40, 6->35, 8->30, 10->25, 12->20, 14->16, 16->12, 18->8. Round 2 festival week (higher demand): 2->50, 4->46 ... 18->18 (higher at every supply level, still falling). A complete grade 5 answer states the supply-price pattern with real data and uses supply and demand correctly; comparing rounds is a bonus."
};
