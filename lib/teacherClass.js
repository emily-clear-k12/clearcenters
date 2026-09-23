// Remember only a class the teacher can currently access. URL context wins.
export function rememberedTeacherClass(classes, fallback = '') {
  if (typeof window === 'undefined') return fallback;
  const requested = new URLSearchParams(window.location.search).get('classId');
  let saved;
  try { saved = sessionStorage.getItem('cc-teacher-class'); } catch {}
  return [requested, saved].find(id => classes.some(c => c.id === id)) || fallback;
}
export function rememberTeacherClass(id) {
  if (!id || id === 'all') return;
  try { sessionStorage.setItem('cc-teacher-class', id); } catch {}
}
