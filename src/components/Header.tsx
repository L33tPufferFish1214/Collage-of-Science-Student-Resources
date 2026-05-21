import { HeartHandshake } from "lucide-react";

interface HeaderProps {
  activeView: string;
  setActiveView: (view: string) => void;
}

export function Header({ activeView, setActiveView }: HeaderProps) {
  return (
    <header className="border-b border-gray-200 bg-white/95 backdrop-blur-md sticky top-0 z-40 transition-colors" id="app-header">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-[68px] items-center">
          {/* Logo / Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => setActiveView("home")}
            id="logo-container"
          >
            <span className="font-bold text-gray-950 tracking-normal text-lg sm:text-xl hover:text-utah-red transition-colors">
              College of Science
            </span>
            <div className="border-l-2 border-utah-red pl-3 hidden sm:block">
              <span className="text-[10px] sm:text-[11px] font-sans tracking-normal text-gray-500 font-bold block uppercase">
                University of Utah Resource Guide
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" id="desktop-nav">
            <button
              onClick={() => setActiveView("home")}
              className={`px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                activeView === "home"
                  ? "bg-utah-red text-white"
                  : "text-gray-650 hover:text-gray-950 hover:bg-gray-100"
              }`}
              id="nav-home"
            >
              Explore Path
            </button>
            <button
              onClick={() => setActiveView("resources")}
              className={`px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                activeView === "resources"
                  ? "bg-utah-red text-white"
                  : "text-gray-650 hover:text-gray-950 hover:bg-gray-100"
              }`}
              id="nav-resources"
            >
              Full Directory
            </button>
            <a
              href="https://science.utah.edu/students/academic-advising/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-md text-sm font-semibold text-gray-650 hover:text-gray-950 hover:bg-gray-100 transition-all duration-200"
              id="nav-advisors"
            >
              Academic Advising
            </a>
            <button
              onClick={() => setActiveView("careers")}
              className={`px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                activeView === "careers"
                  ? "bg-utah-red text-white"
                  : "text-gray-650 hover:text-gray-950 hover:bg-gray-100"
              }`}
              id="nav-careers"
            >
              Career Outlook
            </button>
          </nav>

          {/* Action Area (Distress Help) */}
          <div className="flex items-center gap-2" id="action-area">
            {/* Overwhelmed Rescue Direct Link */}
            <button
              onClick={() => setActiveView("overwhelmed")}
              className="px-3.5 py-2 rounded-md bg-gray-950 hover:bg-utah-red text-white text-xs sm:text-sm font-semibold flex items-center gap-1.5 shadow-sm hover:shadow-md active:scale-95 transition-all"
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
