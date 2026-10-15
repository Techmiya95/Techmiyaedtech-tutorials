import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Code, Search, TrendingUp, Users, Award, ArrowRight, X } from "lucide-react";

const tutorials = [
    {
        title: "DevOps Ecosystem",
        description:
            "Master CI/CD, Cloud, Containers, and Automation — AWS, Jenkins, Docker, K8s, Terraform, and Monitoring.",
        icon: "♾️",
        color: "from-violet-600 to-indigo-700",
        bgLight: "bg-violet-50",
        borderColor: "border-violet-200",
        hoverShadow: "hover:shadow-violet-200/50",
        link: "/devops",
        topics: "Multi-tool",
        level: "Beginner to Professional",
        keywords: ["devops", "aws", "jenkins", "docker", "kubernetes", "k8s", "terraform", "ansible", "ci/cd", "cloud", "monitoring", "prometheus", "grafana", "git", "shell"],
    },
    {
        title: "Python Tutorial",
        description:
            "Learn Python programming from scratch — variables, loops, functions, OOP, file handling, and more.",
        icon: "🐍",
        color: "from-blue-500 to-cyan-500",
        bgLight: "bg-blue-50",
        borderColor: "border-blue-200",
        hoverShadow: "hover:shadow-blue-200/50",
        link: "/python",
        topics: 42,
        level: "Beginner to Advanced",
        keywords: ["python", "oop", "file handling", "loops", "functions", "variables", "scripting"],
    },
    {
        title: "Java Tutorial",
        description:
            "Master Java fundamentals — data types, control flow, OOP concepts, collections, and exception handling.",
        icon: "☕",
        color: "from-orange-500 to-red-500",
        bgLight: "bg-orange-50",
        borderColor: "border-orange-200",
        hoverShadow: "hover:shadow-orange-200/50",
        link: "/java",
        topics: 6,
        level: "Beginner to Advanced",
        keywords: ["java", "oop", "collections", "exceptions", "jvm", "spring"],
    },
    {
        title: "JavaScript Tutorial",
        description:
            "Build interactive web experiences — ES6+, DOM manipulation, async/await, closures, and more.",
        icon: "⚡",
        color: "from-yellow-500 to-amber-500",
        bgLight: "bg-yellow-50",
        borderColor: "border-yellow-200",
        hoverShadow: "hover:shadow-yellow-200/50",
        link: "/javascript",
        topics: 35,
        level: "Beginner to Advanced",
        keywords: ["javascript", "js", "es6", "dom", "async", "closures", "web", "frontend", "react", "node"],
    },
    {
        title: "Linux Tutorial",
        description:
            "Master the command line — file system, permissions, shell scripting, networking, and system administration.",
        icon: "🐧",
        color: "from-slate-600 to-stone-700",
        bgLight: "bg-slate-50",
        borderColor: "border-slate-200",
        hoverShadow: "hover:shadow-slate-200/50",
        link: "/linux",
        topics: 10,
        level: "Beginner to Advanced",
        keywords: ["linux", "command line", "terminal", "bash", "ubuntu", "shell", "sysadmin", "permissions"],
    },
    {
        title: "C Programming Tutorial",
        description:
            "Understand the foundation of programming — pointers, memory management, structures, and algorithms.",
        icon: "⚙️",
        color: "from-blue-600 to-indigo-700",
        bgLight: "bg-blue-50",
        borderColor: "border-blue-200",
        hoverShadow: "hover:shadow-blue-200/50",
        link: "/c-programming",
        topics: 17,
        level: "Beginner to Advanced",
        keywords: ["c", "c programming", "pointers", "memory", "structures", "algorithms", "data structures"],
    },
    {
        title: "C++ Tutorial",
        description:
            "Level up with C++ — classes, templates, STL, polymorphism, and competitive programming basics.",
        icon: "🚀",
        color: "from-indigo-500 to-purple-600",
        bgLight: "bg-indigo-50",
        borderColor: "border-indigo-200",
        hoverShadow: "hover:shadow-indigo-200/50",
        link: "/cpp",
        topics: 20,
        level: "Intermediate to Advanced",
        keywords: ["c++", "cpp", "stl", "templates", "polymorphism", "oop", "competitive programming"],
    },
    {
        title: "SQL Tutorial",
        description:
            "Master database management — SQL queries, joins, normalization, and NoSQL basics.",
        icon: "🗄️",
        color: "from-orange-500 to-amber-600",
        bgLight: "bg-orange-50",
        borderColor: "border-orange-200",
        hoverShadow: "hover:shadow-orange-200/50",
        link: "/sql",
        topics: 16,
        level: "Beginner to Advanced",
        keywords: ["sql", "database", "mysql", "postgresql", "queries", "joins", "nosql", "mongodb"],
    },
    {
        title: "Flask Tutorial",
        description:
            "Build robust web applications with Python and Flask — routing, templates, and database integration.",
        icon: "🌶️",
        color: "from-emerald-500 to-teal-600",
        bgLight: "bg-emerald-50",
        borderColor: "border-emerald-200",
        hoverShadow: "hover:shadow-emerald-200/50",
        link: "/flask",
        topics: 12,
        level: "Beginner to Intermediate",
        keywords: ["flask", "python", "web", "api", "rest", "routing", "templates", "backend"],
    },
    {
        title: "Django Tutorial",
        description:
            "Build secure and scalable web applications with Python and Django. Master MVT, ORM, Auth, and REST APIs.",
        icon: "🌐",
        color: "from-green-700 to-emerald-900",
        bgLight: "bg-green-50",
        borderColor: "border-green-200",
        hoverShadow: "hover:shadow-green-200/50",
        link: "/django",
        topics: 22,
        level: "Intermediate to Advanced",
        keywords: ["django", "python", "web", "orm", "mvt", "rest", "api", "auth", "backend"],
    },
    {
        title: "HTML Tutorial",
        description:
            "Master industrial-level HTML5 — Semantic SEO, Accessibility, Forms, and Page Speed Optimization.",
        icon: "🏗️",
        color: "from-orange-500 to-red-600",
        bgLight: "bg-orange-50",
        borderColor: "border-orange-200",
        hoverShadow: "hover:shadow-orange-200/50",
        link: "/html",
        topics: 7,
        level: "Beginner to Advanced",
        keywords: ["html", "html5", "web", "seo", "accessibility", "forms", "frontend", "markup"],
    },
    {
        title: "CSS Tutorial",
        description:
            "Design beautiful interfaces with CSS3 — Flexbox, Grid, Animations, Variables, and Responsive Design.",
        icon: "🎨",
        color: "from-blue-600 to-indigo-700",
        bgLight: "bg-blue-50",
        borderColor: "border-blue-200",
        hoverShadow: "hover:shadow-blue-200/50",
        link: "/css",
        topics: 7,
        level: "Beginner to Advanced",
        keywords: ["css", "css3", "flexbox", "grid", "animations", "responsive", "design", "frontend", "styling"],
    },
];

