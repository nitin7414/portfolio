import React from "react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { StatCounter } from "@/components/ui/StatCounter";
import { Chip } from "@/components/ui/Chip";
import { ExternalLink, Calendar, MapPin } from "lucide-react";

export function ExperienceSection() {
  const { experience } = portfolioData;

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case "Product development":
        return "accent";
      case "Open source":
        return "subtle";
      default:
        return "default";
    }
  };

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-24 py-16 sm:py-20 lg:py-24 border-b border-border"
    >
      <SectionHeading
        number="02"
        title="Experience & Impact"
        caption="Production systems shipped, open-source architectures maintained, and applied research milestones."
        id="experience-heading"
      />

      <div className="space-y-6 sm:space-y-8">
        {experience.map((item) => (
          <Card key={item.id} className="p-6 sm:p-8" hoverable>
            {/* Top row: Company, Role, Type Badge, Dates & Location */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-border">
              <div className="flex items-start gap-4">
                {/* Logo placeholder */}
                <div className="w-12 h-12 rounded-lg bg-surface-subtle border border-border flex items-center justify-center font-mono text-sm font-bold text-accent shrink-0">
                  {item.logoPlaceholder}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-mono text-lg sm:text-xl font-semibold text-text">
                      {item.role}
                    </h3>
                    <Badge variant={getTypeBadgeVariant(item.type)}>
                      {item.type}
                    </Badge>
                  </div>
                  <div className="mt-1 font-mono text-sm text-text font-medium">
                    {item.company}
                  </div>
                </div>
              </div>

              {/* Meta details */}
              <div className="flex sm:flex-col items-start sm:items-end gap-3 sm:gap-1 text-xs font-mono text-text-muted">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-text-muted" />
                  {item.dates}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-text-muted" />
                  {item.location}
                </span>
              </div>
            </div>

            {/* Middle row: 3 Stat Counters */}
            <div className="py-6 border-b border-border grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {item.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-md bg-surface-subtle border border-border/60"
                >
                  <StatCounter value={stat.value} label={stat.label} />
                </div>
              ))}
            </div>

            {/* Bottom row: Description, Tech Stack & Link chips */}
            <div className="pt-6 space-y-4">
              <p className="font-sans text-sm sm:text-base text-text-muted leading-relaxed">
                {item.description}
              </p>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5">
                  {item.skills.map((skill, sIdx) => (
                    <Chip key={sIdx}>{skill}</Chip>
                  ))}
                </div>

                {/* Link chips */}
                {item.links && item.links.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {item.links.map((link, lIdx) => (
                      <a
                        key={lIdx}
                        href={link.url}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono bg-surface border border-border hover:border-accent hover:text-accent transition-colors text-text"
                      >
                        <span>{link.label}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
