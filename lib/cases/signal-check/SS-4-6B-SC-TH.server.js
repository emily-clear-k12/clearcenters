// SERVER ONLY — Thread rubric for SS.4.6B-SC-TH.

export const SERVER_CASE = {
  standard: 'SS.4.6B-SC-TH',
  title: 'Thread: Same Region?',
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
    'soil',
    'region',
    'weather',
  ],
  modelAnswer:
    'Flag Soil + Definition Cadets helpful. Weather=region claims misleading. County chat off-topic. Reply: claim is false — regions aren\'t one day\'s weather.',
};
