"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function StarBackground() {
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate 150 random stars on mount
    const newStars = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      size: Math.random() * 2 + 1, // 1px to 3px
      duration: Math.random() * 3 + 2, // 2s to 5s twinkle
      delay: Math.random() * 2, // random start delay
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-slate-950">
      {/* Deep space gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950"></div>
      
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
          }}
          animate={{
            opacity: [0.1, 0.8, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}