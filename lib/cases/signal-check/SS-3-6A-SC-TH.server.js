// SERVER ONLY — Thread rubric for SS.3.6A-SC-TH.

export const SERVER_CASE = {
  standard: 'SS.3.6A-SC-TH',
  title: 'Thread: Same Price Always?',
  caseShape: "thread",
  stemMode: 'dropdown',
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
    'price',
    'hot',
    'change',
  ],
  modelAnswer:
    'Flag Hot + Supply Cadets helpful. Always-same claims misleading. Paint chat off-topic. Reply: claim is false — price rose on hot/low-supply days.',
};
