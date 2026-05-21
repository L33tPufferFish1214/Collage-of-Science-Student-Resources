import React, { useState, useMemo, useRef, useEffect } from "react";
import { getCategoryStyle } from "../data/categoryStyles";
import { Resource } from "../data/resources";
import { ExternalLink, Calendar, HelpCircle, Share2, Check, Filter, RotateCcw, Search, X } from "lucide-react";

interface ResourceGridProps {
  resources: Resource[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedTier: 1 | 2 | "all";
  setSelectedTier: (tier: 1 | 2 | "all") => void;
}

const CATEGORIES: { label: string; value: string }[] = [
  { label: "All Categories", value: "all" },
  { label: "Academic Help", value: "Academic Help" },
  { label: "Advising & Course Planning", value: "Advising & Course Planning" },
  { label: "Scholarships & Financial Aid", value: "Scholarships & Financial Aid" },
  { label: "Research & Internships", value: "Research & Internships" },
  { label: "Wellness & Mental Health", value: "Wellness & Mental Health" },
  { label: "Community & Student Orgs", value: "Community & Student Orgs" },
  { label: "Career Development", value: "Career Development" },
  { label: "Housing & Campus Life", value: "Housing & Campus Life" },
  { label: "Emergency & Safety", value: "Emergency & Safety" },
  { label: "Department Hubs", value: "Department Hubs" }
];

const normalizeSearchText = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

export function ResourceGrid({
  resources,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedTier,
  setSelectedTier
}: ResourceGridProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus input on transition with cursor placed carefully at the end
  useEffect(() => {
    if (searchQuery && inputRef.current) {
      inputRef.current.focus();
      const len = inputRef.current.value.length;
      inputRef.current.setSelectionRange(len, len);
    }
  }, []);

  // Filter resources based on query, secondary category, and primary academic stage
  const filteredResources = useMemo(() => {
    return resources.filter((item) => {
      // 1. Filter by Academic Stage (Tier)
      // If selectedTier is "all", it shows everything.
      // If selectedTier is 1 (Freshman/Sophomore), matches item.tier === 1 or "all"
      // If selectedTier is 2 (Junior/Senior/Grad), matches item.tier === 2 or "all"
      if (selectedTier !== "all") {
        if (item.tier !== "all" && item.tier !== selectedTier) {
          return false;
        }
      }

      // 2. Filter by Category
      if (selectedCategory !== "all") {
        if (item.category !== selectedCategory) {
          return false;
        }
      }

      // 3. Filter by text search (name, description, tags, category)
      if (searchQuery.trim() !== "") {
        const query = normalizeSearchText(searchQuery);
        const compactQuery = query.replace(/\s+/g, "");
        const searchableFields = [
          item.name,
          item.description,
          item.category,
          item.deadline ?? "",
          item.contact ?? "",
          ...item.relevanceTags
        ].map(normalizeSearchText);
        const isDirectMatch = searchableFields.some((field) => field.includes(query));
        const isCompactMatch =
          compactQuery.length > 1 &&
          searchableFields.some((field) => field.replace(/\s+/g, "").includes(compactQuery));
        
        if (!isDirectMatch && !isCompactMatch) {
          return false;
        }
      }

      return true;
    });
  }, [resources, searchQuery, selectedCategory, selectedTier]);

  const handleShare = (id: string, url: string, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(url).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedTier("all");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8" id="directory-browser-container">
      {/* Filters Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-gray-150/60" id="filter-header">
        <div>
          <h2 className="text-xl font-bold font-sans text-gray-950 tracking-normal flex items-center gap-2">
            <Filter className="w-5 h-5 text-utah-red" />
            Explore Resources Directory
          </h2>
          <p className="text-xs text-gray-500 mt-1 leading-normal">
            Customize files or filter science guides by academic student level and target services.
          </p>
        </div>

        {/* Top reset helpers */}
        {(searchQuery || selectedCategory !== "all" || selectedTier !== "all") && (
          <button
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors self-start cursor-pointer"
            id="reset-filters-btn"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset active filters
          </button>
        )}
      </div>

      {/* Sleek Directory Search Bar */}
      <div className="mt-6 uppercase font-sans tracking-normal" id="directory-search-outer-container">
        <span className="text-[10px] sm:text-[11px] font-bold text-gray-400 block mb-2 px-1">
          Search terms filter
        </span>
        <div 
            className={`flex items-center bg-white rounded-lg shadow-sm border transition-all duration-300 pl-4 pr-2.5 py-2.5 ${
            isSearchFocused 
              ? "border-utah-red ring-4 ring-utah-red-soft scale-[1.005]" 
              : "border-gray-200/80 hover:border-gray-300"
          }`}
        >
          <Search className="w-5 h-5 text-gray-400 shrink-0 select-none mr-3" />
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
            placeholder="Search scholarships, tutoring, advising, internships..."
            className="w-full text-sm outline-none bg-transparent text-gray-900 placeholder-gray-400 font-normal leading-relaxed text-left"
            id="directory-search-input"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-650 transition-colors mr-1 shrink-0 cursor-pointer"
              id="directory-search-clear-button"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* FILTER CONTROLS BAR (Double-Tier layout, extremely clear) */}
      <div className="mt-6 flex flex-col gap-5 z-20 shadow-xs" id="filter-interface-controls">
        {/* Academic Journey Stage - PRIMARY FILTER */}
        <div className="bg-white p-5 rounded-lg border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="shrink-0">
            <span className="text-xs font-sans font-bold text-gray-400 uppercase tracking-normal block">
              Academic level Grouping
            </span>
            <span className="text-[13px] font-sans font-medium text-gray-700 block mt-0.5">
              Refined by student timeline relevance.
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5" id="journey-tier-toggles">
            <button
              onClick={() => setSelectedTier("all")}
              className={`px-4 py-2.5 rounded-md text-xs sm:text-sm font-semibold tracking-normal transition-all active:scale-95 cursor-pointer ${
                selectedTier === "all"
                  ? "bg-utah-red text-white shadow-md shadow-red-600/15"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
              id="tier-toggle-all"
            >
              All Academic Levels
            </button>
            <button
              onClick={() => setSelectedTier(1)}
              className={`px-4 py-2.5 rounded-md text-xs sm:text-sm font-semibold tracking-normal transition-all active:scale-95 cursor-pointer ${
                selectedTier === 1
                  ? "bg-utah-red text-white shadow-md shadow-red-600/15"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
              id="tier-toggle-1"
            >
              Tier 1: Freshman & Sophomore
            </button>
            <button
              onClick={() => setSelectedTier(2)}
              className={`px-4 py-2.5 rounded-md text-xs sm:text-sm font-semibold tracking-normal transition-all active:scale-95 cursor-pointer ${
                selectedTier === 2
                  ? "text-white shadow-md shadow-[#708E99]/15"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
              style={
                selectedTier === 2
                  ? { backgroundColor: "#708E99", borderColor: "#708E99" }
                  : {
                      backgroundColor: "rgba(112, 142, 153, 0.08)",
                      borderColor: "rgba(112, 142, 153, 0.28)",
                      color: "#4F6871"
                    }
              }
              id="tier-toggle-2"
            >
              Tier 2: Junior, Senior & Graduate
            </button>
          </div>
        </div>

        {/* Resource Secondary Categories Select list */}
        <div className="flex flex-wrap items-center gap-1.5 py-1" id="category-scroller">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.value;
            const categoryStyle =
              cat.value === "all"
                ? {
                    accent: "#47494A",
                    background: "#F4F4F3",
                    border: "#D9DCDE",
                    text: "#47494A"
                  }
                : getCategoryStyle(cat.value);
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className="px-3.5 py-2 rounded-md text-xs font-semibold cursor-pointer transition-all border shrink-0 hover:brightness-95"
                style={
                  isSelected
                    ? {
                        backgroundColor: categoryStyle.accent,
                        borderColor: categoryStyle.accent,
                        color: "#ffffff"
                      }
                    : {
                        backgroundColor: categoryStyle.background,
                        borderColor: categoryStyle.border,
                        color: categoryStyle.text
                      }
                }
                id={`cat-pill-${cat.value.toLowerCase().replace(/\s/g, "-")}`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* SEARCH COUNTERS AND METRICS */}
      <div className="mt-8 flex items-center justify-between px-1" id="results-count-container">
        <span className="text-xs font-sans font-medium text-gray-500">
          Showing {filteredResources.length} out of {resources.length} science resources found
        </span>
        {(searchQuery || selectedCategory !== "all" || selectedTier !== "all") && (
          <span className="text-[11px] font-sans font-bold tracking-normal uppercase bg-utah-red-soft text-utah-red px-2.5 py-1 rounded-md">
            Active Filter Set
          </span>
        )}
      </div>

      {/* MAIN CARDS GRID */}
      {filteredResources.length === 0 ? (
        <div className="mt-10 p-12 bg-white rounded-lg border border-gray-200 text-center" id="no-results-panel">
          <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-400 mx-auto shadow-xs border border-gray-100">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h3 className="mt-4 font-bold text-gray-950 text-sm">No matched University Resources</h3>
          <p className="mt-1.5 text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
            We couldn't locate any science guides matching <span className="font-semibold text-gray-800">"{searchQuery}"</span> under current level settings. Try resetting your search metrics or exploring categories.
          </p>
          <button 
            onClick={handleResetFilters}
            className="mt-5 px-5 py-2 bg-gray-950 hover:bg-utah-red text-white text-xs font-semibold rounded-md Transition-all cursor-pointer"
            id="empty-state-reset-btn"
          >
            Clear Search & Reset Filters
          </button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="resources-grid">
          {filteredResources.map((item) => {
            const categoryStyle = getCategoryStyle(item.category);

            return (
              <div
                key={item.id}
                className="rounded-lg border border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group overflow-hidden shadow-xs relative"
                style={{ borderColor: categoryStyle.border }}
                id={`card-${item.id}`}
              >
                {/* Visual Accent Tab on hover */}
                <div
                  className="h-1 w-full opacity-80 group-hover:opacity-100 transition-opacity absolute top-0 left-0"
                  style={{ backgroundColor: categoryStyle.accent }}
                />

                {/* Card Main Body */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Level Badge + category header inline */}
                    <div className="flex items-center justify-between gap-2.5 mb-3.5">
                      <span
                        className="pl-0 pr-2.5 py-1 rounded text-[10px] font-sans font-bold tracking-normal uppercase border"
                        style={{
                          backgroundColor: categoryStyle.background,
                          borderColor: categoryStyle.border,
                          color: categoryStyle.text
                        }}
                      >
                        {item.category}
                      </span>

                      {/* Tier Badge */}
                      {item.tier === 1 ? (
                        <span className="pl-0 pr-2.5 py-1 rounded text-[10px] font-bold bg-utah-red-soft text-utah-red font-sans uppercase tracking-normal">
                          Freshman / Soph
                        </span>
                      ) : item.tier === 2 ? (
                        <span
                          className="pl-0 pr-2.5 py-1 rounded text-[10px] font-bold border font-sans uppercase tracking-normal"
                          style={{
                            backgroundColor: "rgba(112, 142, 153, 0.14)",
                            borderColor: "rgba(112, 142, 153, 0.32)",
                            color: "#4F6871"
                          }}
                        >
                          Junior / Senior / Graduate
                        </span>
                      ) : (
                        <span className="pl-0 pr-2.5 py-1 rounded text-[10px] font-bold bg-gray-50 text-gray-650 border border-gray-100 font-sans uppercase tracking-normal">
                          All Levels
                        </span>
                      )}
                    </div>

                    {/* Deadline Reminder if present */}
                    {item.deadline && (
                      <div className="mb-3 p-2 rounded-md bg-utah-red-soft border border-red-100 flex items-center gap-1.5 text-[11px] font-medium text-utah-red">
                        <Calendar className="w-3.5 h-3.5 shrink-0 text-utah-red" />
                        <span>Deadline: <strong className="font-bold">{item.deadline}</strong></span>
                      </div>
                    )}

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-gray-950 group-hover:text-utah-red transition-colors leading-snug">
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:underline flex items-center gap-1.5"
                      >
                        {item.name}
                        <ExternalLink className="w-3.5 h-3.5 text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    </h3>

                    {/* Description */}
                    <p className="mt-2.5 text-xs text-gray-500 leading-relaxed font-normal">
                      {item.description}
                    </p>

                    {/* Contact detail if present */}
                    {item.contact && (
                      <div className="mt-3.5 p-2 bg-gray-50 rounded-lg border border-gray-100 text-[11px] text-gray-600 font-sans">
                        <span className="font-extrabold tracking-normal block uppercase text-[8px] text-gray-400">Office Contact</span>
                        <span className="truncate block mt-0.5 font-medium">{item.contact}</span>
                      </div>
                    )}
                  </div>

                  {/* Card tags tags */}
                  <div className="mt-5 pt-4 border-t border-gray-50 flex flex-wrap gap-1">
                    {item.relevanceTags.slice(0, 4).map((tag) => (
                      <span 
                        key={tag} 
                        className="text-[10px] font-sans tracking-normal text-gray-400 bg-gray-50/50 px-1.5 py-0.5 rounded cursor-pointer hover:bg-gray-100/60 hover:text-gray-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSearchQuery(tag);
                        }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Operations Footer */}
                <div className="bg-gray-50/60 px-5 sm:px-6 py-3.5 border-t border-gray-100 flex items-center justify-end gap-2">
                  {/* Share Button (copies resource URL) */}
                  <button
                    onClick={(e) => handleShare(item.id, item.url, e)}
                    className="p-2 rounded-lg bg-white border border-gray-200 hover:bg-gray-100 text-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
                    title="Copy URL link"
                    id={`share-btn-${item.id}`}
                  >
                    {copiedId === item.id ? (
                      <Check className="w-3.5 h-3.5 text-utah-red" />
                    ) : (
                      <Share2 className="w-3.5 h-3.5" />
                    )}
                  </button>

                  {/* Direct visit web button */}
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 py-1.5 px-4 rounded-md text-xs font-bold bg-gray-950 text-white hover:bg-utah-red transition-all cursor-pointer"
                    id={`visit-btn-${item.id}`}
                  >
                    <span>Visit Site</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
