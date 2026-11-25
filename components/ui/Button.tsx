import React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "secondary", size = "md", children, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-mono text-sm tracking-tight transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-50 disabled:pointer-events-none cursor-pointer rounded-md select-none";

    const sizeStyles = {
      sm: "h-9 px-3 text-xs min-h-[44px] min-w-[44px] sm:min-h-[36px]",
      md: "h-11 px-4 text-sm min-h-[44px]",
      lg: "h-12 px-6 text-base min-h-[48px]",
    };

    const variantStyles = {
      primary:
        "bg-accent text-accent-contrast font-medium hover:opacity-95 active:translate-y-[1px]",
      secondary:
        "bg-surface border border-border text-text hover:border-border-hover hover:bg-surface-hover active:translate-y-[1px]",
      outline:
        "bg-transparent border border-border text-text hover:border-border-hover hover:bg-surface active:translate-y-[1px]",
      ghost:
        "bg-transparent text-text-muted hover:text-text hover:bg-surface active:translate-y-[1px]",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
