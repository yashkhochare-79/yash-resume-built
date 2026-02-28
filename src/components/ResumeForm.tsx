import { ResumeData } from "@/types/resume";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, ArrowLeft, ArrowRight, User, GraduationCap, Briefcase, Code, Wrench } from "lucide-react";
import { useState } from "react";

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
  onBack: () => void;
}

const steps = [
  { label: "Personal", icon: User },
  { label: "Education", icon: GraduationCap },
  { label: "Experience", icon: Briefcase },
  { label: "Skills", icon: Wrench },
  { label: "Projects", icon: Code },
];

const ResumeForm = ({ data, onChange, onBack }: ResumeFormProps) => {
  const [step, setStep] = useState(0);
  const [skillInput, setSkillInput] = useState("");

  const updatePersonal = (field: string, value: string) => {
    onChange({ ...data, personalInfo: { ...data.personalInfo, [field]: value } });
  };

  const addEducation = () => {
    onChange({
      ...data,
      education: [...data.education, { id: crypto.randomUUID(), institution: "", degree: "", field: "", startDate: "", endDate: "", gpa: "" }],
    });
  };

  const removeEducation = (id: string) => {
    onChange({ ...data, education: data.education.filter((e) => e.id !== id) });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    onChange({ ...data, education: data.education.map((e) => (e.id === id ? { ...e, [field]: value } : e)) });
  };

  const addExperience = () => {
    onChange({
      ...data,
      experience: [...data.experience, { id: crypto.randomUUID(), company: "", role: "", startDate: "", endDate: "", description: "" }],
    });
  };

  const removeExperience = (id: string) => {
    onChange({ ...data, experience: data.experience.filter((e) => e.id !== id) });
  };

  const updateExperience = (id: string, field: string, value: string) => {
    onChange({ ...data, experience: data.experience.map((e) => (e.id === id ? { ...e, [field]: value } : e)) });
  };

  const addSkill = () => {
    if (skillInput.trim() && !data.skills.includes(skillInput.trim())) {
      onChange({ ...data, skills: [...data.skills, skillInput.trim()] });
      setSkillInput("");
    }
  };

  const removeSkill = (skill: string) => {
    onChange({ ...data, skills: data.skills.filter((s) => s !== skill) });
  };

  const addProject = () => {
    onChange({
      ...data,
      projects: [...data.projects, { id: crypto.randomUUID(), name: "", description: "", technologies: "", link: "" }],
    });
  };

  const removeProject = (id: string) => {
    onChange({ ...data, projects: data.projects.filter((p) => p.id !== id) });
  };

  const updateProject = (id: string, field: string, value: string) => {
    onChange({ ...data, projects: data.projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)) });
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      {/* Header */}
      <button onClick={onBack} className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors text-sm">
        <ArrowLeft className="h-4 w-4" /> Back to home
      </button>

      <h2 className="font-display text-3xl font-bold text-foreground mb-2">Build Your Resume</h2>
      <p className="text-muted-foreground mb-8">Fill in your details step by step.</p>

      {/* Step indicators */}
      <div className="flex items-center gap-2 mb-10 overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <button
            key={s.label}
            onClick={() => setStep(i)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
              i === step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground"
            }`}
          >
            <s.icon className="h-4 w-4" />
            {s.label}
          </button>
        ))}
      </div>

      {/* Step content */}
      <div className="animate-fade-in">
        {step === 0 && (
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label className="text-sm font-medium text-foreground mb-1.5 block">Full Name</Label>
                <Input placeholder="Jane Smith" value={data.personalInfo.fullName} onChange={(e) => updatePersonal("fullName", e.target.value)} />
              </div>
              <div>
                <Label className="text-sm font-medium text-foreground mb-1.5 block">Email</Label>
                <Input placeholder="jane@example.com" value={data.personalInfo.email} onChange={(e) => updatePersonal("email", e.target.value)} />
              </div>
              <div>
                <Label className="text-sm font-medium text-foreground mb-1.5 block">Phone</Label>
                <Input placeholder="+1 234 567 890" value={data.personalInfo.phone} onChange={(e) => updatePersonal("phone", e.target.value)} />
              </div>
              <div>
                <Label className="text-sm font-medium text-foreground mb-1.5 block">Location</Label>
                <Input placeholder="San Francisco, CA" value={data.personalInfo.location} onChange={(e) => updatePersonal("location", e.target.value)} />
              </div>
              <div>
                <Label className="text-sm font-medium text-foreground mb-1.5 block">LinkedIn</Label>
                <Input placeholder="linkedin.com/in/janesmith" value={data.personalInfo.linkedin} onChange={(e) => updatePersonal("linkedin", e.target.value)} />
              </div>
              <div>
                <Label className="text-sm font-medium text-foreground mb-1.5 block">Portfolio URL</Label>
                <Input placeholder="janesmith.dev" value={data.personalInfo.portfolio} onChange={(e) => updatePersonal("portfolio", e.target.value)} />
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium text-foreground mb-1.5 block">Professional Summary</Label>
              <Textarea placeholder="Brief summary of your background and goals..." value={data.personalInfo.summary} onChange={(e) => updatePersonal("summary", e.target.value)} rows={4} />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            {data.education.map((edu) => (
              <div key={edu.id} className="bg-card rounded-xl p-5 shadow-soft border border-border relative">
                <button onClick={() => removeEducation(edu.id)} className="absolute top-4 right-4 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Institution</Label>
                    <Input placeholder="MIT" value={edu.institution} onChange={(e) => updateEducation(edu.id, "institution", e.target.value)} />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Degree</Label>
                    <Input placeholder="B.S." value={edu.degree} onChange={(e) => updateEducation(edu.id, "degree", e.target.value)} />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Field of Study</Label>
                    <Input placeholder="Computer Science" value={edu.field} onChange={(e) => updateEducation(edu.id, "field", e.target.value)} />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">GPA</Label>
                    <Input placeholder="3.8" value={edu.gpa} onChange={(e) => updateEducation(edu.id, "gpa", e.target.value)} />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Start Date</Label>
                    <Input placeholder="Sep 2020" value={edu.startDate} onChange={(e) => updateEducation(edu.id, "startDate", e.target.value)} />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">End Date</Label>
                    <Input placeholder="May 2024" value={edu.endDate} onChange={(e) => updateEducation(edu.id, "endDate", e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={addEducation} className="w-full">
              <Plus className="h-4 w-4" /> Add Education
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            {data.experience.map((exp) => (
              <div key={exp.id} className="bg-card rounded-xl p-5 shadow-soft border border-border relative">
                <button onClick={() => removeExperience(exp.id)} className="absolute top-4 right-4 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Company</Label>
                    <Input placeholder="Google" value={exp.company} onChange={(e) => updateExperience(exp.id, "company", e.target.value)} />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Role</Label>
                    <Input placeholder="Software Engineer Intern" value={exp.role} onChange={(e) => updateExperience(exp.id, "role", e.target.value)} />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Start Date</Label>
                    <Input placeholder="Jun 2023" value={exp.startDate} onChange={(e) => updateExperience(exp.id, "startDate", e.target.value)} />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">End Date</Label>
                    <Input placeholder="Aug 2023" value={exp.endDate} onChange={(e) => updateExperience(exp.id, "endDate", e.target.value)} />
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Description</Label>
                  <Textarea placeholder="Describe your responsibilities and achievements..." value={exp.description} onChange={(e) => updateExperience(exp.id, "description", e.target.value)} rows={3} />
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={addExperience} className="w-full">
              <Plus className="h-4 w-4" /> Add Experience
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="flex gap-3">
              <Input
                placeholder="Type a skill and press Enter..."
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
              />
              <Button variant="outline" onClick={addSkill}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill) => (
                <span key={skill} className="inline-flex items-center gap-1.5 bg-secondary/15 text-foreground px-3 py-1.5 rounded-full text-sm font-medium">
                  {skill}
                  <button onClick={() => removeSkill(skill)} className="text-muted-foreground hover:text-destructive">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            {data.projects.map((proj) => (
              <div key={proj.id} className="bg-card rounded-xl p-5 shadow-soft border border-border relative">
                <button onClick={() => removeProject(proj.id)} className="absolute top-4 right-4 text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Project Name</Label>
                    <Input placeholder="E-commerce App" value={proj.name} onChange={(e) => updateProject(proj.id, "name", e.target.value)} />
                  </div>
                  <div>
                    <Label className="text-sm font-medium mb-1.5 block">Technologies</Label>
                    <Input placeholder="React, Node.js, PostgreSQL" value={proj.technologies} onChange={(e) => updateProject(proj.id, "technologies", e.target.value)} />
                  </div>
                </div>
                <div className="mb-4">
                  <Label className="text-sm font-medium mb-1.5 block">Description</Label>
                  <Textarea placeholder="What does this project do?" value={proj.description} onChange={(e) => updateProject(proj.id, "description", e.target.value)} rows={2} />
                </div>
                <div>
                  <Label className="text-sm font-medium mb-1.5 block">Link</Label>
                  <Input placeholder="github.com/jane/project" value={proj.link} onChange={(e) => updateProject(proj.id, "link", e.target.value)} />
                </div>
              </div>
            ))}
            <Button variant="outline" onClick={addProject} className="w-full">
              <Plus className="h-4 w-4" /> Add Project
            </Button>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-10">
        <Button variant="ghost" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
          <ArrowLeft className="h-4 w-4" /> Previous
        </Button>
        <Button variant="default" onClick={() => setStep(Math.min(steps.length - 1, step + 1))} disabled={step === steps.length - 1}>
          Next <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ResumeForm;
