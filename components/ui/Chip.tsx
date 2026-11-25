import React from "react";

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  active?: boolean;
}

export function Chip({ children, className = "", active = false, ...props }: ChipProps) {
  const activeStyles = active
    ? "bg-accent-subtle border-accent/40 text-accent font-semibold"
    : "bg-surface-subtle border-border text-text-muted hover:border-border-hover hover:text-text";

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-xs font-mono rounded border transition-colors duration-150 ${activeStyles} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
