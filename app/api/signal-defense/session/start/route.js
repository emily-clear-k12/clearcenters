import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";
import {
  getTeacherFromAccessToken,
  loadAssignmentWithTeacher,
  fetchOpenSessionForAssignment,
  fetchParticipants,
  serializeSession,
} from "../../../../../lib/signal-ops/sessionHelpers";

// Teacher opens a live Signal Ops session for an assignment. Kids auto-join
// from the assignment page — no join code. Starts in "lobby" until Begin.
// Fresh base each time (including regroup retries).
export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { assignmentId, accessToken } = body || {};

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
      salvage: 0,
      power: 100,
      base_health: 100,
      total_correct: 0,
      wave_index: 0,
      next_vote_threshold: 48,
      upgrades: {},
      vote: null,
      outcome: "ongoing",
      last_upgrade_id: null,
    })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(serializeSession(session, []));
}
