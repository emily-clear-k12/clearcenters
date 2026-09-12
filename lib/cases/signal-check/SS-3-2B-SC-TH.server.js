// SERVER ONLY — Thread rubric for SS.3.2B-SC-TH.

export const SERVER_CASE = {
  standard: 'SS.3.2B-SC-TH',
  title: 'Thread: Same Stoplight?',
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
    'birch',
    'traffic',
    'same',
  ],
  modelAnswer:
    'Flag Count + Cost Cadets helpful. Same-light claims misleading. Snack off-topic. Reply: claim is false — Birch\'s light traffic doesn\'t need Elm\'s stoplight.',
};
