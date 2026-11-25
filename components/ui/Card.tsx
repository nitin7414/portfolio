import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export function Card({
  children,
  className = "",
  hoverable = true,
  ...props
}: CardProps) {
  const hoverStyle = hoverable
    ? "hover:border-border-hover transition-colors duration-200"
    : "";

  return (
    <div
      className={`bg-surface border border-border rounded-lg p-5 sm:p-6 ${hoverStyle} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
