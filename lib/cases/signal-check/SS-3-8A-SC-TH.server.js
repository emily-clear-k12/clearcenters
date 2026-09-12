// SERVER ONLY — Thread rubric for SS.3.8A-SC-TH.

export const SERVER_CASE = {
  standard: 'SS.3.8A-SC-TH',
  title: 'Thread: Same Label?',
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
    'different',
    'purpose',
    'label',
  ],
  modelAnswer:
    'Flag Purpose + Rights Cadets helpful. Same-label claims misleading. Light chat off-topic. Reply: claim is false — each founding doc has its own job.',
};
