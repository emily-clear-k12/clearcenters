// SERVER ONLY — Thread rubric for 5.12B-SC-TH.

export const SERVER_CASE = {
  standard: '5.12B-SC-TH',
  title: 'Thread: Just the Birds?',
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
    'beetle',
    'flower',
    'more',
  ],
  modelAnswer:
    'Flag Beetle + Seed + Web helpful. BirdsOnly + Seal misleading. Red off-topic. Reply: claim is false — beetles and flowers changed too.',
};
