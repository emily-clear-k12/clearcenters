import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { getMakerStudioCase, resolveMakerConfig } from "../../../../lib/cases/maker-studio/catalog";
import { makerAttemptText, summarizeMakerPieces } from "../../../../lib/cases/maker-studio/index.server";
import { sanitizeEnabledModes } from "../../../../lib/cases/maker-studio/modes";

function normalizeModes(raw, writeText) {
  const modes = raw && typeof raw === "object" ? { ...raw } : {};
  if (typeof writeText === "string") {
    const prev = modes.write || {};
    const status =
      prev.status === "done" && writeText.trim()
        ? "done"
        : writeText.trim()
          ? prev.status === "done"
            ? "done"
            : "in_progress"
          : "empty";
    modes.write = {
      status,
      text: writeText,
      updatedAt: new Date().toISOString(),
    };
  }
  // Drop legacy exhibit fields if a student somehow still has them.
  return modes;
}

export async function POST(request) {
  const studentId = cookies().get("cc_student_id")?.value;
  if (!studentId) return NextResponse.json({ error: "Not logged in." }, { status: 401 });

  const body = await request.json().catch(() => ({}));
  const assignmentId = body.assignmentId;
  if (!assignmentId) return NextResponse.json({ error: "Missing the assignment." }, { status: 400 });

  const { data: student } = await supabaseAdmin
    .from("students")
    .select("id, class_id")
    .eq("id", studentId)
    .single();
  const { data: assignment } = await supabaseAdmin
    .from("assignments")
    .select("id, class_id, case_standard, maker_studio_config")
    .eq("id", assignmentId)
    .single();
  if (!student || !assignment || assignment.class_id !== student.class_id) {
    return NextResponse.json({ error: "That assignment is not yours." }, { status: 403 });
  }

  // Config can come from assignment JSON even if the case file is missing
  // (teacher-built Quick Maker). Fall back to catalog when present.
  const caseRow = getMakerStudioCase(assignment.case_standard);
  const config = resolveMakerConfig(assignment.case_standard, assignment.maker_studio_config);
  if (!caseRow && !(assignment.maker_studio_config && assignment.maker_studio_config.prompt)) {
    // Still allow MS.QUICK-WRITE defaults from resolveMakerConfig
  }

  const { data: existing } = await supabaseAdmin
    .from("submissions")
    .select("id, maker_studio_data, submitted_at, revision_requested")
    .eq("assignment_id", assignmentId)
    .eq("student_id", studentId)
    .maybeSingle();

  const prior = (existing && existing.maker_studio_data) || {};
  // Ignore legacy exhibit payloads (version !== 2)
  const priorModes = prior.version === 2 ? prior.modes || {} : {};
  const kind = body.kind || "save";

  if (existing && existing.submitted_at && !existing.revision_requested && kind !== "save") {
    return NextResponse.json({ error: "Already submitted." }, { status: 400 });
  }

  const incomingModes = normalizeModes(
    body.modes && typeof body.modes === "object" ? body.modes : priorModes,
    typeof body.writeText === "string" ? body.writeText : undefined
  );

  // Keep only enabled mode slots + any prior enabled work
  const enabled = sanitizeEnabledModes(config.enabledModes);
  const modes = {};
  enabled.forEach((id) => {
    modes[id] = incomingModes[id] || priorModes[id] || { status: "empty", text: "", updatedAt: null };
  });

  if (kind === "save") {
    const payload = {
      version: 2,
      modes,
      journalKept: prior.journalKept === true,
      teacherLevel: prior.teacherLevel || null,
      savedAt: new Date().toISOString(),
    };
    const row = { maker_studio_data: payload };
    // Draft autosaves must NOT set submitted_at
    if (existing) await supabaseAdmin.from("submissions").update(row).eq("id", existing.id);
    else {
      await supabaseAdmin.from("submissions").insert({
        assignment_id: assignmentId,
        student_id: studentId,
        ...row,
      });
    }
    return NextResponse.json({ ok: true, data: payload });
  }

  if (kind === "turnin") {
    const summary = summarizeMakerPieces({ modes }, config);
    if (summary.doneCount < summary.finishN) {
      return NextResponse.json({
        need: "finish",
        message: `Finish ${summary.finishN} mode${summary.finishN === 1 ? "" : "s"} before you submit. You have ${summary.doneCount} done.`,
      });
    }
    const payload = {
      version: 2,
      modes,
      journalKept: prior.journalKept === true,
      teacherLevel: prior.teacherLevel || null,
      turnedInAt: new Date().toISOString(),
      savedAt: new Date().toISOString(),
    };
    const attempt = makerAttemptText(payload, config);
    const row = {
      maker_studio_data: payload,
      attempt1: attempt,
      attempt2: attempt,
      submitted_at: new Date().toISOString(),
      revision_requested: false,
      // Teacher-reviewed — no AI score
      ai_score: null,
      ai_rationale: null,
    };
    if (existing) await supabaseAdmin.from("submissions").update(row).eq("id", existing.id);
    else {
      await supabaseAdmin.from("submissions").insert({
        assignment_id: assignmentId,
        student_id: studentId,
        ...row,
      });
    }
    return NextResponse.json({ ok: true, data: payload });
  }

  return NextResponse.json({ error: "Unknown action." }, { status: 400 });
}
