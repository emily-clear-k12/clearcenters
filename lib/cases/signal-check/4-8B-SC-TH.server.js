// SERVER ONLY — Thread rubric for 4.8B-SC-TH.

export const SERVER_CASE = {
  standard: "4.8B-SC-TH",
  title: 'Thread: Towel Makes Cold?',
  caseShape: "thread",
  stemMode: "dropdown-open",
  commentFlags: {
    c1: "misleading",
    c2: "helpful",
    c3: "helpful",
    c4: "off_topic",
    c5: "helpful",
    c6: "misleading",
  },
  mustFlagIds: ["c1", "c2", "c3", "c4", "c5", "c6"],
  replyMustInclude: [
    "heat",
    "not",
    "cold",
  ],
  modelAnswer:
    'Flag Clock + Therm + Insul helpful. Freeze + Magic misleading. Scoop off-topic. Reply: towel slows heat; it doesn\'t make cold.',
};
