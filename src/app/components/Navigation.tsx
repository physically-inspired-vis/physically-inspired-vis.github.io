import { useState } from "react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "design-space", label: "Design Space" },
  { id: "corpus", label: "Corpus" },
  { id: "inspiration-library", label: "Inspiration Library" },
  { id: "coding-interface", label: "Coding" },
  // { id: "inspiration-set", label: "Inspiration Set" },
  // { id: "about", label: "Resources" },
];

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleTabChange = (id: string) => {
    onTabChange(id);
    setMenuOpen(false);
  };

  return (
    <nav className="border-b border-border bg-slate-800 sticky top-0 z-50">
      <div className="px-4 md:px-6">
        <div className="flex items-center h-16 gap-4 md:gap-12">

          {/* Logo + title */}
          <div className="flex items-center gap-2 md:gap-3 min-w-0">
            <img
              src={`${import.meta.env.BASE_URL}icons/website_icon_rocks.png`}
              alt="Website Icon"
              className="h-14 w-14 md:h-20 md:w-20 object-contain flex-shrink-0"
            />
            <h1 className="text-sm md:text-lg font-semibold tracking-tight text-white leading-tight">
              <span className="hidden sm:inline">Physically-Inspired Visualization: Design Space Explorer</span>
              <span className="sm:hidden">Physically-Inspired VIS Explorer</span>
            </h1>
          </div>

          {/* Desktop tabs */}
          <div className="hidden md:flex gap-1 ml-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`px-4 py-2 text-sm transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "text-white border-b-2 border-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden ml-auto flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-transform duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-opacity duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-0.5 bg-white transition-transform duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-700">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`w-full text-left px-6 py-3 text-sm transition-colors ${
                activeTab === tab.id
                  ? "text-white bg-slate-700"
                  : "text-gray-300 hover:text-white hover:bg-slate-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
