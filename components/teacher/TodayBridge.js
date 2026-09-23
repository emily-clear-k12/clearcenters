"use client";
import React,{useState,useEffect,useRef} from 'react';
import Link from 'next/link';
import {BridgePage,ClassTabs,PageHeading,Empty} from './BridgeUI';
import {engineInfo,subjectStyle,assignmentBoard} from '../../lib/teacherBridge';
import {missionMapTeksCode} from '../../lib/cases/mission-map/teksLabels';

export default function TodayBridge({teacherName,teacherEmail,classes,students,assignments,submissions,hints,caseDetails,targets,targetsError,error,onRewards,children}){
 const [classId,setClassId]=useState(''),[selected,setSelected]=useState({}),[progressFilter,setProgressFilter]=useState(null);
 const dialog=useRef(null);
 useEffect(()=>{try{const id=sessionStorage.getItem('cc-teacher-class');if(classes.some(c=>c.id===id))setClassId(id)}catch{}},[classes]);
 const cls=classes.find(c=>c.id===classId)||classes[0];
 function changeClass(id){setClassId(id);try{sessionStorage.setItem('cc-teacher-class',id)}catch{}}
 const roster=students.filter(s=>s.class_id===cls?.id&&s.active!==false);
 const list=assignments.filter(a=>a.class_id===cls?.id);
 const current=list.find(a=>a.id===selected[cls?.id])||list.find(a=>!a.due_date||new Date(a.due_date+'T23:59:59')>=new Date())||list[0];
 const next=list.find(a=>a.id!==current?.id);
 const info=caseDetails[current?.case_standard]||{};
 const engine=engineInfo(info.engine);
 const style=subjectStyle(info.subject||cls?.subject);
 const progressUnavailable=targetsError||!!error;
 const targetRows=targets.filter(t=>t.assignment_id===current?.id);
 const applicable=roster.filter(s=>!targetRows.length||targetRows.some(t=>t.student_id===s.id));
 const statusFor=s=>{const work=submissions.filter(x=>x.assignment_id===current?.id&&x.student_id===s.id);return work.some(x=>x.submitted_at)?'completed':work.length?'working':'not started'};
 const counts=Object.fromEntries(['not started','working','completed'].map(k=>[k,applicable.filter(s=>statusFor(s)===k).length]));
 const pending=submissions.filter(s=>list.some(a=>a.id===s.assignment_id)&&s.submitted_at&&!s.revision_requested&&s.teacher_grade==null);
 const requests=roster.map(s=>({...s,count:hints.filter(h=>h.student_id===s.id&&list.some(a=>a.id===h.assignment_id)).length})).filter(s=>s.count>0).sort((a,b)=>b.count-a.count);
 const actualTeks=missionMapTeksCode(current?.case_standard||'')||current?.case_standard;
 const displayName=teacherName?.split(' ')[0]||teacherEmail?.split('@')[0]||'teacher';
 function showProgress(key){setProgressFilter(key);dialog.current?.showModal()}
 return <BridgePage teacherName={teacherName} teacherEmail={teacherEmail}>
 <PageHeading title={`Hello, ${displayName}.`} subtitle={new Date().toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'})}><ClassTabs classes={classes} value={cls?.id} onChange={changeClass}/><div className="cc-class-context">{cls?.grade?`Grade ${cls.grade} · `:''}{cls?.subject?`${cls.subject} · `:''}{roster.length} students</div></PageHeading>
 {error&&<div className="cc-error" role="alert">{error}</div>}
 {!classes.length?<Empty><h2>Your teaching space is ready.</h2><p>Create a class to start assigning activities.</p><Link className="cc-btn" href="/teacher/assign">Create a class</Link></Empty>:<>
 <div className="cc-two"><div className="cc-stack">
 {current?<section className="cc-panel cc-frame cc-hero" style={style}><div className="cc-hero-main"><div><div className="cc-eyebrow cc-subject-label">CURRENT ACTIVITY · {engine.label}</div><h2>{info.title||current.case_standard}</h2><p className="cc-muted">{actualTeks} · {progressUnavailable?'Recipients unavailable':targetRows.length?`${applicable.length} selected students`:'Whole class'}{current.due_date?` · Due ${new Date(current.due_date+'T12:00:00').toLocaleDateString(undefined,{month:'short',day:'numeric'})}`:''}</p><p className="cc-muted">{info.learning_target||engine.description}</p><div className="cc-row"><Link className="cc-btn" href={assignmentBoard(current,info.engine)}>{info.engine==='signal_defense'||current.distress_call?'Open live board':'View assignment'}</Link><button className="cc-btn secondary" disabled={progressUnavailable} onClick={()=>showProgress('all')}>View students</button></div></div><img src={engine.image} alt={`${engine.label} activity`}/></div>
 {!progressUnavailable?<div className="cc-progress"><div className="cc-progress-bar" aria-hidden="true">{['not started','working','completed'].map((k,i)=><span key={k} style={{flex:counts[k],display:counts[k]?'block':'none',background:['#c9c6df','#5798ef','#4bb589'][i]}}/>)}</div><div className="cc-progress-labels">{['not started','working','completed'].map(k=><button key={k} onClick={()=>showProgress(k)}>{counts[k]} {k}</button>)}</div></div>:<p className="cc-muted">Student progress is unavailable. Refresh to try again.</p>}
 {list.length>1&&<details style={{marginTop:15}}><summary>Choose a different activity</summary><select aria-label="Current activity" value={current.id} onChange={e=>setSelected({...selected,[cls.id]:e.target.value})} style={{width:'100%'}}>{list.map(a=><option key={a.id} value={a.id}>{caseDetails[a.case_standard]?.title||a.case_standard}{a.due_date?` · ${a.due_date}`:''}</option>)}</select></details>}
 </section>:<section className="cc-panel"><Empty><h2>What will your class explore?</h2><p>Assign an activity to bring this space to life.</p><Link className="cc-btn" href={`/teacher/assign/new?classId=${cls.id}`}>Find an activity</Link></Empty></section>}
 {next&&<section className="cc-panel cc-frame cc-next" style={subjectStyle(caseDetails[next.case_standard]?.subject||cls.subject)}><div><div className="cc-eyebrow cc-subject-label">ALSO ASSIGNED · {engineInfo(caseDetails[next.case_standard]?.engine).label}</div><h3>{caseDetails[next.case_standard]?.title||next.case_standard}</h3><span className="cc-muted">{next.due_date?`Due ${new Date(next.due_date+'T12:00:00').toLocaleDateString()}`:'No due date'}</span></div><button className="cc-btn secondary" onClick={()=>setSelected({...selected,[cls.id]:next.id})}>Focus here</button></section>}
 </div><aside className="cc-stack"><section className="cc-panel"><div className="cc-attention-heading"><img src="/icons/sam/cosmic/helping-poster.png" alt=""/><div><h2>Needs your attention</h2><span className="cc-badge">{pending.length} to review</span></div></div>
 {pending.slice(0,3).map(s=><div className="cc-person" key={s.id}><div className="cc-avatar">{roster.find(r=>r.id===s.student_id)?.first_name?.[0]||'•'}</div><div><strong>{roster.find(r=>r.id===s.student_id)?.first_name||'Student'}</strong><p>Submitted work is ready for feedback.</p></div><Link className="cc-link" href={`/teacher/grade/${s.id}`}>Review</Link></div>)}
 {!pending.length&&<p className="cc-muted">You’re caught up on submitted work for this class.</p>}
 <Link className="cc-btn" style={{width:'100%',marginTop:14}} href={`/teacher/grade?classId=${cls.id}`}>Review student work</Link></section>
 <section className="cc-panel"><h3>A helpful follow-up</h3>{requests.length?<><p className="cc-muted">These students have asked for hints on assigned activities.</p>{requests.slice(0,2).map(s=><div className="cc-person" key={s.id}><div className="cc-avatar">{s.first_name[0]}</div><div><strong>{s.first_name}</strong><p>{s.count} hint request{s.count===1?'':'s'}</p></div><Link className="cc-link" href={`/teacher/students/${s.id}`}>View</Link></div>)}</>:<p className="cc-muted">No hint requests to follow up on in this class.</p>}<Link className="cc-link" href="/teacher/progress">See student progress →</Link></section>
 </aside></div>
 <section className="cc-panel cc-library-strip"><div className="cc-row cc-between"><div><h2>More ways to explore</h2><p className="cc-muted" style={{margin:'0 0 16px'}}>Find a different experience for your next learning goal.</p></div><Link className="cc-link" href={`/teacher/assign/new?classId=${cls.id}`}>Browse all activities →</Link></div><div className="cc-three">{['group_chat','assembly_deck','frequency_rush'].map(k=>{const e=engineInfo(k);return <Link key={k} className="cc-mini cc-frame" style={style} href={`/teacher/assign/new?classId=${cls.id}&engine=${k}`}><img src={e.image} alt=""/><div><strong>{e.label}</strong><p>{e.description}</p></div></Link>})}</div></section>
 <div className="cc-row cc-between" style={{marginTop:20}}><Link className="cc-link" href={`/teacher/roster/${cls.id}`}>Class code & roster</Link><button className="cc-btn quiet" onClick={()=>onRewards(cls.id)}>Give crystals & rewards</button></div>
 </>}
 <dialog ref={dialog}><div className="cc-row cc-between"><h2>{progressFilter==='all'?'Activity progress':progressFilter}</h2><button className="cc-btn secondary" onClick={()=>dialog.current?.close()}>Close</button></div>{applicable.filter(s=>progressFilter==='all'||statusFor(s)===progressFilter).map(s=><div className="cc-person" key={s.id}><div className="cc-avatar">{s.first_name[0]}</div><div><strong>{s.first_name}</strong><p>{statusFor(s)}</p></div><Link className="cc-link" href={`/teacher/students/${s.id}`}>View student</Link></div>)}</dialog>{children}
 </BridgePage>
}
