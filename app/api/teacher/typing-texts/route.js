import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { sanitizeTypingText } from "../../../../lib/cases/relay-station";

// SERVER ONLY. Relay Station custom texts (design doc §11): a teacher pastes
// any passage — spelling list, weekly vocabulary, a reading — and it becomes
// an assignable Relay Station case that only they see in the Challenge
// Library.
//
//   action "list"   -> this teacher's custom texts (+ whether each is assigned)
//   action "create" -> sanitize, save text + a `cases` row (RS.C.<teacher8>.<id>)
//   action "delete" -> remove one, only if it has never been assigned
//
// Same access-token + admin-key pattern as the other teacher routes.
const KINDS = ["paragraph", "spelling", "vocabulary", "sentences", "letter", "conversation", "list", "other"];
const SUBJECTS = ["ELAR", "Science", "Social Studies", "Math"];

function randomId(n = 6) {
  const chars = "abcdefghijkmnpqrstuvwxyz23456789";
  let out = "";
  for (let i = 0; i < n; i += 1) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { accessToken, action } = body;
  if (!accessToken || !action) {
    return NextResponse.json({ error: "Missing action or session." }, { status: 400 });
  }
  const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(accessToken);
  if (userError || !userData?.user) {
    return NextResponse.json({ error: "Your session expired — refresh the page and try again." }, { status: 401 });
  }
  const teacherId = userData.user.id;

  if (action === "list") {
    const { data: texts, error } = await supabaseAdmin
      .from("relay_station_custom_texts")
      .select("standard, title, grade, subject, kind, text, mode, compose_prompt, created_at")
      .eq("teacher_id", teacherId)
      .order("created_at", { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    const codes = (texts || []).map((t) => t.standard);
    let assigned = new Set();
    if (codes.length) {
      const { data: rows } = await supabaseAdmin.from("assignments").select("case_standard").in("case_standard", codes);
      assigned = new Set((rows || []).map((r) => r.case_standard));
    }
    return NextResponse.json({ texts: (texts || []).map((t) => ({ ...t, assigned: assigned.has(t.standard) })) });
  }

  if (action === "create") {
    const title = String(body.title || "").trim().slice(0, 80);
    const grade = [3, 4, 5].includes(Number(body.grade)) ? Number(body.grade) : null;
    const subject = SUBJECTS.includes(body.subject) ? body.subject : "ELAR";
    const kind = KINDS.includes(body.kind) ? body.kind : "paragraph";
    const intro = String(body.intro || "").trim().slice(0, 300) || null;
    // Wave 2: how students type it (copy / dictation / student's choice) and
    // an optional "Your Turn" writing prompt afterward.
    const mode = ["copy", "dictation", "choice"].includes(body.mode) ? body.mode : "choice";
    const composePrompt = String(body.composePrompt || "").trim().slice(0, 400) || null;
    const { text } = sanitizeTypingText(body.text);
    if (!title) return NextResponse.json({ error: "Give the text a title." }, { status: 400 });
    if (!grade) return NextResponse.json({ error: "Pick grade 3, 4, or 5." }, { status: 400 });
    if (text.length < 20) return NextResponse.json({ error: "The text needs at least 20 typeable characters." }, { status: 400 });

    const standard = `RS.C.${teacherId.replace(/-/g, "").slice(0, 8).toLowerCase()}.${randomId()}`;
    const { error: caseError } = await supabaseAdmin
      .from("cases")
      .insert({ standard, title: `Custom: ${title}`, engine: "relay_station", grade, subject });
    if (caseError) return NextResponse.json({ error: "Couldn't save: " + caseError.message }, { status: 500 });

    const { error: textError } = await supabaseAdmin
      .from("relay_station_custom_texts")
      .insert({ standard, teacher_id: teacherId, title, grade, subject, kind, intro, text, mode, compose_prompt: composePrompt });
    if (textError) {
      await supabaseAdmin.from("cases").delete().eq("standard", standard);
      return NextResponse.json({ error: "Couldn't save: " + textError.message }, { status: 500 });
    }
    return NextResponse.json({ success: true, standard, text });
  }

  if (action === "delete") {
    const standard = String(body.standard || "");
    const { data: row } = await supabaseAdmin
      .from("relay_station_custom_texts")
      .select("standard, teacher_id")
      .eq("standard", standard)
      .maybeSingle();
    if (!row || row.teacher_id !== teacherId) {
      return NextResponse.json({ error: "That text doesn't belong to you." }, { status: 403 });
    }
    const { data: used } = await supabaseAdmin.from("assignments").select("id").eq("case_standard", standard).limit(1);
    if (used && used.length) {
      return NextResponse.json({ error: "This text has been assigned, so it's kept for your students' records." }, { status: 409 });
    }
    await supabaseAdmin.from("relay_station_custom_texts").delete().eq("standard", standard);
    await supabaseAdmin.from("cases").delete().eq("standard", standard);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Unknown action." }, { status: 400 });
}
