
import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-amber-400">
                Techmiya Tutorials
              </span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md text-sm leading-relaxed">
              Free, well-structured programming tutorials by Techmiya Ed-Tech.
              Learn Python, Java, JavaScript and more with practical examples
              and hands-on exercises.
            </p>
            <div className="flex space-x-4 text-sm">
              <a
                href="https://www.youtube.com/channel/UCqyZlCLdyDFjyM3VFDea4rw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                YouTube
              </a>
              <a
                href="https://www.instagram.com/techmiya_edtech"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://www.techmiyaedtech.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Main Website
              </a>
            </div>
          </div>

          {/* Tutorials */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Tutorials
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/python"
                  className="text-gray-400 hover:text-amber-400 transition-colors text-sm"
                >
                  🐍 Python
                </Link>
              </li>
              <li>
                <span className="text-gray-600 text-sm cursor-not-allowed">
                  ☕ Java (Coming Soon)
                </span>
              </li>
              <li>
                <span className="text-gray-600 text-sm cursor-not-allowed">
                  ⚡ JavaScript (Coming Soon)
                </span>
              </li>
              <li>
                <span className="text-gray-600 text-sm cursor-not-allowed">
                  ⚙️ C Programming (Coming Soon)
                </span>
              </li>
              <li>
                <span className="text-gray-600 text-sm cursor-not-allowed">
                  🚀 C++ (Coming Soon)
                </span>
              </li>
              <li>
                <span className="text-gray-600 text-sm cursor-not-allowed">
                  🗄️ SQL (Coming Soon)
                </span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-4">
              Contact
            </h3>
            <div className="space-y-2.5 text-gray-400 text-sm">
              <p>📧 hr@techmiyaedtech.com</p>
              <p>📞 +91 6363760275</p>
              <p>📞 +91 6361987951</p>
              <p className="leading-relaxed">
                📍 Techmiya Ed-Tech, 28th Main Rd, Jayanagar 9th Block,
                Bengaluru, Karnataka 560069
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Techmiya Ed-Tech. All rights
            reserved. |{" "}
            <a
              href="https://www.techmiyaedtech.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-amber-400 transition-colors"
            >
              techmiyaedtech.com
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
