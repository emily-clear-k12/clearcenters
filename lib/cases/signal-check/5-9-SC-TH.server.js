// SERVER ONLY — Thread rubric for 5.9-SC-TH.

export const SERVER_CASE = {
  standard: '5.9-SC-TH',
  title: 'Thread: Random Shadow?',
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
    'pattern',
    'repeat',
    'not random',
  ],
  modelAnswer:
    'Flag West + Twin + Spin helpful. Zigzag + Chaos misleading. Flag off-topic. Reply: claim is false — same daily pattern both days.',
};
