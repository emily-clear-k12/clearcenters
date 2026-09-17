"use client";

// CI2.0 · shared "This Week" planner foundation.
//
// All of the planner's data, rules and actions live here, so every design
// version (B: professional/modern, C: the bold concept) behaves exactly the
// same and only the look differs. Screens call usePlanner() and draw
// whatever they like with what it returns.

import { useEffect, useMemo, useState } from "react";
import {
  DAY_NAMES,
  DEMO_WEEK,
  TEACHER_SETUPS,
  DEMO_ACTIVITIES,
  DEMO_SUGGESTIONS,
  HANDS_OFF_LEVELS,
} from "./demoWeek";

export function usePlanner() {
  const [setupKey, setSetupKey] = useState("mathsci");
  const setup = TEACHER_SETUPS[setupKey];

  const [activities, setActivities] = useState(DEMO_ACTIVITIES);
  const [handled, setHandled] = useState({}); // suggestion id -> "accepted" | "dismissed"
  const [routineIds, setRoutineIds] = useState([]);
  const [classFilter, setClassFilter] = useState("all");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [expandedSections, setExpandedSections] = useState({}); // "day-subject" -> true
  const [selectedId, setSelectedId] = useState(null);
  const [menuId, setMenuId] = useState(null);
  const [dragOverDay, setDragOverDay] = useState(null);
  const [level, setLevel] = useState(DEMO_WEEK.handsOffLevel);
  const [showLevels, setShowLevels] = useState(false);
  const [published, setPublished] = useState(false);
  const [toast, setToast] = useState(null);
  const [flashDays, setFlashDays] = useState(false);

  // Reset view controls when the sandbox "Preview as" setup changes.
  useEffect(() => {
    setClassFilter("all");
    setSubjectFilter("all");
    setExpandedSections({});
    setSelectedId(null);
  }, [setupKey]);

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

  const visible = useMemo(() => {
    const classOk = (classes) => classFilter === "all" || classes === "all" || classes.includes(classFilter);
    return activities.filter((x) => shownSubjects.includes(x.subject) && classOk(x.classes));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activities, setupKey, subjectFilter, classFilter]);

  const openSuggestions = useMemo(
    () =>
      DEMO_SUGGESTIONS.filter((s) => {
        if (handled[s.id] || !shownSubjects.includes(s.subject)) return false;
        if (!s.classKey || classFilter === "all") return true;
        const cls = setup.classes.find((c) => c.key === s.classKey) || setup.classes[0];
        return cls.key === classFilter;
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [handled, setupKey, subjectFilter, classFilter]
  );

  const selected = activities.find((x) => x.id === selectedId) || null;
  const classNamesList = setup.classes.map((c) => c.name);
  const classList =
    classNamesList.length > 1 ? `${classNamesList.slice(0, -1).join(", ")} and ${classNamesList.at(-1)}` : classNamesList[0];

  // ----- actions -----

  function moveTo(id, day) {
    const act = activities.find((x) => x.id === id);
    if (!act || act.day === day) return;
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
        if (next.length === 0) next = current; // always keep at least one class
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
      text: `Added "${s.adds.title}" on ${DAY_NAMES[s.day]}${multiClass ? ` for ${cls.name}` : ""}.`,
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
    const first = openSuggestions[0];
    if (first) document.getElementById(`day-${first.day}`)?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }

  return {
    setupKey,
    setSetupKey,
    setup,
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
    showLevels,
    setShowLevels,
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
