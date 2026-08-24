// Shared tunable limits. Kept in one place so client and server enforce the
// exact same numbers instead of two hardcoded constants drifting apart.

// Max number of student messages (not counting character replies) allowed in
// one case's live Discuss chat. Each message resends the whole conversation
// so far, so cost grows with conversation length, not just message count —
// this caps both at once. Enforced in the UI (app/activity/[assignmentId]/
// ActivityClient.js) and again on the server (app/api/discuss/route.js) so a
// student can't bypass the client-side limit via browser dev tools.
export const MAX_DISCUSS_TURNS = 8;
