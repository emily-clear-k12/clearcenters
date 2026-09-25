// Market Price Test — server-only answer keys, feedback and grading rubric.
// Never imported by client code (app/api/simulation-lab/* only).
// TEKS SS 3.6A — explain how supply and demand affect the price of a good or service.

export const SERVER_CASE = {
  "standard": "SS.3.6A-SL",
  "title": "Market Price Test",
  "checkpoints": [
    {
      "id": "cp1",
      "type": "mc",
      "correctChoiceId": "decrease"
    },
    {
      "id": "fair",
      "type": "mc",
      "correctChoiceId": "price",
      "sceneOnly": true
    }
  ],
  "feedback": {
    "cp1": {
      "yes": "Yes! When the price went up, fewer people bought. Your dots drop as you go right.",
      "hint": "Look again: follow your dots from low prices (left) to high prices (right). Do they climb, drop, or stay level?"
    },
    "fair": {
      "yes": "Right! Only the price changed. Same fruit cups, same stand, one hour each time, so it was a fair test.",
      "hint": "Hmm, that one stayed the same every hour. What did you change on the price tag?"
    }
  },
  "mustInclude": [
    "States that a higher price means fewer buyers (less demand).",
    "References one real trial (price and buyers).",
    "Uses price/buyers language correctly."
  ],
  "modelAnswer": "When the price went up, fewer people bought fruit cups. At 150¢, there were 20 buyers in an hour.",
  "aiContext": "Grade 3 Social Studies, TEKS 3.6A (how supply and demand affect price). Fruit-cup stand model. Round 1 sunny recess: 50¢->36 buyers, 75->32 ... 250->4 (4 fewer per 25¢). Round 2 rainy recess (fewer shoppers outside): 50->28, 75->24, 100->20, 125->16, 150->12, 175->9, 200->6, 225->3, 250->1. Grade 3: one clear sentence with one real data point (higher price -> fewer buyers) is a complete answer; do not require a round comparison."
};
