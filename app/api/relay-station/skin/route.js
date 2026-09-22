import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { skinUnlocked, getKeyboardSkin } from "../../../../lib/cases/relay-station";

// Relay Station keyboard skins (Wave 3). A student equips a skin they've
// unlocked by rank on the Foundations Track; the rank is re-checked here
// from their real progress row, never trusted from the browser.
export async function POST(request) {
  const cookieStore = cookies();
  const studentId = cookieStore.get("cc_student_id")?.value;
  if (!studentId) return NextResponse.json({ error: "Not logged in." }, { status: 401 });
  const body = await request.json().catch(() => ({}));
  const skin = getKeyboardSkin(body.skin);
  if (skin.key !== body.skin) return NextResponse.json({ error: "Unknown skin." }, { status: 400 });

  const { data: row } = await supabaseAdmin
    .from("relay_station_progress")
    .select("student_id, current_level")
    .eq("student_id", studentId)
    .maybeSingle();
  if (!skinUnlocked(skin.key, row ? row.current_level : 1)) {
    return NextResponse.json({ error: "Keep climbing the track to unlock that skin!" }, { status: 403 });
  }
  const { error } = row
    ? await supabaseAdmin.from("relay_station_progress").update({ keyboard_skin: skin.key }).eq("student_id", studentId)
    : await supabaseAdmin.from("relay_station_progress").insert({ student_id: studentId, current_level: 1, level_results: {}, keyboard_skin: skin.key });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true, skin: skin.key });
}
