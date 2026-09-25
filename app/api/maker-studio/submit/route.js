import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { getMakerStudioCase } from "../../../../lib/cases/maker-studio/catalog";
import {
  gradeMakerWall,
  gradeMakerStudio,
  makerExhibitText,
} from "../../../../lib/cases/maker-studio/index.server";

async function awardCrystals(studentId, amount) {
  if (!amount) return;
  try {
    await supabaseAdmin.rpc("increment_crystal_points", {
      p_student_id: studentId,
      p_amount: amount,
    });
  } catch (err) {
    // a missed reward is never worth failing the turn-in over
  }
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
    .select("id, class_id, case_standard")
    .eq("id", assignmentId)
    .single();
  if (!student || !assignment || assignment.class_id !== student.class_id) {
    return NextResponse.json({ error: "That assignment is not yours." }, { status: 403 });
  }

  const exhibit = getMakerStudioCase(assignment.case_standard);
  if (!exhibit) return NextResponse.json({ error: "That case isn't wired up yet." }, { status: 404 });

  const { data: existing } = await supabaseAdmin
    .from("submissions")
    .select("id, maker_studio_data, submitted_at, revision_requested")
    .eq("assignment_id", assignmentId)
    .eq("student_id", studentId)
    .maybeSingle();

  const prior = (existing && existing.maker_studio_data) || {};
  const kind = body.kind || "save";

  // Autosave hall / title / color / draft wall (never grades)
  if (kind === "save") {
    const payload = {
      ...prior,
      hallId: body.hallId || prior.hallId || null,
      wallColor: body.wallColor || prior.wallColor || null,
      exhibitTitle: body.exhibitTitle || prior.exhibitTitle || "",
      wall: Array.isArray(body.wall) ? body.wall : prior.wall || [],
      bin: body.bin ?? prior.bin ?? null,
      reason: body.reason ?? prior.reason ?? null,
      placards: body.placards || prior.placards || {},
      plaque: body.plaque ?? prior.plaque ?? "",
      confidence: body.confidence ?? prior.confidence ?? null,
      openedCards: body.openedCards || prior.openedCards || [],
      checkAttempts: prior.checkAttempts || 0,
      savedAt: new Date().toISOString(),
    };
    const row = { maker_studio_data: payload };
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

  // Wall check (attempt 1 or 2) — bounce wrong pieces with one-line reasons
  if (kind === "check") {
    const need = exhibit.wallSize || 4;
    const filled = (Array.isArray(body.wall) ? body.wall : []).filter(Boolean);
    if (filled.length !== need || !body.bin || !body.reason) {
      return NextResponse.json({
        need: "wall",
        message: `Fill all ${need} spots, put one card in Not in this exhibit, and pick a reason.`,
      });
    }
    const graded = gradeMakerWall(assignment.case_standard, body);
    const attempts = (prior.checkAttempts || 0) + 1;
    const forceStrongest = attempts >= 2 && graded.bounce.length > 0;
    const payload = {
      ...prior,
      hallId: body.hallId || prior.hallId,
      wallColor: body.wallColor || prior.wallColor,
      exhibitTitle: body.exhibitTitle || prior.exhibitTitle || "",
      wall: forceStrongest ? graded.strongest : body.wall,
      bin: body.bin,
      reason: body.reason,
      checkAttempts: attempts,
      lastCheck: {
        wallLevel: graded.wallLevel,
        wallNote: graded.wallNote,
        bounce: graded.bounce,
        rejectNote: graded.rejectNote,
        mythBuster: graded.mythBuster,
        forced: forceStrongest,
      },
      savedAt: new Date().toISOString(),
    };
    const row = { maker_studio_data: payload };
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
      wallLevel: graded.wallLevel,
      wallNote: graded.wallNote,
      bounce: graded.bounce,
      rejectOk: graded.rejectOk,
      rejectNote: graded.rejectNote,
      mythBuster: graded.mythBuster,
      checkAttempts: attempts,
      forced: forceStrongest,
      wall: payload.wall,
      strongest: graded.strongest,
    });
  }

  // Final turn-in
  if (kind === "turnin") {
    const need = exhibit.wallSize || 4;
    const filled = (Array.isArray(body.wall) ? body.wall : []).filter(Boolean);
    if (filled.length !== need || !body.bin || !body.reason) {
      return NextResponse.json({ need: "wall" });
    }
    if (!(prior.checkAttempts > 0 || body.checkAttempts > 0)) {
      return NextResponse.json({ need: "check", message: "Check the wall before you turn it in." });
    }

    const graded = gradeMakerStudio(assignment.case_standard, body);
    const exhibitText = makerExhibitText(assignment.case_standard, body, graded);
    const writeBack =
      graded.level >= 2
        ? exhibit.writeBack.strong
        : graded.level === 1
          ? exhibit.writeBack.middle
          : exhibit.writeBack.rough;

    const payload = {
      hallId: body.hallId || prior.hallId,
      wallColor: body.wallColor || prior.wallColor,
      exhibitTitle: body.exhibitTitle || prior.exhibitTitle || exhibit.title,
      wall: body.wall,
      bin: body.bin,
      reason: body.reason,
      placards: body.placards || {},
      plaque: body.plaque || "",
      confidence: body.confidence || null,
      openedCards: body.openedCards || prior.openedCards || [],
      checkAttempts: Math.max(prior.checkAttempts || 0, body.checkAttempts || 0),
      wallLevel: graded.wallLevel,
      wallNote: graded.wallNote,
      mythBuster: graded.mythBuster,
      level: graded.level,
      writeBack,
      title: exhibit.title,
      savedAt: new Date().toISOString(),
    };

    const turningIn = true;
    const already = !!(existing && existing.submitted_at) && !existing.revision_requested;
    const row = {
      maker_studio_data: payload,
      attempt1: exhibitText,
      ai_score: graded.level,
      ai_rationale: `Maker Studio. Wall ${graded.wallLevel}. Suggested level ${graded.level}. The teacher releases the grade.`,
      submitted_at: already ? existing.submitted_at : new Date().toISOString(),
      revision_requested: false,
      self_confidence: body.confidence || null,
    };

    if (existing) await supabaseAdmin.from("submissions").update(row).eq("id", existing.id);
    else {
      await supabaseAdmin.from("submissions").insert({
        assignment_id: assignmentId,
        student_id: studentId,
        ...row,
      });
    }

    let crystals = 0;
    if (!already) {
      crystals = 3 + (graded.mythBuster ? 1 : 0);
      await awardCrystals(studentId, crystals);
    }

    return NextResponse.json({
      ok: true,
      done: turningIn,
      crystals,
      level: graded.level,
      writeBack,
      wallNote: graded.wallNote,
      mythBuster: graded.mythBuster,
    });
  }

  return NextResponse.json({ error: "Unknown action." }, { status: 400 });
}
