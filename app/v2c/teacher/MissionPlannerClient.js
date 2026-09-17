"use client";

// Version C · Teacher · This Week — "Mission map + SAM-led planning" concept.
//
// Same foundation as Version B (lib/v2/usePlanner.js): same activities,
// suggestions, classes, moves and publishing. Only the experience differs:
// - The week is a bright space route. Each day is a planet sized by how much
//   is planned; subjects orbit it as colored moons; a beacon marks a day
//   where SAM has a suggestion.
// - SAM runs a short "mission briefing": one decision at a time (Yes / Not
//   now), flying the rocket to the day each suggestion is about.
// - Clicking a planet docks that day below the map. Activities can "fly" to
//   another day.
// - Publish becomes "Launch the week."
// Bright, not dark mode (Emily's standing preference).

import { useEffect, useState } from "react";
import SamIcon from "../../../components/SamIcon";
import V2TopBar from "../../../components/v2/V2TopBar";
import { Toast, LevelDrawer } from "../../../components/v2/weekKit";
import { usePlanner } from "../../../lib/v2/usePlanner";
import { SUBJECTS, DAYS, DAY_NAMES, DATES, KINDS, DEMO_WEEK, TEACHER_SETUPS } from "../../../lib/v2/demoWeek";

const INK = "#2A2350";
const MUTED = "#5E577F";
const PLANETS = [
  ["#FFB3D1", "#FF6FA0"],
  ["#B8E6FF", "#3DA5F5"],
  ["#FFE08A", "#F5A524"],
  ["#C9B8FF", "#8C52F2"],
  ["#A8F0D4", "#1FB88A"],
];
const KIND_ORDER = { teach: 0, work: 1, small: 2 };

function Pill({ active, onClick, children, color }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        borderRadius: 999,
        padding: "7px 14px",
        fontSize: 14,
        fontWeight: 700,
        fontFamily: "inherit",
        cursor: "pointer",
        color: active ? "#fff" : INK,
        background: active ? "linear-gradient(135deg, #8C52F2, #FF6FA0)" : "rgba(255,255,255,.9)",
        border: "none",
        boxShadow: active ? "0 6px 16px rgba(140,82,242,.35)" : "0 2px 8px rgba(80,60,150,.10)",
      }}
    >
      {color && <span style={{ width: 10, height: 10, borderRadius: 999, background: color }} />}
      {children}
    </button>
  );
}

function Planet({ index, minutes, subjects, beacon, selected, rocketHere, onClick }) {
  const [light, dark] = PLANETS[index];
  const size = Math.max(84, Math.min(128, 70 + minutes * 0.45));
  const orbit = size + 40;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      aria-label={`${DAY_NAMES[index]}: ${minutes} minutes planned${beacon ? ", SAM has a suggestion" : ""}`}
      className="c-planet-btn"
      style={{ background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit", position: "relative", padding: 0, width: "100%" }}
    >
      <div style={{ position: "relative", width: 172, maxWidth: "100%", height: 172, display: "grid", placeItems: "center", margin: "0 auto" }}>
        <div className="c-orbit" style={{ position: "absolute", width: orbit, height: orbit, borderRadius: "50%", border: "1.5px dashed rgba(140,82,242,.35)" }}>
          {subjects.map((s, i) => {
            const angle = (360 / subjects.length) * i - 90;
            return (
              <span
                key={s.key}
                title={s.name}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: 18,
                  height: 18,
                  marginTop: -9,
                  marginLeft: -9,
                  borderRadius: "50%",
                  background: s.color,
                  border: "2px solid #fff",
                  boxShadow: "0 2px 6px rgba(0,0,0,.15)",
                  transform: `rotate(${angle}deg) translate(${orbit / 2}px)`,
                }}
              />
            );
          })}
        </div>
        <div
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            background: `radial-gradient(circle at 32% 28%, #fff 0, ${light} 22%, ${dark} 100%)`,
            boxShadow: selected ? `0 0 0 5px #fff, 0 0 0 9px ${dark}, 0 18px 40px ${dark}66` : `0 14px 34px ${dark}55`,
            display: "grid",
            placeItems: "center",
            color: "#fff",
            textShadow: "0 1px 3px rgba(0,0,0,.3)",
            transition: "box-shadow .25s, transform .25s",
            transform: selected ? "scale(1.06)" : "none",
          }}
        >
          <div style={{ textAlign: "center", lineHeight: 1.1 }}>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 22 }}>{DAYS[index]}</div>
            <div style={{ fontSize: 12, fontWeight: 700 }}>{minutes} min</div>
          </div>
        </div>
        {beacon && (
          <span
            className="c-beacon"
            aria-hidden="true"
            style={{
              position: "absolute",
              top: 8,
              right: 16,
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: "#FF9F43",
              color: "#fff",
              fontWeight: 800,
              display: "grid",
              placeItems: "center",
            }}
          >
            !
          </span>
        )}
        {rocketHere && (
          <span className="c-rocket" aria-hidden="true" style={{ position: "absolute", top: -16, left: "50%", marginLeft: -20 }}>
            <SamIcon skinKey="cosmic" size={40} />
          </span>
        )}
      </div>
      <div style={{ textAlign: "center", fontSize: 13, color: MUTED, fontWeight: 600, marginTop: 2 }}>{DATES[index]}</div>
    </button>
  );
}

