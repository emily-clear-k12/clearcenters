import { cookies } from "next/headers";
import { supabaseAdmin } from "../supabaseAdmin";

const CALLSIGNS = [
  "NOVA", "ORBIT", "COMET", "ECHO", "LUMEN", "VEGA", "SPARK", "ATLAS",
  "COSMO", "LYRA", "APOLLO", "RIO", "HALO", "NIMBUS", "ARROW", "SOL",
];

export function callsignForIndex(i) {
  return CALLSIGNS[i % CALLSIGNS.length];
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
    .select("id, student_id, display_name, callsign, correct_count, joined_at, last_seen_at")
    .eq("session_id", sessionId)
    .order("joined_at", { ascending: true });
  return data || [];
}

export function serializeSession(session, participants) {
  if (!session) {
    return { active: false, session: null, participants: [] };
  }
  return {
    active: session.status !== "ended",
    session: {
      id: session.id,
      assignmentId: session.assignment_id,
      classId: session.class_id,
      status: session.status,
      salvage: session.salvage,
      power: session.power,
      baseHealth: session.base_health,
      totalCorrect: session.total_correct,
      createdAt: session.created_at,
      startedAt: session.started_at,
      endedAt: session.ended_at,
    },
    participants: (participants || []).map((p) => ({
      id: p.id,
      studentId: p.student_id,
      displayName: p.display_name,
      callsign: p.callsign,
      // correct_count stays server-side for private scoring; board only
      // shows presence. Never expose misses.
      joinedAt: p.joined_at,
    })),
  };
}
