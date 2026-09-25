// Classification Lab reading-level + word-choice check (Sept 24, 2026).
// Same bands and word check as the other *-gradecheck tools.
//   node tools/classification-lab-gradecheck.cjs <dir-of-case-json> [--words]
// "Prose" = full sentences a student reads: rules, notThis, definitions, question prompts and
// choices, and item labels that are full sentences. FK is judged on prose (floor and ceiling).
// Word choice covers every student-facing string.
const fs=require("fs"),path=require("path");
const { checkWords, wordProblems } = require("./lib/wordcheck.cjs");
const BAND={3:{fk:[2.0,4.2],avg:11,max:16},4:{fk:[3.5,5.6],avg:14,max:21},5:{fk:[5.0,7.2],avg:16,max:25}};
function syllables(w){w=w.toLowerCase().replace(/[^a-z]/g,"");if(!w)return 0;if(w.length<=3)return 1;
  w=w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/,"").replace(/^y/,"");const m=w.match(/[aeiouy]{1,2}/g);return m?m.length:1;}
const sentOf=t=>String(t).split(/(?<=[.!?])\s+/).map(s=>s.trim()).filter(s=>/[a-z]/i.test(s));
const isSentence=t=>/[.!?]["”)]?$/.test(String(t).trim())&&String(t).trim().split(/\s+/).length>=4;
function fk(sents){const W=sents.flatMap(s=>s.split(/\s+/).filter(w=>/[a-z]/i.test(w)));const S=sents.length||1,N=W.length||1;
  return {fk:+(0.39*(N/S)+11.8*(W.reduce((n,w)=>n+syllables(w),0)/N)-15.59).toFixed(1),avg:+(N/S).toFixed(1)};}
const dir=process.argv[2]||".", SHOW=process.argv.includes("--words");
let fails=0,warns=0; const rows=[];
for(const f of fs.readdirSync(dir).filter(f=>/-CL\.json$/.test(f)).sort()){
  const c=JSON.parse(fs.readFileSync(path.join(dir,f),"utf8")); const g=+c.grade.slice(-1), b=BAND[g], V=c.venn;
  const items=[...c.pages.flatMap(p=>p.items),...V.items];
  const prose=[...c.pages.flatMap(p=>[p.rule,p.notThis]),...c.defs.flat().map(d=>d.text),V.mc.prompt,V.multi.prompt,
    ...[...V.mc.choices,...V.multi.choices].map(x=>x.text),...items.map(i=>i.label).filter(isSentence)];
  const all=[c.title,...prose,...items.map(i=>i.label),...c.pages.flatMap(p=>p.items.map(i=>i.clue||"")),
    ...c.pages.flatMap(p=>p.groups.map(x=>x.label)),...V.labels.map(x=>x.text),V.inline.before,...V.inline.choices.map(x=>x.text)];
  const S=prose.filter(isSentence).flatMap(sentOf).filter(t=>t.split(/\s+/).length>=4), P=fk(S); const W=checkWords(all,g,{});
  const wp=wordProblems(W,g,c.id); const bad=[];
  if(P.fk>b.fk[1]+0.5) bad.push(`reads at FK ${P.fk}, above grade ${g} ceiling ${b.fk[1]}`);
  if(P.fk<b.fk[0]-0.5) bad.push(`reads at FK ${P.fk}, below grade ${g} floor ${b.fk[0]} (too easy)`);
  if(P.avg>b.avg) bad.push(`average sentence ${P.avg} words, over ${b.avg}`);
  bad.forEach(m=>{console.log("  ✗",c.id+":",m);fails++;});
  wp.forEach(m=>{console.log("  ⚠",m);warns++;});
  if(SHOW&&W.uncommon.length) console.log("    uncommon:",c.id,W.uncommon.map(u=>u.word).join(", "));
  rows.push([c.id,g,P.fk,P.avg,(W.uncommonShare*100).toFixed(1),bad.length?"✗":"✓"]);
}
console.log("\ncase                grade  FK    avg   uncommon%");
rows.forEach(r=>console.log(`${r[0].padEnd(20)} ${r[1]}   ${String(r[2]).padStart(4)}  ${String(r[3]).padStart(5)}   ${String(r[4]).padStart(5)}  ${r[5]}`));
const by={};rows.forEach(r=>(by[r[1]]=by[r[1]]||[]).push(r[2]));
console.log("\nmean FK by grade:",Object.keys(by).map(g=>`g${g} ${(by[g].reduce((a,b)=>a+b,0)/by[g].length).toFixed(1)}`).join(" · "));
console.log(`${rows.length-fails}/${rows.length} on grade · ${warns} word-choice warnings`);
process.exit(fails?1:0);
