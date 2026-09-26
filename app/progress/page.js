import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "../../lib/supabaseAdmin";
import { getVisibleAssignmentsForStudent } from "../../lib/getStudentAssignments";
import ProgressClient from "./ProgressClient";

export default async function ProgressPage() {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;

  if (!studentId) {
    redirect("/login");
  }

  // Added streak_days (Aug 27) — the new dashboard shows a "Learning
  // Streak" card, same value Home already shows.
  const { data: student, error: studentError } = await supabaseAdmin
    .from("students")
    .select("id, first_name, class_id, crystal_points, streak_days, last_progress_check_at")
    .eq("id", studentId)
    .single();

  if (studentError || !student) {
    redirect("/login");
  }

  // Captured BEFORE we mark this visit as "seen" below, so "is this grade
  // new" reflects what was already seen as of the student's last visit to
  // this page, not this one.
  const lastCheck = student.last_progress_check_at || null;

  // This page now covers what used to be two separate pages (My Progress
  // and My Notebook), which both queried this same "submissions" table in
  // slightly different shapes — this is the union of both: enough columns
  // for the top "needs your attention" list AND the bottom archive tiles +
  // their detail popup (which needs the student's actual answer text and
  // the case's big question, hence the nested assignments/cases select).
  //
  // Only real, final submissions — draft autosaves never set submitted_at
  // (see the fix in /api/submission/save), so this only shows work the
  // student actually turned in. Intentionally NOT selecting ai_score or
  // ai_rationale — the AI's read is a teacher-only preview; students only
  // ever see the teacher's own grade and feedback.
  const { data: submissions } = await supabaseAdmin
    .from("submissions")
    .select(
      "id, assignment_id, attempt1, attempt2, self_confidence, submitted_at, released, released_at, teacher_grade, teacher_feedback, revision_requested, maker_studio_data, assignments(case_standard, cases(title, learning_target, engine))"
    )
    .eq("student_id", studentId)
    .not("submitted_at", "is", null)
    .order("submitted_at", { ascending: false });

  // Badge tiers — the new dashboard (Aug 27) shows the student's earned
  // badges as a row of small chips, reusing the exact same tier art and
  // earned/locked logic as Home and Crystal Vault.
  const { data: badgeTiers } = await supabaseAdmin
    .from("badge_tiers")
    .select("*")
    .order("sort_order");

  // Crystal-point history — powers the new "Your Crystal Growth" chart.
  // This table only started being written to as of the Aug 27 migration
  // (a trigger on students.crystal_points, see
  // sql/crystal_points_history_migration.sql) — a student's chart will be
  // sparse or empty until they've had activity since that migration ran.
  // Capped at the most recent 30 points; that's already more than enough
  // to draw a reasonable line and keeps this query cheap.
  const { data: pointsHistory } = await supabaseAdmin
    .from("crystal_points_history")
    .select("new_total, created_at")
    .eq("student_id", studentId)
    .order("created_at", { ascending: true })
    .limit(30);

  // Mark this visit as "now" — clears the "new grade" badge everywhere
  // else in the app going forward, without touching the "sent back for
  // revision" flag (that only clears once the student actually resubmits).
  // Awaited (not fire-and-forget) since a serverless function can be torn
  // down right after the response is sent, which would silently drop an
  // un-awaited write.
  try {
    await supabaseAdmin
      .from("students")
      .update({ last_progress_check_at: new Date().toISOString() })
      .eq("id", studentId);
  } catch (err) {
    // A hiccup here shouldn't block the page from loading — worst case the
    // badge takes one extra visit to clear.
  }

  const subs = submissions || [];

  let pastDue = [];
  if (student.class_id) {
    try {
      const openAssignments = await getVisibleAssignmentsForStudent(student.id, student.class_id);
      const now = new Date();
      const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
      pastDue = (openAssignments || []).filter((a) => a.due_date && a.due_date < today);
    } catch (err) {
      pastDue = [];
    }
  }

  const journalEntries = subs
    .filter((s) => s.maker_studio_data && s.maker_studio_data.version === 2 && s.maker_studio_data.journalKept)
    .map((s) => {
      const caseStandard = s.assignments?.case_standard || null;
      const caseTitle = s.assignments?.cases?.title || caseStandard || "Maker piece";
      const modeSlots = (s.maker_studio_data.modes && typeof s.maker_studio_data.modes === "object")
        ? s.maker_studio_data.modes
        : {};
      const bits = [];
      Object.entries(modeSlots).forEach(([id, slot]) => {
        if (!slot || slot.status === "empty") return;
        if (id === "write" && slot.text) bits.push(slot.text);
        else if (id === "diagram" && slot.caption) bits.push(slot.caption);
        else if (id === "poster") {
          const line = [slot.title, slot.caption].filter(Boolean).join(" — ");
          if (line) bits.push(line);
          else if (slot.imageDataUrl) bits.push("(poster)");
        } else if (id === "comic" && Array.isArray(slot.panels)) {
          const lines = slot.panels.map((pn) => (pn && pn.text) || "").filter(Boolean);
          if (lines.length) bits.push(lines.join(" / "));
          else bits.push("(comic)");
        } else if (id === "sketch" && slot.imageDataUrl) bits.push("(sketch)");
        else if (id === "voice" && slot.audioDataUrl) bits.push("(voice note)");
      });
      return {
        id: s.id,
        caseStandard,
        caseTitle,
        text: bits.join("\n\n") || s.attempt2 || s.attempt1 || "",
        released: !!s.released,
        grade: s.teacher_grade,
        feedback: s.teacher_feedback || null,
        keptAt: s.released_at || s.submitted_at,
      };
    });

  const missions = subs.map((s) => {
    const caseStandard = s.assignments?.case_standard || null;
    const caseTitle = s.assignments?.cases?.title || caseStandard || "Mission";
    return {
      id: s.id,
      assignmentId: s.assignment_id,
      caseStandard,
      caseTitle,
      learningTarget: s.assignments?.cases?.learning_target || null,
      attempt1: s.attempt1,
      attempt2: s.attempt2,
      selfConfidence: s.self_confidence,
      submittedAt: s.submitted_at,
      released: !!s.released,
      releasedAt: s.released_at || null,
      revisionRequested: !!s.revision_requested,
      isNewGrade: !!(s.released && s.released_at && (!lastCheck || new Date(s.released_at) > new Date(lastCheck))),
      grade: s.released ? s.teacher_grade : null,
      // The revision note and the released-grade note both live in the same
      // teacher_feedback column — show it either way so the student always
      // sees the teacher's most recent note about this mission.
      feedback: s.released || s.revision_requested ? s.teacher_feedback : null,
    };
  });

  return (
    <ProgressClient
      journalEntries={journalEntries}
      student={student}
      missions={missions}
      badgeTiers={badgeTiers || []}
      pointsHistory={pointsHistory || []}
      pastDue={pastDue}
    />
  );
}
