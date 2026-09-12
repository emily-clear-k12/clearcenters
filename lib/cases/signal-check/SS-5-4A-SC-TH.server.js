// SERVER ONLY — Thread rubric for SS.5.4A-SC-TH.

export const SERVER_CASE = {
  standard: 'SS.5.4A-SC-TH',
  title: 'Thread: Only Land?',
  caseShape: "thread",
  stemMode: 'open',
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
    'impress',
    'trade',
    'only',
  ],
  modelAnswer:
    'Flag Impress + Trade Cadets helpful. Land-only claims misleading. 1818 map off-topic. Reply: claim is false — sea and trade causes mattered.',
};
