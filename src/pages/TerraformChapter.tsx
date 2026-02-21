import { useParams, Link, useNavigate } from "react-router-dom";
import { ChevronRight, ChevronLeft, Home, BookOpen, Copy, Check, AlertTriangle, Lightbulb, Menu, X, FileCode, Terminal } from "lucide-react";
import { useState, useEffect } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { terraformChapters } from "../data/terraformContent";
import type { Section } from "../data/javaContent";

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
            <div className="flex items-center justify-between px-4 py-2.5" style={{ background: "linear-gradient(135deg, #1e1f2e, #252738)" }}>
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500/80" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                        <div className="w-3 h-3 rounded-full bg-green-500/80" />
                    </div>
                    {title && (
                        <div className="flex items-center gap-1.5 ml-2">
                            <FileCode className="w-3.5 h-3.5 text-purple-400" />
                            <span className="text-xs font-mono text-gray-400">{title}</span>
                        </div>
                    )}
                </div>
                <button
                    onClick={handleCopy}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 ${copied ? "bg-green-500/20 text-green-400" : "bg-white/5 text-gray-400 hover:text-white"}`}
                >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? "Copied!" : "Copy"}
                </button>
            </div>
            <SyntaxHighlighter language="hcl" style={customStyle} showLineNumbers={true} wrapLines={true}>
                {code}
            </SyntaxHighlighter>
        </div>
    );
};

const SectionContent = ({ section }: { section: Section }) => {
    return (
        <div className="mb-10">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                {section.heading}
            </h2>
            <div className="text-gray-700 leading-relaxed whitespace-pre-line text-[15px] mb-4">
                {section.content}
            </div>
            {section.code && <CodeBlock code={section.code} title={section.codeTitle} output={section.output} />}
            {section.note && (
                <div className="mt-4 bg-purple-50 border-l-4 border-purple-500 rounded-r-lg p-4 flex gap-3">
                    <Lightbulb className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-purple-800 leading-relaxed">{section.note}</p>
                </div>
            )}
        </div>
    );
};

const TerraformChapter = () => {
    const { slug } = useParams<{ slug: string }>();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const chapter = terraformChapters.find((ch) => ch.slug === slug);
    const chapterIndex = terraformChapters.findIndex((ch) => ch.slug === slug);
    const prevChapter = chapterIndex > 0 ? terraformChapters[chapterIndex - 1] : null;
    const nextChapter = chapterIndex < terraformChapters.length - 1 ? terraformChapters[chapterIndex + 1] : null;

    useEffect(() => { window.scrollTo(0, 0); setSidebarOpen(false); }, [slug]);

    if (!chapter) return <div>Chapter not found</div>;

    return (
        <div className="min-h-screen bg-white">
            <div className="bg-gray-50 border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <nav className="flex items-center gap-2 text-sm text-gray-500">
                        <Link to="/" className="flex items-center gap-1 hover:text-purple-600 transition-colors"><Home className="w-3.5 h-3.5" /> Home</Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <Link to="/devops" className="hover:text-purple-600 transition-colors">DevOps</Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <Link to="/devops/terraform" className="hover:text-purple-600 transition-colors">Terraform</Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-gray-900 font-medium truncate">{chapter.title}</span>
                    </nav>
                </div>
            </div>
            <div className="max-w-7xl mx-auto flex">
                <aside className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 fixed lg:sticky top-16 left-0 z-40 w-72 h-[calc(100vh-4rem)] bg-white border-r border-gray-100 overflow-y-auto transition-transform lg:block`}>
                    <div className="p-4">
                        <nav className="space-y-0.5">
                            {terraformChapters.map((ch) => (
                                <Link key={ch.id} to={`/devops/terraform/${ch.slug}`} className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm ${ch.slug === slug ? "bg-purple-50 text-purple-800 font-semibold" : "text-gray-600 hover:bg-gray-50"}`}>
                                    <span className={`w-6 h-6 rounded text-xs flex items-center justify-center font-bold ${ch.slug === slug ? "bg-purple-600 text-white" : "bg-gray-100"}`}>{ch.id}</span>
                                    <span className="truncate">{ch.title}</span>
                                </Link>
                            ))}
                        </nav>
                    </div>
                </aside>
                <main className="flex-1 min-w-0 px-4 sm:px-8 lg:px-12 py-8 lg:py-10">
                    <div className="mb-8">
                        <p className="text-sm font-semibold text-purple-600 mb-1">Chapter {chapter.id}</p>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">{chapter.title}</h1>
                        <p className="mt-2 text-gray-500">{chapter.description}</p>
                    </div>
                    {chapter.sections.map((section, i) => <SectionContent key={i} section={section} />)}
                    <div className="mt-12 pt-8 border-t border-gray-200 flex justify-between gap-4">
                        {prevChapter && <Link to={`/devops/terraform/${prevChapter.slug}`} className="flex items-center gap-3 px-5 py-3 rounded-xl border border-gray-200 hover:border-purple-300 transition-all">
                            <ChevronLeft className="w-5 h-5 text-gray-400" />
                            <div><p className="text-xs text-gray-400">Previous</p><p className="font-semibold text-gray-700">{prevChapter.title}</p></div>
                        </Link>}
                        {nextChapter && <Link to={`/devops/terraform/${nextChapter.slug}`} className="flex items-center justify-end gap-3 px-5 py-3 rounded-xl border border-gray-200 hover:border-purple-300 transition-all text-right">
                            <div><p className="text-xs text-gray-400">Next</p><p className="font-semibold text-gray-700">{nextChapter.title}</p></div>
                            <ChevronRight className="w-5 h-5 text-gray-400" />
                        </Link>}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default TerraformChapter;
