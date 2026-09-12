"use client";

import React, { useState, useEffect, useCallback, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Maximize2, Minimize2, Radio, Users } from "lucide-react";
import { supabase } from "../../../lib/supabaseClient";
import TeacherSidebar from "../../../components/TeacherSidebar";
import TeacherPageBanner from "../../../components/TeacherPageBanner";

// Soft Crystal Sci-Fi — lavender / white / violet / teal / gold (not dark cyberpunk).
const COLORS = {
  canvas: "#F2F0FA",
  white: "#FFFFFF",
  violet: "#8C52F2",
  violetSoft: "#EEE6FD",
  teal: "#2EB8C8",
  tealSoft: "#E6F8FB",
  gold: "#D4A017",
  goldSoft: "#FFF6DE",
  border: "#E1E2EE",
  textDark: "#1F2A44",
  textMuted: "#697386",
};

const POLL_MS = 1500;

function Meter({ label, value, max, color, note }) {
  const pct = Math.max(0, Math.min(100, Math.round((Number(value) / (max || 100)) * 100)));
  return (
    <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 18, padding: "18px 20px", boxShadow: "0 4px 16px rgba(140,82,242,.06)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 8 }}>
        <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1.2, color: COLORS.violet, textTransform: "uppercase" }}>{label}</div>
        <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 28, color: COLORS.textDark }}>{Math.round(value)}</div>
      </div>
      <div style={{ height: 14, background: COLORS.violetSoft, borderRadius: 999, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: `linear-gradient(90deg, ${color}, ${COLORS.teal})`, transition: "width .45s ease" }} />
      </div>
      {note ? <div style={{ marginTop: 8, fontSize: 12, color: COLORS.textMuted }}>{note}</div> : null}
    </div>
  );
}

function SignalOpsBoardContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const deepLinkedAssignmentId = searchParams.get("assignmentId");

  const [loadingAuth, setLoadingAuth] = useState(true);
  const [teacherId, setTeacherId] = useState(null);
  const [teacherEmail, setTeacherEmail] = useState("");
  const [accessToken, setAccessToken] = useState(null);

  const [signals, setSignals] = useState([]);
  const [selectedAssignmentId, setSelectedAssignmentId] = useState(deepLinkedAssignmentId || null);
  const [loadingSignals, setLoadingSignals] = useState(true);
  const [sessionPayload, setSessionPayload] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const boardRef = useRef(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data, error: authErr }) => {
      if (authErr || !data?.user) { router.push("/login"); return; }
      setTeacherId(data.user.id);
      setTeacherEmail(data.user.email || "");
      setLoadingAuth(false);
    });
    supabase.auth.getSession().then(({ data }) => setAccessToken(data?.session?.access_token || null));
  }, [router]);

  useEffect(() => {
    if (!teacherId) return;
    (async () => {
      setLoadingSignals(true);
      const { data: classes } = await supabase.from("classes").select("id, name").eq("teacher_id", teacherId);
      const classMap = {};
      (classes || []).forEach((c) => { classMap[c.id] = c.name; });
      const classIds = (classes || []).map((c) => c.id);
      if (classIds.length === 0) {
        setSignals([]);
        setLoadingSignals(false);
        return;
      }

      const { data: cases } = await supabase.from("cases").select("standard, title, engine").eq("engine", "signal_defense");
      const sdStandards = (cases || []).map((c) => c.standard);
      const titleByStandard = {};
      (cases || []).forEach((c) => { titleByStandard[c.standard] = c.title; });

      if (sdStandards.length === 0) {
        setSignals([]);
        setLoadingSignals(false);
        return;
      }

      const { data: assignments } = await supabase
        .from("assignments")
        .select("id, class_id, case_standard, created_at")
        .in("class_id", classIds)
        .in("case_standard", sdStandards)
        .order("created_at", { ascending: false });

      const built = (assignments || []).map((a) => ({
        assignmentId: a.id,
        caseTitle: titleByStandard[a.case_standard] || a.case_standard,
        className: classMap[a.class_id] || "Unknown class",
        caseStandard: a.case_standard,
      }));
      setSignals(built);
      setSelectedAssignmentId((prev) => (prev && built.some((s) => s.assignmentId === prev) ? prev : (built[0]?.assignmentId || null)));
      setLoadingSignals(false);
    })();
  }, [teacherId]);

  const poll = useCallback(async () => {
    if (!selectedAssignmentId || !accessToken) return;
    try {
      const res = await fetch(`/api/signal-defense/session?assignmentId=${encodeURIComponent(selectedAssignmentId)}&accessToken=${encodeURIComponent(accessToken)}`);
      if (!res.ok) return;
      const data = await res.json();
      setSessionPayload(data);
    } catch (err) {
      // Missed poll — board stays on last frame for a moment.
    }
  }, [selectedAssignmentId, accessToken]);

  useEffect(() => {
    setSessionPayload(null);
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
    if (document.fullscreenElement) document.exitFullscreen();
    else if (boardRef.current) boardRef.current.requestFullscreen();
  }

  async function teacherAction(path) {
    if (!selectedAssignmentId || !accessToken) return;
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignmentId: selectedAssignmentId, accessToken }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Request failed.");
      setSessionPayload(data);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  if (loadingAuth) {
    return <div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", color: COLORS.textMuted }}>Loading...</div>;
  }

  const selected = signals.find((s) => s.assignmentId === selectedAssignmentId) || null;
  const session = sessionPayload?.session || null;
  const participants = sessionPayload?.participants || [];
  const status = session?.status || null;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: COLORS.canvas, fontFamily: "'Inter', sans-serif", color: COLORS.textDark }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Inter:wght@400;500;600;700&display=swap');
      `}</style>
      {!isFullscreen && <TeacherSidebar teacherEmail={teacherEmail} />}

      <main style={{ flex: 1, padding: isFullscreen ? 0 : "32px 36px", maxWidth: isFullscreen ? "none" : 1100, margin: isFullscreen ? 0 : "0 auto", display: "flex", flexDirection: "column" }}>
        {!isFullscreen && (
          <>
            <TeacherPageBanner>
              <h1 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 28, margin: 0, color: COLORS.white }}>Signal Ops Board</h1>
              <p style={{ color: "rgba(255,255,255,.85)", fontSize: 13, margin: "4px 0 0 0" }}>
                Start a live crew session, then project meters and roster. Kids join from the assignment — no code.
              </p>
            </TeacherPageBanner>

            {error && (
              <div style={{ background: "#FBEAEA", color: "#B23A3A", borderRadius: 10, padding: "10px 14px", fontSize: 13, marginBottom: 12 }}>{error}</div>
            )}

            {!loadingSignals && signals.length > 0 && (
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
                      cursor: "pointer",
                    }}
                  >
                    {s.caseTitle} · {s.className}
                  </button>
                ))}
              </div>
            )}

            {selected && (
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
                {!session || status === "ended" ? (
                  <button disabled={busy} onClick={() => teacherAction("/api/signal-defense/session/start")} className="gc-btn" style={{ background: COLORS.violet, color: COLORS.white, border: "none", borderRadius: 999, padding: "11px 18px", fontWeight: 700, fontSize: 13.5, cursor: "pointer" }}>
                    Start Live Session
                  </button>
                ) : null}
                {status === "lobby" ? (
                  <button disabled={busy} onClick={() => teacherAction("/api/signal-defense/session/begin")} className="gc-btn" style={{ background: COLORS.teal, color: COLORS.white, border: "none", borderRadius: 999, padding: "11px 18px", fontWeight: 700, fontSize: 13.5, cursor: "pointer" }}>
                    Begin Mission
                  </button>
                ) : null}
                {status === "lobby" || status === "live" ? (
                  <button disabled={busy} onClick={() => teacherAction("/api/signal-defense/session/end")} className="gc-btn" style={{ background: COLORS.goldSoft, color: COLORS.gold, border: `1.5px solid ${COLORS.gold}`, borderRadius: 999, padding: "11px 18px", fontWeight: 700, fontSize: 13.5, cursor: "pointer" }}>
                    End Session
                  </button>
                ) : null}
              </div>
            )}
          </>
        )}

        {!loadingSignals && signals.length === 0 && (
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 20, padding: 48, textAlign: "center", boxShadow: "0 4px 16px rgba(13,27,42,.06)", maxWidth: 460 }}>
              <Radio size={40} color={COLORS.violet} style={{ marginBottom: 12 }} />
              <p style={{ color: COLORS.textMuted, fontSize: 14.5, lineHeight: 1.6, margin: "0 0 4px 0" }}>No Signal Ops assignments yet.</p>
              <p style={{ color: COLORS.textMuted, fontSize: 13, lineHeight: 1.6, margin: 0 }}>Assign a Signal Ops case from the Challenge Library, then come back here to start a live session.</p>
            </div>
          </div>
        )}

        {selected && (
          <div
            ref={boardRef}
            style={{
              flex: 1,
              background: isFullscreen
                ? "radial-gradient(ellipse at 20% 10%, #EDE6FF 0%, #F7F5FC 45%, #E8F7FB 100%)"
                : `linear-gradient(180deg, ${COLORS.violetSoft} 0%, ${COLORS.canvas} 40%)`,
              borderRadius: isFullscreen ? 0 : 24,
              border: isFullscreen ? "none" : `1px solid ${COLORS.border}`,
              display: "flex",
              flexDirection: "column",
              padding: isFullscreen ? 48 : 28,
              position: "relative",
              minHeight: isFullscreen ? "100vh" : 480,
              gap: 22,
            }}
          >
            <button
              onClick={togglePresent}
              className="gc-btn"
              style={{ position: "absolute", top: 18, right: 18, background: COLORS.white, color: COLORS.violet, border: `1px solid ${COLORS.border}`, borderRadius: 10, padding: "8px 14px", display: "flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}
            >
              {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              {isFullscreen ? "Exit" : "Present"}
            </button>

            <div style={{ textAlign: "center", paddingTop: 8 }}>
              <div style={{ fontSize: 12, letterSpacing: 1.6, textTransform: "uppercase", color: COLORS.teal, fontWeight: 800, marginBottom: 8 }}>Signal Ops · Live Crew</div>
              <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "clamp(22px, 3.5vw, 40px)", color: COLORS.textDark, margin: "0 0 6px 0" }}>{selected.caseTitle}</h2>
              <div style={{ color: COLORS.textMuted, fontSize: 15 }}>{selected.className}</div>
              <div style={{ marginTop: 10, display: "inline-flex", alignItems: "center", gap: 8, background: status === "live" ? COLORS.tealSoft : status === "lobby" ? COLORS.goldSoft : COLORS.violetSoft, color: status === "live" ? COLORS.teal : status === "lobby" ? COLORS.gold : COLORS.violet, borderRadius: 999, padding: "6px 14px", fontWeight: 800, fontSize: 12.5 }}>
                {status === "live" ? "MISSION LIVE" : status === "lobby" ? "LOBBY OPEN" : "NO SESSION — start one above"}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14, maxWidth: 920, width: "100%", margin: "0 auto" }}>
              <Meter label="Salvage" value={session?.salvage ?? 0} max={Math.max(60, (session?.salvage || 0) + 20)} color={COLORS.gold} note="Built from every correct signal" />
              <Meter label="Power" value={session?.power ?? 100} max={100} color={COLORS.teal} note="Restored by correct answers" />
              <Meter label="Base Health" value={session?.baseHealth ?? 100} max={100} color={COLORS.violet} note="V1: holds steady (wave damage later)" />
            </div>

            <div style={{ maxWidth: 920, width: "100%", margin: "0 auto", background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 18, padding: 18, boxShadow: "0 4px 16px rgba(140,82,242,.06)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <Users size={16} color={COLORS.violet} />
                <div style={{ fontWeight: 800, fontSize: 13, color: COLORS.textDark }}>Crew roster</div>
                <div style={{ marginLeft: "auto", fontSize: 12.5, color: COLORS.textMuted, fontWeight: 600 }}>{participants.length} joined</div>
              </div>
              {participants.length === 0 ? (
                <p style={{ margin: 0, color: COLORS.textMuted, fontSize: 13.5 }}>Waiting for cadets to open the assignment…</p>
              ) : (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {participants.map((p) => (
                    <span key={p.id} style={{ background: COLORS.violetSoft, color: COLORS.violet, borderRadius: 999, padding: "7px 12px", fontWeight: 700, fontSize: 12.5 }}>
                      {p.callsign ? `${p.callsign} · ${p.displayName}` : p.displayName}
                    </span>
                  ))}
                </div>
              )}
              {session ? (
                <div style={{ marginTop: 14, fontSize: 12.5, color: COLORS.textMuted }}>
                  Class signals decoded: <strong style={{ color: COLORS.textDark }}>{session.totalCorrect || 0}</strong>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function SignalOpsBoardPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: "100vh", background: COLORS.canvas, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif", color: COLORS.textMuted }}>Loading...</div>}>
      <SignalOpsBoardContent />
    </Suspense>
  );
}
