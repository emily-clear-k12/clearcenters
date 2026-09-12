// Pure, DOM-free derivation helper for a planet mini-game's saved state.
// Deliberately kept in its own plain-JS module (no JSX, no React) so it can
// be required directly by a standalone Node verification script without any
// transpile step.
//
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
