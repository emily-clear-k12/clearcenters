import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "../../lib/supabaseAdmin";
import { readProgress } from "../../lib/cleardecodeServer";
import { PLANETS, ruinsOfPlanet, ruinIndex, getRuinContent, isRuinReady, nextSession, doneToday, ruinState, masteredRuins, planetOf, isComplete } from "../../lib/cleardecode";
import CodeHome from "../../components/cleardecode/CodeHome";
import DecodeMessage from "../../components/cleardecode/DecodeMessage";

export const dynamic = "force-dynamic";

// ClearDecode door (Sept 30, 2026): only for students the teacher sent the
// placement scan to, or turned ClearDecode on for.
export default async function CodePage() {
  const studentId = cookies().get("cc_student_id")?.value;
  if (!studentId) redirect("/login");
  const { data: student } = await supabaseAdmin.from("students").select("id, first_name, equipped_sam_skin").eq("id", studentId).single();
  if (!student) redirect("/login");
  const { row } = await readProgress(studentId);
  if (row && row.scan && row.scan.pending) redirect("/decode/scan");
  const skin = student.equipped_sam_skin || null;
  if (!row || row.status !== "on") {
    const scanned = row && row.status === "scanned";
    return <DecodeMessage skin={skin} title={scanned ? "Scan complete." : "Nothing here yet."} text={scanned ? "The station has your scan. Your teacher will let you know what's next." : "Your teacher will open ClearDecode for you when it's time."} />;
  }
  const current = row.current_ruin;
  const mastered = new Set(masteredRuins(row));
  const curIdx = ruinIndex(current);
  const planets = PLANETS.map((p) => {
    const ruins = ruinsOfPlanet(p.id).map((r) => ({ id: r.id, state: r.id === current ? "here" : mastered.has(r.id) || ruinIndex(r.id) < curIdx ? "done" : "locked" }));
    return { id: p.id, name: p.name, skill: p.skill, here: ruins.some((r) => r.state === "here"), ruins };
  });
  const relics = Object.entries(row.ruins || {}).filter(([, v]) => v && v.passedAt).map(([id]) => ({ id, ...(getRuinContent(id) || {}).relic })).filter((r) => r.name);
  const keeper = !current && isComplete(row);
  const content = keeper ? null : getRuinContent(current);
  const view = {
    planets, current, relics,
    session: nextSession(row),
    doneToday: doneToday(row),
    ready: keeper || isRuinReady(current),
    keeper,
    ruinName: keeper ? "Keeper of the Archive" : content ? content.name : "Uncharted ruin",
    pieces: keeper ? 4 : Math.min(4, ruinState(row, current).chambers || 0),
    planetName: keeper ? "Haven" : (planetOf(current) || {}).name || "",
    currentPlanet: keeper ? "K" : (planetOf(current) || {}).id || "A",
    codeLabel: keeper ? "all codes" : content ? content.code.label : "",
  };
  return <CodeHome firstName={student.first_name} view={view} skin={skin} />;
}
