// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.5.15B, TEKS 5.15B).

export const SERVER_CASE = {
  standard: "SS.5.15B",
  title: "The President Said Yes. Case Closed?",
  bigQuestion: "If the president approves something, is the decision automatically final, or can other branches still check that power?",
  evidenceBank: [
    "The president can sign or veto legislation.",
    "Congress can override a presidential veto with enough votes.",
    "Courts can review laws or government actions for constitutionality."
  ],
  trapLine: "The president said yes, so the other branches cannot do anything about it.",
  castNames: {
    president: "President Parker",
    congress: "Casey Congress",
    court: "Justice Jay",
    balance: "Bree Balance",
    clerk: "Mr. Reed"
  },
  distractors: "Treating checks and balances as branches fighting; saying the courts make laws; saying Congress can always overturn anything; saying the president has no power; naming checks without explaining the purpose.",
  mustInclude: [
    "Explains that power is divided among branches.",
    "Describes a congressional check.",
    "Describes a court/judicial check.",
    "Explains why checks and balances exist.",
    "Rejects the one-branch-final-word claim."
  ],
};
