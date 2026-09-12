// SERVER ONLY — Thread rubric for 5.13B-SC-TH.

export const SERVER_CASE = {
  standard: '5.13B-SC-TH',
  title: 'Thread: Born to Sit?',
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
    'learned',
    'practice',
    'not',
  ],
  modelAnswer:
    'Flag Sit + Shake + Cold helpful. Born + AllInstinct misleading. Treat off-topic. Reply: claim is false — sit/shake needed practice.',
};
