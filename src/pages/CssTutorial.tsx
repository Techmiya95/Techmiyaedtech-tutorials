import { Link } from "react-router-dom";
import { BookOpen, ChevronRight, Home } from "lucide-react";
import { cssChapters } from "../data/cssContent";

const CssTutorial = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <nav className="flex items-center gap-2 text-sm text-gray-500">
                        <Link to="/" className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                            <Home className="w-3.5 h-3.5" /> Home
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-gray-900 font-medium">CSS Tutorial</span>
                    </nav>
                </div>
            </div>

            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 -z-10" />
                <div className="absolute top-10 right-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl -z-10" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    <div className="flex flex-col md:flex-row items-start gap-8">
                        <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center text-4xl shrink-0 shadow-sm border border-blue-700">
                            🎨
                        </div>
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">CSS3 Masterclass</h1>
                            <p className="mt-3 text-gray-600 max-w-2xl leading-relaxed">
                                Beyond the basics. Master Flexbox, Grid, Container Queries, and high-performance animations for modern, industrial-grade web interfaces.
                            </p>
                            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
                                <span className="flex items-center gap-1.5 text-gray-500">
                                    <BookOpen className="w-4 h-4" /> {cssChapters.length} Chapters
                                </span>
                                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full font-medium">Styling & Design</span>
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">Free</span>
                            </div>
                            <Link
                                to={`/css/${cssChapters[0].slug}`}
                                className="inline-flex items-center gap-2 mt-6 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
                            >
                                Start Chapter 1 →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Online Editor */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center gap-3">
                        <span className="text-2xl">💻</span>
                        <h2 className="text-xl font-bold text-white">Try CSS Online</h2>
                    </div>
                    <div className="p-4">
                        <iframe
                            src="https://onecompiler.com/embed/css"
                            width="100%"
                            height="500px"
                            style={{ border: "none", borderRadius: "0.75rem" }}
                            title="Online CSS Compiler"
                            allowFullScreen
                        />
                    </div>
                </div>
            </section>

            {/* Chapter List */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Table of Contents</h2>
                <div className="space-y-3">
                    {cssChapters.map((ch) => (
                        <Link
                            key={ch.id}
                            to={`/css/${ch.slug}`}
                            className="group flex items-center gap-4 p-4 rounded-xl border bg-white border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                        >
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold shrink-0 bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-sm">
                                {ch.id}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                    {ch.title}
                                </h3>
                                <p className="text-sm mt-0.5 text-gray-500">{ch.description}</p>
                            </div>
                            <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-blue-500 group-hover:translate-x-1 transition-all shrink-0" />
                        </Link>
                    ))}
                </div>

                <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-6 text-center">
                    <p className="text-blue-800 font-semibold">🚀 Industry Standard Patterns</p>
                    <p className="text-blue-600 text-sm mt-1">These topics are structured to help you build maintainable, scalable, and responsive frontend architectures.</p>
                </div>
            </section>
        </div>
    );
};

export default CssTutorial;