function Briefing({ p, current, clsName, onLaunch }) {
  const handledCount = Object.values(p.handled).filter(Boolean).length;
  const total = handledCount + p.openSuggestions.length;
  const pct = total === 0 ? 100 : Math.round((handledCount / total) * 100);

  return (
    <section
      aria-label="SAM mission briefing"
      style={{ background: "#fff", borderRadius: 28, padding: 22, boxShadow: "0 18px 50px rgba(140,82,242,.18)", display: "grid", gap: 14, alignContent: "start" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 58, height: 58, borderRadius: "50%", background: "linear-gradient(135deg, #EDE4FF, #FFE3F0)", display: "grid", placeItems: "center", flexShrink: 0 }}>
          <SamIcon skinKey="cosmic" size={44} />
        </div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1.5, color: "#8C52F2", textTransform: "uppercase" }}>Mission briefing</div>
          <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 20, color: INK }}>
            {p.published ? "Your week has launched!" : current ? "Good morning! A few quick checks." : "All systems go."}
          </div>
        </div>
      </div>

      <div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 700, color: MUTED }}>
          <span>Week readiness</span>
          <span>{p.published ? 100 : pct}%</span>
        </div>
        <div style={{ height: 10, borderRadius: 999, background: "#F1ECFF", marginTop: 6, overflow: "hidden" }}>
          <div style={{ width: `${p.published ? 100 : pct}%`, height: "100%", borderRadius: 999, background: "linear-gradient(90deg, #8C52F2, #FF6FA0)", transition: "width .4s" }} />
        </div>
      </div>

      {p.published ? (
        <p style={{ margin: 0, fontSize: 16, color: INK, lineHeight: 1.45 }}>
          Student work opens Monday at 7:00 AM for {p.classList}. I'll keep an eye on things and let you know what I notice.
        </p>
      ) : current ? (
        <div key={current.id} className="c-bubble" style={{ background: "#FAF7FF", borderRadius: 20, padding: 16, border: "1px solid #E9E1FB" }}>
          <div style={{ fontSize: 12, fontWeight: 800, color: "#9A4A00", textTransform: "uppercase", letterSpacing: 1 }}>
            Check {handledCount + 1} of {total} · {DAY_NAMES[current.day]} · {SUBJECTS[current.subject].name}
          </div>
          <p style={{ margin: "6px 0 14px", fontSize: 17, color: INK, lineHeight: 1.45 }}>{current.text(clsName)}</p>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button type="button" className="c-btn c-btn-primary" onClick={() => p.acceptSuggestion(current)}>
              Yes, {current.action.charAt(0).toLowerCase() + current.action.slice(1)}
            </button>
            <button type="button" className="c-btn" onClick={() => p.dismissSuggestion(current.id)}>
              Not now
            </button>
          </div>
        </div>
      ) : (
        <p style={{ margin: 0, fontSize: 16, color: INK, lineHeight: 1.45 }}>
          Every check is done. Look over any day on the map, then launch when you're ready.
        </p>
      )}

      {!p.published && (
        <button type="button" className="c-launch" onClick={onLaunch}>
          <span className="c-launch-icon" aria-hidden="true">🚀</span> Launch the week
        </button>
      )}
      <div style={{ fontSize: 12, color: MUTED, textAlign: "center" }}>For {p.classList} · student work opens Mon, Oct 6 at 7:00 AM</div>
      <button
        type="button"
        onClick={() => p.setShowLevels(true)}
        style={{ background: "transparent", border: "none", color: "#8C52F2", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", fontSize: 13 }}
      >
        {p.levelTitle} · Change
      </button>
    </section>
  );
}

