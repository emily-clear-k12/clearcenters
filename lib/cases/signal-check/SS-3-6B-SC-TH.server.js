// SERVER ONLY — Thread rubric for SS.3.6B-SC-TH.

export const SERVER_CASE = {
  standard: 'SS.3.6B-SC-TH',
  title: 'Thread: Only at Zero?',
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
    'want',
    'enough',
    'scarce',
  ],
  modelAnswer:
    'Flag Want + Waitlist Cadets helpful. Zero-only claims misleading. Hours chat off-topic. Reply: claim is false — scarce means not enough for demand.',
};
