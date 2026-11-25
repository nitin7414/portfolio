"use client";

import React, { useEffect, useRef } from "react";
import { X, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface NavItem {
  id: string;
  number: string;
  label: string;
}

export interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
  activeId: string;
}

export function MobileNav({
  isOpen,
  onClose,
  navItems,
  activeId,
}: MobileNavProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const prevActiveElement = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }

      if (e.key === "Tab" && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const first = focusableElements[0];
        const last = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      prevActiveElement?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className="fixed inset-0 z-50 flex flex-col bg-background/95 backdrop-blur-md md:hidden"
    >
      <div
        ref={menuRef}
        className="flex flex-col h-full w-full max-w-md mx-auto p-6 overflow-y-auto"
      >
        {/* Header bar inside menu */}
        <div className="flex items-center justify-between pb-6 border-b border-border">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-semibold tracking-tight text-text">
              INDEX // MENU
            </span>
          </div>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close navigation menu"
            className="w-11 h-11 flex items-center justify-center rounded-md border border-border bg-surface text-text hover:border-border-hover min-w-[44px] min-h-[44px]"
          >
            <X className="w-5 h-5" strokeWidth={1.75} />
          </button>
        </div>

        {/* Navigation list */}
        <nav aria-label="Mobile index links" className="flex-1 py-8">
          <ul className="space-y-3">
            {navItems.map((item) => {
              const isActive = activeId === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={onClose}
                    className={`flex items-center justify-between p-3 rounded-lg border font-mono text-base transition-colors min-h-[44px] ${
                      isActive
                        ? "bg-accent-subtle border-accent/40 text-accent font-semibold"
                        : "bg-surface border-border text-text hover:border-border-hover hover:bg-surface-hover"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-text-muted">{item.number}</span>
                      <span>{item.label}</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-text-muted" strokeWidth={1.75} />
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer controls: theme toggle & status */}
        <div className="pt-6 border-t border-border flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-mono text-xs text-text-muted">Color Theme</span>
            <span className="font-mono text-[11px] text-text-dim">Tap to toggle appearance</span>
          </div>
          <div className="flex items-center gap-2">
            <ThemeToggle showLabel />
          </div>
        </div>
      </div>
    </div>
  );
}
