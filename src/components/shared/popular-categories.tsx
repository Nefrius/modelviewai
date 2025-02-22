"use client";

import { motion } from "framer-motion";

const CATEGORIES = [
  {
    id: 1,
    name: "Dil Modelleri",
    description: "Metin üretimi ve analizi için gelişmiş AI modelleri",
    icon: "https://api.iconify.design/fluent:brain-circuit-24-regular.svg",
    count: 24,
    gradient: "from-blue-500/20 to-violet-500/20"
  },
  {
    id: 2,
    name: "Görsel Üretimi",
    description: "Yaratıcı ve gerçekçi görseller oluşturun",
    icon: "https://api.iconify.design/fluent:image-sparkle-24-regular.svg",
    count: 18,
    gradient: "from-violet-500/20 to-fuchsia-500/20"
  },
  {
    id: 3,
    name: "Ses İşleme",
    description: "Ses tanıma ve sentezleme teknolojileri",
    icon: "https://api.iconify.design/fluent:speaker-2-24-regular.svg",
    count: 12,
    gradient: "from-fuchsia-500/20 to-pink-500/20"
  },
  {
    id: 4,
    name: "Video İşleme",
    description: "Video analizi ve üretimi için AI çözümleri",
    icon: "https://api.iconify.design/fluent:video-clip-24-regular.svg",
    count: 8,
    gradient: "from-pink-500/20 to-rose-500/20"
  },
  {
    id: 5,
    name: "3D Modelleme",
    description: "3 boyutlu model üretimi ve optimizasyonu",
    icon: "https://api.iconify.design/fluent:cube-24-regular.svg",
    count: 6,
    gradient: "from-rose-500/20 to-orange-500/20"
  },
  {
    id: 6,
    name: "Robotik",
    description: "Robot kontrolü ve otomasyon sistemleri",
    icon: "https://api.iconify.design/fluent:bot-24-regular.svg",
    count: 10,
    gradient: "from-orange-500/20 to-amber-500/20"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9,
    rotateX: -15
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12
    }
  }
};

export function PopularCategories() {
  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />

      <div className="container mx-auto px-4 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center space-y-4 mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Popüler Kategoriler
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            İhtiyacınıza uygun AI modellerini kategorilere göre keşfedin
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {CATEGORIES.map((category) => (
            <motion.button
              key={category.id}
              variants={cardVariants}
              whileHover={{ 
                y: -8, 
                scale: 1.02,
                rotateX: 5,
                transition: { type: "spring", stiffness: 400 }
              }}
              className="group relative bg-[#0A0A0F]/95 rounded-xl border border-white/[0.05] overflow-hidden backdrop-blur-[5px] shadow-xl text-left w-full"
            >
              <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="h-12 w-12 rounded-lg bg-[#1A1A23] flex items-center justify-center"
                  >
                    <motion.img
                      initial={{ scale: 0.5, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      src={category.icon}
                      alt={category.name}
                      className="w-6 h-6 text-white"
                      style={{ filter: 'invert(1)' }}
                    />
                  </motion.div>
                  <div>
                    <motion.h3
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-lg font-semibold text-white group-hover:text-violet-400 transition-colors"
                    >
                      {category.name}
                    </motion.h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-sm text-white/40"
                    >
                      {category.count} model
                    </motion.p>
                  </div>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-sm text-white/60"
                >
                  {category.description}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="pt-4 flex items-center gap-2 text-sm text-white/70 group-hover:text-violet-400 transition-colors"
                >
                  <span>Tümünü Gör</span>
                  <motion.svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 5, 0] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </motion.svg>
                </motion.div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 