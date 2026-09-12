// SERVER ONLY — Thread rubric for 5.10C-SC-TH.

export const SERVER_CASE = {
  standard: '5.10C-SC-TH',
  title: 'Thread: Overnight Canyon?',
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
    'water',
    'slow',
    'not',
  ],
  modelAnswer:
    'Flag Match + Model + Erode helpful. Quake + Fast misleading. Picnic off-topic. Reply: claim is false — water carved it slowly, not one overnight quake.',
};
