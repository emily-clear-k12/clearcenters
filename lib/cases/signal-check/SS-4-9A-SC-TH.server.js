// SERVER ONLY — Thread rubric for SS.4.9A-SC-TH.

export const SERVER_CASE = {
  standard: 'SS.4.9A-SC-TH',
  title: 'Thread: Mostly Hunting?',
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
    'farm',
    'fish',
    'hunt',
  ],
  modelAnswer:
    'Flag Farm + Fish Cadets helpful. Mostly-hunting claims misleading. Pottery chat off-topic. Reply: claim is false — needs were met in different ways.',
};
