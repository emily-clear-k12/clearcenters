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
// Teacher: pass accessToken. Student: cookie. Returns open session + roster
// + shared meters, or { active:false } when solo/fake-crew should run.
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const assignmentId = searchParams.get("assignmentId");
  const accessToken = searchParams.get("accessToken");
  const includeEnded = searchParams.get("includeEnded") === "1";

  if (!assignmentId) {
    return NextResponse.json({ error: "Missing assignmentId." }, { status: 400 });
  }

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

  const participants = await fetchParticipants(session.id);
  return NextResponse.json(serializeSession(session, participants));
}
