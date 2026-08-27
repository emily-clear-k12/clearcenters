// Pure, DOM-free derivation helpers for Glow Garden's mastery state.
// Deliberately kept in their own plain-JS module (no JSX, no React) so they
// can be required directly by a standalone Node verification script without
// any transpile step — same reasoning as Group V's report-logic module.

export const DISCOVERY_KEYS = ["glowseed", "crystaldroplet", "crystalblossom"];

export function discoveryCount(discoveries) {
  return DISCOVERY_KEYS.filter((k) => discoveries[k]).length;
}

export function allDiscovered(discoveries) {
  return discoveryCount(discoveries) === DISCOVERY_KEYS.length;
}

export function isMastered(discoveries, gameCleared) {
  return allDiscovered(discoveries) && Boolean(gameCleared);
}

// Mirrors the exact merge rule /api/planets/game-result applies server-side:
// cleared is sticky (once true, always true) and best_score only ever
// increases. Exported so the same rule can be asserted against fixtures
// without spinning up the API route.
export function nextGameState(existing, incoming) {
  const prevCleared = Boolean(existing?.cleared);
  const prevBest = existing?.best_score || 0;
  return {
    played: true,
    cleared: prevCleared || Boolean(incoming?.cleared),
    best_score: Math.max(prevBest, Number(incoming?.score) || 0),
  };
}
