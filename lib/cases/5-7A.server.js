// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.

export const SERVER_CASE = {
  standard: "5.7A",
  title: "The Dog Walk Standoff",
  bigQuestion: "Why didn't the leash move at all in one round of the dog walk, but suddenly lurch sideways in the next?",
  evidenceBank: [
    "Round 1: Max pulls with 40 N, Bella pulls with 40 N \u2192 leash doesn't move",
    "Round 2: Max pulls with 55 N, Bella pulls with 30 N \u2192 leash moves toward Max",
    "Force-meter readings recorded on both sides, both rounds",
    "Energy visibly transfers into motion only in Round 2"
  ],
  trapLine: "As long as both dogs are pulling, I have to go somewhere \u2014 pulling always makes things move.",
  castNames: {
    lenny: "Lenny the Leash",
    max: "Max the Dog",
    bella: "Bella the Dog",
    frankie: "Frankie the Force Meter",
    dana: "Dana the Dog Walker"
  },
  distractors: "Thinking motion requires continuous force to keep going; assuming \"no motion visible\" means \"no force at all\" (missing that balanced forces are still forces).",
  mustInclude: [
    "Uses the force-meter numbers from both rounds",
    "Distinguishes equal-force (no motion) from unequal-force (motion) results",
    "Connects energy transfer to the unequal-force case",
    "Rejects the \"pulling always causes motion\" claim",
    "States the equal/unequal forces rule"
  ],
};
