// SERVER ONLY — Thread rubric for SS.5.7B-SC-TH.

export const SERVER_CASE = {
  standard: 'SS.5.7B-SC-TH',
  title: 'Thread: Anywhere Will Do?',
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
    'water',
    'Gault',
    'people',
  ],
  modelAnswer:
    'Flag River + Census Cadets helpful. Anywhere claims misleading. Weather chat off-topic. Reply: claim is false — location resources matter for growth.',
};
