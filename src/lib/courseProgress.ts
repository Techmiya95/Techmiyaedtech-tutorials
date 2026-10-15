import { useState, useEffect, useCallback } from "react";
import { githubChapters } from "../data/githubContent";
import { pythonChapters } from "../data/pythonContent";
import { pythonChapters2 } from "../data/pythonContentPart2";
import { allCChapters } from "../data/cIndex";
import { jiraChapters } from "../data/jiraContent";
import { javaChapters } from "../data/javaContent";
import { golangChapters } from "../data/golangContent";
import { allCppChapters } from "../data/cppIndex";
import { javascriptChapters } from "../data/javascriptContent";
import { allSqlChapters } from "../data/sqlIndex";
import { linuxChapters } from "../data/linuxContent";
import { flaskChapters } from "../data/flaskContent";
import { allDjangoChapters } from "../data/djangoIndex";
import { htmlChapters } from "../data/htmlContent";
import { cssChapters } from "../data/cssContent";
import { dockerChapters } from "../data/dockerContent";

export interface CourseUnitItem {
  id: number;
  slug: string;
  title: string;
}

export interface CourseProgressRecord {
  completedUnitSlugs: string[];
  hasEnteredFinalUnit?: boolean;
}

export interface CertificationEligibility {
  courseId: string;
  totalUnitsCount: number;
  completedUnitsCount: number;
  requiredEarlierUnitsCount: number;
  completedEarlierUnitsCount: number;
  allEarlierCompleted: boolean;
  hasEnteredFinalUnit: boolean;
  isCurrentUnitFinal: boolean;
  isEligible: boolean;
  missingEarlierUnits: CourseUnitItem[];
  finalUnit?: CourseUnitItem;
  status: "locked_progressing" | "locked_final_unit_incomplete" | "unlocked_final_unit" | "unlocked_already";
  statusMessage: string;
}

const STORAGE_PREFIX = "techmiya_progress_";

/**
 * Read saved progress for a given course from localStorage.
 */
export function getCourseProgress(courseId: string): CourseProgressRecord {
  if (typeof window === "undefined" || !window.localStorage) {
    return { completedUnitSlugs: [], hasEnteredFinalUnit: false };
  }
  try {
    const raw = localStorage.getItem(`${STORAGE_PREFIX}${courseId}`);
    if (!raw) return { completedUnitSlugs: [], hasEnteredFinalUnit: false };
    const parsed = JSON.parse(raw);
    return {
      completedUnitSlugs: Array.isArray(parsed.completedUnitSlugs) ? parsed.completedUnitSlugs : [],
      hasEnteredFinalUnit: Boolean(parsed.hasEnteredFinalUnit),
    };
  } catch (err) {
    console.warn(`Error reading progress for ${courseId}:`, err);
    return { completedUnitSlugs: [], hasEnteredFinalUnit: false };
  }
}

/**
 * Save progress record to localStorage and dispatch custom change event.
 */
export function saveCourseProgress(courseId: string, progress: CourseProgressRecord): void {
  if (typeof window === "undefined" || !window.localStorage) return;
  try {
    localStorage.setItem(`${STORAGE_PREFIX}${courseId}`, JSON.stringify(progress));
    window.dispatchEvent(new CustomEvent("techmiya_progress_updated", { detail: { courseId } }));
  } catch (err) {
    console.warn(`Error saving progress for ${courseId}:`, err);
  }
}

/**
 * Check if a unit is marked as completed in localStorage.
 */
export function isUnitCompleted(courseId: string, slug: string): boolean {
  const record = getCourseProgress(courseId);
  return record.completedUnitSlugs.includes(slug);
}

/**
 * Explicitly mark a unit as completed.
 * Note: Merely visiting or clicking does NOT call this.
 */
export function markUnitCompleted(courseId: string, slug: string): void {
  const record = getCourseProgress(courseId);
  if (!record.completedUnitSlugs.includes(slug)) {
    record.completedUnitSlugs.push(slug);
    saveCourseProgress(courseId, record);
  }
}

/**
 * Unmark a unit as completed.
 */
export function unmarkUnitCompleted(courseId: string, slug: string): void {
  const record = getCourseProgress(courseId);
  record.completedUnitSlugs = record.completedUnitSlugs.filter((s) => s !== slug);
  saveCourseProgress(courseId, record);
}

/**
 * Toggle unit completion status.
 */
export function toggleUnitCompleted(courseId: string, slug: string): boolean {
  const record = getCourseProgress(courseId);
  const exists = record.completedUnitSlugs.includes(slug);
  if (exists) {
    record.completedUnitSlugs = record.completedUnitSlugs.filter((s) => s !== slug);
  } else {
    record.completedUnitSlugs.push(slug);
  }
  saveCourseProgress(courseId, record);
  return !exists;
}

