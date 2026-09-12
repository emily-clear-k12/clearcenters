// SERVER ONLY — Thread rubric for 5.7A-SC-TH.

export const SERVER_CASE = {
  standard: '5.7A-SC-TH',
  title: 'Thread: Rope Must Move?',
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
    'equal',
    'balance',
    'still',
  ],
  modelAnswer:
    'Flag Meter + Mark + Balance helpful. Yank + Always misleading. Gym off-topic. Reply: claim is false — equal forces, mark stayed put.',
};
