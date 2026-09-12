// SERVER ONLY — Thread rubric for 5.6C-SC-TH.

export const SERVER_CASE = {
  standard: '5.6C-SC-TH',
  title: 'Thread: Salt Vanished?',
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
    'weight',
    'same',
    'not',
  ],
  modelAnswer:
    'Flag Scale + Taste + Tiny helpful. Gone + Poof misleading. Lunch off-topic. Reply: claim is false — weights match; salt\'s still there.',
};
