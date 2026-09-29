"use client";
import React,{useState,useEffect,useRef} from 'react';
import Link from 'next/link';
import {BridgePage,ClassTabs,PageHeading,Empty} from './BridgeUI';
import {engineInfo,subjectStyle,assignmentBoard,liveBoardFor} from '../../lib/teacherBridge';
import {rememberedTeacherClass,rememberTeacherClass} from '../../lib/teacherClass';
import {missionMapTeksCode} from '../../lib/cases/mission-map/teksLabels';
import {supabase} from '../../lib/supabaseClient';
import { countLine } from '../../lib/gradeScale';
import SamCoach from './SamCoach';
import { groupsApi } from '../../lib/groupsApi';
import { meetings } from '../../lib/smallGroups';

// Sept 29, 2026: the Small groups card on Today. Open groups for this class,
// the one you haven't met with longest first.
function daysAgo(value){if(!value)return null;return Math.floor((Date.now()-new Date(value).getTime())/86400000)}
function metLine(days){if(days==null)return 'Not met yet';if(days<=0)return 'Met today';if(days===1)return 'Met yesterday';return `Met ${days} days ago`}
function TodayGroups({cls,students}){
 const [state,setState]=useState({loading:true,groups:[],notes:[],setup:''});
 useEffect(()=>{if(!cls?.id)return;let ignore=false;setState(s=>({...s,loading:true}));groupsApi('list',{classId:cls.id}).then(res=>{if(!ignore)setState({loading:false,groups:res.groups||[],notes:res.notes||[],setup:res.setup||''})}).catch(()=>{if(!ignore)setState({loading:false,groups:[],notes:[],setup:''})});return ()=>{ignore=true}},[cls?.id]);
 const name=id=>students.find(x=>x.id===id)?.first_name;
 const open=state.groups.filter(g=>g.status!=='closed').map(g=>{const last=meetings(state.notes.filter(n=>n.group_id===g.id))[0];return {g,days:daysAgo(last?.at)}}).sort((a,b)=>(b.days==null?9999:b.days)-(a.days==null?9999:a.days));
 const make=`/teacher/gradebook?classId=${cls?.id}&view=standard&groups=auto`;
 return <section className="cc-panel cc-today-groups"><div className="cc-row cc-between"><h2>Small groups</h2>{open.length>0&&<span className="cc-badge neutral">{open.length} open</span>}</div>
 {state.loading?<p className="cc-muted">Loading…</p>:state.setup?<p className="cc-muted">Small groups aren't set up in the database yet.</p>:open.length?<>
 {open.slice(0,4).map(({g,days})=>{const done=new Set(g.done_ids||[]);const kids=(g.student_ids||[]).filter(id=>!done.has(id)).map(name).filter(Boolean);return <Link key={g.id} className="cc-today-group" href={`/teacher/groups/${g.id}`}><span><strong>{g.name}</strong><small>{g.standard_code?`TEKS ${g.standard_code} · `:''}{metLine(days)}</small><em>{kids.join(', ')||'Everyone is done'}</em></span><span className="cc-link">Meet</span></Link>})}
 <div className="cc-row cc-between" style={{marginTop:10}}><Link className="cc-link" href={`/teacher/groups?classId=${cls?.id}`}>All groups →</Link><Link className="cc-link" href={make}>Make a group</Link></div>
 </>:<><p className="cc-muted">No small groups for this class yet. Pull a group from the gradebook to plan it, meet, and track who moved up.</p><Link className="cc-btn secondary" href={make}>Make a group</Link></>}
 </section>
}

function teksKeys(standard){
 const raw=String(standard||'');
 if(/^(MS|RS|FR)\./i.test(raw))return [];
 const mapped=missionMapTeksCode(raw);
 const source=(mapped||raw.replace(/-(?:SC|GC|FR|SL|SD|AD|RS|MM|CL|EX|XP|MS).*$/i,'')).replace(/(\d+)-(\d+[A-Z]?)/gi,'$1.$2');
 return [...new Set((source.match(/\d+\.\d+[A-Z]?/gi)||[]).map(code=>code.toUpperCase()))];
}

