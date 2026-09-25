// Assembly Deck readability gate. Every case's STUDENT-FACING text has to sit
// in its grade's band before it can ship. Grade 3 must read like grade 3.
const ts=require("/opt/node22/lib/node_modules/typescript"),fs=require("fs");
require.extensions[".js"]=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,"utf8"),{compilerOptions:{module:1,target:7,esModuleInterop:true},fileName:f+"x"}).outputText,f);
const CC=__dirname+"/../lib/cases/assembly-deck";
const PUB=require(CC+"/index.public.js"), SRV=require(CC+"/index.server.js");
// Sept 24, 2026 — word choice, not just sentence length (tools/lib/wordcheck.cjs).
const { checkWords, wordProblems } = require("./lib/wordcheck.cjs");
const SHOW_WORDS = process.argv.includes("--words");

// Bands: Flesch-Kincaid on the sentences a student reads and sorts, the
// average sentence length, and the longest single sentence allowed.
const BAND = {
  3: { fk: [2.0, 4.2], avg: 11, max: 16 },
  4: { fk: [3.5, 5.6], avg: 14, max: 21 },
  5: { fk: [5.0, 7.2], avg: 16, max: 25 },
};

function syllables(w){w=w.toLowerCase().replace(/[^a-z]/g,"");if(!w)return 0;if(w.length<=3)return 1;
  w=w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/,"").replace(/^y/,"");const m=w.match(/[aeiouy]{1,2}/g);return m?m.length:1;}
function fkOf(texts){
  const blob=texts.join(" ");
  const sentences=blob.split(/(?<=[.!?])\s+/).map(s=>s.trim()).filter(s=>/[a-z]/i.test(s));
  const words=blob.split(/\s+/).filter(w=>/[a-z]/i.test(w));
  const syl=words.reduce((n,w)=>n+syllables(w),0);
  const W=words.length||1,S=sentences.length||1;
  return { fk:+(0.39*(W/S)+11.8*(syl/W)-15.59).toFixed(1), avg:+(W/S).toFixed(1),
    longest:sentences.map(s=>({s,n:s.split(/\s+/).length})).sort((a,b)=>b.n-a.n)[0] };
}
let WARN=0; let fails=0; const bad=(m)=>{console.log("  ✗",m);fails++;};
console.log("case          grade   FK    avg   longest   band                         uncommon  rich");
for(const p of PUB.listAssemblyDeckCases()){
  const s=SRV.getAssemblyDeckServerCase(p.standard);
  const b=BAND[p.grade];
  // the sentences the student reads, sorts and is judged on
  const pieces=p.rounds.flatMap(r=>r.pieces.map(x=>x.text));
  // everything else on screen: brief, source, prompts, notes, protests, replies
  const around=[...p.brief, ...(p.source?p.source.lines:[]), ...p.rounds.flatMap(r=>[r.goal,r.rejectPrompt]),
    ...p.rounds.flatMap(r=>Object.values(s.rounds[r.id].decoys||{})),
    ...p.rounds.flatMap(r=>Object.values(s.rounds[r.id].misplacementNotes||{})),
    p.assembly.prompt,p.assembly.hint,p.explain.prompt,...p.explain.criteria,
    ...Object.values(s.decoyProtest||{}), ...(s.requester?Object.values(s.requester.replies||{}):[]),
    s.trap?s.trap.text:"", s.trap?s.trap.why:"", s.assemblyNote||"",
    // Chief's Debrief: both questions, every answer choice, and every note a
    // student can be shown. These are read under time pressure at the end of a
    // 20-minute center, so they are held to the same band as everything else.
    ...(p.debrief?[p.debrief.pinpoint?p.debrief.pinpoint.prompt:"", p.debrief.pinpoint?p.debrief.pinpoint.hint:"",
      p.debrief.quickCheck?p.debrief.quickCheck.prompt:"",
      ...((p.debrief.quickCheck?p.debrief.quickCheck.choices:[])||[]).map(c=>c.text)]:[]),
    ...(s.debrief?[s.debrief.pinpointWhy||"", s.debrief.pinpointMiss||"", ...Object.values(s.debrief.quickCheckWhy||{})]:[]),
  ].filter(Boolean);
  const P=fkOf(pieces), A=fkOf(around);
  const ok = P.fk>=b.fk[0] && P.fk<=b.fk[1] && P.avg<=b.avg && P.longest.n<=b.max && A.fk<=b.fk[1]+0.8;
  const W=checkWords([...pieces,...around],p.grade,{allow:p.vocab||[]});
  const wp=wordProblems(W,p.grade,p.standard);
  console.log(`${p.standard.padEnd(13)} ${p.grade}     ${String(P.fk).padStart(4)}  ${String(P.avg).padStart(5)}  ${String(P.longest.n).padStart(3)}w     ${b.fk[0]}-${b.fk[1]}, avg<=${b.avg}, max ${b.max}w ${ok?"✓":"✗"}   ${(W.uncommonShare*100).toFixed(1).padStart(5)}%  ${(W.richShare*100).toFixed(1).padStart(5)}% ${wp.length?"⚠":"✓"}`);
  if(SHOW_WORDS && W.uncommon.length) console.log("     uncommon:", W.uncommon.map(u=>u.word+(u.count>1?"×"+u.count:"")).join(", "));
  wp.forEach(m=>{console.log("  ⚠ word choice —",m);WARN++;});
  if(P.fk>b.fk[1]) bad(`${p.standard}: sentences read at ${P.fk}, above the grade-${p.grade} ceiling of ${b.fk[1]}`);
  if(P.fk<b.fk[0]) bad(`${p.standard}: sentences read at ${P.fk}, below the grade-${p.grade} floor of ${b.fk[0]} — too easy to be on grade`);
  if(P.avg>b.avg) bad(`${p.standard}: average sentence ${P.avg} words, over ${b.avg}`);
  if(P.longest.n>b.max) bad(`${p.standard}: longest sentence ${P.longest.n} words (max ${b.max}) — "${P.longest.s.slice(0,80)}…"`);
  if(A.fk>b.fk[1]+0.8) bad(`${p.standard}: the surrounding text (brief, notes, replies) reads at ${A.fk}, above ${(b.fk[1]+0.8).toFixed(1)}`);
}
// grades must actually separate from each other
const byGrade={};
for(const p of PUB.listAssemblyDeckCases()){
  const f=fkOf(p.rounds.flatMap(r=>r.pieces.map(x=>x.text))).fk;
  (byGrade[p.grade]=byGrade[p.grade]||[]).push(f);
}
const avg=(a)=>a.reduce((x,y)=>x+y,0)/a.length;
const g=Object.keys(byGrade).sort().map(k=>({k,v:+avg(byGrade[k]).toFixed(1)}));
console.log("\nseparation:", g.map(x=>`g${x.k}=${x.v}`).join("  "));
for(let i=1;i<g.length;i++) if(g[i].v-g[i-1].v<0.8) bad(`grade ${g[i].k} (${g[i].v}) does not read meaningfully harder than grade ${g[i-1].k} (${g[i-1].v})`);
console.log(fails?`\n${fails} PROBLEMS`:"\nALL CASES ON GRADE"); if(WARN) console.log(`${WARN} word-choice warnings (advisory until the thresholds are confirmed)`); process.exit(fails?1:0);
