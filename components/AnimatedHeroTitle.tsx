"use client";

import { motion } from "motion/react";

const words = [
  "Converti",
  "tu",
  "historia",
  "en",
  "un",
  "CV",
  "listo",
  "para",
  "entrevistas",
];

export default function AnimatedHeroTitle() {
  return (
    <motion.h1
      className="max-w-full text-pretty text-[2.45rem] font-bold leading-[1.02] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-[4.8rem] lg:leading-[0.96]"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.045,
            delayChildren: 0.08,
          },
        },
      }}
    >
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className="inline-block whitespace-pre"
          variants={{
            hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
            },
          }}
        >
          {word}
          {index < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.h1>
  );
}
