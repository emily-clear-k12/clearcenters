// SERVER ONLY — Thread rubric for SS.5.4C-SC-TH.

export const SERVER_CASE = {
  standard: 'SS.5.4C-SC-TH',
  title: 'Thread: First to See It?',
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
    'village',
    'Sacagawea',
    'first',
  ],
  modelAnswer:
    'Flag Village + Sacagawea Cadets helpful. First-ever claims misleading. Snack off-topic. Reply: claim is false — people already lived on that land.',
};
