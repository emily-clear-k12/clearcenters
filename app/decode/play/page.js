import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { readProgress, readClassWords } from "../../../lib/cleardecodeServer";
import { nextSession, doneToday, isRuinReady, buildChamber, buildVault, reviewPool, getRuinContent, dateKey } from "../../../lib/cleardecode";
import ChamberClient from "../../../components/cleardecode/ChamberClient";

export const dynamic = "force-dynamic";

// Today's ClearDecode session, built on the server from the ruin's content.
export default async function PlayPage() {
  const studentId = cookies().get("cc_student_id")?.value;
  if (!studentId) redirect("/login");
  const { data: student } = await supabaseAdmin.from("students").select("id, class_id").eq("id", studentId).single();
  if (!student) redirect("/login");
  const { row } = await readProgress(studentId);
  if (!row || row.status !== "on") redirect("/decode");
  const ses = nextSession(row);
  if (!ses.ruin || !isRuinReady(ses.ruin) || doneToday(row)) redirect("/decode");
  const content = getRuinContent(ses.ruin);
  const pool = reviewPool(ses.ruin);
  if (ses.kind === "vault") {
    const vault = buildVault(ses.ruin, { reviewPool: pool });
    return <ChamberClient session={ses} rooms={[]} vault={vault} ruinName={content.name} codeLabel={content.code.label} />;
  }
  const { words } = await readClassWords(student.class_id);
  const rooms = buildChamber(ses.ruin, ses.n, { warmPool: pool, classWords: words });
  const resume = row.chamber && row.chamber.ruin === ses.ruin && row.chamber.n === ses.n && row.chamber.date === dateKey() ? row.chamber.room : 0;
  return <ChamberClient session={ses} rooms={rooms} startRoom={resume} ruinName={content.name} codeLabel={content.code.label} />;
}
