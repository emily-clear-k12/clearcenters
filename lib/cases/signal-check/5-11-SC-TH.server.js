// SERVER ONLY — Thread rubric for 5.11-SC-TH.

export const SERVER_CASE = {
  standard: '5.11-SC-TH',
  title: 'Thread: Pointless Shutoff?',
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
    'gallons',
    'year',
    'save',
  ],
  modelAnswer:
    'Flag Four + Year + Add helpful. Tiny + Zero misleading. Paste off-topic. Reply: claim is false — measured gallons add up big over a year.',
};
