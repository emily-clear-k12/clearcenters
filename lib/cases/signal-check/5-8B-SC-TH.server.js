// SERVER ONLY — Thread rubric for 5.8B-SC-TH.

export const SERVER_CASE = {
  standard: '5.8B-SC-TH',
  title: 'Thread: Switch Useless?',
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
    'switch',
    'loop',
    'complete',
  ],
  modelAnswer:
    'Flag Off + On + Loop helpful. Wire + Always misleading. Green off-topic. Reply: claim is false — open switch breaks the loop.',
};
