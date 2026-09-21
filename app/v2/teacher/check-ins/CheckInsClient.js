"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  StationShell,
  Glass,
  TeacherSubnav,
  SetupSwitcher,
  RoomCards,
  SingleRoomLabel,
  INK,
  MUTED,
  LINE,
  LAVENDER,
  SOFT_LAV,
  GLANCE,
  glanceChipStyle,
} from "../../../../components/v2/StationShell";
import { usePlanner } from "../../../../lib/v2/usePlanner";
import {
  GRADING_STORAGE_KEY,
  GRADING_INBOX_KEY,
  findPendingForStudent,
  gradingInboxHref,
  kidGradingHref,
  loadConfirmedIds,
  subjectMeta,
} from "../../../../lib/v2/demoGrading";
import {
  actionLabel,
  getWhoNeedsCountsByClass,
  getWhoNeedsMeCards,
  loadWhoNeedsChoices,
  pushCheckInToDailyFocus,
  pushCheckInToThisWeek,
  reasonLabel,
  recordWhoNeedsAction,
  WHO_NEEDS_ME_STORAGE_KEY,
} from "../../../../lib/v2/demoWhoNeedsMe";
import { removeAddedActivity } from "../../../../lib/v2/demoLibrary";
import { FAMILY_NOTE_HREF } from "../../../../lib/v2/demoFamilyNote";
import {
  getCheckInsStoryBand,
  REPORTS_HREF,
  checkInsStandardBanner,
  checkInsClusterHighlightActive,
  rememberSitWithCluster,
  getLoopSoftest,
  softClusterDoors,
  isLoopAllClear,
  isStandardResolved,
} from "../../../../lib/v2/demoLoopSeams";

/**
 * CI2.0 Check-ins glance — INTUITIVE · fewer clicks.
 * Top: quiet class story. Slim next-move row. Main: who waiting + soft cluster
 * with named kid doors. Depth (actions / evidence) on kid expand only.
 * Amber only when live waiting > 0. No Demo shout.
 * Preserves: ?standard= / ?period= / ?student=, soft resolve, remember, kid doors.
 */
