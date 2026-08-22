import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "../../lib/supabaseAdmin";
import HomeClient from "./HomeClient";

export default async function HomePage() {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;

  if (!studentId) {
    redirect("/login");
  }

  const { data: student, error: studentError } = await supabaseAdmin
    .from("students")
    .select("id, first_name, crystal_points, streak_days, class_id")
    .eq("id", studentId)
    .single();

  if (studentError || !student) {
    redirect("/login");
  }

  const { data: studentClass } = await supabaseAdmin
    .from("classes")
    .select("name, class_code")
    .eq("id", student.class_id)
    .single();

  const { data: assignments } = await supabaseAdmin
    .from("assignments")
    .select("id, due_date, case_standard, created_at, cases(title)")
    .eq("class_id", student.class_id)
    .order("created_at", { ascending: false });

  const { count: missionsCompleted } = await supabaseAdmin
    .from("submissions")
    .select("id", { count: "exact", head: true })
    .eq("student_id", studentId);

  return (
    <HomeClient
      student={student}
      studentClass={studentClass}
      assignments={assignments || []}
      missionsCompleted={missionsCompleted || 0}
    />
  );
}
