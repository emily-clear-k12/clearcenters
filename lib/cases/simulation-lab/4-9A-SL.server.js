// Seasons Shadow Track — server-only answer keys, feedback and grading rubric.
// Never imported by client code (app/api/simulation-lab/* only).
// TEKS 4.9A — collect and analyze data to identify sequences and predict patterns of change in

export const SERVER_CASE = {
  "standard": "4.9A-SL",
  "title": "Seasons Shadow Track",
  "checkpoints": [
    {
      "id": "cp1",
      "type": "mc",
      "correctChoiceId": "decrease"
    },
    {
      "id": "fair",
      "type": "mc",
      "correctChoiceId": "month",
      "sceneOnly": true
    }
  ],
  "feedback": {
    "cp1": {
      "yes": "Yes! The noon shadow gets shorter from winter to summer. Your dots drop as you go right.",
      "hint": "Look again: follow your dots from December toward June. Do they climb, drop, or stay level?"
    },
    "fair": {
      "yes": "Right! Only the month changed. We always measured the same pole at noon with the same ruler.",
      "hint": "Hmm, that one stayed the same every test. We always measured at noon. What did you change?"
    }
  },
  "mustInclude": [
    "States the seasonal pattern: from winter (December) to summer (June) the noon shadow gets shorter.",
    "Cites real data from at least one month (month and shadow length), ideally two.",
    "Links it to the season: the noon Sun is higher in summer and lower in winter (or predicts the next step in the sequence)."
  ],
  "modelAnswer": "From winter to summer, the noon shadow got shorter. In December it was 8 feet long, but in April it was only 2 feet. The noon Sun is higher in the sky in summer, so I predict the shadow in July would still be very short.",
  "aiContext": "Grade 4 Science, TEKS 4.9A (collect and analyze data to identify sequences and predict patterns of change in seasons). Noon shadow of a flagpole on the 15th of each month at about 30°N. Round 1 (6 ft pole): Dec 8 ft, Jan 7.5, Feb 5.5, Mar 4, Apr 2, May 1, Jun 0.5. Round 2 (10 ft pole): Dec 13.5, Jan 12.5, Feb 9.5, Mar 6.5, Apr 3.5, May 2, Jun 1. A complete answer names the seasonal sequence (shorter toward summer), cites real data, and links it to the Sun being higher at noon in summer or makes a sensible prediction. Do not require the word 'altitude'."
};
