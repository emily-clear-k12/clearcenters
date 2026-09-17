"use client";

// CI2.0 · Teacher · This Week — Mission Bridge (prototype, pretend data).
//
// Approved Mission Bridge: day navigation on the left, readable subject bays,
// full-week overview and existing activity controls. B-only visual update;
// shared planner state and the C concept stay unchanged. Sample data only.

import { useEffect, useState } from "react";
import { usePlanner } from "../../../lib/v2/usePlanner";
import SamIcon from "../../../components/SamIcon";
import { COLORS } from "../../../lib/teacherTheme";
import { Button, LevelDrawer, Toast, PageShell } from "../../../components/v2/weekKit";
import {
  SUBJECTS,
  DAYS,
  DAY_NAMES,
  DATES,
  KINDS,
  DEMO_WEEK,
  TEACHER_SETUPS,
  PRODUCT_INFO,
} from "../../../lib/v2/demoWeek";

const INK = COLORS.textDark;
const MUTED = "#5E577F";
const LINE = "#E6E1F5";
const KIND_ORDER = { teach: 0, work: 1, small: 2 };

// ---------- small helpers ----------

function classNames(classes, setup) {
  if (classes === "all") return ""; // shared with every class: the default, so no label
  const names = setup.classes.filter((c) => classes.includes(c.key)).map((c) => c.name);
  return names.length ? `${names.join(", ")} only` : "";
}

function Chip({ active, onClick, children, color }) {
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
        padding: "6px 14px",
        fontSize: 14,
        fontWeight: 600,
        fontFamily: "inherit",
        cursor: "pointer",
        color: active ? "#fff" : INK,
        background: active ? INK : "#fff",
        border: `1px solid ${active ? INK : LINE}`,
      }}
    >
      {color && <span style={{ width: 9, height: 9, borderRadius: 999, background: color }} />}
      {children}
    </button>
  );
}

function MenuItem({ children, onClick }) {
  return (
    <button
      type="button"
      role="menuitem"
      onClick={onClick}
      style={{
        display: "block",
        width: "100%",
        textAlign: "left",
        background: "transparent",
        border: "none",
        padding: "7px 10px",
        borderRadius: 8,
        fontSize: 14,
        color: INK,
        cursor: "pointer",
        fontFamily: "inherit",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = "#F3EFFC")}
      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
    >
      {children}
    </button>
  );
}

// ---------- activity row ----------

function ActivityRow({ act, setup, compact, selected, onOpen, onMoveTo, menuOpen, onMenu, isRoutine }) {
  const cls = classNames(act.classes, setup);
  return (
    <div
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", act.id);
        e.dataTransfer.effectAllowed = "move";
      }}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "flex-start",
        gap: 4,
        borderRadius: 10,
        background: act.isNew ? "#EAFBF1" : selected ? "#F1ECFF" : "#fff",
        border: `1px solid ${act.isNew ? "#86E0A8" : selected ? "#B9A6F5" : LINE}`,
        cursor: "grab",
      }}
    >
      <button
        type="button"
        onClick={() => onOpen(act.id)}
        style={{
          flex: 1,
          textAlign: "left",
          background: "transparent",
          border: "none",
          padding: compact ? "7px 4px 7px 10px" : "9px 4px 9px 10px",
          cursor: "pointer",
          fontFamily: "inherit",
          color: INK,
          minWidth: 0,
        }}
      >
        <div style={{ fontSize: 11, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.5 }}>
          {compact ? KINDS[act.kind].short : KINDS[act.kind].label}
          {isRoutine && <span style={{ marginLeft: 6, color: "#6D3FD9" }}>· Routine</span>}
        </div>
        <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.3, marginTop: 1 }}>{act.title}</div>
        {compact ? (
          <div style={{ fontSize: 12, color: MUTED }}>
            {act.minutes} min{act.who !== "Everyone" ? ` · ${act.who}` : ""}
          </div>
        ) : (
          <div style={{ fontSize: 13, color: MUTED, marginTop: 3 }}>
            {act.product} · {act.minutes} min · {act.who}
            {cls && ` · ${cls}`}
          </div>
        )}
      </button>
      <button
        type="button"
        aria-label={`More options for ${act.title}`}
        aria-expanded={menuOpen}
        onClick={(e) => {
          e.stopPropagation();
          onMenu(menuOpen ? null : act.id);
        }}
        style={{ background: "transparent", border: "none", padding: "8px", cursor: "pointer", color: MUTED, fontSize: 16, lineHeight: 1, borderRadius: 8 }}
      >
        ⋯
      </button>
      {menuOpen && (
        <div
          role="menu"
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            right: 4,
            top: 34,
            zIndex: 15,
            background: "#fff",
            border: `1px solid ${LINE}`,
            borderRadius: 12,
            boxShadow: "0 12px 30px rgba(42,35,80,.18)",
            padding: 6,
            minWidth: 170,
          }}
        >
          <MenuItem onClick={() => onOpen(act.id)}>Open details</MenuItem>
          <div style={{ fontSize: 11, fontWeight: 700, color: MUTED, textTransform: "uppercase", padding: "8px 10px 4px" }}>Move to…</div>
          {DAYS.map((d, i) =>
            i === act.day ? null : (
              <MenuItem key={d} onClick={() => onMoveTo(act.id, i)}>
                {DAY_NAMES[i]}
              </MenuItem>
            )
          )}
        </div>
      )}
    </div>
  );
}

