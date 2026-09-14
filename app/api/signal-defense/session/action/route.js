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

const POWER_MOVE_TARGETS = new Set(["gate", "shield", "core"]);

// Student reward actions that affect the shared battle. These are never
// academic penalties: they only add defense/resources to the class session.
export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { assignmentId, action } = body || {};
  const target = body?.target ? String(body.target) : null;
  const eventId = String(body?.eventId || randomUUID());

  if (!assignmentId || !action) {
    return NextResponse.json({ error: "Missing assignmentId or action." }, { status: 400 });
  }
  if (action !== "power_move" && action !== "crystal_surge") {
    return NextResponse.json({ error: "Invalid action." }, { status: 400 });
  }
  if (action === "power_move" && !POWER_MOVE_TARGETS.has(target)) {
    return NextResponse.json({ error: "Invalid Power Move target." }, { status: 400 });
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
  if (!session || session.status !== "live") {
    return NextResponse.json({ error: "No live Signal Defense mission." }, { status: 409 });
  }

  const { data: advanced } = await supabaseAdmin.rpc("signal_ops_advance_session", {
    p_session_id: session.id,
  });
  if (advanced) session = Array.isArray(advanced) ? advanced[0] : advanced;

  if (!session || session.status !== "live" || session.outcome !== "ongoing") {
    const participants = session ? await fetchParticipants(session.id) : [];
    return NextResponse.json(
      session
        ? serializeSession(session, participants, { myStudentId: student.id })
        : { error: "Mission ended." },
      { status: session ? 200 : 409 }
    );
  }

  const { data: updated, error } = await supabaseAdmin.rpc("signal_ops_submit_event", {
    p_session_id: session.id,
    p_student_id: student.id,
    p_event_id: eventId,
    p_event_type: action,
    p_target: action === "power_move" ? target : null,
  });

  if (error) {
    const message = String(error.message || "Unable to send Signal Defense action.");
    const status = message.includes("student_not_in_session") ? 403 : 500;
    return NextResponse.json({ error: message }, { status });
  }

  const finalSession = Array.isArray(updated) ? updated[0] : updated;
  const participants = await fetchParticipants(session.id);
  return NextResponse.json(
    serializeSession(finalSession || session, participants, { myStudentId: student.id })
  );
}
