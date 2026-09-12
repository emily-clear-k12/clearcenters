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
    const { data } = await supabaseAdmin.from("signal_ops_sessions").select("*").eq("id", sessionId).maybeSingle();
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

  const { data: updated, error } = await supabaseAdmin
    .from("signal_ops_sessions")
    .update({ status: "live", started_at: new Date().toISOString() })
    .eq("id", session.id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const participants = await fetchParticipants(updated.id);
  return NextResponse.json(serializeSession(updated, participants));
}
