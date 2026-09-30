import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "../../lib/supabaseAdmin";
import { getVisibleAssignmentsForStudent } from "../../lib/getStudentAssignments";
import { listRelayStationLessons, TRACK_LEVELS, rankFor, rankBadgeSrc, centralDateKey, continuesStreak } from "../../lib/cases/relay-station";
import { STORY_CHAPTERS, STORY_ACTS, chapterUnlocked, unlockHint } from "../../lib/cases/relay-station/story";
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
    supabaseAdmin.from("classes").select("grade").eq("id", student.class_id).maybeSingle(),
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
    .map((a) => ({ id: a.id, code: a.case_standard, title: String(a.cases?.title || "Reading").replace(/^(?:Relay Station|ClearKeys):\s*/i, ""), due: a.due_date || null }));

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
  const unlock = { currentLevel, trackComplete: !!progress?.completed_at || currentLevel > total, dailyDays: d.totalDays || 0 };
  const story = STORY_ACTS.map((act) => ({
    name: act.name,
    chapters: act.chapters.map((n) => {
      const c = STORY_CHAPTERS.find((x) => x.n === n);
      return { n, title: c.title, open: chapterUnlocked(c, unlock), hint: unlockHint(c) };
    }),
  }));
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
    />
  );
}