/**
 * Record that the student entered/visited the final unit.
 */
export function recordFinalUnitEntered(courseId: string): void {
  const record = getCourseProgress(courseId);
  if (!record.hasEnteredFinalUnit) {
    record.hasEnteredFinalUnit = true;
    saveCourseProgress(courseId, record);
  }
}

/**
 * Evaluate certification eligibility according to course completion requirements:
 *
 * 1. Before final unit: Certification remains locked.
 * 2. All earlier units (0 to N-2, including the second-to-last unit) must be completed.
 * 3. Entering the final unit activates certification IF all earlier units are complete.
 * 4. Merely opening or visiting earlier units or the final unit does NOT count as completion.
 * 5. If final unit is opened with incomplete earlier units, certification remains LOCKED.
 */
export function normalizeCourseKey(courseId: string): string {
  const lower = (courseId || "").toLowerCase().trim();
  if (lower === "git" || lower === "github" || lower === "devops/github" || lower === "git-github") return "github";
  if (lower === "c" || lower === "c-programming") return "c";
  if (lower === "cpp" || lower === "c++") return "cpp";
  if (lower === "js" || lower === "javascript") return "javascript";
  if (lower === "devops" || lower === "devops-fundamentals" || lower === "docker") return "devops";
  return lower;
}

export function checkCertificationEligibility(
  courseId: string,
  units: CourseUnitItem[],
  currentSlug?: string
): CertificationEligibility {
  const key = normalizeCourseKey(courseId);
  if (!units || units.length === 0) {
    return {
      courseId: key,
      totalUnitsCount: 0,
      completedUnitsCount: 0,
      requiredEarlierUnitsCount: 0,
      completedEarlierUnitsCount: 0,
      allEarlierCompleted: true,
      hasEnteredFinalUnit: true,
      isCurrentUnitFinal: true,
      isEligible: true,
      missingEarlierUnits: [],
      status: "unlocked_already",
      statusMessage: "Certification open for this course.",
    };
  }

  const progress = getCourseProgress(key);
  const totalUnitsCount = units.length;
  const finalUnit = units[totalUnitsCount - 1];
  const earlierUnits = units.slice(0, totalUnitsCount - 1);

  const isCurrentUnitFinal = Boolean(currentSlug && currentSlug === finalUnit.slug);

  // If currently entering the final unit, record entered state
  if (isCurrentUnitFinal && !progress.hasEnteredFinalUnit) {
    recordFinalUnitEntered(key);
    progress.hasEnteredFinalUnit = true;
  }

  const hasCompletedFinal = progress.completedUnitSlugs.includes(finalUnit.slug);
  const hasEnteredFinalUnit = Boolean(progress.hasEnteredFinalUnit || isCurrentUnitFinal || hasCompletedFinal);

  // Check which earlier units are completed
  const completedEarlier = earlierUnits.filter((u) => progress.completedUnitSlugs.includes(u.slug));
  const missingEarlierUnits = earlierUnits.filter((u) => !progress.completedUnitSlugs.includes(u.slug));
  const allEarlierCompleted = missingEarlierUnits.length === 0 || completedEarlier.length >= earlierUnits.length;

  const completedUnitsCount = progress.completedUnitSlugs.length;

  // Eligibility Rule:
  // The lock for the assessment opens when the student enters the last chapter (or has already entered it).
  // On earlier chapters before reaching the final chapter, the assessment remains locked.
  const isEligible = Boolean(hasEnteredFinalUnit || isCurrentUnitFinal);

  let status: CertificationEligibility["status"] = "locked_progressing";
  let statusMessage = "";

  if (isEligible) {
    if (isCurrentUnitFinal) {
      status = "unlocked_final_unit";
      statusMessage = "Assessment Unlocked! You have entered the final chapter of this course.";
    } else {
      status = "unlocked_already";
      statusMessage = "Assessment Unlocked! You have reached the final chapter requirements.";
    }
  } else {
    status = "locked_progressing";
    statusMessage = `Assessment Locked: Complete reading earlier lessons (${completedEarlier.length}/${earlierUnits.length}) and enter the final chapter to unlock.`;
  }

  return {
    courseId: key,
    totalUnitsCount,
    completedUnitsCount,
    requiredEarlierUnitsCount: earlierUnits.length,
    completedEarlierUnitsCount: completedEarlier.length,
    allEarlierCompleted,
    hasEnteredFinalUnit,
    isCurrentUnitFinal,
    isEligible,
    missingEarlierUnits,
    finalUnit,
    status,
    statusMessage,
  };
}

