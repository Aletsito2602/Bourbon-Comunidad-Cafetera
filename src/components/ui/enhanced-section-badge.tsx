"use client";

import { useTheme } from "next-themes";
import { cn } from "@/functions";

interface SectionBadgeProps {
  title: string;
  className?: string;
}

export function EnhancedSectionBadge({ title, className }: SectionBadgeProps) {
  const { theme } = useTheme();

  return (
    <div className={cn(
      "inline-flex items-center justify-center px-3 py-1 text-sm font-medium rounded-full border",
      // Estilos para modo oscuro (original)
      theme === "dark" && [
        "bg-background border-border text-foreground"
      ],
      // Estilos mejorados para modo claro
      theme === "light" && [
        "bg-gradient-to-r from-teal-50 to-cyan-50",
        "border-teal-200/60 text-teal-700",
        "backdrop-blur-sm shadow-sm",
        "hover:from-teal-100 hover:to-cyan-100",
        "hover:border-teal-300/60 transition-all duration-300"
      ],
      className
    )}>
      {title}
    </div>
  );
}