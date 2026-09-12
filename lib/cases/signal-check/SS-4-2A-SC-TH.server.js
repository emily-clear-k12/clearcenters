// SERVER ONLY — Thread rubric for SS.4.2A-SC-TH.

export const SERVER_CASE = {
  standard: 'SS.4.2A-SC-TH',
  title: 'Thread: Just Curious?',
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
    'gold',
    'claim',
    'curious',
  ],
  modelAnswer:
    'Flag Gold + Claim Cadets helpful. Curiosity-only claims misleading. Sketch chat off-topic. Reply: claim is false — motives were gold and land claims.',
};
