import { Link } from "react-router-dom";
import { BookOpen, ChevronRight, Home, Award } from "lucide-react";
import { jiraChapters } from "../data/jiraContent";
import { CourseOverviewAssessmentNotification } from "../components/CourseProgressControls";

const JiraTutorial = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50/40 via-white to-gray-50/50">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <nav className="flex items-center gap-2 text-sm text-gray-500">
                        <Link to="/" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                            <Home className="w-3.5 h-3.5" /> Home
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                        <Link to="/devops" className="hover:text-blue-600 transition-colors">DevOps & Cloud</Link>
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                        <span className="text-gray-900 font-medium">Jira Tutorial</span>
                    </nav>
                </div>
            </div>

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    <div className="flex flex-col md:flex-row items-start gap-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl flex items-center justify-center text-4xl shrink-0 shadow-lg shadow-blue-500/20 text-white">
                            📋
                        </div>
                        <div>
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                                    Agile & DevOps Workflow
                                </span>
                                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                    <Award className="w-3.5 h-3.5 text-amber-600" /> 50-Mark Certification Available
                                </span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                                Jira Software & Agile Project Management
                            </h1>
                            <p className="mt-3 text-gray-600 max-w-2xl leading-relaxed">
                                Master Jira from fundamentals to enterprise agility. Learn project architecture, issues & work items, custom workflows, Scrum & Kanban boards, sprint estimation, JQL power queries, automation, and executive dashboards.
                            </p>
                            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                                <span className="flex items-center gap-1.5 font-medium text-gray-700">
                                    <BookOpen className="w-4 h-4 text-blue-600" /> {jiraChapters.length} Comprehensive Chapters
                                </span>
                                <span className="text-gray-300">•</span>
                                <span>Beginner to Professional</span>
                                <span className="text-gray-300">•</span>
                                <span>Atlassian Jira Cloud & Data Center</span>
                            </div>
                            <div className="mt-6 flex flex-wrap items-center gap-4">
                                <Link
                                    to={`/jira/${jiraChapters[0].slug}`}
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
                                >
                                    Start Chapter 1 →
                                </Link>
                                <Link
                                    to="/assessment/jira"
                                    className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-800 font-semibold px-5 py-3 rounded-xl border border-gray-200 shadow-sm transition-all"
                                >
                                    <Award className="w-4 h-4 text-amber-600" /> View Certification Requirements
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Table of Contents */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">📚 Course Curriculum</h2>
                        <p className="text-sm text-gray-500 mt-1">
                            Complete all {jiraChapters.length} units sequentially to unlock your official 50-mark certificate exam.
                        </p>
                    </div>
                </div>
                <div className="space-y-3">
                    {jiraChapters.map((ch) => (
                        <Link
                            key={ch.id}
                            to={`/jira/${ch.slug}`}
                            className="group flex items-center gap-4 p-4 rounded-xl border bg-white border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                        >
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-sm">
                                {ch.id}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {ch.title}
                                </h3>
                                <p className="text-sm mt-0.5 text-gray-500 line-clamp-1">{ch.description}</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all shrink-0" />
                        </Link>
                    ))}
                </div>

                <CourseOverviewAssessmentNotification courseId="jira" chapters={jiraChapters} />
            </section>
        </div>
    );
};

export default JiraTutorial;
