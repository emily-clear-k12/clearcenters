// SERVER ONLY — Thread rubric for SS.5.15A-SC-TH.

export const SERVER_CASE = {
  standard: 'SS.5.15A-SC-TH',
  title: 'Thread: One Branch, Every Job?',
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
    'Congress',
    'court',
    'executive',
  ],
  modelAnswer:
    'Flag Article I + III Cadets helpful. Do-it-all claims misleading. Census chat off-topic. Reply: claim is false — powers are separated by branch.',
};
