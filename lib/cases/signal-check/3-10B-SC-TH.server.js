// SERVER ONLY - Thread rubric for 3.10B-SC-TH.

export const SERVER_CASE = {
  standard: "3.10B-SC-TH",
  title: 'Thread: Just Dirt?',
  caseShape: "thread",
  stemMode: "dropdown",
  commentFlags: {
    c1: "misleading",
    c2: "helpful",
    c3: "helpful",
    c4: "off_topic",
    c5: "helpful",
    c6: "misleading",
    c7: "needs_evidence",
  },
  mustFlagIds: ['c1', 'c2', 'c3', 'c4', 'c5', 'c6'],
  replyMustInclude: [
    'rock',
    'plant',
    'mix',
  ],
  modelAnswer:
    'Claim is false. Soil has rock grains and decayed plant bits - settling/sifting show a mix, not plain dirt.',
};
