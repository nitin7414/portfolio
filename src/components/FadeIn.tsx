"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

// 1. ADD className?: string TO THE PROPS
type FadeInProps = {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  fullWidth?: boolean;
  className?: string; 
};

export default function FadeIn({
  children,
  delay = 0,
  direction = "up",
  fullWidth = false,
  className = "", // 2. Accept it here
}: FadeInProps) {
  
  // Set up the directional animation
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  };

  return (
    <motion.div
      initial={{ 
        opacity: 0, 
        ...directions[direction] 
      }}
      whileInView={{ 
        opacity: 1, 
        x: 0, 
        y: 0 
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.7,
        ease: [0.25, 1, 0.5, 1],
        delay: delay,
      }}
      // 3. Apply the className and fullWidth logic to the motion.div
      className={`${fullWidth ? "w-full" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}