// SERVER ONLY — Thread rubric for 4.11A-SC-TH.

export const SERVER_CASE = {
  standard: "4.11A-SC-TH",
  title: 'Thread: Power Every Day?',
  caseShape: "thread",
  stemMode: "dropdown-open",
  commentFlags: {
    c1: "misleading",
    c2: "helpful",
    c3: "helpful",
    c4: "off_topic",
    c5: "helpful",
    c6: "misleading",
  },
  mustFlagIds: ["c1", "c2", "c3", "c4", "c5", "c6"],
  replyMustInclude: [
    "calm",
    "zero",
    "not every",
  ],
  modelAnswer:
    'Flag Calm + Last + Demand helpful. Always + Perfect misleading. Spin off-topic. Reply: renewable is not every day — calm days made zero.',
};
