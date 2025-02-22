"use client";

import { motion } from "framer-motion";

export function BackgroundEffects() {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-[#0A0A0B] overflow-hidden">
      {/* Gradient Ambient Light */}
      <div className="absolute inset-0">
        <div className="absolute h-full w-full bg-[radial-gradient(circle_500px_at_50%_-30%,#1A1B3F,transparent)]" />
        <div className="absolute h-full w-full bg-[radial-gradient(circle_500px_at_80%_60%,#1F1B3F,transparent)]" />
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
              left: ["0%", "100%", "0%"],
              top: ["0%", "100%", "0%"]
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "linear",
              delay: i * 5
            }}
          >
            <div className={`w-[300px] h-[300px] rounded-full bg-gradient-to-br from-violet-500/10 via-transparent to-transparent blur-3xl`} />
          </motion.div>
        ))}
      </div>

      {/* Subtle Grid */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)]"
        style={{ backgroundSize: '60px 60px' }}
      />

      {/* Very Subtle Noise */}
      <div 
        className="absolute inset-0 opacity-[0.15] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
} 