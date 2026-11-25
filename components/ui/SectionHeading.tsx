import React from "react";

export interface SectionHeadingProps {
  number: string;
  title: string;
  caption?: string;
  id?: string;
  className?: string;
}

export function SectionHeading({
  number,
  title,
  caption,
  id,
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={`mb-8 sm:mb-12 ${className}`}>
      <div className="flex items-center gap-2 text-xs font-mono text-text-muted mb-2 tracking-wider uppercase">
        <span className="text-accent">{number}</span>
        <span className="text-border">/</span>
        <span>INDEX</span>
      </div>
      <h2
        id={id}
        className="font-mono text-2xl sm:text-3xl font-semibold tracking-tight text-text"
      >
        {title}
      </h2>
      {caption && (
        <p className="mt-2 text-sm sm:text-base text-text-muted max-w-2xl font-sans">
          {caption}
        </p>
      )}
    </div>
  );
}
