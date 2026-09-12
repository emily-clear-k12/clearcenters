// SERVER ONLY — Thread rubric for SS.4.17B-SC-TH.

export const SERVER_CASE = {
  standard: 'SS.4.17B-SC-TH',
  title: 'Thread: One Style?',
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
    'different',
    'conjunto',
    'cowboy',
  ],
  modelAnswer:
    'Flag Accordion + Fiddle Cadets helpful. One-style claims misleading. Friday chat off-topic. Reply: claim is false — Texas culture has many traditions.',
};
