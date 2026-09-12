// SERVER ONLY - Thread rubric for 3.8A-SC-TH.

export const SERVER_CASE = {
  standard: "3.8A-SC-TH",
  title: 'Thread: Needs a Plug?',
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
    'solar',
    'battery',
    'not only plug',
  ],
  modelAnswer:
    'Claim is false. Solar light works with no plug; batteries store energy too. Wall outlet is only one way.',
};
