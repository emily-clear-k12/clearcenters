import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { readFluency } from "../../../../lib/fluencyServer";
import { buildReadingLesson, TRACK_LEVELS } from "../../../../lib/cases/relay-station";
import { getFluencyLevel, normalizeFluency } from "../../../../lib/cases/relay-station/fluency";
import RelayStationClient from "../../../activity/[assignmentId]/RelayStationClient";

// One Fluency level (Sept 29, 2026). Saves through /api/relay-station/fluency.
export default async function FluencyLevelPage({ params }) {
  const studentId = cookies().get("cc_student_id")?.value;
  if (!studentId) redirect("/login");
  const level = getFluencyLevel(params.n);
  if (!level) notFound();
  const [{ data: student }, { data: rs }] = await Promise.all([
    supabaseAdmin.from("students").select("id, equipped_sam_skin, sam_nickname").eq("id", studentId).single(),
    supabaseAdmin.from("relay_station_progress").select("current_level, completed_at, accommodations, keyboard_skin").eq("student_id", studentId).maybeSingle(),
  ]);
  if (!student) redirect("/login");
  const trackDone = !!rs && (!!rs.completed_at || rs.current_level > TRACK_LEVELS.length);
  if (!trackDone) redirect("/keys#fluency");
  const { fluency } = await readFluency(studentId);
  const fl = normalizeFluency(fluency);
  if (level.n > fl.current) redirect("/keys/fluency");

  const lesson = buildReadingLesson({ code: `FLUENCY.${level.n}`, grade: 4, subject: "ELAR", kind: "fluency", title: `Fluency Level ${level.n}: ${level.title}`, intro: level.intro, text: level.text });
  lesson.goals = level.goals;
  lesson.lockedMode = "copy";
  lesson.passNeedsSpeed = true;
  lesson.submitTo = { url: "/api/relay-station/fluency", body: { level: level.n } };
  const prev = fl.results[String(level.n)];

  return (
    <>
      <Link href="/keys/fluency" style={{ position: "fixed", top: 14, right: 14, zIndex: 50, color: "#fff", background: "rgba(13,27,42,.8)", padding: "8px 14px", borderRadius: 999, textDecoration: "none", fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>← Fluency map</Link>
      <RelayStationClient
        assignmentId={null}
        lesson={lesson}
        existingBest={prev && prev.passed ? prev : null}
        accommodations={rs ? rs.accommodations : null}
        samSkin={student.equipped_sam_skin || null}
        samNickname={student.sam_nickname || null}
        keyboardSkin={rs ? rs.keyboard_skin : null}
        currentLevel={rs ? rs.current_level : 1}
      />
    </>
  );
}
