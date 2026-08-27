import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, label, ...props }, ref) => {
    return (
      <div className="relative">
        {label && <label className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</label>}
        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "flex h-10 w-full appearance-none rounded-lg border border-input bg-transparent px-3 py-2 pr-8 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
              className
            )}
            {...props}
          >
            {children}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>
    );
  }
);
Select.displayName = "Select";
