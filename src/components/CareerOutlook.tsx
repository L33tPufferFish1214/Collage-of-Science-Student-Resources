import React, { useState, useMemo } from "react";
import { CareerOutlook, CAREER_OUTLOOK_DATA } from "../data/resources";
import { TrendingUp, FileSpreadsheet, MapPin, Sparkles } from "lucide-react";

export function CareerOutlookVisualizer() {
  const [selectedSector, setSelectedSector] = useState("all");
  const [sortByMetric, setSortByMetric] = useState<"growth" | "salary">("growth");

  const sectors = useMemo(() => {
    const list = CAREER_OUTLOOK_DATA.map((c) => c.sector);
    return ["all", ...Array.from(new Set(list))];
  }, []);

  const sortedAndFilteredCareers = useMemo(() => {
    const filtered = CAREER_OUTLOOK_DATA.filter((c) => {
      if (selectedSector !== "all" && c.sector !== selectedSector) {
        return false;
      }
      return true;
    });

    return [...filtered].sort((a, b) => {
      if (sortByMetric === "growth") {
        return b.growth - a.growth;
      } else {
        return b.medianSalary - a.medianSalary;
      }
    });
  }, [selectedSector, sortByMetric]);

  const maxSalary = useMemo(() => {
    return Math.max(...CAREER_OUTLOOK_DATA.map((c) => c.medianSalary));
  }, []);

  const maxGrowth = useMemo(() => {
    return Math.max(...CAREER_OUTLOOK_DATA.map((c) => c.growth));
  }, []);

  const formatSalary = (salary: number) => {
    if (salary >= 200000) return "$208,000+";
    return `$${salary.toLocaleString()}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in" id="careers-panel-wrapper">
      {/* Intro Header */}
      <div className="pb-6 border-b border-gray-150/60" id="careers-intro">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-utah-red-soft text-utah-red text-xs font-mono font-bold mb-3.5">
          <Sparkles className="w-3.5 h-3.5 text-utah-red animate-pulse" />
          Bureau of Labor Statistics (BLS) National Projections
        </div>
        <h2 className="text-xl sm:text-2xl font-extrabold font-sans text-gray-950 tracking-normal flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-utah-red" />
          Utah Science Career & Salary Roadmap
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-1.5 leading-relaxed max-w-3xl">
          Where can your math, chemistry, physics, or biology degree take you? Browse high-paying jobs and fastest-growing industry sectors. Click query triggers below to filter associated resource programs.
        </p>
      </div>

      {/* Grid Layout splits into left instructions and right visual list */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Stats Cards & BLS Career Advice */}
        <div className="space-y-6 lg:col-span-1" id="careers-guidelines">
          <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
            <h3 className="font-bold text-gray-900 text-sm flex items-center gap-1.5 leading-none">
              <FileSpreadsheet className="w-4.5 h-4.5 text-utah-red" />
              How to Leverage Job Statistics
            </h3>
            <p className="text-xs text-gray-650 leading-relaxed">
              Your science degree constructs core skills in data visualization, quantitative analysis, chemical diagnostics, and structural reasoning. These skills translate directly into high-paying industries.
            </p>
            <div className="pt-2 border-t border-red-100/40 space-y-3.5">
              <div className="flex gap-2">
                <span className="w-5 h-5 rounded-full bg-utah-red-soft text-utah-red text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">1</span>
                <p className="text-xs text-gray-650 leading-normal">
                  <strong className="font-bold text-gray-900">High Growth:</strong> Fields with +20% growth rates indicate extremely active hiring markets. Excellent targeting for internship tracks.
                </p>
              </div>
              <div className="flex gap-2">
                <span className="w-5 h-5 rounded-full bg-utah-red-soft text-utah-red text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">2</span>
                <p className="text-xs text-gray-650 leading-normal">
                  <strong className="font-bold text-gray-900">Career Launch Support:</strong> Book appointments with our College of Science peer Career Coaches for interview prep.
                </p>
              </div>
            </div>

            <a
              href="https://science.utah.edu/career-paths/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 w-full text-center py-2.5 px-4 rounded-md bg-utah-red hover:bg-utah-red-dark text-white text-xs font-bold shadow-md shadow-red-600/15 inline-block transition-all"
              id="career-map-link"
            >
              Open Official Career Path Maps
            </a>
          </div>

          {/* Quick-Access Resources Card */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-3">
            <h4 className="font-bold text-gray-900 text-xs sm:text-sm leading-none flex items-center gap-1.5">
              <MapPin className="w-4.5 h-4.5 text-utah-red shrink-0" />
              Interview Ready?
            </h4>
            <p className="text-xs text-gray-650 leading-relaxed">
              Get free professional headshots on LinkedIn, free tailored suits from the Career Closet, and book high-definition soundproof Zoom rooms inside the Career Studio. Everything is free for Utah College of Science students.
            </p>
          </div>
        </div>

        {/* Right Column: Dynamic Interactive Directory of Career stats */}
        <div className="lg:col-span-2 space-y-6" id="careers-table-board">
          
          {/* Controls Selector Ribbon */}
          <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-xs flex flex-col sm:flex-row gap-4 justify-between items-center z-13">
            {/* Sorting Toggles */}
            <div className="flex rounded-lg bg-gray-100/80 p-1 w-full sm:w-auto" id="metric-sorting-pills">
              <button
                onClick={() => setSortByMetric("growth")}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  sortByMetric === "growth"
                    ? "bg-white text-gray-950 shadow-xs"
                    : "text-gray-500 hover:text-gray-900"
                }`}
                id="sort-by-growth"
              >
                Sort by Job Growth
              </button>
              <button
                onClick={() => setSortByMetric("salary")}
                className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  sortByMetric === "salary"
                    ? "bg-white text-gray-950 shadow-xs"
                    : "text-gray-500 hover:text-gray-900"
                }`}
                id="sort-by-salary"
              >
                Sort by Median Salary
              </button>
            </div>

            {/* Sector filter */}
            <div className="w-full sm:w-56 shrink-0 flex items-center gap-2">
              <span className="text-xs font-bold text-gray-500 font-mono">Sector:</span>
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="w-full text-xs sm:text-sm p-2 bg-gray-50 border border-gray-200 rounded-md outline-none focus:border-utah-red transition-colors cursor-pointer text-gray-700 font-semibold"
                id="sector-filter-select"
              >
                <option value="all">All Sectors</option>
                {sectors.filter((s) => s !== "all").map((sect) => (
                  <option key={sect} value={sect}>
                    {sect}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Visual Progress Bar Board */}
          <div className="space-y-4" id="careers-bars-list">
            {sortedAndFilteredCareers.map((c, index) => {
              // Percentage calculation for progress bars
              const salaryPercentage = Math.min(100, (c.medianSalary / maxSalary) * 100);
              const growthPercentage = Math.min(100, (c.growth / maxGrowth) * 100);

              return (
                <div 
                  key={`${c.career}-${index}`}
                  className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 p-5 shadow-xs hover:shadow-md transition-all duration-300"
                  id={`career-item-${index}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-50">
                    <div>
                      <span className="inline-block px-2 py-0.5 rounded text-[9px] font-mono font-bold bg-gray-50 text-gray-500 border border-gray-100 mr-2 uppercase">
                        {c.sector}
                      </span>
                      <h4 className="font-extrabold text-gray-900 text-sm sm:text-base mt-2 sm:mt-0 inline-block">
                        {c.career}
                      </h4>
                    </div>

                    <div className="flex gap-4 shrink-0 text-left sm:text-right">
                      {/* Metric 1: Salary */}
                      <div>
                        <span className="text-[10px] text-gray-400 font-mono uppercase block">Median Salary</span>
                        <span className="text-sm font-extrabold text-gray-900 font-mono">
                          {formatSalary(c.medianSalary)}
                        </span>
                      </div>

                      {/* Metric 2: Growth */}
                      <div>
                        <span className="text-[10px] text-gray-400 font-mono uppercase block">10-Yr Outlook</span>
                        <span className="text-sm font-extrabold text-utah-red font-mono flex items-center justify-start sm:justify-end gap-0.5">
                          +{c.growth}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Render interactive bar gauges */}
                  <div className="mt-3.5 space-y-2.5">
                    {/* Salary bar */}
                    <div>
                      <div className="flex justify-between text-[10px] text-gray-400 font-mono mb-1">
                        <span>Salary Index</span>
                        <span className="font-semibold text-gray-600">{Math.round(salaryPercentage)}% of Peak BLS</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div 
                          className="h-full bg-gray-900 rounded-full transition-all duration-500" 
                          style={{ width: `${salaryPercentage}%` }}
                        />
                      </div>
                    </div>

                    {/* Growth bar */}
                    <div>
                      <div className="flex justify-between text-[10px] text-gray-400 font-mono mb-1">
                        <span>Job Market growth Index</span>
                        <span className="font-semibold text-utah-red">+{c.growth}% growth pace</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-gray-100 overflow-hidden">
                        <div 
                          className="h-full bg-utah-red rounded-full transition-all duration-500" 
                          style={{ width: `${growthPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </div>
  );
}
