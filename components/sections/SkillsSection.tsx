import React from "react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import {
  BrainCircuit,
  Cpu,
  Code2,
  Layout,
  Server,
  Database,
  Wrench,
} from "lucide-react";

export function SkillsSection() {
  const { skillGroups } = portfolioData;

  const categoryIcons: Record<string, React.ReactNode> = {
    "AI / Machine Learning": <BrainCircuit className="w-5 h-5 text-accent" strokeWidth={1.75} />,
    "LLMs, RAG & Agents": <Cpu className="w-5 h-5 text-accent" strokeWidth={1.75} />,
    "Programming Languages": <Code2 className="w-5 h-5 text-accent" strokeWidth={1.75} />,
    "Frontend & Full-Stack": <Layout className="w-5 h-5 text-accent" strokeWidth={1.75} />,
    "Backend & Distributed Systems": <Server className="w-5 h-5 text-accent" strokeWidth={1.75} />,
    "Databases & Storage": <Database className="w-5 h-5 text-accent" strokeWidth={1.75} />,
    "DevOps, Cloud & Tooling": <Wrench className="w-5 h-5 text-accent" strokeWidth={1.75} />,
  };

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="scroll-mt-24 py-16 sm:py-20 lg:py-24 border-b border-border"
    >
      <SectionHeading
        number="06"
        title="Technical Skills & Core Stack"
        caption="Domain competencies categorized across intelligence layers, programming runtimes, and cloud operations."
        id="skills-heading"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillGroups.map((group, idx) => (
          <Card key={idx} className="p-6 flex flex-col justify-between" hoverable>
            <div>
              <div className="flex items-center gap-3 pb-3 border-b border-border">
                <div className="p-2 rounded-md bg-accent-subtle border border-accent/20">
                  {categoryIcons[group.category] || (
                    <Code2 className="w-5 h-5 text-accent" strokeWidth={1.75} />
                  )}
                </div>
                <div>
                  <h3 className="font-mono text-base font-semibold text-text">
                    {group.category}
                  </h3>
                  <p className="font-sans text-xs text-text-muted mt-0.5">
                    {group.description}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {group.skills.map((skill, sIdx) => (
                  <Chip key={sIdx} className="text-xs">
                    {skill}
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
