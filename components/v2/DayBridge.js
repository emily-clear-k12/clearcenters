"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  Check,
  Clock3,
  Users,
  BookOpen,
  FlaskConical,
  Calculator,
  Globe2,
  Plus,
} from "lucide-react";
import SamIcon from "../SamIcon";
import {
  SUBJECTS,
  DAYS,
  DATES,
  DAY_NAMES,
  DEMO_TEACHER,
} from "../../lib/v2/demoWeek";
import {
  SetupSwitcher,
  HandsOffChip,
  ProvenanceHelperLine,
} from "./StationShell";
import { WeeksRunEntry } from "./HowMyWeeksRun";
import {
  focusBlockKindLabel,
  focusBlockNamesLine,
} from "../../lib/v2/demoWhoNeedsMe";
import {
  isStandardResolved,
  familyNoteSoftStoryHref,
  softStoryStudentDoorHref,
} from "../../lib/v2/demoLoopSeams";
import "./day-bridge.css";

const PROGRESS_KEY = "ci2.day.progress.v1";
const ICONS = {
  science: FlaskConical,
  math: Calculator,
  elar: BookOpen,
  social: Globe2,
  Plus,
};

export default function DayBridge({
  p,
  day,
  cls,
  selectedClass,
  agenda,
  minutes,
  waiting,
  whoNeedsCount,
  softOpen,
  loopSoftest,
  softDoors,
  checkInsDoor,
  gradingDoor,
  gradePending,
  softReportHref,
  focusBlocks,
  showProvenanceHelper,
  onDismissProvenanceHelper,
  provenanceText,
  onOpen,
  onTeach,
  onLesson,
  onDay,
}) {
  const [progress, setProgress] = useState({});
  const [ready, setReady] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);
  const context = `${p.setupKey}:${selectedClass}:${DATES[0]}:${day}`;
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}");
      if (saved && typeof saved === "object" && !Array.isArray(saved))
        setProgress(saved);
    } catch (_) {
      /* A fresh local day is safe if storage is unavailable. */
    }
    setReady(true);
  }, []);
  const entry = progress[context] || {};
  const done = Array.isArray(entry.done) ? entry.done : [];
  const current =
    agenda.find((a) => a.id === entry.current && !done.includes(a.id)) ||
    agenda.find((a) => !done.includes(a.id));
  const next = agenda.find((a) => !done.includes(a.id) && a.id !== current?.id);
  const SubjectIcon = ICONS[current?.subject] || BookOpen;
  function updateDay(nextEntry) {
    const updated = { ...progress, [context]: nextEntry };
    setProgress(updated);
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(updated));
      setSaveFailed(false);
    } catch (_) {
      setSaveFailed(true);
    }
  }
  function advance() {
    if (!current) return;
    updateDay({
      done: [...new Set([...done, current.id])],
      current: next?.id || null,
    });
  }
  const softSubject = loopSoftest?.softest?.subject;
  const inSubjects = p.setup.subjects.includes(softSubject);
  // Reports currently supplies a shared demo story; label its scope honestly.
  const reportScope = inSubjects
    ? "Reports overview"
    : "Across subjects · Reports overview";
  const subject = SUBJECTS[current?.subject];

  return (
    <div className="day-bridge">
      <header className="db-greeting db-surface">
        <div>
          <span className="db-eyebrow">YOUR TEACHING DAY</span>
          <h1>Hello, {DEMO_TEACHER.name}.</h1>
          <p>
            {DAY_NAMES[day]}, {DATES[day]}{" "}
            <span>
              · {cls?.name} · {minutes} min planned
            </span>
          </p>
        </div>
        <div className="db-setup">
          <SetupSwitcher setupKey={p.setupKey} onChange={p.setSetupKey} />
          <span className="db-muted">
            {p.published ? "Week published" : "Week not published yet"}
          </span>
        </div>
      </header>
      <div className="db-layout">
        <div className="db-teaching">
          <section
            className="db-hero db-surface"
            data-subject={current?.subject}
            aria-label="Current lesson"
          >
            <div className="db-periods" aria-label="Choose class">
              {p.setup.classes.map((c) => (
                <button
                  type="button"
                  key={c.key}
                  aria-pressed={selectedClass === c.key}
                  onClick={() => p.setClassFilter(c.key)}
                >
                  {c.name}
                  <span>{c.students} students</span>
                </button>
              ))}
            </div>
            {current ? (
              <>
                <div className="db-hero-content">
                  <div className="db-hero-copy">
                    <span className="db-now">NOW</span>
                    <p
                      className="db-subject"
                      style={{ color: "var(--subject-ink)" }}
                    >
                      {subject?.name}
                      {current.standard ? ` · ${current.standard}` : ""}
                    </p>
                    <h2 aria-live="polite">{current.title}</h2>
                    <div className="db-meta">
                      <span>
                        <Clock3 size={16} />
                        {current.minutes} min
                      </span>
                      <span>
                        <Users size={16} />
                        {current.who}
                      </span>
                    </div>
                    <p className="db-product">{current.product}</p>
                    <div className="db-hero-actions">
                      <button
                        type="button"
                        className="db-primary"
                        onClick={() =>
                          current.kind === "teach"
                            ? onTeach(current)
                            : onOpen(current.id)
                        }
                      >
                        <Play size={17} fill="currentColor" />
                        {current.kind === "teach"
                          ? "Teach live"
                          : "Open activity"}
                      </button>
                      <button
                        type="button"
                        className="db-link"
                        onClick={() =>
                          current.kind === "teach"
                            ? onLesson(current)
                            : onOpen(current.id)
                        }
                      >
                        {current.kind === "teach"
                          ? "View lesson"
                          : "View details"}
                        <ArrowRight size={16} />
                      </button>
                    </div>
                  </div>
                  <div
                    className={`db-lesson-art db-art-${current.subject}`}
                    aria-hidden="true"
                  >
                    <SubjectIcon strokeWidth={1.1} />
                    <span>{subject?.name}</span>
                  </div>
                </div>
                <div className="db-next">
                  <div>
                    <span className="db-eyebrow">
                      {next ? "UP NEXT" : "LAST ACTIVITY"}
                    </span>
                    <strong>{next?.title || "Ready to wrap up?"}</strong>
                    {next && (
                      <span>
                        {SUBJECTS[next.subject]?.name} · {next.minutes} min
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="db-link"
                    disabled={!ready}
                    onClick={advance}
                  >
                    {next ? "Start next lesson" : "Finish lesson"}
                    <ArrowRight size={17} />
                  </button>
                </div>
              </>
            ) : (
              <div className="db-empty">
                <Check size={34} />
                <h2>
                  {agenda.length
                    ? "Your planned lessons are complete."
                    : "Room for something great."}
                </h2>
                <p>
                  {agenda.length
                    ? "You can revisit any lesson in the timeline below."
                    : "Add an activity to begin planning this day."}
                </p>
                <button
                  type="button"
                  className="db-primary"
                  onClick={() => p.openAddActivity({ day })}
                >
                  Add assignment
                </button>
              </div>
            )}
          </section>
          <section className="db-timeline db-surface" aria-label="Day timeline">
            <div className="db-section-heading">
              <h2>Your day at a glance</h2>
              <span>
                {agenda.filter((a) => done.includes(a.id)).length} of{" "}
                {agenda.length} completed
              </span>
            </div>
            {p.multiSubject && (
              <div className="db-subjects" aria-label="Filter subjects">
                <button
                  type="button"
                  aria-pressed={p.subjectFilter === "all"}
                  onClick={() => p.setSubjectFilter("all")}
                >
                  All subjects
                </button>
                {p.setup.subjects.map((key) => (
                  <button
                    type="button"
                    key={key}
                    data-subject={key}
                    aria-pressed={p.subjectFilter === key}
                    onClick={() => p.setSubjectFilter(key)}
                  >
                    {SUBJECTS[key].name}
                  </button>
                ))}
              </div>
            )}
            <ol>
              {agenda.map((a) => {
                const status = done.includes(a.id)
                  ? "Completed"
                  : a.id === current?.id
                    ? "Now"
                    : a.id === next?.id
                      ? "Next"
                      : "Later";
                return (
                  <li key={a.id} data-status={status} data-subject={a.subject}>
                    <span className="db-timeline-dot" aria-hidden="true">
                      {status === "Completed" && <Check size={12} />}
                    </span>
                    <button
                      type="button"
                      className="db-timeline-item"
                      onClick={() => onOpen(a.id)}
                    >
                      <span className="db-status">{status}</span>
                      <span className="db-item-copy">
                        <strong>{a.title}</strong>
                        <span>
                          {SUBJECTS[a.subject]?.name} · {a.minutes} min ·{" "}
                          {a.who}
                          {a.standard ? ` · ${a.standard}` : ""}
                        </span>
                      </span>
                      <ArrowRight size={16} />
                    </button>
                    {status !== "Now" && (
                      <button
                        type="button"
                        className="db-resume"
                        disabled={!ready}
                        onClick={() =>
                          updateDay({
                            done: done.filter((id) => id !== a.id),
                            current: a.id,
                          })
                        }
                        aria-label={`${status === "Completed" ? "Revisit" : "Start"} ${a.title}`}
                      >
                        {status === "Completed" ? "Revisit" : "Start"}
                      </button>
                    )}
                  </li>
                );
              })}
            </ol>
            <p className="db-storage">
              {saveFailed
                ? "Progress is available for this visit; this browser could not save it."
                : "You control the pace. Lesson progress is saved in this browser."}
            </p>
          </section>
        </div>
        <aside className="db-sam db-surface" aria-label="SAM teacher briefing">
          <div className="db-sam-avatar">
            <SamIcon size={124} />
          </div>
          <span className="db-eyebrow">A MOMENT WITH SAM</span>
          <h2>{waiting ? "A quick check-in" : "A little perspective"}</h2>
          <p className="db-scope">
            {cls?.name} · {whoNeedsCount} check-ins waiting
          </p>
          {waiting && (
            <Link className="db-checkins" href={checkInsDoor}>
              Review {whoNeedsCount} check-ins
              <ArrowRight size={18} />
            </Link>
          )}
          <div className="db-report-brief">
            <span className="db-eyebrow">{reportScope}</span>
            {softOpen ? (
              <>
                <h3>{loopSoftest.softest.plain}</h3>
                <p>
                  {loopSoftest.softest.clusterHint ||
                    "Check the evidence to choose their next step."}
                </p>
                <div className="db-students">
                  {softDoors.map((d) => (
                    <Link key={d.name} href={d.href}>
                      {d.name}
                    </Link>
                  ))}
                </div>
                <Link className="db-link" href={softReportHref}>
                  Open report
                  <ArrowRight size={15} />
                </Link>
                <div className="db-care-links">
                  <Link
                    href={familyNoteSoftStoryHref({
                      standard: loopSoftest.softest.code,
                      periodId: selectedClass,
                      subject: softSubject,
                    })}
                  >
                    Family note
                  </Link>
                  <Link
                    href={softStoryStudentDoorHref({
                      standard: loopSoftest.softest.code,
                      periodId: selectedClass,
                    })}
                  >
                    My Day →
                  </Link>
                </div>
              </>
            ) : (
              <p>
                {
                  "The latest report has no unresolved learning concern. Open Reports to review the evidence."
                }
              </p>
            )}
          </div>
          {!waiting && (
            <Link className="db-link" href={checkInsDoor}>
              Open Check-ins
              <ArrowRight size={16} />
            </Link>
          )}
          <Link className="db-grading" href={gradingDoor}>
            <BookOpen size={20} />
            <span>
              Grading <small>{gradePending} to review · all classes</small>
            </span>
            <ArrowRight size={17} />
          </Link>
          {focusBlocks.length > 0 && (
            <section className="db-support" id="df-needs">
              <h3>Planned support</h3>
              {focusBlocks.map((b) => (
                <div key={b.id}>
                  <span className="db-eyebrow">
                    {focusBlockKindLabel(b.kind)}
                    {isStandardResolved(b.standard) ? " · covered" : ""}
                  </span>
                  <strong>{b.title}</strong>
                  <p>
                    {focusBlockNamesLine(b)}
                    {b.standard ? ` · ${b.standard}` : ""}
                  </p>
                </div>
              ))}
            </section>
          )}
        </aside>
      </div>
      <nav className="db-week db-surface" aria-label="Choose day">
        <div>
          {DAYS.map((label, i) => (
            <button
              type="button"
              key={label}
              aria-current={i === day ? "date" : undefined}
              onClick={() => onDay(i)}
            >
              {label} <strong>{DATES[i].split(" ")[1]}</strong>
            </button>
          ))}
        </div>
        <Link href="/v2/teacher">
          See entire week
          <ArrowRight size={16} />
        </Link>
        <button
          type="button"
          className="db-link"
          onClick={() => p.openAddActivity({ day })}
        >
          <Plus size={16} />
          Add assignment
        </button>
      </nav>
      <details className="db-planning db-surface">
        <summary>Planning & weekly routines</summary>
        <div>
          <HandsOffChip
            level={p.level}
            onOpenPreview={() => p.setShowSundayPreview(true)}
          />
          <WeeksRunEntry
            onOpen={() => p.setShowWeeksRun(true)}
            routineCount={p.enabledRoutineCount}
          />
          <button
            type="button"
            className="db-link"
            onClick={() => p.setShowSundayPreview(true)}
          >
            Sunday preview
          </button>
        </div>
      </details>
      <ProvenanceHelperLine
        show={showProvenanceHelper}
        onDismiss={onDismissProvenanceHelper}
        text={provenanceText}
      />
    </div>
  );
}
