import React, { useState } from "react";
import { Copy, Check, Terminal, FileCode, AlertTriangle, Lightbulb, CheckCircle2, HelpCircle } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
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

export const CodeBlockWithOutput = ({
    code,
    title,
    language = "bash",
    output,
}: {
    code: string;
    title?: string;
    language?: string;
    output?: string;
}) => {
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
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                        copied
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
                language={language}
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

            {/* Terminal Output */}
            {output && (
                <div className="border-t border-gray-700/60" style={{ background: "#141520" }}>
                    <div className="flex items-center gap-2 px-4 pt-3 pb-1">
                        <Terminal className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-xs font-semibold text-green-400 tracking-wide uppercase">Expected Output</span>
                    </div>
                    <pre className="px-4 pb-3 text-[13px] font-mono text-emerald-300/90 leading-relaxed whitespace-pre overflow-x-auto">
                        {output}
                    </pre>
                </div>
            )}
        </div>
    );
};

export const LearningUnitView = ({
    section,
    defaultLanguage = "bash",
}: {
    section: Section;
    defaultLanguage?: string;
}) => {
    const [showHint, setShowHint] = useState(false);
    const lang = section.code?.startsWith("name:") || section.code?.includes("apiVersion:") ? "yaml" : defaultLanguage;

    return (
        <div className="mb-12 pb-8 border-b border-gray-100 last:border-b-0">
            {/* 1. Unit Title */}
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 flex items-center justify-between">
                <span>{section.heading}</span>
            </h2>

            {/* Objectives */}
            {section.objectives && section.objectives.length > 0 && (
                <div className="mb-4 bg-amber-50/70 border border-amber-200/60 rounded-xl p-3.5">
                    <p className="text-xs font-bold text-amber-800 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                        Unit Learning Objectives:
                    </p>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-amber-900">
                        {section.objectives.map((obj, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-amber-500 font-bold">•</span>
                                <span>{obj}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* 2 & 3. Concept Definitions & Explanations */}
            <div className="text-gray-700 leading-relaxed whitespace-pre-line text-[15px] mb-4">
                {section.content}
            </div>

            {/* 4 & 5. Code & 6. Expected Output */}
            {section.code && (
                <CodeBlockWithOutput
                    code={section.code}
                    title={section.codeTitle}
                    language={lang}
                    output={section.output}
                />
            )}

            {/* 7. Code Walkthrough / Explanation */}
            {section.explanation && (
                <div className="my-4 bg-blue-50/70 border-l-4 border-blue-600 rounded-r-lg p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wide text-blue-900 mb-1 flex items-center gap-1.5">
                        <Lightbulb className="w-4 h-4 text-blue-600" />
                        How it works:
                    </h4>
                    <p className="text-sm text-blue-900 leading-relaxed whitespace-pre-line">{section.explanation}</p>
                </div>
            )}

            {/* Note / Pro-tip */}
            {section.note && (
                <div className="my-4 bg-slate-50 border-l-4 border-slate-900 rounded-r-lg p-4 flex gap-3">
                    <Lightbulb className="w-5 h-5 text-slate-900 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-800 leading-relaxed">{section.note}</p>
                </div>
            )}

            {/* 8. Common Mistakes and How to Fix Them */}
            {section.commonMistakes && section.commonMistakes.length > 0 && (
                <div className="my-5 bg-rose-50/60 border border-rose-200 rounded-xl p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800 mb-2 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-rose-600" />
                        Common Mistakes & Solutions:
                    </h4>
                    <div className="space-y-2">
                        {section.commonMistakes.map((item, idx) => (
                            <div key={idx} className="text-xs leading-relaxed text-gray-800 bg-white/80 p-2.5 rounded-lg border border-rose-100">
                                <p className="font-semibold text-rose-900 mb-0.5">⚠️ Mistake: {item.mistake}</p>
                                <p className="text-emerald-800 font-medium">💡 Fix: {item.fix}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 9. Small Practice Exercise */}
            {section.exercise && (
                <div className="my-5 bg-indigo-50/70 border border-indigo-200 rounded-xl p-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 mb-1.5 flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4 text-indigo-600" />
                        Hands-on Practice Exercise:
                    </h4>
                    <p className="text-xs sm:text-sm text-indigo-950 font-medium mb-2.5">{section.exercise.task}</p>
                    {section.exercise.hint && (
                        <div>
                            <button
                                onClick={() => setShowHint(!showHint)}
                                className="text-[11px] font-semibold text-indigo-700 hover:text-indigo-900 underline transition-colors"
                            >
                                {showHint ? "Hide Solution Hint ▲" : "Reveal Solution Hint ▼"}
                            </button>
                            {showHint && (
                                <div className="mt-2 text-xs font-mono bg-indigo-950 text-indigo-200 p-2.5 rounded-lg">
                                    {section.exercise.hint}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* 10. Key Takeaways */}
            {section.takeaways && section.takeaways.length > 0 && (
                <div className="my-5 bg-emerald-50/60 border border-emerald-200 rounded-xl p-3.5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 mb-1.5 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                        Key Takeaways:
                    </h4>
                    <ul className="space-y-1 text-xs text-emerald-900">
                        {section.takeaways.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                                <span className="text-emerald-600 font-bold">✓</span>
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
