"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/functions";
import Container from "@/components/global/container";

export function ThemeAwareDashboardPreview() {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <Container delay={0.3}>
      <div className={cn(
        "relative mx-auto max-w-7xl rounded-[15px] border p-1 backdrop-blur-lg md:p-2 mt-12",
        // Estilos para modo oscuro (original)
        mounted && resolvedTheme === "dark" && [
          "border-neutral-200/50 border-neutral-700 bg-neutral-800/50"
        ],
        // Estilos mejorados para modo claro
        mounted && resolvedTheme === "light" && [
          "border-teal-100/60 bg-white/40 backdrop-blur-2xl",
          "shadow-[0_20px_64px_rgba(20,184,166,0.08),0_8px_24px_rgba(0,0,0,0.03)]"
        ]
      )}>
        <div className={cn(
          "absolute top-1/4 left-1/2 -z-10 w-3/4 h-1/4 -translate-x-1/2 -translate-y-1/2 inset-0 blur-[10rem]",
          mounted && resolvedTheme === "dark" && "gradient",
          mounted && resolvedTheme === "light" && "bg-gradient-to-r from-teal-400/20 via-cyan-400/30 to-turquoise-400/20"
        )}></div>

        <div className={cn(
          "rounded-[15px] border p-1",
          mounted && resolvedTheme === "dark" && "border-neutral-700 bg-black",
          mounted && resolvedTheme === "light" && [
            "border-teal-100/40 bg-white/60 backdrop-blur-xl",
            "shadow-inner"
          ]
        )}>
          <img
            src="/images/dashboardb.png"
            alt="dashboard Bourbon"
            className={cn(
              "w-full rounded-[15px]",
              theme === "light" && "opacity-90"
            )}
          />
        </div>
      </div>
    </Container>
  );
}