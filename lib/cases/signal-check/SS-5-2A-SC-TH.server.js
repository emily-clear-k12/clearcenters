// SERVER ONLY — Thread rubric for SS.5.2A-SC-TH.

export const SERVER_CASE = {
  standard: 'SS.5.2A-SC-TH',
  title: 'Thread: Just the Stamp Act?',
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
    'repeal',
    'Boston',
    'alone',
  ],
  modelAnswer:
    'Flag Repeal + Timeline Cadets helpful. Alone claims misleading. Flag chat off-topic. Reply: claim is false — independence followed a longer chain than one act.',
};
