// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.5.14A, TEKS 5.14A).

export const SERVER_CASE = {
  standard: "SS.5.14A",
  title: "The Breakup Letter",
  bigQuestion: "Was the Declaration of Independence only a list of complaints, or did it do several important jobs at once?",
  evidenceBank: [
    "The colonies were declaring separation from Great Britain",
    "The Declaration includes ideas about rights and government",
    "The Declaration lists grievances against the king"
  ],
  trapLine: "The Declaration was basically a complaint letter to the king. The grievances are the only part that really matters.",
  castNames: {
    theo: "Theo Marsh",
    rights: "Amelia Grant",
    grievance: "Jonas Reed",
    messenger: "Lucy Bell",
    printer: "Mr. Hale"
  },
  distractors: "Calling the Declaration only a list of complaints; treating grievances as unrelated to separation; saying it created the Constitution; claiming independence happened before the declaration; listing rights without explaining the document’s purpose.",
  mustInclude: [
    "Explains that the Declaration announced separation or independence from Great Britain.",
    "Explains a key idea about rights or legitimate government.",
    "Connects grievances to the justification for separation.",
    "Explains why the Declaration was historically important.",
    "Rejects the idea that the document was only a complaint list."
  ],
};
