import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { getRelayStationLesson } from "../../../../lib/cases/relay-station";
import RelayStationClient from "../../../activity/[assignmentId]/RelayStationClient";

// ClearKeys free play (Sept 29, 2026): any built-in reading, no assignment.
// The client skips saving when there is no assignmentId.
export default async function PracticePage({ params }) {
  const studentId = cookies().get("cc_student_id")?.value;
  if (!studentId) redirect("/login");
  const code = decodeURIComponent(params.code || "");
  const base = getRelayStationLesson(code);
  if (!base || base.isTrack || base.isDaily || base.isRace) notFound();
  // Copy: the registry lesson is shared, so page-only fields go on a copy.
  const lesson = { ...base, doneLinks: [{ href: "/keys#practice", label: "Pick another reading →" }] };

  const [{ data: student }, { data: rsProgress }] = await Promise.all([
    supabaseAdmin.from("students").select("id, equipped_sam_skin, sam_nickname").eq("id", studentId).single(),
    supabaseAdmin.from("relay_station_progress").select("current_level, accommodations, keyboard_skin").eq("student_id", studentId).maybeSingle(),
  ]);
  if (!student) redirect("/login");

  return (
    <>
      <Link href="/keys" style={{ position: "fixed", top: 14, right: 14, zIndex: 50, color: "#fff", background: "rgba(13,27,42,.8)", padding: "8px 14px", borderRadius: 999, textDecoration: "none", fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>← ClearKeys</Link>
      <RelayStationClient
        assignmentId={null}
        lesson={lesson}
        accommodations={rsProgress ? rsProgress.accommodations : null}
        samSkin={student.equipped_sam_skin || null}
        samNickname={student.sam_nickname || null}
        keyboardSkin={rsProgress ? rsProgress.keyboard_skin : null}
        currentLevel={rsProgress ? rsProgress.current_level : 1}
      />
    </>
  );
}
