"use client";

import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { Coffee, BarChart3, Users, Zap, Target } from "lucide-react";

interface AnimatedIconProps {
  className?: string;
}

export const AnimatedCoffeeWaste = ({ className }: AnimatedIconProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className={`w-24 h-24 rounded-full ${isDark ? 'bg-amber-500/20' : 'bg-amber-100'} flex items-center justify-center`}
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Coffee className={`w-12 h-12 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
        </motion.div>
      </motion.div>
      
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-2 h-2 rounded-full ${isDark ? 'bg-amber-400/60' : 'bg-amber-500/40'}`}
          style={{
            left: `${20 + i * 12}%`,
            top: `${30 + (i % 2) * 40}%`,
          }}
          animate={{
            y: [-10, -20, -10],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
};

export const AnimatedQuality = ({ className }: AnimatedIconProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className={`w-24 h-24 rounded-full ${isDark ? 'bg-emerald-500/20' : 'bg-emerald-100'} flex items-center justify-center`}
          animate={{ 
            scale: [1, 1.05, 1],
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Target className={`w-12 h-12 ${isDark ? 'text-emerald-400' : 'text-emerald-600'}`} />
        </motion.div>
      </motion.div>
      
      {/* Concentric circles */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute border-2 rounded-full ${isDark ? 'border-emerald-400/30' : 'border-emerald-500/30'}`}
          style={{
            width: `${60 + i * 20}px`,
            height: `${60 + i * 20}px`,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
};

export const AnimatedCustomers = ({ className }: AnimatedIconProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className={`w-24 h-24 rounded-full ${isDark ? 'bg-blue-500/20' : 'bg-blue-100'} flex items-center justify-center`}
          animate={{ 
            scale: [1, 1.08, 1],
          }}
          transition={{ 
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Users className={`w-12 h-12 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
        </motion.div>
      </motion.div>
      
      {/* Orbiting dots */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-3 h-3 rounded-full ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`}
          style={{
            left: '50%',
            top: '50%',
            transformOrigin: '0 0',
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.5,
          }}
          initial={{
            x: 40 * Math.cos((i * Math.PI) / 2),
            y: 40 * Math.sin((i * Math.PI) / 2),
          }}
        />
      ))}
    </div>
  );
};

export const AnimatedMenu = ({ className }: AnimatedIconProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className={`w-24 h-24 rounded-full ${isDark ? 'bg-purple-500/20' : 'bg-purple-100'} flex items-center justify-center`}
          animate={{ 
            scale: [1, 1.06, 1],
          }}
          transition={{ 
            duration: 2.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <BarChart3 className={`w-12 h-12 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
        </motion.div>
      </motion.div>
      
      {/* Animated bars */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute ${isDark ? 'bg-purple-400/60' : 'bg-purple-500/40'} rounded-sm`}
          style={{
            width: '3px',
            left: `${35 + i * 6}%`,
            bottom: '25%',
          }}
          animate={{
            height: [`${20 + i * 8}%`, `${30 + i * 10}%`, `${20 + i * 8}%`],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  );
};

export const AnimatedCosts = ({ className }: AnimatedIconProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className={`w-24 h-24 rounded-full ${isDark ? 'bg-green-500/20' : 'bg-green-100'} flex items-center justify-center`}
          animate={{ 
            scale: [1, 1.07, 1],
          }}
          transition={{ 
            duration: 2.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Zap className={`w-12 h-12 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
        </motion.div>
      </motion.div>
      
      {/* Energy waves */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute border-2 rounded-full ${isDark ? 'border-green-400/40' : 'border-green-500/40'}`}
          style={{
            width: `${50 + i * 15}px`,
            height: `${50 + i * 15}px`,
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  );
};
