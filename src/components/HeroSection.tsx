import { FileText, Sparkles, Download, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  onGetStarted: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="min-h-screen flex flex-col">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 md:px-12 py-6">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-secondary" />
          <span className="font-display text-xl font-bold text-foreground">ResumeAI</span>
        </div>
        <Button variant="ghost" size="sm" onClick={onGetStarted}>
          Get Started
        </Button>
      </nav>

      {/* Hero content */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary rounded-full px-4 py-1.5 text-sm font-medium mb-8 animate-fade-up">
            <Sparkles className="h-4 w-4" />
            AI-Powered Resume Builder
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold text-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Your career story,
            <br />
            <span className="text-secondary">beautifully told.</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Generate tailored resumes, cover letters, and portfolios that highlight
            your unique strengths. Stand out to recruiters with AI-crafted content.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button variant="accent" size="xl" onClick={onGetStarted}>
              Build Your Resume
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="lg">
              View Examples
            </Button>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-16 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            {[
              { icon: Sparkles, label: "AI-Generated Content" },
              { icon: FileText, label: "Professional Templates" },
              { icon: Download, label: "Export Anywhere" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2 text-muted-foreground text-sm">
                <item.icon className="h-4 w-4 text-secondary" />
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
