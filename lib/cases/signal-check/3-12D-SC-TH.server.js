// SERVER ONLY - Thread rubric for 3.12D-SC-TH.

export const SERVER_CASE = {
  standard: "3.12D-SC-TH",
  title: 'Thread: Someone Carved It?',
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
    'fossil',
    'shell',
    'not carved',
  ],
  modelAnswer:
    "Claim is false. Shape matches a shell, sits deep in rock with no tool marks - it's a fossil, not a carving.",
};
