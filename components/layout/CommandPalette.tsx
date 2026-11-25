"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Search,
  Compass,
  Copy,
  ExternalLink,
  Moon,
  Sun,
  Monitor,
  Check,
  CornerDownLeft,
  X,
} from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { setThemeWithTransition, ThemeMode } from "@/lib/theme";

interface CommandItem {
  id: string;
  group: "Navigation" | "Actions" | "Theme";
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  perform: () => void;
  keywords?: string[];
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const closePalette = () => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(0);
  };

  const openPalette = () => {
    setQuery("");
    setSelectedIndex(0);
    setIsOpen(true);
  };

  const navigateTo = (anchorId: string) => {
    closePalette();
    const element = document.getElementById(anchorId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(portfolioData.hero.email).then(() => {
      setCopiedEmail(true);
      setTimeout(() => {
        setCopiedEmail(false);
        closePalette();
      }, 900);
    });
  };

  const handleSetTheme = (mode: ThemeMode) => {
    setThemeWithTransition(mode);
    closePalette();
  };

  const commands: CommandItem[] = [
    // Navigation
    {
      id: "nav-hero",
      group: "Navigation",
      title: "Home / Hero",
      subtitle: "Overview, bio & socials",
      icon: <Compass className="w-4 h-4 text-text-muted" strokeWidth={1.75} />,
      perform: () => navigateTo("hero"),
      keywords: ["hero", "home", "start", "top", "intro"],
    },
    {
      id: "nav-about",
      group: "Navigation",
      title: "About",
      subtitle: "Background, pillars & technical focus",
      icon: <Compass className="w-4 h-4 text-text-muted" strokeWidth={1.75} />,
      perform: () => navigateTo("about"),
      keywords: ["about", "bio", "experience", "direction"],
    },
    {
      id: "nav-experience",
      group: "Navigation",
      title: "Experience",
      subtitle: "Roles, achievements & metrics",
      icon: <Compass className="w-4 h-4 text-text-muted" strokeWidth={1.75} />,
      perform: () => navigateTo("experience"),
      keywords: ["experience", "work", "jobs", "roles", "history"],
    },
    {
      id: "nav-projects",
      group: "Navigation",
      title: "Projects",
      subtitle: "Featured production builds & open source",
      icon: <Compass className="w-4 h-4 text-text-muted" strokeWidth={1.75} />,
      perform: () => navigateTo("projects"),
      keywords: ["projects", "builds", "software", "code", "portfolio"],
    },
    {
      id: "nav-activity",
      group: "Navigation",
      title: "GitHub Activity",
      subtitle: "Contribution heatmap & stats",
      icon: <Compass className="w-4 h-4 text-text-muted" strokeWidth={1.75} />,
      perform: () => navigateTo("activity"),
      keywords: ["github", "activity", "heatmap", "contributions", "commits"],
    },
    {
      id: "nav-education",
      group: "Navigation",
      title: "Education",
      subtitle: "Academic degrees & honors",
      icon: <Compass className="w-4 h-4 text-text-muted" strokeWidth={1.75} />,
      perform: () => navigateTo("education"),
      keywords: ["education", "degree", "university", "college", "school"],
    },
    {
      id: "nav-skills",
      group: "Navigation",
      title: "Technical Skills",
      subtitle: "AI/ML, languages, infrastructure & tools",
      icon: <Compass className="w-4 h-4 text-text-muted" strokeWidth={1.75} />,
      perform: () => navigateTo("skills"),
      keywords: ["skills", "stack", "technologies", "languages", "tools"],
    },
    {
      id: "nav-contact",
      group: "Navigation",
      title: "Contact",
      subtitle: "Direct email & external links",
      icon: <Compass className="w-4 h-4 text-text-muted" strokeWidth={1.75} />,
      perform: () => navigateTo("contact"),
      keywords: ["contact", "email", "reach", "message", "hire"],
    },
    // Actions
    {
      id: "action-copy-email",
      group: "Actions",
      title: copiedEmail ? "Email Copied to Clipboard!" : "Copy Email Address",
      subtitle: portfolioData.hero.email,
      icon: copiedEmail ? (
        <Check className="w-4 h-4 text-accent" strokeWidth={2} />
      ) : (
        <Copy className="w-4 h-4 text-text-muted" strokeWidth={1.75} />
      ),
      perform: copyEmail,
      keywords: ["email", "copy", "clipboard", "mail", "contact"],
    },
    {
      id: "action-github",
      group: "Actions",
      title: "Open GitHub Profile",
      subtitle: portfolioData.hero.socials.github,
      icon: <ExternalLink className="w-4 h-4 text-text-muted" strokeWidth={1.75} />,
      perform: () => {
        window.open(portfolioData.hero.socials.github, "_blank", "noopener,noreferrer");
        closePalette();
      },
      keywords: ["github", "repo", "git"],
    },
    {
      id: "action-linkedin",
      group: "Actions",
      title: "Open LinkedIn Profile",
      subtitle: portfolioData.hero.socials.linkedin,
      icon: <ExternalLink className="w-4 h-4 text-text-muted" strokeWidth={1.75} />,
      perform: () => {
        window.open(portfolioData.hero.socials.linkedin, "_blank", "noopener,noreferrer");
        closePalette();
      },
      keywords: ["linkedin", "social", "network"],
    },
    // Theme
    {
      id: "theme-toggle",
      group: "Theme",
      title: "Toggle Theme",
      subtitle: "Cycle between Dark and Light mode",
      icon: <Sun className="w-4 h-4 text-text-muted" strokeWidth={1.75} />,
      perform: () => {
        const current = document.documentElement.getAttribute("data-theme");
        handleSetTheme(current === "dark" ? "light" : "dark");
      },
      keywords: ["theme", "toggle", "switch", "dark", "light"],
    },
    {
      id: "theme-dark",
      group: "Theme",
      title: "Set Dark Mode",
      subtitle: "Deep charcoal palette (#0A0A0B)",
      icon: <Moon className="w-4 h-4 text-text-muted" strokeWidth={1.75} />,
      perform: () => handleSetTheme("dark"),
      keywords: ["dark", "black", "night", "theme"],
    },
    {
      id: "theme-light",
      group: "Theme",
      title: "Set Light Mode",
      subtitle: "Clean high-contrast palette (#FFFFFF)",
      icon: <Sun className="w-4 h-4 text-text-muted" strokeWidth={1.75} />,
      perform: () => handleSetTheme("light"),
      keywords: ["light", "white", "day", "theme"],
    },
    {
      id: "theme-system",
      group: "Theme",
      title: "Set System Mode",
      subtitle: "Match device OS appearance",
      icon: <Monitor className="w-4 h-4 text-text-muted" strokeWidth={1.75} />,
      perform: () => handleSetTheme("system"),
      keywords: ["system", "os", "auto", "theme"],
    },
  ];

  // Filter commands by search query
  const filteredCommands = commands.filter((cmd) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    const titleMatch = cmd.title.toLowerCase().includes(q);
    const subtitleMatch = cmd.subtitle?.toLowerCase().includes(q);
    const groupMatch = cmd.group.toLowerCase().includes(q);
    const keywordMatch = cmd.keywords?.some((k) => k.toLowerCase().includes(q));
    return titleMatch || subtitleMatch || groupMatch || keywordMatch;
  });

  // Global keyboard shortcuts (Ctrl+K, Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => {
          if (!prev) {
            setQuery("");
            setSelectedIndex(0);
          }
          return !prev;
        });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Keyboard navigation inside open palette
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const prevActiveElement = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closePalette();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filteredCommands.length > 0 ? (prev + 1) % filteredCommands.length : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          filteredCommands.length > 0
            ? (prev - 1 + filteredCommands.length) % filteredCommands.length
            : 0
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].perform();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      prevActiveElement?.focus();
    };
  }, [isOpen, filteredCommands, selectedIndex]);

  // Keep selected item scrolled into view
  useEffect(() => {
    if (!listRef.current) return;
    const selectedElement = listRef.current.querySelector<HTMLElement>(
      `[data-command-index="${selectedIndex}"]`
    );
    if (selectedElement) {
      selectedElement.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  // Group filtered items
  const groupedItems = filteredCommands.reduce<Record<string, CommandItem[]>>(
    (acc, item) => {
      acc[item.group] = acc[item.group] || [];
      acc[item.group].push(item);
      return acc;
    },
    {}
  );

  return (
    <>
      {/* Visible Trigger Button for mouse and touch users */}
      <button
        type="button"
        onClick={openPalette}
        aria-label="Open command palette (Press Cmd+K or Ctrl+K)"
        className="h-11 px-3 sm:px-3.5 flex items-center gap-2 rounded-md border border-border bg-surface text-text-muted hover:border-border-hover hover:text-text hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-colors min-h-[44px] cursor-pointer"
      >
        <Search className="w-4 h-4 text-text-muted" strokeWidth={1.75} />
        <span className="hidden sm:inline font-mono text-xs">Search...</span>
        <kbd className="inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono bg-surface-subtle border border-border rounded text-text-muted font-medium">
          <span className="text-[11px]">⌘</span>K
        </kbd>
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Command Palette"
          className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-background/80 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closePalette();
            }
          }}
        >
          <div className="relative w-full max-w-xl bg-surface border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in fade-in zoom-in-95 duration-150">
            {/* Input Bar */}
            <div className="flex items-center px-4 py-3 border-b border-border bg-surface">
              <Search className="w-4 h-4 text-text-muted mr-3 shrink-0" strokeWidth={1.75} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Type a command or search sections..."
                aria-autocomplete="list"
                className="w-full bg-transparent font-mono text-sm text-text placeholder:text-text-muted focus:outline-none"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => {
                    setQuery("");
                    setSelectedIndex(0);
                  }}
                  className="p-1 text-text-muted hover:text-text"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <kbd className="hidden sm:inline-flex ml-2 px-1.5 py-0.5 text-[10px] font-mono bg-surface-subtle border border-border rounded text-text-muted">
                ESC
              </kbd>
            </div>

            {/* List of Results */}
            <div
              ref={listRef}
              role="listbox"
              className="overflow-y-auto p-2 divide-y divide-border/50 divide-dashed"
            >
              {filteredCommands.length === 0 ? (
                <div className="py-12 text-center text-sm font-mono text-text-muted">
                  No matching commands found.
                </div>
              ) : (
                Object.entries(groupedItems).map(([groupName, items]) => (
                  <div key={groupName} className="py-2 first:pt-1 last:pb-1">
                    <div className="px-3 py-1 text-[11px] font-mono font-medium tracking-wider text-text-muted uppercase">
                      {groupName}
                    </div>
                    <div className="mt-1 space-y-0.5">
                      {items.map((cmd) => {
                        const globalIndex = filteredCommands.findIndex((c) => c.id === cmd.id);
                        const isSelected = globalIndex === selectedIndex;
                        return (
                          <div
                            key={cmd.id}
                            role="option"
                            aria-selected={isSelected}
                            data-command-index={globalIndex}
                            onClick={() => cmd.perform()}
                            onMouseEnter={() => setSelectedIndex(globalIndex)}
                            className={`flex items-center justify-between px-3 py-2.5 rounded-md cursor-pointer transition-colors ${
                              isSelected
                                ? "bg-accent-subtle text-accent border border-accent/30 font-medium"
                                : "text-text hover:bg-surface-hover"
                            }`}
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <span className={isSelected ? "text-accent" : "text-text-muted"}>
                                {cmd.icon}
                              </span>
                              <div className="truncate">
                                <span className="font-mono text-xs sm:text-sm block truncate">
                                  {cmd.title}
                                </span>
                                {cmd.subtitle && (
                                  <span className="font-mono text-[11px] text-text-muted block truncate mt-0.5">
                                    {cmd.subtitle}
                                  </span>
                                )}
                              </div>
                            </div>
                            {isSelected && (
                              <CornerDownLeft className="w-3.5 h-3.5 text-accent shrink-0 ml-2" strokeWidth={1.75} />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer hints */}
            <div className="px-4 py-2 border-t border-border bg-surface-subtle flex items-center justify-between text-[11px] font-mono text-text-muted">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-1">
                  <kbd className="px-1 bg-surface border border-border rounded text-[10px]">↑</kbd>
                  <kbd className="px-1 bg-surface border border-border rounded text-[10px]">↓</kbd>
                  navigate
                </span>
                <span className="inline-flex items-center gap-1">
                  <kbd className="px-1 bg-surface border border-border rounded text-[10px]">↵</kbd>
                  select
                </span>
              </div>
              <div>
                <span className="text-accent font-semibold">{filteredCommands.length}</span> commands
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
