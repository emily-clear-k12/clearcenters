// SERVER ONLY — Thread rubric for SS.4.3D-SC-TH.

export const SERVER_CASE = {
  standard: 'SS.4.3D-SC-TH',
  title: 'Thread: Problems Solved?',
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
    'debt',
    'Mexico',
    'problem',
  ],
  modelAnswer:
    'Flag Debt + Mexico Cadets helpful. All-solved claims misleading. Flag chat off-topic. Reply: claim is false — big problems continued after 1836.',
};
