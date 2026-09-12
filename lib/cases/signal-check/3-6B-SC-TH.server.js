// SERVER ONLY — Thread rubric for 3.6B-SC-TH.

export const SERVER_CASE = {
  standard: "3.6B-SC-TH",
  title: "Thread: Sugar Is Liquid?",
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
  mustFlagIds: ["c1", "c2", "c3", "c4", "c5"],
  replyMustInclude: [
    "solid",
    "pile",
    "grain",
  ],
  modelAnswer:
    "Claim is false/misleading. Sugar piles into a cone; grains keep shape; flour also pours and is solid. Sugar is a solid.",
};
