"use client";

import { useEffect, useRef, useState } from 'react';
import { Atom, BookOpen, Globe2, Calculator, ChevronLeft, ChevronRight, GripVertical, MoreHorizontal, Plus, X, Check, Clock3, Users, Upload, Copy, RotateCcw, Sparkles } from 'lucide-react';
import { SUBJECTS, SETUPS, DAYS, KINDS, PRODUCTS, contextKey, seedPlan, loadSaved, moveActivity, validActivity } from './missionModel';
import './mission-console.css';

const STORAGE = 'ci2-mission-console-v1';
const ICONS = { math:Calculator, elar:BookOpen, science:Atom, social:Globe2 };
const personLabel = a => a.students.length ? `${a.students.length} students` : 'Everyone';
const clone = value => JSON.parse(JSON.stringify(value));

function Modal({ title, children, onClose, wide=false }) {
  const dialog = useRef(null);
  useEffect(()=>{ const el=dialog.current; const previous=document.activeElement; el.showModal(); return ()=>{el.close();previous?.focus?.();}; },[]);
  return <dialog ref={dialog} className={`mc-dialog ${wide?'mc-editor':''}`} onCancel={e=>{e.preventDefault();onClose();}} onClick={e=>{if(e.target===dialog.current)onClose();}}>
    <header><h2>{title}</h2><button className="mc-icon-button" aria-label="Close dialog" onClick={onClose}><X size={22}/></button></header>{children}
  </dialog>;
}

