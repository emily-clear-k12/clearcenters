// SERVER ONLY - Thread rubric for 3.11B-SC-TH.

export const SERVER_CASE = {
  standard: "3.11B-SC-TH",
  title: 'Thread: Unlimited Water?',
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
    'ran low',
    'rain',
    'not unlimited',
  ],
  modelAnswer:
    'Claim is false/misleading. Tank dropped in drought; only refills after rain. Renewable is not unlimited everywhere.',
};
