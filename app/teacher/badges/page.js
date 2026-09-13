"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import TeacherHUD from "../../../components/TeacherHUD";
import { COLORS, PAGE_ACCENTS, PAGE_BACKGROUNDS, panelStyle } from "../../../lib/teacherTheme";

// Sept 13 — moved to the console-interior look. TeacherSidebar +
// TeacherPageBanner swapped for TeacherHUD; the flat opaque-white tier list
// card became the shared panelStyle glass card; this page's own green
// ACCENT (Resources' family — badges live under that same Overview
// landmark) replaced decorative violet on the tier list's default "Save"
// state. No dedicated background art exists yet, so it falls back to the
// plain canvas wash like Resources/Messages before their art arrived.
//
// Left deliberately violet, same principle as every other page in this
// redesign (a page's own accent never doubles as a different meaningful
// signal): everything in the Award Crystal Points flow (the header button,
// the modal's title/mode toggle/Award button). Crystal Points are the
// app's currency — violet is their brand color everywhere else they show
// up (the counter on a student's Home screen, etc.) — so this page's own
// green branding shouldn't bleed into that, the same way Distress Call
// stays violet on Challenge Library regardless of that page's pink accent.
//
// Sept 13, later same day — badges now gate on missions completed instead
// of Crystal Points, Emily's own longstanding plan (see app/badges/page.js's
// history) finally landing: bonus point awards were diluting points as a
// "real effort" signal, whereas "finished 12 missions" is a cleaner one.
// Same exact "missions completed" definition used everywhere else this
// already changed (Home, My Progress, Crystal Vault, Gear Locker, the
// teacher's own student report) — a real, final submission
// (`submitted_at IS NOT NULL`), nothing about grading or release status.
// The `threshold` column itself is untouched (still just "the number a
// tier needs to reach") — only what it's compared against changed, so
// renamed the field here from "Points Needed" to "Missions Needed."
// IMPORTANT: the actual numbers already saved in each tier's threshold are
// whatever Emily set them to as POINT values before this change — those
// will read as absurd mission counts (e.g. "500 missions") until she
// updates each one through the now-relabeled fields below to something
// that makes sense as a mission count.
//
// Also added, same pass: a roster standing section so a teacher can
// actually see where their students sit relative to the tiers, instead of
// this page only being able to edit the tiers themselves.
const ACCENT = PAGE_ACCENTS["/teacher/badges"];
const BG = PAGE_BACKGROUNDS["/teacher/badges"];

const POINT_PRESETS = [5, 10, 25, 50];

