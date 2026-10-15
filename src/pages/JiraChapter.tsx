import { useParams, Link } from "react-router-dom";
import { ChevronRight, ChevronLeft, Home, Award, Lock, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { jiraChapters } from "../data/jiraContent";
import { LearningUnitView } from "../components/LearningUnitView";
import { useCourseProgress } from "../lib/courseProgress";
import {
  LessonCompletionButton,
  CourseCertificationBanner,
  CourseSidebarBadge,
  CourseSidebarBottomNotification,
} from "../components/CourseProgressControls";

const JiraChapter = () => {
    const { slug } = useParams<{ slug: string }>();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const chapter = jiraChapters.find((ch) => ch.slug === slug);
    const chapterIndex = jiraChapters.findIndex((ch) => ch.slug === slug);
    const prevChapter = chapterIndex > 0 ? jiraChapters[chapterIndex - 1] : null;
    const nextChapter = chapterIndex < jiraChapters.length - 1 ? jiraChapters[chapterIndex + 1] : null;

    const courseUnits = jiraChapters.map((ch) => ({
        id: ch.id,
        slug: ch.slug,
        title: ch.title,
    }));

    const { completedSlugs, isCurrentCompleted, eligibility, toggleComplete } = useCourseProgress(
        "jira",
        courseUnits,
        slug
    );

    useEffect(() => {
        window.scrollTo(0, 0);
        setSidebarOpen(false);
    }, [slug]);

    if (!chapter) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Chapter Not Found</h2>
                <p className="text-gray-500 mb-6">The requested Jira lesson could not be located.</p>
                <Link
                    to="/jira"
                    className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-sm transition-all"
                >
                    Back to Jira Overview →
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb Navigation */}
            <div className="bg-gray-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <nav className="flex items-center gap-2 text-sm text-gray-500">
                        <Link to="/" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                            <Home className="w-3.5 h-3.5" /> Home
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                        <Link to="/devops" className="hover:text-blue-600 transition-colors">DevOps</Link>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                        <Link to="/jira" className="hover:text-blue-600 transition-colors">Jira</Link>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-gray-900 font-medium truncate">{chapter.title}</span>
                    </nav>
                </div>
            </div>

            {/* Main Layout */}
            <div className="max-w-7xl mx-auto flex">
                {/* Sidebar Navigation */}
                <aside className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:sticky top-16 left-0 z-40 w-72 h-[calc(100vh-4rem)] bg-white border-r border-gray-100 overflow-y-auto transition-transform lg:block`}>
                    <div className="p-4">
                        <div className="mb-4 pb-3 border-b border-gray-100">
                            <CourseSidebarBadge eligibility={eligibility} />
                        </div>
                        <nav className="space-y-0.5">
                            {jiraChapters.map((ch) => {
                                const isDone = completedSlugs.includes(ch.slug);
                                const isCurrent = ch.slug === slug;
                                return (
                                    <Link
                                        key={ch.id}
                                        to={`/jira/${ch.slug}`}
                                        className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                                            isCurrent
                                                ? "bg-blue-50 text-blue-700 font-semibold border-l-2 border-blue-600"
                                                : "text-gray-600 hover:bg-gray-50"
                                        }`}
                                    >
                                        <div className="flex items-center gap-2.5 truncate">
                                            <span
                                                className={`w-6 h-6 rounded text-xs flex items-center justify-center font-bold shrink-0 ${
                                                    isCurrent
                                                        ? "bg-blue-600 text-white"
                                                        : isDone
                                                        ? "bg-emerald-100 text-emerald-800"
                                                        : "bg-gray-100 text-gray-500"
                                                }`}
                                            >
                                                {isDone ? "✓" : ch.id}
                                            </span>
                                            <span className="truncate">{ch.title}</span>
                                        </div>
                                        {isDone && (
                                            <span className="text-[10px] text-emerald-600 font-bold shrink-0 ml-1">
                                                Done
                                            </span>
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>
                        <CourseSidebarBottomNotification eligibility={eligibility} />
                    </div>
                </aside>

                {/* Chapter Content Area */}
                <main className="flex-1 min-w-0 px-4 sm:px-8 lg:px-12 py-8 lg:py-10">
                    <div className="mb-8">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <p className="text-sm font-bold uppercase tracking-wider text-blue-600">
                                Chapter {chapter.id} of {jiraChapters.length}
                            </p>
                            {isCurrentCompleted ? (
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg">
                                    <Check className="w-3.5 h-3.5" /> Lesson Completed
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">
                                    In Progress
                                </span>
                            )}
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                            {chapter.title}
                        </h1>
                        <p className="mt-2 text-base text-gray-500 leading-relaxed">
                            {chapter.description}
                        </p>
                    </div>

                    {/* Section Content & Learning Units */}
                    {chapter.sections.map((section, i) => (
                        <LearningUnitView key={i} section={section} defaultLanguage="bash" />
                    ))}

                    {/* Lesson Completion Action Button */}
                    <div className="mt-10">
                        <LessonCompletionButton
                            isCompleted={isCurrentCompleted}
                            onToggle={() => toggleComplete()}
                            unitTitle={chapter.title}
                        />
                    </div>

                    {/* Certification Status & Callout */}
                    <CourseCertificationBanner
                        eligibility={eligibility}
                        courseBasePath="/jira"
                    />

                    {/* Sequential Navigation Footer */}
                    <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between items-center gap-4">
                        {prevChapter ? (
                            <Link
                                to={`/jira/${prevChapter.slug}`}
                                className="flex items-center gap-3 px-5 py-3 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-gray-50/50 transition-all"
                            >
                                <ChevronLeft className="w-5 h-5 text-gray-400" />
                                <div>
                                    <p className="text-xs text-gray-400">Previous</p>
                                    <p className="font-semibold text-gray-800 text-sm">{prevChapter.title}</p>
                                </div>
                            </Link>
                        ) : <div />}

                        {nextChapter ? (
                            <Link
                                to={`/jira/${nextChapter.slug}`}
                                className="flex items-center justify-end gap-3 px-5 py-3 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-gray-50/50 transition-all text-right"
                            >
                                <div>
                                    <p className="text-xs text-gray-400">Next</p>
                                    <p className="font-semibold text-gray-800 text-sm">{nextChapter.title}</p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </Link>
                        ) : eligibility.isEligible ? (
                            <Link
                                to="/assessment/jira"
                                className="flex items-center justify-end gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold hover:shadow-md transition-all text-right"
                            >
                                <div>
                                    <p className="text-xs text-amber-950 font-bold uppercase">Ready for Exam</p>
                                    <p className="text-sm">Start 50-Mark Assessment →</p>
                                </div>
                                <Award className="w-5 h-5 text-slate-950" />
                            </Link>
                        ) : (
                            <div className="flex items-center justify-end gap-3 px-6 py-3 rounded-xl bg-slate-100 text-slate-400 border border-slate-200 text-right cursor-not-allowed">
                                <div>
                                    <p className="text-xs text-slate-400 font-semibold uppercase">Exam Locked</p>
                                    <p className="text-xs font-medium">Complete earlier units first</p>
                                </div>
                                <Lock className="w-4 h-4 text-slate-400" />
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default JiraChapter;
