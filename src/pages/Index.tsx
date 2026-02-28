import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import { ResumeData, emptyResumeData } from "@/types/resume";
import { Eye, PenLine } from "lucide-react";

const Index = () => {
  const [view, setView] = useState<"hero" | "builder">("hero");
  const [resumeData, setResumeData] = useState<ResumeData>(emptyResumeData);
  const [showPreview, setShowPreview] = useState(false);

  if (view === "hero") {
    return <HeroSection onGetStarted={() => setView("builder")} />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile toggle */}
      <div className="lg:hidden flex justify-center py-4 border-b border-border">
        <div className="flex bg-muted rounded-full p-1">
          <button
            onClick={() => setShowPreview(false)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              !showPreview ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            <PenLine className="h-4 w-4" /> Edit
          </button>
          <button
            onClick={() => setShowPreview(true)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              showPreview ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            <Eye className="h-4 w-4" /> Preview
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Form panel */}
        <div className={`lg:w-1/2 lg:border-r border-border overflow-y-auto ${showPreview ? "hidden lg:block" : ""}`}>
          <ResumeForm data={resumeData} onChange={setResumeData} onBack={() => setView("hero")} />
        </div>

        {/* Preview panel */}
        <div className={`lg:w-1/2 bg-muted/50 overflow-y-auto py-8 px-4 ${!showPreview ? "hidden lg:block" : ""}`}>
          <ResumePreview data={resumeData} />
        </div>
      </div>
    </div>
  );
};

export default Index;
