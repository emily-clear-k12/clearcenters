// SERVER ONLY - Thread rubric for 3.9B-SC-TH.

export const SERVER_CASE = {
  standard: "3.9B-SC-TH",
  title: 'Thread: Biggest Goes First?',
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
    'distance',
    'not size',
    'orbit',
  ],
  modelAnswer:
    'Claim is false. Mercury is small and closest; Jupiter is huge and farther out. Orbit distance - not size - sets order.',
};
