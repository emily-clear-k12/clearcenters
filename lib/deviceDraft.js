// Unfinished work saved on this device. The key includes the student so a
// shared Chromebook does not show the last student's answers.

export function draftKey(name, assignmentId, studentId) {
  return `${name}:${assignmentId}:${studentId || "anon"}`;
}

const DRAFT_PREFIXES = [
  "classify-draft:",
  "exhibit-draft:",
  "assembly-draft:",
  "cc_signalcheck_draft_",
  "cc_newsroom_draft_",
  "cc_missionmap_draft_",
  "cc_simlab2_",
];

export function clearDeviceDrafts() {
  if (typeof window === "undefined") return;
  const drop = [];
  for (let i = 0; i < window.localStorage.length; i += 1) {
    const key = window.localStorage.key(i);
    if (key && DRAFT_PREFIXES.some((prefix) => key.startsWith(prefix))) drop.push(key);
  }
  drop.forEach((key) => window.localStorage.removeItem(key));
}
