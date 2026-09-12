// SERVER ONLY - Thread rubric for 3.12C-SC-TH.

export const SERVER_CASE = {
  standard: "3.12C-SC-TH",
  title: 'Thread: Pond Ruined?',
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
    'survived',
    'differently',
    'not ruined',
  ],
  modelAnswer:
    'Claim is false. Flood raised water, but turtles/fish/insects still there - hit differently, not wiped out.',
};
