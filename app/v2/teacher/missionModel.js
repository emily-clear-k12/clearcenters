// Sample-only planner data. Each setup/period owns a separate plan.
export const SUBJECTS = {
  math: { name: 'Math', unit: 'Fractions', color: '#1682ed' },
  elar: { name: 'ELAR', unit: 'Reading & reasoning', color: '#c933cc' },
  science: { name: 'Science', unit: 'Matter & energy', color: '#079eaa' },
  social: { name: 'Social Studies', unit: 'Texas regions', color: '#8050db' },
};
export const SETUPS = {
  self: { label: 'Self-contained · 4 subjects', subjects: ['math','elar','science','social'], periods: 1 },
  mathsci: { label: 'Math + Science · 3 classes', subjects: ['math','science'], periods: 3 },
  elarss: { label: 'ELAR + Social Studies · 3 classes', subjects: ['elar','social'], periods: 3 },
  scisoc: { label: 'Science + Social Studies · 3 classes', subjects: ['science','social'], periods: 3 },
  math4: { label: 'Math · 4 periods', subjects: ['math'], periods: 4 },
  math5: { label: 'Math · 5 periods', subjects: ['math'], periods: 5 },
  elar5: { label: 'ELAR · 5 periods', subjects: ['elar'], periods: 5 },
};
export const DAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday'];
export const KINDS = { teach:'Teach together', work:'Student work', small:'Small group', review:'Review together', check:'Assessment' };
export const PRODUCTS = ['ClearLessons','ClearSheets','ClearCenters','CrystalQuest','ClassCade Showdown','CrystalChecks'];
const TITLES = {
  math: [['Compare fractions','Fraction practice'],['Equivalent fractions','Fraction strips'],['Compare strategies','Fraction models'],['Fractions in context','The Pizza Problem'],['Fraction Showdown','CrystalCheck']],
  elar: [["Author’s purpose",'Purpose sort'],['Find text evidence','Evidence hunt'],['Make an inference','Read & respond'],['Compare viewpoints','Support your thinking'],['Reading review','Reading check']],
  science: [['Properties of matter','Investigate materials'],['Plan a fair test','Test and record'],['Mixtures','Sort the evidence'],['Mixtures & solutions','Explain the evidence'],['Matter Showdown','Reflect and apply']],
  social: [['Texas regions','Explore the map'],['The Gulf Coast','Map detectives'],['People and places','Use map clues'],['Compare regions','Regional evidence'],['Regions review','CrystalCheck']],
};
export function contextKey(setup, period) { return `${setup}:${period}`; }
export function seedPlan(setupKey, period) {
  return SETUPS[setupKey].subjects.flatMap(subject => TITLES[subject].flatMap((titles, day) => titles.map((title, i) => {
    const small = subject === 'math' && day === 2 && i === 1;
    const kind = small ? 'small' : day === 4 ? (i === 0 ? 'review' : subject === 'science' ? 'work' : 'check') : i === 0 ? 'teach' : 'work';
    return { id:`${subject}-${day}-${i}`, subject, day, title, kind,
      product:kind === 'teach' ? 'ClearLessons' : kind === 'check' ? 'CrystalChecks' : kind === 'review' ? 'ClassCade Showdown' : small ? 'ClearSheets' : subject === 'elar' || subject === 'science' ? 'ClearCenters' : 'ClearSheets',
      minutes:small ? 10 : i === 0 ? 15 : 20, students:small ? [1,2,3,4,5,6] : [], note:'' };
  })));
}
export function validActivity(a, setupKey) {
  return a && typeof a.id === 'string' && SETUPS[setupKey].subjects.includes(a.subject) && Number.isInteger(a.day) && a.day >= 0 && a.day < 5 && typeof a.title === 'string' && a.title.trim().length > 0 && a.title.length <= 120 && KINDS[a.kind] && PRODUCTS.includes(a.product) && Number.isInteger(a.minutes) && a.minutes > 0 && a.minutes <= 180 && typeof a.note === 'string' && Array.isArray(a.students) && a.students.every(n=>Number.isInteger(n)&&n>=1&&n<=24) && new Set(a.students).size === a.students.length;
}
export function loadSaved(raw) {
  const value = JSON.parse(raw);
  if(value.version !== 1 || typeof value.plans !== 'object' || !value.plans) return {};
  const out = {};
  for(const [key, plan] of Object.entries(value.plans)) {
    const [setup, period] = key.split(':');
    if(SETUPS[setup] && Number(period)>=1 && Number(period)<=SETUPS[setup].periods && Array.isArray(plan) && plan.length<=500 && plan.every(a=>validActivity(a,setup)) && new Set(plan.map(a=>a.id)).size === plan.length) out[key]=plan;
  }
  return out;
}
export function moveActivity(plan, id, day) {
  if(!Number.isInteger(day)||day<0||day>4) return plan;
  return plan.map(a=>a.id===id?{...a,day}:a);
}