export default function PlannerClient() {
  const [setupKey,setSetupKey]=useState('self');
  const [period,setPeriod]=useState(1);
  const [subjectFilter,setSubjectFilter]=useState('all');
  const [day,setDay]=useState(2);
  const [view,setView]=useState('day');
  const [plans,setPlans]=useState({});
  const [loaded,setLoaded]=useState(false);
  const [saveState,setSaveState]=useState('Loading preview');
  const [published,setPublished]=useState({});
  const [draft,setDraft]=useState(null);
  const [editorError,setEditorError]=useState('');
  const [choosingStudents,setChoosingStudents]=useState(false);
  const [menu,setMenu]=useState(null);
  const [drag,setDrag]=useState(null);
  const [dropDay,setDropDay]=useState(null);
  const [toast,setToast]=useState(null);
  const [modal,setModal]=useState(null);
  const [targets,setTargets]=useState([]);
  const [suggestionsDone,setSuggestionsDone]=useState({});
  const setup=SETUPS[setupKey];
  const key=contextKey(setupKey,period);
  const plan=plans[key] || seedPlan(setupKey,period);
  const subjects=subjectFilter==='all'?setup.subjects:[subjectFilter];
  const visible=plan.filter(a=>subjects.includes(a.subject));
  const className=setupKey==='self'?'Room 12':`Period ${period}`;
  const dayActivities=visible.filter(a=>a.day===day);
  const order = a=> ['teach','review','work','check','small'].indexOf(a.kind);
  const actsFor=(s,d)=>visible.filter(a=>a.subject===s&&a.day===d).sort((a,b)=>order(a)-order(b));

  useEffect(()=>{try{const raw=localStorage.getItem(STORAGE);if(raw)setPlans(loadSaved(raw));setSaveState('Saved on this device');}catch{setSaveState('Session only');}setLoaded(true);},[]);
  useEffect(()=>{if(!loaded)return;try{localStorage.setItem(STORAGE,JSON.stringify({version:1,plans}));setSaveState('Saved on this device');}catch{setSaveState('Session only');}},[plans,loaded]);
  useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(null),9000);return()=>clearTimeout(t);},[toast]);
  useEffect(()=>{if(!menu)return;const close=e=>{if(e.type==='keydown'&&e.key!=='Escape')return;setMenu(null);};window.addEventListener('click',close);window.addEventListener('keydown',close);return()=>{window.removeEventListener('click',close);window.removeEventListener('keydown',close);};},[menu]);

  function changeSetup(value) {setSetupKey(value);setPeriod(1);setSubjectFilter('all');setMenu(null);setDraft(null);setDrag(null);}
  function commit(next,message) {
    const previous=clone(plan), priorPublish=!!published[key], currentKey=key;
    setPlans(p=>({...p,[currentKey]:next}));setPublished(p=>({...p,[currentKey]:false}));
    setToast({message,undo:()=>{setPlans(p=>({...p,[currentKey]:previous}));setPublished(p=>({...p,[currentKey]:priorPublish}));setToast(null);}});
  }
  function move(id,to) {const a=plan.find(a=>a.id===id);if(!a||a.day===to)return;commit(moveActivity(plan,id,to),`Moved “${a.title}” to ${DAYS[to]} · ${className} only.`);setMenu(null);}
  function startEdit(a) {setDraft({...clone(a),isNew:false});setEditorError('');setChoosingStudents(false);setMenu(null);}
  function add(s,d) {setDraft({id:crypto.randomUUID(),subject:s,day:d,title:'',kind:'work',product:'ClearSheets',minutes:20,students:[],note:'',isNew:true});setEditorError('');setChoosingStudents(false);}
  function saveDraft(e) {
    e.preventDefault();const {isNew,...a}=draft;a.title=a.title.trim();
    if(!validActivity(a,setupKey)){setEditorError('Add a title and a time between 1 and 180 minutes.');return;}
    commit(isNew?[...plan,a]:plan.map(x=>x.id===a.id?a:x),`${isNew?'Added':'Updated'} “${a.title}” · ${className}.`);setDraft(null);
  }
  function drop(e,d,s) {e.preventDefault();const id=e.dataTransfer.getData('text/plain');const a=plan.find(a=>a.id===id);if(a&&(!s||s===a.subject))move(id,d);setDrag(null);setDropDay(null);}
  function copyDay() {
    const before={}, after={}, oldStatus={};
    for(const target of targets) {const k=contextKey(setupKey,target);before[k]=clone(plans[k]||seedPlan(setupKey,target));oldStatus[k]=!!published[k];after[k]=[...before[k].filter(a=>a.day!==day||!subjects.includes(a.subject)),...clone(dayActivities).map(a=>({...a,id:crypto.randomUUID()}))];}
    setPlans(p=>({...p,...after}));setPublished(p=>({...p,...Object.fromEntries(Object.keys(after).map(k=>[k,false]))}));setModal(null);
    setToast({message:`Copied ${DAYS[day]} to ${targets.length} period${targets.length===1?'':'s'}.`,undo:()=>{setPlans(p=>({...p,...before}));setPublished(p=>({...p,...oldStatus}));setToast(null);}});
  }

  function renderActivity(a,compact=false) {
    return <article key={a.id} className={`mc-activity ${compact?'mc-compact':''} ${drag===a.id?'mc-dragging':''}`} style={{'--subject':SUBJECTS[a.subject].color}} data-activity={a.id} draggable onDragStart={e=>{e.dataTransfer.setData('text/plain',a.id);e.dataTransfer.effectAllowed='move';setDrag(a.id);setMenu(null);}} onDragEnd={()=>{setDrag(null);setDropDay(null);}}>
      <span className="mc-grip" aria-hidden="true"><GripVertical size={18}/></span>
      <button className="mc-activity-main" onClick={()=>startEdit(a)} aria-label={`Edit ${a.title}`}>
        <span className="mc-kind">{KINDS[a.kind]}</span><strong>{a.title}</strong>
        <span className="mc-meta">{!compact&&<span>{a.product} · </span>}{a.minutes} min · {personLabel(a)}</span>
      </button>
      <button className="mc-more" aria-label={`Options for ${a.title}`} aria-expanded={menu===a.id} onClick={e=>{e.stopPropagation();setMenu(menu===a.id?null:a.id);}}><MoreHorizontal size={19}/></button>
      {menu===a.id&&<div className="mc-menu" onClick={e=>e.stopPropagation()}><button onClick={()=>startEdit(a)}>Edit activity</button><span>Move to…</span>{DAYS.map((d,i)=><button key={d} disabled={i===a.day} onClick={()=>move(a.id,i)}>{d}{i===a.day?' · current':''}</button>)}</div>}
    </article>;
  }
  function SubjectHeading({subject,small=false}) {const Icon=ICONS[subject];return <div className={`mc-subject-title ${small?'mc-small-title':''}`}><span className="mc-subject-icon"><Icon size={small?20:28}/></span><div><h3>{SUBJECTS[subject].name}</h3>{!small&&<p>{SUBJECTS[subject].unit}</p>}</div></div>;}

  return <div className="mc-app">
    <div className="mc-preview"><label>Preview teaching setup <select value={setupKey} onChange={e=>changeSetup(e.target.value)}>{Object.entries(SETUPS).map(([k,s])=><option value={k} key={k}>{s.label}</option>)}</select></label><span>Sample plans · saved on this device · no student assignments sent</span></div>
    <div className="mc-shell">
      <nav className="mc-topbar mc-metal" aria-label="Main navigation"><div className="mc-brand"><img src="/teacher/brand_crystal_mark.png" alt=""/>Crystal Instruction <small>2.0</small></div><div className="mc-nav-items"><span className="mc-nav-current">Plan</span>{['Teach','Check','Grow','Library'].map(x=><button key={x} onClick={()=>{setModal('soon');}}>{x}</button>)}</div><div className="mc-user">Ms. Rivera<img src="/icons/sam/cosmic/idle-poster.png" alt="SAM"/></div></nav>
      <header className="mc-heading mc-metal"><div className="mc-heading-top"><div className="mc-date-title"><h1>This Week</h1><span>October 5–9, 2026</span></div><div className="mc-publish"><button className="mc-primary" onClick={()=>setModal('publish')}><Upload size={18}/>{published[key]?'Preview published':'Publish week'}</button><small>{className} only · Monday at 7:00 AM</small></div></div>
        <div className="mc-controls"><div className="mc-filters"><label className="mc-select"><span className="mc-sr">Class period</span><select value={period} onChange={e=>{setPeriod(Number(e.target.value));setMenu(null);}}>{Array.from({length:setup.periods},(_,i)=><option value={i+1} key={i}>{setupKey==='self'?'Room 12':`Period ${i+1}`}</option>)}</select></label><label className="mc-select"><span className="mc-sr">Subject filter</span><select value={subjectFilter} onChange={e=>setSubjectFilter(e.target.value)}><option value="all">{setup.subjects.length===4?'All 4 subjects':setup.subjects.map(s=>SUBJECTS[s].name).join(' + ')}</option>{setup.subjects.length>1&&setup.subjects.map(s=><option key={s} value={s}>{SUBJECTS[s].name}</option>)}</select></label><span className="mc-setup-caption">{setup.periods===1?'Self-contained':`${setup.periods} class periods`}</span></div>
        <div className="mc-view-switch" role="group" aria-label="Planner view"><button aria-pressed={view==='day'} onClick={()=>{setView('day');setMenu(null);}}>Day focus</button><button aria-pressed={view==='week'} onClick={()=>{setView('week');setMenu(null);}}>Week at a glance</button></div></div>
      </header>
      <main className={`mc-main ${view==='week'?'mc-week-view':''} mc-count-${subjects.length}`}>
        <div className="mc-rail" aria-label="Planning days">{DAYS.map((name,i)=><button key={name} className={`${day===i?'mc-active-day':''} ${dropDay===i?'mc-drop-day':''}`} aria-pressed={day===i} aria-label={`${name}, October ${i+5}`} onClick={()=>{setDay(i);setMenu(null);}} onDragOver={e=>{e.preventDefault();setDropDay(i);}} onDragLeave={()=>setDropDay(null)} onDrop={e=>drop(e,i)}><strong>{name.slice(0,3)} {i+5}</strong><span>October {i+5}, 2026</span></button>)}</div>
        <section className="mc-workspace mc-metal">
          <div className="mc-workspace-heading"><h2>{view==='day'?`${DAYS[day]}, October ${day+5}`:'Week at a glance'}</h2><span>{view==='day'?`${className} · ${dayActivities.length} activities · ${dayActivities.reduce((n,a)=>n+a.minutes,0)} min planned`:'Drag an activity to another day · or use its Move to menu'}</span></div>
          {view==='day'?<div className={`mc-bays mc-bays-${subjects.length}`}>{subjects.map(s=><section key={s} className="mc-bay" style={{'--subject':SUBJECTS[s].color}}><header><SubjectHeading subject={s}/><button className="mc-add" aria-label={`Add ${SUBJECTS[s].name} activity`} onClick={()=>add(s,day)}><Plus size={19}/><span>Add</span></button></header><div className="mc-bay-activities">{actsFor(s,day).map(a=>renderActivity(a))}{!actsFor(s,day).length&&<p className="mc-empty">Room in your day. Add an activity when you’re ready.</p>}</div></section>)}</div>:
          <div className="mc-week-scroll"><div className="mc-week-grid" style={{'--rows':subjects.length}}>{subjects.map(s=><div className="mc-week-band" key={s} style={{'--subject':SUBJECTS[s].color}}>{DAYS.map((d,i)=><section className={`mc-week-cell ${dropDay===i&&drag?'mc-drop-cell':''}`} key={d} aria-label={`${d} ${SUBJECTS[s].name}`} onDragOver={e=>{const a=plan.find(x=>x.id===drag);if(a?.subject===s){e.preventDefault();setDropDay(i);}}} onDrop={e=>drop(e,i,s)}><div className="mc-mobile-day">{d}, Oct {i+5}</div><header><SubjectHeading subject={s} small/><button className="mc-icon-button" aria-label={`Add ${SUBJECTS[s].name} on ${d}`} onClick={()=>add(s,i)}><Plus size={17}/></button></header><div className="mc-week-activities">{actsFor(s,i).map(a=>renderActivity(a,subjects.length>1))}{!actsFor(s,i).length&&<span className="mc-empty">Nothing planned</span>}</div></section>)}</div>)}</div></div>}
          {setup.periods>1&&<div className="mc-copy-row"><span>Planning for {className} · edits stay with this class</span><button onClick={()=>{setTargets([]);setModal('copy');}}><Copy size={15}/>Copy {DAYS[day]} to another period</button></div>}
        </section>
      </main>
      <footer className="mc-sam-bar mc-metal"><img src="/icons/sam/cosmic/idle-poster.png" alt="SAM"/><div className="mc-sam-message"><Sparkles size={18}/><span>{suggestionsDone[key]?'Your plan is ready to arrange.':subjects.includes('math')?'A fraction refresher could help a small group.':'Your whole class. Your whole week.'}</span></div>{subjects.includes('math')&&!suggestionsDone[key]&&<button className="mc-secondary" onClick={()=>setModal('suggestion')}>Review suggestion</button>}<span className="mc-save"><Check size={19}/>{saveState}</span></footer>
    </div>
    {draft&&<Modal title={draft.isNew?'Add activity':draft.title} wide onClose={()=>setDraft(null)}><form onSubmit={saveDraft} className="mc-form"><p className="mc-editor-scope">{SUBJECTS[draft.subject].name} · {className} only</p><label>Activity name<input autoFocus required maxLength={120} value={draft.title} onChange={e=>setDraft({...draft,title:e.target.value})}/></label><div className="mc-form-pair"><label>Teaching format<select value={draft.kind} onChange={e=>setDraft({...draft,kind:e.target.value})}>{Object.entries(KINDS).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select></label><label>Product<select value={draft.product} onChange={e=>setDraft({...draft,product:e.target.value})}>{PRODUCTS.map(p=><option key={p}>{p}</option>)}</select></label></div><div className="mc-form-pair"><label>Day<select value={draft.day} onChange={e=>setDraft({...draft,day:Number(e.target.value)})}>{DAYS.map((d,i)=><option key={d} value={i}>{d}, Oct {i+5}</option>)}</select></label><label>Estimated minutes<input required type="number" min={1} max={180} value={draft.minutes} onChange={e=>setDraft({...draft,minutes:Number(e.target.value)})}/></label></div><div className="mc-student-heading"><span>Students: <strong>{personLabel(draft)}</strong></span><button type="button" className="mc-secondary" onClick={()=>setChoosingStudents(v=>!v)} aria-expanded={choosingStudents}>Choose students</button></div>{choosingStudents&&<fieldset className="mc-students"><legend>Sample roster</legend><button type="button" className="mc-text-button" onClick={()=>setDraft({...draft,students:[]})}>Everyone</button><div>{Array.from({length:24},(_,i)=><label key={i}><input type="checkbox" checked={draft.students.includes(i+1)} onChange={e=>setDraft({...draft,students:e.target.checked?[...draft.students,i+1]:draft.students.filter(n=>n!==i+1)})}/>Student {i+1}</label>)}</div><small>No selected names means everyone in the class.</small></fieldset>}<label>Teacher note (optional)<textarea maxLength={1000} rows={3} value={draft.note} onChange={e=>setDraft({...draft,note:e.target.value})}/></label>{editorError&&<p role="alert">{editorError}</p>}<div className="mc-form-actions"><button className="mc-primary" type="submit">Save changes</button><button type="button" className="mc-secondary" onClick={()=>setDraft(null)}>Cancel</button></div>{!draft.isNew&&<button type="button" className="mc-remove" onClick={()=>{commit(plan.filter(a=>a.id!==draft.id),`Removed “${draft.title}” · ${className}.`);setDraft(null);}}>Remove from week</button>}<p className="mc-preview-note">Sample planner only. These edits do not change curriculum content or send work to students.</p></form></Modal>}
    {modal&&<Modal title={modal==='copy'?'Copy this day':modal==='publish'?'Publish preview':modal==='suggestion'?'SAM’s suggestion':'Coming next'} onClose={()=>setModal(null)}>
      {modal==='copy'?<div className="mc-form"><p>Copy {DAYS[day]}’s {subjects.map(s=>SUBJECTS[s].name).join(' + ')} plan from {className}.</p><p className="mc-preview-note">This replaces those subjects on that day in the selected periods, including small groups. Other days stay as they are. You can undo.</p>{Array.from({length:setup.periods},(_,i)=>i+1).filter(i=>i!==period).map(i=><label className="mc-check-row" key={i}><input type="checkbox" checked={targets.includes(i)} onChange={e=>setTargets(t=>e.target.checked?[...t,i]:t.filter(n=>n!==i))}/>Period {i}</label>)}<button className="mc-primary" disabled={!targets.length} onClick={copyDay}>Copy day</button></div>:
      modal==='publish'?<div className="mc-form"><p>Preview publishing the full week for <strong>{className}</strong>.</p><p>Student work would open Monday, October 5 at 7:00 AM.</p><p className="mc-preview-note">This sandbox uses sample plans. Nothing will be sent to students.</p><button className="mc-primary" onClick={()=>{setPublished(p=>({...p,[key]:true}));setToast({message:`Publishing preview complete · ${className} only.`});setModal(null);}}>Publish preview for {className}</button></div>:
      modal==='suggestion'?<div className="mc-form"><p>Try a 10-minute fraction refresher with a small group on {DAYS[day]}.</p><p className="mc-preview-note">Example suggestion using sample data. Choose the students in activity details.</p><button className="mc-primary" onClick={()=>{add('math',day);setDraft(d=>({...d,title:'Fraction refresher',kind:'small',minutes:10,students:[1,2,3,4,5,6]}));setSuggestionsDone(p=>({...p,[key]:true}));setModal(null);}}>Review this activity</button></div>:
      <p className="mc-form">This preview focuses on planning. The other CI2.0 areas will be connected in later builds.</p>}
    </Modal>}
    {toast&&<div className="mc-toast" role="status"><span>{toast.message}</span>{toast.undo&&<button onClick={toast.undo}><RotateCcw size={15}/>Undo</button>}<button aria-label="Dismiss notification" onClick={()=>setToast(null)}><X size={16}/></button></div>}
  </div>;
}
