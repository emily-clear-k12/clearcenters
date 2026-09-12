// TEMP — Sept 12, 2026, Emily's ask while the Galaxy Hub / world reward
// station pages are still being built out: "take away the crystal
// requirements... so we can see and experience all of the things we have
// inside for each world." Same spirit as the DEV_FORCE_UNLOCK_ALL flag
// GearLockerClient.js already had (added Sept 4) for the galaxy map itself —
// pulled out here so the map AND the per-world reward-station page/route
// (app/gear-locker/world/[planetKey]/page.js + WorldRewardStationClient.js)
// share one flag instead of drifting out of sync.
//
// What this bypasses: the crystal_points-vs-threshold GATE that (a) keeps a
// locked planet from being clicked into on the map, (b) redirects a direct
// visit to a not-yet-unlocked world's page back to /gear-locker, and (c)
// blocks a world's embedded game behind its 1-crystal "ticket" unlock. The
// real threshold/price numbers still display everywhere (planet pills, the
// game's "Unlock for 💎 1" copy) — only the gate itself is skipped. No
// student data is touched by this flag; crystal_points are never spent or
// changed because of it.
//
// Flip this back to false (or delete it and restore the real comparisons at
// each call site) once the design/preview pass is done — don't ship this
// true.
export const DEV_FORCE_UNLOCK_ALL = true;
