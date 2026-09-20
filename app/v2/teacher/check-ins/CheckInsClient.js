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
  MINT,
  CREAM,
  GLANCE,
  glanceChipStyle,
  glanceCardStyle,
} from "../../../../components/v2/StationShell";
import { usePlanner } from "../../../../lib/v2/usePlanner";
import {
  GRADING_INBOX_HREF,
  GRADING_INBOX_KEY,
  GRADING_STORAGE_KEY,
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
  getLoopHonesty,
  REPORTS_HREF,
} from "../../../../lib/v2/demoLoopSeams";

/**
 * CI2.0 Check-ins — reteach / small-group stub. Route: /v2/teacher/check-ins.
 * 1–3 calm cards. Actions persist in localStorage; dismissed leave the list.
 * Departmentalized: same RoomCards / classFilter as Daily Focus (synced via usePlanner).
 */
export default function CheckInsClient() {
  const p = usePlanner();
  const searchParams = useSearchParams();
  const studentFocus = (searchParams?.get("student") || "").trim();
  const [choices, setChoices] = useState({});
  const [confirmedIds, setConfirmedIds] = useState([]);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState(null);

  // Quiet period sync — Reports spark / Family note deep links may pass ?period=.
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
    // Student deep-link (kid grading): include all periods so Kai/Riley still surface.
    const opts = focus
      ? { ...filterOpts, classFilter: "all", limit: null }
      : filterOpts;
    const raw =
      !hydrated || !p.hydrated
        ? getWhoNeedsMeCards({}, [], opts)
        : getWhoNeedsMeCards(choices, confirmedIds, opts);
    if (!focus) return raw;
    // Calm focus from kid grading: matching kid first (still show the rest)
    const hit = [];
    const rest = [];
    for (const c of raw) {
      if (String(c.studentFirst || "").trim().toLowerCase() === focus) hit.push(c);
      else rest.push(c);
    }
    const ordered = [...hit, ...rest];
    return focus ? ordered.slice(0, Math.max(3, hit.length || 0)) : ordered;
  }, [choices, confirmedIds, hydrated, p.hydrated, filterOpts, studentFocus]);

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
  const storyBand = useMemo(() => getCheckInsStoryBand(), []);
  const loopHonesty = useMemo(() => getLoopHonesty(), []);

  const act = useCallback((card, action) => {
    const next = recordWhoNeedsAction(card.id, action);
    setChoices(next);
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
  }, [selectedClass]);

  /** Mint a This Week tile via ci2.teacher.addedActivities (same as Library / Sunday). */
  const addToThisWeek = useCallback((card) => {
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
  }, [selectedClass]);

  const undoAddToWeek = useCallback(() => {
    if (!toast?.undoId) return;
    const ok = removeAddedActivity(toast.undoId);
    setToast({ text: ok ? "Undone — removed from This Week." : "Nothing to undo." });
  }, [toast]);

  return (
    <StationShell>
      <TeacherSubnav active="checkins" checkInsCount={cards.length} />
      <Glass>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", alignItems: "flex-start" }}>
          <div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", margin: 0, fontSize: 34, color: INK }}>
              Check-ins
            </h1>
            <div style={{ color: MUTED, marginTop: 2 }}>
              1–3 kids · calm look · not a spreadsheet
              {p.multiClass ? ` · ${periodLabel}` : ""}
            </div>
            <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <SetupSwitcher setupKey={p.setupKey} onChange={p.setSetupKey} />
              {!p.multiClass && <SingleRoomLabel cls={cls} setup={p.setup} />}
              {studentFocus ? (
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 800,
                    color: LAVENDER,
                    background: SOFT_LAV,
                    border: `1px solid ${LINE}`,
                    borderRadius: 999,
                    padding: "4px 12px",
                  }}
                  title="Focused from kid grading"
                >
                  Focus · {studentFocus}
                </span>
              ) : null}
              <span
                style={{
                  fontSize: 13,
                  fontWeight: 800,
                  ...glanceChipStyle(cards.length ? "needsYou" : "ready"),
                  borderRadius: 999,
                  padding: "5px 12px",
                }}
              >
                {cards.length === 0 ? "Mostly clear" : cards.length === 1 ? "Needs a look · 1" : `Needs a look · ${cards.length}`}
              </span>
              <Link
                href="/v2/teacher/day?d=2"
                style={{ fontSize: 13, fontWeight: 700, color: LAVENDER, textDecoration: "none" }}
              >
                ← Daily Focus
              </Link>
              <Link
                href="/v2/teacher"
                style={{ fontSize: 13, fontWeight: 700, color: LAVENDER, textDecoration: "none" }}
              >
                This Week →
              </Link>
              <Link
                href={GRADING_INBOX_HREF}
                style={{ fontSize: 13, fontWeight: 700, color: LAVENDER, textDecoration: "none" }}
              >
                Grading →
              </Link>
              <Link
                href={storyBand?.href || REPORTS_HREF}
                style={{ fontSize: 13, fontWeight: 700, color: LAVENDER, textDecoration: "none" }}
                title="Same soft cluster as Reports class story"
              >
                Reports · class story →
              </Link>
            </div>
            {loopHonesty ? (
              <div style={{ marginTop: 6, fontSize: 11, color: MUTED, fontWeight: 600 }}>
                {loopHonesty}
              </div>
            ) : null}
          </div>
        </div>

        {storyBand ? (
          <div
            style={{
              marginTop: 14,
              ...glanceCardStyle("ready"),
              borderRadius: 14,
              padding: "10px 14px",
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: 0.35, color: MUTED }}>
                {storyBand.title.toUpperCase()}
              </div>
              <div style={{ fontSize: 14, color: INK, marginTop: 2, lineHeight: 1.4 }}>
                {storyBand.line}
              </div>
            </div>
            <Link
              href={storyBand.href}
              style={{
                fontSize: 12,
                fontWeight: 800,
                color: LAVENDER,
                textDecoration: "none",
                whiteSpace: "nowrap",
                border: `1px solid ${LINE}`,
                background: "#fff",
                borderRadius: 999,
                padding: "6px 12px",
              }}
            >
              Open {storyBand.code || "Reports"} →
            </Link>
          </div>
        ) : null}

        {p.multiClass && (
          <RoomCards
            classes={p.setup.classes}
            selectedKey={selectedClass}
            onSelect={p.setClassFilter}
            setup={p.setup}
            needsByClass={needsByClass}
          />
        )}

        <section aria-label="Check-ins cards" style={{ marginTop: 18, display: "grid", gap: 12 }}>
          {cards.length === 0 && (
            <div
              role="status"
              style={{
                ...glanceCardStyle("ready"),
                borderRadius: 20,
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
              <div style={{ fontWeight: 800, fontSize: 17, lineHeight: 1.3 }}>
                {p.multiClass
                  ? `Mostly clear for ${periodLabel}`
                  : "Mostly clear right now"}
              </div>
              <div style={{ color: MUTED, fontSize: 14, lineHeight: 1.45, maxWidth: 380 }}>
                {p.multiClass
                  ? `Mostly clear for ${periodLabel}. Nothing waiting — soft cluster still lives on Reports if you want the skill story.`
                  : "Mostly clear. Nothing waiting — soft cluster still lives on Reports if you want the skill story."}
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
                href={storyBand?.href || REPORTS_HREF}
                style={{
                  border: `1px solid ${LINE}`,
                  background: "#fff",
                  color: LAVENDER,
                  borderRadius: 999,
                  padding: "10px 18px",
                  fontWeight: 800,
                  fontSize: 14,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                Reports · soft cluster →
              </Link>
              </div>
            </div>
          )}

          {cards.map((card) => {
            const sub = subjectMeta(card.subject);
            const needsYou = card.tone === "needs_you";
            const isFocused =
              Boolean(studentFocus) &&
              String(card.studentFirst || "").trim().toLowerCase() ===
                studentFocus.toLowerCase();
            const roomName =
              p.multiClass && card.periodId
                ? p.setup.classes.find((c) => c.key === card.periodId)?.name
                : null;
            const pendingGrade =
              hydrated ? findPendingForStudent(card.studentFirst, confirmedIds) : null;
            return (
              <article
                key={card.id}
                style={{
                  ...glanceCardStyle(needsYou ? "needsYou" : "ready"),
                  borderRadius: 18,
                  padding: "14px 16px",
                  boxShadow: isFocused
                    ? "0 10px 28px rgba(139,108,255,.18)"
                    : "0 8px 22px rgba(46,36,89,.08)",
                  outline: isFocused ? `2px solid ${LAVENDER}` : undefined,
                  outlineOffset: isFocused ? 2 : undefined,
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }}>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center", marginBottom: 4 }}>
                      <Link
                        href={kidGradingHref({ studentFirst: card.studentFirst })}
                        title={`Open ${card.studentFirst}'s grades across subjects`}
                        style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 20, color: INK, textDecoration: "none", borderBottom: `1px dashed ${LINE}` }}
                      >
                        {card.studentFirst}
                      </Link>
                      <span
                        style={{
                          fontSize: 12,
                          fontWeight: 800,
                          ...glanceChipStyle(needsYou ? "needsYou" : "ready"),
                          background: needsYou ? "rgba(255,255,255,.75)" : GLANCE.ready.bg,
                          borderRadius: 999,
                          padding: "3px 10px",
                        }}
                      >
                        {needsYou ? "Needs a look" : "Looking clear"}
                      </span>
                      {roomName && (
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: MUTED,
                            background: "#fff",
                            border: `1px solid ${LINE}`,
                            borderRadius: 999,
                            padding: "3px 10px",
                          }}
                        >
                          {roomName}
                        </span>
                      )}
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
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: MUTED, marginBottom: 4 }}>
                      {reasonLabel(card.reason)} · {card.assignment}
                    </div>
                    <div style={{ fontSize: 14, color: INK, lineHeight: 1.4 }}>{card.blurb}</div>
                    {card.nextHint && (
                      <div style={{ fontSize: 13, color: MUTED, marginTop: 6, lineHeight: 1.35 }}>
                        {card.nextHint}
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 14 }}>
                  <button
                    type="button"
                    onClick={() => act(card, "small_group")}
                    style={{
                      border: "none",
                      background: LAVENDER,
                      color: "#fff",
                      borderRadius: 999,
                      padding: "8px 14px",
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    Pull for small group
                  </button>
                  <button
                    type="button"
                    onClick={() => act(card, "reteach_tomorrow")}
                    style={{
                      border: `1px solid ${LAVENDER}`,
                      background: "#fff",
                      color: LAVENDER,
                      borderRadius: 999,
                      padding: "8px 14px",
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    Reteach tomorrow
                  </button>
                  <button
                    type="button"
                    onClick={() => addToThisWeek(card)}
                    style={{
                      border: `1px solid ${LINE}`,
                      background: "rgba(255,255,255,.9)",
                      color: INK,
                      borderRadius: 999,
                      padding: "8px 14px",
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    Add to This Week
                  </button>
                  <button
                    type="button"
                    onClick={() => act(card, "dismiss")}
                    style={{
                      border: `1px solid ${GLANCE.ready.border}`,
                      background: GLANCE.ready.bg,
                      color: GLANCE.ready.fg,
                      borderRadius: 999,
                      padding: "8px 14px",
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
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
                    style={{
                      border: `1px solid ${GLANCE.ready.border}`,
                      background: GLANCE.ready.bg,
                      color: GLANCE.ready.fg,
                      borderRadius: 999,
                      padding: "8px 14px",
                      fontWeight: 800,
                      fontSize: 13,
                      textDecoration: "none",
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    Family note
                  </Link>
                  {pendingGrade && (
                    <Link
                      href={gradingInboxHref({ studentFirst: card.studentFirst })}
                      title={`Open grading · ${pendingGrade.assignment}`}
                      style={{
                        border: `1px solid ${LINE}`,
                        background: "rgba(255,255,255,.9)",
                        color: INK,
                        borderRadius: 999,
                        padding: "8px 14px",
                        fontWeight: 700,
                        fontSize: 13,
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                      }}
                    >
                      Open grading
                    </Link>
                  )}
                </div>
              </article>
            );
          })}
        </section>

        {Object.keys(choices).length > 0 && (
          <div style={{ marginTop: 16, fontSize: 12, color: MUTED }}>
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