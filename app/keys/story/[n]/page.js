import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { supabaseAdmin } from "../../../../lib/supabaseAdmin";
import { buildReadingLesson, TRACK_LEVELS } from "../../../../lib/cases/relay-station";
import { getStoryChapter, chapterUnlocked, STORY_CHAPTERS, STORY_ACTS } from "../../../../lib/cases/relay-station/story";
import StoryChapterClient from "./StoryChapterClient";

// ClearKeys story chapter (Sept 29, 2026). /keys/story/5 shows the narration;
// /keys/story/5?type=1 opens the typing screen for the transmission.
// Chapters are practice: nothing is saved or graded.
export default async function StoryChapterPage({ params, searchParams }) {
  const studentId = cookies().get("cc_student_id")?.value;
  if (!studentId) redirect("/login");
  const chapter = getStoryChapter(params.n);
  if (!chapter) notFound();

  const [{ data: student }, { data: rs }] = await Promise.all([
    supabaseAdmin.from("students").select("id, equipped_sam_skin, sam_nickname").eq("id", studentId).single(),
    supabaseAdmin.from("relay_station_progress").select("current_level, completed_at, daily, accommodations, keyboard_skin").eq("student_id", studentId).maybeSingle(),
  ]);
  if (!student) redirect("/login");
  const unlock = {
    currentLevel: rs?.current_level || 1,
    trackComplete: !!rs?.completed_at || (rs?.current_level || 1) > TRACK_LEVELS.length,
    dailyDays: rs?.daily?.totalDays || 0,
  };
  if (!chapterUnlocked(chapter, unlock)) redirect("/keys#story");

  const next = STORY_CHAPTERS.find((c) => c.n === chapter.n + 1) || null;
  const act = STORY_ACTS.find((a) => a.chapters.includes(chapter.n));
  const lesson = buildReadingLesson({
    code: `STORY.${chapter.n}`,
    grade: chapter.n <= 10 ? 3 : 4,
    subject: "ELAR",
    kind: "story",
    title: `Chapter ${chapter.n}: ${chapter.title}`,
    intro: "Decode Iris's message exactly, letter for letter. The broken signal only uses keys you already know.",
    text: chapter.transmission,
  });
  lesson.lockedMode = "copy";
  // Early chapters come in with only a few keys; keep the goals gentle.
  lesson.goals = chapter.n <= 10 ? { accuracy: 90, wpm: 6 } : { accuracy: 90, wpm: 10 };

  return (
    <StoryChapterClient
      typing={searchParams?.type === "1"}
      chapter={{ n: chapter.n, title: chapter.title, narration: chapter.narration, act: act ? act.name : "" }}
      next={next && chapterUnlocked(next, unlock) ? { n: next.n, title: next.title } : null}
      lesson={lesson}
      student={{ samSkin: student.equipped_sam_skin || null, samNickname: student.sam_nickname || null }}
      rs={{ accommodations: rs?.accommodations || null, keyboardSkin: rs?.keyboard_skin || null, currentLevel: rs?.current_level || 1 }}
    />
  );
}
