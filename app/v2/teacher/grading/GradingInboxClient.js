"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  StationShell,
  Glass,
  TeacherSubnav,
  INK,
  MUTED,
  LINE,
  LAVENDER,
  SOFT_LAV,
  MINT,
  CREAM,
  glanceCardStyle,
} from "../../../../components/v2/StationShell";
import {
  DEMO_GRADING_SUBMISSIONS,
  formatSubmissionAgo,
  getPendingCount,
  getPendingSubmissions,
  GRADING_INBOX_KEY,
  GRADING_STORAGE_KEY,
  kidGradingHref,
  loadConfirmedIds,
  loadLiveInbox,
  productLabel,
  saveConfirmedIds,
  stampTeacherCheckedFromSubmission,
  subjectMeta,
} from "../../../../lib/v2/demoGrading";
import { WHO_NEEDS_ME_HREF } from "../../../../lib/v2/demoWhoNeedsMe";
import { REPORTS_HREF } from "../../../../lib/v2/demoReports";

/**
 * CI2.0 grading inbox stub.
 * SAM suggests; teacher confirms. Never auto-final without her.
 * Demo items + same-browser live submits (ci2.grading.inbox).
 */
export default function GradingInboxClient() {
  const searchParams = useSearchParams();
  const studentParam = (searchParams.get("student") || "").trim();
  const [confirmedIds, setConfirmedIds] = useState([]);
  const [liveInbox, setLiveInbox] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [sortMode, setSortMode] = useState("oldest"); // oldest | standard
  const [focusId, setFocusId] = useState(null);
  const [studentFilter, setStudentFilter] = useState(studentParam);
  const [adjusting, setAdjusting] = useState(false);
  const [draftScore, setDraftScore] = useState(null);
  const [toast, setToast] = useState(null);

  const refreshFromStorage = useCallback(() => {
    setConfirmedIds(loadConfirmedIds());
    setLiveInbox(loadLiveInbox());
  }, []);

  useEffect(() => {
    refreshFromStorage();
    setHydrated(true);
    const onStorage = (e) => {
      if (e.key === GRADING_STORAGE_KEY || e.key === GRADING_INBOX_KEY) {
        refreshFromStorage();
      }
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("ci2-grading-updated", refreshFromStorage);
    window.addEventListener("focus", refreshFromStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("ci2-grading-updated", refreshFromStorage);
      window.removeEventListener("focus", refreshFromStorage);
    };
  }, [refreshFromStorage]);

  useEffect(() => {
    if (!toast) return;
    const ms = toast.myDayHref || toast.growthHref ? 5200 : 2200;
    const t = setTimeout(() => setToast(null), ms);
    return () => clearTimeout(t);
  }, [toast]);

  const confirmedSet = useMemo(() => new Set(confirmedIds), [confirmedIds]);

  // liveInbox in deps so same-tab submit → inbox refresh works
  const pendingAll = useMemo(() => {
    void liveInbox;
    return getPendingSubmissions(confirmedIds, sortMode);
  }, [confirmedIds, sortMode, liveInbox]);

  const pending = useMemo(() => {
    const name = String(studentFilter || "").trim().toLowerCase();
    if (!name) return pendingAll;
    return pendingAll.filter(
      (s) => String(s.studentFirst || "").trim().toLowerCase() === name
    );
  }, [pendingAll, studentFilter]);

  const done = useMemo(() => {
    const live = liveInbox.filter((s) => confirmedSet.has(s.id));
    const demo = DEMO_GRADING_SUBMISSIONS.filter((s) => confirmedSet.has(s.id));
    return [...live, ...demo];
  }, [confirmedSet, liveInbox]);

  const focused = useMemo(() => {
    if (!pending.length) return null;
    const hit = pending.find((s) => s.id === focusId);
    return hit || pending[0];
  }, [pending, focusId]);

  useEffect(() => {
    setStudentFilter(studentParam);
  }, [studentParam]);

  // Check-ins deep link: focus first matching pending for ?student=
  useEffect(() => {
    if (!hydrated || !studentParam) return;
    const name = studentParam.toLowerCase();
    const hit = pendingAll.find(
      (s) => String(s.studentFirst || "").trim().toLowerCase() === name
    );
    if (hit) setFocusId(hit.id);
  }, [hydrated, studentParam, pendingAll]);

  useEffect(() => {
    if (focused && focusId !== focused.id) setFocusId(focused.id);
    if (!focused) setFocusId(null);
    setAdjusting(false);
    setDraftScore(null);
  }, [focused?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const persist = useCallback((ids) => {
    setConfirmedIds(ids);
    saveConfirmedIds(ids);
  }, []);

  const confirmCurrent = useCallback(
    (scoreOverride) => {
      if (!focused) return;
      const next = [...confirmedIds, focused.id];
      persist(next);
      const stamped = stampTeacherCheckedFromSubmission(focused);
      const score = scoreOverride != null ? scoreOverride : focused.samScore;
      const stampNote = stamped.length ? " · stamped on My Day." : ".";
      setToast({
        text: `Confirmed ${focused.studentFirst} · ${score}/${focused.maxScore}. You're the scorer of record${stampNote}`,
        growthHref: REPORTS_HREF,
        growthLabel: "See growth →",
        // Optional same-browser back-link when the stamp landed on My Day.
        myDayHref: stamped.length ? "/v2/student" : null,
        myDayLabel: "See My Day",
      });
      setAdjusting(false);
      setDraftScore(null);
    },
    [focused, confirmedIds, persist]
  );

  const skipCurrent = useCallback(() => {
    if (!focused || pending.length < 2) {
      setToast({ text: "Nothing else waiting — take a breath." });
      return;
    }
    const idx = pending.findIndex((s) => s.id === focused.id);
    const next = pending[(idx + 1) % pending.length];
    setFocusId(next.id);
    setAdjusting(false);
    setDraftScore(null);
    setToast({ text: `Skipped for now — ${next.studentFirst} is up.` });
  }, [focused, pending]);

  // Keyboard: Enter confirm, S skip, C change
  useEffect(() => {
    function onKey(e) {
      if (e.target && (e.target.tagName === "INPUT" || e.target.tagName === "SELECT" || e.target.tagName === "TEXTAREA")) return;
      if (e.key === "Enter" && !adjusting) {
        e.preventDefault();
        confirmCurrent();
      } else if (e.key === "s" || e.key === "S") {
        e.preventDefault();
        skipCurrent();
      } else if (e.key === "c" || e.key === "C") {
        e.preventDefault();
        if (focused) {
          setAdjusting(true);
          setDraftScore(focused.samScore);
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [adjusting, confirmCurrent, skipCurrent, focused]);

  const pendingCount = hydrated ? pending.length : getPendingCount();

  return (
    <StationShell active="check">
      <TeacherSubnav active="grading" />
      <Glass>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "flex-start" }}>
          <div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", margin: 0, fontSize: 34, color: INK }}>Grading</h1>
            <div style={{ color: MUTED, marginTop: 2 }}>
              SAM gives a first read · you confirm · never auto-final without you
            </div>
            <div style={{ color: MUTED, marginTop: 4, fontSize: 12 }}>
              Demo queue + live student submits (same browser only)
            </div>
            <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: pendingCount ? "#8A6A20" : "#2FA36B",
                  background: pendingCount ? CREAM : MINT,
                  borderRadius: 999,
                  padding: "5px 12px",
                  border: `1px solid ${LINE}`,
                }}
              >
                {pendingCount === 0 ? "Caught up" : `${pendingCount} to grade`}
              </span>
              <Link
                href={WHO_NEEDS_ME_HREF}
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: LAVENDER,
                  textDecoration: "none",
                  border: `1px solid ${LAVENDER}`,
                  background: "#fff",
                  borderRadius: 999,
                  padding: "5px 12px",
                }}
              >
                Check-ins
              </Link>
              {studentFilter && (
                <span
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    fontSize: 13,
                    fontWeight: 700,
                    color: INK,
                    background: MINT,
                    border: `1px solid ${LINE}`,
                    borderRadius: 999,
                    padding: "5px 10px 5px 12px",
                  }}
                >
                  Focus · {studentFilter}
                  <button
                    type="button"
                    onClick={() => setStudentFilter("")}
                    title="Clear student focus"
                    style={{
                      border: "none",
                      background: "transparent",
                      color: MUTED,
                      fontWeight: 800,
                      fontSize: 12,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      padding: 0,
                    }}
                  >
                    Clear
                  </button>
                </span>
              )}
              <span style={{ fontSize: 12, color: MUTED }}>
                Keys: Enter confirm · C change · S skip
              </span>
            </div>
          </div>
          <div style={{ display: "inline-flex", gap: 4, background: "rgba(255,255,255,.85)", border: `1px solid ${LINE}`, borderRadius: 999, padding: 3 }}>
            {[
              { key: "oldest", label: "Oldest first" },
              { key: "standard", label: "By standard" },
            ].map((opt) => {
              const on = sortMode === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setSortMode(opt.key)}
                  aria-pressed={on}
                  style={{
                    border: "none",
                    borderRadius: 999,
                    padding: "6px 12px",
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    color: on ? "#fff" : INK,
                    background: on ? LAVENDER : "transparent",
                  }}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(240px, 320px) minmax(0, 1fr)",
            gap: 14,
            marginTop: 18,
            alignItems: "start",
          }}
          className="grading-inbox-grid"
        >
          {/* Inbox list */}
          <section aria-label="Needs you inbox" style={{ background: SOFT_LAV, border: `1px solid ${LINE}`, borderRadius: 18, padding: 10 }}>
            <div style={{ fontWeight: 800, color: INK, fontSize: 13, letterSpacing: 0.3, padding: "4px 6px 10px" }}>
              Needs you · {pending.length}
            </div>
            <div style={{ display: "grid", gap: 8, maxHeight: "min(62vh, 560px)", overflow: "auto" }}>
              {pending.length === 0 && (
                <div
                  role="status"
                  style={{
                    ...glanceCardStyle("ready"),
                    borderRadius: 16,
                    padding: "22px 16px",
                    color: INK,
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 10,
                    boxShadow: "0 8px 22px rgba(46,36,89,.06)",
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: 15, lineHeight: 1.3 }}>
                    {studentFilter ? `No pending for ${studentFilter}` : "All clear"}
                  </div>
                  <div style={{ color: MUTED, fontSize: 13, lineHeight: 1.45, maxWidth: 260 }}>
                    {studentFilter
                      ? "Nothing waiting for this student — head back when you are ready."
                      : "Nothing waiting. Nice work — you are caught up."}
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", marginTop: 2 }}>
                    <Link
                      href="/v2/teacher/day?d=2"
                      style={{
                        border: "none",
                        background: LAVENDER,
                        color: "#fff",
                        borderRadius: 999,
                        padding: "9px 16px",
                        fontWeight: 800,
                        fontSize: 13,
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        boxShadow: "0 6px 18px rgba(139,108,255,.28)",
                      }}
                    >
                      Open Daily Focus
                    </Link>
                    <Link
                      href={WHO_NEEDS_ME_HREF}
                      style={{
                        border: `1px solid ${LINE}`,
                        background: "rgba(255,255,255,.92)",
                        color: INK,
                        borderRadius: 999,
                        padding: "9px 14px",
                        fontWeight: 700,
                        fontSize: 13,
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                    >
                      Check-ins
                    </Link>
                  </div>
                </div>
              )}
              {pending.map((s) => {
                const sub = subjectMeta(s.subject);
                const on = focused?.id === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      setFocusId(s.id);
                      setAdjusting(false);
                    }}
                    style={{
                      textAlign: "left",
                      cursor: "pointer",
                      fontFamily: "inherit",
                      borderRadius: 14,
                      padding: "10px 12px",
                      border: `2px solid ${on ? LAVENDER : LINE}`,
                      background: on ? "rgba(139,108,255,.10)" : "#fff",
                      color: INK,
                      display: "flex",
                      gap: 10,
                    }}
                  >
                    <span style={{ width: 5, alignSelf: "stretch", borderRadius: 4, background: sub.color, flexShrink: 0 }} />
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 8, flexWrap: "wrap" }}>
                        <Link
                          href={kidGradingHref({ studentFirst: s.studentFirst })}
                          onClick={(e) => e.stopPropagation()}
                          title={`Open ${s.studentFirst}'s grades across subjects`}
                          style={{ fontWeight: 800, fontSize: 14, color: INK, textDecoration: "none", borderBottom: `1px dashed ${LINE}` }}
                        >
                          {s.studentFirst}
                        </Link>
                        <span style={{ fontSize: 11, color: MUTED, fontWeight: 600 }}>{formatSubmissionAgo(s)}</span>
                      </div>
                      <div style={{ fontSize: 13, color: MUTED, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {s.assignment}
                      </div>
                      <div style={{ marginTop: 6, display: "flex", gap: 6, flexWrap: "wrap" }}>
                        <span style={{ fontSize: 11, fontWeight: 800, color: sub.color, textTransform: "uppercase" }}>{sub.name}</span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: MUTED, background: SOFT_LAV, borderRadius: 999, padding: "2px 8px" }}>
                          {productLabel(s.product)}
                        </span>
                        {s.source === "live" && (
                          <span style={{ fontSize: 11, fontWeight: 800, color: LAVENDER, background: "#fff", borderRadius: 999, padding: "2px 8px", border: `1px solid ${LINE}` }}>
                            Just in
                          </span>
                        )}
                        {s.standard && (
                          <span style={{ fontSize: 11, fontWeight: 700, color: MUTED }}>{s.standard}</span>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {done.length > 0 && (
              <div style={{ marginTop: 14, paddingTop: 10, borderTop: `1px solid ${LINE}` }}>
                <div style={{ fontWeight: 800, color: "#2FA36B", fontSize: 12, letterSpacing: 0.3, padding: "0 6px 8px" }}>
                  Done · {done.length}
                </div>
                <div style={{ display: "grid", gap: 6 }}>
                  {done.slice(-5).reverse().map((s) => (
                    <div
                      key={s.id}
                      style={{
                        fontSize: 13,
                        color: MUTED,
                        background: MINT,
                        borderRadius: 10,
                        padding: "8px 10px",
                        border: `1px solid ${LINE}`,
                      }}
                    >
                      <Link
                        href={kidGradingHref({ studentFirst: s.studentFirst })}
                        style={{ color: INK, fontWeight: 800, textDecoration: "none", borderBottom: `1px dashed ${LINE}` }}
                        title={`Open ${s.studentFirst}'s grades across subjects`}
                      >
                        {s.studentFirst}
                      </Link>{" "}· {s.assignment}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* Focus card */}
          <section aria-label="Focus card">
            {!focused ? (
              <div
                role="status"
                style={{
                  ...glanceCardStyle("ready"),
                  borderRadius: 18,
                  padding: "28px 22px",
                  color: INK,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                  boxShadow: "0 8px 22px rgba(46,36,89,.06)",
                }}
              >
                <div style={{ fontWeight: 800, fontSize: 17, lineHeight: 1.3 }}>You&apos;re clear</div>
                <div style={{ color: MUTED, fontSize: 14, lineHeight: 1.45, maxWidth: 420 }}>
                  No submissions need a look right now. When kids turn work in, SAM will queue a first read here — you still confirm every score.
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
                  <Link
                    href="/v2/teacher/day?d=2"
                    style={{
                      border: "none",
                      background: LAVENDER,
                      color: "#fff",
                      borderRadius: 999,
                      padding: "10px 18px",
                      fontWeight: 800,
                      fontSize: 14,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                      boxShadow: "0 6px 18px rgba(139,108,255,.28)",
                    }}
                  >
                    Open Daily Focus
                  </Link>
                  <Link
                    href={WHO_NEEDS_ME_HREF}
                    style={{
                      border: `1px solid ${LINE}`,
                      background: "rgba(255,255,255,.92)",
                      color: INK,
                      borderRadius: 999,
                      padding: "10px 16px",
                      fontWeight: 700,
                      fontSize: 14,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    Check-ins
                  </Link>
                </div>
              </div>
            ) : (
              <FocusCard
                item={focused}
                adjusting={adjusting}
                draftScore={draftScore}
                setDraftScore={setDraftScore}
                onConfirm={() => confirmCurrent(adjusting ? draftScore : undefined)}
                onChangeScore={() => {
                  setAdjusting(true);
                  setDraftScore(focused.samScore);
                }}
                onSkip={skipCurrent}
                onCancelAdjust={() => {
                  setAdjusting(false);
                  setDraftScore(null);
                }}
              />
            )}
          </section>
        </div>

        {toast && (
          <div
            role="status"
            style={{
              position: "fixed",
              bottom: 24,
              left: "50%",
              transform: "translateX(-50%)",
              background: INK,
              color: "#fff",
              borderRadius: 999,
              padding: "12px 18px",
              fontWeight: 700,
              fontSize: 14,
              boxShadow: "0 12px 32px rgba(46,36,89,.28)",
              zIndex: 30,
              maxWidth: "90vw",
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <span>{toast.text}</span>
            {toast.myDayHref && (
              <Link
                href={toast.myDayHref}
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: "#fff",
                  textDecoration: "none",
                  background: "#2F7A5B",
                  borderRadius: 999,
                  padding: "6px 12px",
                  border: "1px solid rgba(255,255,255,.35)",
                  whiteSpace: "nowrap",
                }}
                title="Open student My Day — Teacher checked stamp (same browser)"
              >
                {toast.myDayLabel || "See My Day"}
              </Link>
            )}
            {toast.growthHref && (
              <Link
                href={toast.growthHref}
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  color: INK,
                  textDecoration: "none",
                  background: MINT,
                  borderRadius: 999,
                  padding: "6px 12px",
                  border: `1px solid ${LINE}`,
                  whiteSpace: "nowrap",
                }}
                title="Calm glance by standard — demo bars, not live analytics"
              >
                {toast.growthLabel || "See growth →"}
              </Link>
            )}
          </div>
        )}
      </Glass>

      <style>{`
        @media (max-width: 860px) {
          .grading-inbox-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </StationShell>
  );
}

function FocusCard({ item, adjusting, draftScore, setDraftScore, onConfirm, onChangeScore, onSkip, onCancelAdjust }) {
  const sub = subjectMeta(item.subject);
  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${LINE}`,
        borderRadius: 18,
        padding: "18px 18px 16px",
        boxShadow: "0 12px 28px rgba(139,108,255,.10)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 800, color: sub.color, textTransform: "uppercase", letterSpacing: 0.4 }}>
            {sub.name} · {productLabel(item.product)}
            {item.standard ? ` · ${item.standard}` : ""}
          </div>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", margin: "4px 0 0", fontSize: 22, color: INK }}>
            <Link
              href={kidGradingHref({ studentFirst: item.studentFirst })}
              title={`Open ${item.studentFirst}'s grades across subjects`}
              style={{ color: INK, textDecoration: "none", borderBottom: `1px dashed ${LINE}` }}
            >
              {item.studentFirst}
            </Link>
          </h2>
          <div style={{ marginTop: 6 }}>
            <Link
              href={kidGradingHref({ studentFirst: item.studentFirst })}
              style={{
                fontSize: 12,
                fontWeight: 700,
                color: LAVENDER,
                textDecoration: "none",
                border: `1px solid ${LINE}`,
                background: SOFT_LAV,
                borderRadius: 999,
                padding: "4px 10px",
              }}
            >
              All subjects for {item.studentFirst} →
            </Link>
          </div>
          <div style={{ color: MUTED, fontSize: 14, marginTop: 2 }}>
            {item.assignment} · submitted {formatSubmissionAgo(item)}
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: 14,
          background: SOFT_LAV,
          borderRadius: 14,
          padding: "12px 14px",
          border: `1px solid ${LINE}`,
        }}
      >
        <div style={{ fontSize: 11, fontWeight: 800, color: MUTED, letterSpacing: 0.4, marginBottom: 6 }}>STUDENT WORK</div>
        <p style={{ margin: 0, color: INK, fontSize: 15, lineHeight: 1.5 }}>{item.workSnippet}</p>
      </div>

      <div
        style={{
          marginTop: 12,
          background: CREAM,
          borderRadius: 14,
          padding: "12px 14px",
          border: `1px solid ${LINE}`,
        }}
      >
        <div style={{ fontSize: 11, fontWeight: 800, color: "#8A6A20", letterSpacing: 0.4, marginBottom: 6 }}>SAM SUGGESTS</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: 10, flexWrap: "wrap" }}>
          <span style={{ fontWeight: 800, fontSize: 22, color: INK }}>
            {item.samScore}/{item.maxScore}
          </span>
          <span style={{ color: INK, fontSize: 14, lineHeight: 1.4 }}>{item.samReason}</span>
        </div>
        <div style={{ marginTop: 8, fontSize: 12, color: MUTED }}>
          Suggestion only — you stay the scorer of record.
        </div>
      </div>

      {adjusting && (
        <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
          <label style={{ fontWeight: 700, color: INK, fontSize: 14 }}>
            Your score{" "}
            <select
              value={draftScore ?? item.samScore}
              onChange={(e) => setDraftScore(Number(e.target.value))}
              style={{
                marginLeft: 8,
                border: `1px solid ${LINE}`,
                borderRadius: 999,
                padding: "6px 12px",
                fontWeight: 700,
                fontFamily: "inherit",
                color: INK,
                background: "#fff",
              }}
            >
              {Array.from({ length: item.maxScore + 1 }, (_, i) => (
                <option key={i} value={i}>
                  {i}/{item.maxScore}
                </option>
              ))}
            </select>
          </label>
          <button type="button" onClick={onCancelAdjust} style={btnGhost}>
            Cancel
          </button>
        </div>
      )}

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 16 }}>
        <button type="button" onClick={onConfirm} style={btnPrimary}>
          {adjusting ? "Confirm my score" : "Confirm"}
        </button>
        {!adjusting && (
          <button type="button" onClick={onChangeScore} style={btnSecondary}>
            Change score
          </button>
        )}
        <button type="button" onClick={onSkip} style={btnGhost}>
          Skip
        </button>
      </div>
    </div>
  );
}

const btnPrimary = {
  border: "none",
  background: LAVENDER,
  color: "#fff",
  borderRadius: 999,
  padding: "10px 18px",
  fontWeight: 700,
  fontSize: 14,
  cursor: "pointer",
  fontFamily: "inherit",
};

const btnSecondary = {
  border: `1px solid ${LAVENDER}`,
  background: "#fff",
  color: LAVENDER,
  borderRadius: 999,
  padding: "10px 16px",
  fontWeight: 700,
  fontSize: 14,
  cursor: "pointer",
  fontFamily: "inherit",
};

const btnGhost = {
  border: `1px solid ${LINE}`,
  background: "#fff",
  color: INK,
  borderRadius: 999,
  padding: "10px 16px",
  fontWeight: 700,
  fontSize: 14,
  cursor: "pointer",
  fontFamily: "inherit",
};