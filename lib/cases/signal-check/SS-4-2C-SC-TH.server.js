// SERVER ONLY — Thread rubric for SS.4.2C-SC-TH.

export const SERVER_CASE = {
  standard: 'SS.4.2C-SC-TH',
  title: 'Thread: Empty Land Only?',
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
    'water',
    'settlement',
    'empty',
  ],
  modelAnswer:
    'Flag River + Settlement Cadets helpful. Empty-only claims misleading. Bell chat off-topic. Reply: claim is false — sites were chosen for water and communities.',
};
