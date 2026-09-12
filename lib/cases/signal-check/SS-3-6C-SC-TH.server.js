// SERVER ONLY — Thread rubric for SS.3.6C-SC-TH.

export const SERVER_CASE = {
  standard: 'SS.3.6C-SC-TH',
  title: 'Thread: Sold Out = Profit?',
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
    'cost',
    '60',
    'profit',
  ],
  modelAnswer:
    'Flag Cost + Math Cadets helpful. Sold-out=profit claims misleading. Balloon chat off-topic. Reply: claim is false — $40 in, $60 out is not a profit.',
};
