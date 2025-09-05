"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";

interface FloatingOrbProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "turquoise" | "cyan" | "teal" | "blue";
  delay?: number;
  duration?: number;
  className?: string;
}

const sizeClasses = {
  sm: "w-32 h-32",
  md: "w-48 h-48", 
  lg: "w-64 h-64",
  xl: "w-80 h-80"
};

const colorClasses = {
  turquoise: "bg-gradient-to-br from-turquoise-400/30 to-turquoise-600/20",
  cyan: "bg-gradient-to-br from-cyan-400/30 to-cyan-600/20", 
  teal: "bg-gradient-to-br from-teal-400/30 to-teal-600/20",
  blue: "bg-gradient-to-br from-blue-400/30 to-blue-600/20"
};

export function FloatingOrb({ 
  size = "md", 
  color = "turquoise", 
  delay = 0, 
  duration = 20,
  className = "" 
}: FloatingOrbProps) {
  const { theme } = useTheme();
  
  // Solo mostrar en modo claro
  if (theme === "dark") return null;

  return (
    <motion.div
      className={`
        ${sizeClasses[size]} 
        ${colorClasses[color]}
        rounded-full 
        blur-3xl 
        absolute 
        opacity-60
        ${className}
      `}
      animate={{
        x: [0, 100, -50, 0],
        y: [0, -80, 120, 0],
        scale: [1, 1.2, 0.8, 1],
        rotate: [0, 180, 360],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function FloatingOrbs() {
  const { theme } = useTheme();
  
  // Solo mostrar en modo claro
  if (theme === "dark") return null;

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Orbe grande principal */}
      <FloatingOrb
        size="xl"
        color="turquoise"
        delay={0}
        duration={25}
        className="top-1/4 left-1/4"
      />
      
      {/* Orbe mediano derecha */}
      <FloatingOrb
        size="lg"
        color="cyan"
        delay={5}
        duration={22}
        className="top-1/3 right-1/4"
      />
      
      {/* Orbe pequeño centro */}
      <FloatingOrb
        size="md"
        color="teal"
        delay={10}
        duration={18}
        className="top-2/3 left-1/2"
      />
      
      {/* Orbe mediano inferior izquierda */}
      <FloatingOrb
        size="lg"
        color="blue"
        delay={15}
        duration={24}
        className="bottom-1/4 left-1/6"
      />
      
      {/* Orbe pequeño superior derecha */}
      <FloatingOrb
        size="sm"
        color="turquoise"
        delay={8}
        duration={16}
        className="top-1/6 right-1/3"
      />
      
      {/* Orbe mediano centro derecha */}
      <FloatingOrb
        size="md"
        color="cyan"
        delay={12}
        duration={20}
        className="top-1/2 right-1/6"
      />
    </div>
  );
}