// SERVER ONLY — Thread rubric for SS.5.4E-SC-TH.

export const SERVER_CASE = {
  standard: 'SS.5.4E-SC-TH',
  title: 'Thread: Fixed by the 13th?',
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
    'Black code',
    'sharecrop',
    'fix',
  ],
  modelAnswer:
    'Flag Codes + Debt Cadets helpful. All-fixed claims misleading. Railroad chat off-topic. Reply: claim is false — problems continued after 1865.',
};