// ---------- suggestion ----------

function SuggestionCard({ sug, setup, onAccept, onDismiss }) {
  const cls = sug.classKey ? setup.classes.find((c) => c.key === sug.classKey) || setup.classes[0] : null;
  const clsName = cls && setup.classes.length > 1 ? cls.name : "";
  return (
    <div style={{ borderRadius: 10, border: "1px solid #F5C58B", background: "#FFF7ED", padding: "9px 10px", display: "flex", gap: 8, alignItems: "flex-start" }}>
      <SamIcon skinKey="cosmic" size={24} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color: "#9A4A00", textTransform: "uppercase", letterSpacing: 0.5 }}>SAM suggests</div>
        <div style={{ fontSize: 14, color: INK, lineHeight: 1.35, margin: "2px 0 8px" }}>{sug.text(clsName)}</div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <Button onClick={onAccept} style={{ padding: "5px 12px" }}>
            {sug.action}
          </Button>
          <Button kind="quiet" style={{ color: MUTED, padding: "5px 6px" }} onClick={onDismiss}>
            Not now
          </Button>
        </div>
      </div>
    </div>
  );
}

// ---------- subject section inside a day ----------

// ---------- details side panel ----------

function Detail({ label, children }) {
  return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: 0.5 }}>{label}</div>
      <div style={{ fontSize: 15, color: INK, marginTop: 2, lineHeight: 1.4 }}>{children}</div>
    </div>
  );
}

