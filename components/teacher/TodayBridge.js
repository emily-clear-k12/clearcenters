"use client";
import React,{useState,useEffect,useRef} from 'react';
import Link from 'next/link';
import {BridgePage,ClassTabs,PageHeading,Empty} from './BridgeUI';
import {engineInfo,subjectStyle,assignmentBoard} from '../../lib/teacherBridge';
import {missionMapTeksCode} from '../../lib/cases/mission-map/teksLabels';

function topicOf(standard){return missionMapTeksCode(standard||'')||String(standard||'').replace(/-(?:SC|GC|FR|SL|SD|AD|RS|MM).*$/i,'');}
function scoreColor(pct){if(pct<=50)return '#d64545';if(pct<70)return '#e8943a';if(pct<80)return '#c8960a';if(pct<90)return '#1f8a4d';return '#3d84f5';}
function scoreWord(pct){if(pct>=90)return 'Excellent';if(pct>=80)return 'Proficient';if(pct>=60)return 'Developing';return 'Needs support';}

export default function TodayBridge({teacherName,teacherEmail,classes,students,assignments,submissions,hints,caseDetails,targets,targetsError,error,onRewards,children}){
 const [classId,setClassId]=useState(''),[selected,setSelected]=useState({}),[progressFilter,setProgressFilter]=useState(null);
 const dialog=useRef(null);
 useEffect(()=>{try{const id=sessionStorage.getItem('cc-teacher-class');if(classes.some(c=>c.id===id))setClassId(id)}catch{}},[classes]);
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
 const pct=released.length?Math.round(released.reduce((sum,s)=>sum+Number(s.teacher_grade),0)/released.length/2*100):null;
 const currentTopic=topicOf(current?.case_standard);
 const shelf=others.filter(a=>topicOf(a.case_standard)===currentTopic).slice(0,3);
 const struggling=roster.map(s=>{const grades=submissions.filter(x=>x.student_id===s.id&&list.some(a=>a.id===x.assignment_id)&&x.released&&x.teacher_grade!=null).map(x=>Number(x.teacher_grade));const avg=grades.length?grades.reduce((a,b)=>a+b,0)/grades.length:null;const hintCount=hints.filter(h=>h.student_id===s.id&&byId[h.assignment_id]).length;return {student:s,avg,hintCount};}).filter(x=>(x.avg!=null&&x.avg<1.4)||x.hintCount>=2).sort((a,b)=>b.hintCount-a.hintCount||((a.avg??9)-(b.avg??9))).slice(0,3);
 const signal=list.find(a=>(caseDetails[a.case_standard]?.engine)==='signal_defense');
 const distress=list.find(a=>a.distress_call);
 const relayItems=list.filter(a=>(caseDetails[a.case_standard]?.engine)==='relay_station');
 const race=relayItems.find(a=>/\.RACE$/i.test(a.case_standard||''));
 const track=relayItems.find(a=>/\.TRACK$/i.test(a.case_standard||''));
 const boards=[];
 if(signal)boards.push({key:'signal',name:'Signal Ops',button:'Open the class screen',href:`/teacher/signal-ops-board?assignmentId=${signal.id}`,image:'/teacher/challenges/signal_defense.jpg'});
 if(distress)boards.push({key:'live',name:'Distress call',button:'Open the live board',href:`/teacher/live-ops-board?assignmentId=${distress.id}`,image:'/teacher/live_ops_board_bg.jpg',focus:'68% 18%'});
 if(relayItems.length)boards.push({key:'relay',name:'Relay',button:'Open Relay',href:race?`/teacher/relay-race?classId=${cls.id}`:`/teacher/typing-track?classId=${cls.id}`,image:'/teacher/challenges/relay_station.jpg',also:race&&track?`/teacher/typing-track?classId=${cls.id}`:null});
 const actualTeks=missionMapTeksCode(current?.case_standard||'')||current?.case_standard;
 const displayName=teacherName?.split(' ')[0]||teacherEmail?.split('@')[0]||'teacher';
 function showProgress(key){setProgressFilter(key);dialog.current?.showModal()}
 function focus(id){setSelected({...selected,[cls.id]:id})}
 return <BridgePage teacherName={teacherName} teacherEmail={teacherEmail}>
 <PageHeading title={`Hello, ${displayName}.`} subtitle={new Date().toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'})}><ClassTabs classes={classes} value={cls?.id} onChange={changeClass}/><div className="cc-class-context">{cls?.grade?`Grade ${cls.grade} · `:''}{cls?.subject?`${cls.subject} · `:''}{roster.length} students</div></PageHeading>
 {error&&<div className="cc-error" role="alert">{error}</div>}
 {!classes.length?<Empty><h2>Your teaching space is ready.</h2><p>Create a class to start assigning activities.</p><Link className="cc-btn" href="/teacher/assign">Create a class</Link></Empty>:<>
 <div className="cc-two"><div className="cc-stack">
 {current?<section className="cc-panel cc-frame cc-hero" style={style}><div className="cc-hero-main"><div><div className="cc-eyebrow cc-subject-label">CURRENT ACTIVITY · {engine.label}</div><h2>{info.title||current.case_standard}</h2><p className="cc-muted">{actualTeks} · {progressUnavailable?'Recipients unavailable':targetRows.length?`${applicable.length} selected students`:'Whole class'}{current.due_date?` · Due ${new Date(current.due_date+'T12:00:00').toLocaleDateString(undefined,{month:'short',day:'numeric'})}`:''}</p><p className="cc-muted">{info.learning_target||engine.description}</p>{pct!=null&&<p className="cc-muted"><span style={{color:scoreColor(pct),fontWeight:700}}>{pct}%</span> class average on this activity · {scoreWord(pct)}</p>}<div className="cc-row"><Link className="cc-btn" href={assignmentBoard(current,info.engine)}>View assignment</Link><button className="cc-btn secondary" disabled={progressUnavailable} onClick={()=>showProgress('all')}>View students</button></div></div><img src={engine.image} alt={`${engine.label} activity`}/></div>
 {!progressUnavailable?<div className="cc-progress"><div className="cc-progress-bar" aria-hidden="true">{['not started','working','completed'].map((k,i)=><span key={k} style={{flex:counts[k]||0,display:counts[k]?'block':'none',background:['#c9c6df','#5798ef','#4bb589'][i]}}/>)}</div><div className="cc-progress-labels">{['not started','working','completed'].map(k=><button key={k} onClick={()=>showProgress(k)}>{counts[k]} {k}</button>)}</div></div>:<p className="cc-muted">Student progress is unavailable. Refresh to try again.</p>}
 </section>:<section className="cc-panel"><Empty><h2>What will your class explore?</h2><p>Assign an activity to bring this space to life.</p><Link className="cc-btn" href={`/teacher/assign/new?classId=${cls.id}`}>Find an activity</Link></Empty></section>}
 {others.map(item=>{const itemInfo=caseDetails[item.case_standard]||{};const itemEngine=engineInfo(itemInfo.engine);return <section key={item.id} className="cc-panel cc-frame cc-next" style={subjectStyle(itemInfo.subject||cls?.subject)}><img src={itemEngine.image} alt=""/><div><div className="cc-eyebrow cc-subject-label">ALSO ASSIGNED · {itemEngine.label}</div><h3>{itemInfo.title||item.case_standard}</h3><span className="cc-muted">{item.due_date?`Due ${new Date(item.due_date+'T12:00:00').toLocaleDateString(undefined,{month:'short',day:'numeric'})}`:'No due date'}</span></div><button className="cc-btn secondary" onClick={()=>focus(item.id)}>Focus here</button></section>})}
 </div><aside className="cc-stack"><section className="cc-panel cc-attention"><div className="cc-attention-heading"><img src="/icons/sam/cosmic/helping-poster.png" alt=""/><div><h2>Needs your attention</h2><span className="cc-badge">{pending.length} to review</span></div></div>
 {pending.slice(0,3).map(s=><div className="cc-person" key={s.id}><div className="cc-avatar">{roster.find(r=>r.id===s.student_id)?.first_name?.[0]||'•'}</div><div><strong>{roster.find(r=>r.id===s.student_id)?.first_name||'Student'}</strong><p>Submitted work is ready for feedback.</p></div><Link className="cc-link" href={`/teacher/grade/${s.id}`}>Review</Link></div>)}
 {!pending.length&&<p className="cc-muted">You’re caught up on submitted work for this class.</p>}
 <Link className="cc-btn" style={{width:'100%',marginTop:14}} href={`/teacher/grade?classId=${cls.id}`}>Review student work</Link></section>
 </aside></div>
 {(struggling.length>0||pct!=null||requests.length>0)&&<div className={struggling.length?'cc-two cc-sam-row':'cc-two'} style={struggling.length?undefined:{gridTemplateColumns:'1fr',marginTop:18}}>
 {struggling.length>0&&<Link className="cc-panel cc-sam-group" href={`/teacher/assign/new?classId=${cls.id}&standard=${encodeURIComponent(currentTopic||'')}`}><img src="/icons/sam/cosmic/helping-poster.png" alt=""/><span><span className="cc-eyebrow">S.A.M. suggests</span><strong>Small group · {struggling.map(x=>x.student.first_name).join(', ')}</strong><span className="cc-muted">See activities for {currentTopic||'this standard'}.</span></span></Link>}
 <section className="cc-panel cc-score" style={pct!=null?{borderColor:scoreColor(pct)}:undefined}><h3>A helpful follow-up</h3>
 {pct!=null?<p><strong style={{color:scoreColor(pct)}}>{pct}%</strong> <span className="cc-muted">class average on {info.title||currentTopic} · {scoreWord(pct)}</span></p>:<p className="cc-muted">No released average on this activity yet.</p>}
 {requests.length?<><p className="cc-muted">These students asked S.A.M. for a hint.</p>{requests.slice(0,3).map(s=>{const label=caseDetails[s.standard]?.title||topicOf(s.standard)||s.standard;return <div className="cc-person" key={s.id}><div className="cc-avatar">{s.first_name[0]}</div><div><strong>{s.first_name}</strong><p>{s.count} hint{s.count===1?'':'s'}{label?` on ${label}`:''}{s.standard?` · ${topicOf(s.standard)}`:''}</p></div><Link className="cc-link" href={`/teacher/students/${s.id}`}>View</Link></div>})}</>:<p className="cc-muted">No hint requests to follow up on in this class.</p>}
 <Link className="cc-link" href="/teacher/progress">See student progress →</Link></section>
 </div>}
 {current&&<section className="cc-panel cc-library-strip"><div className="cc-row cc-between"><div><h2>Other ways to teach {info.title||currentTopic}</h2><p className="cc-muted" style={{margin:'0 0 16px'}}>Same standard as the activity on screen. {currentTopic}</p></div><Link className="cc-link" href={`/teacher/assign/new?classId=${cls.id}&standard=${encodeURIComponent(currentTopic||'')}`}>Browse all activities →</Link></div>
 {shelf.length>0&&<div className="cc-three">{shelf.map(item=>{const itemInfo=caseDetails[item.case_standard]||{};const itemEngine=engineInfo(itemInfo.engine);return <button key={item.id} className="cc-mini cc-frame" style={{...style,textAlign:'left'}} onClick={()=>focus(item.id)}><img src={itemEngine.image} alt=""/><div><strong>{itemEngine.label}</strong><p>{itemInfo.title||item.case_standard}</p></div></button>})}</div>}
 </section>}
 {boards.length>0&&<div className="cc-board-grid">{boards.map(board=><div key={board.key} className="cc-board-tile cc-frame" style={style}><Link href={board.href}><img src={board.image} alt="" style={board.focus?{objectPosition:board.focus}:undefined}/></Link><strong>{board.name}</strong><Link className="cc-link" href={board.href}>{board.button}</Link>{board.also&&<Link className="cc-link" href={board.also}>Foundations track</Link>}</div>)}</div>}
 <div className="cc-row cc-between" style={{marginTop:20}}><Link className="cc-link" href={`/teacher/roster/${cls.id}`}>Class code & roster</Link><button className="cc-btn quiet" onClick={()=>onRewards(cls.id)}>Give crystals & rewards</button></div>
 </>}
 <dialog ref={dialog}><div className="cc-row cc-between"><h2>{progressFilter==='all'?'Activity progress':progressFilter}</h2><button className="cc-btn secondary" onClick={()=>dialog.current?.close()}>Close</button></div>{applicable.filter(s=>progressFilter==='all'||statusFor(s)===progressFilter).map(s=><div className="cc-person" key={s.id}><div className="cc-avatar">{s.first_name[0]}</div><div><strong>{s.first_name}</strong><p>{statusFor(s)}</p></div><Link className="cc-link" href={`/teacher/students/${s.id}`}>View student</Link></div>)}</dialog>{children}
 </BridgePage>
}
