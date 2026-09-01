import { useState } from "react";
import { Navigation } from "@/app/components/Navigation";
import { OverviewPage } from "@/app/components/OverviewPage";
import { DesignSpacePage } from "@/app/components/DesignSpacePage";
import { CorpusPage } from "@/app/components/CorpusPage";
import { CodingInterfacePage } from "@/app/components/CodingInterfacePage";
import { ProbesPage } from "@/app/components/ProbesPage";
import { StudyPage } from "@/app/components/StudyPage";
import { InspirationSetPage } from "@/app/components/InspirationSetPage";
import { InspirationLibraryPage } from "@/app/components/InspirationLibraryPage";
import { AboutPage } from "@/app/components/AboutPage";

const getInitialTab = () => {
  if (window.location.hash.startsWith("#item=")) return "corpus";
  return "overview";
};

export default function App() {
  const [activeTab, setActiveTab] = useState(getInitialTab);

  const renderPage = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewPage onTabChange={setActiveTab} />;
      case "design-space":
        return <DesignSpacePage />;
      case "corpus":
        return <CorpusPage />;
      case "coding-interface":
        return <CodingInterfacePage />;
      case "probes":
        return <ProbesPage />;
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
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
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