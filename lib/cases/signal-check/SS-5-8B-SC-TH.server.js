// SERVER ONLY — Thread rubric for SS.5.8B-SC-TH.

export const SERVER_CASE = {
  standard: 'SS.5.8B-SC-TH',
  title: 'Thread: No Downsides?',
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
    'flood',
    'fish',
    'downside',
  ],
  modelAnswer:
    'Flag Flood + Fish Cadets helpful. No-downside claims misleading. Bridge chat off-topic. Reply: claim is false — the dam had real costs too.',
};
