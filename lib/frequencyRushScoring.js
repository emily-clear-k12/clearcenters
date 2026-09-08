// Shared between the client (for the live, per-answer feedback the design
// doc requires — §2.1/§2.13a: every correct answer needs an immediate,
// personal moment, not just a running total revealed at the end) and the
// submit route (the authoritative copy that actually gets saved). Keeping
// one copy of the formula means the number a student sees mid-round can
// never quietly drift from the number that lands in the database.

export const BASE_POINTS = 100;
export const MAX_SPEED_BONUS = 50;
// Index = streak length after this correct answer; capped at 2x per §2.
export const STREAK_MULTIPLIERS = [1, 1, 1.2, 1.2, 1.5, 1.5, 1.5, 2];

export function multiplierForStreak(streak) {
  const idx = Math.min(streak, STREAK_MULTIPLIERS.length - 1);
  return STREAK_MULTIPLIERS[idx];
}

export function pointsForCorrectAnswer({ responseTimeMs, roundSeconds, streakAfterThisAnswer }) {
  const timeLeftMs = Math.max(0, roundSeconds * 1000 - (responseTimeMs || 0));
  const speedBonus = Math.round(MAX_SPEED_BONUS * (timeLeftMs / (roundSeconds * 1000)));
  return Math.round((BASE_POINTS + speedBonus) * multiplierForStreak(streakAfterThisAnswer));
}
