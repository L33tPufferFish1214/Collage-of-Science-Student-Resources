import { Compass, BookOpen, UserCheck, TrendingUp, HeartHandshake } from "lucide-react";

interface HeaderProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export function Header({ activeView, setActiveView }: HeaderProps) {
  return (
    <header className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-40 transition-colors" id="app-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo / Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => setActiveView("home")}
            id="logo-container"
          >
            <span className="font-bold text-gray-900 tracking-tight text-lg sm:text-lg hover:text-red-700 transition-colors">
              University of Utah
            </span>
            <div className="border-l border-gray-200 pl-3 hidden sm:block">
              <span className="text-[10px] sm:text-[11px] font-sans tracking-widest text-gray-500 font-bold block">
                STUDENT RESOURCE GUIDE
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" id="desktop-nav">
            <button
              onClick={() => setActiveView("home")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                activeView === "home"
                  ? "bg-red-50 text-red-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
              id="nav-home"
            >
              <Compass className="w-4 h-4" />
              Explore Path
            </button>
            <button
              onClick={() => setActiveView("resources")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                activeView === "resources"
                  ? "bg-red-50 text-red-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
              id="nav-resources"
            >
              <BookOpen className="w-4 h-4" />
              Full Directory
            </button>
            <a
              href="https://science.utah.edu/students/academic-advising/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-all duration-200 flex items-center gap-1.5"
              id="nav-advisors"
            >
              <UserCheck className="w-4 h-4" />
              Academic Advising
            </a>
            <button
              onClick={() => setActiveView("careers")}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5 ${
                activeView === "careers"
                  ? "bg-red-50 text-red-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
              id="nav-careers"
            >
              <TrendingUp className="w-4 h-4" />
              Career Outlook
            </button>
          </nav>

          {/* Action Area (Distress Help) */}
          <div className="flex items-center gap-2" id="action-area">
            {/* Overwhelmed Rescue Direct Link */}
            <button
              onClick={() => setActiveView("overwhelmed")}
              className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-medium flex items-center gap-1.5 shadow-sm hover:shadow-md active:scale-95 transition-all"
              id="distress-button"
            >
              <HeartHandshake className="w-4 h-4 shrink-0" />
              <span>Feeling Lost?</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
