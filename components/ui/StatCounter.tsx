import React from "react";

export interface StatCounterProps {
  value: string;
  label: string;
  className?: string;
}

export function StatCounter({ value, label, className = "" }: StatCounterProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <span className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-text">
        {value}
      </span>
      <span className="font-mono text-xs text-text-muted mt-0.5 tracking-normal">
        {label}
      </span>
    </div>
  );
}
