import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import {
  getBroadcastBoothCase,
  resolveBroadcastConfig,
  labeledBeats,
  CLIP_CAP_SEC,
  MIN_CLIP_SEC,
  normalizeBrainstormMap,
  brainstormMeetsMinimum,
} from "../../../../lib/cases/broadcast-booth/catalog";
import {
  emptyBeatSlot,
  broadcastAttemptText,
  summarizeBroadcast,
  scanSafetyText,
} from "../../../../lib/cases/broadcast-booth/index.server";
import { reflectionFrom, withFirstTry } from "../../../../lib/reflection";
import { readStudentId } from "../../../../lib/studentSession";

function normalizeBeats(raw, beatDefs) {
  const incoming = raw && typeof raw === "object" ? raw : {};
  const out = {};
  for (const b of beatDefs) {
    const slot = incoming[b.id];
    const base = emptyBeatSlot();
    if (slot && typeof slot === "object") {
      const durationSec = Math.min(
        CLIP_CAP_SEC,
        Math.max(0, Math.round(Number(slot.durationSec) || 0))
      );
      const hasAudio = !!(slot.audioDataUrl && String(slot.audioDataUrl).startsWith("data:"));
      const status =
        slot.status === "done" && hasAudio
          ? "done"
          : hasAudio
            ? "in_progress"
            : "empty";
      out[b.id] = {
        ...base,
        status,
        audioDataUrl: hasAudio ? slot.audioDataUrl : null,
        mimeType: hasAudio ? slot.mimeType || "audio/webm" : null,
        durationSec: hasAudio ? durationSec : 0,
        stillDataUrl:
          slot.stillDataUrl && String(slot.stillDataUrl).startsWith("data:")
            ? slot.stillDataUrl
            : null,
        transcript: typeof slot.transcript === "string" ? slot.transcript.slice(0, 4000) : "",
        updatedAt: slot.updatedAt || (hasAudio ? new Date().toISOString() : null),
      };
    } else {
      out[b.id] = base;
    }
  }
  return out;
}

export async function POST(request) {
  const studentId = readStudentId();
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
    .select("id, class_id, case_standard")
    .eq("id", assignmentId)
    .single();
  if (!student || !assignment || assignment.class_id !== student.class_id) {
    return NextResponse.json({ error: "That assignment is not yours." }, { status: 403 });
  }

  const caseRow = getBroadcastBoothCase(assignment.case_standard);
  const config = resolveBroadcastConfig(assignment.case_standard, null);
  const beatDefs = labeledBeats(caseRow || { segmentType: config.segmentType, ...config }, config);

  const { data: existing } = await supabaseAdmin
    .from("submissions")
    .select("id, broadcast_booth_data, attempt1, submitted_at, revision_requested")
    .eq("assignment_id", assignmentId)
    .eq("student_id", studentId)
    .maybeSingle();

  const prior = (existing && existing.broadcast_booth_data) || {};
  const kind = body.kind || "save";

  if (existing && existing.submitted_at && !existing.revision_requested && kind !== "save") {
    return NextResponse.json({ error: "Already submitted." }, { status: 400 });
  }

  const beats = normalizeBeats(
    body.beats && typeof body.beats === "object" ? body.beats : prior.beats,
    beatDefs
  );
  const stimulusReady = body.stimulusReady !== undefined ? !!body.stimulusReady : !!prior.stimulusReady;
  const brainstormMap = normalizeBrainstormMap(
    body.brainstormMap !== undefined ? body.brainstormMap : prior.brainstormMap,
    beatDefs
  );
  const mapOk = brainstormMeetsMinimum(brainstormMap, caseRow || { segmentType: config.segmentType }, beatDefs);
  let brainstormReady =
    body.brainstormReady !== undefined ? !!body.brainstormReady : !!prior.brainstormReady;
  // Never mark ready if map no longer meets minimum
  if (!mapOk) brainstormReady = false;

  const currentBeatIndex = Math.max(
    0,
    Math.min(beatDefs.length - 1, Number(body.currentBeatIndex ?? prior.currentBeatIndex ?? 0) || 0)
  );

  const payloadBase = {
    version: 1,
    segmentType: config.segmentType,
    config,
    stimulusReady,
    brainstormReady,
    brainstormMap,
    currentBeatIndex,
    beats,
    savedAt: new Date().toISOString(),
  };

  if (kind === "save") {
    const payload = {
      ...payloadBase,
      safety: prior.safety || { flagged: false, hits: [] },
      teacherLevel: prior.teacherLevel || null,
    };
    const row = { broadcast_booth_data: payload };
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
    const reflection = reflectionFrom(body);
    if (reflection.error) return NextResponse.json({ need: "reflect", error: reflection.error }, { status: 400 });
    const summary = summarizeBroadcast(payloadBase, caseRow || { segmentType: config.segmentType });
    if (!summary.stimulusReady) {
      return NextResponse.json({
        need: "stimulus",
        message: "Read the field notes and tap I’m ready before you submit.",
      });
    }
    if (!brainstormReady || !mapOk) {
      return NextResponse.json({
        need: "brainstorm",
        message: "Add ideas to Big idea and Show me before you submit.",
      });
    }
    if (!summary.complete) {
      return NextResponse.json({
        need: "beats",
        message: `Record all ${summary.total} beats before you submit. You have ${summary.doneCount}/${summary.total}.`,
      });
    }
    // Soft validation for required stills — warn but allow (Wave 0 soft)
    const softMissing = summary.missingStills || [];

    // Safety stub: keyword scan on transcripts
    const allText = Object.values(beats)
      .map((s) => (s && s.transcript) || "")
      .join("\n");
    const safety = scanSafetyText(allText);

    const keep = !!(existing && (existing.revision_requested || existing.submitted_at));
    const payload = withFirstTry({
      ...payloadBase,
      softMissingStills: softMissing,
      safety,
      teacherLevel: prior.teacherLevel || null,
      turnedInAt: new Date().toISOString(),
    }, prior, existing && existing.attempt1, keep);
    const attempt = broadcastAttemptText(payload, caseRow || { segmentType: config.segmentType, ...config });
    const row = {
      broadcast_booth_data: payload,
      attempt1: attempt || "(Broadcast Booth voice submission)",
      attempt2: attempt || "(Broadcast Booth voice submission)",
      submitted_at: new Date().toISOString(),
      checklist: reflection.checklist,
      self_confidence: reflection.self_confidence,
      revision_requested: false,
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
    return NextResponse.json({
      ok: true,
      data: payload,
      softMissingStills: softMissing,
      safety,
    });
  }

  return NextResponse.json({ error: "Unknown kind." }, { status: 400 });
}
