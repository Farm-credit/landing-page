import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface AppTextProps extends React.HTMLAttributes<HTMLElement> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "label";
  variant?: "display" | "heading1" | "heading2" | "heading3" | "body" | "bodySmall" | "caption";
  color?: "default" | "muted" | "primary" | "secondary";
}

export const AppText = forwardRef<HTMLElement, AppTextProps>(
  (
    {
      className,
      as: Component = "p",
      variant = "body",
      color = "default",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <Component
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ref={ref as any}
        className={cn(
          {
            "text-5xl font-bold tracking-tight": variant === "display",
            "text-4xl font-bold tracking-tight": variant === "heading1",
            "text-3xl font-semibold": variant === "heading2",
            "text-xl font-semibold": variant === "heading3",
            "text-base": variant === "body",
            "text-sm": variant === "bodySmall",
            "text-xs": variant === "caption",
            "text-grey-900": color === "default",
            "text-grey-600": color === "muted",
            "text-brand-600": color === "primary",
            "text-gold-500": color === "secondary",
          },
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

AppText.displayName = "AppText";