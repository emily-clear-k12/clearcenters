// ClearKeys story check (Sept 29, 2026): run `node tools/clearkeys-story-check.cjs`.
//  1. Every track chapter's transmission uses only keys taught at or before its level.
//  2. Plain ASCII only (a student can't type smart quotes or em dashes).
//  3. Narration reading level: grade 3 band early, drifting to the grade 4 band by the end.
const ts=require("/opt/node22/lib/node_modules/typescript"),fs=require("fs");
require.extensions[".js"]=(m,f)=>m._compile(ts.transpileModule(fs.readFileSync(f,"utf8"),{compilerOptions:{module:1,target:7,esModuleInterop:true},fileName:f+"x"}).outputText,f);
const RS=require(__dirname+"/../lib/cases/relay-station/index.js");
const {STORY_CHAPTERS}=require(__dirname+"/../lib/cases/relay-station/story.js");
function syl(w){w=w.toLowerCase().replace(/[^a-z]/g,"");if(!w)return 0;if(w.length<=3)return 1;
  w=w.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/,"").replace(/^y/,"");const m=w.match(/[aeiouy]{1,2}/g);return m?m.length:1;}
function score(text){
  const sents=text.split(/(?<=[.!?]["']?)\s+/).map(s=>s.trim()).filter(s=>/[a-z]/i.test(s));
  const words=sents.join(" ").split(/\s+/).filter(w=>/[a-z]/i.test(w));
  const s=words.reduce((n,w)=>n+syl(w),0),W=words.length||1,S=sents.length||1;
  return {fk:+(0.39*(W/S)+11.8*(s/W)-15.59).toFixed(1),avg:+(W/S).toFixed(1),longest:Math.max(...sents.map(x=>x.split(/\s+/).length))};
}
let bad=0;
const target=(n)=>n<=10?{g:3,band:[2.0,4.2],avg:11,long:16}:{g:4,band:[3.0,5.6],avg:14,long:21};
for(const c of STORY_CHAPTERS){
  const t=c.transmission, probs=[];
  if(/[^\x09\x0A\x20-\x7E]/.test(t)) probs.push("non-ASCII character in transmission");
  if(c.level){
    const allowed=new Set([...RS.trackAllowedChars(c.level-1)]);
    const extra=[...new Set([...t].filter(ch=>!allowed.has(ch)))];
    if(extra.length) probs.push(`keys not taught by Level ${c.level}: ${JSON.stringify(extra.join(""))}`);
  }
  const nar=score(c.narration.join(" ")), tg=target(c.n);
  if(nar.fk>tg.band[1]) probs.push(`narration reads above grade ${tg.g} (FK ${nar.fk})`);
  if(nar.longest>tg.long) probs.push(`narration sentence too long (${nar.longest}w)`);
  const tx=t.split(/\s+/).filter(Boolean).length;
  console.log(`${String(c.n).padStart(2)} ${c.title.padEnd(22)} narration FK ${String(nar.fk).padStart(4)} avg ${String(nar.avg).padStart(4)}w | transmission ${String(tx).padStart(3)} words ${probs.length?"  <-- "+probs.join("; "):""}`);
  bad+=probs.length;
}
const early=STORY_CHAPTERS.filter(c=>c.n<=10).map(c=>score(c.narration.join(" ")).fk), late=STORY_CHAPTERS.filter(c=>c.n>=17).map(c=>score(c.narration.join(" ")).fk);
const avg=a=>+(a.reduce((x,y)=>x+y,0)/a.length).toFixed(1);
console.log(`\nnarration average FK: chapters 1-10 ${avg(early)}, chapters 17-24 ${avg(late)}`);
console.log(bad?`\n${bad} problem(s).`:"\nAll chapters pass.");
process.exit(bad?1:0);
