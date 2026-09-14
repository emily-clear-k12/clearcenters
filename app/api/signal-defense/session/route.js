import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import {
  getTeacherFromAccessToken,
  getStudentFromCookie,
  assertStudentCanAccessAssignment,
  fetchOpenSessionForAssignment,
  fetchParticipants,
  serializeSession,
  loadAssignmentWithTeacher,
} from "../../../../lib/signal-ops/sessionHelpers";

// GET /api/signal-defense/session?assignmentId=...
// Teacher: pass accessToken. Student: cookie. The live session tick is handled
// atomically in Postgres so every browser observes the same battle state.
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const assignmentId = searchParams.get("assignmentId");
  const accessToken = searchParams.get("accessToken");
  const includeEnded = searchParams.get("includeEnded") === "1";

  if (!assignmentId) {
    return NextResponse.json({ error: "Missing assignmentId." }, { status: 400 });
  }

  let myStudentId = null;

  if (accessToken) {
    const teacher = await getTeacherFromAccessToken(accessToken);
    if (!teacher) {
      return NextResponse.json({ error: "Not authorized." }, { status: 401 });
    }
    const assignment = await loadAssignmentWithTeacher(assignmentId);
    if (!assignment || assignment.classes?.teacher_id !== teacher.id) {
      return NextResponse.json({ error: "Not authorized." }, { status: 403 });
    }
  } else {
    const student = await getStudentFromCookie();
    if (!student) {
      return NextResponse.json({ error: "Not logged in." }, { status: 401 });
    }
    const access = await assertStudentCanAccessAssignment(student, assignmentId);
    if (!access.ok) {
      return NextResponse.json({ error: access.error }, { status: access.status });
    }
    myStudentId = student.id;
  }

  let session = await fetchOpenSessionForAssignment(assignmentId);
  if (!session && includeEnded) {
    const { data } = await supabaseAdmin
      .from("signal_ops_sessions")
      .select("*")
      .eq("assignment_id", assignmentId)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    session = data || null;
  }

  if (!session) {
    return NextResponse.json({ active: false, session: null, participants: [] });
  }

  if (session.status === "live") {
    const { data: advanced, error } = await supabaseAdmin.rpc("signal_ops_advance_session", {
      p_session_id: session.id,
    });
    if (error) {
      console.error("Signal Defense session tick failed:", error);
    } else if (advanced) {
      session = Array.isArray(advanced) ? advanced[0] : advanced;
    }
  }

  const participants = await fetchParticipants(session.id);
  return NextResponse.json(serializeSession(session, participants, { myStudentId }));
}