/**
 * Get the standardized list of units for a course ID.
 */
export function getCourseUnits(courseId: string): CourseUnitItem[] {
  const key = normalizeCourseKey(courseId);
  switch (key) {
    case "github":
      return githubChapters.map((c) => ({ id: c.id, slug: c.slug, title: c.title }));
    case "python": {
      const allPython = [...pythonChapters, ...pythonChapters2];
      return allPython.map((c) => ({ id: c.id, slug: c.slug, title: c.title }));
    }
    case "java":
      return javaChapters.map((c) => ({ id: c.id, slug: c.slug, title: c.title }));
    case "golang":
      return golangChapters.map((c) => ({ id: c.id, slug: c.slug, title: c.title }));
    case "c":
      return allCChapters.map((c) => ({ id: c.id, slug: c.slug, title: c.title }));
    case "cpp":
      return allCppChapters.map((c) => ({ id: c.id, slug: c.slug, title: c.title }));
    case "javascript":
      return javascriptChapters.map((c) => ({ id: c.id, slug: c.slug, title: c.title }));
    case "sql":
      return allSqlChapters.map((c) => ({ id: c.id, slug: c.slug, title: c.title }));
    case "linux":
      return linuxChapters.map((c) => ({ id: c.id, slug: c.slug, title: c.title }));
    case "flask":
      return flaskChapters.map((c) => ({ id: c.id, slug: c.slug, title: c.title }));
    case "django":
      return allDjangoChapters.map((c) => ({ id: c.id, slug: c.slug, title: c.title }));
    case "html":
      return htmlChapters.map((c) => ({ id: c.id, slug: c.slug, title: c.title }));
    case "css":
      return cssChapters.map((c) => ({ id: c.id, slug: c.slug, title: c.title }));
    case "devops":
      return dockerChapters.map((c) => ({ id: c.id, slug: c.slug, title: c.title }));
    case "jira":
      return jiraChapters.map((c) => ({ id: c.id, slug: c.slug, title: c.title }));
    default:
      return [];
  }
}


/**
 * React hook to manage course progress and certification eligibility.
 */
export function useCourseProgress(
  courseId: string,
  units: CourseUnitItem[],
  currentSlug?: string
) {
  const [completedSlugs, setCompletedSlugs] = useState<string[]>(() => {
    return getCourseProgress(courseId).completedUnitSlugs;
  });

  const [eligibility, setEligibility] = useState<CertificationEligibility>(() => {
    return checkCertificationEligibility(courseId, units, currentSlug);
  });

  const refresh = useCallback(() => {
    const prog = getCourseProgress(courseId);
    setCompletedSlugs([...prog.completedUnitSlugs]);
    setEligibility(checkCertificationEligibility(courseId, units, currentSlug));
  }, [courseId, units, currentSlug]);

  useEffect(() => {
    refresh();

    const handleStorageUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (!customEvent.detail || customEvent.detail.courseId === courseId) {
        refresh();
      }
    };

    window.addEventListener("techmiya_progress_updated", handleStorageUpdate);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener("techmiya_progress_updated", handleStorageUpdate);
      window.removeEventListener("storage", refresh);
    };
  }, [courseId, currentSlug, refresh]);

  // Automatically mark unit as completed when entering chapter and scrolling down
  useEffect(() => {
    if (!currentSlug) return;

    let marked = false;
    const checkAndMark = () => {
      if (marked) return;
      const scrollY = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
      // Mark as completed when user scrolls down (> 40px or reaches bottom of viewport)
      if (scrollY > 40 || (window.innerHeight + scrollY >= document.documentElement.scrollHeight - 50)) {
        marked = true;
        markUnitCompleted(courseId, currentSlug);
        refresh();
      }
    };

    window.addEventListener("scroll", checkAndMark, { passive: true });
    // Check initial position in case page was already scrolled down
    checkAndMark();

    return () => {
      window.removeEventListener("scroll", checkAndMark);
    };
  }, [courseId, currentSlug, refresh]);

  const toggleComplete = useCallback(
    (slugToToggle?: string) => {
      const targetSlug = slugToToggle || currentSlug;
      if (!targetSlug) return;
      toggleUnitCompleted(courseId, targetSlug);
      refresh();
    },
    [courseId, currentSlug, refresh]
  );

  const isCurrentCompleted = currentSlug ? completedSlugs.includes(currentSlug) : false;

  return {
    completedSlugs,
    isCurrentCompleted,
    eligibility,
    toggleComplete,
    refresh,
  };
}
