import { cookies } from "next/headers";
import { supabaseAdmin } from "../supabaseAdmin";
import { UPGRADE_CATALOG, VOTE_WINDOW_MS, WAVE_SECONDS, MAX_WAVES } from "./gameConfig";
import { voteIsOpen, parseUpgrades } from "./sessionSim";

const CALLSIGNS = [
  "NOVA", "ORBIT", "COMET", "ECHO", "LUMEN", "VEGA", "SPARK", "ATLAS",
  "COSMO", "LYRA", "APOLLO", "RIO", "HALO", "NIMBUS", "ARROW", "SOL",
];

export function callsignForIndex(i) {
  return CALLSIGNS[i % CALLSIGNS.length];
}

export async function getTeacherFromAccessToken(accessToken) {
  if (!accessToken) return null;
  const { data: userData, error } = await supabaseAdmin.auth.getUser(accessToken);
  if (error || !userData?.user) return null;
  return userData.user;
}

export async function getStudentFromCookie() {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;
  if (!studentId) return null;
  const { data: student } = await supabaseAdmin
    .from("students")
    .select("id, first_name, class_id")
    .eq("id", studentId)
    .maybeSingle();
  return student || null;
}

export async function loadAssignmentWithTeacher(assignmentId) {
  const { data: assignment } = await supabaseAdmin
    .from("assignments")
    .select("id, class_id, case_standard, classes(teacher_id, name)")
    .eq("id", assignmentId)
    .maybeSingle();
  return assignment || null;
}

export async function assertStudentCanAccessAssignment(student, assignmentId) {
  const { data: assignment } = await supabaseAdmin
    .from("assignments")
    .select("id, class_id, case_standard")
    .eq("id", assignmentId)
    .maybeSingle();
  if (!assignment || assignment.class_id !== student.class_id) {
    return { ok: false, status: 404, error: "Assignment not found." };
  }
  const { data: targets } = await supabaseAdmin
    .from("assignment_students")
    .select("student_id")
    .eq("assignment_id", assignmentId);
  if (targets && targets.length > 0 && !targets.some((t) => t.student_id === student.id)) {
    return { ok: false, status: 403, error: "Not authorized." };
  }
  return { ok: true, assignment };
}

export async function fetchOpenSessionForAssignment(assignmentId) {
  const { data } = await supabaseAdmin
    .from("signal_ops_sessions")
    .select("*")
    .eq("assignment_id", assignmentId)
    .in("status", ["lobby", "live"])
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data || null;
}

export async function fetchParticipants(sessionId) {
  const { data } = await supabaseAdmin
    .from("signal_ops_participants")
    .select("id, student_id, display_name, callsign, correct_count, joined_at, last_seen_at, vote_choice")
    .eq("session_id", sessionId)
    .order("joined_at", { ascending: true });
  return data || [];
}

function serializeVote(session, nowMs = Date.now()) {
  const vote = session.vote;
  if (!vote || typeof vote !== "object") return null;
  const endsAt = vote.ends_at || null;
  const endsMs = endsAt ? new Date(endsAt).getTime() : 0;
  const open = voteIsOpen(vote, nowMs);
  const options = (Array.isArray(vote.options) ? vote.options : [])
    .map((id) => {
      const item = UPGRADE_CATALOG[id];
      if (!item) return null;
      return {
        id: item.id,
        name: item.name,
        cost: item.cost,
        desc: item.desc,
        tally: (vote.tallies && vote.tallies[id]) || 0,
      };
    })
    .filter(Boolean);

  return {
    open,
    options,
    tallies: vote.tallies || {},
    endsAt,
    remainingMs: open ? Math.max(0, endsMs - nowMs) : 0,
    resolved: vote.resolved || null,
    openedAt: vote.opened_at || null,
  };
}

function serializeUpgrades(session) {
  const u = parseUpgrades(session.upgrades);
  const powerOnline = (session.power || 0) > 0;
  return {
    shield: u.shield,
    turret: u.turret,
    online: powerOnline,
    catalog: UPGRADE_IDS_SAFE(),
  };
}

function UPGRADE_IDS_SAFE() {
  return Object.values(UPGRADE_CATALOG).map((item) => ({
    id: item.id,
    name: item.name,
    cost: item.cost,
    desc: item.desc,
  }));
}

function waveRemainingMs(session, nowMs = Date.now()) {
  if (!session.wave_started_at || !session.wave_index) return null;
  if (voteIsOpen(session.vote, nowMs)) {
    // Wave clock frozen while voting — report full remaining as-of freeze.
    // Approximate: use ends_at pause by returning based on started_at without adding pause.
    // Simple approach: remaining from started_at (vote pause handled server-side via meters_ticked only).
  }
  const ends = new Date(session.wave_started_at).getTime() + WAVE_SECONDS * 1000;
  return Math.max(0, ends - nowMs);
}

export function serializeSession(session, participants, opts = {}) {
  if (!session) {
    return { active: false, session: null, participants: [] };
  }
  const nowMs = Date.now();
  const myStudentId = opts.myStudentId || null;
  const mine = myStudentId
    ? (participants || []).find((p) => p.student_id === myStudentId)
    : null;

  const vote = serializeVote(session, nowMs);
  if (vote && mine) {
    vote.myChoice = mine.vote_choice || null;
  }

  return {
    active: session.status !== "ended",
    session: {
      id: session.id,
      assignmentId: session.assignment_id,
      classId: session.class_id,
      status: session.status,
      salvage: session.salvage,
      power: session.power,
      baseHealth: session.base_health,
      totalCorrect: session.total_correct,
      waveIndex: session.wave_index || 0,
      maxWaves: MAX_WAVES,
      waveSeconds: WAVE_SECONDS,
      waveRemainingMs: waveRemainingMs(session, nowMs),
      nextVoteThreshold: session.next_vote_threshold ?? 48,
      upgrades: serializeUpgrades(session),
      vote,
      lastUpgradeId: session.last_upgrade_id || null,
      outcome: session.outcome || "ongoing",
      createdAt: session.created_at,
      startedAt: session.started_at,
      endedAt: session.ended_at,
      voteWindowMs: VOTE_WINDOW_MS,
    },
    participants: (participants || []).map((p) => ({
      id: p.id,
      studentId: p.student_id,
      displayName: p.display_name,
      callsign: p.callsign,
      // correct_count stays server-side for private scoring; board only
      // shows presence. Never expose misses.
      joinedAt: p.joined_at,
    })),
  };
}
