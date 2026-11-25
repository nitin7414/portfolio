import React from "react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { StatCounter } from "@/components/ui/StatCounter";
import { GitCommit, Star, GitFork, Flame } from "lucide-react";

export function ActivitySection() {
  const { githubActivity } = portfolioData;
  const { stats, heatmapLegend } = githubActivity;

  // Generate a deterministic 52-week x 7-day pattern
  // Each cell has an intensity level from 0 to 4
  const weeks = 48; // 48 weeks for responsive representation
  const daysPerWeek = 7;
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Deterministic PRNG-like pattern
  const grid = Array.from({ length: weeks }, (_, weekIdx) => {
    return Array.from({ length: daysPerWeek }, (_, dayIdx) => {
      // Deterministic calculation based on index
      const seed = (weekIdx * 13 + dayIdx * 7 + 19) % 100;
      if (seed < 22) return 0;
      if (seed < 55) return 1;
      if (seed < 80) return 2;
      if (seed < 93) return 3;
      return 4;
    });
  });

  const getCellClass = (level: number) => {
    switch (level) {
      case 0:
        return "bg-surface-subtle border border-border/50";
      case 1:
        return "bg-accent/25 border border-accent/30";
      case 2:
        return "bg-accent/50 border border-accent/55";
      case 3:
        return "bg-accent/75 border border-accent/80";
      case 4:
        return "bg-accent border border-accent";
      default:
        return "bg-surface-subtle border border-border/50";
    }
  };

  return (
    <section
      id="activity"
      aria-labelledby="activity-heading"
      className="scroll-mt-24 py-16 sm:py-20 lg:py-24 border-b border-border"
    >
      <SectionHeading
        number="04"
        title="Open Source & GitHub Activity"
        caption="Continuous code shipping cadence, contribution density, and repository metrics."
        id="activity-heading"
      />

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <Card className="p-4" hoverable>
          <div className="flex items-center gap-2 text-text-muted mb-2">
            <GitCommit className="w-4 h-4 text-accent" />
            <span className="font-mono text-xs">Total Commits</span>
          </div>
          <StatCounter value={stats.totalCommits} label="Past 12 months" />
        </Card>

        <Card className="p-4" hoverable>
          <div className="flex items-center gap-2 text-text-muted mb-2">
            <Star className="w-4 h-4 text-accent" />
            <span className="font-mono text-xs">Stars Earned</span>
          </div>
          <StatCounter value={stats.starsEarned} label="Across OSS repos" />
        </Card>

        <Card className="p-4" hoverable>
          <div className="flex items-center gap-2 text-text-muted mb-2">
            <GitFork className="w-4 h-4 text-accent" />
            <span className="font-mono text-xs">Repositories</span>
          </div>
          <StatCounter value={stats.totalRepos} label="Public & research" />
        </Card>

        <Card className="p-4" hoverable>
          <div className="flex items-center gap-2 text-text-muted mb-2">
            <Flame className="w-4 h-4 text-accent" />
            <span className="font-mono text-xs">Active Streak</span>
          </div>
          <StatCounter value={stats.activeStreak} label="Consecutive days" />
        </Card>
      </div>

      {/* Heatmap Card */}
      <Card className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-border">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold text-text uppercase">
              {"// Contribution Heatmap (365-day cadence)"}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-text-muted">
            <span>{heatmapLegend.less}</span>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-xs bg-surface-subtle border border-border/50"></span>
              <span className="w-3 h-3 rounded-xs bg-accent/25 border border-accent/30"></span>
              <span className="w-3 h-3 rounded-xs bg-accent/50 border border-accent/55"></span>
              <span className="w-3 h-3 rounded-xs bg-accent/75 border border-accent/80"></span>
              <span className="w-3 h-3 rounded-xs bg-accent border border-accent"></span>
            </div>
            <span>{heatmapLegend.more}</span>
          </div>
        </div>

        {/* Heatmap Container with self-contained horizontal scroll */}
        <div className="overflow-x-auto pb-3 pt-1">
          <div className="min-w-[700px] flex flex-col gap-1.5">
            {/* Months row */}
            <div className="grid grid-cols-12 text-[10px] font-mono text-text-muted pl-6 mb-1">
              {months.map((month) => (
                <span key={month} className="text-left">
                  {month}
                </span>
              ))}
            </div>

            {/* Grid rows */}
            <div className="flex items-center gap-2">
              {/* Day-of-week labels */}
              <div className="flex flex-col justify-between h-[96px] text-[9px] font-mono text-text-muted pr-1 select-none">
                <span>Mon</span>
                <span>Wed</span>
                <span>Fri</span>
              </div>

              {/* Grid of columns */}
              <div className="flex gap-1.5 flex-1">
                {grid.map((column, colIdx) => (
                  <div key={colIdx} className="flex flex-col gap-1.5">
                    {column.map((level, rowIdx) => (
                      <div
                        key={rowIdx}
                        className={`w-3 h-3 rounded-xs transition-colors ${getCellClass(level)}`}
                        title={`Week ${colIdx + 1}, Day ${rowIdx + 1}: Level ${level}`}
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-border flex items-center justify-between text-xs font-mono text-text-muted">
          <span>Deterministic commit record placeholder (no external API query)</span>
          <span className="text-accent">99.4% Commit consistency</span>
        </div>
      </Card>
    </section>
  );
}
