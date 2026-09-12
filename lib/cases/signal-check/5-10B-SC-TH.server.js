// SERVER ONLY — Thread rubric for 5.10B-SC-TH.

export const SERVER_CASE = {
  standard: '5.10B-SC-TH',
  title: 'Thread: Rock in a Day?',
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
    'soft',
    'slow',
    'not',
  ],
  modelAnswer:
    'Flag Soft + Layers + Slow helpful. Squish + Overnight misleading. Art off-topic. Reply: claim is false — still soft next day; real rock takes ages.',
};
