// SERVER ONLY - Thread rubric for 3.10C-SC-TH.

export const SERVER_CASE = {
  standard: "3.10C-SC-TH",
  title: 'Thread: Overnight Change?',
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
    'slow',
    'weekly',
    'not overnight',
  ],
  modelAnswer:
    'Claim is false. Bank changed, but weekly photos show slow wear - not an overnight event.',
};
