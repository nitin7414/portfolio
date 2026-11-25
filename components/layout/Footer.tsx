import React from "react";
import { portfolioData } from "@/data/portfolio";

export function Footer() {
  const currentYear = 2026;

  return (
    <footer className="w-full border-t border-border bg-surface py-12">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-text-muted">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-center sm:text-left">
          <span className="text-text font-medium">
            © {currentYear} {portfolioData.hero.name}
          </span>
          <span className="hidden sm:inline text-border">/</span>
          <span>Designed & built with Next.js & Tailwind CSS</span>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="#hero"
            className="text-text-muted hover:text-accent transition-colors"
          >
            ↑ Back to top
          </a>
          <span className="text-border">/</span>
          <span className="inline-flex items-center gap-1.5 text-accent">
            <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block"></span>
            All systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}
