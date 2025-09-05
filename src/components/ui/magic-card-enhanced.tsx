"use client";

import { useTheme } from "next-themes";
import { cn } from "@/functions";
import { Particles } from "@/components/ui/particles";

interface MagicCardProps extends React.HTMLAttributes<HTMLDivElement> {
  particles?: boolean;
  children: React.ReactNode;
}

export default function MagicCardEnhanced({
  children,
  className,
  particles = false,
  ...props
}: MagicCardProps) {
  const { theme } = useTheme();

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border p-2",
        // Estilos para modo oscuro (original)
        theme === "dark" && [
          "bg-gradient-to-br from-neutral-900/50 to-neutral-800/50",
          "border-neutral-800",
          "hover:border-neutral-700",
        ],
        // Estilos mejorados para modo claro
        theme === "light" && [
          "bg-gradient-to-br from-white/95 to-white/85",
          "border-teal-100/60 backdrop-blur-2xl",
          "hover:border-teal-200/80",
          "shadow-[0_8px_32px_rgba(20,184,166,0.08),0_4px_16px_rgba(0,0,0,0.02)]",
          "hover:shadow-[0_16px_48px_rgba(20,184,166,0.12),0_8px_24px_rgba(0,0,0,0.04)]",
          "before:absolute before:inset-0 before:rounded-xl",
          "before:bg-gradient-to-br before:from-teal-50/50 before:to-transparent before:opacity-0",
          "hover:before:opacity-100 before:transition-opacity before:duration-300",
        ],
        "transition-all duration-300",
        className
      )}
      {...props}
    >
      {/* Efecto de brillo sutil para modo claro */}
      {theme === "light" && (
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-teal-50/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      )}
      
      <div className="relative z-10 size-full">
        {children}
      </div>
      
      {particles && (
        <Particles
          className="absolute inset-0"
          quantity={50}
          ease={70}
          color={theme === "light" ? "#14b8a6" : "#ffffff"}
          refresh
        />
      )}
    </div>
  );
}