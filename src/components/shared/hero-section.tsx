"use client";

import { motion } from "framer-motion";
import { useSoundEffects } from "@/hooks/use-sound-effects";
import { useRouter } from "next/navigation";

const slideUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut"
    }
  })
};

const glowVariants = {
  initial: { opacity: 0.5 },
  animate: {
    opacity: [0.4, 0.6, 0.4],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export function HeroSection() {
  const { playWooshSound } = useSoundEffects();
  const router = useRouter();

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Glow Effect */}
      <motion.div
        variants={glowVariants}
        initial="initial"
        animate="animate"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/20 rounded-full blur-[120px]"
      />

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <motion.div
            custom={0}
            variants={slideUpVariants}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
          >
            <span className="flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
            </span>
            <span className="text-sm text-white/70">AI Teknolojileri</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            custom={1}
            variants={slideUpVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-7xl font-bold tracking-tight"
          >
            <span className="text-white">Yapay Zeka ile</span>{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-indigo-500">
              Geleceği Şekillendir
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            custom={2}
            variants={slideUpVariants}
            initial="hidden"
            animate="visible"
            className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto"
          >
            En son yapay zeka teknolojilerini keşfedin ve projelerinizi bir üst seviyeye taşıyın.
            Gelişmiş AI modelleri ile sınırsız olasılıkları deneyimleyin.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            custom={3}
            variants={slideUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                playWooshSound();
                router.push("/models");
              }}
              className="px-8 py-4 rounded-lg bg-violet-500 text-white font-medium hover:bg-violet-600 transition-all hover:shadow-lg hover:shadow-violet-500/25"
            >
              Hemen Başla
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                playWooshSound();
                router.push("/categories");
              }}
              className="px-8 py-4 rounded-lg bg-white/5 text-white font-medium border border-white/10 hover:bg-white/10 transition-all hover:shadow-lg hover:shadow-white/10"
            >
              Daha Fazla Bilgi
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            custom={4}
            variants={slideUpVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16"
          >
            {[
              { value: "10K+", label: "Kullanıcı" },
              { value: "50+", label: "AI Model" },
              { value: "99%", label: "Başarı" },
              { value: "24/7", label: "Destek" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-white/50">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="text-white/50 text-sm">Aşağı Kaydır</div>
          <div className="w-5 h-9 rounded-full border-2 border-white/20 flex justify-center pt-2">
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1 h-1 rounded-full bg-violet-500"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
} 