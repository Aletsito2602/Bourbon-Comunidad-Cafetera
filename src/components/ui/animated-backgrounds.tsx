"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface BackgroundProps {
  className?: string;
}

export const DotGridBackground = ({ className }: BackgroundProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${
            isDark ? "rgba(255, 255, 255, 0.15)" : "rgba(0, 0, 0, 0.08)"
          } 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle, ${
            isDark ? "rgba(139, 92, 246, 0.4)" : "rgba(139, 92, 246, 0.15)"
          } 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "40px 40px"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export const GridMotionBackground = ({ className }: BackgroundProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)"} 1px, transparent 1px),
            linear-gradient(90deg, ${isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(0, 0, 0, 0.06)"} 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "30px 30px"],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(${isDark ? "rgba(139, 92, 246, 0.15)" : "rgba(139, 92, 246, 0.08)"} 1px, transparent 1px),
            linear-gradient(90deg, ${isDark ? "rgba(139, 92, 246, 0.15)" : "rgba(139, 92, 246, 0.08)"} 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
        animate={{
          backgroundPosition: ["0px 0px", "-60px -60px"],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

export const FloatingDotsBackground = ({ className }: BackgroundProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [dots, setDots] = useState<Array<{ id: number; x: number; y: number; delay: number }>>([]);

  useEffect(() => {
    const newDots = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
    }));
    setDots(newDots);
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className={`absolute w-1 h-1 rounded-full ${
            isDark ? "bg-white/40" : "bg-black/25"
          }`}
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: dot.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export const WaveBackground = ({ className }: BackgroundProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop
              offset="0%"
              stopColor={isDark ? "rgba(139, 92, 246, 0.2)" : "rgba(139, 92, 246, 0.1)"}
            />
            <stop
              offset="100%"
              stopColor={isDark ? "rgba(59, 130, 246, 0.1)" : "rgba(59, 130, 246, 0.05)"}
            />
          </linearGradient>
        </defs>
        <motion.path
          d="M0,400 Q300,200 600,400 T1200,400 L1200,800 L0,800 Z"
          fill="url(#wave-gradient)"
          animate={{
            d: [
              "M0,400 Q300,200 600,400 T1200,400 L1200,800 L0,800 Z",
              "M0,450 Q300,250 600,350 T1200,450 L1200,800 L0,800 Z",
              "M0,400 Q300,200 600,400 T1200,400 L1200,800 L0,800 Z",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.path
          d="M0,500 Q300,300 600,500 T1200,500 L1200,800 L0,800 Z"
          fill={isDark ? "rgba(99, 102, 241, 0.1)" : "rgba(99, 102, 241, 0.06)"}
          animate={{
            d: [
              "M0,500 Q300,300 600,500 T1200,500 L1200,800 L0,800 Z",
              "M0,550 Q300,350 600,450 T1200,550 L1200,800 L0,800 Z",
              "M0,500 Q300,300 600,500 T1200,500 L1200,800 L0,800 Z",
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </svg>
    </div>
  );
};

export const ParticleBackground = ({ className }: BackgroundProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [particles, setParticles] = useState<Array<{ 
    id: number; 
    x: number; 
    y: number; 
    size: number; 
    duration: number; 
  }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${
            isDark ? "bg-gradient-to-r from-purple-400/40 to-blue-400/40" : "bg-gradient-to-r from-purple-300/25 to-blue-300/25"
          }`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};
