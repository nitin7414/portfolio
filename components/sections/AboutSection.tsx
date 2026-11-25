import React from "react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { Cpu, Layers, ShieldCheck } from "lucide-react";

export function AboutSection() {
  const { about } = portfolioData;

  const pillarIcons = [
    <Layers key="layers" className="w-5 h-5 text-accent" strokeWidth={1.75} />,
    <Cpu key="cpu" className="w-5 h-5 text-accent" strokeWidth={1.75} />,
    <ShieldCheck key="shield" className="w-5 h-5 text-accent" strokeWidth={1.75} />,
  ];

  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-24 py-16 sm:py-20 lg:py-24 border-b border-border"
    >
      <SectionHeading
        number="01"
        title="About & Engineering Philosophy"
        caption="Bridging theoretical machine learning research with low-latency distributed systems engineering."
        id="about-heading"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Narrative paragraphs */}
        <div className="lg:col-span-7 space-y-4 font-sans text-base text-text-muted leading-relaxed">
          <p className="font-mono text-base sm:text-lg text-text font-medium border-l-2 border-accent pl-4">
            {about.headline}
          </p>

          {about.paragraphs.map((p, index) => (
            <p key={index} className="text-text-muted">
              {p}
            </p>
          ))}
        </div>

        {/* Right Column: Core Pillars & Active Areas of Interest */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted">
              {"// Core Architectural Pillars"}
            </h3>
            {about.corePillars.map((pillar, idx) => (
              <Card key={idx} className="p-4" hoverable>
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-md bg-accent-subtle border border-accent/20 shrink-0 mt-0.5">
                    {pillarIcons[idx % pillarIcons.length]}
                  </div>
                  <div>
                    <h4 className="font-mono text-sm font-semibold text-text">
                      {pillar.title}
                    </h4>
                    <p className="font-sans text-xs sm:text-sm text-text-muted mt-1 leading-normal">
                      {pillar.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-3">
              {"// Active Explorations & Focus Areas"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {about.interests.map((interest, i) => (
                <Chip key={i} className="text-xs">
                  {interest}
                </Chip>
              ))}
            </div>
          </div>

          {about.spokenLanguages && (
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-text-muted mb-2.5">
                {"// Spoken Languages"}
              </h3>
              <div className="flex flex-wrap gap-2">
                {about.spokenLanguages.map((lang, lIdx) => (
                  <Chip key={lIdx} className="text-xs">
                    <span className="font-semibold text-text mr-1">{lang.language}</span>
                    <span className="text-text-muted">({lang.proficiency})</span>
                  </Chip>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
