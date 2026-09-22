const ts=require("/opt/node22/lib/node_modules/typescript"),fs=require("fs");
require.extensions[".js"]=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,"utf8"),{compilerOptions:{module:1,target:7,esModuleInterop:true},fileName:f+"x"}).outputText,f);
const RS=require("/home/claude/cc/lib/cases/relay-station/index.js");
function syl(w){w=w.toLowerCase().replace(/[^a-z]/g,"");if(!w)return 0;if(w.length<=3)return 1;
  w=w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/,"").replace(/^y/,"");const m=w.match(/[aeiouy]{1,2}/g);return m?m.length:1;}
// Form-aware: a headline, a recipe step and a line of dialogue are not
// sentences of running prose, and scoring them as prose was the bug in the
// first pass (a headline with no period fused onto the sentence after it).
function sentencesOf(text){
  const out=[];
  text.split(/\n/).forEach((line)=>{
    let l=line.replace(/^\t+/,"").trim();
    if(!l) return;
    l=l.replace(/^(?:[A-Z][A-Za-z.' ]{0,18}|S\.A\.M\.):\s*/,"");   // speaker tags
    l=l.replace(/^\d+\.\s*/,"");                                    // numbered steps
    if(!/[.!?]$/.test(l)) { if(l.split(/\s+/).length<=8) return; }   // headings, list items
    l.split(/(?<=[.!?]["”']?)\s+/).forEach((s)=>{ s=s.trim(); if(/[a-z]/i.test(s)) out.push(s); });
  });
  return out;
}
function score(text){
  const sents=sentencesOf(text);
  const words=sents.join(" ").split(/\s+/).filter(w=>/[a-z]/i.test(w));
  const s=words.reduce((n,w)=>n+syl(w),0), W=words.length||1, S=sents.length||1;
  const longest=sents.map(x=>({x,n:x.split(/\s+/).length})).sort((a,b)=>b.n-a.n)[0]||{x:"",n:0};
  return { fk:+(0.39*(W/S)+11.8*(s/W)-15.59).toFixed(1), avg:+(W/S).toFixed(1), longest, sents:S };
}
const BAND={3:[2.0,4.2],4:[3.5,5.6],5:[5.0,7.2]}, MAXAVG={3:11,4:14,5:16}, MAXLONG={3:16,4:21,5:25};
// Forms where a prose reading level is the wrong yardstick: they are scored on
// sentence length only.
const PROSE=new Set(["paragraph","log","letter"]);
const rows=[];
for(const l of RS.listRelayStationLessons()){
  if(!l.text||["track","race","daily","vocabulary","numbers"].includes(l.kind)) continue;
  rows.push({code:l.code,grade:l.grade,kind:l.kind,prose:PROSE.has(l.kind),...score(l.text)});
}
const prose=rows.filter(r=>r.prose), other=rows.filter(r=>!r.prose);
const avg=a=>a.length?+(a.reduce((x,y)=>x+y,0)/a.length).toFixed(1):0;
console.log(`prose readings (paragraph/log/letter): ${prose.length}   other forms (dialogue, poem, recipe, how-to, news): ${other.length}`);
[3,4,5].forEach(g=>{
  const p=prose.filter(r=>r.grade===g);
  console.log(`  g${g} prose average FK ${avg(p.map(r=>r.fk))}  (band ${BAND[g][0]}-${BAND[g][1]})`);
});
const over=prose.filter(r=>r.fk>BAND[r.grade][1]).sort((a,b)=>(b.fk-BAND[b.grade][1])-(a.fk-BAND[a.grade][1]));
const under=prose.filter(r=>r.fk<BAND[r.grade][0]).sort((a,b)=>a.fk-b.fk);
console.log(`\nPROSE ABOVE GRADE: ${over.length} of ${prose.length}`);
over.forEach(r=>console.log(`   ${r.code.padEnd(12)} g${r.grade} ${r.kind.padEnd(9)} FK ${String(r.fk).padStart(4)} (max ${BAND[r.grade][1]})  avg ${String(r.avg).padStart(4)}w  longest ${r.longest.n}w`));
console.log(`\nPROSE BELOW GRADE: ${under.length}`);
under.forEach(r=>console.log(`   ${r.code.padEnd(12)} g${r.grade} ${r.kind.padEnd(9)} FK ${String(r.fk).padStart(4)} (min ${BAND[r.grade][0]})  avg ${r.avg}w`));
const longs=rows.filter(r=>r.longest.n>MAXLONG[r.grade]);
console.log(`\nSINGLE SENTENCES OVER THE GRADE LIMIT (any form): ${longs.length}`);
longs.sort((a,b)=>b.longest.n-a.longest.n).forEach(r=>console.log(`   ${r.code.padEnd(12)} g${r.grade} ${r.longest.n}w: ${r.longest.x.slice(0,95)}…`));
const wideAvg=rows.filter(r=>r.avg>MAXAVG[r.grade]);
console.log(`\nAVERAGE SENTENCE OVER THE GRADE LIMIT: ${wideAvg.length}`);
wideAvg.sort((a,b)=>b.avg-a.avg).forEach(r=>console.log(`   ${r.code.padEnd(12)} g${r.grade} avg ${r.avg}w (max ${MAXAVG[r.grade]})`));
