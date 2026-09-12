// SERVER ONLY — Thread rubric for 5.12C-SC-TH.

export const SERVER_CASE = {
  standard: '5.12C-SC-TH',
  title: 'Thread: Pave = No Impact?',
  caseShape: "thread",
  stemMode: "open",
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
    'runoff',
    'paving',
    'affect',
  ],
  modelAnswer:
    'Flag Run + Garden + Both helpful. Nope + Seal misleading. Park off-topic. Reply: claim is false — paving changes where rain goes.',
};
