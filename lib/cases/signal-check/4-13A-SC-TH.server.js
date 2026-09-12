// SERVER ONLY — Thread rubric for 4.13A-SC-TH.

export const SERVER_CASE = {
  standard: "4.13A-SC-TH",
  title: 'Thread: Wax Does Nothing?',
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
    "water",
    "wax",
    "helps",
  ],
  modelAnswer:
    'Flag Keep + Deep + Survive helpful. Shine + Fake misleading. Sparkle off-topic. Reply: wax slows water loss — it helps, not just shine.',
};
