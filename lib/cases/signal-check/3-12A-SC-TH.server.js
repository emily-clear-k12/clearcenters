// SERVER ONLY - Thread rubric for 3.12A-SC-TH.

export const SERVER_CASE = {
  standard: "3.12A-SC-TH",
  title: 'Thread: Die Till Spring?',
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
    'migrate',
    'hibernate',
    'not die',
  ],
  modelAnswer:
    "Claim is false. Animals left the field but didn't all die - geese migrated; groundhog hibernates.",
};
