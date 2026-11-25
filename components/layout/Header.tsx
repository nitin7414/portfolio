"use client";

import React, { useState, useEffect } from "react";
import { Menu } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { CommandPalette } from "./CommandPalette";
import { MobileNav } from "./MobileNav";
import { portfolioData } from "@/data/portfolio";

export const NAV_ITEMS = [
  { id: "about", number: "01", label: "About" },
  { id: "experience", number: "02", label: "Experience" },
  { id: "projects", number: "03", label: "Projects" },
  { id: "activity", number: "04", label: "Activity" },
  { id: "education", number: "05", label: "Education" },
  { id: "skills", number: "06", label: "Skills" },
  { id: "contact", number: "07", label: "Contact" },
];

export function Header() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const sectionIds = ["hero", ...NAV_ITEMS.map((item) => item.id)];
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        // Find visible section with highest intersection ratio or top closest to viewport top
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      }
    );

    sectionElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <a
          href="#hero"
          className="flex items-center gap-2 group cursor-pointer focus-visible:outline-2 focus-visible:outline-accent rounded-sm"
          aria-label={`${portfolioData.hero.name} - Return to top`}
        >
          <span className="w-8 h-8 rounded-md bg-surface border border-border flex items-center justify-center font-mono text-xs font-bold text-accent group-hover:border-accent transition-colors">
            {portfolioData.hero.avatarLabel}
          </span>
          <span className="font-mono text-sm font-semibold tracking-tight text-text hidden sm:inline">
            {portfolioData.hero.name}
          </span>
        </a>

        {/* Desktop Index Navigation */}
        <nav aria-label="Index navigation" className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`px-2.5 py-1.5 rounded-md font-mono text-xs transition-colors duration-150 flex items-center gap-1.5 ${
                  isActive
                    ? "text-accent bg-accent-subtle font-medium border border-accent/30"
                    : "text-text-muted hover:text-text hover:bg-surface border border-transparent"
                }`}
              >
                <span className="text-[10px] text-text-muted">{item.number}</span>
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right side controls: Command palette + Theme toggle + Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          <CommandPalette />
          <ThemeToggle />

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open mobile navigation menu"
            className="w-11 h-11 flex lg:hidden items-center justify-center rounded-md border border-border bg-surface text-text-muted hover:text-text hover:border-border-hover min-w-[44px] min-h-[44px]"
          >
            <Menu className="w-5 h-5" strokeWidth={1.75} />
          </button>
        </div>
      </div>

      <MobileNav
        isOpen={mobileNavOpen}
        onClose={() => setMobileNavOpen(false)}
        navItems={NAV_ITEMS}
        activeId={activeSection}
      />
    </header>
  );
}
