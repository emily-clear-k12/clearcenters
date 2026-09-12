// SERVER ONLY — Thread rubric for SS.4.4B-SC-TH.

export const SERVER_CASE = {
  standard: 'SS.4.4B-SC-TH',
  title: 'Thread: Just Cows?',
  caseShape: "thread",
  stemMode: 'dropdown-open',
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
    'trail',
    'rail',
    'cow',
  ],
  modelAnswer:
    'Flag Price + Trail Cadets helpful. Just-cows claims misleading. Brand chat off-topic. Reply: claim is false — markets and routes drove the boom.',
};
