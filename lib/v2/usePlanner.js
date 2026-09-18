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
import {
  ADD_TYPES,
  activitiesFromRoutines,
  defaultRoutinesForSetup,
  filterRoutinesForSetup,
  newBlankRoutine,
  offersStorageKey,
  openOffers,
  routinesStorageKey,
} from "./routines";
import {
  buildSundayBridgeBlocks,
  isSundayBridgeActivity,
  readSundayAppliedMeta,
  writeSundayAppliedMeta,
  clearSundayAppliedMeta,
} from "./demoSundayBridge";

const LS_SETUP = "ci2.teacher.setupKey";
const LS_CLASS = "ci2.teacher.classFilter";
const LS_LEVELS = "ci2.teacher.handsOffLevels"; // JSON map subject -> level key
/** Same key as lib/v2/demoStudentDay ADDED_ACTIVITIES_KEY — Student My Day reads this. */
const LS_ADDED = "ci2.teacher.addedActivities";

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

/** Persist Add / suggestion tiles so Student My Day can surface them (same browser). */
function isExtraActivity(a) {
  const id = String(a?.id || "");
  return id.startsWith("added-") || id.startsWith("new-");
}

function parseAdded(raw) {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((a) => a && a.id) : [];
  } catch {
    return [];
  }
}

function persistAdded(allActs) {
  const extras = (allActs || []).filter(isExtraActivity);
  writeLS(LS_ADDED, JSON.stringify(extras));
}

function defaultLevels() {
  const map = {};
  for (const s of ["math", "elar", "science", "social"]) {
    map[s] = DEMO_WEEK.handsOffLevel;
  }
  return map;
}


function parseRoutines(raw, subjects) {
  if (!raw) return defaultRoutinesForSetup(subjects);
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return defaultRoutinesForSetup(subjects);
    const filtered = filterRoutinesForSetup(parsed, subjects);
    return filtered.length ? filtered : defaultRoutinesForSetup(subjects);
  } catch {
    return defaultRoutinesForSetup(subjects);
  }
}

