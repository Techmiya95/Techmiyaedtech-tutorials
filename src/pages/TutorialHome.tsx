import { Link } from "react-router-dom";
import { BookOpen, Code, Search, TrendingUp, Users, Award } from "lucide-react";

const tutorials = [
    {
        title: "Python",
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
    },
    {
        title: "Java",
        description:
            "Master Java fundamentals — data types, control flow, OOP concepts, collections, and exception handling.",
        icon: "☕",
        color: "from-orange-500 to-red-500",
        bgLight: "bg-orange-50",
        borderColor: "border-orange-200",
        hoverShadow: "hover:shadow-orange-200/50",
        link: "/java",
        topics: 38,
        level: "Beginner to Advanced",
        comingSoon: true,
    },
    {
        title: "JavaScript",
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
        comingSoon: true,
    },
    {
        title: "C Programming",
        description:
            "Understand the foundation of programming — pointers, memory management, structures, and algorithms.",
        icon: "⚙️",
        color: "from-gray-600 to-gray-800",
        bgLight: "bg-gray-50",
        borderColor: "border-gray-200",
        hoverShadow: "hover:shadow-gray-200/50",
        link: "/c-programming",
        topics: 30,
        level: "Beginner to Intermediate",
        comingSoon: true,
    },
    {
        title: "C++",
        description:
            "Level up with C++ — classes, templates, STL, polymorphism, and competitive programming basics.",
        icon: "🚀",
        color: "from-indigo-500 to-purple-600",
        bgLight: "bg-indigo-50",
        borderColor: "border-indigo-200",
        hoverShadow: "hover:shadow-indigo-200/50",
        link: "/cpp",
        topics: 34,
        level: "Intermediate",
        comingSoon: true,
    },
    {
        title: "SQL & Databases",
        description:
            "Query with confidence — SELECT, JOINs, subqueries, indexing, normalization, and database design.",
        icon: "🗄️",
        color: "from-emerald-500 to-teal-600",
        bgLight: "bg-emerald-50",
        borderColor: "border-emerald-200",
        hoverShadow: "hover:shadow-emerald-200/50",
        link: "/sql",
        topics: 28,
        level: "Beginner to Intermediate",
        comingSoon: true,
    },
];

const stats = [
    { icon: BookOpen, label: "Tutorials", value: "200+" },
    { icon: Code, label: "Code Examples", value: "500+" },
    { icon: Users, label: "Learners", value: "10K+" },
    { icon: Award, label: "Topics", value: "50+" },
];

const TutorialHome = () => {
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
                        <div className="mt-10 max-w-xl mx-auto">
                            <div className="relative group">
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500" />
                                <div className="relative flex items-center bg-white rounded-xl shadow-lg border border-gray-200">
                                    <Search className="w-5 h-5 text-gray-400 ml-4" />
                                    <input
                                        type="text"
                                        placeholder="Search tutorials... (e.g., Python, Java, SQL)"
                                        className="flex-1 px-4 py-4 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
                                    />
                                    <button className="mr-2 px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg">
                                        Search
                                    </button>
                                </div>
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
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="text-center mb-12">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
                        Explore{" "}
                        <span className="text-amber-600">Tutorials</span>
                    </h2>
                    <p className="mt-3 text-gray-600 max-w-xl mx-auto">
                        Choose a programming language to start learning. Each tutorial is structured
                        from basics to advanced topics with hands-on examples.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {tutorials.map((tutorial) => (
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
                                            {tutorial.comingSoon && (
                                                <span className="text-xs font-medium bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                                                    Coming Soon
                                                </span>
                                            )}
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

                                    {tutorial.comingSoon ? (
                                        <span className="text-sm font-semibold text-gray-400 cursor-not-allowed">
                                            Coming Soon →
                                        </span>
                                    ) : (
                                        <Link
                                            to={tutorial.link}
                                            className={`text-sm font-semibold bg-gradient-to-r ${tutorial.color} bg-clip-text text-transparent hover:opacity-80 transition-opacity`}
                                        >
                                            Start Learning →
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
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
