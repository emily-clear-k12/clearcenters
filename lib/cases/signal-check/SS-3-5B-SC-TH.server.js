// SERVER ONLY — Thread rubric for SS.3.5B-SC-TH.

export const SERVER_CASE = {
  standard: 'SS.3.5B-SC-TH',
  title: 'Thread: Just a Wish List?',
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
    'add',
    'categor',
    '40',
  ],
  modelAnswer:
    'Flag Math + Save Cadets helpful. Wish-list claims misleading. Pet name chat off-topic. Reply: claim is false — a budget assigns dollars and adds up.',
};
