"use client";

import React, { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Maximize2, Minimize2, Radio } from "lucide-react";
import { supabase } from "../../../lib/supabaseClient";
import TeacherSidebar from "../../../components/TeacherSidebar";
import TeacherPageBanner from "../../../components/TeacherPageBanner";

const COLORS = {
  canvas: "#F2F0FA",
  white: "#FFFFFF",
  violet: "#8C52F2",
  violetSoft: "#EEE6FD",
  teal: "#6FD8F5",
  border: "#E1E2EE",
  textDark: "#1F2A44",
  textMuted: "#697386",
  navy: "#0D1B2A",
};

const POLL_MS = 4000;

// The Live Ops Board — a projector-facing screen a teacher displays to the
// class (§1, §5 of the Sept 7 design doc). Frequency Rush's Group Live
// modes will eventually project rounds here too, but those aren't built yet
// (week-1 scope is Individual Practice only) — for now this board only ever
// has Distress Call meters to show, one at a time, per the design doc's own
// rule: "only one thing displays on the physical board at a time."
function LiveOpsBoardContent() {
  const router = useRouter();
  // Supports being deep-linked straight to one signal — e.g. a "Project This"
  // button sitting on the assignment itself (My Classes, or right after
  // assigning) — via /teacher/live-ops-board?assignmentId=<id>, instead of
  // making a teacher land here and hunt for it in the picker chips.
  const searchParams = useSearchParams();
  const deepLinkedAssignmentId = searchParams.get("assignmentId");
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [teacherId, setTeacherId] = useState(null);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [accessToken, setAccessToken] = useState(null);

  const [classesById, setClassesById] = useState({});
  const [signals, setSignals] = useState([]); // [{ assignmentId, label, className }]
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(deepLinkedAssignmentId || null);
  const [loadingSignals, setLoadingSignals] = useState(true);

  const [progress, setProgress] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const boardRef = useRef(null);

  // A plain-language explainer for a teacher who lands on this page cold —
  // clicked the sidebar link, or a "Project This" button, without having
  // seen a walkthrough of what Distress Call actually is. Closed by
  // default so it doesn't clutter the screen for teachers who already know,
  // but one click away. Not shown in fullscreen/projected mode — that view
  // is for the class, not a teacher-facing explanation.
  const [showExplainer, setShowExplainer] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error }) => {
      if (error || !data?.user) { router.push("/login"); return; }
      setTeacherId(data.user.id);
      setTeacherEmail(data.user.email || "");
      setLoadingAuth(false);
    });
    supabase.auth.getSession().then(({ data }) => setAccessToken(data?.session?.access_token || null));
  }, [router]);

  // Loads every Distress-Call-flagged assignment across this teacher's own
  // classes, direct from the client — same read pattern the Assign a Case
  // screen already uses for classes/cases, no admin route needed since this
  // is just listing which signals exist, not their (potentially
  // still-forming) submission data.
  useEffect(() => {
    if (!teacherId) return;
    (async () => {
      setLoadingSignals(true);
      const { data: classes } = await supabase.from("classes").select("id, name").eq("teacher_id", teacherId);
      const classMap = {};
      (classes || []).forEach((c) => { classMap[c.id] = c.name; });
      setClassesById(classMap);

      const classIds = (classes || []).map((c) => c.id);
      if (classIds.length === 0) {
        setSignals([]);
        setLoadingSignals(false);
        return;
      }

      const { data: assignments } = await supabase
        .from("assignments")
        .select("id, class_id, case_standard, distress_call_target, distress_call_deadline, created_at")
        .in("class_id", classIds)
        .eq("distress_call", true)
        .order("created_at", { ascending: false });

      const standards = [...new Set((assignments || []).map((a) => a.case_standard))];
      const { data: cases } = standards.length > 0
        ? await supabase.from("cases").select("standard, title").in("standard", standards)
        : { data: [] };
      const titleByStandard = {};
      (cases || []).forEach((c) => { titleByStandard[c.standard] = c.title; });

      const built = (assignments || []).map((a) => ({
        assignmentId: a.id,
        caseTitle: titleByStandard[a.case_standard] || a.case_standard,
        className: classMap[a.class_id] || "Unknown class",
        deadline: a.distress_call_deadline,
      }));

      setSignals(built);
      setSelectedAssignmentId((prev) => prev && built.some((s) => s.assignmentId === prev) ? prev : (built[0]?.assignmentId || null));
      setLoadingSignals(false);
    })();
  }, [teacherId]);

  const poll = useCallback(async () => {
    if (!selectedAssignmentId || !accessToken) return;
    try {
      const res = await fetch(`/api/distress-call/${selectedAssignmentId}?accessToken=${encodeURIComponent(accessToken)}`);
      if (!res.ok) return;
      const data = await res.json();
      setProgress(data);
    } catch (err) {
      // A missed poll just means a stale board for a few seconds.
    }
  }, [selectedAssignmentId, accessToken]);

  useEffect(() => {
    setProgress(null);
    if (!selectedAssignmentId) return;
    poll();
    const timer = setInterval(poll, POLL_MS);
    return () => clearInterval(timer);
  }, [selectedAssignmentId, poll]);

  useEffect(() => {
    function onFullscreenChange() { setIsFullscreen(!!document.fullscreenElement); }
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  function togglePresent() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else if (boardRef.current) {
      boardRef.current.requestFullscreen();
    }
  }

  if (loadingAuth) {
    return <div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", color: COLORS.textMuted }}>Loading...</div>;
  }

  const selected = signals.find((s) => s.assignmentId === selectedAssignmentId) || null;
  const pct = progress?.active && progress?.supported && progress.target ? Math.min(100, Math.round((progress.current / progress.target) * 100)) : null;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: COLORS.canvas, fontFamily: "'Inter', sans-serif", color: COLORS.textDark }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');`}</style>
      {!isFullscreen && <TeacherSidebar teacherEmail={teacherEmail} />}

      <main style={{ flex: 1, padding: isFullscreen ? 0 : "32px 36px", maxWidth: isFullscreen ? "none" : 1100, margin: isFullscreen ? 0 : "0 auto", display: "flex", flexDirection: "column" }}>
        {!isFullscreen && (
          <>
            <TeacherPageBanner>
              <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 28, margin: 0, color: COLORS.white }}>Live Ops Board</h1>
              <p style={{ color: "rgba(255,255,255,.85)", fontSize: 13, margin: "4px 0 0 0" }}>Project this screen for the class. Only one signal shows at a time.</p>
            </TeacherPageBanner>

            <button
              type="button"
              onClick={() => setShowExplainer((v) => !v)}
              className="gc-btn"
              style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "none", border: "none", color: COLORS.violet, fontWeight: 700, fontSize: 12.5, padding: "0 2px", marginBottom: showExplainer ? 8 : 16 }}
            >
              ℹ️ What is this? {showExplainer ? "▲" : "▼"}
            </button>

            {showExplainer && (
              <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: 16, marginBottom: 16, boxShadow: "0 4px 16px rgba(13,27,42,.06)" }}>
                <p style={{ fontSize: 13, color: COLORS.textDark, lineHeight: 1.6, margin: 0 }}>
                  <strong>🚨 Distress Call</strong> turns an assignment into a shared goal for the whole class. When you flag an assignment this way, every correct/completed checkpoint from every student counts toward one group target — not individual scores. This screen shows that live: the big number is how many checkpoints the class has cleared so far, out of the target you set.
                </p>
                <p style={{ fontSize: 13, color: COLORS.textDark, lineHeight: 1.6, margin: "10px 0 0 0" }}>
                  Hit "Present" to put it up on the projector — it updates on its own every few seconds as students work, so you can just let it run in the background while kids race to clear the target together.
                </p>
              </div>
            )}

            {!loadingSignals && signals.length > 1 && (
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 16 }}>
                {signals.map((s) => (
                  <button
                    key={s.assignmentId}
                    onClick={() => setSelectedAssignmentId(s.assignmentId)}
                    className="gc-btn"
                    style={{
                      background: s.assignmentId === selectedAssignmentId ? COLORS.violet : COLORS.white,
                      color: s.assignmentId === selectedAssignmentId ? COLORS.white : COLORS.textDark,
                      border: `1.5px solid ${s.assignmentId === selectedAssignmentId ? COLORS.violet : COLORS.border}`,
                      borderRadius: 999,
                      padding: "8px 16px",
                      fontWeight: 700,
                      fontSize: 12.5,
                    }}
                  >
                    {s.caseTitle} · {s.className}
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {!loadingSignals && signals.length === 0 && (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 20, padding: 48, textAlign: "center", boxShadow: "0 4px 16px rgba(13,27,42,.06)", maxWidth: 460 }}>
              <Radio size={40} color={COLORS.violet} style={{ marginBottom: 12 }} />
              <p style={{ color: COLORS.textMuted, fontSize: 14.5, lineHeight: 1.6, margin: "0 0 4px 0" }}>No active Distress Calls yet.</p>
              <p style={{ color: COLORS.textMuted, fontSize: 13, lineHeight: 1.6, margin: 0 }}>Flag any assignment as a Distress Call from Assign a Case, and it'll show up here to project.</p>
            </div>
          </div>
        )}

        {selected && (
          <div
            ref={boardRef}
            style={{
              flex: 1,
              // Three layers, front to back: a dark scrim (guarantees the
              // white text stays legible no matter how busy the real
              // background image is — same trick as .mm-scrim/.sc-scrim
              // elsewhere in this app), the real themed background image
              // once Emily drops one in at this path, and the original flat
              // radial gradient as a fallback so this looks intentional even
              // before that file exists (a missing background-image layer
              // just renders as nothing, not an error — the layers behind it
              // still show through).
              backgroundImage: `linear-gradient(rgba(13,27,42,.5), rgba(13,27,42,.78)), url('/teacher/live_ops_board_bg.jpg'), radial-gradient(ellipse at center, #16243F 0%, ${COLORS.navy} 100%)`,
              backgroundSize: "cover, cover, cover",
              backgroundPosition: "center, center, center",
              backgroundRepeat: "no-repeat, no-repeat, no-repeat",
              borderRadius: isFullscreen ? 0 : 24,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 40,
              position: "relative",
              minHeight: isFullscreen ? "100vh" : 420,
            }}
          >
            <button
              onClick={togglePresent}
              className="gc-btn"
              style={{ position: "absolute", top: 20, right: 20, background: "rgba(255,255,255,.1)", color: COLORS.white, border: "none", borderRadius: 10, padding: "8px 14px", display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 700 }}
            >
              {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              {isFullscreen ? "Exit" : "Present"}
            </button>

            <div style={{ fontSize: 13, letterSpacing: 1.5, textTransform: "uppercase", color: COLORS.teal, fontWeight: 700, marginBottom: 10 }}>🚨 Distress Call</div>
            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(22px, 3.5vw, 40px)", color: COLORS.white, margin: "0 0 6px 0", textAlign: "center" }}>{selected.caseTitle}</h2>
            <div style={{ color: "rgba(255,255,255,.6)", fontSize: 15, marginBottom: 36 }}>{selected.className}</div>

            {!progress ? (
              <div style={{ color: "rgba(255,255,255,.6)" }}>Tuning in…</div>
            ) : !progress.active ? (
              <div style={{ color: "rgba(255,255,255,.6)" }}>This assignment's Distress Call was turned off.</div>
            ) : !progress.supported ? (
              <div style={{ color: "rgba(255,255,255,.6)", maxWidth: 420, textAlign: "center" }}>This case's engine doesn't have an instant-graded portion to track yet.</div>
            ) : (
              <>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(56px, 10vw, 130px)", color: COLORS.white, lineHeight: 1 }}>
                  {progress.current}{progress.target ? <span style={{ color: "rgba(255,255,255,.4)", fontSize: "0.5em" }}> / {progress.target}</span> : null}
                </div>
                <div style={{ color: "rgba(255,255,255,.7)", fontSize: 15, margin: "6px 0 28px 0" }}>checkpoints cleared</div>

                {pct !== null && (
                  <div style={{ width: "min(600px, 80%)", height: 20, background: "rgba(255,255,255,.12)", borderRadius: 999, overflow: "hidden", marginBottom: 24 }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${COLORS.violet}, ${COLORS.teal})`, transition: "width .6s ease" }} />
                  </div>
                )}

                <div style={{ color: "rgba(255,255,255,.55)", fontSize: 13.5 }}>
                  {progress.studentsSubmitted} of {progress.studentsTargeted} students have submitted work
                </div>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default function LiveOpsBoardPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", color: COLORS.textMuted }}>Loading...</div>}>
      <LiveOpsBoardContent />
    </Suspense>
  );
}
