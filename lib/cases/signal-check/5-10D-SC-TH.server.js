// SERVER ONLY — Thread rubric for 5.10D-SC-TH.

export const SERVER_CASE = {
  standard: '5.10D-SC-TH',
  title: 'Thread: Born Knowing Sit?',
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
    'learned',
    'training',
    'not',
  ],
  modelAnswer:
    'Flag Treat + Fur + Instinct helpful. Born + Easy misleading. Name off-topic. Reply: claim is false — sit took training; not inherited.',
};
