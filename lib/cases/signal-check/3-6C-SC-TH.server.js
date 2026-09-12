// SERVER ONLY — Thread rubric for 3.6C-SC-TH.

export const SERVER_CASE = {
  standard: "3.6C-SC-TH",
  title: "Thread: Leaky Can?",
  caseShape: "thread",
  stemMode: "dropdown",
  commentFlags: {
    c1: "misleading",
    c2: "helpful",
    c3: "helpful",
    c4: "helpful",
    c5: "off_topic",
    c6: "misleading",
    c7: "needs_evidence",
  },
  mustFlagIds: ["c1", "c2", "c3", "c4", "c5", "c6"],
  replyMustInclude: [
    "air",
    "cold",
    "not leaking",
  ],
  modelAnswer:
    "Claim is false. Can sealed, drops clear vs dark soda, warm can dry — water from the air made the drops on the cold can.",
};
