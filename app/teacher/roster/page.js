"use client";
import React,{useEffect,useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {supabase} from '../../../lib/supabaseClient';
import {BridgePage,PageHeading,Empty} from '../../../components/teacher/BridgeUI';
import {subjectStyle} from '../../../lib/teacherBridge';
export default function Rosters(){const router=useRouter();const [classes,setClasses]=useState([]),[email,setEmail]=useState(''),[loading,setLoading]=useState(true),[error,setError]=useState(null);
useEffect(()=>{let cancelled=false;(async()=>{const {data,error:authError}=await supabase.auth.getUser();if(authError||!data?.user){router.push('/login');return}const result=await supabase.from('classes').select('id,name,grade,subject,class_code').eq('teacher_id',data.user.id).order('name');if(cancelled)return;setEmail(data.user.email);setClasses(result.data||[]);if(result.error)setError('Could not load your classes. Please refresh to try again.');setLoading(false)})();return()=>{cancelled=true}},[router]);
return <BridgePage teacherEmail={email}><PageHeading title="Your class, connected" subtitle="Choose a class to manage students and classroom access."/>{error&&<div className="cc-error" role="alert">{error}</div>}{loading?<Empty>Loading classes…</Empty>:<div className="cc-three">{classes.map(c=><section key={c.id} className="cc-panel cc-frame" style={subjectStyle(c.subject)}><div className="cc-eyebrow cc-subject-label">{c.grade?`Grade ${c.grade} · `:''}{c.subject}</div><h2>{c.name}</h2><p className="cc-muted">Class code: {c.class_code}</p><Link className="cc-btn" href={`/teacher/roster/${c.id}`}>Manage students</Link></section>)}</div>}{!loading&&!classes.length&&!error&&<Empty><p>Create your first class to get started.</p><Link className="cc-btn" href="/teacher/assign">Create a class</Link></Empty>}</BridgePage>}
