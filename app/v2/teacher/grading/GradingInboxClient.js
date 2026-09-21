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
  GLANCE,
  glanceChipStyle,
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
import {
  getWhoNeedsMeCount,
  WHO_NEEDS_ME_STORAGE_KEY,
} from "../../../../lib/v2/demoWhoNeedsMe";
import {
  studentMyDayHref,
  noteEvidenceFromGradeConfirm,
  getGradingStoryBand,
  floatSoftClusterPending,
  resolveGradingStoryCode,
  kidDoorHref,
  softClusterDoors,
  getLoopSoftest,
  isLoopAllClear,
  isStandardResolved,
  familyNoteSoftStoryHref,
  checkInsHrefForStandard,
  checkInsCtaLabel,
  REPORTS_HREF,
  LOOP_REMEMBER_KEY,
} from "../../../../lib/v2/demoLoopSeams";

/**
 * CI2.0 grading inbox — INTUITIVE · fewer clicks.
 * Top: quiet soft story. Slim next-move row. Main: who/work that needs a
 * confirm + soft cluster with named kid doors. Evidence / deep grade UI
 * on row expand (depth) only. Amber Check-ins only when live waiting > 0.
 * Soft-story voice preserved from grading · same voice as the loop.
 */
export default function GradingInboxClient() {
  const searchParams = useSearchParams();
  const studentParam = (searchParams.get("student") || "").trim();
  const standardParam = (searchParams.get("standard") || "").trim();
  const [confirmedIds, setConfirmedIds] = useState([]);
  const [liveInbox, setLiveInbox] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [sortMode, setSortMode] = useState("oldest"); // oldest | standard
  const [focusId, setFocusId] = useState(null);
  const [openId, setOpenId] = useState(null); // depth expand — evidence + confirm
  const [studentFilter, setStudentFilter] = useState(studentParam);
  const [adjusting, setAdjusting] = useState(false);
  const [draftScore, setDraftScore] = useState(null);
  const [toast, setToast] = useState(null);
  const [rememberTick, setRememberTick] = useState(0);
  const [whoNeedsCount, setWhoNeedsCount] = useState(0);

  const refreshFromStorage = useCallback(() => {
    setConfirmedIds(loadConfirmedIds());
    setLiveInbox(loadLiveInbox());
    try {
      setWhoNeedsCount(getWhoNeedsMeCount(undefined, undefined, {}));
    } catch {
      setWhoNeedsCount(0);
    }
  }, []);

  useEffect(() => {
    refreshFromStorage();
    setHydrated(true);
    const onStorage = (e) => {
      if (
        e.key === GRADING_STORAGE_KEY ||
        e.key === GRADING_INBOX_KEY ||
        e.key === WHO_NEEDS_ME_STORAGE_KEY ||
        e.key === LOOP_REMEMBER_KEY ||
        e.key === "ci2.loop.remember"
      ) {
        refreshFromStorage();
        if (e.key === LOOP_REMEMBER_KEY || e.key === "ci2.loop.remember") {
          setRememberTick((n) => n + 1);
        }
      }
    };
    const onRemember = () => setRememberTick((n) => n + 1);
    window.addEventListener("storage", onStorage);
    window.addEventListener("ci2-grading-updated", refreshFromStorage);
    window.addEventListener("ci2-who-needs-updated", refreshFromStorage);
    window.addEventListener("ci2-loop-remember-updated", onRemember);
    window.addEventListener("focus", refreshFromStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("ci2-grading-updated", refreshFromStorage);
      window.removeEventListener("ci2-who-needs-updated", refreshFromStorage);
      window.removeEventListener("ci2-loop-remember-updated", onRemember);
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

  // Soft story — ?standard= or loop softest. Tick refreshes after evidence confirm.
  const storyBand = useMemo(() => {
    void rememberTick;
    void confirmedIds;
    if (!hydrated) return null;
    return getGradingStoryBand({ standard: standardParam });
  }, [hydrated, standardParam, rememberTick, confirmedIds]);

  const storyCode = storyBand?.code || resolveGradingStoryCode(standardParam);

  const loopSoftest =
    typeof window !== "undefined" ? getLoopSoftest() : null;
  const allClear =
    typeof window !== "undefined" ? isLoopAllClear() : false;
  const softOpen =
    !allClear &&
    Boolean(storyCode) &&
    storyBand &&
    !storyBand.soft &&
    !isStandardResolved(storyCode);

  // liveInbox in deps so same-tab submit → inbox refresh works
  const pendingAll = useMemo(() => {
    void liveInbox;
    const raw = getPendingSubmissions(confirmedIds, sortMode);
    return storyCode ? floatSoftClusterPending(raw, storyCode) : raw;
  }, [confirmedIds, sortMode, liveInbox, storyCode]);

  const pending = useMemo(() => {
    const name = String(studentFilter || "").trim().toLowerCase();
    if (!name) return pendingAll;
    return pendingAll.filter(
      (s) => String(s.studentFirst || "").trim().toLowerCase() === name
    );
  }, [pendingAll, studentFilter]);

  const softPending = useMemo(() => {
    if (!storyCode || !storyBand?.cluster?.length) return [];
    const cluster = new Set(
      storyBand.cluster.map((n) => String(n).trim().toLowerCase())
    );
    const key = String(storyCode).trim().toUpperCase();
    return pendingAll.filter(
      (s) =>
        String(s.standard || "").trim().toUpperCase() === key &&
        cluster.has(String(s.studentFirst || "").trim().toLowerCase())
    );
  }, [pendingAll, storyCode, storyBand]);

  const softPendingCount = softPending.length;

  const done = useMemo(() => {
    const live = liveInbox.filter((s) => confirmedSet.has(s.id));
    const demo = DEMO_GRADING_SUBMISSIONS.filter((s) => confirmedSet.has(s.id));
    return [...live, ...demo];
  }, [confirmedSet, liveInbox]);

  const focused = useMemo(() => {
    if (!pending.length) return null;
    const hit = pending.find((s) => s.id === focusId);
    return hit || null;
  }, [pending, focusId]);

  useEffect(() => {
    setStudentFilter(studentParam);
  }, [studentParam]);

  // Deep link / soft arrive: focus + open depth for matching pending
  useEffect(() => {
    if (!hydrated) return;
    if (studentParam) {
      const name = studentParam.toLowerCase();
      const hit = pendingAll.find(
        (s) => String(s.studentFirst || "").trim().toLowerCase() === name
      );
      if (hit) {
        setFocusId(hit.id);
        setOpenId(hit.id);
      }
      return;
    }
    if (!storyCode || !softPendingCount) return;
    if (openId) return;
    const hit = softPending[0];
    if (hit) setFocusId(hit.id);
    // Soft arrive focuses list position only — depth stays closed on glance
  }, [
    hydrated,
    studentParam,
    storyCode,
    softPendingCount,
    pendingAll,
    softPending,
    openId,
  ]);

  useEffect(() => {
    if (focused && openId === focused.id) {
      /* keep adjusting state for open depth */
    } else if (openId && !pending.find((s) => s.id === openId)) {
      setOpenId(null);
      setAdjusting(false);
      setDraftScore(null);
    }
  }, [focused?.id, openId, pending]); // eslint-disable-line react-hooks/exhaustive-deps

  const persist = useCallback((ids) => {
    setConfirmedIds(ids);
    saveConfirmedIds(ids);
  }, []);

  const confirmItem = useCallback(
    (item, scoreOverride) => {
      if (!item) return;
      const next = [...confirmedIds, item.id];
      persist(next);
      try {
        noteEvidenceFromGradeConfirm(item);
      } catch {
        /* ignore */
      }
      const stamped = stampTeacherCheckedFromSubmission(item);
      const score = scoreOverride != null ? scoreOverride : item.samScore;
      const stampNote = stamped.length ? " · stamped on My Day." : ".";
      setToast({
        text: `Confirmed ${item.studentFirst} · ${score}/${item.maxScore}. You're the scorer of record${stampNote}`,
        growthHref: REPORTS_HREF,
        growthLabel: "See growth →",
        myDayHref: stamped.length
          ? studentMyDayHref({
              student: item.studentFirst,
              standard: item.standard,
            })
          : null,
        myDayLabel: "See My Day",
      });
      setAdjusting(false);
      setDraftScore(null);
      setOpenId(null);
      // Advance focus to next soft / next pending
      const remaining = pending.filter((s) => s.id !== item.id);
      const softIds = new Set(
        softPending.filter((sp) => sp.id !== item.id).map((sp) => sp.id)
      );
      const nextSoft = remaining.find((s) => softIds.has(s.id));
      const nextItem = nextSoft || remaining[0] || null;
      setFocusId(nextItem ? nextItem.id : null);
    },
    [confirmedIds, persist, pending, softPending]
  );

  const skipCurrent = useCallback(() => {
    const cur = focused || pending.find((s) => s.id === openId);
    if (!cur || pending.length < 2) {
      setToast({ text: "Nothing else waiting — take a breath." });
      return;
    }
    const idx = pending.findIndex((s) => s.id === cur.id);
    const next = pending[(idx + 1) % pending.length];
    setFocusId(next.id);
    setOpenId(next.id);
    setAdjusting(false);
    setDraftScore(null);
    setToast({ text: `Skipped for now — ${next.studentFirst} is up.` });
  }, [focused, pending, openId]);

  const openDepth = useCallback((id) => {
    setFocusId(id);
    setOpenId((prev) => (prev === id ? null : id));
    setAdjusting(false);
    setDraftScore(null);
  }, []);

  const jumpToSoftConfirm = useCallback(() => {
    const hit = softPending[0] || pending[0];
    if (!hit) return;
    setFocusId(hit.id);
    setOpenId(hit.id);
    setAdjusting(false);
    setDraftScore(null);
    try {
      document.getElementById("gi-who")?.scrollIntoView({ behavior: "smooth", block: "start" });
    } catch {
      /* ignore */
    }
  }, [softPending, pending]);

  // Keyboard: Enter confirm, S skip, C change — only when depth is open
  useEffect(() => {
    function onKey(e) {
      if (
        e.target &&
        (e.target.tagName === "INPUT" ||
          e.target.tagName === "SELECT" ||
          e.target.tagName === "TEXTAREA")
      )
        return;
      const item = pending.find((s) => s.id === openId);
      if (!item) return;
      if (e.key === "Enter" && !adjusting) {
        e.preventDefault();
        confirmItem(item);
      } else if (e.key === "s" || e.key === "S") {
        e.preventDefault();
        skipCurrent();
      } else if (e.key === "c" || e.key === "C") {
        e.preventDefault();
        setAdjusting(true);
        setDraftScore(item.samScore);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [adjusting, confirmItem, skipCurrent, openId, pending]);

  const pendingCount = hydrated ? pending.length : getPendingCount();
  const checkInsWaiting = hydrated ? whoNeedsCount > 0 : false;

  const whoLine =
    storyBand?.whoLine ||
    (softPending.length
      ? softPending
          .map((s) => s.studentFirst)
          .filter((n, i, a) => a.indexOf(n) === i)
          .slice(0, 3)
          .join(" · ")
      : null);

  const classStory = storyBand?.line
    ? storyBand.line
    : pendingCount === 0
      ? allClear
        ? "Clear for now — soft stories landed. Soft cluster still findable on Reports."
        : "Nothing waiting. Nice work — you are caught up."
      : pendingCount === 1
        ? "One confirm waiting — SAM gave a first read."
        : `${pendingCount} confirms waiting — SAM gave a first read.`;

  const softDoors =
    softOpen && storyBand?.cluster?.length
      ? softClusterDoors(storyBand.cluster, {
          standard: storyCode,
        })
      : [];

  const softReportHref = storyBand?.href || REPORTS_HREF;
  const softReportLabel = storyCode ? `${storyCode} report` : "Reports";
  const checkInsHref =
    storyBand?.checkInsHref ||
    (storyCode ? checkInsHrefForStandard(storyCode) : "/v2/teacher/check-ins");

  const standardMeta = standardParam
    ? storyBand?.soft
      ? `You're clear on · TEKS ${standardParam}`
      : `Because of · TEKS ${standardParam}`
    : null;

  const confirmLabel = whoLine
    ? softPendingCount > 0
      ? `Confirm · ${whoLine.split(" · ").slice(0, 2).join(" · ")}`
      : `Confirm · ${whoLine.split(" · ")[0]}`
    : softPendingCount > 0
      ? "Confirm soft cluster"
      : pendingCount > 0
        ? "Confirm next"
        : null;

  const btnBase = {
    borderRadius: 999,
    padding: "9px 14px",
    fontWeight: 800,
    fontSize: 13,
    textDecoration: "none",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "inherit",
    cursor: "pointer",
    border: "none",
  };
  const amberPrimary = {
    background: GLANCE.needsYou.bg,
    color: GLANCE.needsYou.fg,
    border: `1px solid ${GLANCE.needsYou.border}`,
  };
  const softPrimary = {
    background: "rgba(243,238,255,.88)",
    color: LAVENDER,
    border: `1px solid ${LINE}`,
  };
  const calmSecondary = {
    background: GLANCE.ready.bg,
    color: GLANCE.ready.fg,
    border: `1px solid ${GLANCE.ready.border}`,
  };
  const quietTertiary = {
    color: MUTED,
    background: "rgba(255,255,255,.88)",
    border: `1px solid ${LINE}`,
    fontWeight: 700,
  };

  return (
    <StationShell active="check">
      <style>{`
        .gi-wrap{max-width:960px;margin:0 auto;width:100%}
        .gi-story{
          margin-top:10px;padding:10px 12px;border-radius:12px;
          background:rgba(243,238,255,.45);border:1px solid ${LINE};
        }
        .gi-actions{
          margin-top:12px;display:flex;flex-wrap:wrap;gap:8px;align-items:center;
        }
        .gi-who{
          display:grid;gap:10px;margin-top:10px;
        }
      `}</style>
      <TeacherSubnav
        active="grading"
        gradeCount={pendingCount}
        checkInsCount={whoNeedsCount}
      />
      <div className="gi-wrap">
        <Glass style={{ padding: "16px 16px 14px" }}>
          {/* Title · short hierarchy */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              flexWrap: "wrap",
              alignItems: "flex-start",
            }}
          >
            <div style={{ minWidth: 0, flex: "1 1 220px" }}>
              <h1
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  margin: 0,
                  fontSize: 22,
                  fontWeight: 700,
                  color: INK,
                  letterSpacing: -0.2,
                  lineHeight: 1.25,
                }}
              >
                Grading
              </h1>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: 11,
                  fontWeight: 600,
                  color: MUTED,
                  letterSpacing: 0.1,
                }}
              >
                SAM first read · you confirm
                {" · "}
                {pendingCount === 0
                  ? storyBand?.soft || allClear
                    ? "Clear for now"
                    : "Caught up"
                  : pendingCount === 1
                    ? "Needs a look · 1"
                    : `Needs a look · ${pendingCount}`}
                {standardMeta ? ` · ${standardMeta}` : ""}
                {studentFilter ? ` · Focus · ${studentFilter}` : ""}
              </p>
              {studentFilter ? (
                <button
                  type="button"
                  onClick={() => setStudentFilter("")}
                  style={{
                    marginTop: 6,
                    border: "none",
                    background: "transparent",
                    color: LAVENDER,
                    fontWeight: 700,
                    fontSize: 12,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    padding: 0,
                    textDecoration: "underline",
                    textUnderlineOffset: 2,
                  }}
                >
                  Clear student focus
                </button>
              ) : null}
            </div>
          </div>

          {/* Compact class story — not a hero essay / CTA twin */}
          <section className="gi-story" aria-label="Soft story">
            <p
              style={{
                margin: 0,
                fontFamily: "'Poppins', sans-serif",
                fontSize: 13,
                fontWeight: 500,
                color: INK,
                lineHeight: 1.45,
              }}
            >
              {classStory}
            </p>
          </section>

          {/* One clear next-move row — no stacked CTA chrome */}
          <div className="gi-actions" aria-label="Next move">
            {pendingCount > 0 && confirmLabel ? (
              <button
                type="button"
                onClick={jumpToSoftConfirm}
                style={{
                  ...btnBase,
                  ...(checkInsWaiting ? softPrimary : softPrimary),
                }}
                title={
                  softPendingCount > 0
                    ? `Open soft cluster confirm · ${whoLine || "soft"}`
                    : "Open next confirm"
                }
              >
                {confirmLabel} →
              </button>
            ) : (
              <Link
                href={softReportHref}
                style={{ ...btnBase, ...calmSecondary }}
                title="Clear for now — soft cluster still findable on Reports"
              >
                {softReportLabel} →
              </Link>
            )}

            {checkInsWaiting ? (
              <Link
                href={checkInsHref}
                style={{ ...btnBase, ...amberPrimary }}
                title="Open Check-ins — live waiting needs you"
              >
                {checkInsCtaLabel(whoNeedsCount)} →
              </Link>
            ) : (
              <Link
                href={checkInsHref}
                style={{ ...btnBase, ...quietTertiary }}
                title="Same soft story — sit when someone flags"
              >
                Check-ins
              </Link>
            )}

            {pendingCount > 0 && softOpen ? (
              <Link
                href={softReportHref}
                style={{ ...btnBase, ...quietTertiary }}
                title={`Softest report · TEKS ${storyCode || ""}`}
              >
                {softReportLabel} →
              </Link>
            ) : null}

            <Link
              href="/v2/teacher/day?d=2"
              style={{ ...btnBase, ...quietTertiary }}
              title="Back to Daily Focus"
            >
              ← Daily Focus
            </Link>
          </div>

          {/* Main scan — who / work that needs a confirm */}
          <section id="gi-who" aria-label="Who needs a confirm" style={{ marginTop: 16 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 8,
                flexWrap: "wrap",
                alignItems: "baseline",
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: 0.35,
                  color: MUTED,
                  textTransform: "uppercase",
                  paddingLeft: 2,
                }}
              >
                Who needs a confirm · soft cluster
              </div>
              <div style={{ display: "inline-flex", gap: 6, alignItems: "center" }}>
                {[
                  { key: "oldest", label: "Oldest" },
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
                        background: "transparent",
                        color: on ? LAVENDER : MUTED,
                        fontWeight: on ? 800 : 600,
                        fontSize: 11,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        padding: "2px 4px",
                        textDecoration: on ? "underline" : "none",
                        textUnderlineOffset: 2,
                      }}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="gi-who">
              {/* Soft cluster glance card — who + code without a click */}
              {(softOpen || softPendingCount > 0) && storyCode ? (
                <article
                  style={{
                    display: "flex",
                    gap: 0,
                    alignItems: "stretch",
                    background: softOpen
                      ? "rgba(255,248,240,.92)"
                      : "rgba(255,255,255,.94)",
                    border: softOpen
                      ? `1px solid ${GLANCE.needsYou.border}`
                      : `1px solid ${LINE}`,
                    borderRadius: 14,
                    overflow: "hidden",
                    minHeight: 80,
                  }}
                >
                  <span
                    aria-hidden
                    style={{
                      width: 5,
                      flexShrink: 0,
                      background:
                        subjectMeta(
                          loopSoftest?.softest?.subject ||
                            softPending[0]?.subject ||
                            "science"
                        ).color || LAVENDER,
                      opacity: 0.9,
                    }}
                  />
                  <div
                    style={{
                      flex: 1,
                      minWidth: 0,
                      padding: "11px 12px 12px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 6,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        gap: 8,
                        alignItems: "flex-start",
                      }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 10,
                            fontWeight: 800,
                            color: MUTED,
                            textTransform: "uppercase",
                            letterSpacing: 0.2,
                          }}
                        >
                          Soft cluster ·{" "}
                          {
                            subjectMeta(
                              loopSoftest?.softest?.subject ||
                                softPending[0]?.subject ||
                                "science"
                            ).name
                          }{" "}
                          · {storyCode}
                        </div>
                        <div
                          style={{
                            marginTop: 3,
                            fontWeight: 700,
                            color: INK,
                            fontSize: 14,
                            lineHeight: 1.3,
                          }}
                        >
                          {loopSoftest?.softest?.plain ||
                            softPending[0]?.assignment ||
                            "Confirm when you've looked"}
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          ...glanceChipStyle(
                            softOpen || softPendingCount > 0 ? "needsYou" : "ready"
                          ),
                          borderRadius: 999,
                          padding: "4px 8px",
                          flexShrink: 0,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {storyBand?.soft
                          ? "Landed"
                          : storyBand?.readiness || "Needs a look"}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: MUTED,
                        lineHeight: 1.35,
                      }}
                    >
                      {softDoors.length ? (
                        <>
                          {softDoors.map((d, i) => (
                            <span key={d.name}>
                              {i > 0 ? " · " : ""}
                              <button
                                type="button"
                                onClick={() => {
                                  const hit = pendingAll.find(
                                    (s) =>
                                      String(s.studentFirst || "")
                                        .trim()
                                        .toLowerCase() ===
                                        String(d.name).trim().toLowerCase() &&
                                      String(s.standard || "")
                                        .trim()
                                        .toUpperCase() ===
                                        String(storyCode).trim().toUpperCase()
                                  );
                                  if (hit) {
                                    openDepth(hit.id);
                                  } else if (d.href) {
                                    window.location.href = d.href;
                                  }
                                }}
                                title={`Confirm ${d.name} · soft TEKS ${storyCode}`}
                                style={{
                                  color: LAVENDER,
                                  fontWeight: 800,
                                  background: "none",
                                  border: "none",
                                  borderBottom: `1px dashed ${LINE}`,
                                  padding: 0,
                                  cursor: "pointer",
                                  fontFamily: "inherit",
                                  fontSize: 12,
                                }}
                              >
                                {d.name}
                              </button>
                            </span>
                          ))}
                        </>
                      ) : (
                        whoLine || "Soft cluster"
                      )}
                      {softPendingCount > 0 ? (
                        <span style={{ color: MUTED, fontWeight: 600 }}>
                          {" "}
                          · {softPendingCount} soft confirm
                          {softPendingCount === 1 ? "" : "s"} up first
                        </span>
                      ) : null}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 10,
                        alignItems: "center",
                        alignSelf: "flex-start",
                      }}
                    >
                      <Link
                        href={softReportHref}
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: LAVENDER,
                          textDecoration: "none",
                        }}
                        title={`Depth · report · ${storyCode}`}
                      >
                        Open report →
                      </Link>
                      <Link
                        href={familyNoteSoftStoryHref({
                          standard: storyCode,
                          subject: "science",
                        })}
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: MUTED,
                          textDecoration: "none",
                        }}
                        title={`Family note · ${storyCode} soft story · Sofia · Noah · Diego`}
                      >
                        Family note →
                      </Link>
                    </div>
                  </div>
                </article>
              ) : null}

              {pending.length === 0 && (
                <div
                  role="status"
                  style={{
                    borderRadius: 14,
                    padding: "18px 16px",
                    color: INK,
                    background: GLANCE.ready.bg,
                    border: `1px solid ${GLANCE.ready.border}`,
                    textAlign: "left",
                  }}
                >
                  <div style={{ fontWeight: 800, fontSize: 14, lineHeight: 1.3 }}>
                    {studentFilter
                      ? `No pending for ${studentFilter}`
                      : storyBand?.soft || allClear
                        ? "Mostly clear right now"
                        : "All clear"}
                  </div>
                  <div
                    style={{
                      color: MUTED,
                      fontSize: 13,
                      lineHeight: 1.45,
                      marginTop: 4,
                    }}
                  >
                    {studentFilter
                      ? "Nothing waiting for this student — head back when you are ready."
                      : storyBand?.soft || allClear
                        ? "Clear for now — soft stories landed. Soft cluster still findable on Reports."
                        : "Nothing waiting. Soft cluster still findable on Reports."}
                  </div>
                </div>
              )}

              {/* Compact pending rows — name + work on glance; evidence on expand */}
              {pending.map((s) => {
                const sub = subjectMeta(s.subject);
                const isOpen = openId === s.id;
                const isSoftRow =
                  Boolean(storyCode) &&
                  String(s.standard || "").trim().toUpperCase() ===
                    String(storyCode).trim().toUpperCase() &&
                  (storyBand?.cluster || [])
                    .map((n) => String(n).trim().toLowerCase())
                    .includes(
                      String(s.studentFirst || "").trim().toLowerCase()
                    );
                return (
                  <article
                    key={s.id}
                    style={{
                      borderRadius: 14,
                      padding: "12px 14px",
                      background: isSoftRow
                        ? "rgba(255,248,240,.92)"
                        : "rgba(255,255,255,.94)",
                      border: isSoftRow
                        ? `1px solid ${GLANCE.needsYou.border}`
                        : `1px solid ${LINE}`,
                      outline: isOpen
                        ? `2px solid ${LAVENDER}`
                        : isSoftRow
                          ? undefined
                          : undefined,
                      outlineOffset: isOpen ? 2 : undefined,
                      boxShadow: isOpen
                        ? "0 8px 22px rgba(46,36,89,.10)"
                        : "none",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => openDepth(s.id)}
                      aria-expanded={isOpen}
                      style={{
                        width: "100%",
                        textAlign: "left",
                        cursor: "pointer",
                        fontFamily: "inherit",
                        border: "none",
                        background: "transparent",
                        padding: 0,
                        color: INK,
                        display: "flex",
                        gap: 10,
                        alignItems: "stretch",
                      }}
                    >
                      <span
                        style={{
                          width: 5,
                          alignSelf: "stretch",
                          borderRadius: 4,
                          background: sub.color,
                          flexShrink: 0,
                        }}
                      />
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            gap: 8,
                            flexWrap: "wrap",
                            alignItems: "baseline",
                          }}
                        >
                          <span style={{ fontWeight: 800, fontSize: 14 }}>
                            <Link
                              href={
                                storyCode
                                  ? kidDoorHref(s.studentFirst, {
                                      standard: storyCode,
                                    })
                                  : kidGradingHref({
                                      studentFirst: s.studentFirst,
                                    })
                              }
                              onClick={(e) => e.stopPropagation()}
                              title={
                                storyCode
                                  ? `Open ${s.studentFirst} · soft story TEKS ${storyCode}`
                                  : `Open ${s.studentFirst}'s grades across subjects`
                              }
                              style={{
                                fontWeight: 800,
                                fontSize: 14,
                                color: INK,
                                textDecoration: "none",
                                borderBottom: `1px dashed ${LINE}`,
                              }}
                            >
                              {s.studentFirst}
                            </Link>
                          </span>
                          <span
                            style={{
                              fontSize: 11,
                              color: MUTED,
                              fontWeight: 600,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {formatSubmissionAgo(s)}
                            {" · "}
                            <span style={{ fontWeight: 800, color: INK }}>
                              {s.samScore}/{s.maxScore}
                            </span>
                          </span>
                        </div>
                        <div
                          style={{
                            fontSize: 13,
                            color: MUTED,
                            marginTop: 2,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {s.assignment}
                        </div>
                        <div
                          style={{
                            marginTop: 6,
                            display: "flex",
                            gap: 6,
                            flexWrap: "wrap",
                            alignItems: "center",
                          }}
                        >
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 800,
                              color: sub.color,
                              textTransform: "uppercase",
                            }}
                          >
                            {sub.name}
                          </span>
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 700,
                              color: MUTED,
                              background: SOFT_LAV,
                              borderRadius: 999,
                              padding: "2px 8px",
                            }}
                          >
                            {productLabel(s.product)}
                          </span>
                          {s.source === "live" && (
                            <span
                              style={{
                                fontSize: 11,
                                fontWeight: 800,
                                color: LAVENDER,
                                background: "#fff",
                                borderRadius: 999,
                                padding: "2px 8px",
                                border: `1px solid ${LINE}`,
                              }}
                            >
                              Just in
                            </span>
                          )}
                          {s.standard && (
                            <span
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                color: isSoftRow ? LAVENDER : MUTED,
                              }}
                            >
                              {isSoftRow ? `Soft · ${s.standard}` : s.standard}
                            </span>
                          )}
                          <span
                            style={{
                              marginLeft: "auto",
                              fontSize: 11,
                              fontWeight: 700,
                              color: LAVENDER,
                            }}
                          >
                            {isOpen ? "Hide ↑" : "Confirm →"}
                          </span>
                        </div>
                      </div>
                    </button>

                    {/* Depth only — evidence + SAM suggest + confirm */}
                    {isOpen ? (
                      <div style={{ marginTop: 12 }}>
                        <FocusCard
                          item={s}
                          adjusting={adjusting}
                          draftScore={draftScore}
                          setDraftScore={setDraftScore}
                          onConfirm={() =>
                            confirmItem(s, adjusting ? draftScore : undefined)
                          }
                          onChangeScore={() => {
                            setAdjusting(true);
                            setDraftScore(s.samScore);
                          }}
                          onSkip={skipCurrent}
                          onCancelAdjust={() => {
                            setAdjusting(false);
                            setDraftScore(null);
                          }}
                          storyCode={storyCode}
                        />
                      </div>
                    ) : null}
                  </article>
                );
              })}

              {done.length > 0 && (
                <div
                  style={{
                    marginTop: 4,
                    paddingTop: 10,
                    borderTop: `1px solid ${LINE}`,
                  }}
                >
                  <div
                    style={{
                      fontWeight: 800,
                      color: "#2FA36B",
                      fontSize: 11,
                      letterSpacing: 0.35,
                      textTransform: "uppercase",
                      padding: "0 2px 8px",
                    }}
                  >
                    Done · {done.length}
                  </div>
                  <div style={{ display: "grid", gap: 6 }}>
                    {done
                      .slice(-5)
                      .reverse()
                      .map((s) => (
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
                            href={kidGradingHref({
                              studentFirst: s.studentFirst,
                            })}
                            style={{
                              color: INK,
                              fontWeight: 800,
                              textDecoration: "none",
                              borderBottom: `1px dashed ${LINE}`,
                            }}
                            title={`Open ${s.studentFirst}'s grades across subjects`}
                          >
                            {s.studentFirst}
                          </Link>{" "}
                          · {s.assignment}
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </section>

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
                  title="Calm glance by standard — same soft story as Reports"
                >
                  {toast.growthLabel || "See growth →"}
                </Link>
              )}
            </div>
          )}
        </Glass>
      </div>
    </StationShell>
  );
}

