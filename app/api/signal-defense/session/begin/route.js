import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";
import {
  getTeacherFromAccessToken,
  loadAssignmentWithTeacher,
  fetchOpenSessionForAssignment,
  fetchParticipants,
  serializeSession,
} from "../../../../../lib/signal-ops/sessionHelpers";

// Lobby -> live. Students polling the session auto-launch when they see live.
export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { assignmentId, accessToken, sessionId } = body || {};

  if (!accessToken || (!assignmentId && !sessionId)) {
    return NextResponse.json({ error: "Missing accessToken and assignment/session id." }, { status: 400 });
  }

  const teacher = await getTeacherFromAccessToken(accessToken);
  if (!teacher) {
    return NextResponse.json({ error: "Your session expired — refresh and try again." }, { status: 401 });
  }

  let session = null;
  if (sessionId) {
    const { data } = await supabaseAdmin
      .from("signal_ops_sessions")
      .select("*")
      .eq("id", sessionId)
      .maybeSingle();
    session = data;
  } else {
    session = await fetchOpenSessionForAssignment(assignmentId);
  }

  if (!session) {
    return NextResponse.json({ error: "No open session." }, { status: 404 });
  }

  const assignment = await loadAssignmentWithTeacher(session.assignment_id);
  if (!assignment || assignment.classes?.teacher_id !== teacher.id) {
    return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  }

  if (session.status === "ended") {
    return NextResponse.json({ error: "Session already ended." }, { status: 400 });
  }

  if (session.status === "live") {
    const participants = await fetchParticipants(session.id);
    return NextResponse.json(serializeSession(session, participants));
  }

  const startedAt = new Date();
  const durationSeconds = Number(session.duration_seconds || 480);
  const missionEndsAt = new Date(startedAt.getTime() + durationSeconds * 1000).toISOString();
  const now = startedAt.toISOString();

  const { data: updated, error } = await supabaseAdmin
    .from("signal_ops_sessions")
    .update({
      status: "live",
      started_at: now,
      mission_ends_at: missionEndsAt,
      wave_index: 1,
      wave_started_at: now,
      meters_ticked_at: now,
      last_attack_at: now,
      salvage: 0,
      power: 100,
      shield: 70,
      base_health: 100,
      lane_north: 70,
      lane_shield: 70,
      lane_core: 70,
      total_correct: 0,
      outcome: "ongoing",
      ended_at: null,
      last_event: {
        id: `mission-start-${session.id}`,
        type: "mission_start",
        at: now,
      },
      state_version: Number(session.state_version || 0) + 1,
      vote: null,
      upgrades: {},
      next_vote_threshold: 48,
      last_upgrade_id: null,
    })
    .eq("id", session.id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const participants = await fetchParticipants(updated.id);
  return NextResponse.json(serializeSession(updated, participants));
}
