// SERVER ONLY — Thread rubric for 4.6C-SC-TH.

export const SERVER_CASE = {
  standard: "4.6C-SC-TH",
  title: 'Thread: Something Spilled?',
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
    "gaps",
    "nothing spilled",
    "weight",
  ],
  modelAnswer:
    'Flag Scale + Gap + Clean helpful. Spill + Vanish misleading. Lunch off-topic. Reply: nothing spilled — beans fill gaps; weight stayed the same.',
};