export default function CheckInsClient() {
  const p = usePlanner();
  const searchParams = useSearchParams();
  const studentFocus = (searchParams?.get("student") || "").trim();
  const standardFocus = (searchParams?.get("standard") || "").trim();
  const [rememberTick, setRememberTick] = useState(0);
  const [choices, setChoices] = useState({});
  const [confirmedIds, setConfirmedIds] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState(null);
  const [openKidId, setOpenKidId] = useState(null);

  useEffect(() => {
    const bump = () => setRememberTick((n) => n + 1);
    window.addEventListener("ci2-loop-remember-updated", bump);
    window.addEventListener("storage", bump);
    return () => {
      window.removeEventListener("ci2-loop-remember-updated", bump);
      window.removeEventListener("storage", bump);
    };
  }, []);

  useEffect(() => {
    const period = (searchParams?.get("period") || "").trim();
    if (!period || period === "all") return;
    try {
      window.localStorage.setItem("ci2.teacher.classFilter", period);
    } catch {
      /* ignore */
    }
    if (typeof p.setClassFilter === "function") p.setClassFilter(period);
  }, [searchParams]); // period query only — setClassFilter is stable enough for demo

  const refresh = useCallback(() => {
    setChoices(loadWhoNeedsChoices());
    setConfirmedIds(loadConfirmedIds());
  }, []);

  useEffect(() => {
    refresh();
    setHydrated(true);
    const onStorage = (e) => {
      if (
        e.key === WHO_NEEDS_ME_STORAGE_KEY ||
        e.key === GRADING_STORAGE_KEY ||
        e.key === GRADING_INBOX_KEY
      ) {
        refresh();
      }
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", refresh);
    window.addEventListener("ci2-who-needs-updated", refresh);
    window.addEventListener("ci2-grading-updated", refresh);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", refresh);
      window.removeEventListener("ci2-who-needs-updated", refresh);
      window.removeEventListener("ci2-grading-updated", refresh);
    };
  }, [refresh]);

  useEffect(() => {
    if (!toast) return;
    const ms = toast.undoId ? 5600 : 2200;
    const t = setTimeout(() => setToast(null), ms);
    return () => clearTimeout(t);
  }, [toast]);

  const cls = p.setup.classes.find((c) => c.key === p.classFilter) || p.setup.classes[0];
  const selectedClass = p.classFilter === "all" ? p.setup.classes[0]?.key : p.classFilter;
  const filterOpts = useMemo(
    () => ({
      classFilter: selectedClass,
      inheritPeriodId: selectedClass || "A",
    }),
    [selectedClass]
  );

  const cards = useMemo(() => {
    void choices;
    void confirmedIds;
    const focus = studentFocus.toLowerCase();
    const stdFocus = standardFocus.trim();
    // Student or standard deep-link: include all periods so cluster kids still surface.
    const opts =
      focus || stdFocus
        ? { ...filterOpts, classFilter: "all", limit: null }
        : filterOpts;
    const raw =
      !hydrated || !p.hydrated
        ? getWhoNeedsMeCards({}, [], opts)
        : getWhoNeedsMeCards(choices, confirmedIds, opts);
    if (!focus && !stdFocus) return raw;

    const stdHit = [];
    const nameHit = [];
    const rest = [];
    for (const c of raw) {
      const nameMatch =
        focus &&
        String(c.studentFirst || "").trim().toLowerCase() === focus;
      const stdMatch =
        stdFocus &&
        String(c.standard || "").trim().toLowerCase() === stdFocus.toLowerCase();
      if (nameMatch) nameHit.push(c);
      else if (stdMatch) stdHit.push(c);
      else rest.push(c);
    }
    // Reason-you're-here first: named kid, then matching standard cluster, then others.
    const ordered = [...nameHit, ...stdHit, ...rest];
    const keep = Math.max(3, nameHit.length + stdHit.length || 0);
    return ordered.slice(0, keep);
  }, [choices, confirmedIds, hydrated, p.hydrated, filterOpts, studentFocus, standardFocus]);

  // Deep-link / focus opens the matching kid for actions (depth only).
  useEffect(() => {
    if (!studentFocus || !cards.length) return;
    const hit = cards.find(
      (c) =>
        String(c.studentFirst || "").trim().toLowerCase() ===
        studentFocus.toLowerCase()
    );
    if (hit) setOpenKidId(hit.id);
  }, [studentFocus, cards]);

  const needsByClass = useMemo(() => {
    const keys = p.setup.classes.map((c) => c.key);
    const base = {};
    for (const k of keys) base[k] = 0;
    if (!hydrated || !p.hydrated) return base;
    return {
      ...base,
      ...getWhoNeedsCountsByClass(keys, choices, confirmedIds),
    };
  }, [p.setup.classes, choices, confirmedIds, hydrated, p.hydrated]);

  const periodLabel = cls?.name || "this class";
  // rememberTick re-reads localStorage after sit/reteach / resolve
  void rememberTick;
  const storyBand = useMemo(
    () => getCheckInsStoryBand(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rememberTick]
  );
  const standardBanner = useMemo(
    () => checkInsStandardBanner(standardFocus),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [standardFocus, rememberTick]
  );
  const clusterHighlightOn = useMemo(
    () => checkInsClusterHighlightActive(standardFocus),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [standardFocus, rememberTick]
  );

  const loopSoftest =
    typeof window !== "undefined" ? getLoopSoftest() : null;
  const allClear =
    typeof window !== "undefined" ? isLoopAllClear() : false;
  const waiting = cards.length > 0;
  const softOpen =
    !allClear &&
    loopSoftest?.softest &&
    loopSoftest.urgency !== "cooled" &&
    !isStandardResolved(loopSoftest.softest.code);

  const softCode =
    standardFocus ||
    (softOpen && loopSoftest?.softest?.code) ||
    storyBand?.code ||
    null;

  const clusterCards = useMemo(() => {
    if (!softCode) return [];
    return cards.filter(
      (c) =>
        String(c.standard || "").trim().toLowerCase() ===
        String(softCode).toLowerCase()
    );
  }, [cards, softCode]);

  const softDoors = useMemo(() => {
    const names =
      clusterCards.length > 0
        ? clusterCards.map((c) => c.studentFirst).filter(Boolean)
        : softOpen && loopSoftest?.softest
          ? loopSoftest.softest.softCluster || []
          : [];
    if (!names.length) return [];
    return softClusterDoors(names, {
      standard: softCode || undefined,
      periodId: selectedClass,
      via: "checkins",
    });
  }, [clusterCards, softOpen, loopSoftest, softCode, selectedClass]);

  const whoLine =
    softDoors.length > 0
      ? softDoors.map((d) => d.name).join(" · ")
      : storyBand?.whoLine || null;

  const classStory = allClear
    ? storyBand?.line || "Clear for now — nothing soft nagging."
    : storyBand?.line ||
      (whoLine && softCode
        ? `${storyBand?.readiness || "Needs a look"} · ${whoLine} on TEKS ${softCode}.`
        : `Steady look for ${periodLabel}.`);

  const softReportHref = storyBand?.href || REPORTS_HREF;
  const softReportLabel = softCode ? `${softCode} report` : "Reports";

  const act = useCallback(
    (card, action) => {
      const next = recordWhoNeedsAction(card.id, action);
      setChoices(next);
      // Loop remember — sitting with soft cluster quiets the ?standard= banner on return.
      try {
        const code = String(card.standard || standardFocus || "").trim();
        if (code) {
          rememberSitWithCluster(code, {
            kidOpened: card.studentFirst,
            source: "check-ins",
          });
          setRememberTick((n) => n + 1);
        }
      } catch {
        /* ignore */
      }
      const name = card.studentFirst;
      if (action === "small_group" || action === "reteach_tomorrow") {
        const block = pushCheckInToDailyFocus(card, action, {
          periodId: card.periodId || selectedClass || "A",
        });
        const names = block?.studentNames?.join(" · ") || name;
        if (action === "small_group") {
          setToast({ text: `${names} · on Daily Focus · today · small group.` });
        } else {
          setToast({ text: `${names} · on Daily Focus · tomorrow · reteach.` });
        }
      } else {
        setToast({ text: `${name} · looks good. Cleared for now.` });
      }
    },
    [selectedClass, standardFocus]
  );

  /** Sit with the soft cluster — one click covers the glance next-move. */
  const sitWithCluster = useCallback(() => {
    const targets =
      clusterCards.length > 0
        ? clusterCards
        : cards.filter((c) => c.tone === "needs_you").slice(0, 3);
    if (!targets.length) return;
    const lead = targets[0];
    let block = null;
    for (const card of targets) {
      recordWhoNeedsAction(card.id, "small_group");
      // Merge each name into the same Focus block (day+period+kind).
      block = pushCheckInToDailyFocus(card, "small_group", {
        periodId: card.periodId || selectedClass || "A",
      });
    }
    setChoices(loadWhoNeedsChoices());
    try {
      const code = String(lead.standard || softCode || "").trim();
      if (code) {
        rememberSitWithCluster(code, {
          kidOpened: lead.studentFirst,
          source: "check-ins",
          names: targets.map((c) => c.studentFirst).filter(Boolean),
        });
        setRememberTick((n) => n + 1);
      }
    } catch {
      /* ignore */
    }
    const names =
      block?.studentNames?.join(" · ") ||
      targets.map((c) => c.studentFirst).filter(Boolean).join(" · ") ||
      lead.studentFirst;
    setToast({ text: `${names} · on Daily Focus · today · small group.` });
    setOpenKidId(null);
  }, [clusterCards, cards, softCode, selectedClass]);

  const addToThisWeek = useCallback(
    (card) => {
      const entry = pushCheckInToThisWeek(card, {
        periodId: card.periodId || selectedClass || "A",
      });
      if (!entry) return;
      const room =
        entry.classes !== "all" && Array.isArray(entry.classes)
          ? ` · period ${entry.classes[0]}`
          : "";
      setToast({
        text: `${card.studentFirst} · added to This Week${room}.`,
        undoId: entry.id,
      });
    },
    [selectedClass]
  );

  const undoAddToWeek = useCallback(() => {
    if (!toast?.undoId) return;
    const ok = removeAddedActivity(toast.undoId);
    setToast({ text: ok ? "Undone — removed from This Week." : "Nothing to undo." });
  }, [toast]);

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

  const sitLabel = whoLine
    ? `Sit · ${whoLine.split(" · ").slice(0, 2).join(" · ")}`
    : waiting
      ? `Sit · ${cards.length} waiting`
      : "Sit · clear";

  return (
    <StationShell>
      <style>{`
        .ci-wrap{max-width:960px;margin:0 auto;width:100%}
        .ci-story{
          margin-top:10px;padding:10px 12px;border-radius:12px;
          background:rgba(243,238,255,.45);border:1px solid ${LINE};
        }
        .ci-actions{
          margin-top:12px;display:flex;flex-wrap:wrap;gap:8px;align-items:center;
        }
        .ci-who{display:grid;gap:10px;margin-top:10px}
      `}</style>
      <TeacherSubnav active="checkins" checkInsCount={cards.length} />
      <div className="ci-wrap">
        <Glass style={{ padding: "16px 16px 14px" }}>
          {/* Title · setup — short hierarchy */}
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
                Check-ins
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
                1–3 kids · calm look
                {p.multiClass ? ` · ${periodLabel}` : ""}
                {" · "}
                {waiting
                  ? cards.length === 1
                    ? "Needs a look · 1"
                    : `Needs a look · ${cards.length}`
                  : allClear || storyBand?.allClear
                    ? "Clear for now"
                    : "Mostly clear"}
                {standardBanner ? ` · ${standardBanner.text}` : ""}
              </p>
              <div
                style={{
                  marginTop: 8,
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <SetupSwitcher setupKey={p.setupKey} onChange={p.setSetupKey} />
                {!p.multiClass && <SingleRoomLabel cls={cls} setup={p.setup} />}
              </div>
            </div>
          </div>

          {/* Compact class story — not a hero essay / CTA twin */}
          <section className="ci-story" aria-label="Class story">
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
          <div className="ci-actions" aria-label="Next move">
            {waiting && (softOpen || clusterCards.length > 0) ? (
              <button
                type="button"
                onClick={sitWithCluster}
                style={{ ...btnBase, ...(waiting ? amberPrimary : softPrimary) }}
                title={
                  whoLine
                    ? `Sit with soft cluster · ${whoLine}`
                    : "Sit with soft cluster · pull for small group today"
                }
              >
                {sitLabel} →
              </button>
            ) : waiting ? (
              <a
                href="#ci-who"
                style={{ ...btnBase, ...amberPrimary }}
                title="Who is waiting — sit below"
              >
                {sitLabel} →
              </a>
            ) : (
              <Link
                href={softReportHref}
                style={{ ...btnBase, ...calmSecondary }}
                title="Clear for now — soft cluster still findable on Reports"
              >
                {softReportLabel} →
              </Link>
            )}

            {waiting && softOpen ? (
              <Link
                href={softReportHref}
                style={{ ...btnBase, ...quietTertiary }}
                title={`Softest report · TEKS ${softCode || ""}`}
              >
                {softReportLabel} →
              </Link>
            ) : null}

            <Link
              href={gradingInboxHref({
                standard: softCode || storyBand?.code || undefined,
              })}
              style={{ ...btnBase, ...quietTertiary }}
              title="Same soft story — confirm when you've looked"
            >
              Grading
            </Link>

            <Link
              href="/v2/teacher/day?d=2"
              style={{ ...btnBase, ...quietTertiary }}
              title="Back to Daily Focus"
            >
              ← Daily Focus
            </Link>
          </div>

          {p.multiClass && (
            <div style={{ marginTop: 12 }}>
              <RoomCards
                classes={p.setup.classes}
                selectedKey={selectedClass}
                onSelect={p.setClassFilter}
                setup={p.setup}
                needsByClass={needsByClass}
              />
            </div>
          )}

          {/* Main scan — who is waiting, named without hunting */}
          <section id="ci-who" aria-label="Who is waiting" style={{ marginTop: 16 }}>
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
              Who is waiting · soft cluster
            </div>
            <div className="ci-who">
              {/* Soft cluster glance card — who + code without a click */}
              {(softOpen || clusterCards.length > 0) && softCode ? (
                <article
                  style={{
                    display: "flex",
                    gap: 0,
                    alignItems: "stretch",
                    background:
                      clusterHighlightOn || softOpen
                        ? "rgba(255,248,240,.92)"
                        : "rgba(255,255,255,.94)",
                    border:
                      clusterHighlightOn || softOpen
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
                          clusterCards[0]?.subject ||
                            loopSoftest?.softest?.subject ||
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
                          {subjectMeta(
                            clusterCards[0]?.subject ||
                              loopSoftest?.softest?.subject ||
                              "science"
                          ).name}{" "}
                          · {softCode}
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
                            clusterCards[0]?.assignment ||
                            "Needs a look"}
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          ...glanceChipStyle(
                            waiting || softOpen ? "needsYou" : "ready"
                          ),
                          borderRadius: 999,
                          padding: "4px 8px",
                          flexShrink: 0,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {standardBanner?.soft
                          ? "Landed"
                          : storyBand?.readiness ||
                            loopSoftest?.readiness ||
                            "Needs a look"}
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
                                  const card = cards.find(
                                    (c) =>
                                      String(c.studentFirst || "")
                                        .trim()
                                        .toLowerCase() ===
                                      String(d.name).trim().toLowerCase()
                                  );
                                  if (card) {
                                    setOpenKidId(
                                      openKidId === card.id ? null : card.id
                                    );
                                  }
                                }}
                                title={`Open ${d.name} · sit`}
                                style={{
                                  color: LAVENDER,
                                  fontWeight: 800,
                                  textDecoration: "none",
                                  borderBottom: `1px dashed ${LINE}`,
                                  background: "none",
                                  border: "none",
                                  borderBottomStyle: "dashed",
                                  borderBottomWidth: 1,
                                  borderBottomColor: LINE,
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
                    </div>
                    <Link
                      href={softReportHref}
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: LAVENDER,
                        textDecoration: "none",
                        alignSelf: "flex-start",
                      }}
                      title={`Depth · report · ${softCode}`}
                    >
                      Open report →
                    </Link>
                  </div>
                </article>
              ) : null}

              {cards.length === 0 && (
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
                    {p.multiClass
                      ? `Mostly clear for ${periodLabel}`
                      : "Mostly clear right now"}
                  </div>
                  <div
                    style={{
                      color: MUTED,
                      fontSize: 13,
                      lineHeight: 1.45,
                      marginTop: 4,
                    }}
                  >
                    {storyBand?.allClear || allClear
                      ? "Clear for now — soft stories landed. Soft cluster still findable on Reports."
                      : p.multiClass
                        ? `Nothing waiting for ${periodLabel}. Soft cluster still findable on Reports.`
                        : "Nothing waiting. Soft cluster still findable on Reports."}
                  </div>
                </div>
              )}

              {/* Compact kid rows — name + why on glance; actions on expand */}
              {cards.map((card) => {
                const sub = subjectMeta(card.subject);
                const needsYou = card.tone === "needs_you";
                const isFocused =
                  Boolean(studentFocus) &&
                  String(card.studentFirst || "").trim().toLowerCase() ===
                    studentFocus.toLowerCase();
                const isStandardCluster =
                  Boolean(standardFocus) &&
                  String(card.standard || "").trim().toLowerCase() ===
                    standardFocus.toLowerCase();
                const isReasonHere = isFocused || isStandardCluster;
                const isOpen = openKidId === card.id;
                const roomName =
                  p.multiClass && card.periodId
                    ? p.setup.classes.find((c) => c.key === card.periodId)?.name
                    : null;
                const pendingGrade =
                  hydrated
                    ? findPendingForStudent(card.studentFirst, confirmedIds)
                    : null;

                return (
                  <article
                    key={card.id}
                    style={{
                      borderRadius: 14,
                      padding: "12px 14px",
                      background: isReasonHere && clusterHighlightOn
                        ? "rgba(255,248,240,.92)"
                        : "rgba(255,255,255,.94)",
                      border:
                        isReasonHere && clusterHighlightOn
                          ? `1px solid ${GLANCE.needsYou.border}`
                          : `1px solid ${LINE}`,
                      outline:
                        isReasonHere && clusterHighlightOn
                          ? `2px solid ${LAVENDER}`
                          : isReasonHere
                            ? `1px dashed ${LINE}`
                            : undefined,
                      outlineOffset:
                        isReasonHere && clusterHighlightOn ? 2 : undefined,
                      boxShadow: isOpen
                        ? "0 8px 22px rgba(46,36,89,.10)"
                        : "none",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenKidId(isOpen ? null : card.id)
                      }
                      aria-expanded={isOpen}
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                        gap: 10,
                        flexWrap: "wrap",
                        alignItems: "flex-start",
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                        textAlign: "left",
                        fontFamily: "inherit",
                      }}
                    >
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div
                          style={{
                            display: "flex",
                            gap: 8,
                            flexWrap: "wrap",
                            alignItems: "center",
                            marginBottom: 2,
                          }}
                        >
                          <span
                            style={{
                              fontFamily: "'Poppins', sans-serif",
                              fontWeight: 800,
                              fontSize: 16,
                              color: INK,
                              borderBottom: `1px dashed ${LINE}`,
                            }}
                          >
                            {card.studentFirst}
                          </span>
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 800,
                              ...glanceChipStyle(
                                needsYou ? "needsYou" : "ready"
                              ),
                              borderRadius: 999,
                              padding: "3px 9px",
                            }}
                          >
                            {needsYou ? "Needs a look" : "Looking clear"}
                          </span>
                          {roomName ? (
                            <span
                              style={{
                                fontSize: 11,
                                fontWeight: 700,
                                color: MUTED,
                                background: "#fff",
                                border: `1px solid ${LINE}`,
                                borderRadius: 999,
                                padding: "3px 9px",
                              }}
                            >
                              {roomName}
                            </span>
                          ) : null}
                          <span
                            style={{
                              fontSize: 11,
                              fontWeight: 800,
                              color: sub.color,
                              textTransform: "uppercase",
                              letterSpacing: 0.3,
                            }}
                          >
                            {sub.name}
                            {card.standard ? ` · ${card.standard}` : ""}
                          </span>
                          {isStandardCluster && !isFocused ? (
                            <span
                              style={{
                                fontSize: 11,
                                fontWeight: 800,
                                color: LAVENDER,
                                background: SOFT_LAV,
                                border: `1px solid ${LINE}`,
                                borderRadius: 999,
                                padding: "3px 9px",
                              }}
                            >
                              Why you're here
                            </span>
                          ) : null}
                        </div>
                        <div
                          style={{
                            fontSize: 13,
                            fontWeight: 600,
                            color: MUTED,
                            lineHeight: 1.35,
                          }}
                        >
                          {reasonLabel(card.reason)} · {card.assignment}
                        </div>
                      </div>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: MUTED,
                          flexShrink: 0,
                          paddingTop: 4,
                        }}
                      >
                        {isOpen ? "Close" : "Sit →"}
                      </span>
                    </button>

                    {/* Depth panel — actions + blurb only when opened */}
                    {isOpen ? (
                      <div
                        style={{
                          marginTop: 12,
                          paddingTop: 12,
                          borderTop: `1px solid ${LINE}`,
                        }}
                      >
                        <div
                          style={{
                            fontSize: 14,
                            color: INK,
                            lineHeight: 1.4,
                          }}
                        >
                          {card.blurb}
                        </div>
                        {card.nextHint ? (
                          <div
                            style={{
                              fontSize: 13,
                              color: MUTED,
                              marginTop: 6,
                              lineHeight: 1.35,
                            }}
                          >
                            {card.nextHint}
                          </div>
                        ) : null}

                        <div
                          style={{
                            display: "flex",
                            gap: 8,
                            flexWrap: "wrap",
                            marginTop: 12,
                            alignItems: "center",
                          }}
                        >
                          <Link
                            href={kidGradingHref({
                              studentFirst: card.studentFirst,
                            })}
                            title={`Open ${card.studentFirst}'s grades`}
                            style={{ ...btnBase, ...quietTertiary }}
                          >
                            Open kid →
                          </Link>
                          <button
                            type="button"
                            onClick={() => act(card, "small_group")}
                            style={{ ...btnBase, ...softPrimary }}
                          >
                            Pull for small group
                          </button>
                          <button
                            type="button"
                            onClick={() => act(card, "reteach_tomorrow")}
                            style={{ ...btnBase, ...calmSecondary }}
                          >
                            Reteach tomorrow
                          </button>
                          <button
                            type="button"
                            onClick={() => addToThisWeek(card)}
                            style={{ ...btnBase, ...quietTertiary }}
                          >
                            Add to This Week
                          </button>
                          <button
                            type="button"
                            onClick={() => act(card, "dismiss")}
                            style={{ ...btnBase, ...calmSecondary }}
                          >
                            Looks good / dismiss
                          </button>
                          <Link
                            href={FAMILY_NOTE_HREF(card.id, {
                              periodId: card.periodId || selectedClass,
                            })}
                            title="Family note for this kid"
                            onClick={() => {
                              const pid = card.periodId || selectedClass;
                              if (pid && pid !== "all") p.setClassFilter(pid);
                            }}
                            style={{ ...btnBase, ...quietTertiary }}
                          >
                            Family note
                          </Link>
                          {pendingGrade ? (
                            <Link
                              href={gradingInboxHref({
                                studentFirst: card.studentFirst,
                              })}
                              title={`Open grading · ${pendingGrade.assignment}`}
                              style={{ ...btnBase, ...quietTertiary }}
                            >
                              Open grading
                            </Link>
                          ) : null}
                        </div>
                      </div>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </section>

          {Object.keys(choices).length > 0 && (
            <div style={{ marginTop: 14, fontSize: 11, color: MUTED }}>
              Stub choices saved in this browser
              {Object.keys(choices)
                .slice(0, 5)
                .map((id) => {
                  const c = choices[id];
                  return ` · ${actionLabel(c.action)}`;
                })
                .join("")}
              . Clear site data to reset.
            </div>
          )}
        </Glass>
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
            padding: "10px 18px",
            fontWeight: 700,
            fontSize: 14,
            boxShadow: "0 12px 32px rgba(46,36,89,.35)",
            zIndex: 50,
            maxWidth: "90vw",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <span>{toast.text}</span>
          {toast.undoId && (
            <button
              type="button"
              onClick={undoAddToWeek}
              style={{
                border: "1px solid rgba(255,255,255,.45)",
                background: "rgba(255,255,255,.12)",
                color: "#fff",
                borderRadius: 999,
                padding: "4px 12px",
                fontWeight: 800,
                fontSize: 13,
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Undo
            </button>
          )}
        </div>
      )}
    </StationShell>
  );
}
