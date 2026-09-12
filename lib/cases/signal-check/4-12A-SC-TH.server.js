// SERVER ONLY — Thread rubric for 4.12A-SC-TH.

export const SERVER_CASE = {
  standard: "4.12A-SC-TH",
  title: 'Thread: Plants Eat Dirt?',
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
    "sunlight",
    "soil",
    "not",
  ],
  modelAnswer:
    'Flag Scale + Dark + Sun helpful. Munch + Dirt misleading. Dots off-topic. Reply: plants don\'t eat soil — they make food with sunlight, water, CO2.',
};
