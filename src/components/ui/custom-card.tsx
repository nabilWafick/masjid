import { cn } from "@/lib/utils";
import React from "react";

// First, define the custom parameters in an interface
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outlined" | "elevated";
  size?: "sm" | "md" | "lg";
  noPadding?: boolean;
  borderColor?: string;
  // Add any other custom parameters you need
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "default",
      size = "md",
      noPadding = false,
      borderColor,
      ...props
    },
    ref
  ) => {
    // Define variant styles
    const variantStyles = {
      default: "bg-card",
      outlined: "border border-2",
      elevated: "shadow-lg",
    };

    // Define size styles
    const sizeStyles = {
      sm: "p-2",
      md: "p-4",
      lg: "p-6",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-lg text-card-foreground",
          variantStyles[variant],
          !noPadding && sizeStyles[size],
          borderColor && `border-[${borderColor}]`,
          className
        )}
        {...props}
      />
    );
  }
);

Card.displayName = "Card";
