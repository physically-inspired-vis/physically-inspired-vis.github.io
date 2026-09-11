import { useEffect, useState } from "react";
import { Navigation } from "@/app/components/Navigation";
import { OverviewPage } from "@/app/components/OverviewPage";
import { DesignSpacePage } from "@/app/components/DesignSpacePage";
import { CorpusPage } from "@/app/components/CorpusPage";
import { CodingInterfacePage } from "@/app/components/CodingInterfacePage";
import { ProbePage } from "@/app/components/ProbePage";
import { StudyPage } from "@/app/components/StudyPage";
import { InspirationSetPage } from "@/app/components/InspirationSetPage";
import { InspirationLibraryPage } from "@/app/components/InspirationLibraryPage";
import { AboutPage } from "@/app/components/AboutPage";

// Every tab is addressable as "#<id>", so a page can be linked to directly.
// "#item=<id>" is the corpus's own deep link and keeps its meaning.
const TAB_IDS = [
  "overview", "design-space", "corpus", "coding-interface",
  "visarmature", "visclay", "study", "inspiration-library",
];

const tabFromHash = () => {
  const hash = window.location.hash.replace(/^#/, "");
  if (hash.startsWith("item=")) return "corpus";
  return TAB_IDS.includes(hash) ? hash : null;
};

const getInitialTab = () => tabFromHash() ?? "overview";

export default function App() {
  const [activeTab, setActiveTab] = useState(getInitialTab);

  // Clicking a tab writes the hash, so the address bar always names the page
  // you are on and the link can be copied straight out of it.
  const changeTab = (tab: string) => {
    setActiveTab(tab);
    if (window.location.hash.replace(/^#/, "") !== tab) window.location.hash = tab;
  };

  // Follow the hash when it changes underneath us - the back button, a pasted
  // link, or the corpus writing its own "#item=" as an example is opened.
  useEffect(() => {
    const sync = () => {
      const tab = tabFromHash();
      if (tab) setActiveTab(tab);
    };
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const renderPage = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewPage onTabChange={changeTab} />;
      case "design-space":
        return <DesignSpacePage />;
      case "corpus":
        return <CorpusPage />;
      case "coding-interface":
        return <CodingInterfacePage />;
      case "visarmature":
        return <ProbePage id="visarmature" />;
      case "visclay":
        return <ProbePage id="visclay" />;
      case "study":
        return <StudyPage />;
      case "inspiration-library":
        return <InspirationLibraryPage />;
      case "inspiration-set":
        return <InspirationSetPage />;
      case "about":
        return <AboutPage />;
      default:
        return <DesignSpacePage />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navigation activeTab={activeTab} onTabChange={changeTab} />
      <main className="flex-1">{renderPage()}</main>
      {activeTab !== "design-space" && (
        <footer className="border-t border-border mt-20 bg-slate-800">
          <div className="max-w-7xl mx-auto px-6 py-8 text-center text-sm text-white">
            {/* Footer content can be added here if needed */}
          </div>
        </footer>
      )}
    </div>
  );
}