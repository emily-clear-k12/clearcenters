// SERVER ONLY - Thread rubric for 3.7A-SC-TH.

export const SERVER_CASE = {
  standard: "3.7A-SC-TH",
  title: 'Thread: Gravity Skips Light?',
  caseShape: "thread",
  stemMode: "dropdown",
  commentFlags: {
    c1: "misleading",
    c2: "helpful",
    c3: "helpful",
    c4: "off_topic",
    c5: "helpful",
    c6: "misleading",
    c7: "needs_evidence",
  },
  mustFlagIds: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'],
  replyMustInclude: [
    'gravity',
    'air',
    'shape',
  ],
  modelAnswer:
    'Claim is false. Filter always lands; crumpled falls faster. Gravity pulls - air slows the flat shape.',
};
