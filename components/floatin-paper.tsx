"use client";

import { motion } from "framer-motion";
import { FileText } from "lucide-react";

export function FloatingPaper({ count = 5 }: { count?: number }) {
  const getRandomPosition = () => ({
    x: Math.random() * 800,
    y: Math.random() * 600,
  });

  return (
    <div className="relative w-full h-full">
      {Array.from({ length: count }).map((_, i) => {
        const from = getRandomPosition();
        const to = [getRandomPosition(), getRandomPosition(), getRandomPosition()];
        const duration = 20 + Math.random() * 10;

        return (
          <motion.div
            key={i}
            className="absolute"
            initial={from}
            animate={{
              x: to.map(p => p.x),
              y: to.map(p => p.y),
              rotate: [0, 180, 360],
            }}
            transition={{
              duration,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="relative -z-20 w-16 h-16 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center">
              <FileText className="w-8 h-8 text-[#7C3AED]" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
