"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../lib/supabaseClient";
import TeacherSidebar from "../../../components/TeacherSidebar";
import TeacherPageBanner from "../../../components/TeacherPageBanner";

const COLORS = {
  canvas: "#F2F0FA",
  white: "#FFFFFF",
  violet: "#7B5DFF",
  violetSoft: "#EDE6FF",
  teal: "#00C2C7",
  gold: "#FFC44D",
  border: "#E1E2EE",
  textDark: "#1F2A44",
  textMuted: "#697386",
  success: "#22C55E",
  warning: "#FF9F43",
};

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
    } else {
      setRawStudents([]);
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

  if (loadingAuth || loading) {
    return <div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", color: COLORS.textMuted }}>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: COLORS.canvas, fontFamily: "'Inter', sans-serif", color: COLORS.textDark }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
        .gc-btn { transition: transform 150ms ease; cursor: pointer; border: none; font-family: 'Inter', sans-serif; }
        .gc-btn:hover { transform: translateY(-1px); }
        .gc-fade-in { animation: gcFadeIn 220ms ease-out; }
        @keyframes gcFadeIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
      `}</style>

      <TeacherSidebar teacherEmail={teacherEmail} />

      <main style={{ flex: 1, padding: "32px 36px", maxWidth: 900, margin: "0 auto" }}>
        <TeacherPageBanner style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ maxWidth: "58%" }}>
              <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 28, margin: "0 0 4px 0" }}>Badges & Rewards</h1>
              <p style={{ margin: 0, color: COLORS.textMuted, fontSize: 14 }}>Rename a tier or change how many Crystal Points it takes to reach it — students see these on their Home screen.</p>
            </div>
            <button onClick={() => setAwardModalOpen(true)} disabled={classes.length === 0} className="gc-btn" style={{ background: COLORS.violet, color: COLORS.white, borderRadius: 999, padding: "11px 20px", fontWeight: 700, fontSize: 13.5, opacity: classes.length === 0 ? 0.5 : 1, whiteSpace: "nowrap" }}>
              🔮 Award Crystal Points
            </button>
          </div>
        </TeacherPageBanner>

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

        <div style={{ background: COLORS.white, borderRadius: 16, boxShadow: "0 4px 16px rgba(13,27,42,.06)", overflow: "hidden" }}>
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
                    style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: `1.5px solid ${COLORS.border}`, fontSize: 13.5, fontFamily: "inherit", boxSizing: "border-box" }}
                  />
                </div>
                <div style={{ width: 160 }}>
                  <label style={{ display: "block", fontSize: 10.5, fontWeight: 700, color: COLORS.textMuted, textTransform: "uppercase", letterSpacing: 0.4, marginBottom: 4 }}>Points Needed</label>
                  <input
                    type="number"
                    min={0}
                    value={draft.threshold}
                    onChange={(e) => updateDraft(tier.id, "threshold", e.target.value)}
                    style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: `1.5px solid ${COLORS.border}`, fontSize: 13.5, fontFamily: "inherit", boxSizing: "border-box" }}
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
                    background: status === "saved" ? "#E9F9EE" : status === "error" ? "#FBEAEA" : COLORS.violetSoft,
                    color: status === "saved" ? COLORS.success : status === "error" ? "#B23A3A" : COLORS.violet,
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
