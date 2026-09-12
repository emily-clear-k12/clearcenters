// SERVER ONLY — Thread rubric for 5.6B-SC-TH.

export const SERVER_CASE = {
  standard: '5.6B-SC-TH',
  title: 'Thread: Brand-New Stuff?',
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
    'magnet',
    'mixture',
    'separate',
  ],
  modelAnswer:
    'Flag Mag + Pour + Keep helpful. Blend + Forever misleading. Cup off-topic. Reply: claim is false — magnet separates them; still a mixture.',
};
