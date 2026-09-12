// SERVER ONLY — Thread rubric for 5.6D-SC-TH.

export const SERVER_CASE = {
  standard: '5.6D-SC-TH',
  title: 'Thread: Nothing Inside?',
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
    'air',
    'weight',
    'matter',
  ],
  modelAnswer:
    'Flag Scale + Squeeze + Particle helpful. Flat + Zero misleading. Party off-topic. Reply: claim is false — air has mass; inflated weighs more.',
};
