// SERVER ONLY — Thread rubric for SS.5.13B-SC-TH.

export const SERVER_CASE = {
  standard: 'SS.5.13B-SC-TH',
  title: 'Thread: Just for Show?',
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
    'vote',
    'meeting',
    'show',
  ],
  modelAnswer:
    'Flag Burgesses + Town Meeting Cadets helpful. Just-show claims misleading. Ledger chat off-topic. Reply: claim is false — colonists voted in real assemblies.',
};
