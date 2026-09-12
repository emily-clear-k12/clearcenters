// SERVER ONLY - Thread rubric for 3.13A-SC-TH.

export const SERVER_CASE = {
  standard: "3.13A-SC-TH",
  title: 'Thread: Worse Legs?',
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
    'digging',
    'running',
    'job',
  ],
  modelAnswer:
    'Claim is false. Mole claws dig; rabbit legs run. Different structures for different jobs - not worse/better overall.',
};
