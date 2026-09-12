// SERVER ONLY — Thread rubric for 5.8A-SC-TH.

export const SERVER_CASE = {
  standard: '5.8A-SC-TH',
  title: 'Thread: Brand-New Light?',
  caseShape: "thread",
  stemMode: "open",
  commentFlags: {
    c1: 'misleading',
    c2: 'helpful',
    c3: 'helpful',
    c4: 'off_topic',
    c5: 'helpful',
    c6: 'misleading',
  },
  mustFlagIds: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'],
  replyMustInclude: [
    'battery',
    'transform',
    'not',
  ],
  modelAnswer:
    'Flag Drain + Warm + Chain helpful. Poof + Free misleading. Dark off-topic. Reply: claim is false — battery energy becomes light and heat.',
};
