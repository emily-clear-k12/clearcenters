import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { TRACK_LEVELS, trackAllowedChars } from "../../../../lib/cases/relay-station";
import { ARCADE_GAMES, gameUnlocked } from "../../../../lib/cases/relay-station/arcade";

// ClearKeys arcade (Sept 29, 2026): typing games that open up as the student
// climbs the Foundations Track. Games run full-screen in an iframe.
export default async function ArcadeGamePage({ params }) {
  const studentId = cookies().get("cc_student_id")?.value;
  if (!studentId) redirect("/login");
  const game = ARCADE_GAMES.find((g) => g.key === params.game);
  if (!game) notFound();
  const { data: rs } = await supabaseAdmin.from("relay_station_progress").select("current_level, completed_at").eq("student_id", studentId).maybeSingle();
  const currentLevel = rs?.current_level || 1;
  const trackComplete = !!rs?.completed_at || currentLevel > TRACK_LEVELS.length;
  if (!gameUnlocked(game, { currentLevel, trackComplete })) redirect("/keys#arcade");

  let src = game.path;
  if (game.usesLearnedKeys) {
    // Only the letters this student has learned (lowercase a-z).
    const idx = Math.min(Math.max(currentLevel - 1, 0), TRACK_LEVELS.length - 1);
    const letters = [...trackAllowedChars(trackComplete ? TRACK_LEVELS.length - 1 : idx)].filter((c) => /[a-z]/.test(c)).join("");
    src = `${game.path}?keys=${encodeURIComponent(letters)}`;
  }
  return (
    <main style={{ position: "fixed", inset: 0, background: "#060B16" }}>
      <Link href="/keys#arcade" style={{ position: "absolute", top: 12, left: 12, zIndex: 5, color: "#fff", background: "rgba(13,27,42,.85)", padding: "8px 14px", borderRadius: 999, textDecoration: "none", fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>← ClearKeys</Link>
      <iframe title={game.name} src={src} style={{ width: "100%", height: "100%", border: 0, display: "block" }} allow="autoplay" />
    </main>
  );
}