function AwardPointsModal({ open, classes, rawStudents, awarding, onCancel, onAward }) {
  const [classId, setClassId] = useState((classes[0] && classes[0].id) || "");
  const [mode, setMode] = useState("class"); // "class" | "student"
  const [studentId, setStudentId] = useState("");
  const [amount, setAmount] = useState(10);

  useEffect(() => {
    if (open) {
      setClassId((classes[0] && classes[0].id) || "");
      setMode("class");
      setStudentId("");
      setAmount(10);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  const classStudents = rawStudents.filter((s) => s.class_id === classId);
  const selectedClass = classes.find((c) => c.id === classId);
  const canAward = amount > 0 && classId && (mode === "class" ? classStudents.length > 0 : !!studentId);

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(13,20,35,.65)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20 }}>
      <div style={{ background: COLORS.white, borderRadius: 18, width: "min(440px, 100%)", padding: 24, boxShadow: "0 24px 60px rgba(0,0,0,.4)" }}>
        <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 18, color: COLORS.textDark, marginBottom: 4 }}>🔮 Award Crystal Points</div>
        <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 18 }}>Give a class or a single student a bonus — great for a great question, a kind classmate moment, or anything else that doesn't fit a rubric.</div>

        <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: COLORS.textMuted, marginBottom: 6 }}>Class</label>
        <select value={classId} onChange={(e) => { setClassId(e.target.value); setStudentId(""); }} style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${COLORS.border}`, fontSize: 13.5, marginBottom: 14, fontFamily: "inherit" }}>
          {classes.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>

        <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
          <button type="button" className="gc-btn" onClick={() => setMode("class")} style={{ flex: 1, padding: "9px 8px", borderRadius: 10, fontWeight: 700, fontSize: 13, background: mode === "class" ? COLORS.violet : COLORS.canvas, color: mode === "class" ? COLORS.white : COLORS.textDark }}>
            Whole Class{selectedClass ? ` (${classStudents.length})` : ""}
          </button>
          <button type="button" className="gc-btn" onClick={() => setMode("student")} style={{ flex: 1, padding: "9px 8px", borderRadius: 10, fontWeight: 700, fontSize: 13, background: mode === "student" ? COLORS.violet : COLORS.canvas, color: mode === "student" ? COLORS.white : COLORS.textDark }}>
            One Student
          </button>
        </div>

        {mode === "student" && (
          <select value={studentId} onChange={(e) => setStudentId(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${COLORS.border}`, fontSize: 13.5, marginBottom: 14, fontFamily: "inherit" }}>
            <option value="">Choose a student...</option>
            {classStudents.map((s) => <option key={s.id} value={s.id}>{s.first_name}</option>)}
          </select>
        )}

        <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: COLORS.textMuted, marginBottom: 6 }}>Points</label>
        <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
          {POINT_PRESETS.map((p) => (
            <button key={p} type="button" className="gc-btn" onClick={() => setAmount(p)} style={{ flex: 1, padding: "9px 4px", borderRadius: 10, fontWeight: 700, fontSize: 13, background: amount === p ? COLORS.gold : COLORS.canvas, color: COLORS.textDark }}>
              +{p}
            </button>
          ))}
        </div>
        <input
          type="number"
          min={1}
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value, 10) || 0)}
          style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${COLORS.border}`, fontSize: 13.5, marginBottom: 18, fontFamily: "inherit", boxSizing: "border-box" }}
        />

        <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
          <button onClick={onCancel} className="gc-btn" style={{ background: COLORS.canvas, color: COLORS.textDark, borderRadius: 999, padding: "11px 20px", fontWeight: 700, fontSize: 13.5 }}>Cancel</button>
          <button
            onClick={() => onAward({ classId, mode, studentId, amount, studentCount: classStudents.length })}
            disabled={!canAward || awarding}
            className="gc-btn"
            style={{ background: COLORS.violet, color: COLORS.white, borderRadius: 999, padding: "11px 20px", fontWeight: 700, fontSize: 13.5, opacity: canAward ? 1 : 0.5 }}
          >
            {awarding ? "Awarding..." : `Award +${amount}`}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BadgesRewardsPage() {
  const router = useRouter();
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [loading, setLoading] = useState(true);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [teacherId, setTeacherId] = useState(null);
  const [error, setError] = useState(null);

  const [tiers, setTiers] = useState([]);
  const [drafts, setDrafts] = useState({});
  const [rowStatus, setRowStatus] = useState({});

  const [classes, setClasses] = useState([]);
  const [rawStudents, setRawStudents] = useState([]);
  const [missionsByStudent, setMissionsByStudent] = useState({});
  const [awardModalOpen, setAwardModalOpen] = useState(false);
  const [awarding, setAwarding] = useState(false);
  const [awardSuccess, setAwardSuccess] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error: authError }) => {
      if (authError || !data?.user) {
        router.push("/login");
        return;
      }
      setTeacherEmail(data.user.email || "");
      setTeacherId(data.user.id);
      setLoadingAuth(false);
    });
  }, [router]);

  const loadData = useCallback(async (teacherId) => {
    setLoading(true);
    setError(null);

    const { data: tierRows, error: tierError } = await supabase
      .from("badge_tiers")
      .select("*")
      .order("sort_order");

    if (tierError) {
      setError("Couldn't load badge tiers: " + tierError.message);
    } else {
      const list = tierRows || [];
      setTiers(list);
      setDrafts(Object.fromEntries(list.map((t) => [t.id, { label: t.label, threshold: String(t.threshold) }])));
    }

    const { data: classesData } = await supabase.from("classes").select("id, name").eq("teacher_id", teacherId).order("name");
    setClasses(classesData || []);
    const classIds = (classesData || []).map((c) => c.id);
    if (classIds.length > 0) {
      const { data } = await supabase.from("students").select("id, first_name, class_id").in("class_id", classIds);
      setRawStudents(data || []);

      // Roster standing section below — same "missions completed" count
      // used everywhere else this changed (a real, final submission,
      // regardless of grading/release status), computed the same way
      // Student Progress computes it: assignments for these classes, then
      // submissions against those assignments, counted per student.
      const studentIds = (data || []).map((s) => s.id);
      if (studentIds.length > 0) {
        const { data: assignmentRows } = await supabase.from("assignments").select("id").in("class_id", classIds);
        const assignmentIds = (assignmentRows || []).map((a) => a.id);
        if (assignmentIds.length > 0) {
          const { data: subRows } = await supabase
            .from("submissions")
            .select("student_id")
            .in("assignment_id", assignmentIds)
            .in("student_id", studentIds)
            .not("submitted_at", "is", null);
          const counts = {};
          (subRows || []).forEach((s) => { counts[s.student_id] = (counts[s.student_id] || 0) + 1; });
          setMissionsByStudent(counts);
        } else {
          setMissionsByStudent({});
        }
      } else {
        setMissionsByStudent({});
      }
    } else {
      setRawStudents([]);
      setMissionsByStudent({});
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loadingAuth && teacherId) loadData(teacherId);
  }, [loadingAuth, teacherId, loadData]);

  function updateDraft(tierId, field, value) {
    setDrafts((d) => ({ ...d, [tierId]: { ...d[tierId], [field]: value } }));
  }

  async function saveTier(tier) {
    const draft = drafts[tier.id] || {};
    const label = (draft.label || "").trim();
    const threshold = parseInt(draft.threshold, 10);

    if (!label || isNaN(threshold) || threshold < 0) {
      setRowStatus((s) => ({ ...s, [tier.id]: "error" }));
      return;
    }

    setRowStatus((s) => ({ ...s, [tier.id]: "saving" }));
    const { data, error: updateError } = await supabase
      .from("badge_tiers")
      .update({ label, threshold })
      .eq("id", tier.id)
      .select();

    if (updateError || !data || data.length === 0) {
      setRowStatus((s) => ({ ...s, [tier.id]: "error" }));
      return;
    }

    setTiers((prev) => prev.map((t) => (t.id === tier.id ? { ...t, label, threshold } : t)));
    setRowStatus((s) => ({ ...s, [tier.id]: "saved" }));
    setTimeout(() => setRowStatus((s) => ({ ...s, [tier.id]: null })), 2500);
  }

  async function handleAwardPoints({ classId, mode, studentId, amount, studentCount }) {
    setAwarding(true);
    const targetIds = mode === "student" ? [studentId] : rawStudents.filter((s) => s.class_id === classId).map((s) => s.id);

    // Same increment_crystal_points() function used everywhere else points
    // get awarded — one RPC call per student so this can't race with itself.
    await Promise.all(targetIds.map((id) => supabase.rpc("increment_crystal_points", { p_student_id: id, p_amount: amount })));

    setAwarding(false);
    setAwardModalOpen(false);
    const className = classes.find((c) => c.id === classId)?.name || "the class";
    setAwardSuccess(mode === "student" ? `+${amount} points awarded!` : `+${amount} points awarded to all ${targetIds.length} students in ${className}!`);
    setTimeout(() => setAwardSuccess(null), 4000);
  }

  // A light heads-up, not a hard block — thresholds should climb from top
  // to bottom to match the order badges show on a student's Home screen.
  // Using the LIVE draft values (not saved ones) so this updates as the
  // teacher types, before they've even hit Save.
  let thresholdsOutOfOrder = false;
  for (let i = 1; i < tiers.length; i++) {
    const prevVal = parseInt((drafts[tiers[i - 1].id] || {}).threshold, 10);
    const curVal = parseInt((drafts[tiers[i].id] || {}).threshold, 10);
    if (!isNaN(prevVal) && !isNaN(curVal) && curVal <= prevVal) {
      thresholdsOutOfOrder = true;
      break;
    }
  }

  // Roster standing — same current-tier/next-tier math as Home, My
  // Progress, Crystal Vault, and the student report, using each tier's
  // SAVED threshold (not the live draft above — a student's actual
  // standing shouldn't shift while a teacher is mid-edit and hasn't hit
  // Save yet).
  function standingFor(missionsCompleted) {
    if (tiers.length === 0) return { currentTier: null, nextTier: null, missionsToNext: 0 };
    const currentTierIndex = [...tiers].reverse().findIndex((t) => missionsCompleted >= t.threshold);
    const currentTier = currentTierIndex >= 0 ? tiers[tiers.length - 1 - currentTierIndex] : null;
    const currentPos = currentTier ? tiers.findIndex((t) => t.id === currentTier.id) : -1;
    const nextTier = currentPos >= 0 && currentPos + 1 < tiers.length ? tiers[currentPos + 1] : tiers[0].threshold > missionsCompleted ? tiers[0] : null;
    const missionsToNext = nextTier ? Math.max(0, nextTier.threshold - missionsCompleted) : 0;
    return { currentTier, nextTier, missionsToNext };
  }

  if (loadingAuth || loading) {
    return <div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", color: COLORS.textMuted }}>Loading...</div>;
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.canvas,
        backgroundImage: BG ? `linear-gradient(180deg, rgba(243,239,252,.55) 0%, rgba(243,239,252,.82) 100%), url(${BG})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center top",
        backgroundAttachment: "fixed",
        fontFamily: "'Inter', sans-serif",
        color: COLORS.textDark,
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .gc-btn { transition: transform 150ms ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .gc-btn:hover { transform: translateY(-1px); }
        .gc-fade-in { animation: gcFadeIn 220ms ease-out; }
        @keyframes gcFadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
      `}</style>

      <TeacherHUD title="Badges & Rewards" subtitle="Resources — missions, badge tiers, and Crystal Points" accent={ACCENT} teacherEmail={teacherEmail} />

      <main style={{ padding: "28px 36px 40px", maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
          <div style={{ maxWidth: "58%" }}>
            <p style={{ margin: 0, color: COLORS.textMuted, fontSize: 14 }}>Rename a tier or change how many missions it takes to reach it — students see these on their Home screen.</p>
          </div>
          <button onClick={() => setAwardModalOpen(true)} disabled={classes.length === 0} className="gc-btn" style={{ background: COLORS.violet, color: COLORS.white, borderRadius: 999, padding: "11px 20px", fontWeight: 700, fontSize: 13.5, opacity: classes.length === 0 ? 0.5 : 1, whiteSpace: "nowrap" }}>
            🔮 Award Crystal Points
          </button>
        </div>

        {error && (
          <div style={{ background: "#FBEAEA", color: "#B23A3A", borderRadius: 10, padding: "10px 14px", fontSize: 13, marginBottom: 16 }}>
            {error}
          </div>
        )}

        {thresholdsOutOfOrder && (
          <div style={{ background: "#FFF4E5", color: "#8A5A00", borderRadius: 10, padding: "10px 14px", fontSize: 12.5, marginBottom: 16 }}>
            Heads up — these thresholds aren't climbing from top to bottom anymore. That can make the "current tier" shown on a student's Home screen look off.
          </div>
        )}

        <div style={{ ...panelStyle(ACCENT, { overflow: "hidden" }) }}>
          {tiers.map((tier, i) => {
            const draft = drafts[tier.id] || { label: tier.label, threshold: String(tier.threshold) };
            const status = rowStatus[tier.id];
            return (
              <div key={tier.id} style={{ display: "flex", alignItems: "center", gap: 16, padding: "16px 20px", borderBottom: i < tiers.length - 1 ? `1px solid ${COLORS.border}` : "none" }}>
                <img src={tier.image_path} alt="" style={{ width: 48, height: 48, objectFit: "contain", borderRadius: 10, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", fontSize: 10.5, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 4 }}>Tier Name</label>
                  <input
                    value={draft.label}
                    onChange={(e) => updateDraft(tier.id, "label", e.target.value)}
                    style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: `1.5px solid ${COLORS.border}`, fontSize: 13.5, fontFamily: "inherit", boxSizing: "border-box", background: "rgba(255,255,255,.7)", color: COLORS.textDark }}
                  />
                </div>
                <div style={{ width: 160 }}>
                  <label style={{ display: "block", fontSize: 10.5, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 4 }}>Missions Needed</label>
                  <input
                    type="number"
                    min={0}
                    value={draft.threshold}
                    onChange={(e) => updateDraft(tier.id, "threshold", e.target.value)}
                    style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: `1.5px solid ${COLORS.border}`, fontSize: 13.5, fontFamily: "inherit", boxSizing: "border-box", background: "rgba(255,255,255,.7)", color: COLORS.textDark }}
                  />
                </div>
                <button
                  className="gc-btn"
                  onClick={() => saveTier(tier)}
                  disabled={status === "saving"}
                  style={{
                    minWidth: 78,
                    padding: "9px 14px",
                    borderRadius: 999,
                    fontWeight: 700,
                    fontSize: 12.5,
                    background: status === "saved" ? "#E9F9EE" : status === "error" ? "#FBEAEA" : `${ACCENT}1E`,
                    color: status === "saved" ? COLORS.success : status === "error" ? "#B23A3A" : ACCENT,
                  }}
                >
                  {status === "saving" ? "Saving..." : status === "saved" ? "✓ Saved" : status === "error" ? "Try again" : "Save"}
                </button>
              </div>
            );
          })}
          {tiers.length === 0 && !error && (
            <div style={{ padding: "32px 20px", textAlign: "center", color: COLORS.textMuted, fontSize: 13.5 }}>
              No badge tiers found yet — ask Claude to double check the database setup.
            </div>
          )}
        </div>

        {classes.length > 0 && tiers.length > 0 && (
          <div style={{ marginTop: 28 }}>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16, margin: "0 0 4px 4px", color: COLORS.textDark }}>Roster Standing</h2>
            <p style={{ margin: "0 0 14px 4px", color: COLORS.textMuted, fontSize: 12.5 }}>Where each student sits right now, based on missions completed.</p>
            {classes.map((cls) => {
              const studentsInClass = rawStudents.filter((s) => s.class_id === cls.id).sort((a, b) => a.first_name.localeCompare(b.first_name));
              if (studentsInClass.length === 0) return null;
              return (
                <div key={cls.id} style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.textMuted, margin: "0 0 8px 4px" }}>{cls.name}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 10 }}>
                    {studentsInClass.map((s) => {
                      const missionsCompleted = missionsByStudent[s.id] || 0;
                      const { currentTier, nextTier, missionsToNext } = standingFor(missionsCompleted);
                      return (
                        <div key={s.id} style={{ ...panelStyle(ACCENT, { padding: 12, display: "flex", gap: 10, alignItems: "center" }) }}>
                          {currentTier ? (
                            <img
                              src={`/badges/transparent/${currentTier.tier_key}.png`}
                              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = currentTier.image_path; }}
                              alt={currentTier.label}
                              style={{ width: 36, height: 36, objectFit: "contain", flexShrink: 0 }}
                            />
                          ) : (
                            <div style={{ width: 36, height: 36, borderRadius: "50%", background: `${ACCENT}18`, flexShrink: 0 }} />
                          )}
                          <div style={{ minWidth: 0, flex: 1 }}>
                            <div style={{ fontWeight: 700, fontSize: 13, color: COLORS.textDark, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.first_name}</div>
                            <div style={{ fontSize: 11, color: COLORS.textMuted }}>{missionsCompleted} mission{missionsCompleted === 1 ? "" : "s"}{currentTier ? ` · ${currentTier.label}` : ""}</div>
                            {nextTier && (
                              <div style={{ fontSize: 10.5, color: ACCENT, marginTop: 1 }}>{missionsToNext} more to {nextTier.label}</div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {awardSuccess && (
        <div className="gc-fade-in" style={{ position: "fixed", bottom: 28, right: 28, background: COLORS.textDark, color: COLORS.white, borderRadius: 12, padding: "14px 20px", fontWeight: 700, fontSize: 13.5, boxShadow: "0 8px 24px rgba(0,0,0,.25)", zIndex: 200 }}>
          🔮 {awardSuccess}
        </div>
      )}

      <AwardPointsModal
        open={awardModalOpen}
        classes={classes}
        rawStudents={rawStudents}
        awarding={awarding}
        onCancel={() => setAwardModalOpen(false)}
        onAward={handleAwardPoints}
      />
    </div>
  );
}