export default function TodayBridge({teacherName,teacherEmail,teacherId,classes,students,assignments,submissions,hints,caseDetails,targets,targetsError,error,onRewards,children}){
 const [classId,setClassId]=useState(''),[selected,setSelected]=useState({}),[progressFilter,setProgressFilter]=useState(null);
 const [showAll,setShowAll]=useState(false);
 const [library,setLibrary]=useState([]);
 const dialog=useRef(null);
 useEffect(()=>setShowAll(false),[classId]);
 useEffect(()=>{if(classes.length){const id=rememberedTeacherClass(classes,classes[0].id);setClassId(id);rememberTeacherClass(id)}},[classes]);
 const cls=classes.find(c=>c.id===classId)||classes[0];
 function changeClass(id){setClassId(id);try{sessionStorage.setItem('cc-teacher-class',id)}catch{}}
 const roster=students.filter(s=>s.class_id===cls?.id&&s.active!==false);
 const list=assignments.filter(a=>a.class_id===cls?.id);
 const current=list.find(a=>a.id===selected[cls?.id])||list.find(a=>!a.due_date||new Date(a.due_date+'T23:59:59')>=new Date())||list[0];
 const others=list.filter(a=>a.id!==current?.id);
 const info=caseDetails[current?.case_standard]||{};
 const engine=engineInfo(info.engine);
 const style=subjectStyle(info.subject||cls?.subject);
 const progressUnavailable=targetsError||!!error;
 const targetRows=targets.filter(t=>t.assignment_id===current?.id);
 const applicable=roster.filter(s=>!targetRows.length||targetRows.some(t=>t.student_id===s.id));
 const statusFor=s=>{const work=submissions.filter(x=>x.assignment_id===current?.id&&x.student_id===s.id);return work.some(x=>x.submitted_at)?'completed':work.length?'working':'not started'};
 const counts=Object.fromEntries(['not started','working','completed'].map(k=>[k,applicable.filter(s=>statusFor(s)===k).length]));
 const pending=submissions.filter(s=>list.some(a=>a.id===s.assignment_id)&&s.submitted_at&&!s.revision_requested&&s.teacher_grade==null);
 const byId=Object.fromEntries(list.map(a=>[a.id,a]));
 const requests=roster.map(s=>{const mine=hints.filter(h=>h.student_id===s.id&&byId[h.assignment_id]);const standard=byId[mine[0]?.assignment_id]?.case_standard;return {...s,count:mine.length,standard};}).filter(s=>s.count>0).sort((a,b)=>b.count-a.count);
 const released=submissions.filter(s=>s.assignment_id===current?.id&&s.released&&s.teacher_grade!=null);
 const gradeLine=released.length?countLine(released.map(s=>s.teacher_grade)):null;
 const currentKeys=teksKeys(current?.case_standard);
 const currentTopic=currentKeys.join(' & ');
 const ideas=library.filter(item=>{
  if(item.standard===current?.case_standard||item.engine==='relay_station'||list.some(a=>a.case_standard===item.standard))return false;
  if(info.subject&&item.subject&&item.subject!==info.subject)return false;
  const keys=teksKeys(item.standard);
  return currentKeys.some(code=>keys.includes(code));
 }).sort((a,b)=>Number(a.engine===info.engine)-Number(b.engine===info.engine)).slice(0,2);
 useEffect(()=>{
  const grade=Number(info.grade||cls?.grade);
  if(!grade||!currentTopic){setLibrary([]);return}
  let ignore=false;
  supabase.from('cases').select('standard, title, engine, subject, grade').eq('grade',grade).then(({data})=>{if(!ignore)setLibrary(data||[])});
  return ()=>{ignore=true};
 },[info.grade,cls?.grade,current?.case_standard,currentTopic]);
 const struggling=roster.map(s=>{const grades=submissions.filter(x=>x.student_id===s.id&&list.some(a=>a.id===x.assignment_id)&&x.released&&x.teacher_grade!=null).map(x=>Number(x.teacher_grade));const notYet=grades.filter(g=>g===0).length;const hintCount=hints.filter(h=>h.student_id===s.id&&byId[h.assignment_id]).length;return {student:s,notYet,hintCount};}).filter(x=>x.notYet>0||x.hintCount>=2).sort((a,b)=>b.notYet-a.notYet||b.hintCount-a.hintCount).slice(0,3);
 // Sept 29, 2026: every live board this class has (Distress Call, Crew,
 // Relay Race, Typing Track), one tile each, so none is only reachable
 // from the screen right after assigning.
 const boards=[];
 list.forEach(a=>{const b=liveBoardFor(a,caseDetails[a.case_standard]?.engine);if(!b||boards.some(x=>x.href===b.href))return;boards.push({key:b.href,name:b.label,button:`Open the ${b.label}`,href:b.href,image:b.href.includes('live-ops-board')?'/teacher/live_ops_board_bg.jpg':engineInfo(caseDetails[a.case_standard]?.engine).image,focus:b.href.includes('live-ops-board')?'68% 18%':undefined})});
 const startSteps=[
  {done:roster.length>0,label:'Add your students',href:`/teacher/class?class=${cls?.id}`},
  {done:list.length>0,label:'Assign an activity',href:`/teacher/assign/new?classId=${cls?.id}`},
 ];
 const showStart=startSteps.some(step=>!step.done);
 const actualTeks=missionMapTeksCode(current?.case_standard||'')||current?.case_standard;
 const displayName=teacherName?.split(' ')[0]||teacherEmail?.split('@')[0]||'teacher';
 function showProgress(key){setProgressFilter(key);dialog.current?.showModal()}
 function focus(id){setSelected({...selected,[cls.id]:id})}
 return <BridgePage teacherName={teacherName} teacherEmail={teacherEmail}>
 <PageHeading title={`Hello, ${displayName}.`} subtitle={new Date().toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'})}/>
 {error&&<div className="cc-error" role="alert">{error}</div>}
 {classes.length>0&&<SamCoach teacherId={teacherId}/>}
 {classes.length>0&&<div className="cc-today-classes"><ClassTabs classes={classes} value={cls?.id} onChange={changeClass}/><div className="cc-class-context">{cls?.grade?`Grade ${cls.grade} · `:''}{cls?.subject?`${cls.subject} · `:''}{roster.length} students</div></div>}
 {!classes.length?<Empty><h2>Your teaching space is ready.</h2><p>Set up a class to start assigning activities.</p><Link className="cc-btn" href="/teacher/class">Set up your class</Link></Empty>:<>
 {showStart&&<section className="cc-panel" style={{marginBottom:16}}><h2>Start here</h2><p className="cc-muted">Two steps, then your class can begin.</p><div className="cc-row">{startSteps.map(step=><Link key={step.label} className={step.done?'cc-badge teal':'cc-btn'} href={step.href}>{step.done?'Done · ':''}{step.label}</Link>)}</div></section>}
 <div className="cc-two"><div className="cc-stack">
 {current?<section className="cc-panel cc-frame cc-hero" style={style}><div className="cc-hero-main"><div><div className="cc-eyebrow cc-subject-label">CURRENT ACTIVITY · {engine.label}</div>{engine.what&&<p className="cc-what">{engine.what}</p>}<h2>{info.title||current.case_standard}</h2><p className="cc-muted">{actualTeks} · {progressUnavailable?'Recipients unavailable':targetRows.length?`${applicable.length} selected student${applicable.length===1?'':'s'}`:'Whole class'}{current.due_date?` · Due ${new Date(current.due_date+'T12:00:00').toLocaleDateString(undefined,{month:'short',day:'numeric'})}`:''}</p><p className="cc-muted">{info.learning_target||engine.description}</p>{gradeLine&&<p className="cc-muted" style={{fontWeight:700}}>{gradeLine}</p>}<div className="cc-row"><Link className="cc-btn" href={assignmentBoard(current,info.engine)}>View assignment</Link><button className="cc-btn secondary" disabled={progressUnavailable} onClick={()=>showProgress('all')}>View students</button></div></div><img src={engine.image} alt={`${engine.label} activity`}/></div>
 {!progressUnavailable?<div className="cc-progress"><div className="cc-progress-bar" aria-hidden="true">{['not started','working','completed'].map((k,i)=><span key={k} style={{flex:counts[k]||0,display:counts[k]?'block':'none',background:['#c9c6df','#5798ef','#4bb589'][i]}}/>)}</div><div className="cc-progress-labels">{['not started','working','completed'].map(k=><button key={k} onClick={()=>showProgress(k)}>{counts[k]} {k}</button>)}</div></div>:<p className="cc-muted">Student progress is unavailable. Refresh to try again.</p>}
 </section>:<section className="cc-panel"><Empty><h2>What will your class explore?</h2><p>Assign an activity to bring this space to life.</p><Link className="cc-btn" href={`/teacher/assign/new?classId=${cls.id}`}>Find an activity</Link></Empty></section>}
 {others.length>0&&<section className="cc-panel cc-assigned-shelf"><div className="cc-row cc-between"><h2>Also assigned</h2><span className="cc-badge neutral">{others.length} activities</span></div><div className="cc-assigned-grid">{(showAll?others:others.slice(0,4)).map(item=>{const detail=caseDetails[item.case_standard]||{},art=engineInfo(detail.engine);return <button key={item.id} className="cc-assigned-tile" style={subjectStyle(detail.subject||cls?.subject)} onClick={()=>focus(item.id)} aria-label={`Focus on ${detail.title||item.case_standard}`}><img src={art.image} alt=""/><span><small>{art.label}{art.what?` · ${art.what}`:''}</small><strong>{detail.title||item.case_standard}</strong><span className="cc-assigned-meta">{item.due_date?`Due ${new Date(item.due_date+'T12:00:00').toLocaleDateString(undefined,{month:'short',day:'numeric'})}`:item.case_standard}</span></span><span aria-hidden="true" className="cc-tile-arrow">→</span></button>})}</div>{others.length>4&&<button className="cc-text-button" aria-expanded={showAll} onClick={()=>setShowAll(!showAll)}>{showAll?'Show fewer assignments':`View all ${others.length} assignments →`}</button>}</section>}
 </div><aside className="cc-stack"><section className="cc-panel cc-attention"><div className="cc-attention-heading"><img src="/icons/sam/cosmic/helping-poster.png" alt=""/><div><h2>Needs your attention</h2><span className="cc-badge">{pending.length} to review</span></div></div>
 {pending.slice(0,3).map(s=><div className="cc-person" key={s.id}><div className="cc-avatar">{roster.find(r=>r.id===s.student_id)?.first_name?.[0]||'•'}</div><div><strong>{roster.find(r=>r.id===s.student_id)?.first_name||'Student'}</strong><p>{caseDetails[byId[s.assignment_id]?.case_standard]?.title||byId[s.assignment_id]?.case_standard||'Submitted work'} · Ready for feedback</p></div><Link className="cc-link" href={`/teacher/grade/${s.id}`}>Review</Link></div>)}
 {!pending.length&&<p className="cc-muted">You’re caught up on submitted work for this class.</p>}
 <Link className="cc-btn" style={{width:'100%',marginTop:14}} href={`/teacher/grade?classId=${cls.id}`}>Review student work</Link></section>
 <TodayGroups cls={cls} students={students}/>
 <section className="cc-panel cc-support"><div className="cc-support-title"><img src="/icons/sam/cosmic/helping-poster.png" alt="S.A.M."/><h2>Next teaching step</h2></div>
 {error?<p className="cc-muted">Follow-up evidence is unavailable. Refresh to try again.</p>:struggling.length||gradeLine||requests.length?<>
 {struggling.length>0&&<div className="cc-support-suggestion"><div className="cc-eyebrow">S.A.M. suggests</div><h3>Check in · {struggling.map(x=>x.student.first_name).join(', ')}</h3><p>Review their recent work before choosing a follow-up.</p></div>}
 <div className="cc-support-metrics">{gradeLine&&<div><strong>{gradeLine}</strong><span>Reviewed work on this activity</span></div>}{requests.length>0&&<div><strong>{requests.reduce((n,s)=>n+s.count,0)}</strong><span>Hint requests across this class</span></div>}</div>
 {requests.slice(0,3).map(s=><div className="cc-person" key={s.id}><div className="cc-avatar">{s.first_name?.[0]}</div><div><strong>{s.first_name}</strong><p>{s.count} hint{s.count===1?'':'s'} across assigned work</p></div><Link className="cc-link" href={`/teacher/students/${s.id}`}>View work</Link></div>)}
 {!requests.length&&struggling.map(x=><div className="cc-person" key={x.student.id}><div className="cc-avatar">{x.student.first_name?.[0]}</div><div><strong>{x.student.first_name}</strong><p>Review released work across this class.</p></div><Link className="cc-link" href={`/teacher/students/${x.student.id}`}>View work</Link></div>)}
 <Link className="cc-btn" href={`/teacher/reports?classId=${cls.id}&tab=students`}>See every student →</Link>
 </>:<p className="cc-muted">No follow-up signals yet. Suggestions appear as reviewed work and hint requests arrive.</p>}
 </section>
 </aside></div>
 {currentTopic&&<section className="cc-panel cc-library-strip"><div className="cc-row cc-between"><div><h2>Other ways to teach {currentTopic}</h2><p className="cc-muted" style={{margin:'0 0 16px'}}>Two other activities for this standard.</p></div><Link className="cc-link" href={`/teacher/assign/new?classId=${cls.id}&standard=${encodeURIComponent(teksKeys(current?.case_standard)[0]||'')}`}>Browse all activities →</Link></div>
 {ideas.length>0?<div className="cc-three">{ideas.map(item=>{const itemEngine=engineInfo(item.engine);return <Link key={item.standard} className="cc-mini cc-frame" style={{...style,textAlign:'left'}} href={`/teacher/assign/new?classId=${cls.id}&standard=${encodeURIComponent(teksKeys(item.standard)[0]||'')}`}><img src={itemEngine.image} alt=""/><div><strong>{itemEngine.label}</strong>{itemEngine.what&&<small className="cc-what">{itemEngine.what}</small>}<p>{item.title||item.standard}</p></div></Link>})}</div>:<p className="cc-muted">No other activities for this standard yet.</p>}
 </section>}
 {boards.length>0&&<div className="cc-board-grid">{boards.map(board=><div key={board.key} className="cc-board-tile cc-frame" style={style}><Link href={board.href}><img src={board.image} alt="" style={board.focus?{objectPosition:board.focus}:undefined}/></Link><strong>{board.name}</strong><Link className="cc-link" href={board.href}>{board.button}</Link>{board.also&&<Link className="cc-link" href={board.also}>{board.alsoLabel||'Open'}</Link>}</div>)}</div>}
 <div className="cc-row cc-between" style={{marginTop:20}}><Link className="cc-link" href={`/teacher/class?class=${cls.id}&tab=students`}>Class code & students</Link><button className="cc-btn quiet" onClick={()=>onRewards(cls.id)}>Give crystals & rewards</button></div>
 </>}
 <dialog ref={dialog}><div className="cc-row cc-between"><h2>{progressFilter==='all'?'Activity progress':progressFilter}</h2><button className="cc-btn secondary" onClick={()=>dialog.current?.close()}>Close</button></div>{applicable.filter(s=>progressFilter==='all'||statusFor(s)===progressFilter).map(s=><div className="cc-person" key={s.id}><div className="cc-avatar">{s.first_name[0]}</div><div><strong>{s.first_name}</strong><p>{statusFor(s)}</p></div><Link className="cc-link" href={`/teacher/students/${s.id}`}>View student</Link></div>)}</dialog>{children}
 </BridgePage>
}
