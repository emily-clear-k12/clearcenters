// SERVER ONLY — Thread rubric for 3.6A-SC-TH.

export const SERVER_CASE = {
  standard: "3.6A-SC-TH",
  title: "Thread: Every Metal?",
  caseShape: "thread",
  stemMode: "dropdown",
  commentFlags: {
    c1: "needs_evidence",
    c2: "helpful",
    c3: "misleading",
    c4: "off_topic",
    c5: "helpful",
    c6: "misleading",
  },
  mustFlagIds: ["c2", "c3", "c4", "c5", "c6"],
  replyMustInclude: [
    "foil",
    "penny",
    "not every",
  ],
  modelAnswer:
    "Flag Quill + Beam as helpful (foil/penny stayed still). Zoom + Drift misleading. Nova off-topic. Spark needs more evidence. Reply: claim is false — some metals stick, foil and penny don't.",
};
