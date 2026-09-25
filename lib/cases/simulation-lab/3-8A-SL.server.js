// Rubber Band Launch — server-only answer keys, feedback and grading rubric.
// Never imported by client code (app/api/simulation-lab/* only).
// TEKS 3.8A — identify everyday examples of energy, including light, sound, thermal, and

export const SERVER_CASE = {
  "standard": "3.8A-SL",
  "title": "Rubber Band Launch",
  "checkpoints": [
    {
      "id": "cp1",
      "type": "mc",
      "correctChoiceId": "increase"
    },
    {
      "id": "fair",
      "type": "mc",
      "correctChoiceId": "stretch",
      "sceneOnly": true
    }
  ],
  "feedback": {
    "cp1": {
      "yes": "Yes! A bigger stretch sent the pod farther. Your dots climb as you go right.",
      "hint": "Look again: follow your dots from left to right. Do they climb, drop, or stay level?"
    },
    "fair": {
      "yes": "Right! Only the stretch changed. The band, the pod and the launcher stayed the same, so it was a fair test.",
      "hint": "Hmm, that one stayed the same every launch. What did you change before each launch?"
    }
  },
  "mustInclude": [
    "States the relationship: a bigger stretch makes the pod fly farther.",
    "References one real trial (stretch and flight distance) from either round.",
    "Names the stored energy as mechanical (motion) energy, or says the stretched band stores energy that becomes motion."
  ],
  "modelAnswer": "When I stretched the rubber band farther, the pod flew farther. At 10 cm of stretch, it flew 50 cm. The stretched band stores mechanical energy that turns into motion.",
  "aiContext": "Grade 3 Science, TEKS 3.8A (everyday examples of energy, including mechanical). Rubber-band launcher. Round 1 light pod: stretch 2cm->10cm flight ... 18->90 (5x). Round 2 heavier pod: 2->6 ... 18->54 (3x): same pattern, shorter flights. Grade 3: one clear sentence with one real data point plus naming mechanical energy (or energy stored in the band becoming motion) is a complete answer."
};
