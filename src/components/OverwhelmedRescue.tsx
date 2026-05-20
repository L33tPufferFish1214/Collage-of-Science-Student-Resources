import React, { useState } from "react";
import { HeartHandshake, PhoneCall, AlertTriangle, GraduationCap, DollarSign, Compass, UserCheck, ShieldAlert, Sparkles, Smile, ArrowRight } from "lucide-react";

interface OverwhelmedRescueProps {
  onSuggestQuery: (query: string, category?: string, tier?: 1 | 2 | "all") => void;
  setActiveView: (view: string) => void;
}

export function OverwhelmedRescue({ onSuggestQuery, setActiveView }: OverwhelmedRescueProps) {
  const [activeRescueTag, setActiveRescueTag] = useState<string | null>(null);

  const HELP_SCENARIOS = [
    {
      id: "mental-health",
      title: "Mental Health & Stress Burnout",
      description: "Get immediate confidential counseling or speak with Steven Trujillo, our embedded College of Science therapist.",
      icon: Smile,
      badgeColor: "bg-teal-50 text-teal-700 border-teal-100",
      iconColor: "text-teal-600 bg-teal-100/50",
      highlightedResource: {
        name: "Steven Trujillo — Embedded Therapist",
        contact: "strujillo@sa.utah.edu / 801-581-6826",
        desc: "Completely free, private mental health support tailored specfically for STEM workloads.",
        actionLabel: "Book Confidentially",
        actionUrl: "https://counselingcenter.utah.edu/services/appointment.php"
      },
      quickQuery: "therapist",
      categoryFilter: "Wellness & Mental Health"
    },
    {
      id: "grades",
      title: "Struggling With Tough Classes",
      description: "Math, chemistry, physics, and general science classes can be incredibly grueling. You do not have to struggle alone.",
      icon: GraduationCap,
      badgeColor: "bg-red-50 text-red-700 border-red-100",
      iconColor: "text-red-600 bg-red-100/50",
      highlightedResource: {
        name: "Mathematics & Chemistry Tutoring Centers",
        contact: "Free drop-in peer science tutoring",
        desc: "Dedicated department offices with peer resources, prior exams, and warm quiet study zones.",
        actionLabel: "View All Academic Helper Tools",
        actionQuery: "tutoring"
      },
      quickQuery: "tutoring",
      categoryFilter: "Academic Help"
    },
    {
      id: "money",
      title: "Financial Restlessness & Tuition Stress",
      description: "University fees can feel daunting. We can help you navigate Pell grants, scholarships, and payment timelines easily.",
      icon: DollarSign,
      badgeColor: "bg-amber-50 text-amber-700 border-amber-100",
      iconColor: "text-amber-600 bg-amber-100/50",
      highlightedResource: {
        name: "ScholarshipUniverse Central Application",
        contact: "Direct financial advisors available",
        desc: "Complete just one application to auto-screen your details across hundreds of available College of Science scholarships.",
        actionLabel: "Access Scholarship Universe",
        actionUrl: "https://utah.scholarshipuniverse.com/student/application/25730/847257"
      },
      quickQuery: "ScholarshipUniverse",
      categoryFilter: "Scholarships & Financial Aid"
    },
    {
      id: "lost-freshman",
      title: "First-Year Student & Feeling Lost",
      description: "Class planning, AP credits, and online enrollment can feel like a labyrinth. Let's make it super clear.",
      icon: Compass,
      badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-100",
      iconColor: "text-indigo-600 bg-indigo-100/50",
      highlightedResource: {
        name: "Drop-In Advising & Academic Advising Center",
        contact: "https://science.utah.edu/students/academic-advising/",
        desc: "Connect directly with academic advisors or friendly peer advisors to structure your class roadmap without the stress.",
        actionLabel: "Go to Academic Advising Site",
        actionUrl: "https://science.utah.edu/students/academic-advising/"
      },
      quickQuery: "advising",
      categoryFilter: "Advising & Course Planning",
      tierFilter: 1
    }
  ];

  const handleRescueSelect = (scenario: typeof HELP_SCENARIOS[0]) => {
    setActiveRescueTag(scenario.id);
    if (scenario.highlightedResource.actionQuery) {
      onSuggestQuery(scenario.highlightedResource.actionQuery, scenario.categoryFilter, scenario.tierFilter as 1 | 2 | undefined);
    } else {
      onSuggestQuery(scenario.quickQuery, scenario.categoryFilter, scenario.tierFilter as 1 | 2 | undefined);
    }
  };

  return (
    <div className="bg-gradient-to-br from-emerald-50/60 via-teal-50/20 to-transparent border border-emerald-100 rounded-3xl p-6 sm:p-8 max-w-7xl mx-auto my-12 shadow-sm" id="overwhelmed-rescue-block">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-emerald-100/60" id="rescue-intro">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-emerald-600 rounded-2xl text-white shadow-md shadow-emerald-600/15">
            <HeartHandshake className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
              Feeling Overwhelmed? <span className="text-emerald-700 font-medium text-sm sm:text-base font-sans">Let us simplify it.</span>
            </h2>
            <p className="mt-1.5 text-sm text-gray-600 max-w-xl leading-relaxed">
              University structures can feel cold and confusing. Select the situation below that resonates most right now, and we'll instantly organize the solution.
            </p>
          </div>
        </div>

        {/* Immediate emergency contacts always sticky */}
        <div className="bg-white/80 backdrop-blur-xs p-4 rounded-2xl border border-red-100 flex items-center gap-3.5 shrink-0" id="rescue-hotline-ribbon">
          <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center text-red-600">
            <PhoneCall className="w-5 h-5 animate-bounce" />
          </div>
          <div>
            <span className="text-[10px] font-sans font-bold text-red-600 tracking-widest uppercase block">Immediate 24/7 Hotline</span>
            <span className="text-sm font-bold text-gray-900 block mt-0.5">Crisis Support: Call 988</span>
            <span className="text-xs text-gray-400 block mt-0.5">Free, safe, confidential counseling.</span>
          </div>
        </div>
      </div>

      {/* Scenario Select Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8" id="rescue-scenarios-grid">
        {HELP_SCENARIOS.map((item) => {
          const isSelected = activeRescueTag === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => handleRescueSelect(item)}
              className={`p-5 rounded-2xl text-left border bg-white transition-all duration-300 relative group flex flex-col justify-between h-full ${
                isSelected 
                  ? "border-emerald-500 shadow-md ring-2 ring-emerald-500/20" 
                  : "border-gray-100 hover:border-gray-200 hover:shadow-xs"
              }`}
              id={`rescue-btn-${item.id}`}
            >
              <div>
                <div className={`p-2 rounded-xl inline-block ${item.iconColor} mb-4`}>
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm group-hover:text-emerald-700 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs text-gray-550 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-50/50 flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <span>Go to page</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Conditional Active Guidance Display Card */}
      {activeRescueTag && (
        <div className="mt-8 p-5 sm:p-6 bg-white rounded-2xl border border-emerald-200/80 shadow-xs animate-fade-in" id="rescue-feedback-card">
          {HELP_SCENARIOS.map((item) => {
            if (item.id !== activeRescueTag) return null;
            return (
              <div key={item.id} className="flex flex-col sm:flex-row items-start justify-between gap-6">
                <div>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-sans font-semibold tracking-wider border ${item.badgeColor} mb-3`}>
                    Primary Support Match
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-gray-900">
                    {item.highlightedResource.name}
                  </h3>
                  <p className="text-xs font-sans text-gray-500 font-semibold mt-1">
                    Contact details: {item.highlightedResource.contact}
                  </p>
                  <p className="mt-2 text-sm text-gray-600 max-w-2xl leading-relaxed">
                    {item.highlightedResource.desc}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0 justify-end self-end sm:self-center">
                  <button
                    onClick={() => setActiveView("resources")}
                    className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 text-xs font-semibold transition-all text-center"
                    id="secondary-rescue-action"
                  >
                    View Class Directory
                  </button>
                  {item.highlightedResource.actionUrl ? (
                    <a
                      href={item.highlightedResource.actionUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm text-center transition-all"
                      id="primary-rescue-action-link"
                    >
                      {item.highlightedResource.actionLabel}
                    </a>
                  ) : (
                    <button
                      onClick={() => {
                        if (item.highlightedResource.actionQuery) {
                          onSuggestQuery(item.highlightedResource.actionQuery, item.categoryFilter);
                        }
                      }}
                      className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm text-center transition-all"
                      id="primary-rescue-action-btn"
                    >
                      {item.highlightedResource.actionLabel}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
