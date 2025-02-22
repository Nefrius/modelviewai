"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const FEATURED_MODELS = [
  {
    id: 1,
    name: "GPT-4 Turbo",
    description: "En gelişmiş dil modeli ile metin üretimi ve analizi yapın",
    category: "Dil Modeli",
    icon: "https://api.iconify.design/fluent:brain-circuit-24-filled.svg",
    stats: {
      accuracy: "98%",
      speed: "0.1s",
      usage: "10M+"
    }
  },
  {
    id: 2,
    name: "DALL-E 3",
    description: "Metinden gerçekçi ve yaratıcı görseller oluşturun",
    category: "Görsel Üretimi",
    icon: "https://api.iconify.design/fluent:image-sparkle-24-filled.svg",
    stats: {
      accuracy: "95%",
      speed: "2.5s",
      usage: "5M+"
    }
  },
  {
    id: 3,
    name: "Stable Diffusion XL",
    description: "Yüksek kaliteli ve özelleştirilebilir görsel üretimi",
    category: "Görsel Üretimi",
    icon: "https://api.iconify.design/fluent:image-edit-24-filled.svg",
    stats: {
      accuracy: "94%",
      speed: "1.8s",
      usage: "8M+"
    }
  },
  {
    id: 4,
    name: "Whisper AI",
    description: "Gelişmiş ses tanıma ve çeviri teknolojisi",
    category: "Ses İşleme",
    icon: "https://api.iconify.design/fluent:mic-sparkle-24-filled.svg",
    stats: {
      accuracy: "97%",
      speed: "1.2s",
      usage: "3M+"
    }
  },
  {
    id: 5,
    name: "Claude 3",
    description: "Çok yönlü ve güçlü yapay zeka asistanı",
    category: "Dil Modeli",
    icon: "https://api.iconify.design/fluent:bot-24-filled.svg",
    stats: {
      accuracy: "96%",
      speed: "0.2s",
      usage: "4M+"
    }
  },
  {
    id: 6,
    name: "Midjourney V6",
    description: "Sanatsal ve yaratıcı görsel üretim modeli",
    category: "Görsel Üretimi",
    icon: "https://api.iconify.design/fluent:paint-brush-24-filled.svg",
    stats: {
      accuracy: "93%",
      speed: "3.0s",
      usage: "6M+"
    }
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 50,
    scale: 0.9
  },
  visible: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export function FeaturedModels() {
  return (
    <section className="relative w-full py-32">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center space-y-4 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Öne Çıkan AI Modelleri
          </h2>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            En popüler ve güçlü yapay zeka modellerini keşfedin ve projelerinizde kullanın
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {FEATURED_MODELS.map((model) => (
            <motion.button
              key={model.id}
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group relative bg-[#0A0A0F]/95 rounded-xl border border-white/[0.05] overflow-hidden backdrop-blur-[5px] shadow-xl text-left w-full"
            >
              {/* Gradient overlay */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-violet-500/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="h-10 w-10 rounded-lg bg-[#1A1A23] flex items-center justify-center"
                    >
                      <Image
                        src={model.icon}
                        alt={model.name}
                        width={24}
                        height={24}
                        className="w-6 h-6"
                        style={{ filter: 'invert(1)' }}
                      />
                    </motion.div>
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="px-3 py-1 text-xs rounded-full bg-[#1A1A23] text-white/70 border border-white/[0.05]"
                    >
                      {model.category}
                    </motion.span>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="h-8 w-8 rounded-full bg-violet-500/10 flex items-center justify-center"
                  >
                    <div className="h-2 w-2 rounded-full bg-violet-500" />
                  </motion.div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-white group-hover:text-violet-400 transition-colors">
                    {model.name}
                  </h3>
                  <p className="mt-2 text-white/60 text-sm">
                    {model.description}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-4 py-4 border-t border-white/[0.05]">
                  {Object.entries(model.stats).map(([key, value], i) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="text-center"
                    >
                      <div className="text-sm text-white/40">{key === "accuracy" ? "Doğruluk" : key === "speed" ? "Hız" : "Kullanım"}</div>
                      <div className="font-medium text-white group-hover:text-violet-400 transition-colors">
                        {value}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="w-full px-4 py-3 rounded-lg bg-[#1A1A23] text-white/70 hover:text-violet-400 hover:bg-[#1A1A23]/80 transition-all flex items-center justify-center gap-2 group">
                  <span>Detayları İncele</span>
                  <motion.svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    whileHover={{ x: 5 }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </motion.svg>
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 