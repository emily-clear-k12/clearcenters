// SERVER ONLY - Thread rubric for 3.10A-SC-TH.

export const SERVER_CASE = {
  standard: "3.10A-SC-TH",
  title: 'Thread: Just Guessing?',
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
    'matched',
    'useful',
    'miss',
  ],
  modelAnswer:
    'Claim is false/misleading. Forecast matched most days; Friday miss was a fast system. Forecasts still help.',
};
