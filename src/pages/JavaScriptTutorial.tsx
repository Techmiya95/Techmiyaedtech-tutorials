import { Link } from "react-router-dom";
import { BookOpen, ChevronRight, Home } from "lucide-react";
import { javascriptChapters } from "../data/javascriptContent";

const JavaScriptTutorial = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-yellow-50/50 to-white">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <nav className="flex items-center gap-2 text-sm text-gray-500">
                        <Link to="/" className="flex items-center gap-1 hover:text-yellow-600 transition-colors">
                            <Home className="w-3.5 h-3.5" /> Home
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-gray-900 font-medium">JavaScript Tutorial</span>
                    </nav>
                </div>
            </div>

            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-white to-amber-50 -z-10" />
                <div className="absolute top-10 right-10 w-72 h-72 bg-yellow-200/20 rounded-full blur-3xl -z-10" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    <div className="flex flex-col md:flex-row items-start gap-8">
                        <div className="w-20 h-20 bg-yellow-400 rounded-2xl flex items-center justify-center text-4xl shrink-0 shadow-sm border border-yellow-500">
                            📜
                        </div>
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">JavaScript Tutorial</h1>
                            <p className="mt-3 text-gray-600 max-w-2xl leading-relaxed">
                                The language of the web. Learn modern JavaScript (ES6+) from scratch, including Arrow Functions, Async/Await, and DOM manipulation.
                            </p>
                            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
                                <span className="flex items-center gap-1.5 text-gray-500">
                                    <BookOpen className="w-4 h-4" /> {javascriptChapters.length} Chapters
                                </span>
                                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">Web Development</span>
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">Free</span>
                            </div>
                            <Link
                                to={`/javascript/${javascriptChapters[0].slug}`}
                                className="inline-flex items-center gap-2 mt-6 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
                            >
                                Start Chapter 1 →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Online JS Compiler */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center gap-3">
                        <span className="text-2xl">💻</span>
                        <h2 className="text-xl font-bold text-white">Try JavaScript Online</h2>
                    </div>
                    <div className="p-4">
                        <iframe
                            src="https://onecompiler.com/embed/javascript"
                            width="100%"
                            height="500px"
                            style={{ border: "none", borderRadius: "0.75rem" }}
                            title="Online JavaScript Compiler"
                            allowFullScreen
                        />
                    </div>
                </div>
            </section>

            {/* Chapter List */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Table of Contents</h2>
                <div className="space-y-3">
                    {javascriptChapters.map((ch) => (
                        <Link
                            key={ch.id}
                            to={`/javascript/${ch.slug}`}
                            className="group flex items-center gap-4 p-4 rounded-xl border bg-white border-gray-200 hover:border-yellow-300 hover:shadow-md transition-all duration-200"
                        >
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 bg-gradient-to-br from-yellow-400 to-amber-500 text-white shadow-sm">
                                {ch.id}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors">
                                    {ch.title}
                                </h3>
                                <p className="text-sm mt-0.5 text-gray-500">{ch.description}</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-yellow-500 group-hover:translate-x-1 transition-all shrink-0" />
                        </Link>
                    ))}
                </div>

                <div className="mt-8 bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-100 rounded-xl p-6 text-center">
                    <p className="text-yellow-800 font-semibold">🚀 More chapters are being added regularly!</p>
                    <p className="text-yellow-600 text-sm mt-1">Bookmark this page and check back for new content.</p>
                </div>
            </section>
        </div>
    );
};

export default JavaScriptTutorial;