function DetailsPanel({ act, setup, onClose, onMoveTo, onRemove, onPreview, onToggleClass }) {
  useEffect(() => {
    if (!act) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [act, onClose]);

  if (!act) return null;
  const subject = SUBJECTS[act.subject];
  const info = PRODUCT_INFO[act.product] || {};
  const multiClass = setup.classes.length > 1;
  const classSelected = (key) => act.classes === "all" || act.classes.includes(key);

  return (
    <aside
      aria-label="Activity details"
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        bottom: 0,
        width: "min(400px, 100%)",
        background: "#FDFCFF",
        boxShadow: "-12px 0 40px rgba(42,35,80,.22)",
        zIndex: 25,
        display: "flex",
        flexDirection: "column",
        borderLeft: `6px solid ${subject.color}`,
      }}
    >
      <div style={{ padding: "18px 20px", borderBottom: `1px solid ${LINE}`, display: "flex", justifyContent: "space-between", gap: 10 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 800, color: subject.color, textTransform: "uppercase", letterSpacing: 0.6 }}>
            {subject.name} · {KINDS[act.kind].label}
          </div>
          <h2 style={{ margin: "4px 0 0", fontFamily: "'Poppins', sans-serif", fontSize: 22, color: INK, lineHeight: 1.25 }}>{act.title}</h2>
          <div style={{ fontSize: 14, color: MUTED, marginTop: 4 }}>
            {DAY_NAMES[act.day]}, {DATES[act.day]} · {act.minutes} min
          </div>
        </div>
        <button
          type="button"
          aria-label="Close details"
          onClick={onClose}
          style={{ background: "transparent", border: "none", fontSize: 24, color: MUTED, cursor: "pointer", alignSelf: "flex-start", lineHeight: 1 }}
        >
          ×
        </button>
      </div>

      <div style={{ padding: "16px 20px", overflowY: "auto", display: "grid", gap: 18, alignContent: "start" }}>
        <Detail label="What it is">
          <strong>{act.product}</strong> · {info.about}
        </Detail>
        <Detail label="Who">{act.who}</Detail>
        {act.standard && <Detail label="Standard">TEKS {act.standard}</Detail>}

        {multiClass && (
          <Detail label="Classes">
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 4 }}>
              {setup.classes.map((c) => (
                <Chip key={c.key} active={classSelected(c.key)} onClick={() => onToggleClass(act.id, c.key)}>
                  {classSelected(c.key) ? "✓ " : ""}
                  {c.name}
                </Chip>
              ))}
            </div>
            <div style={{ fontSize: 12, color: MUTED, marginTop: 6 }}>
              Planned once; choose which classes get it. Pacing changes and small groups stay class-specific.
            </div>
          </Detail>
        )}

        <Detail label="Move to">
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 4 }}>
            {DAYS.map((d, i) => (
              <Chip key={d} active={i === act.day} onClick={() => i !== act.day && onMoveTo(act.id, i)}>
                {d}
              </Chip>
            ))}
          </div>
        </Detail>
      </div>

      <div style={{ marginTop: "auto", padding: "14px 20px", borderTop: `1px solid ${LINE}`, display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Button kind="primary" style={{ padding: "9px 18px", fontSize: 14 }} onClick={onPreview}>
          Preview activity
        </Button>
        <Button onClick={() => onRemove(act.id)}>Remove from week</Button>
      </div>
    </aside>
  );
}

// ---------- page ----------

