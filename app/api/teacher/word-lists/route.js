import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import {
  parseListText,
  validateEntries,
  withMisspellings,
  makeMisspellings,
  isAcceptableMisspelling,
} from "../../../../lib/frequencyRushCustomLists";

// SERVER ONLY. Frequency Rush custom word lists (Sept 24, 2026;
// FrequencyRush_Fluency_Expansion_v1.md step 3). A teacher types or uploads
// words with definitions; the site makes the wrong spellings; the list
// becomes an assignable Frequency Rush case only that teacher sees.
//
//   action "preview" -> parse + check the pasted text, add wrong spellings
//   action "reroll"  -> new wrong spellings for one word
//   action "list"    -> this teacher's lists (+ whether each is assigned)
//   action "create"  -> save a checked list + a `cases` row (FR.C.<teacher8>.<id>)
//   action "delete"  -> remove one, only if it has never been assigned
//
// Same access-token + admin-key pattern as /api/teacher/typing-texts.
const SUBJECTS = ["ELAR", "Science", "Social Studies", "Math"];

function randomId(n = 6) {
  const chars = "abcdefghijkmnpqrstuvwxyz23456789";
  let out = "";
  for (let i = 0; i < n; i += 1) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

function cleanEntries(raw) {
  return (Array.isArray(raw) ? raw : []).slice(0, 60).map((e) => ({
    word: String(e?.word || "").replace(/\s+/g, " ").trim(),
    definition: String(e?.definition || "").replace(/\s+/g, " ").trim(),
    misspellings: Array.isArray(e?.misspellings) ? e.misspellings.map((m) => String(m).trim()).filter(Boolean).slice(0, 3) : [],
  }));
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

  if (action === "preview") {
    const { entries, problems: parseProblems } = parseListText(String(body.text || "").slice(0, 20000));
    const problems = [...parseProblems, ...validateEntries(entries)];
    return NextResponse.json({ entries: withMisspellings(entries), problems });
  }

  if (action === "reroll") {
    const word = String(body.word || "").trim();
    const others = (Array.isArray(body.otherWords) ? body.otherWords : []).map(String);
    const avoid = (Array.isArray(body.avoid) ? body.avoid : []).map(String);
    let misspellings = makeMisspellings(word, others, 3, avoid);
    // if avoiding the old ones leaves too few, allow repeats rather than come back empty
    if (misspellings.length < 2) misspellings = makeMisspellings(word, others, 3);
    return NextResponse.json({ misspellings });
  }

  if (action === "list") {
    const { data: lists, error } = await supabaseAdmin
      .from("frequency_rush_custom_lists")
      .select("standard, title, grade, subject, words, include_meaning, include_spelling, created_at")
      .eq("teacher_id", teacherId)
      .order("created_at", { ascending: false });
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    const codes = (lists || []).map((l) => l.standard);
    let assigned = new Set();
    if (codes.length) {
      const { data: rows } = await supabaseAdmin.from("assignments").select("case_standard").in("case_standard", codes);
      assigned = new Set((rows || []).map((r) => r.case_standard));
    }
    return NextResponse.json({ lists: (lists || []).map((l) => ({ ...l, assigned: assigned.has(l.standard) })) });
  }

  if (action === "create") {
    const title = String(body.title || "").trim().slice(0, 80);
    const grade = [3, 4, 5].includes(Number(body.grade)) ? Number(body.grade) : null;
    const subject = SUBJECTS.includes(body.subject) ? body.subject : "ELAR";
    const includeMeaning = body.includeMeaning !== false;
    const includeSpelling = body.includeSpelling !== false;
    if (!title) return NextResponse.json({ error: "Give the list a title." }, { status: 400 });
    if (!grade) return NextResponse.json({ error: "Pick grade 3, 4, or 5." }, { status: 400 });
    if (!includeMeaning && !includeSpelling) return NextResponse.json({ error: "Turn on meaning questions, spelling questions, or both." }, { status: 400 });

    const entries = cleanEntries(body.entries);
    const problems = validateEntries(entries);
    if (problems.length) return NextResponse.json({ error: problems[0], problems }, { status: 400 });

    // Re-check every wrong spelling on the server; replace any that fail.
    const words = withMisspellings(
      entries.map((e) => {
        const others = entries.filter((o) => o.word !== e.word).map((o) => o.word);
        return { ...e, misspellings: e.misspellings.filter((m) => isAcceptableMisspelling(e.word, m, others)) };
      })
    );

    const standard = `FR.C.${teacherId.replace(/-/g, "").slice(0, 8).toLowerCase()}.${randomId()}`;
    const { error: caseError } = await supabaseAdmin
      .from("cases")
      .insert({ standard, title: `My List: ${title}`, engine: "frequency_rush", grade, subject, unit: "custom" });
    if (caseError) return NextResponse.json({ error: "Couldn't save: " + caseError.message }, { status: 500 });

    const { error: listError } = await supabaseAdmin
      .from("frequency_rush_custom_lists")
      .insert({ standard, teacher_id: teacherId, title, grade, subject, words, include_meaning: includeMeaning, include_spelling: includeSpelling });
    if (listError) {
      await supabaseAdmin.from("cases").delete().eq("standard", standard);
      return NextResponse.json({ error: "Couldn't save: " + listError.message }, { status: 500 });
    }
    return NextResponse.json({ success: true, standard, words });
  }

  if (action === "delete") {
    const standard = String(body.standard || "");
    const { data: row } = await supabaseAdmin
      .from("frequency_rush_custom_lists")
      .select("standard, teacher_id")
      .eq("standard", standard)
      .maybeSingle();
    if (!row || row.teacher_id !== teacherId) {
      return NextResponse.json({ error: "That list doesn't belong to you." }, { status: 403 });
    }
    const { data: used } = await supabaseAdmin.from("assignments").select("id").eq("case_standard", standard).limit(1);
    if (used && used.length) {
      return NextResponse.json({ error: "This list has been assigned, so it's kept for your students' records." }, { status: 409 });
    }
    await supabaseAdmin.from("frequency_rush_custom_lists").delete().eq("standard", standard);
    await supabaseAdmin.from("cases").delete().eq("standard", standard);
    return NextResponse.json({ success: true });
  }

  return NextResponse.json({ error: "Unknown action." }, { status: 400 });
}
