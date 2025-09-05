"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { useTheme } from "next-themes";
import { cn } from "@/functions";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        white: "",
        tertiary: "",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    const { theme } = useTheme();

    // Estilos específicos para cada variante en modo claro
    const lightModeStyles = {
      default: theme === "light" ? [
        "bg-gradient-to-br from-teal-500 to-teal-600 text-white",
        "hover:from-teal-600 hover:to-teal-700 hover:shadow-lg hover:shadow-teal-500/25",
        "active:scale-95 shadow-md shadow-teal-500/20",
      ] : "bg-primary text-primary-foreground hover:bg-primary/90",
      
      white: theme === "light" ? [
        "bg-white/90 text-teal-700 border border-teal-100 backdrop-blur-sm",
        "hover:bg-white hover:shadow-lg hover:shadow-teal-500/10",
        "hover:border-teal-200 active:scale-95",
      ] : "bg-white text-black hover:bg-white/90",
      
      tertiary: theme === "light" ? [
        "bg-teal-50/80 text-teal-700 border border-teal-100/60 backdrop-blur-sm",
        "hover:bg-teal-100/80 hover:border-teal-200/80",
        "active:scale-95",
      ] : "bg-muted text-muted-foreground hover:bg-muted/80",

      outline: theme === "light" ? [
        "border-teal-200 text-teal-700 bg-white/50 backdrop-blur-sm",
        "hover:bg-teal-50 hover:border-teal-300",
      ] : "",

      ghost: theme === "light" ? [
        "text-slate-600 hover:bg-teal-50/80 hover:text-teal-700",
      ] : "",
    };

    const getVariantStyles = (variant: string | null | undefined) => {
      if (!variant || !lightModeStyles[variant as keyof typeof lightModeStyles]) {
        return lightModeStyles.default;
      }
      return lightModeStyles[variant as keyof typeof lightModeStyles];
    };

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size }),
          getVariantStyles(variant),
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };