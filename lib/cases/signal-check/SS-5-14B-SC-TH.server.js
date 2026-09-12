// SERVER ONLY — Thread rubric for SS.5.14B-SC-TH.

export const SERVER_CASE = {
  standard: 'SS.5.14B-SC-TH',
  title: 'Thread: Just Lawmaking?',
  caseShape: "thread",
  stemMode: 'open',
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
    'six',
    'defense',
    'law',
  ],
  modelAnswer:
    'Flag Union + Defense Cadets helpful. One-job claims misleading. Voting-age chat off-topic. Reply: claim is false — the Preamble lists multiple purposes.',
};
