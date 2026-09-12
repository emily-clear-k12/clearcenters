// SERVER ONLY — Thread rubric for 5.8C-SC-TH.

export const SERVER_CASE = {
  standard: '5.8C-SC-TH',
  title: 'Thread: Straw Bent?',
  caseShape: "thread",
  stemMode: "open",
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
    'straight',
    'refract',
    'light',
  ],
  modelAnswer:
    'Flag Pull + Angle + Light helpful. Snap + Soft misleading. Sip off-topic. Reply: claim is false — refraction makes it look bent.',
};
