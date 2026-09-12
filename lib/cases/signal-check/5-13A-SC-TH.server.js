// SERVER ONLY — Thread rubric for 5.13A-SC-TH.

export const SERVER_CASE = {
  standard: '5.13A-SC-TH',
  title: 'Thread: One Winter Plan?',
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
    'different',
    'turtle',
    'frog',
  ],
  modelAnswer:
    'Flag Turtle + Frog + Struct helpful. Same + Copy misleading. Skate off-topic. Reply: claim is false — three different winter strategies in one pond.',
};
