// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.5.17B, TEKS 5.17B).

export const SERVER_CASE = {
  standard: "SS.5.17B",
  title: "Dear... Who?",
  bigQuestion: "How can citizens decide which elected or appointed government leader to contact about a problem?",
  evidenceBank: [
    "For a city park, neighborhood street, or local service, contact a local elected leader or relevant local department.",
    "For a state law or statewide issue, contact a state legislator, governor’s office, or appropriate state agency.",
    "For a federal law or national issue, contact members of Congress or the appropriate federal office."
  ],
  trapLine: "Just send every government problem to the president. He is in charge of government.",
  castNames: {
    maddie: "Maddie Mailer",
    local: "Councilor Cruz",
    state: "Representative Reed",
    national: "Senator Lane",
    navigator: "Navi Torres"
  },
  distractors: "Sending every issue to the president; treating appointed officials as elected; confusing state legislators with members of Congress; choosing by importance instead of responsibility; giving a leader name without explaining why.",
  mustInclude: [
    "Matches a local issue to a local leader/office.",
    "Matches a state issue to a state leader/office.",
    "Matches a national issue to a federal/national leader.",
    "Recognizes appointed officials/agencies can be contacts.",
    "Explains issue→level→leader."
  ],
};