function DayDock({ p, day }) {
  const acts = p.visible.filter((x) => x.day === day);
  return (
    <section aria-label={`${DAY_NAMES[day]} plan`} style={{ background: "#fff", borderRadius: 28, padding: 22, boxShadow: "0 18px 50px rgba(140,82,242,.14)" }}>
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
        <h2 style={{ margin: 0, fontFamily: "'Poppins', sans-serif", fontSize: 26, color: INK }}>
          Docked at {DAY_NAMES[day]} <span style={{ color: MUTED, fontWeight: 500, fontSize: 18 }}>{DATES[day]}</span>
        </h2>
        <span style={{ fontSize: 14, color: MUTED, fontWeight: 600 }}>{acts.reduce((m, x) => m + x.minutes, 0)} min planned · click any planet to dock there</span>
      </div>

      <div className="c-dock-grid">
        {p.shownSubjects.map((sk) => {
          const s = SUBJECTS[sk];
          const list = acts.filter((x) => x.subject === sk).sort((a, b) => KIND_ORDER[a.kind] - KIND_ORDER[b.kind]);
          return (
            <div key={sk} style={{ borderRadius: 22, padding: 14, background: `${s.color}12`, border: `2px solid ${s.color}33` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <span style={{ width: 14, height: 14, borderRadius: "50%", background: s.color }} />
                <strong style={{ color: INK, fontSize: 16 }}>{s.name}</strong>
              </div>
              {list.length === 0 ? (
                <div style={{ fontSize: 14, color: MUTED }}>Nothing planned today.</div>
              ) : (
                <div style={{ display: "grid", gap: 8 }}>
                  {list.map((a) => (
                    <div
                      key={a.id}
                      style={{
                        background: a.isNew ? "#EAFBF1" : "#fff",
                        borderRadius: 16,
                        padding: "10px 12px",
                        boxShadow: "0 3px 10px rgba(80,60,150,.08)",
                        border: a.isNew ? "2px solid #86E0A8" : "2px solid transparent",
                      }}
                    >
                      <div style={{ fontSize: 11, fontWeight: 800, color: s.color, textTransform: "uppercase", letterSpacing: 0.8 }}>
                        {KINDS[a.kind].label}
                        {p.routineIds.includes(a.id) && <span style={{ color: "#8C52F2" }}> · Routine</span>}
                      </div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: INK, lineHeight: 1.3 }}>{a.title}</div>
                      <div style={{ fontSize: 13, color: MUTED, marginTop: 2 }}>
                        {a.minutes} min · {a.who}
                        {a.classes !== "all" && p.setup.classes.length > 1
                          ? ` · ${p.setup.classes
                              .filter((c) => a.classes.includes(c.key))
                              .map((c) => c.name)
                              .join(", ")} only`
                          : ""}
                      </div>
                      <label style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, fontSize: 12, color: MUTED, fontWeight: 600 }}>
                        Fly to
                        <select
                          value={a.day}
                          onChange={(e) => p.moveTo(a.id, Number(e.target.value))}
                          style={{ borderRadius: 999, border: "1px solid #E6E1F5", padding: "3px 8px", fontFamily: "inherit", fontSize: 12, color: INK, background: "#fff" }}
                        >
                          {DAYS.map((d, i) => (
                            <option key={d} value={i}>
                              {DAY_NAMES[i]}
                            </option>
                          ))}
                        </select>
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function MissionPlannerClient() {
  const p = usePlanner();
  const [dockDay, setDockDay] = useState(0);
  const [launching, setLaunching] = useState(false);

  const current = p.openSuggestions[0] || null;
  const currentCls = current?.classKey ? p.setup.classes.find((c) => c.key === current.classKey) || p.setup.classes[0] : null;
  const clsName = currentCls && p.setup.classes.length > 1 ? currentCls.name : "";

  // Fly the rocket (and the dock) to the day SAM is asking about.
  useEffect(() => {
    if (current) setDockDay(current.day);
  }, [current?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const rocketDay = current ? current.day : dockDay;
  const shown = p.shownSubjects.map((k) => SUBJECTS[k]);

  function launch() {
    setLaunching(true);
    setTimeout(() => {
      setLaunching(false);
      p.publish();
    }, 900);
  }

  return (
    <div className="c-page">
      <V2TopBar active="plan" teacherName="Ms. Rivera" />
      <div className="c-sky">
        <div className="c-stars" aria-hidden="true" />
        <main style={{ position: "relative", maxWidth: 1400, margin: "0 auto", padding: "20px clamp(12px, 2.5vw, 32px) 90px" }}>
          {/* Sandbox-only: preview different teaching assignments */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 14 }}>
            <label
              style={{
                background: "rgba(255,255,255,.9)",
                border: "1px dashed #B9A6F5",
                borderRadius: 999,
                padding: "5px 6px 5px 14px",
                display: "flex",
                gap: 8,
                alignItems: "center",
                fontSize: 13,
                color: INK,
                flexWrap: "wrap",
              }}
            >
              <strong>Sandbox · Preview as:</strong>
              <select
                id="setup"
                value={p.setupKey}
                onChange={(e) => p.setSetupKey(e.target.value)}
                style={{ border: "1px solid #E6E1F5", borderRadius: 999, padding: "4px 10px", fontFamily: "inherit", fontSize: 13, color: INK, background: "#fff" }}
              >
                {Object.entries(TEACHER_SETUPS).map(([k, v]) => (
                  <option key={k} value={k}>
                    {v.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <header style={{ textAlign: "center", marginBottom: 8 }}>
            <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: 2, color: "#8C52F2", textTransform: "uppercase" }}>This week's mission</div>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "clamp(32px, 5vw, 52px)", margin: "4px 0 12px", color: INK, lineHeight: 1.05 }}>
              Week of {DEMO_WEEK.label}
            </h1>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
              {p.multiClass && (
                <>
                  <Pill active={p.classFilter === "all"} onClick={() => p.setClassFilter("all")}>
                    All my classes
                  </Pill>
                  {p.setup.classes.map((c) => (
                    <Pill key={c.key} active={p.classFilter === c.key} onClick={() => p.setClassFilter(c.key)}>
                      {c.name}
                    </Pill>
                  ))}
                </>
              )}
              {p.multiSubject &&
                [{ key: "all", name: "All subjects" }, ...p.setup.subjects.map((k) => SUBJECTS[k])].map((s) => (
                  <Pill key={s.key} active={p.subjectFilter === s.key} color={s.color} onClick={() => p.setSubjectFilter(s.key)}>
                    {s.name}
                  </Pill>
                ))}
            </div>
          </header>

          <div className="c-layout">
            <div style={{ display: "grid", gap: 18, alignContent: "start", minWidth: 0 }}>
              <section aria-label="Week map" className="c-map">
                <svg className="c-path" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true">
                  <path
                    d="M 60 70 C 160 10, 260 110, 400 60 S 640 10, 760 70 S 900 110, 950 60"
                    fill="none"
                    stroke="#C9B8FF"
                    strokeWidth="6"
                    strokeDasharray="4 14"
                    strokeLinecap="round"
                  />
                </svg>
                <div className="c-planets">
                  {DAYS.map((d, i) => {
                    const dayActs = p.visible.filter((x) => x.day === i);
                    const subjectsToday = shown.filter((s) => dayActs.some((x) => x.subject === s.key));
                    return (
                      <Planet
                        key={d}
                        index={i}
                        minutes={dayActs.reduce((m, x) => m + x.minutes, 0)}
                        subjects={subjectsToday}
                        beacon={p.openSuggestions.some((s) => s.day === i)}
                        selected={dockDay === i}
                        rocketHere={rocketDay === i && !p.published}
                        onClick={() => setDockDay(i)}
                      />
                    );
                  })}
                </div>
                <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", fontSize: 13, color: MUTED, fontWeight: 600 }}>
                  {shown.map((s) => (
                    <span key={s.key} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      <span style={{ width: 12, height: 12, borderRadius: "50%", background: s.color, border: "2px solid #fff" }} /> {s.name} moon
                    </span>
                  ))}
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                    <span style={{ width: 14, height: 14, borderRadius: "50%", background: "#FF9F43" }} /> SAM has a suggestion
                  </span>
                </div>
              </section>

              <DayDock p={p} day={dockDay} />
            </div>

            <div className="c-side">
              <Briefing p={p} current={current} clsName={clsName} onLaunch={launch} />
              <button
                type="button"
                onClick={() => p.setToast({ text: "Grading opens in the Check area in a later CI2.0 build." })}
                style={{
                  background: "rgba(255,255,255,.9)",
                  border: "none",
                  borderRadius: 999,
                  padding: "10px 16px",
                  color: "#8C52F2",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  boxShadow: "0 4px 14px rgba(80,60,150,.10)",
                }}
              >
                {DEMO_WEEK.gradingCount} to grade whenever you're ready →
              </button>
            </div>
          </div>
        </main>
      </div>

      {launching && (
        <div aria-hidden="true" className="c-liftoff">
          🚀
        </div>
      )}
      {p.showLevels && <LevelDrawer level={p.level} onChoose={p.setLevel} onClose={() => p.setShowLevels(false)} />}
      <Toast toast={p.toast} />

      <style>{`
        .c-page { min-height: 100vh; font-family: Inter, sans-serif; background: #F7F2FF; }
        .c-sky {
          position: relative; overflow: hidden; min-height: calc(100vh - 60px);
          background:
            radial-gradient(circle at 12% 18%, #FFE1EF 0, transparent 32%),
            radial-gradient(circle at 88% 12%, #D6F1FF 0, transparent 36%),
            radial-gradient(circle at 70% 85%, #FFF1CC 0, transparent 30%),
            linear-gradient(170deg, #F4EEFF 0%, #FDF9FF 55%, #FFF7EC 100%);
        }
        .c-stars {
          position: absolute; inset: 0; pointer-events: none; opacity: .6;
          background-image:
            radial-gradient(2px 2px at 20px 30px, #C9B8FF 50%, transparent 51%),
            radial-gradient(2px 2px at 90px 120px, #FFB3D1 50%, transparent 51%),
            radial-gradient(1.5px 1.5px at 160px 60px, #8CCBFF 50%, transparent 51%),
            radial-gradient(2px 2px at 230px 170px, #FFD36E 50%, transparent 51%);
          background-size: 260px 220px;
        }
        .c-layout { display: grid; grid-template-columns: minmax(0, 1fr) 360px; gap: 22px; align-items: start; margin-top: 18px; }
        .c-side { display: grid; gap: 12px; position: sticky; top: 16px; }
        .c-map { position: relative; background: rgba(255,255,255,.55); border-radius: 32px; padding: 18px 10px 16px; box-shadow: inset 0 0 0 2px rgba(255,255,255,.8); backdrop-filter: blur(4px); }
        .c-path { position: absolute; left: 3%; top: 50px; width: 94%; height: 110px; }
        .c-planets { position: relative; display: grid; grid-template-columns: repeat(5, minmax(0, 1fr)); gap: 4px; margin-bottom: 10px; }
        .c-planet-btn:focus-visible { outline: 3px solid #8C52F2; outline-offset: 4px; border-radius: 24px; }
        .c-orbit { animation: c-spin 40s linear infinite; }
        .c-rocket { animation: c-bob 2.4s ease-in-out infinite; }
        .c-beacon { animation: c-pulse 1.8s ease-in-out infinite; }
        .c-bubble { animation: c-pop .35s ease-out; }
        .c-dock-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; margin-top: 14px; }
        .c-btn { border: 2px solid #E6E1F5; background: #fff; color: #2A2350; border-radius: 999px; padding: 10px 18px; font-weight: 800; font-size: 15px; cursor: pointer; font-family: inherit; }
        .c-btn-primary { border: none; color: #fff; background: linear-gradient(135deg, #8C52F2, #FF6FA0); box-shadow: 0 8px 20px rgba(140,82,242,.35); }
        .c-launch {
          border: none; border-radius: 22px; padding: 16px 20px; font-size: 20px; font-weight: 800; font-family: Poppins, sans-serif; color: #fff; cursor: pointer;
          background: linear-gradient(135deg, #FF6FA0, #8C52F2 55%, #3DA5F5); box-shadow: 0 14px 30px rgba(140,82,242,.4);
          display: flex; align-items: center; justify-content: center; gap: 10px; transition: transform .15s;
        }
        .c-launch:hover { transform: translateY(-2px); }
        .c-launch:hover .c-launch-icon { transform: translate(3px, -3px); }
        .c-launch-icon { display: inline-block; transition: transform .2s; }
        .c-liftoff { position: fixed; left: 50%; bottom: 10%; font-size: 64px; z-index: 40; animation: c-lift .9s ease-in forwards; pointer-events: none; }
        @keyframes c-spin { to { transform: rotate(360deg); } }
        @keyframes c-bob { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
        @keyframes c-pulse { 0%, 100% { box-shadow: 0 0 0 4px rgba(255,159,67,.3); } 50% { box-shadow: 0 0 0 10px rgba(255,159,67,.12); } }
        @keyframes c-pop { from { transform: scale(.96); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes c-lift { from { transform: translate(-50%, 0) rotate(-45deg); opacity: 1; } to { transform: translate(-50%, -110vh) rotate(-45deg); opacity: .2; } }
        @media (prefers-reduced-motion: reduce) {
          .c-orbit, .c-rocket, .c-beacon, .c-bubble, .c-liftoff { animation: none; }
        }
        @media (max-width: 1100px) {
          .c-layout { grid-template-columns: 1fr; }
          .c-side { position: static; order: -1; }
        }
        @media (max-width: 760px) {
          .c-path { display: none; }
          .c-planets { grid-template-columns: repeat(2, minmax(0, 1fr)); row-gap: 28px; }
        }
      `}</style>
    </div>
  );
}
