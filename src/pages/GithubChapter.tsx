import { useParams, Link } from "react-router-dom";
import { ChevronRight, ChevronLeft, Home, Award, Lock, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { githubChapters } from "../data/githubContent";
import { LearningUnitView } from "../components/LearningUnitView";
import { useCourseProgress } from "../lib/courseProgress";
import {
  LessonCompletionButton,
  CourseCertificationBanner,
  CourseSidebarBadge,
  CourseSidebarBottomNotification,
} from "../components/CourseProgressControls";

const GithubChapter = () => {
    const { slug } = useParams<{ slug: string }>();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const chapter = githubChapters.find((ch) => ch.slug === slug);
    const chapterIndex = githubChapters.findIndex((ch) => ch.slug === slug);
    const prevChapter = chapterIndex > 0 ? githubChapters[chapterIndex - 1] : null;
    const nextChapter = chapterIndex < githubChapters.length - 1 ? githubChapters[chapterIndex + 1] : null;

    const courseUnits = githubChapters.map((ch) => ({
        id: ch.id,
        slug: ch.slug,
        title: ch.title,
    }));

    const { completedSlugs, isCurrentCompleted, eligibility, toggleComplete } = useCourseProgress(
        "github",
        courseUnits,
        slug
    );

    useEffect(() => { window.scrollTo(0, 0); setSidebarOpen(false); }, [slug]);

    if (!chapter) return <div className="p-8 text-center text-gray-500">Chapter not found</div>;

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-gray-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <nav className="flex items-center gap-2 text-sm text-gray-500">
                        <Link to="/" className="flex items-center gap-1 hover:text-slate-900 transition-colors"><Home className="w-3.5 h-3.5" /> Home</Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <Link to="/devops" className="hover:text-slate-900 transition-colors">DevOps</Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <Link to="/devops/github" className="hover:text-slate-900 transition-colors">GitHub</Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-gray-900 font-medium truncate">{chapter.title}</span>
                    </nav>
                </div>
            </div>
            <div className="max-w-7xl mx-auto flex">
                <aside className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:sticky top-16 left-0 z-40 w-72 h-[calc(100vh-4rem)] bg-white border-r border-gray-100 overflow-y-auto transition-transform lg:block`}>
                    <div className="p-4">
                        <div className="mb-4 pb-3 border-b border-gray-100">
                            <CourseSidebarBadge eligibility={eligibility} />
                        </div>
                        <nav className="space-y-0.5">
                            {githubChapters.map((ch) => {
                                const isDone = completedSlugs.includes(ch.slug);
                                return (
                                    <Link key={ch.id} to={`/devops/github/${ch.slug}`} className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm ${ch.slug === slug ? "bg-slate-100 text-slate-900 font-semibold" : "text-gray-600 hover:bg-gray-50"}`}>
                                        <div className="flex items-center gap-2.5 truncate">
                                            <span className={`w-6 h-6 rounded text-xs flex items-center justify-center font-bold shrink-0 ${ch.slug === slug ? "bg-slate-900 text-white" : isDone ? "bg-emerald-100 text-emerald-800" : "bg-gray-100"}`}>
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
                <main className="flex-1 min-w-0 px-4 sm:px-8 lg:px-12 py-8 lg:py-10">
                    <div className="mb-8">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <p className="text-sm font-semibold text-slate-900">Chapter {chapter.id}</p>
                            {isCurrentCompleted ? (
                                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-lg">
                                    <Check className="w-3.5 h-3.5" /> Completed
                                </span>
                            ) : (
                                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-lg">
                                    In Progress
                                </span>
                            )}
                        </div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">{chapter.title}</h1>
                        <p className="mt-2 text-gray-500">{chapter.description}</p>
                    </div>
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
                        courseBasePath="/devops/github"
                    />

                    {/* Navigation */}
                    <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between items-center gap-4">
                        {prevChapter ? (
                            <Link to={`/devops/github/${prevChapter.slug}`} className="flex items-center gap-3 px-5 py-3 rounded-xl border border-gray-200 hover:border-slate-300 transition-all">
                                <ChevronLeft className="w-5 h-5 text-gray-400" />
                                <div><p className="text-xs text-gray-400">Previous</p><p className="font-semibold text-gray-700">{prevChapter.title}</p></div>
                            </Link>
                        ) : <div />}
                        {nextChapter ? (
                            <Link to={`/devops/github/${nextChapter.slug}`} className="flex items-center justify-end gap-3 px-5 py-3 rounded-xl border border-gray-200 hover:border-slate-300 transition-all text-right">
                                <div><p className="text-xs text-gray-400">Next</p><p className="font-semibold text-gray-700">{nextChapter.title}</p></div>
                                <ChevronRight className="w-5 h-5 text-gray-400" />
                            </Link>
                        ) : eligibility.isEligible ? (
                            <Link
                                to="/assessment/github"
                                className="flex items-center justify-end gap-3 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold hover:shadow-md transition-all text-right"
                            >
                                <div>
                                    <p className="text-xs text-amber-900 font-semibold">Ready for Exam</p>
                                    <p className="text-sm">Start 50-Mark Assessment →</p>
                                </div>
                                <Award className="w-5 h-5 text-slate-950" />
                            </Link>
                        ) : (
                            <div className="flex items-center justify-end gap-3 px-6 py-3 rounded-xl bg-slate-100 text-slate-400 border border-slate-200 text-right cursor-not-allowed">
                                <div>
                                    <p className="text-xs text-slate-400 font-semibold">Exam Locked</p>
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

export default GithubChapter;
