import { cookies } from "next/headers";
import { supabaseAdmin } from "../supabaseAdmin";
import { UPGRADE_CATALOG, VOTE_WINDOW_MS } from "./gameConfig";
import { voteIsOpen, parseUpgrades } from "./sessionSim";

const CALLSIGNS = [
  "NOVA", "ORBIT", "COMET", "ECHO", "LUMEN", "VEGA", "SPARK", "ATLAS",
  "COSMO", "LYRA", "APOLLO", "RIO", "HALO", "NIMBUS", "ARROW", "SOL",
];

export function callsignForIndex(i) {
  const base = CALLSIGNS[i % CALLSIGNS.length];
  const cycle = Math.floor(i / CALLSIGNS.length);
  return cycle > 0 ? `${base}-${cycle + 1}` : base;
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
    .select("id, student_id, display_name, callsign, correct_count, contribution_count, joined_at, last_seen_at, vote_choice")
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
  return {
    shield: u.shield,
    turret: u.turret,
    online: (session.power || 0) > 0,
    catalog: Object.values(UPGRADE_CATALOG).map((item) => ({
      id: item.id,
      name: item.name,
      cost: item.cost,
      desc: item.desc,
    })),
  };
}

function timeRemainingMs(session, nowMs = Date.now()) {
  if (session.status === "ended") return 0;
  if (session.mission_ends_at) {
    return Math.max(0, new Date(session.mission_ends_at).getTime() - nowMs);
  }
  return Math.max(0, (session.duration_seconds || 480) * 1000);
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
  if (vote && mine) vote.myChoice = mine.vote_choice || null;

  const durationSeconds = session.duration_seconds || 480;
  const remainingMs = timeRemainingMs(session, nowMs);

  return {
    active: session.status !== "ended",
    session: {
      id: session.id,
      assignmentId: session.assignment_id,
      classId: session.class_id,
      status: session.status,
      salvage: session.salvage || 0,
      power: session.power || 0,
      shield: session.shield ?? 70,
      baseHealth: session.base_health ?? 100,
      totalCorrect: session.total_correct || 0,
      laneNorth: session.lane_north ?? 70,
      laneShield: session.lane_shield ?? 70,
      laneCore: session.lane_core ?? 70,
      waveIndex: session.wave_index || 0,
      maxWaves: 4,
      durationSeconds,
      missionEndsAt: session.mission_ends_at || null,
      timeRemainingMs: remainingMs,
      stateVersion: Number(session.state_version || 0),
      lastEvent: session.last_event || null,
      outcome: session.outcome || "ongoing",
      createdAt: session.created_at,
      startedAt: session.started_at,
      endedAt: session.ended_at,

      // Legacy fields are kept temporarily so the old board can render while
      // Live Ops is migrated to the new shared-state model.
      nextVoteThreshold: session.next_vote_threshold ?? 48,
      upgrades: serializeUpgrades(session),
      vote,
      lastUpgradeId: session.last_upgrade_id || null,
      voteWindowMs: VOTE_WINDOW_MS,
    },
    participants: (participants || []).map((p) => ({
      id: p.id,
      studentId: p.student_id,
      displayName: p.display_name,
      callsign: p.callsign,
      joinedAt: p.joined_at,
    })),
    me: mine
      ? {
          studentId: mine.student_id,
          correctCount: mine.correct_count || 0,
          contributionCount: mine.contribution_count || 0,
        }
      : null,
  };
}
