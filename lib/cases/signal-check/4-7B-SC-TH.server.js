// SERVER ONLY — Thread rubric for 4.7B-SC-TH.

export const SERVER_CASE = {
  standard: "4.7B-SC-TH",
  title: 'Thread: Brand-New Rocks?',
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
    "sediment",
    "upstream",
    "not new",
  ],
  modelAnswer:
    'Flag Up + Slow + Match helpful. New + Magic misleading. Fish off-topic. Reply: river moved sediment from upstream — didn\'t make new rocks.',
};
