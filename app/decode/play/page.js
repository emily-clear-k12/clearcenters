import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "../../../lib/supabaseAdmin";
import { readProgress, readClassWords } from "../../../lib/cleardecodeServer";
import { nextSession, doneToday, isRuinReady, buildChamber, buildVault, buildKeeper, reviewPool, getRuinContent, dateKey, planetOf, ruinState, KEEPER, LAST_RUIN } from "../../../lib/cleardecode";
import ChamberClient from "../../../components/cleardecode/ChamberClient";

export const dynamic = "force-dynamic";

// Today's ClearDecode session, built on the server from the ruin's content.
export default async function PlayPage() {
  const studentId = cookies().get("cc_student_id")?.value;
  if (!studentId) redirect("/login");
  const { data: student } = await supabaseAdmin.from("students").select("id, class_id, equipped_sam_skin").eq("id", studentId).single();
  if (!student) redirect("/login");
  const { row } = await readProgress(studentId);
  if (!row || row.status !== "on") redirect("/decode");
  const ses = nextSession(row);
  if (ses.kind === "keeper" && !doneToday(row)) {
    const { words } = await readClassWords(student.class_id);
    const rooms = buildKeeper(row, { classWords: words });
    const meta = { planetId: "K", planetName: "Haven", ruinId: KEEPER, ruinName: "Keeper of the Archive", codeLabel: "review" };
    const resume = row.chamber && row.chamber.ruin === KEEPER && row.chamber.date === dateKey() ? row.chamber.room : 0;
    return <ChamberClient session={ses} rooms={rooms} startRoom={resume} ruinName={meta.ruinName} codeLabel="review" meta={meta} skin={student.equipped_sam_skin || null} keeper />;
  }
  if (!ses.ruin || !isRuinReady(ses.ruin) || doneToday(row)) redirect("/decode");
  const content = getRuinContent(ses.ruin);
  const pool = reviewPool(ses.ruin);
  const planet = planetOf(ses.ruin) || {};
  const meta = { planetId: planet.id, planetName: planet.name, ruinId: ses.ruin, ruinName: content.name, codeLabel: content.code.label };
  const skin = student.equipped_sam_skin || null;
  const pieces = Math.min(4, ruinState(row, ses.ruin).chambers || 0);
  if (ses.kind === "vault") {
    const vault = buildVault(ses.ruin, { reviewPool: pool });
    return <ChamberClient session={ses} rooms={[]} vault={vault} ruinName={content.name} codeLabel={content.code.label} meta={meta} skin={skin} relic={content.relic} pieces={pieces} />;
  }
  const { words } = await readClassWords(student.class_id);
  const rooms = buildChamber(ses.ruin, ses.n, { warmPool: pool, classWords: words });
  const resume = row.chamber && row.chamber.ruin === ses.ruin && row.chamber.n === ses.n && row.chamber.date === dateKey() ? row.chamber.room : 0;
  return <ChamberClient session={ses} rooms={rooms} startRoom={resume} ruinName={content.name} codeLabel={content.code.label} meta={meta} skin={skin} relic={content.relic} pieces={pieces} />;
}
