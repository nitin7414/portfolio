"use client";

import React, { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";
import {
  ThemeMode,
  ResolvedTheme,
  getActiveResolvedTheme,
  getSavedThemeMode,
  setThemeWithTransition,
} from "@/lib/theme";

function subscribeToTheme(callback: () => void) {
  window.addEventListener("theme-change", callback);
  return () => window.removeEventListener("theme-change", callback);
}

function getThemeSnapshot(): ResolvedTheme {
  return getActiveResolvedTheme();
}

function getServerSnapshot(): ResolvedTheme {
  return "dark";
}

function getModeSnapshot(): ThemeMode {
  return getSavedThemeMode();
}

function getServerModeSnapshot(): ThemeMode {
  return "dark";
}

const emptySubscribe = () => () => {};

export interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

export function ThemeToggle({ className = "", showLabel = false }: ThemeToggleProps) {
  const isMounted = useSyncExternalStore(emptySubscribe, () => true, () => false);
  const resolved = useSyncExternalStore(subscribeToTheme, getThemeSnapshot, getServerSnapshot);
  const mode = useSyncExternalStore(subscribeToTheme, getModeSnapshot, getServerModeSnapshot);

  const handleToggleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextMode: ThemeMode = resolved === "dark" ? "light" : "dark";
    const rect = e.currentTarget.getBoundingClientRect();
    const origin = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };

    setThemeWithTransition(nextMode, origin);
  };

  if (!isMounted) {
    return (
      <button
        type="button"
        data-theme-toggle
        aria-label="Toggle color theme"
        className={`w-11 h-11 flex items-center justify-center rounded-md border border-border bg-surface text-text-muted hover:border-border-hover transition-colors min-w-[44px] min-h-[44px] ${className}`}
        disabled
      >
        <Moon className="w-4 h-4 text-text-muted" strokeWidth={1.75} />
      </button>
    );
  }

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        data-theme-toggle
        onClick={handleToggleClick}
        aria-label={`Current theme is ${mode} (${resolved}). Click to switch to ${
          resolved === "dark" ? "light" : "dark"
        } theme`}
        aria-pressed={resolved === "dark"}
        className={`relative w-11 h-11 flex items-center justify-center rounded-md border border-border bg-surface text-text hover:border-border-hover hover:bg-surface-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent transition-colors min-w-[44px] min-h-[44px] cursor-pointer ${className}`}
      >
        <div className="relative w-4 h-4 overflow-hidden flex items-center justify-center">
          <Moon
            className={`w-4 h-4 absolute transition-all duration-300 ${
              resolved === "dark"
                ? "rotate-0 scale-100 opacity-100 text-accent"
                : "-rotate-90 scale-0 opacity-0"
            }`}
            strokeWidth={1.75}
          />
          <Sun
            className={`w-4 h-4 absolute transition-all duration-300 ${
              resolved === "light"
                ? "rotate-0 scale-100 opacity-100 text-accent"
                : "rotate-90 scale-0 opacity-0"
            }`}
            strokeWidth={1.75}
          />
        </div>
      </button>

      {showLabel && (
        <span className="ml-2 font-mono text-xs text-text-muted capitalize">
          {mode}
        </span>
      )}
    </div>
  );
}