function parseDismissedOffers(raw) {
  if (!raw) return {};
  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
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
  const [routines, setRoutines] = useState(() => defaultRoutinesForSetup(TEACHER_SETUPS.self.subjects));
  const [dismissedOffers, setDismissedOffers] = useState({});
  const [showWeeksRun, setShowWeeksRun] = useState(false);
  const [showAddActivity, setShowAddActivity] = useState(false);
  const [addActivityDefaults, setAddActivityDefaults] = useState(null);
  /** @deprecated suggestion → routine bridge */
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
  const [sundayApplied, setSundayApplied] = useState(false);
  const [published, setPublished] = useState(false);
  const [toast, setToast] = useState(null);
  const [flashDays, setFlashDays] = useState(false);

  // Hydrate setup + period + hands-off levels + routines from localStorage so Week ↔ Day stay in sync.
  useEffect(() => {
    const sk = readLS(LS_SETUP);
    const ck = readLS(LS_CLASS);
    const lv = parseLevels(readLS(LS_LEVELS));
    const key = sk && TEACHER_SETUPS[sk] ? sk : "self";
    const subjects = (TEACHER_SETUPS[key] || TEACHER_SETUPS.self).subjects;
    if (sk && TEACHER_SETUPS[sk]) setSetupKeyState(sk);
    if (ck) setClassFilterState(ck);
    setLevelsBySubject(lv);
    setRoutines(parseRoutines(readLS(routinesStorageKey(key)), subjects));
    setDismissedOffers(parseDismissedOffers(readLS(offersStorageKey(key))));
    const added = parseAdded(readLS(LS_ADDED));
    if (added.length) {
      setActivities((prev) => {
        const ids = new Set(prev.map((x) => x.id));
        const merge = added.filter((a) => !ids.has(a.id));
        return merge.length ? [...prev, ...merge] : prev;
      });
    }
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
    const subjects = TEACHER_SETUPS[key].subjects;
    setRoutines(parseRoutines(readLS(routinesStorageKey(key)), subjects));
    setDismissedOffers(parseDismissedOffers(readLS(offersStorageKey(key))));
  }

  function persistRoutines(next, key = setupKey) {
    writeLS(routinesStorageKey(key), JSON.stringify(next));
  }

  function persistOffers(next, key = setupKey) {
    writeLS(offersStorageKey(key), JSON.stringify(next));
  }

  function updateRoutine(patch) {
    setRoutines((prev) => {
      const next = prev.map((r) => (r.id === patch.id ? { ...r, ...patch } : r));
      persistRoutines(next);
      return next;
    });
  }

  function addRoutine() {
    const blank = newBlankRoutine(setup.subjects);
    setRoutines((prev) => {
      const next = [...prev, blank];
      persistRoutines(next);
      return next;
    });
    setToast({ text: "New routine added — tap a blank to shape the sentence." });
  }

  function toggleRoutine(id) {
    let enabled = null;
    setRoutines((prev) => {
      const next = prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r));
      persistRoutines(next);
      enabled = next.find((r) => r.id === id)?.enabled;
      return next;
    });
    setToast({
      text: enabled
        ? "Routine on — it shows when Plan for me / Run it is set."
        : "Routine turned off.",
    });
  }

  function acceptRoutineOffer(offer) {
    if (!offer) return;
    if (offer.type === "pattern" && offer.routinePatch) {
      setRoutines((prev) => {
        const exists = prev.some((r) => r.id === offer.routinePatch.id);
        const next = exists
          ? prev.map((r) => (r.id === offer.routinePatch.id ? { ...r, ...offer.routinePatch, enabled: true } : r))
          : [...prev, { ...offer.routinePatch, enabled: true }];
        persistRoutines(next);
        return next;
      });
      setToast({ text: "Routine saved — edit the sentence anytime in How my weeks run." });
    } else if (offer.type === "hands_off_bump" && offer.bumpTo) {
      setLevel(offer.bumpTo, { allSubjects: false, subject: offer.subject });
      const name = (offer.subject || "math").charAt(0).toUpperCase() + (offer.subject || "math").slice(1);
      setToast({ text: `${name} will run itself — Sunday preview is still your safety net.` });
    }
    setDismissedOffers((prev) => {
      const next = { ...prev, [offer.id]: "accepted" };
      persistOffers(next);
      return next;
    });
  }

  function dismissRoutineOffer(id) {
    setDismissedOffers((prev) => {
      const next = { ...prev, [id]: "dismissed" };
      persistOffers(next);
      return next;
    });
    setToast({
      text: "Offer tucked away.",
      undo: () => {
        setDismissedOffers((prev) => {
          const next = { ...prev, [id]: undefined };
          persistOffers(next);
          return next;
        });
        setToast(null);
      },
    });
  }

  function openAddActivity(defaults = null) {
    setAddActivityDefaults(defaults);
    setShowAddActivity(true);
  }

  function addActivity({ typeKey, subject, day, classKey }) {
    const type = ADD_TYPES.find((t) => t.key === typeKey) || ADD_TYPES[0];
    const sub = subject || setup.subjects[0];
    const dayIdx = day == null ? 0 : Number(day);
    const classes =
      classKey && classKey !== "all"
        ? [classKey]
        : multiClass
          ? classFilter === "all"
            ? "all"
            : [classFilter]
          : "all";
    const id = `added-${Date.now()}`;
    const act = {
      id,
      subject: sub,
      day: dayIdx,
      kind: type.kind,
      title: type.title,
      product: type.product,
      minutes: type.minutes,
      who: "Everyone",
      classes,
      standard: "",
      isNew: true,
    };
    setActivities((prev) => {
      const next = [...prev, act];
      persistAdded(next);
      return next;
    });
    setShowAddActivity(false);
    setAddActivityDefaults(null);
    setToast({
      text: `Added "${act.title}" on ${DAY_NAMES[dayIdx]}.`,
      undo: () => {
        setActivities((prev) => {
          const next = prev.filter((x) => x.id !== id);
          persistAdded(next);
          return next;
        });
        setToast(null);
      },
    });
    return act;
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

  const leveledActivities = useMemo(() => {
    const base = applyHandsOffFullness(activities, levelsBySubject, setup.subjects);
    const fromRoutines = activitiesFromRoutines(routines, setup.subjects, levelsBySubject);
    const seen = new Set(base.map((a) => `${a.subject}|${a.day}|${a.title}`));
    const extras = fromRoutines.filter((a) => !seen.has(`${a.subject}|${a.day}|${a.title}`));
    return [...base, ...extras];
  }, [activities, levelsBySubject, setup.subjects, routines]);

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
    setActivities((prev) => {
      const next = prev.map((x) => (x.id === id ? { ...x, day } : x));
      persistAdded(next);
      return next;
    });
    setMenuId(null);
    setToast({
      text: `Moved "${act.title}" to ${DAY_NAMES[day]}.`,
      undo: () => {
        setActivities((prev) => {
          const next = prev.map((x) => (x.id === id ? { ...x, day: from } : x));
          persistAdded(next);
          return next;
        });
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
    setActivities((prev) => {
      const next = prev.filter((x) => x.id !== id);
      persistAdded(next);
      return next;
    });
    setSelectedId(null);
    setToast({
      text: `Removed "${act.title}".`,
      undo: () => {
        setActivities((prev) => {
          const next = [...prev, act];
          persistAdded(next);
          return next;
        });
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
      setRoutines((prev) => {
        const patch = {
          id: "rtn-math-monday",
          cadence: "every_week",
          subject: "math",
          who: "all_students",
          activity: "skill_builder",
          day: 0,
          enabled: true,
        };
        const exists = prev.some((r) => r.id === patch.id);
        const next = exists
          ? prev.map((r) => (r.id === patch.id ? { ...r, ...patch } : r))
          : [...prev, patch];
        persistRoutines(next);
        return next;
      });
      setHandled((h) => ({ ...h, [s.id]: "accepted" }));
      setToast({
        text: "Routine saved: Fraction practice every Monday — edit in How my weeks run.",
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
    setActivities((prev) => {
      const next = [...prev, { ...s.adds, id: newId, classes: [cls.key], isNew: true }];
      persistAdded(next);
      return next;
    });
    setHandled((h) => ({ ...h, [s.id]: "accepted" }));
    setToast({
      text: `Added "${s.adds.title}" on ${DAY_NAMES[s.day]}.`,
      undo: () => {
        setActivities((prev) => {
          const next = prev.filter((x) => x.id !== newId);
          persistAdded(next);
          return next;
        });
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

  /**
   * Sunday → This Week bridge: write demo routine blocks into addedActivities
   * so the preview isn't a dead end. Same-browser localStorage only.
   */
  function applySundayToThisWeek() {
    const blocks = buildSundayBridgeBlocks(outboundPreview, {
      classFilter,
      stamp: Date.now(),
    });
    setActivities((prev) => {
      const cleaned = prev.filter((a) => !isSundayBridgeActivity(a));
      const next = [...cleaned, ...blocks];
      persistAdded(next);
      return next;
    });
    writeSundayAppliedMeta({
      at: new Date().toISOString(),
      count: blocks.length,
      ids: blocks.map((b) => b.id),
    });
    setSundayApplied(true);
    setSundayAcked(true);
    setShowSundayPreview(false);
    setToast({
      text: `Applied ${blocks.length} block${blocks.length === 1 ? "" : "s"} to This Week.`,
      undo: () => {
        setActivities((prev) => {
          const next = prev.filter((a) => !isSundayBridgeActivity(a));
          persistAdded(next);
          return next;
        });
        clearSundayAppliedMeta();
        setSundayApplied(false);
        setToast(null);
      },
    });
    return blocks;
  }

  return {
    setupKey,
    setSetupKey,
    setup,
    hydrated,
    activities,
    handled,
    routines,
    updateRoutine,
    addRoutine,
    toggleRoutine,
    showWeeksRun,
    setShowWeeksRun,
    dismissedOffers,
    acceptRoutineOffer,
    dismissRoutineOffer,
    openRoutineOffers: openOffers(dismissedOffers, setup.subjects),
    enabledRoutineCount: routines.filter((r) => r.enabled && setup.subjects.includes(r.subject)).length,
    showAddActivity,
    setShowAddActivity,
    addActivityDefaults,
    openAddActivity,
    addActivity,
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
    applySundayToThisWeek,
    sundayApplied,
    setSundayApplied,
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
