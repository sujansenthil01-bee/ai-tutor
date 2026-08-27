import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost" | "outline" | "destructive";
  size?: "sm" | "md" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 active:scale-95",
          {
            "bg-primary text-primary-foreground hover:bg-primary/90": variant === "default",
            "hover:bg-accent hover:text-accent-foreground": variant === "ghost",
            "border border-input bg-transparent hover:bg-accent": variant === "outline",
            "bg-destructive text-destructive-foreground hover:bg-destructive/90": variant === "destructive",
            "h-8 px-3 text-sm": size === "sm",
            "h-10 px-4 py-2": size === "md",
            "h-11 px-6": size === "lg",
            "h-9 w-9": size === "icon",
          },
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
