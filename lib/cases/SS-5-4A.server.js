// SERVER ONLY. Never import this file from a "use client" component — doing
// so would bundle the scoring rubric into the browser's JS, letting a
// student read it via dev tools. Only API routes should import this.
// Converted from Emily's Group Chat Generator export (SS.5.4A, TEKS 5.4A).

export const SERVER_CASE = {
  standard: "SS.5.4A",
  title: "The One-Reason War",
  bigQuestion: "Was the War of 1812 mainly caused by a fight over territory, or did several problems push the United States toward war — and what changed because of it?",
  evidenceBank: [
    "Territorial disputes were part of the tension",
    "American sailors faced problems at sea",
    "American production changed during the war"
  ],
  trapLine: "The War of 1812 was basically a fight over land. That's the reason the United States went to war.",
  castNames: {
    caleb: "Caleb Pierce",
    jonah: "Jonah Reed",
    ruth: "Ruth Mercer",
    lydia: "Lydia Brooks",
    cole: "Henry Cole"
  },
  distractors: "Treating territorial conflict as the only cause; treating impressment as the only cause; saying every American sailor was impressed; listing impressment, territory, and manufacturing without explaining relationships; reversing cause and effect by claiming increased manufacturing caused the war; overcorrecting by saying territory did not matter.",
  mustInclude: [
    "Explains impressment as a cause of conflict with Britain.",
    "Explains territorial or western conflict as another cause.",
    "Makes clear that the war had more than one cause.",
    "Connects wartime trade disruption to increased U.S. manufacturing.",
    "Correctly distinguishes causes of the war from an effect of the war."
  ],
};
