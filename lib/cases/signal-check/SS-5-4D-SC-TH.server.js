// SERVER ONLY — Thread rubric for SS.5.4D-SC-TH.

export const SERVER_CASE = {
  standard: 'SS.5.4D-SC-TH',
  title: 'Thread: Separate Causes?',
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
    'slaver',
    'root',
    'separate',
  ],
  modelAnswer:
    'Flag SC + Rights Cadets helpful. Separate-causes claims misleading. 1803 purchase off-topic. Reply: claim is false — the three connect through slavery.',
};
