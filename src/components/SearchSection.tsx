import React, { useState, useRef, useEffect } from "react";
import { Search, Sparkles, X, ChevronRight, HelpCircle } from "lucide-react";
import uOfULogo from "../assets/images/regenerated_image_1779306578444.png";

interface SearchSectionProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onPopularSelect: (category: string) => void;
  setActiveView: (view: string) => void;
}

const POPULAR_SEARCHES = [
  { label: "Tutoring Centers", query: "tutoring" },
  { label: "Scholarship Universe", query: "ScholarshipUniverse" },
  { label: "Embedded Therapist", query: "Steven Trujillo" },
  { label: "Beckman Scholars", query: "Beckman" },
  { label: "Math Placement Help", query: "placement" },
  { label: "ACCESS Scholars", query: "ACCESS" },
  { label: "Science Research (SRI)", query: "SRI" }
];

export function SearchSection({ searchQuery, setSearchQuery, onPopularSelect, setActiveView }: SearchSectionProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Clear search safely
  const handleClear = () => {
    setSearchQuery("");
    inputRef.current?.focus();
  };

  return (
    <div className="relative py-12 md:py-20 text-center px-4" id="search-section-wrapper">
      {/* Visual Ambient Glow Background (Aesthetic Pairings) */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-35 overflow-hidden">
        <div className="w-[500px] h-[300px] bg-red-100 blur-[120px] rounded-full" />
        <div className="w-[400px] h-[300px] bg-emerald-50 blur-[100px] rounded-full ml-40 mt-10" />
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Centered Brand Lockup matching the official College of Science logo */}
        <div className="flex flex-col items-center justify-center mb-8 select-none animate-fade-in" id="center-brand-lockup">
          <img 
            src={uOfULogo} 
            alt="The University of Utah Logo" 
            className="w-auto hover:scale-102 transition-transform duration-300 h-[114.9943px] mb-[-29px]"
            referrerPolicy="no-referrer"
          />
          <div className="w-24 sm:w-28 border-t-2 border-[#cc0000] mt-3.5 mb-2.5" />
          <span className="text-xl sm:text-2xl font-light tracking-[0.18em] text-gray-800 uppercase font-sans">
            College of Science
          </span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-[27px] leading-[33px] font-extrabold text-gray-900 tracking-tight animate-fade-in" id="hero-headline">
          Find the support, opportunities, and resources you need to succeed.
        </h1>

        {/* The Search Bar Box - Centerpiece */}
        <div className="mt-8 relative" id="search-bar-outer">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              setActiveView("resources");
            }}
            className={`flex items-center bg-white rounded-2xl shadow-xl border transition-all duration-350 pl-4 pr-2 py-2 ${
              isFocused 
                ? "border-red-500 ring-4 ring-red-100 scale-[1.01]" 
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
              className="px-4.5 py-2 bg-[#cc0000] hover:bg-red-700 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer ml-1.5 shrink-0 uppercase tracking-wider"
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
