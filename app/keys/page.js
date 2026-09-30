import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "../../lib/supabaseAdmin";
import { getVisibleAssignmentsForStudent } from "../../lib/getStudentAssignments";
import { getRelayStationLesson, listRelayStationLessons, TRACK_LEVELS, rankFor, rankBadgeSrc, centralDateKey, continuesStreak } from "../../lib/cases/relay-station";
import { STORY_CHAPTERS, STORY_ACTS, chapterUnlocked, unlockHint } from "../../lib/cases/relay-station/story";
import { ARCADE_GAMES, gameUnlocked } from "../../lib/cases/relay-station/arcade";
import { classFuel } from "../../lib/clearkeysFuel";
import { getClassPlanet, CLASS_PLANETS } from "../../lib/classPlanets";
import { readFluency } from "../../lib/fluencyServer";
import { normalizeFluency, fluencyPassedCount } from "../../lib/cases/relay-station/fluency";
import { readClassSettings, minutesOn } from "../../lib/clearkeysServer";
import { cleanSettings } from "../../lib/clearkeysWeekly";
import KeysClient from "./KeysClient";

// ClearKeys door (Sept 29, 2026): the student's typing home, open any time
// from the Home hub. Track, Daily Transmission, Relay Race, assigned
// readings, personal bests, and free play on any reading for their grade.
export default async function KeysPage() {
  const studentId = cookies().get("cc_student_id")?.value;
  if (!studentId) redirect("/login");

  const { data: student } = await supabaseAdmin
    .from("students")
    .select("id, first_name, class_id")
    .eq("id", studentId)
    .single();
  if (!student) redirect("/login");

  const [{ data: cls }, assignments, { data: progress }, { data: subs }] = await Promise.all([
    supabaseAdmin.from("classes").select("grade, planet_key").eq("id", student.class_id).maybeSingle(),
    getVisibleAssignmentsForStudent(studentId, student.class_id),
    supabaseAdmin
      .from("relay_station_progress")
      .select("current_level, level_results, completed_at, daily")
      .eq("student_id", studentId)
      .maybeSingle(),
    supabaseAdmin
      .from("submissions")
      .select("relay_station_data")
      .eq("student_id", studentId)
      .not("relay_station_data", "is", null),
  ]);

  const typing = (assignments || []).filter((a) => /^RS\./.test(String(a.case_standard || "")));
  const find = (suffix) => typing.find((a) => new RegExp(`^RS\\.[345]\\.${suffix}$`).test(a.case_standard)) || null;
  const track = find("TRACK");
  const daily = find("DAILY");
  const race = find("RACE");
  const readings = typing
    .filter((a) => !/\.(TRACK|DAILY|RACE)$/.test(a.case_standard))
    .map((a) => ({ id: a.id, code: a.case_standard, title: (getRelayStationLesson(a.case_standard) || {}).title || String(a.cases?.title || "Reading").replace(/^(?:Relay Station|ClearKeys)\s*[:\u00b7]\s*/i, "").replace(/^Custom:\s*/i, ""), due: a.due_date || null }));

  // Personal bests from every saved run: track levels, daily runs, readings.
  const total = TRACK_LEVELS.length;
  const currentLevel = progress?.current_level || 1;
  const levelResults = Object.values(progress?.level_results || {});
  const readingBests = (subs || []).map((s) => s.relay_station_data?.best).filter(Boolean);
  const dailyHistory = Array.isArray(progress?.daily?.history) ? progress.daily.history : [];
  const allRuns = [...levelResults.filter((r) => r.passed), ...readingBests, ...dailyHistory];
  const bestWpm = allRuns.reduce((m, r) => Math.max(m, Number(r.wpm) || 0), 0);
  const perfectRuns = allRuns.filter((r) => Number(r.accuracy) >= 100).length;
  const stars = levelResults.reduce((n, r) => n + (r.passed ? r.stars || 0 : 0), 0) + readingBests.reduce((n, r) => n + (r.stars || 0), 0);
  const rank = rankFor(currentLevel);
  // A streak only counts if it is still alive today (same rule as the Daily screen).
  const d = progress?.daily || {};
  const today = centralDateKey();
  const streakNow = d.lastDate === today || continuesStreak(d.lastDate, today) ? d.streak || 0 : 0;

  // Story campaign "The Hush": chapters unlock with track levels, then Daily days.
  const { fluency: fluencyRaw } = await readFluency(studentId);
  const fluencyPassed = fluencyPassedCount(fluencyRaw);
  const unlock = { currentLevel, trackComplete: !!progress?.completed_at || currentLevel > total, dailyDays: d.totalDays || 0, fluencyPassed };
  const fluencyCard = { open: unlock.trackComplete, passed: fluencyPassed, next: normalizeFluency(fluencyRaw).current };
  const story = STORY_ACTS.map((act) => ({
    name: act.name,
    chapters: act.chapters.map((n) => {
      const c = STORY_CHAPTERS.find((x) => x.n === n);
      return { n, title: c.title, open: chapterUnlocked(c, unlock), hint: unlockHint(c) };
    }),
  }));
  const arcade = ARCADE_GAMES.map((g) => ({ key: g.key, name: g.name, line: g.line, image: g.image, open: gameUnlocked(g, unlock), unlockLevel: g.unlockLevel }));
  // Class fuel goal: the whole class powers the relay beam together this week.
  const { data: mates } = await supabaseAdmin.from("students").select("id, active").eq("class_id", student.class_id);
  const mateIds = (mates || []).filter((m) => m.active !== false).map((m) => m.id);
  let mateRows = [];
  if (mateIds.length) {
    // Include Fluency passes when that column exists (add_clearkeys_fluency.sql).
    let res = await supabaseAdmin.from("relay_station_progress").select("level_results, daily, fluency").in("student_id", mateIds);
    if (res.error) res = await supabaseAdmin.from("relay_station_progress").select("level_results, daily").in("student_id", mateIds);
    mateRows = res.data || [];
  }
  const planet = getClassPlanet(cls?.planet_key) || CLASS_PLANETS[0];
  const fuel = { ...classFuel(mateRows, mateIds.length), planet: { name: planet.name, image: planet.image } };
  // Minutes-per-day goal (teacher sets it on the ClearKeys Overview).
  const settings = cleanSettings(await readClassSettings(student.class_id));
  const dailyDoneToday = d.lastDate === today;
  let nextStep = null;
  if (daily && !dailyDoneToday) nextStep = { label: "Start with today's Daily Transmission", href: `/activity/${daily.id}` };
  else if (track && !unlock.trackComplete) nextStep = { label: `Keep climbing: Level ${Math.min(currentLevel, total)}`, href: `/activity/${track.id}` };
  else if (unlock.trackComplete) nextStep = { label: "Build speed in Fluency", href: "/keys/fluency" };
  const minutes = settings.minutesPerDay ? { goal: settings.minutesPerDay, done: minutesOn(d, today), next: nextStep } : null;
  const grade = ["3", "4", "5"].includes(String(cls?.grade)) ? Number(cls.grade) : 3;
  const practice = listRelayStationLessons()
    .filter((l) => l.grade === grade && /^RS\.[345]\./.test(l.code) && !/\.(TRACK|DAILY|RACE)$/.test(l.code))
    .map((l) => ({ code: l.code, title: l.title, subject: l.subject || "ELAR", kind: l.kind || "" }));

  return (
    <KeysClient
      firstName={student.first_name || ""}
      track={track ? { id: track.id, code: track.case_standard } : null}
      daily={daily ? { id: daily.id, code: daily.case_standard } : null}
      race={race ? { id: race.id, code: race.case_standard } : null}
      readings={readings}
      level={{ current: Math.min(currentLevel, total), total, complete: !!progress?.completed_at || currentLevel > total, passed: levelResults.filter((r) => r.passed).length }}
      rank={{ name: rank, badge: rankBadgeSrc(rank) }}
      streak={{ now: streakNow, best: d.bestStreak || 0 }}
      bests={{ wpm: bestWpm, perfectRuns, stars }}
      history={dailyHistory.slice(-20).map((h) => ({ date: h.date, wpm: Number(h.wpm) || 0 }))}
      practice={practice}
      grade={grade}
      story={story}
      arcade={arcade}
      fuel={fuel}
      fluency={fluencyCard}
      minutes={minutes}
    />
  );
}
