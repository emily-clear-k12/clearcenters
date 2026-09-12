// SERVER ONLY — Thread rubric for SS.4.1B-SC-TH.

export const SERVER_CASE = {
  standard: 'SS.4.1B-SC-TH',
  title: 'Thread: Same Ways of Life?',
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
    'different',
    'Caddo',
    'Apache',
  ],
  modelAnswer:
    'Flag Farm + Tipi Cadets helpful. Same-life claims misleading. Snack off-topic. Reply: claim is false — environments shaped different ways of life.',
};
