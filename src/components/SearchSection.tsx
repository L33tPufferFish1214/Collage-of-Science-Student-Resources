import { useState, useRef } from "react";
import { Search, X } from "lucide-react";
import uOfULogo from "../assets/images/regenerated_image_1779306578444.png";

interface SearchSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onPopularSelect: (category: string) => void;
  setActiveView: (view: string) => void;
}

export function SearchSection({ searchQuery, setSearchQuery, onPopularSelect, setActiveView }: SearchSectionProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Clear search safely
  const handleClear = () => {
    setSearchQuery("");
    inputRef.current?.focus();
  };

  return (
    <div className="relative py-12 md:py-16 text-center px-4 bg-white border-b border-gray-200" id="search-section-wrapper">
      <div className="max-w-3xl mx-auto">
        {/* Centered Brand Lockup matching the official College of Science logo */}
        <div className="flex flex-col items-center justify-center mb-8 select-none animate-fade-in" id="center-brand-lockup">
          <img 
            src={uOfULogo} 
            alt="The University of Utah Logo" 
            className="w-auto hover:scale-102 transition-transform duration-300 h-[112px] mb-[-28px]"
            referrerPolicy="no-referrer"
          />
          <div className="w-24 sm:w-28 border-t-2 border-utah-red mt-3.5 mb-2.5" />
          <span className="text-xl sm:text-2xl font-light text-gray-800 uppercase font-sans tracking-normal">
            College of Science
          </span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-[27px] leading-[33px] font-bold text-gray-950 tracking-normal animate-fade-in" id="hero-headline">
          Find the support, opportunities, and resources you need to succeed.
        </h1>

        {/* The Search Bar Box - Centerpiece */}
        <div className="mt-8 relative" id="search-bar-outer">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              setActiveView("resources");
            }}
            className={`flex items-center bg-white rounded-lg shadow-lg border transition-all duration-350 pl-4 pr-2 py-2 ${
              isFocused 
                ? "border-utah-red ring-4 ring-utah-red-soft scale-[1.01]" 
                : "border-gray-200/80 hover:border-gray-300"
            }`}
          >
            <Search className="w-5 sm:w-6 h-5 sm:h-6 text-gray-400 shrink-0 select-none mr-3" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              placeholder="Search scholarships, tutoring, advising, internships, wellness support..."
              className="w-full text-sm sm:text-base outline-none bg-transparent text-gray-900 placeholder-gray-400 font-normal leading-relaxed text-left"
              id="global-search-input"
            />
            {searchQuery && (
              <button 
                type="button"
                onClick={handleClear}
                className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors mr-1 shrink-0 cursor-pointer"
                id="search-clear-button"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
            <button
              type="submit"
              className="px-4.5 py-2 bg-utah-red hover:bg-utah-red-dark text-white font-bold text-xs sm:text-sm rounded-md transition-all shadow-sm active:scale-95 cursor-pointer ml-1.5 shrink-0 uppercase tracking-normal"
              id="search-submit-button"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
