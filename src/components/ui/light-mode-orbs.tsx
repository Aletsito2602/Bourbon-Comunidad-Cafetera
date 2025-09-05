"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function LightModeOrbs() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // No renderizar nada hasta que esté montado (evita hydration mismatch)
  if (!mounted || theme === "dark") return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Fondo gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-turquoise-400/5 via-cyan-400/3 to-teal-400/5" />
      
      {/* Orbe principal grande */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-turquoise-400/20 to-turquoise-600/10 rounded-full blur-3xl animate-float-gentle" />
      
      {/* Orbe mediano derecha */}
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-cyan-400/15 to-cyan-600/8 rounded-full blur-3xl animate-float-reverse" />
      
      {/* Orbe pequeño centro */}
      <div className="absolute top-2/3 left-1/2 w-64 h-64 bg-gradient-to-br from-teal-400/12 to-teal-600/6 rounded-full blur-3xl animate-float-gentle delay-500" />
      
      {/* Orbe adicional inferior */}
      <div className="absolute bottom-1/4 right-1/6 w-72 h-72 bg-gradient-to-br from-turquoise-500/10 to-cyan-500/5 rounded-full blur-3xl animate-pulse-glow" />
      
      {/* Orbe pequeño superior */}
      <div className="absolute top-1/6 right-1/3 w-48 h-48 bg-gradient-to-br from-cyan-300/18 to-turquoise-500/8 rounded-full blur-3xl animate-float-reverse delay-1000" />
      
      {/* Efectos adicionales */}
      <div className="absolute top-1/2 left-1/6 w-56 h-56 bg-gradient-to-br from-teal-300/12 to-cyan-400/6 rounded-full blur-3xl animate-pulse-glow delay-2000" />
    </div>
  );
}