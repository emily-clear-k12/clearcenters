// SERVER ONLY — Thread rubric for SS.4.11C-SC-TH.

export const SERVER_CASE = {
  standard: 'SS.4.11C-SC-TH',
  title: 'Thread: Just Population?',
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
    'rail',
    'farm',
    'population',
  ],
  modelAnswer:
    'Flag Rail + Timeline Cadets helpful. Population-only claims misleading. Capital chat off-topic. Reply: claim is false — rails and farmland matter too.',
};
