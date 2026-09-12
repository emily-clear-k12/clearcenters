// SERVER ONLY - Thread rubric for 3.12B-SC-TH.

export const SERVER_CASE = {
  standard: "3.12B-SC-TH",
  title: 'Thread: Pond Stays Same?',
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
    'ripple',
    'heron',
    'frogs',
  ],
  modelAnswer:
    'Claim is false. Frogs feed herons; when frogs dropped, herons dropped too - a food-web ripple.',
};