export default function PlannerClient() {
  const p = usePlanner();
  const [day, setDay] = useState(2);
  const [fullWeek, setFullWeek] = useState(false);
  const [review, setReview] = useState(false);
  const dayActs = p.visible.filter(x => x.day === day);
  const suggestions = p.openSuggestions.filter(s => s.day === day);
  const [notice, setNotice] = useState(false);
  const ctx = {
    selectedId: p.selectedId, openDetails: id => { p.setSelectedId(id); p.setMenuId(null); },
    moveTo: p.moveTo, menuId: p.menuId, setMenuId: p.setMenuId,
    routineIds: p.routineIds, acceptSuggestion: p.acceptSuggestion,
    dismissSuggestion: p.dismissSuggestion, canCompact: false,
  };
  const chooseDay = i => { setDay(i); setFullWeek(false); setReview(false); };
  const drop = (e, i) => { e.preventDefault(); p.setDragOverDay(null); p.moveTo(e.dataTransfer.getData('text/plain'), i); };
  const dayTotal = acts => acts.reduce((n, a) => n + a.minutes, 0);
  return (
    <PageShell>
      <div className="mission-bridge">
        <div className="bridge-preview">
          <span>DESIGN PREVIEW · Sample data</span>
          <label>Teaching assignment <select aria-label="Preview teaching assignment" value={p.setupKey} onChange={e => p.setSetupKey(e.target.value)}>
            {Object.entries(TEACHER_SETUPS).map(([key, setup]) => <option key={key} value={key}>{setup.label}</option>)}
          </select></label>
        </div>
        <header className="bridge-header bridge-frame">
          <div className="bridge-heading"><span className="bridge-eyebrow">YOUR PLANNING BRIDGE</span><h1>This Week <span>{DEMO_WEEK.label}</span></h1></div>
          <div className="bridge-publish">
            <Button kind="primary" onClick={p.publish}>{p.published ? '✓ Preview published' : 'Publish week'}</Button>
            <small>For {p.classList} · Monday at 7:00 AM</small>
          </div>
          <div className="bridge-filters">
            <label>Class <select aria-label="Class" value={p.classFilter} onChange={e => p.setClassFilter(e.target.value)}>
              <option value="all">{p.multiClass ? 'All my classes' : p.setup.classes[0].name}</option>
              {p.multiClass && p.setup.classes.map(c => <option key={c.key} value={c.key}>{c.name}</option>)}
            </select></label>
            <label>Subjects <select aria-label="Subjects" value={p.subjectFilter} onChange={e => p.setSubjectFilter(e.target.value)}>
              <option value="all">{p.setup.subjects.map(s => SUBJECTS[s].name).join(' + ')}</option>
              {p.multiSubject && p.setup.subjects.map(s => <option key={s} value={s}>{SUBJECTS[s].name}</option>)}
            </select></label>
            <button className="bridge-level" onClick={() => p.setShowLevels(true)}>✦ {p.levelTitle} <span>⌄</span></button>
          </div>
        </header>
        <div className="bridge-layout">
          <aside className="bridge-rail">
            <nav className="bridge-days" aria-label="Choose a planning day">
              {DAY_NAMES.map((name, i) => {
                const acts = p.visible.filter(a => a.day === i);
                const count = p.openSuggestions.filter(s => s.day === i).length;
                return <button key={name} id={`day-${i}`} className={`bridge-day ${day === i && !fullWeek ? 'is-selected' : ''} ${p.dragOverDay === i ? 'is-drop' : ''}`}
                  aria-pressed={day === i && !fullWeek} onClick={() => chooseDay(i)}
                  onDragOver={e => { e.preventDefault(); p.setDragOverDay(i); }} onDragLeave={() => p.setDragOverDay(null)} onDrop={e => drop(e, i)}>
                  <span className="bridge-day-top"><strong>{name}</strong><span>{DATES[i]}</span></span>
                  <span className="bridge-day-subjects">{p.shownSubjects.filter(s => acts.some(a => a.subject === s)).map(s => <span key={s}><i style={{background: SUBJECTS[s].color}} />{SUBJECTS[s].name}</span>)}</span>
                  <span className="bridge-day-foot">{acts.length} activities{count > 0 && <span className="bridge-suggestion-dot" aria-label={`${count} suggestions`}>✦ {count}</span>}</span>
                </button>;
              })}
            </nav>
            <div className="bridge-sam">
              <SamIcon skinKey="cosmic" size={100} />
              <div><strong>SAM’s quick look</strong><p>{p.openSuggestions.length ? `${p.openSuggestions.length} ideas to support your week.` : 'You’re all caught up on suggestions.'}</p>
              {p.openSuggestions.length > 0 && <button className="bridge-link" onClick={() => { setDay(p.openSuggestions[0].day); setFullWeek(false); setReview(true); }}>Review suggestions →</button>}</div>
            </div>
          </aside>
          <section className="bridge-console bridge-frame" aria-label="Weekly plan">
            <div className="bridge-console-heading">
              <div><span className="bridge-eyebrow">{fullWeek ? 'THE WEEK AT A GLANCE' : 'YOUR DAY, READY TO SHAPE'}</span><h2>{fullWeek ? 'Your full week' : DAY_NAMES[day]} <span>{!fullWeek && DATES[day]}</span></h2>
              <p>{fullWeek ? 'Select any activity to review or move it.' : `${dayActs.length} activities · ${dayTotal(dayActs)} min${p.classFilter === 'all' && p.multiClass ? ' across displayed plans' : ' planned'}`}</p></div>
              <button className="bridge-secondary" onClick={() => setFullWeek(v => !v)}>{fullWeek ? 'Back to selected day' : '▦ View full week'}</button>
            </div>
            <div className="bridge-content" key={`${fullWeek}-${day}`}>
              {(fullWeek ? [0,1,2,3,4] : [day]).map(i => <div className="bridge-day-content" key={i}>
                {fullWeek && <h3 className="bridge-overview-day">{DAY_NAMES[i]} <span>{DATES[i]}</span><button className="bridge-link" onClick={() => chooseDay(i)}>Open day →</button></h3>}
                {p.shownSubjects.map(sk => {
                  const subject = SUBJECTS[sk];
                  const acts = p.visible.filter(a => a.day === i && a.subject === sk).sort((a,b) => KIND_ORDER[a.kind] - KIND_ORDER[b.kind]);
                  return <section className="bridge-subject" key={sk} style={{'--subject': subject.color}} aria-label={`${DAY_NAMES[i]} ${subject.name}`}>
                    <div className="bridge-subject-label"><div className="bridge-subject-symbol" aria-hidden="true">{sk === 'math' ? '▦' : sk === 'science' ? '⚗' : sk === 'elar' ? 'Aa' : '◎'}</div><div><h3>{subject.name}</h3><p>{subject.unit}</p></div></div>
                    <div className="bridge-activities">{acts.map(act => <ActivityRow key={act.id} act={act} setup={p.setup} compact={false} selected={p.selectedId === act.id} onOpen={ctx.openDetails} onMoveTo={p.moveTo} menuOpen={p.menuId === act.id} onMenu={p.setMenuId} isRoutine={p.routineIds.includes(act.id)} />)}
                      {!acts.length && <div className="bridge-empty">Room in your day.<br/><span>No {subject.name.toLowerCase()} activities planned.</span></div>}
                    </div>
                  </section>;
                })}
              </div>)}
            </div>
            {!fullWeek && suggestions.length > 0 && <div className="bridge-review">
              <button className="bridge-review-toggle" onClick={() => setReview(v => !v)} aria-expanded={review}><span>✦ {suggestions.length} suggestion{suggestions.length === 1 ? '' : 's'} for {DAY_NAMES[day]}</span><span>{review ? 'Hide' : 'Review'} {review ? '−' : '+'}</span></button>
              {review && <div className="bridge-suggestion-list">{suggestions.map(s => <SuggestionCard key={s.id} sug={s} setup={p.setup} onAccept={() => p.acceptSuggestion(s)} onDismiss={() => p.dismissSuggestion(s.id)} />)}</div>}
            </div>}
            <footer className="bridge-console-footer"><span>◉ {p.published ? 'Published in this preview' : 'Sample plan · changes last until refresh'}</span><button className="bridge-link" onClick={() => setNotice(v => !v)} aria-expanded={notice}>Planning across classes ⓘ</button></footer>
            {notice && <p className="bridge-note">Shared activities are planned once for all classes. Open an activity to choose its classes. Moving a shared activity moves it for every class assigned to it. Publishing in this prototype applies to {p.classList}; class and subject filters only change the view. Nothing is sent to students.</p>}
          </section>
        </div>
        <p className="bridge-hint">Select an activity to see details · Move it using its menu or drag it to a day</p>
      </div>
      <DetailsPanel act={p.selected} setup={p.setup} onClose={() => p.setSelectedId(null)} onMoveTo={p.moveTo} onRemove={p.remove} onPreview={() => p.setToast({text:'Activity previews will be connected in the next build.'})} onToggleClass={p.toggleClass} />
      {p.showLevels && <LevelDrawer level={p.level} onChoose={p.setLevel} onClose={() => p.setShowLevels(false)} />}
      <Toast toast={p.toast} />
      <style dangerouslySetInnerHTML={{ __html: `
        .mission-bridge{color:#242049;max-width:1420px;margin:auto;--violet:#7b45ef;--line:#d8d8f2}
        .mission-bridge *{box-sizing:border-box}
        .mission-bridge button,.mission-bridge select{font-family:inherit}
        .mission-bridge button{cursor:pointer}
        .mission-bridge button:focus-visible,.mission-bridge select:focus-visible{outline:3px solid #5835c9;outline-offset:4px}
        .bridge-preview{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin:0 8px 12px;font-size:11px;color:#474169}
        .bridge-preview>span{letter-spacing:1.4px;font-weight:700;background:#f9f7ffed;padding:7px 12px;border-radius:20px}
        .bridge-preview label{background:#f9f7ffed;border:1px dashed #aa96e6;border-radius:20px;padding:4px 12px;display:flex;gap:8px;align-items:center}
        .bridge-preview select{border:0;background:transparent;color:inherit;font-size:12px;max-width:240px;padding:4px}
        .bridge-frame{background:linear-gradient(115deg,rgba(255,255,255,.98),rgba(243,241,255,.97));border:2px solid #fff;box-shadow:0 0 0 2px #bac9ec,0 0 0 6px #f5f6ffc9,0 0 0 8px #c7bff090,0 14px 34px #343b7b26,inset 0 2px 0 white}
        .bridge-header{border-radius:30px 30px 24px 24px;padding:22px 28px;display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:18px;margin-bottom:28px;position:relative}
        .bridge-header:after{content:'';position:absolute;bottom:-7px;left:10%;width:26%;height:3px;border-radius:10px;background:#8ae9ff;box-shadow:0 0 10px #3dbdfb;pointer-events:none}
        .bridge-eyebrow{font-size:10px;letter-spacing:1.9px;font-weight:800;color:#72649b}
        .bridge-heading h1{font-family:'Poppins',sans-serif;font-size:clamp(28px,3vw,42px);letter-spacing:-1.5px;line-height:1.25;margin:4px 0 0}
        .bridge-heading h1 span{font-family:'Inter',sans-serif;font-size:19px;font-weight:500;letter-spacing:0;margin-left:18px;color:#655b83;white-space:nowrap}
        .bridge-publish{display:flex;flex-direction:column;align-items:flex-end;gap:9px;max-width:390px}
        .bridge-publish>button{background:linear-gradient(120deg,#9659fa,#713ce9)!important;box-shadow:0 5px 16px #8153e73d,inset 0 1px 0 #ffffff60;min-width:200px}
        .bridge-publish small{font-size:11px;color:#655b83;text-align:right;line-height:1.5}
        .bridge-filters{display:flex;align-items:center;gap:12px;width:100%;flex-wrap:wrap}
        .bridge-filters label{display:flex;align-items:center;gap:9px;background:#fff;border:1px solid var(--line);border-radius:30px;padding:7px 13px;font-size:11px;font-weight:700;color:#6c6485}
        .bridge-filters select{max-width:290px;border:0;background:transparent;color:#292348;font-size:13px;font-weight:650;padding:2px 5px}
        .bridge-level{margin-left:auto;border:1px solid #ded4fa;background:#f8f5ff;color:#55457e;border-radius:24px;padding:10px 14px;font-size:12px}
        .bridge-level span{margin-left:12px}
        .bridge-layout{display:grid;grid-template-columns:240px minmax(0,1fr);gap:28px;align-items:start}
        .bridge-rail{padding:2px 0 0 15px;min-width:0}
        .bridge-days{position:relative;display:grid;gap:12px}
        .bridge-days:before{content:'';position:absolute;left:-12px;top:35px;bottom:35px;width:3px;background:linear-gradient(#70d9f5,#a98cff,#70d9f5);box-shadow:0 0 8px #fff,0 0 14px #57cfff}
        .bridge-day{position:relative;width:100%;text-align:left;border:2px solid #fafcff;border-radius:17px;padding:15px 16px 12px;background:linear-gradient(125deg,#fff,#edf2ffee);color:#282448;box-shadow:0 0 0 1px #becae5,0 5px 12px #485a941a,inset 0 -3px 0 #dce4f4;transition:box-shadow .18s,transform .18s,border-color .18s}
        .bridge-day:before{content:'';position:absolute;left:-20px;top:27px;width:11px;height:11px;background:#ecfdff;border:2px solid #6bd8f1;border-radius:50%;box-shadow:0 0 8px #b5f5ff}
        .bridge-day:hover{transform:translateX(2px);box-shadow:0 0 0 1px #a997e9,0 6px 18px #624f9928}
        .bridge-day.is-selected,.bridge-day.is-drop{border-color:#ac7dff;background:linear-gradient(120deg,#fff,#ede5ff);box-shadow:0 0 0 2px #faf5ff,0 0 20px #ad82f677,inset 0 -2px 0 #dfcafa}
        .bridge-day.is-selected:before{background:#9254ed;border-color:white;box-shadow:0 0 0 3px #b295ef,0 0 16px #a777ff}
        .bridge-day.is-selected:after{content:'';position:absolute;right:-28px;top:35px;width:26px;height:3px;background:#d3bcff;box-shadow:0 0 9px #ad6dff;pointer-events:none}
        .bridge-day-top{display:flex;justify-content:space-between;gap:8px;align-items:baseline}
        .bridge-day-top strong{font-size:17px;letter-spacing:-.3px}
        .bridge-day-top>span{font-size:12px;color:#74678b}
        .bridge-day-subjects{display:flex;gap:7px;flex-wrap:wrap;margin-top:9px;font-size:11px;color:#615876;line-height:1.4}
        .bridge-day-subjects>span{display:inline-flex;align-items:center;gap:4px}
        .bridge-day-subjects i{display:inline-block;width:6px;height:6px;border-radius:50%}
        .bridge-day-foot{display:flex;justify-content:space-between;font-size:10px;color:#706582;margin-top:9px}
        .bridge-suggestion-dot{color:#895219}
        .bridge-sam{margin-top:22px;display:flex;align-items:center;gap:0;background:linear-gradient(120deg,#f9fbffdf,#eeebffe6);border:1px solid white;border-radius:20px;padding:12px 12px 12px 0;box-shadow:0 4px 14px #343b7b20}
        .bridge-sam>img{width:74px!important;height:90px!important}
        .bridge-sam strong{font-size:12px}.bridge-sam p{font-size:12px;color:#665b7c;line-height:1.5;margin:5px 0 8px}
        .bridge-link{border:0;background:transparent;color:#6f3ed2;font-size:12px;font-weight:650;padding:3px 0;text-align:left}
        .bridge-console{border-radius:34px;min-width:0;position:relative;padding:26px 24px 12px;min-height:580px}
        .bridge-console:before{content:'';position:absolute;right:35px;top:-7px;width:120px;height:3px;background:#c5a0ff;box-shadow:0 0 12px #a070ef;border-radius:10px}
        .bridge-console-heading{display:flex;align-items:center;justify-content:space-between;gap:16px;margin-bottom:24px;flex-wrap:wrap}
        .bridge-console-heading h2{font-family:'Poppins',sans-serif;font-size:clamp(24px,2.4vw,34px);letter-spacing:-.8px;line-height:1.3;margin:5px 0}
        .bridge-console-heading h2 span{font-size:17px;font-weight:500;color:#72668a;letter-spacing:0;margin-left:10px}
        .bridge-console-heading p{font-size:12px;color:#746b8c;margin:0}
        .bridge-secondary{background:#fff;border:1px solid #d7c7f5;color:#58379c;padding:10px 15px;border-radius:22px;font-size:12px;font-weight:650}
        .bridge-content{animation:bridge-enter .2s ease-out}
        .bridge-day-content{display:grid;gap:18px}
        .bridge-day-content+.bridge-day-content{margin-top:28px}
        .bridge-subject{display:grid;grid-template-columns:150px minmax(0,1fr);gap:16px;align-items:start;padding:19px 16px;border-radius:18px;border:1px solid #dce5f3;border-left:5px solid var(--subject);background:linear-gradient(120deg,#f3f7ff,#f7f9ff);min-width:0}
        .bridge-subject-label{display:flex;gap:9px;align-items:center;min-width:0}
        .bridge-subject-symbol{font-size:25px;color:var(--subject);font-weight:700}
        .bridge-subject-label h3{font-family:'Poppins',sans-serif;font-size:18px;line-height:1.2;margin:0;letter-spacing:-.4px}
        .bridge-subject-label p{font-size:11px;line-height:1.4;color:#736789;margin:5px 0 0}
        .bridge-activities{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(220px,100%),1fr));gap:10px;min-width:0}
        .bridge-activities>div{min-width:0;border-left:3px solid var(--subject)!important;border-radius:12px!important;box-shadow:0 3px 10px #485a9409}
        .bridge-activities>div>button:first-child{padding:13px 5px 13px 12px!important}
        .bridge-empty{padding:16px;font-size:13px;line-height:1.7;background:#ffffff85;color:#5c5476}
        .bridge-empty span{font-size:12px}
        .bridge-review{border:1px solid #e4d9f7;background:#f6f0ff;border-radius:15px;margin-top:22px;overflow:hidden}
        .bridge-review-toggle{display:flex;justify-content:space-between;gap:16px;align-items:center;width:100%;padding:13px 16px;background:transparent;border:0;color:#5e428c;font-size:12px;font-weight:650;text-align:left}
        .bridge-suggestion-list{padding:0 14px 14px;display:grid;gap:10px}
        .bridge-console-footer{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px;border-top:1px solid #e5e1f3;margin-top:24px;padding:17px 0 4px;font-size:11px;color:#716582}
        .bridge-note{font-size:12px;line-height:1.7;background:#f0ecfb;padding:14px;border-radius:10px}
        .bridge-hint{font-size:11px;text-align:center;color:#50476e;background:#f5f4ffdf;width:fit-content;max-width:100%;padding:8px 18px;border-radius:20px;margin:22px auto 0}
        .bridge-overview-day{display:flex;align-items:center;gap:12px;font-size:20px;margin:4px 0 0}.bridge-overview-day>span{font-size:12px;color:#786c8c}.bridge-overview-day>button{margin-left:auto}
        @keyframes bridge-enter{from{opacity:.65;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}
        @media(min-width:1600px){.bridge-layout{grid-template-columns:270px minmax(0,1fr)}.bridge-subject{grid-template-columns:175px minmax(0,1fr)}}
        @media(max-width:1150px){.bridge-layout{grid-template-columns:205px minmax(0,1fr);gap:20px}.bridge-subject{grid-template-columns:1fr}.bridge-subject-label{align-items:center}.bridge-subject-label>div:last-child{display:flex;gap:12px;align-items:baseline}.bridge-day.is-selected:after{width:18px;right:-20px}.bridge-console{padding:22px 18px 10px}}
        @media(max-width:760px){.bridge-header{padding:20px;border-radius:24px}.bridge-heading h1 span{display:block;margin:8px 0 0;font-size:16px}.bridge-publish{align-items:flex-start}.bridge-publish small{text-align:left}.bridge-filters label{max-width:100%}.bridge-filters select{max-width:210px}.bridge-level{margin-left:0}.bridge-layout{grid-template-columns:1fr;gap:22px}.bridge-rail{padding:0}.bridge-days{display:flex;overflow:auto;gap:10px;padding:5px 3px 10px}.bridge-days:before,.bridge-day:before,.bridge-day:after{display:none}.bridge-day{flex:0 0 157px;padding:12px}.bridge-day-top strong{font-size:14px}.bridge-day-top>span{font-size:10px}.bridge-sam{margin-top:8px;padding:5px 14px;gap:8px}.bridge-sam>img{width:50px!important;height:50px!important}.bridge-sam p{display:inline;margin-left:8px}.bridge-sam .bridge-link{display:block}.bridge-console{border-radius:24px;min-height:0;padding:20px 14px 10px}.bridge-preview{font-size:10px}.bridge-preview label{flex-wrap:wrap}.bridge-activities{grid-template-columns:1fr}.bridge-subject{padding:14px 12px}.bridge-console-heading h2{font-size:25px}}
        @media(prefers-reduced-motion:reduce){.mission-bridge *{animation:none!important;transition:none!important;scroll-behavior:auto!important}}
      ` }} />
    </PageShell>
  );
}
