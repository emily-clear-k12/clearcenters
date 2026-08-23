// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.5.17C, TEKS 5.17C).

export const SERVER_CASE = {
  standard: "SS.5.17C",
  title: "The Pizza Vote Disaster",
  bigQuestion: "What makes voting a fair method for group decision-making, even when some people do not get their preferred outcome?",
  evidenceBank: [
    "Each student received one vote and the same choices.",
    "Before voting, the group agreed that the option with the most votes would be selected.",
    "Votes were counted once using the same rule for every ballot."
  ],
  trapLine: "My choice lost, so the vote must have been unfair.",
  castNames: {
    tori: "Tori Tally",
    ballot: "Benny Ballot",
    counter: "Cora Counter",
    rule: "Ravi Rules",
    chair: "Ms. Ortiz"
  },
  distractors: "Equating losing with unfairness; changing the rule after results; allowing some people extra votes; saying unanimous agreement is required; reading the totals incorrectly.",
  mustInclude: [
    "Explains equal voting opportunity.",
    "Uses the agreed rule.",
    "Uses vote totals/counting correctly.",
    "Separates fair process from preferred result.",
    "Explains voting as group decision-making."
  ],
};
