"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DAY_NAMES,
  DEMO_WEEK,
  TEACHER_SETUPS,
  DEMO_ACTIVITIES,
  DEMO_SUGGESTIONS,
  HANDS_OFF_LEVELS,
  applyHandsOffFullness,
  filterSuggestionsForLevels,
  handsOffLevelMeta,
} from "./demoWeek";

const LS_SETUP = "ci2.teacher.setupKey";
const LS_CLASS = "ci2.teacher.classFilter";
const LS_LEVELS = "ci2.teacher.handsOffLevels"; // JSON map subject -> level key

function readLS(key) {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeLS(key, value) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, value);
  } catch {
    /* ignore quota / private mode */
  }
}

function defaultLevels() {
  const map = {};
  for (const s of ["math", "elar", "science", "social"]) {
    map[s] = DEMO_WEEK.handsOffLevel;
  }
  return map;
}

function parseLevels(raw) {
  const base = defaultLevels();
  if (!raw) return base;
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return base;
    return { ...base, ...parsed };
  } catch {
    return base;
  }
}

export function usePlanner() {
  const [setupKey, setSetupKeyState] = useState("self");
  const [hydrated, setHydrated] = useState(false);
  const setup = TEACHER_SETUPS[setupKey] || TEACHER_SETUPS.self;

  const [activities, setActivities] = useState(DEMO_ACTIVITIES);
  const [handled, setHandled] = useState({});
  const [routineIds, setRoutineIds] = useState([]);
  const [classFilter, setClassFilterState] = useState("A");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedId, setSelectedId] = useState(null);
  const [menuId, setMenuId] = useState(null);
  const [dragOverDay, setDragOverDay] = useState(null);
  /** @deprecated use levelsBySubject — kept as the dial's active subject level */
  const [level, setLevelState] = useState(DEMO_WEEK.handsOffLevel);
  const [levelsBySubject, setLevelsBySubject] = useState(defaultLevels);
  const [showLevels, setShowLevels] = useState(false);
  const [showSundayPreview, setShowSundayPreview] = useState(false);
  const [sundayAcked, setSundayAcked] = useState(false);
  const [published, setPublished] = useState(false);
  const [toast, setToast] = useState(null);
  const [flashDays, setFlashDays] = useState(false);

  // Hydrate setup + period + hands-off levels from localStorage so Week ↔ Day stay in sync.
  useEffect(() => {
    const sk = readLS(LS_SETUP);
    const ck = readLS(LS_CLASS);
    const lv = parseLevels(readLS(LS_LEVELS));
    if (sk && TEACHER_SETUPS[sk]) setSetupKeyState(sk);
    if (ck) setClassFilterState(ck);
    setLevelsBySubject(lv);
    setHydrated(true);
  }, []);

  // Keep legacy `level` in sync with dial target subject (filter or first subject).
  const dialSubject = subjectFilter !== "all" ? subjectFilter : setup.subjects[0];
  useEffect(() => {
    if (!hydrated) return;
    const next = levelsBySubject[dialSubject] || DEMO_WEEK.handsOffLevel;
    setLevelState(next);
  }, [hydrated, dialSubject, levelsBySubject]);

  function setSetupKey(key) {
    if (!TEACHER_SETUPS[key]) return;
    setSetupKeyState(key);
    writeLS(LS_SETUP, key);
    const first = TEACHER_SETUPS[key].classes[0]?.key || "A";
    setClassFilterState(first);
    writeLS(LS_CLASS, first);
    setSubjectFilter("all");
    setExpandedSections({});
    setSelectedId(null);
  }

  function setClassFilter(key) {
    setClassFilterState(key);
    writeLS(LS_CLASS, key);
  }

  /**
   * Set hands-off level for one subject, or for all subjects in the current setup when subjectFilter is "all".
   * Persists to localStorage. Triggers toast via caller.
   */
  function setLevel(key, opts = {}) {
    const meta = handsOffLevelMeta(key);
    if (!HANDS_OFF_LEVELS.some((l) => l.key === key)) return;

    const applyToAll = opts.allSubjects ?? subjectFilter === "all";
    const targets = applyToAll ? setup.subjects : [opts.subject || dialSubject];

    setLevelsBySubject((prev) => {
      const next = { ...prev };
      for (const s of targets) next[s] = key;
      writeLS(LS_LEVELS, JSON.stringify(next));
      return next;
    });
    setLevelState(key);
    setSundayAcked(false);

    const scope =
      targets.length > 1
        ? "all subjects in this setup"
        : targets[0]
          ? targets[0].charAt(0).toUpperCase() + targets[0].slice(1)
          : "this subject";

    setToast({
      text: `${scope}: weeks will run as “${meta.title}”. ${meta.dialHint || ""}`.trim(),
    });
  }

  // If stored class is missing from the active setup (e.g. elarss has only A/B), snap to first.
  useEffect(() => {
    if (!hydrated) return;
    const ok = setup.classes.some((c) => c.key === classFilter);
    if (!ok) {
      const first = setup.classes[0]?.key || "A";
      setClassFilterState(first);
      writeLS(LS_CLASS, first);
    }
  }, [hydrated, setupKey, setup.classes, classFilter]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 6000);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    if (!menuId) return;
    const close = () => setMenuId(null);
    window.addEventListener("click", close);
    return () => window.removeEventListener("click", close);
  }, [menuId]);

  const multiSubject = setup.subjects.length > 1;
  const multiClass = setup.classes.length > 1;
  const canCompact = setup.subjects.length >= 3;
  const levelTitle = HANDS_OFF_LEVELS.find((l) => l.key === level)?.title;
  const shownSubjects = subjectFilter === "all" ? setup.subjects : [subjectFilter];

  const leveledActivities = useMemo(
    () => applyHandsOffFullness(activities, levelsBySubject, setup.subjects),
    [activities, levelsBySubject, setup.subjects]
  );

  const visible = useMemo(() => {
    const classOk = (classes) => classFilter === "all" || classes === "all" || classes.includes(classFilter);
    return leveledActivities.filter((x) => shownSubjects.includes(x.subject) && classOk(x.classes));
  }, [leveledActivities, setupKey, subjectFilter, classFilter, shownSubjects]);

  const openSuggestions = useMemo(() => {
    const filtered = filterSuggestionsForLevels(DEMO_SUGGESTIONS, levelsBySubject, shownSubjects);
    return filtered.filter((s) => {
      if (handled[s.id] || !shownSubjects.includes(s.subject)) return false;
      if (!s.classKey || classFilter === "all") return true;
      const cls = setup.classes.find((c) => c.key === s.classKey) || setup.classes[0];
      return cls.key === classFilter;
    });
  }, [handled, setupKey, subjectFilter, classFilter, shownSubjects, setup.classes, levelsBySubject]);

  /** Outbound list for Sunday preview: day → subject → period. */
  const outboundPreview = useMemo(() => {
    const noSchool = new Set(DEMO_WEEK.noSchoolDays || []);
    const classOk = (classes) => classFilter === "all" || classes === "all" || classes.includes(classFilter);
    const rows = [];
    for (let day = 0; day < 5; day++) {
      if (noSchool.has(day)) {
        rows.push({
          id: `noschool-${day}`,
          day,
          type: "calendar",
          text: DEMO_WEEK.noSchoolLabel || `${DAY_NAMES[day]} — no school`,
        });
        continue;
      }
      const dayActs = leveledActivities
        .filter((x) => x.day === day && shownSubjects.includes(x.subject) && classOk(x.classes))
        .sort((a, b) => a.subject.localeCompare(b.subject) || (a.title || "").localeCompare(b.title || ""));
      for (const act of dayActs) {
        const periodLabel =
          act.classes === "all"
            ? multiClass
              ? "All periods"
              : setup.classes[0]?.name || "Class"
            : (Array.isArray(act.classes) ? act.classes : [act.classes])
                .map((k) => setup.classes.find((c) => c.key === k)?.name || k)
                .join(", ");
        rows.push({
          id: act.id,
          day,
          type: "assign",
          subject: act.subject,
          title: act.title,
          kind: act.kind,
          periodLabel,
          auto: !!act.auto,
          minutes: act.minutes,
        });
      }
    }
    return rows;
  }, [leveledActivities, shownSubjects, classFilter, multiClass, setup.classes]);

  const needsSundayPreview =
    setup.subjects.some((s) => {
      const lv = levelsBySubject[s] || DEMO_WEEK.handsOffLevel;
      return lv === "plan_for_me" || lv === "run_for_me";
    }) && !sundayAcked;

  const selected = activities.find((x) => x.id === selectedId) || null;
  const classNamesList = setup.classes.map((c) => c.name);
  const classList =
    classNamesList.length > 1 ? classNamesList.slice(0, -1).join(", ") + " and " + classNamesList.at(-1) : classNamesList[0];

  function moveTo(id, day) {
    const act = activities.find((x) => x.id === id) || leveledActivities.find((x) => x.id === id);
    if (!act || act.day === day) return;
    // Auto-injected tiles aren't in base activities — skip move or soft-toast.
    if (act.auto && !activities.some((x) => x.id === id)) {
      setToast({ text: "Auto routine — change hands-off or edit on Daily Focus (stub)." });
      return;
    }
    const from = act.day;
    setActivities((prev) => prev.map((x) => (x.id === id ? { ...x, day } : x)));
    setMenuId(null);
    setToast({
      text: `Moved "${act.title}" to ${DAY_NAMES[day]}.`,
      undo: () => {
        setActivities((prev) => prev.map((x) => (x.id === id ? { ...x, day: from } : x)));
        setToast(null);
      },
    });
  }

  function remove(id) {
    const act = activities.find((x) => x.id === id);
    if (!act) {
      setToast({ text: "Auto routine stays while “Run it” is on — switch dial to remove the feel." });
      return;
    }
    setActivities((prev) => prev.filter((x) => x.id !== id));
    setSelectedId(null);
    setToast({
      text: `Removed "${act.title}".`,
      undo: () => {
        setActivities((prev) => [...prev, act]);
        setToast(null);
      },
    });
  }

  function toggleClass(id, key) {
    setActivities((prev) =>
      prev.map((x) => {
        if (x.id !== id) return x;
        const all = setup.classes.map((c) => c.key);
        const current = x.classes === "all" ? all : x.classes;
        let next = current.includes(key) ? current.filter((k) => k !== key) : [...current, key];
        if (next.length === 0) next = current;
        return { ...x, classes: next.length === all.length ? "all" : next };
      })
    );
  }

  function acceptSuggestion(s) {
    if (s.routineFor) {
      setRoutineIds((r) => [...r, s.routineFor]);
      setHandled((h) => ({ ...h, [s.id]: "accepted" }));
      setToast({
        text: "Routine saved: Fraction practice every Monday.",
        undo: () => {
          setRoutineIds((r) => r.filter((x) => x !== s.routineFor));
          setHandled((h) => ({ ...h, [s.id]: undefined }));
          setToast(null);
        },
      });
      return;
    }
    const cls = setup.classes.find((c) => c.key === s.classKey) || setup.classes[0];
    const newId = `new-${s.id}`;
    setActivities((prev) => [...prev, { ...s.adds, id: newId, classes: [cls.key], isNew: true }]);
    setHandled((h) => ({ ...h, [s.id]: "accepted" }));
    setToast({
      text: `Added "${s.adds.title}" on ${DAY_NAMES[s.day]}.`,
      undo: () => {
        setActivities((prev) => prev.filter((x) => x.id !== newId));
        setHandled((h) => ({ ...h, [s.id]: undefined }));
        setToast(null);
      },
    });
  }

  function dismissSuggestion(id) {
    setHandled((h) => ({ ...h, [id]: "dismissed" }));
    setToast({
      text: "Suggestion hidden for this week.",
      undo: () => {
        setHandled((h) => ({ ...h, [id]: undefined }));
        setToast(null);
      },
    });
  }

  function publish() {
    setPublished(true);
    setToast({
      text: `Week published for ${classList}.`,
      undo: () => {
        setPublished(false);
        setToast(null);
      },
    });
  }

  function showSuggestions() {
    setFlashDays(true);
    setTimeout(() => setFlashDays(false), 1800);
  }

  function acknowledgeSundayPreview() {
    setSundayAcked(true);
    setShowSundayPreview(false);
    setToast({ text: "Looks good — you're set for the week." });
  }

  return {
    setupKey,
    setSetupKey,
    setup,
    hydrated,
    activities,
    handled,
    routineIds,
    classFilter,
    setClassFilter,
    subjectFilter,
    setSubjectFilter,
    expandedSections,
    setExpandedSections,
    selectedId,
    setSelectedId,
    menuId,
    setMenuId,
    dragOverDay,
    setDragOverDay,
    level,
    setLevel,
    levelsBySubject,
    dialSubject,
    showLevels,
    setShowLevels,
    showSundayPreview,
    setShowSundayPreview,
    sundayAcked,
    setSundayAcked,
    acknowledgeSundayPreview,
    needsSundayPreview,
    outboundPreview,
    published,
    toast,
    setToast,
    flashDays,
    multiSubject,
    multiClass,
    canCompact,
    levelTitle,
    shownSubjects,
    visible,
    openSuggestions,
    selected,
    classList,
    moveTo,
    remove,
    toggleClass,
    acceptSuggestion,
    dismissSuggestion,
    publish,
    showSuggestions,
  };
}
