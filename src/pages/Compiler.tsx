import { Link } from "react-router-dom";
import { ChevronRight, Home, Terminal } from "lucide-react";

const Compiler = () => {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white">
            {/* Breadcrumb */}
            <div className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
                    <nav className="flex items-center gap-2 text-sm text-gray-500">
                        <Link to="/" className="flex items-center gap-1 hover:text-amber-600 transition-colors">
                            <Home className="w-3.5 h-3.5" /> Home
                        </Link>
                        <ChevronRight className="w-3.5 h-3.5" />
                        <span className="text-gray-900 font-medium">Online Compiler</span>
                    </nav>
                </div>
            </div>

            {/* Hero */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-blue-50 -z-10" />
                <div className="absolute top-10 right-10 w-72 h-72 bg-purple-200/20 rounded-full blur-3xl -z-10" />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                    <div className="flex flex-col md:flex-row items-start gap-8">
                        <div className="w-20 h-20 bg-purple-50 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-purple-100">
                            <Terminal className="w-10 h-10 text-purple-600" />
                        </div>
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
                                Online Python Compiler
                            </h1>
                            <p className="mt-3 text-gray-600 max-w-2xl leading-relaxed">
                                Write, compile, and run Python code directly in your browser. No installation needed — just start coding!
                            </p>
                            <div className="mt-5 flex flex-wrap items-center gap-4 text-sm">
                                <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">Python 3</span>
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">Free</span>
                                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">No Setup Required</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Compiler Iframe */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                    <div className="px-6 py-4 bg-gradient-to-r from-purple-500 to-blue-500 flex items-center gap-3">
                        <span className="text-2xl">💻</span>
                        <h2 className="text-xl font-bold text-white">Python Editor</h2>
                    </div>
                    <div className="p-4">
                        <iframe
                            src="https://onecompiler.com/embed/python"
                            width="100%"
                            height="500px"
                            style={{ border: "none", borderRadius: "0.75rem" }}
                            title="Online Python Compiler"
                            allowFullScreen
                        />
                    </div>
                </div>

                <div className="mt-8 bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-100 rounded-xl p-6 text-center">
                    <p className="text-purple-800 font-semibold">📘 Want to learn Python step-by-step?</p>
                    <Link
                        to="/python"
                        className="inline-flex items-center gap-2 mt-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
                    >
                        Go to Python Tutorial →
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default Compiler;
