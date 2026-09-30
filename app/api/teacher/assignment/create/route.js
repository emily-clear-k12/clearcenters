import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../../lib/supabaseAdmin";
import { isHiddenContent, HIDDEN_ASSIGN_MESSAGE } from "../../../../../lib/contentReview/hidden";

// Creates an assignment for a teacher. Refuses a review-hidden activity so a
// saved link cannot get around the Assign page filter. Work already assigned
// is left alone: this route only blocks new rows.
const ALLOWED = [
  "class_id",
  "case_standard",
  "due_date",
  "distress_call",
  "distress_call_target",
  "distress_call_deadline",
  "distress_call_reward_points",
  "game_skin",
  "question_seconds",
  "crystal_dive_minutes",
  "broadcast_booth_config",
  "maker_studio_config",
];

function pickFields(body) {
  const fields = {};
  for (const key of ALLOWED) {
    if (body[key] !== undefined) fields[key] = body[key];
  }
  return fields;
}

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const { accessToken, engine } = body;
  const fields = pickFields(body);

  if (!accessToken || !fields.class_id || !fields.case_standard) {
    return NextResponse.json({ error: "Missing assignment details." }, { status: 400 });
  }
  if (isHiddenContent(engine, fields.case_standard)) {
    return NextResponse.json({ error: HIDDEN_ASSIGN_MESSAGE }, { status: 400 });
  }

  const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(accessToken);
  if (userError || !userData?.user) {
    return NextResponse.json({ error: "Your session expired — refresh the page and try again." }, { status: 401 });
  }

  const { data: cls, error: classError } = await supabaseAdmin
    .from("classes")
    .select("id, teacher_id")
    .eq("id", fields.class_id)
    .maybeSingle();
  if (classError || !cls || cls.teacher_id !== userData.user.id) {
    return NextResponse.json({ error: "That class isn't yours." }, { status: 403 });
  }

  let dropped = null;
  let { data, error } = await supabaseAdmin.from("assignments").insert(fields).select().single();
  if (error && /question_seconds/i.test(error.message || "")) {
    const { question_seconds, ...rest } = fields;
    dropped = "question_seconds";
    ({ data, error } = await supabaseAdmin.from("assignments").insert(rest).select().single());
  }
  if (error && /broadcast_booth_config/i.test(error.message || "")) {
    const { broadcast_booth_config, ...rest } = fields;
    dropped = "broadcast_booth_config";
    ({ data, error } = await supabaseAdmin.from("assignments").insert(rest).select().single());
  }
  if (error && /maker_studio_config/i.test(error.message || "")) {
    const { maker_studio_config, ...rest } = fields;
    dropped = "maker_studio_config";
    ({ data, error } = await supabaseAdmin.from("assignments").insert(rest).select().single());
  }
  if (error) {
    return NextResponse.json({ error: "Couldn't assign that activity. Try again, or contact support if it keeps happening." }, { status: 500 });
  }
  return NextResponse.json({ assignment: data, dropped });
}
