import React from "react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Chip } from "@/components/ui/Chip";
import { GraduationCap, Calendar, MapPin, Award } from "lucide-react";

export function EducationSection() {
  const { education } = portfolioData;

  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="scroll-mt-24 py-16 sm:py-20 lg:py-24 border-b border-border"
    >
      <SectionHeading
        number="05"
        title="Education & Academic Training"
        caption="Formal graduate and undergraduate foundations in computer systems, mathematics, and machine learning."
        id="education-heading"
      />

      <div className="space-y-6 sm:space-y-8">
        {education.map((item, idx) => (
          <Card key={idx} className="p-6 sm:p-8" hoverable>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-surface-subtle border border-border flex items-center justify-center font-mono text-accent shrink-0">
                  <GraduationCap className="w-6 h-6" strokeWidth={1.75} />
                </div>
                <div>
                  <h3 className="font-mono text-lg sm:text-xl font-semibold text-text">
                    {item.degree}
                  </h3>
                  <div className="mt-1 font-mono text-sm text-text font-medium flex flex-wrap items-center gap-2">
                    <span>{item.institution}</span>
                    <span className="text-border">•</span>
                    <Badge variant="subtle" className="text-[11px]">
                      {item.grade}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="flex sm:flex-col items-start sm:items-end gap-3 sm:gap-1 text-xs font-mono text-text-muted">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {item.years}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {item.location}
                </span>
              </div>
            </div>

            {item.honors && (
              <div className="py-4 border-b border-border flex items-center gap-2 text-xs font-mono text-accent">
                <Award className="w-4 h-4 shrink-0" />
                <span>{item.honors}</span>
              </div>
            )}

            <div className="pt-6">
              <h4 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-3">
                {"// Relevant Coursework & Focus Domains"}
              </h4>
              <div className="flex flex-wrap gap-2">
                {item.coursework.map((course, cIdx) => (
                  <Chip key={cIdx} className="text-xs">
                    {course}
                  </Chip>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
