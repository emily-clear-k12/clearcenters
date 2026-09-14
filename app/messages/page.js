import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "../../lib/supabaseAdmin";
import MessagesClient from "./MessagesClient";

// Sept 14 — Feature 5 of the teacher-efficiency build (see
// Teacher_SiteWide_Redesign_Plan.md): the student-facing inbox for
// announcements/nudges sent from app/teacher/messages. Same server-page
// (cookie auth) + client-component split as /progress and /badges.
export default async function MessagesPage() {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;

  if (!studentId) {
    redirect("/login");
  }

  const { data: student, error: studentError } = await supabaseAdmin
    .from("students")
    .select("id, first_name")
    .eq("id", studentId)
    .single();

  if (studentError || !student) {
    redirect("/login");
  }

  // `teacher_messages` is a brand-new table (Feature 5) — if the migration
  // hasn't run yet, show an empty inbox rather than a broken page.
  const { data: rows, error: messagesError } = await supabaseAdmin
    .from("teacher_messages")
    .select("id, is_broadcast, body, created_at, read_at, classes(name)")
    .eq("student_id", studentId)
    .order("created_at", { ascending: false });

  if (messagesError) {
    console.error("Student Messages: 'teacher_messages' not available yet (migration likely not run):", messagesError);
  }
  const messages = (rows || []).map((m) => ({
    id: m.id,
    isBroadcast: m.is_broadcast,
    body: m.body,
    createdAt: m.created_at,
    className: m.classes?.name || "",
    wasUnread: !m.read_at, // captured BEFORE marking below, same "read at time of this visit" pattern as /progress's last_progress_check_at
  }));

  // Visiting this page IS "reading" the inbox — mark every currently-unread
  // message read now, same auto-mark-on-visit convention as My Progress.
  const unreadIds = messages.filter((m) => m.wasUnread).map((m) => m.id);
  if (unreadIds.length > 0) {
    await supabaseAdmin.from("teacher_messages").update({ read_at: new Date().toISOString() }).in("id", unreadIds);
  }

  return <MessagesClient student={student} messages={messages} />;
}
