import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";
import {
  getStudentFromCookie,
  assertStudentCanAccessAssignment,
  fetchOpenSessionForAssignment,
  fetchParticipants,
  serializeSession,
  callsignForIndex,
} from "../../../../../lib/signal-ops/sessionHelpers";

// Student auto-joins the open session for this assignment. No join code.
export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { assignmentId } = body || {};

  if (!assignmentId) {
    return NextResponse.json({ error: "Missing assignmentId." }, { status: 400 });
  }

  const student = await getStudentFromCookie();
  if (!student) {
    return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  }

  const access = await assertStudentCanAccessAssignment(student, assignmentId);
  if (!access.ok) {
    return NextResponse.json({ error: access.error }, { status: access.status });
  }

  const session = await fetchOpenSessionForAssignment(assignmentId);
  if (!session) {
    return NextResponse.json({ active: false, session: null, participants: [] });
  }

  const existingParticipants = await fetchParticipants(session.id);
  const already = existingParticipants.find((p) => p.student_id === student.id);
  const displayName = (student.first_name || "Cadet").trim() || "Cadet";

  if (already) {
    await supabaseAdmin
      .from("signal_ops_participants")
      .update({ last_seen_at: new Date().toISOString(), display_name: displayName })
      .eq("id", already.id);
  } else {
    const callsign = callsignForIndex(existingParticipants.length);
    const { error } = await supabaseAdmin.from("signal_ops_participants").insert({
      session_id: session.id,
      student_id: student.id,
      display_name: displayName,
      callsign,
      correct_count: 0,
    });
    if (error && !String(error.message || "").toLowerCase().includes("duplicate")) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  const participants = await fetchParticipants(session.id);
  return NextResponse.json(serializeSession(session, participants));
}
