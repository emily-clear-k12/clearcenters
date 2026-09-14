import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";
import {
  getTeacherFromAccessToken,
  loadAssignmentWithTeacher,
  fetchOpenSessionForAssignment,
  fetchParticipants,
  serializeSession,
} from "../../../../../lib/signal-ops/sessionHelpers";

const ALLOWED_DURATIONS = new Set([420, 480, 600]);

// Teacher opens a Signal Defense lobby for an assignment. Students auto-join
// from the assignment page; no join code is required.
export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { assignmentId, accessToken } = body || {};
  const requestedDuration = Number(body?.durationSeconds || 480);
  const durationSeconds = ALLOWED_DURATIONS.has(requestedDuration) ? requestedDuration : 480;

  if (!assignmentId || !accessToken) {
    return NextResponse.json({ error: "Missing assignmentId or accessToken." }, { status: 400 });
  }

  const teacher = await getTeacherFromAccessToken(accessToken);
  if (!teacher) {
    return NextResponse.json({ error: "Your session expired — refresh and try again." }, { status: 401 });
  }

  const assignment = await loadAssignmentWithTeacher(assignmentId);
  if (!assignment || assignment.classes?.teacher_id !== teacher.id) {
    return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  }

  const existing = await fetchOpenSessionForAssignment(assignmentId);
  if (existing) {
    const participants = await fetchParticipants(existing.id);
    return NextResponse.json({
      ...serializeSession(existing, participants),
      alreadyOpen: true,
    });
  }

  const { data: session, error } = await supabaseAdmin
    .from("signal_ops_sessions")
    .insert({
      assignment_id: assignmentId,
      class_id: assignment.class_id,
      teacher_id: teacher.id,
      status: "lobby",
      duration_seconds: durationSeconds,
      mission_ends_at: null,
      salvage: 0,
      power: 100,
      shield: 70,
      base_health: 100,
      lane_north: 70,
      lane_shield: 70,
      lane_core: 70,
      total_correct: 0,
      wave_index: 0,
      last_attack_at: null,
      last_event: null,
      state_version: 0,
      outcome: "ongoing",
      // Legacy columns remain initialized while the old teacher surface is
      // migrated to the new Live Ops view.
      next_vote_threshold: 48,
      upgrades: {},
      vote: null,
      last_upgrade_id: null,
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(serializeSession(session, []));
}
