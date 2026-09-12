// SERVER ONLY - Thread rubric for 3.8B-SC-TH.

export const SERVER_CASE = {
  standard: "3.8B-SC-TH",
  title: 'Thread: Need a Heavy Ball?',
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
    'speed',
    'mass',
    'not always heavier',
  ],
  modelAnswer:
    'Claim is false. Small marble knocked more from higher up; fast small matched heavy. Speed and mass both matter.',
};
