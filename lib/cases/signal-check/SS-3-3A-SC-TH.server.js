// SERVER ONLY — Thread rubric for SS.3.3A-SC-TH.

export const SERVER_CASE = {
  standard: 'SS.3.3A-SC-TH',
  title: 'Thread: Same Land?',
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
    'soil',
    'rain',
    'same',
  ],
  modelAnswer:
    'Flag Soil + Rain Cadets helpful. Same-land claims misleading. Trail snack off-topic. Reply: claim is false — weather matched today, land did not.',
};
