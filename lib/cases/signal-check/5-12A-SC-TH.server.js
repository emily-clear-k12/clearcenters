// SERVER ONLY — Thread rubric for 5.12A-SC-TH.

export const SERVER_CASE = {
  standard: '5.12A-SC-TH',
  title: 'Thread: Skip Temp & Light?',
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
    'temperature',
    'light',
    'abiotic',
  ],
  modelAnswer:
    'Flag Heater + Dark + Abiotic helpful. OnlyLive + Ignore misleading. Decor off-topic. Reply: claim is false — temp and light matter too.',
};
