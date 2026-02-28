import { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Linkedin, Globe } from "lucide-react";

interface ResumePreviewProps {
  data: ResumeData;
}

const ResumePreview = ({ data }: ResumePreviewProps) => {
  const { personalInfo, education, experience, skills, projects } = data;
  const hasContent = personalInfo.fullName || education.length || experience.length || skills.length || projects.length;

  if (!hasContent) {
    return (
      <div className="flex items-center justify-center h-full text-muted-foreground text-center p-8">
        <div>
          <p className="font-display text-xl mb-2">Your resume preview</p>
          <p className="text-sm">Start filling in your details to see a live preview here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card p-8 md:p-10 max-w-[700px] mx-auto shadow-medium rounded-xl font-body text-foreground">
      {/* Header */}
      {personalInfo.fullName && (
        <div className="border-b border-border pb-5 mb-6">
          <h1 className="font-display text-3xl font-bold text-foreground mb-1">{personalInfo.fullName}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-3">
            {personalInfo.email && (
              <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" />{personalInfo.email}</span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" />{personalInfo.phone}</span>
            )}
            {personalInfo.location && (
              <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{personalInfo.location}</span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1.5"><Linkedin className="h-3.5 w-3.5" />{personalInfo.linkedin}</span>
            )}
            {personalInfo.portfolio && (
              <span className="flex items-center gap-1.5"><Globe className="h-3.5 w-3.5" />{personalInfo.portfolio}</span>
            )}
          </div>
        </div>
      )}

      {/* Summary */}
      {personalInfo.summary && (
        <div className="mb-6">
          <h2 className="font-display text-sm font-bold uppercase tracking-widest text-secondary mb-2">Summary</h2>
          <p className="text-sm leading-relaxed text-muted-foreground">{personalInfo.summary}</p>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="mb-6">
          <h2 className="font-display text-sm font-bold uppercase tracking-widest text-secondary mb-3">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-sm">{edu.institution}</h3>
                <span className="text-xs text-muted-foreground">{edu.startDate} — {edu.endDate}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {edu.degree} {edu.field && `in ${edu.field}`} {edu.gpa && `• GPA: ${edu.gpa}`}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Experience */}
      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="font-display text-sm font-bold uppercase tracking-widest text-secondary mb-3">Experience</h2>
          {experience.map((exp) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-sm">{exp.role}</h3>
                <span className="text-xs text-muted-foreground">{exp.startDate} — {exp.endDate}</span>
              </div>
              <p className="text-sm text-secondary font-medium">{exp.company}</p>
              {exp.description && <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{exp.description}</p>}
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="font-display text-sm font-bold uppercase tracking-widest text-secondary mb-3">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="bg-muted px-3 py-1 rounded-full text-xs font-medium text-foreground">{skill}</span>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-widest text-secondary mb-3">Projects</h2>
          {projects.map((proj) => (
            <div key={proj.id} className="mb-3">
              <div className="flex items-baseline gap-2">
                <h3 className="font-semibold text-sm">{proj.name}</h3>
                {proj.technologies && <span className="text-xs text-muted-foreground">({proj.technologies})</span>}
              </div>
              {proj.description && <p className="text-sm text-muted-foreground leading-relaxed">{proj.description}</p>}
              {proj.link && <p className="text-xs text-secondary mt-0.5">{proj.link}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResumePreview;
