"use client";

import { useTheme } from "next-themes";
import { cn } from "@/functions";

interface EnhancedTextProps extends React.HTMLAttributes<HTMLElement> {
  variant?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "small";
  gradient?: boolean;
  children: React.ReactNode;
}

export function EnhancedText({ 
  variant = "p", 
  gradient = false, 
  className, 
  children, 
  ...props 
}: EnhancedTextProps) {
  const { theme } = useTheme();
  
  const Component = variant as React.ElementType;
  
  const baseStyles = {
    h1: "text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight",
    h2: "text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight", 
    h3: "text-2xl md:text-3xl font-semibold tracking-tight",
    h4: "text-xl md:text-2xl font-medium tracking-tight",
    p: "text-base md:text-lg leading-relaxed",
    span: "text-base",
    small: "text-sm"
  };

  const lightModeStyles = {
    h1: "text-slate-900",
    h2: "text-slate-900", 
    h3: "text-slate-800",
    h4: "text-slate-800",
    p: "text-slate-700",
    span: "text-slate-700",
    small: "text-slate-600"
  };

  const gradientStyles = gradient && theme === "light" 
    ? "bg-gradient-to-br from-teal-600 via-slate-800 to-teal-700 bg-clip-text text-transparent"
    : gradient && theme === "dark" 
    ? "bg-gradient-to-br from-foreground to-foreground/60 bg-clip-text text-transparent"
    : "";

  return (
    <Component
      className={cn(
        baseStyles[variant],
        theme === "light" && !gradient && lightModeStyles[variant],
        gradientStyles,
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
}

// Componentes específicos para facilitar el uso
export function EnhancedHeading({ children, className, ...props }: Omit<EnhancedTextProps, 'variant'>) {
  return (
    <EnhancedText variant="h2" gradient className={className} {...props}>
      {children}
    </EnhancedText>
  );
}

export function EnhancedSubheading({ children, className, ...props }: Omit<EnhancedTextProps, 'variant'>) {
  return (
    <EnhancedText variant="h3" className={className} {...props}>
      {children}
    </EnhancedText>
  );
}

export function EnhancedParagraph({ children, className, ...props }: Omit<EnhancedTextProps, 'variant'>) {
  const { theme } = useTheme();
  
  return (
    <EnhancedText 
      variant="p" 
      className={cn(
        theme === "light" && "text-slate-600 leading-relaxed",
        className
      )} 
      {...props}
    >
      {children}
    </EnhancedText>
  );
}