
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, BookOpen } from "lucide-react";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Python", path: "/python" },
    { name: "Compiler", path: "/compiler" },
    { name: "Java", path: "/java", comingSoon: true },
    { name: "JavaScript", path: "/javascript", comingSoon: true },
    { name: "Main Website", path: "https://www.techmiyaedtech.com/", external: true },
  ];

  const isActive = (path: string) => location.pathname === path;

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
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.name}
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 text-gray-600 hover:text-amber-600 hover:bg-amber-50/50"
                >
                  {item.name} ↗
                </a>
              ) : (
                <Link
                  key={item.name}
                  to={item.comingSoon ? "#" : item.path}
                  className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${item.comingSoon
                    ? "text-gray-400 cursor-not-allowed"
                    : isActive(item.path)
                      ? "text-amber-600 bg-amber-50"
                      : "text-gray-600 hover:text-amber-600 hover:bg-amber-50/50"
                    }`}
                  onClick={(e) => item.comingSoon && e.preventDefault()}
                >
                  {item.name}
                  {item.comingSoon && (
                    <span className="ml-1 text-[10px] bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded-full">
                      soon
                    </span>
                  )}
                </Link>
              )
            )}
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
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-100">
              {navItems.map((item) =>
                item.external ? (
                  <a
                    key={item.name}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:text-amber-600 hover:bg-amber-50/50"
                  >
                    {item.name} ↗
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.comingSoon ? "#" : item.path}
                    onClick={(e) => {
                      if (item.comingSoon) {
                        e.preventDefault();
                      } else {
                        setIsMenuOpen(false);
                      }
                    }}
                    className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${item.comingSoon
                      ? "text-gray-400 cursor-not-allowed"
                      : isActive(item.path)
                        ? "text-amber-600 bg-amber-50"
                        : "text-gray-600 hover:text-amber-600 hover:bg-amber-50/50"
                      }`}
                  >
                    {item.name}
                    {item.comingSoon && (
                      <span className="ml-2 text-xs bg-gray-100 text-gray-400 px-2 py-0.5 rounded-full">
                        Coming Soon
                      </span>
                    )}
                  </Link>
                )
              )}
              <Link
                to="/python"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full mt-3 text-center bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold px-4 py-2.5 rounded-lg"
              >
                🐍 Start Python Tutorial
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
