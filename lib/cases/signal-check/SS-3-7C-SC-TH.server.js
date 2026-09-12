// SERVER ONLY — Thread rubric for SS.3.7C-SC-TH.

export const SERVER_CASE = {
  standard: 'SS.3.7C-SC-TH',
  title: 'Thread: Any Level?',
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
    'city',
    'mail',
    'level',
  ],
  modelAnswer:
    'Flag Mail + License Cadets helpful. Any-level claims misleading. Bench chat off-topic. Reply: claim is false — each level has its own jobs.',
};
