"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top of page"
      className="fixed bottom-22 right-6 z-30 w-11 h-11 flex items-center justify-center rounded-md border border-border bg-surface text-text-muted hover:text-accent hover:border-accent hover:bg-surface-hover shadow-lg transition-all duration-200 cursor-pointer min-w-[44px] min-h-[44px]"
    >
      <ArrowUp className="w-4 h-4" strokeWidth={2} />
    </button>
  );
}
