import { randomUUID } from "crypto";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";
import {
  getStudentFromCookie,
  assertStudentCanAccessAssignment,
  fetchOpenSessionForAssignment,
  fetchParticipants,
  serializeSession,
} from "../../../../../lib/signal-ops/sessionHelpers";

// Correct-answer contribution only. Wrong answers never call this route.
// The database function is atomic + idempotent so simultaneous classroom
// answers cannot overwrite one another.
export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { assignmentId } = body || {};
  const eventId = String(body?.eventId || randomUUID());

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

  let session = await fetchOpenSessionForAssignment(assignmentId);
  if (!session) {
    return NextResponse.json({ error: "No live session." }, { status: 404 });
  }
  if (session.status !== "live") {
    return NextResponse.json({ error: "Session is not live yet." }, { status: 409 });
  }

  const { data: advanced, error: tickError } = await supabaseAdmin.rpc(
    "signal_ops_advance_session",
    { p_session_id: session.id }
  );
  if (!tickError && advanced) {
    session = Array.isArray(advanced) ? advanced[0] : advanced;
  }

  if (!session || session.status !== "live" || (session.outcome && session.outcome !== "ongoing")) {
    const participants = session ? await fetchParticipants(session.id) : [];
    return NextResponse.json(
      session
        ? serializeSession(session, participants, { myStudentId: student.id })
        : { error: "Session ended." },
      { status: session ? 200 : 409 }
    );
  }

  const { data: updated, error } = await supabaseAdmin.rpc("signal_ops_submit_event", {
    p_session_id: session.id,
    p_student_id: student.id,
    p_event_id: eventId,
    p_event_type: "correct",
    p_target: null,
  });

  if (error) {
    const message = String(error.message || "Unable to send class power.");
    const status = message.includes("student_not_in_session") ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }

  const finalSession = Array.isArray(updated) ? updated[0] : updated;
  const participants = await fetchParticipants(session.id);
  return NextResponse.json(
    serializeSession(finalSession || session, participants, { myStudentId: student.id })
  );
}
