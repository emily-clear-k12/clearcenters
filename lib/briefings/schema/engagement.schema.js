// Briefings v2 — engagement mechanics contract.
// Locked Sept 14, 2026. Every SS full-lesson and Science light-review
// briefing carries this same `engagement` block — it's "just fun,"
// deliberately separate from the graded phase content above it.
//
// DECIDED, IN THIS ORDER, FROM THE SEPT 14 DISCUSSION:
//  - progressTrail: KEEP. A footprints/stepping-stone path that lights up
//    as the student clears each phase, instead of a bare "Phase 3 of 5."
//  - hiddenBonus: KEEP. A silly, ungraded bonus fact or one-line joke from
//    S.A.M. that only appears after Clearance — a "that was worth
//    finishing" payoff distinct from Crystal Points/grades.
//  - celebrationBurst (confetti + a S.A.M. reaction on every correct tap):
//    REJECTED. Emily's words: "i dont like the little celebration." Do
//    NOT re-add a per-tap celebration animation without raising it with
//    her again first — this comment is here specifically so a future
//    pass doesn't quietly reintroduce it as an "obvious" engagement win.

export const ENGAGEMENT_SHAPE = {
  progressTrail: {
    enabled: "boolean — true for every v2 lesson",
    // One step per phase in the lesson's `phases` array, in order.
    steps: "number — should equal phases.length",
  },
  hiddenBonus: {
    enabled: "boolean — true for every v2 lesson",
    // Ungraded. Shown once, after clearance, before the student leaves.
    samLine: "string — one silly, ungraded line or fact, unrelated to grading",
  },
};

export function buildDefaultEngagement(phaseCount, samBonusLine) {
  return {
    progressTrail: { enabled: true, steps: phaseCount },
    hiddenBonus: { enabled: true, samLine: samBonusLine || "" },
  };
}

export function validateEngagement(engagement, expectedPhaseCount) {
  const errors = [];
  if (!engagement || typeof engagement !== "object") {
    return [`engagement block missing`];
  }
  if (!engagement.progressTrail || engagement.progressTrail.enabled !== true) {
    errors.push("engagement.progressTrail must be enabled — a v1-style 'Phase X of Y' label is no longer the default");
  } else if (engagement.progressTrail.steps !== expectedPhaseCount) {
    errors.push(
      `engagement.progressTrail.steps (${engagement.progressTrail.steps}) does not match phases.length (${expectedPhaseCount})`
    );
  }
  if (!engagement.hiddenBonus || engagement.hiddenBonus.enabled !== true) {
    errors.push("engagement.hiddenBonus must be enabled");
  } else if (!engagement.hiddenBonus.samLine) {
    errors.push("engagement.hiddenBonus.samLine is empty — needs a one-line bonus fact/joke");
  }
  if (engagement.celebrationBurst) {
    errors.push(
      "engagement.celebrationBurst found — this was explicitly rejected on Sept 14 (\"i dont like the little celebration\"). Remove it, or raise re-adding it with Emily first."
    );
  }
  return errors;
}
