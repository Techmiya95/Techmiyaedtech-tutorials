import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft, Home, BookOpen, Copy, Check, AlertTriangle, Lightbulb, Menu, X, FileCode, Terminal } from "lucide-react";
import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { pythonChapters } from "../data/pythonContent";
import { pythonChapters2 } from "../data/pythonContentPart2";
import type { Chapter, Section } from "../data/pythonContent";

// Merge all chapters
const allChapters: Chapter[] = [...pythonChapters, ...pythonChapters2];

// Custom theme based on vscDarkPlus with tweaks
const customStyle = {
    ...vscDarkPlus,
    'pre[class*="language-"]': {
        ...(vscDarkPlus as any)['pre[class*="language-"]'],
        background: "#1a1b26",
        margin: 0,
        padding: "1.25rem 1rem",
        fontSize: "0.875rem",
        lineHeight: "1.7",
    },
    'code[class*="language-"]': {
        ...(vscDarkPlus as any)['code[class*="language-"]'],
        background: "transparent",
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', Consolas, monospace",
        fontSize: "0.875rem",
    },
};

const CodeBlock = ({ code, title, output }: { code: string; title?: string; output?: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="my-6 rounded-xl overflow-hidden shadow-lg border border-gray-700/50" style={{ background: "#1a1b26" }}>
            {/* Header bar */}
            <div className="flex items-center justify-between px-4 py-2.5" style={{ background: "linear-gradient(135deg, #1e1f2e, #252738)" }}>
                <div className="flex items-center gap-3">
                    {/* macOS-style dots */}
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    {title && (
                        <div className="flex items-center gap-1.5 ml-2">
                            <FileCode className="w-3.5 h-3.5 text-blue-400" />
                            <span className="text-xs font-mono text-gray-400">{title}</span>
                        </div>
                    )}
                </div>
                <button
                    onClick={handleCopy}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 ${copied
                            ? "bg-green-500/20 text-green-400 border border-green-500/30"
                            : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10"
                        }`}
                >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied!" : "Copy"}
                </button>
            </div>

            {/* Syntax Highlighted Code */}
            <SyntaxHighlighter
                language="python"
                style={customStyle}
                showLineNumbers={true}
                wrapLines={true}
                lineNumberStyle={{
                    minWidth: "2.5em",
                    paddingRight: "1em",
                    color: "#3b4261",
                    fontStyle: "normal",
                    userSelect: "none",
                }}
            >
                {code}
            </SyntaxHighlighter>

            {/* Output section */}
            {output && (
                <div className="border-t border-gray-700/60" style={{ background: "#141520" }}>
                    <div className="flex items-center gap-2 px-4 pt-3 pb-1">
                        <Terminal className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-xs font-semibold text-green-400 tracking-wide uppercase">Output</span>
                    </div>
                    <pre className="px-4 pb-3 text-[13px] font-mono text-emerald-300/90 leading-relaxed whitespace-pre">{output}</pre>
                </div>
            )}
        </div>
    );
};

const SectionContent = ({ section }: { section: Section }) => {
    // Simple markdown-like bold rendering
    const renderText = (text: string) => {
        const parts = text.split(/(\*\*[^*]+\*\*)/g);
        return parts.map((part, i) => {
            if (part.startsWith("**") && part.endsWith("**")) {
                return <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>;
            }
            return <span key={i}>{part}</span>;
        });
    };

    return (
        <div className="mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                {section.heading}
            </h2>
            <div className="text-gray-700 leading-relaxed whitespace-pre-line text-[15px]">
                {section.content.split("\n").map((line, i) => (
                    <p key={i} className={`${line.startsWith("•") ? "ml-2" : ""} ${line === "" ? "mb-3" : "mb-1.5"}`}>
                        {renderText(line)}
                    </p>
                ))}
            </div>
            {section.code && (
                <CodeBlock code={section.code} title={section.codeTitle} output={section.output} />
            )}
            {section.note && (
                <div className="mt-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg p-4 flex gap-3">
                    <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-800 leading-relaxed">{section.note}</p>
                </div>
            )}
        </div>
    );
};

const PythonChapter = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const chapter = allChapters.find((ch) => ch.slug === slug);
    const chapterIndex = allChapters.findIndex((ch) => ch.slug === slug);
    const prevChapter = chapterIndex > 0 ? allChapters[chapterIndex - 1] : null;
    const nextChapter = chapterIndex < allChapters.length - 1 ? allChapters[chapterIndex + 1] : null;

    useEffect(() => {
        window.scrollTo(0, 0);
        setSidebarOpen(false);
    }, [slug]);

    if (!chapter) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Chapter Not Found</h1>
                    <Link to="/python" className="text-blue-600 hover:underline">← Back to Python Tutorial</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb */}
            <div className="bg-gray-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <nav className="flex items-center gap-2 text-sm text-gray-500">
                        <Link to="/" className="flex items-center gap-1 hover:text-amber-600 transition-colors">
                            <Home className="w-3.5 h-3.5" /> Home
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <Link to="/python" className="hover:text-amber-600 transition-colors">Python</Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-gray-900 font-medium truncate">{chapter.title}</span>
                    </nav>
                </div>
            </div>

            <div className="max-w-7xl mx-auto flex">
                {/* Mobile sidebar toggle */}
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="lg:hidden fixed bottom-6 left-6 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
                >
                    {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>

                {/* Sidebar */}
                <aside className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:sticky top-16 left-0 z-40 w-72 h-[calc(100vh-4rem)] bg-white lg:bg-transparent border-r border-gray-100 overflow-y-auto transition-transform duration-300 lg:block shrink-0`}>
                    <div className="p-4">
                        <Link to="/python" className="flex items-center gap-2 text-sm font-semibold text-blue-600 mb-4 hover:text-blue-700">
                            <BookOpen className="w-4 h-4" /> 🐍 Python Tutorial
                        </Link>
                        <nav className="space-y-0.5">
                            {allChapters.map((ch) => (
                                <Link
                                    key={ch.id}
                                    to={`/python/${ch.slug}`}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${ch.slug === slug
                                        ? "bg-blue-50 text-blue-700 font-semibold border border-blue-200"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                >
                                    <span className={`w-6 h-6 rounded text-xs flex items-center justify-center font-bold shrink-0 ${ch.slug === slug ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-500"
                                        }`}>
                                        {ch.id}
                                    </span>
                                    <span className="truncate">{ch.title}</span>
                                </Link>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Overlay for mobile */}
                {sidebarOpen && (
                    <div className="lg:hidden fixed inset-0 bg-black/30 z-30" onClick={() => setSidebarOpen(false)} />
                )}

                {/* Main content */}
                <main className="flex-1 min-w-0 px-4 sm:px-8 lg:px-12 py-8 lg:py-10">
                    {/* Chapter header */}
                    <div className="mb-8">
                        <p className="text-sm font-semibold text-blue-600 mb-1">Chapter {chapter.id}</p>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                            {chapter.title}
                        </h1>
                        <p className="mt-2 text-gray-500">{chapter.description}</p>
                    </div>

                    {/* Sections */}
                    {chapter.sections.map((section, i) => (
                        <SectionContent key={i} section={section} />
                    ))}

                    {/* Navigation */}
                    <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                        {prevChapter ? (
                            <Link
                                to={`/python/${prevChapter.slug}`}
                                className="flex items-center gap-3 px-5 py-3 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
                            >
                                <ChevronLeft className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                                <div>
                                    <p className="text-xs text-gray-400">Previous</p>
                                    <p className="font-semibold text-gray-700 group-hover:text-blue-600">{prevChapter.title}</p>
                                </div>
                            </Link>
                        ) : <div />}

                        {nextChapter ? (
                            <Link
                                to={`/python/${nextChapter.slug}`}
                                className="flex items-center justify-end gap-3 px-5 py-3 rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group text-right"
                            >
                                <div>
                                    <p className="text-xs text-gray-400">Next</p>
                                    <p className="font-semibold text-gray-700 group-hover:text-blue-600">{nextChapter.title}</p>
                                </div>
                                <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-blue-500" />
                            </Link>
                        ) : (
                            <Link
                                to="/python"
                                className="flex items-center justify-end gap-3 px-5 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-md transition-all"
                            >
                                <div className="text-right">
                                    <p className="text-xs text-blue-100">Completed!</p>
                                    <p className="font-semibold">Back to Python Tutorial</p>
                                </div>
                            </Link>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PythonChapter;
