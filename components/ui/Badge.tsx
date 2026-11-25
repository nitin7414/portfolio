import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "subtle";
}

export function Badge({
  children,
  className = "",
  variant = "default",
  ...props
}: BadgeProps) {
  const base = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono tracking-tight font-medium border";
  
  const variants = {
    default: "bg-surface border-border text-text-muted",
    accent: "bg-accent-subtle border-accent/30 text-accent font-semibold",
    subtle: "bg-surface-subtle border-border-hover text-text",
  };

  return (
    <span className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </span>
  );
}
