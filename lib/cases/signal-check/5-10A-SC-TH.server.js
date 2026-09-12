// SERVER ONLY — Thread rubric for 5.10A-SC-TH.

export const SERVER_CASE = {
  standard: '5.10A-SC-TH',
  title: 'Thread: Random Fog?',
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
    'temperature',
    'condense',
    'not random',
  ],
  modelAnswer:
    'Flag Gap + Clear + Cycle helpful. Surprise + Luck misleading. Pier off-topic. Reply: claim is false — fog needs that ocean-air temp setup.',
};
