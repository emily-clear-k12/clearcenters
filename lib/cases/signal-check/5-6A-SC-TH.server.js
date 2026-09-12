// SERVER ONLY — Thread rubric for 5.6A-SC-TH.

export const SERVER_CASE = {
  standard: '5.6A-SC-TH',
  title: 'Thread: Every Metal?',
  caseShape: "thread",
  stemMode: "open",
  commentFlags: {
    c1: 'needs_evidence',
    c2: 'helpful',
    c3: 'misleading',
    c4: 'off_topic',
    c5: 'helpful',
    c6: 'misleading',
  },
  mustFlagIds: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'],
  replyMustInclude: [
    'brass',
    'aluminum',
    'not every',
  ],
  modelAnswer:
    'Flag Brass + Note helpful. Shine + Tarnish misleading. Snack off-topic. Snap needs more evidence. Reply: claim is false — iron/steel stick, brass/aluminum don\'t.',
};
