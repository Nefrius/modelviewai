"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { useFavorites } from "@/hooks/use-favorites";
import Image from "next/image";

const MODELS = [
  {
    id: "gpt-4-turbo",
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
    id: "dall-e-3",
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
    id: "stable-diffusion-xl",
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
    id: "whisper-ai",
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
    id: "claude-3",
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
    id: "midjourney-v6",
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

const CATEGORIES = ["Tümü", "Dil Modeli", "Görsel Üretimi", "Ses İşleme"];

export default function ModelsPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tümü");
  const [searchQuery, setSearchQuery] = useState("");
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const filteredModels = MODELS.filter(model => {
    const matchesCategory = selectedCategory === "Tümü" || model.category === selectedCategory;
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         model.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen w-full py-32">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-4"
          >
            AI Modelleri
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/60"
          >
            İhtiyacınıza uygun AI modelini seçin ve hemen kullanmaya başlayın
          </motion.p>
        </div>

        {/* Filters */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="w-full md:w-96">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Model ara..."
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                />
                <svg
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((category) => (
                <motion.button
                  key={category}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    selectedCategory === category
                      ? "bg-violet-500 text-white"
                      : "bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Models Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 gap-6">
            {filteredModels.map((model, index) => (
              <motion.div
                key={model.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-[#0A0A0F]/95 rounded-xl border border-white/[0.05] overflow-hidden backdrop-blur-[5px] shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-violet-500/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="relative p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className="h-12 w-12 rounded-lg bg-[#1A1A23] flex items-center justify-center"
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
                      <div>
                        <h3 className="text-xl font-semibold text-white group-hover:text-violet-400 transition-colors">
                          {model.name}
                        </h3>
                        <span className="px-3 py-1 text-xs rounded-full bg-[#1A1A23] text-white/70 border border-white/[0.05]">
                          {model.category}
                        </span>
                      </div>
                    </div>
                    
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        if (isFavorite(model.id)) {
                          removeFavorite(model.id);
                        } else {
                          addFavorite(model.id);
                        }
                      }}
                      className={`h-8 w-8 rounded-full flex items-center justify-center transition-colors ${
                        isFavorite(model.id)
                          ? "bg-violet-500 text-white"
                          : "bg-white/5 text-white/40 hover:bg-violet-500/10 hover:text-violet-400"
                      }`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </motion.button>
                  </div>

                  <p className="mt-4 text-white/60">
                    {model.description}
                  </p>

                  <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/[0.05]">
                    {Object.entries(model.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-sm text-white/40">
                          {key === "accuracy" ? "Doğruluk" :
                           key === "speed" ? "Hız" :
                           "Kullanım"}
                        </div>
                        <div className="text-lg font-medium text-white">
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/[0.05]">
                    <div className="flex items-center gap-6">
                      <div>
                        <div className="text-sm text-white/40">Sağlayıcı</div>
                        <div className="text-sm text-white/70">OpenAI</div>
                      </div>
                      <div>
                        <div className="text-sm text-white/40">Versiyon</div>
                        <div className="text-sm text-white/70">1.0.0</div>
                      </div>
                    </div>

                    <Link href={`/models/${model.id}`}>
                      <motion.button
                        whileHover={{ x: 5 }}
                        className="flex items-center gap-2 text-white/70 group-hover:text-violet-400 transition-colors"
                      >
                        <span>Detayları Gör</span>
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
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 