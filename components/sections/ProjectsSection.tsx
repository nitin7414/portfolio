"use client";

import React, { useState } from "react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Chip } from "@/components/ui/Chip";
import { ExternalLink, GitBranch, ChevronDown, ChevronUp, Layers, Terminal } from "lucide-react";

export function ProjectsSection() {
  const { projects, compactProjects } = portfolioData;
  const [showMore, setShowMore] = useState(false);

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="scroll-mt-24 py-16 sm:py-20 lg:py-24 border-b border-border"
    >
      <SectionHeading
        number="03"
        title="Featured Systems & Projects"
        caption="Selected deep-tech architectures, low-latency retrieval engines, and open-source tooling."
        id="projects-heading"
      />

      {/* 4 Featured Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {projects.map((project) => (
          <Card
            key={project.id}
            className="flex flex-col justify-between h-full p-6 sm:p-7 group"
            hoverable
          >
            <div>
              {/* Card Header: Number + Type Badge */}
              <div className="flex items-center justify-between pb-4 border-b border-border">
                <span className="font-mono text-2xl font-bold tracking-tight text-accent">
                  {project.number}
                </span>
                <Badge variant="subtle" className="text-[11px]">
                  {project.type}
                </Badge>
              </div>

              {/* Thumbnail Placeholder */}
              <div className="mt-4 mb-5 rounded-lg bg-surface-subtle border border-border/80 h-36 flex flex-col items-center justify-center p-4 text-center group-hover:border-border-hover transition-colors">
                <Terminal className="w-6 h-6 text-accent mb-2" strokeWidth={1.75} />
                <span className="font-mono text-xs text-text font-medium">
                  {project.thumbnailLabel}
                </span>
                {project.metrics && (
                  <span className="mt-1 font-mono text-[11px] text-accent font-semibold">
                    {project.metrics}
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <h3 className="font-mono text-lg sm:text-xl font-bold text-text group-hover:text-accent transition-colors">
                {project.title}
              </h3>

              <p className="mt-1 font-mono text-xs text-text font-medium">
                {project.tagline}
              </p>

              <p className="mt-3 font-sans text-sm text-text-muted line-clamp-2 leading-relaxed">
                {project.description}
              </p>

              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.map((tag, tIdx) => (
                  <Chip key={tIdx} className="text-[11px]">
                    {tag}
                  </Chip>
                ))}
              </div>
            </div>

            {/* Links Footer */}
            <div className="mt-6 pt-4 border-t border-border flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-text hover:text-accent transition-colors py-1 font-medium"
                  >
                    <span>Live Architecture</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
                {project.codeUrl && (
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-text-muted hover:text-text transition-colors py-1"
                  >
                    <span>Code</span>
                    <GitBranch className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {project.detailsUrl && (
                <a
                  href={project.detailsUrl}
                  className="text-text-muted hover:text-accent transition-colors"
                >
                  Specs →
                </a>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Collapsible "More builds" section */}
      <div className="mt-10 sm:mt-12">
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-accent" strokeWidth={1.75} />
            <h3 className="font-mono text-sm font-semibold tracking-tight text-text uppercase">
              {"// Extended Repository & Compact Builds"}
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setShowMore(!showMore)}
            aria-expanded={showMore}
            className="inline-flex items-center gap-1.5 font-mono text-xs text-text hover:text-accent transition-colors py-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-accent"
          >
            <span>{showMore ? "Collapse list" : `Show ${compactProjects.length} more builds`}</span>
            {showMore ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        {showMore && (
          <div className="mt-4 divide-y divide-border border border-border rounded-lg bg-surface overflow-hidden animate-in fade-in duration-200">
            {compactProjects.map((item) => (
              <div
                key={item.id}
                className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-surface-hover transition-colors"
              >
                <div className="flex items-start gap-4">
                  <span className="font-mono text-sm font-bold text-accent shrink-0 pt-0.5">
                    {item.number}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="font-mono text-sm sm:text-base font-semibold text-text">
                        {item.title}
                      </h4>
                      <Badge variant="default" className="text-[10px]">
                        {item.type}
                      </Badge>
                      {item.metrics && (
                        <span className="font-mono text-xs text-accent">
                          {item.metrics}
                        </span>
                      )}
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-text-muted mt-1 max-w-2xl">
                      {item.description}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {item.tags.map((tag, tIdx) => (
                        <Chip key={tIdx} className="text-[10px]">
                          {tag}
                        </Chip>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0 self-end md:self-center font-mono text-xs">
                  {item.liveUrl && (
                    <a
                      href={item.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text hover:text-accent flex items-center gap-1"
                    >
                      Demo <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {item.codeUrl && (
                    <a
                      href={item.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-muted hover:text-text flex items-center gap-1"
                    >
                      Code <GitBranch className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