function FocusCard({
  item,
  adjusting,
  draftScore,
  setDraftScore,
  onConfirm,
  onChangeScore,
  onSkip,
  onCancelAdjust,
  storyCode,
}) {
  const sub = subjectMeta(item.subject);
  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${LINE}`,
        borderRadius: 14,
        padding: "14px 14px 12px",
        boxShadow: "0 8px 20px rgba(139,108,255,.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 10,
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 800,
              color: sub.color,
              textTransform: "uppercase",
              letterSpacing: 0.4,
            }}
          >
            {sub.name} · {productLabel(item.product)}
            {item.standard ? ` · ${item.standard}` : ""}
          </div>
          <div style={{ color: MUTED, fontSize: 13, marginTop: 4 }}>
            {item.assignment} · submitted {formatSubmissionAgo(item)}
          </div>
          <div style={{ marginTop: 8 }}>
            <Link
              href={
                storyCode
                  ? kidDoorHref(item.studentFirst, { standard: storyCode })
                  : kidGradingHref({ studentFirst: item.studentFirst })
              }
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
        </div>
      </div>

      <div
        style={{
          marginTop: 12,
          background: SOFT_LAV,
          borderRadius: 12,
          padding: "10px 12px",
          border: `1px solid ${LINE}`,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 800,
            color: MUTED,
            letterSpacing: 0.4,
            marginBottom: 6,
          }}
        >
          STUDENT WORK
        </div>
        <p style={{ margin: 0, color: INK, fontSize: 14, lineHeight: 1.5 }}>
          {item.workSnippet}
        </p>
      </div>

      <div
        style={{
          marginTop: 10,
          background: CREAM,
          borderRadius: 12,
          padding: "10px 12px",
          border: `1px solid ${LINE}`,
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 800,
            color: "#8A6A20",
            letterSpacing: 0.4,
            marginBottom: 6,
          }}
        >
          SAM SUGGESTS
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontWeight: 800, fontSize: 20, color: INK }}>
            {item.samScore}/{item.maxScore}
          </span>
          <span style={{ color: INK, fontSize: 14, lineHeight: 1.4 }}>
            {item.samReason}
          </span>
        </div>
        <div style={{ marginTop: 6, fontSize: 12, color: MUTED }}>
          Suggestion only — you stay the scorer of record. Keys: Enter · C · S
        </div>
      </div>

      {adjusting && (
        <div
          style={{
            marginTop: 10,
            display: "flex",
            alignItems: "center",
            gap: 10,
            flexWrap: "wrap",
          }}
        >
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

      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
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
