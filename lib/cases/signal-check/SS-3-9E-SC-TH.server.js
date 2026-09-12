// SERVER ONLY — Thread rubric for SS.3.9E-SC-TH.

export const SERVER_CASE = {
  standard: 'SS.3.9E-SC-TH',
  title: 'Thread: Loudest Wins?',
  caseShape: "thread",
  stemMode: 'dropdown',
  commentFlags: {
    c1: 'misleading',
    c2: 'helpful',
    c3: 'helpful',
    c4: 'off_topic',
    c5: 'needs_evidence',
    c6: 'misleading',
  },
  mustFlagIds: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'],
  replyMustInclude: [
    'votes',
    'Museum',
    'loud',
  ],
  modelAnswer:
    'Flag Tally + Recount Cadets helpful. Loudest-wins claims misleading. Friday chat off-topic. Reply: claim is false — Museum won the count, not the cheer.',
};
