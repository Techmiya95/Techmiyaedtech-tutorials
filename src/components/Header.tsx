
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, BookOpen, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface NavItem {
  name: string;
  path: string;
  external?: boolean;
  comingSoon?: boolean;
}

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const tutorials: NavItem[] = [
    { name: "Python", path: "/python" },
    { name: "Java", path: "/java" },
    { name: "Golang", path: "/golang" },
    { name: "C", path: "/c-programming" },
    { name: "C++", path: "/cpp" },
    { name: "JavaScript", path: "/javascript" },
    { name: "SQL", path: "/sql" },
    { name: "Linux", path: "/linux" },
    { name: "Flask", path: "/flask" },
    { name: "Django", path: "/django" },
  ];

  const mainNav: NavItem[] = [
    { name: "Home", path: "/" },
    // Tutorials will be inserted here in render
    { name: "Compiler", path: "/compiler" },
    { name: "Main Website", path: "https://www.techmiyaedtech.com/", external: true },
  ];

  const isActive = (path: string) => location.pathname === path;
  const isTutorialActive = tutorials.some(t => isActive(t.path));

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center shadow-md">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-gray-900 leading-tight">
                Techmiya <span className="text-amber-500">Tutorials</span>
              </span>
              <span className="text-[10px] text-gray-400 font-medium -mt-0.5 tracking-wide">
                Learn Programming for Free
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${isActive("/") ? "text-amber-600 bg-amber-50" : "text-gray-600 hover:text-amber-600 hover:bg-amber-50/50"}`}
            >
              Home
            </Link>

            {/* Tutorials Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 outline-none ${isTutorialActive || location.pathname.includes("/python") || location.pathname.includes("/java") || location.pathname.includes("/golang") || location.pathname.includes("/c-programming") || location.pathname.includes("/cpp") || location.pathname.includes("/javascript") || location.pathname.includes("/sql") || location.pathname.includes("/linux") || location.pathname.includes("/flask") || location.pathname.includes("/django") ? "text-amber-600 bg-amber-50" : "text-gray-600 hover:text-amber-600 hover:bg-amber-50/50"}`}>
                Tutorials <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 bg-white border-gray-100 shadow-lg p-1">
                {tutorials.map((item) => (
                  <DropdownMenuItem key={item.name} asChild>
                    <Link
                      to={item.path}
                      className={`w-full cursor-pointer px-3 py-2 rounded-md text-sm font-medium ${isActive(item.path) ? "bg-amber-50 text-amber-600" : "text-gray-700 hover:bg-amber-50 hover:text-amber-600"}`}
                    >
                      {item.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              to="/compiler"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${isActive("/compiler") ? "text-amber-600 bg-amber-50" : "text-gray-600 hover:text-amber-600 hover:bg-amber-50/50"}`}
            >
              Compiler
            </Link>

            <a
              href="https://www.techmiyaedtech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 text-gray-600 hover:text-amber-600 hover:bg-amber-50/50"
            >
              Main Website ↗
            </a>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:flex">
            <Link
              to="/python"
              className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md"
            >
              Start Learning →
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden h-[calc(100vh-4rem)] overflow-y-auto pb-20">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
              <Link
                to="/"
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/") ? "bg-amber-50 text-amber-600" : "text-gray-600"}`}
              >
                Home
              </Link>

              <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Tutorials
              </div>
              <div className="pl-2 space-y-1">
                {tutorials.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(item.path) ? "bg-amber-50 text-amber-600" : "text-gray-600 hover:text-amber-600 hover:bg-amber-50/50"}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="border-t border-gray-100 my-2 pt-2">
                <Link
                  to="/compiler"
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${isActive("/compiler") ? "bg-amber-50 text-amber-600" : "text-gray-600"}`}
                >
                  Compiler
                </Link>
                <a
                  href="https://www.techmiyaedtech.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-amber-600"
                >
                  Main Website ↗
                </a>
              </div>

              <div className="pt-2">
                <Link
                  to="/python"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold px-4 py-2.5 rounded-lg ml-1"
                >
                  🐍 Start Python Tutorial
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
