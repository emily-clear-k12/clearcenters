import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "../../lib/supabaseAdmin";
import { getVisibleBriefingAssignmentsForStudent } from "../../lib/getStudentBriefingAssignments";
import { listPublicBriefings } from "../../lib/briefings/index.public";
import BriefingsClient from "./BriefingsClient";

export default async function BriefingsPage() {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;
  if (!studentId) redirect("/login");

  const { data: student } = await supabaseAdmin
    .from("students")
    .select("id, first_name, class_id, equipped_sam_skin, sam_nickname")
    .eq("id", studentId)
    .single();

  if (!student) redirect("/login");

  let assignments = [];
  try {
    assignments = await getVisibleBriefingAssignmentsForStudent(studentId, student.class_id);
  } catch (err) {
    // Migration may not be applied yet — show catalog-only pilot card.
    console.error("[briefings/page] assignment lookup failed:", err?.message || err);
    assignments = [];
  }

  const catalog = listPublicBriefings().map((b) => ({
    id: b.id,
    title: b.title,
    tagline: b.tagline,
    subject: b.subjectLabel || b.subject,
    grade: b.grade,
    teks: b.teks,
    minutes: b.minutes,
    art: b.art?.intel || null,
  }));

  return (
    <BriefingsClient
      student={student}
      assignments={assignments}
      catalog={catalog}
    />
  );
}