const stats = [
    { icon: BookOpen, label: "Tutorials", value: "200+" },
    { icon: Code, label: "Code Examples", value: "500+" },
    { icon: Users, label: "Learners", value: "10K+" },
    { icon: Award, label: "Topics", value: "50+" },
];

const TutorialHome = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    // Filter tutorials based on search query
    const filteredTutorials = tutorials.filter((tutorial) => {
        if (!searchQuery.trim()) return true;
        const query = searchQuery.toLowerCase().trim();
        return (
            tutorial.title.toLowerCase().includes(query) ||
            tutorial.description.toLowerCase().includes(query) ||
            tutorial.keywords.some((kw) => kw.includes(query))
        );
    });

    // Dropdown results (only show when actively searching)
    const dropdownResults = searchQuery.trim() ? filteredTutorials : [];

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Keyboard navigation
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent) => {
            if (e.key === "ArrowDown") {
                e.preventDefault();
                setActiveIndex((prev) =>
                    prev < dropdownResults.length - 1 ? prev + 1 : 0
                );
            } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActiveIndex((prev) =>
                    prev > 0 ? prev - 1 : dropdownResults.length - 1
                );
            } else if (e.key === "Enter") {
                e.preventDefault();
                if (activeIndex >= 0 && activeIndex < dropdownResults.length) {
                    navigate(dropdownResults[activeIndex].link);
                    setIsDropdownOpen(false);
                    setSearchQuery("");
                } else if (dropdownResults.length === 1) {
                    navigate(dropdownResults[0].link);
                    setIsDropdownOpen(false);
                    setSearchQuery("");
                }
            } else if (e.key === "Escape") {
                setIsDropdownOpen(false);
                inputRef.current?.blur();
            }
        },
        [activeIndex, dropdownResults, navigate]
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setIsDropdownOpen(true);
        setActiveIndex(-1);
    };

    const clearSearch = () => {
        setSearchQuery("");
        setIsDropdownOpen(false);
        setActiveIndex(-1);
        inputRef.current?.focus();
    };

    // Scroll to tutorials section when searching
    const tutorialsSectionRef = useRef<HTMLDivElement>(null);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-blue-50 -z-10" />
                <div className="absolute top-20 left-10 w-72 h-72 bg-amber-200/20 rounded-full blur-3xl -z-10" />
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl -z-10" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                    <div className="text-center max-w-4xl mx-auto">
                        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-6 animate-pulse">
                            <TrendingUp className="w-4 h-4" />
                            Free Programming Tutorials
                        </div>
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
                            Learn to Code with{" "}
                            <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                Techmiya Tutorials
                            </span>
                        </h1>
                        <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                            Well-organized, easy-to-understand tutorials with practical examples.
                            Start your programming journey today — completely free!
                        </p>

                        {/* Search Bar */}
                        <div className="mt-10 max-w-xl mx-auto" ref={searchRef}>
                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
                                <div className="relative flex items-center bg-white rounded-xl shadow-lg border border-gray-200">
                                    <Search className="w-5 h-5 text-gray-400 ml-4 shrink-0" />
                                    <input
                                        ref={inputRef}
                                        type="text"
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        onFocus={() => searchQuery.trim() && setIsDropdownOpen(true)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Search tutorials... (e.g., Python, Java, SQL)"
                                        className="flex-1 px-4 py-4 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
                                        id="tutorial-search"
                                    />
                                    {searchQuery && (
                                        <button
                                            onClick={clearSearch}
                                            className="p-1.5 mr-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                            aria-label="Clear search"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    )}
                                    <button
                                        onClick={() => {
                                            if (dropdownResults.length === 1) {
                                                navigate(dropdownResults[0].link);
                                                setSearchQuery("");
                                                setIsDropdownOpen(false);
                                            } else if (searchQuery.trim()) {
                                                tutorialsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
                                                setIsDropdownOpen(false);
                                            }
                                        }}
                                        className="mr-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                                    >
                                        Search
                                    </button>
                                </div>

                                {/* Search Dropdown Results */}
                                {isDropdownOpen && searchQuery.trim() && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                        {dropdownResults.length > 0 ? (
                                            <ul className="py-2 max-h-80 overflow-y-auto">
                                                {dropdownResults.map((tutorial, index) => (
                                                    <li key={tutorial.title}>
                                                        <Link
                                                            to={tutorial.link}
                                                            onClick={() => {
                                                                setSearchQuery("");
                                                                setIsDropdownOpen(false);
                                                            }}
                                                            className={`flex items-center gap-3 px-4 py-3 transition-colors ${index === activeIndex
                                                                    ? "bg-amber-50 text-amber-900"
                                                                    : "hover:bg-gray-50 text-gray-700"
                                                                }`}
                                                        >
                                                            <span className="text-xl shrink-0 w-8 text-center">{tutorial.icon}</span>
                                                            <div className="flex-1 min-w-0 text-left">
                                                                <p className="font-semibold text-sm truncate">{tutorial.title}</p>
                                                                <p className="text-xs text-gray-500 truncate">{tutorial.description}</p>
                                                            </div>
                                                            <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${index === activeIndex ? "text-amber-600 translate-x-0.5" : "text-gray-300"
                                                                }`} />
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <div className="px-4 py-8 text-center">
                                                <p className="text-gray-500 text-sm">No tutorials found for "<span className="font-medium text-gray-700">{searchQuery}</span>"</p>
                                                <p className="text-xs text-gray-400 mt-1">Try searching for Python, Java, SQL, DevOps, etc.</p>
                                            </div>
                                        )}
                                        {dropdownResults.length > 0 && (
                                            <div className="border-t border-gray-100 px-4 py-2 bg-gray-50">
                                                <p className="text-xs text-gray-400">
                                                    {dropdownResults.length} result{dropdownResults.length !== 1 ? "s" : ""} found · Use ↑↓ to navigate · Enter to select
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="border-y border-gray-100 bg-white/70 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="flex items-center gap-3 justify-center"
                            >
                                <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center">
                                    <stat.icon className="w-5 h-5 text-amber-600" />
                                </div>
                                <div>
                                    <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                                    <p className="text-sm text-gray-500">{stat.label}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tutorial Cards Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16" ref={tutorialsSectionRef}>
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                        {searchQuery.trim() ? (
                            <>
                                Results for{" "}
                                <span className="text-amber-600">"{searchQuery.trim()}"</span>
                            </>
                        ) : (
                            <>
                                Explore{" "}
                                <span className="text-amber-600">Tutorials</span>
                            </>
                        )}
                    </h2>
                    <p className="mt-3 text-gray-600 max-w-xl mx-auto">
                        {searchQuery.trim()
                            ? `Found ${filteredTutorials.length} tutorial${filteredTutorials.length !== 1 ? "s" : ""} matching your search.`
                            : "Choose a programming language to start learning. Each tutorial is structured from basics to advanced topics with hands-on examples."}
                    </p>
                </div>

                {filteredTutorials.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredTutorials.map((tutorial) => (
                            <div
                                key={tutorial.title}
                                className={`group relative bg-white rounded-2xl border ${tutorial.borderColor} shadow-sm ${tutorial.hoverShadow} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
                            >
                                {/* Gradient top accent */}
                                <div
                                    className={`h-1.5 bg-gradient-to-r ${tutorial.color}`}
                                />

                                <div className="p-6">
                                    {/* Icon and title */}
                                    <div className="flex items-start gap-4 mb-4">
                                        <div
                                            className={`w-14 h-14 ${tutorial.bgLight} rounded-xl flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform duration-300`}
                                        >
                                            {tutorial.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                                {tutorial.title}
                                            </h3>
                                            <p className="text-sm text-gray-500 mt-0.5">
                                                {tutorial.level}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-600 text-sm leading-relaxed mb-5">
                                        {tutorial.description}
                                    </p>

                                    {/* Footer */}
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <span className="text-sm text-gray-500 flex items-center gap-1.5">
                                            <BookOpen className="w-4 h-4" />
                                            {tutorial.topics} Chapters
                                        </span>

                                        <Link
                                            to={tutorial.link}
                                            className={`text-sm font-semibold bg-gradient-to-r ${tutorial.color} bg-clip-text text-transparent hover:opacity-80 transition-opacity`}
                                        >
                                            Start Learning →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <div className="text-5xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">No tutorials found</h3>
                        <p className="text-gray-500 mb-6">We couldn't find any tutorials matching "{searchQuery}"</p>
                        <button
                            onClick={clearSearch}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-100 text-amber-700 font-semibold rounded-xl hover:bg-amber-200 transition-colors"
                        >
                            Clear Search
                        </button>
                    </div>
                )}
            </section>

            {/* Why Learn With Us Section */}
            <section className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-bold">
                            Why Learn With{" "}
                            <span className="text-amber-400">Techmiya?</span>
                        </h2>
                        <p className="mt-3 text-gray-400 max-w-xl mx-auto">
                            Our tutorials are designed to make learning programming simple, effective, and enjoyable.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: "📝",
                                title: "Structured Content",
                                description:
                                    "Every tutorial follows a clear progression from basics to advanced, making it easy to build knowledge step by step.",
                            },
                            {
                                icon: "💻",
                                title: "Hands-On Examples",
                                description:
                                    "Learn by doing — every concept comes with real code examples and practice exercises to reinforce learning.",
                            },
                            {
                                icon: "🎯",
                                title: "Interview Ready",
                                description:
                                    "Our tutorials cover the concepts and patterns most asked in technical interviews at top companies.",
                            },
                        ].map((feature) => (
                            <div
                                key={feature.title}
                                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
                            >
                                <div className="text-3xl mb-4">{feature.icon}</div>
                                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl p-8 sm:p-12 text-center">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
                    <div className="relative">
                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                            Start Your Coding Journey Today!
                        </h2>
                        <p className="text-amber-100 max-w-lg mx-auto mb-6">
                            Begin with Python — the most popular and beginner-friendly programming language.
                        </p>
                        <Link
                            to="/python"
                            className="inline-flex items-center gap-2 bg-white text-amber-600 font-bold px-8 py-3.5 rounded-xl hover:bg-amber-50 transition-all duration-200 shadow-lg hover:shadow-xl"
                        >
                            🐍 Start Python Tutorial
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default TutorialHome;
