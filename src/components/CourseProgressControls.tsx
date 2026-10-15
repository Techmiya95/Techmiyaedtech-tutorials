import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Circle, Lock, Unlock, Award, ArrowDownCircle, ShieldCheck } from "lucide-react";
import type { CertificationEligibility, CourseUnitItem } from "../lib/courseProgress";
import { checkCertificationEligibility, normalizeCourseKey } from "../lib/courseProgress";

interface LessonCompletionButtonProps {
  isCompleted: boolean;
  onToggle: () => void;
  unitTitle?: string;
  className?: string;
}

export const LessonCompletionButton: React.FC<LessonCompletionButtonProps> = ({
  isCompleted,
  onToggle,
  className = "",
}) => {
  return (
    <div
      className={`p-4 rounded-xl border transition-all ${
        isCompleted
          ? "bg-emerald-50/90 border-emerald-200 text-emerald-950"
          : "bg-slate-50 border-slate-200 text-slate-800"
      } ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          {isCompleted ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <ArrowDownCircle className="w-5 h-5 text-amber-500 shrink-0 animate-bounce" />
          )}
          <div>
            <p className="text-sm font-bold">
              {isCompleted ? "Chapter Completed ✓" : "Reading in Progress"}
            </p>
            <p className="text-xs text-gray-500">
              {isCompleted
                ? "Recorded automatically as you scrolled through and read this chapter."
                : "Scroll down through this chapter to automatically record completion."}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={onToggle}
          className={`shrink-0 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
            isCompleted
              ? "bg-emerald-100 hover:bg-emerald-200 text-emerald-800 border border-emerald-300"
              : "bg-slate-200 hover:bg-slate-300 text-slate-700"
          }`}
          title="Click to toggle completion status manually if desired"
        >
          {isCompleted ? "Completed (Saved)" : "Mark Done"}
        </button>
      </div>
    </div>
  );
};

interface CourseCertificationBannerProps {
  eligibility: CertificationEligibility;
  courseBasePath: string;
}

export const CourseCertificationBanner: React.FC<CourseCertificationBannerProps> = ({
  eligibility,
}) => {
  const { courseId, isEligible } = eligibility;

  // Unlocked State: When student enters the final chapter (or has entered it)
  if (isEligible) {
    return (
      <div className="mt-10 p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white shadow-xl border-2 border-amber-400">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-400 text-slate-950 shadow-sm">
              <Unlock className="w-3.5 h-3.5" /> Assessment Unlocked!
            </div>
            <h3 className="text-2xl font-extrabold tracking-tight text-white">
              Final Chapter Reached — Assessment Open
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              The official 50-mark certification assessment is now unlocked for you! It consists of 25 questions testing your knowledge of this course (2 marks per question). Score 30 or above (Grade B) to earn your verifiable Techmiya EdTech Certificate.
            </p>
          </div>
          <div className="shrink-0 w-full sm:w-auto">
            <Link
              to={`/assessment/${courseId}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all text-sm"
            >
              <Award className="w-4 h-4 text-slate-950" /> Start 50-Mark Assessment →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Locked State on Earlier Chapters: Notification that there is a test to take, kept locked
  return (
    <div className="mt-10 p-6 sm:p-7 rounded-2xl bg-slate-900 text-white shadow-xl border border-amber-500/40">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
            <Lock className="w-3.5 h-3.5" /> Assessment Notification • Locked
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
            Official Course Assessment (25 Questions / 50 Marks)
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
            <strong>Notice:</strong> An official 50-mark certification assessment is available for this tutorial. To earn your Techmiya EdTech certificate, pass the assessment with 30+ marks (Grade B or higher).
          </p>
          <div className="flex items-center gap-2 text-xs text-amber-300 bg-amber-950/40 border border-amber-500/30 px-3 py-2 rounded-lg">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>The assessment is currently <strong>locked</strong>. It will automatically unlock when you enter the final chapter!</span>
          </div>
        </div>
        <div className="shrink-0 w-full sm:w-auto">
          <button
            disabled
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800 text-slate-400 font-semibold px-5 py-3.5 rounded-xl border border-slate-700 cursor-not-allowed text-xs"
          >
            <Lock className="w-4 h-4 text-slate-500" />
            Assessment Locked (Opens on Final Chapter)
          </button>
        </div>
      </div>
    </div>
  );
};

interface CourseSidebarBadgeProps {
  eligibility: CertificationEligibility;
}

export const CourseSidebarBadge: React.FC<CourseSidebarBadgeProps> = ({ eligibility }) => {
  const { isEligible, courseId } = eligibility;

  if (isEligible) {
    return (
      <Link
        to={`/assessment/${courseId}`}
        className="flex items-center justify-between p-2.5 rounded-xl bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-300 text-slate-950 hover:bg-amber-200 transition-all text-xs font-bold"
      >
        <span className="flex items-center gap-1.5">
          <Award className="w-4 h-4 text-amber-600" />
          <span>Assessment Unlocked!</span>
        </span>
        <span className="text-[10px] bg-amber-500 text-slate-950 px-2 py-0.5 rounded-full font-extrabold">
          Take Exam →
        </span>
      </Link>
    );
  }

  return (
    <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-xs">
      <div className="flex items-center justify-between mb-1">
        <span className="flex items-center gap-1 font-semibold text-slate-800">
          <Lock className="w-3.5 h-3.5 text-slate-400" />
          <span>Assessment: Locked</span>
        </span>
        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
          Opens on Last Chapter
        </span>
      </div>
      <p className="text-[10px] text-slate-500 leading-tight">
        Official 50-mark test unlocks automatically when you enter the final chapter.
      </p>
    </div>
  );
};

export const CourseSidebarBottomNotification: React.FC<{
  eligibility: CertificationEligibility;
}> = ({ eligibility }) => {
  const { isEligible, courseId } = eligibility;

  if (isEligible) {
    return (
      <div className="mt-4 pt-3 border-t border-gray-200">
        <Link
          to={`/assessment/${courseId}`}
          className="block p-3 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-300 hover:border-amber-400 hover:shadow-sm transition-all"
        >
          <div className="flex items-center justify-between mb-1">
            <span className="flex items-center gap-1.5 text-xs font-bold text-slate-950">
              <Award className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Final Assessment</span>
            </span>
            <span className="text-[10px] bg-amber-500 text-slate-950 font-extrabold px-1.5 py-0.5 rounded">
              Unlocked!
            </span>
          </div>
          <p className="text-[11px] text-amber-900 font-medium leading-tight">
            25 Questions • 50 Marks. Click to start test →
          </p>
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-4 pt-3 border-t border-gray-200">
      <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
        <div className="flex items-center justify-between mb-1">
          <span className="flex items-center gap-1.5 text-xs font-bold text-gray-700">
            <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Final Assessment</span>
          </span>
          <span className="text-[10px] bg-slate-200 text-slate-600 font-bold px-1.5 py-0.5 rounded">
            Locked
          </span>
        </div>
        <p className="text-[11px] text-gray-500 leading-tight">
          25 Questions • 50 Marks.
          Notice: Test unlocks when you enter the final chapter.
        </p>
      </div>
    </div>
  );
};

export interface CourseOverviewAssessmentNotificationProps {
  courseId: string;
  chapters?: CourseUnitItem[];
  className?: string;
}

export const CourseOverviewAssessmentNotification: React.FC<CourseOverviewAssessmentNotificationProps> = ({
  courseId,
  chapters = [],
  className = "",
}) => {
  const [eligibility, setEligibility] = React.useState<CertificationEligibility>(() =>
    checkCertificationEligibility(courseId, chapters)
  );

  React.useEffect(() => {
    setEligibility(checkCertificationEligibility(courseId, chapters));
    const handleProgressChange = () => {
      setEligibility(checkCertificationEligibility(courseId, chapters));
    };
    window.addEventListener("techmiya_progress_updated", handleProgressChange);
    window.addEventListener("storage", handleProgressChange);
    return () => {
      window.removeEventListener("techmiya_progress_updated", handleProgressChange);
      window.removeEventListener("storage", handleProgressChange);
    };
  }, [courseId, chapters]);

  const { isEligible } = eligibility;
  const normalizedKey = normalizeCourseKey(courseId);

  if (isEligible) {
    return (
      <div
        className={`mt-8 p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white shadow-xl border-2 border-amber-400 ${className}`}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-amber-400 text-slate-950 shadow-sm">
              <Unlock className="w-3.5 h-3.5" /> Assessment Unlocked!
            </div>
            <h3 className="text-xl font-extrabold tracking-tight text-white">
              Official Certification Assessment (25 Questions / 50 Marks)
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
              You have reached the final chapter! The assessment lock is now open. Score 30+ marks (Grade B or above) to receive your verified Techmiya EdTech certificate.
            </p>
          </div>
          <div className="shrink-0 w-full sm:w-auto">
            <Link
              to={`/assessment/${normalizedKey}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold px-5 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all text-sm"
            >
              <Award className="w-4 h-4 text-slate-950" /> Start 50-Mark Assessment →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`mt-8 p-6 sm:p-7 rounded-2xl bg-slate-900 border border-amber-500/40 text-white shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 ${className}`}
    >
      <div className="space-y-1.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 border border-amber-500/30">
          <Lock className="w-3.5 h-3.5" /> Assessment Notification • Locked
        </div>
        <h3 className="text-xl font-bold text-white">
          Official Course Assessment (25 Questions / 50 Marks)
        </h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl leading-relaxed">
          <strong>Notice:</strong> There is an official certification test for this tutorial (25 questions &bull; 50 marks). Score 30+ marks (Grade B or above) to receive your verified Techmiya EdTech certificate. The assessment lock automatically opens when you reach and enter the final chapter!
        </p>
      </div>
      <div className="shrink-0 w-full sm:w-auto">
        <button
          disabled
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800 text-slate-400 font-semibold px-4 py-3 rounded-xl border border-slate-700 cursor-not-allowed text-xs"
        >
          <Lock className="w-4 h-4 text-slate-500" />
          Assessment Locked (Opens on Final Chapter)
        </button>
      </div>
    </div>
  );
};

