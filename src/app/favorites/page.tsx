"use client";

import { motion } from "framer-motion";
import { useFavorites } from "@/hooks/use-favorites";
import Link from "next/link";
import Image from "next/image";

interface BaseFavorite {
  id: string;
  created_at: string;
  user_id: string;
  model_id: string;
}

interface Favorite extends BaseFavorite {
  icon?: string;
}

// Sabit model bilgileri
const MODEL_ICONS: { [key: string]: string } = {
  "gpt-4-turbo": "https://api.iconify.design/fluent:brain-circuit-24-filled.svg",
  "dall-e-3": "https://api.iconify.design/fluent:image-sparkle-24-filled.svg",
  "stable-diffusion-xl": "https://api.iconify.design/fluent:image-edit-24-filled.svg",
  "whisper-ai": "https://api.iconify.design/fluent:mic-sparkle-24-filled.svg",
  "claude-3": "https://api.iconify.design/fluent:bot-24-filled.svg",
  "midjourney-v6": "https://api.iconify.design/fluent:paint-brush-24-filled.svg"
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function FavoritesPage() {
  const { favorites, loading, removeFavorite } = useFavorites<Favorite>();

  return (
    <div className="min-h-screen w-full py-32">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center space-y-4 mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Favori Modelleriniz
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            Sık kullandığınız ve favori olarak işaretlediğiniz AI modelleriniz
          </p>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500" />
          </div>
        ) : favorites.length > 0 ? (
          <>
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            >
              {[
                { label: "Favori Model", value: favorites.length.toString() },
                { label: "Son Eklenen", value: "2 saat önce" },
                { label: "En Çok Kullanılan", value: "GPT-4 Turbo" }
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-[#0A0A0F]/95 rounded-xl border border-white/[0.05] p-6 backdrop-blur-[5px]"
                >
                  <div className="text-sm text-white/40">{stat.label}</div>
                  <div className="text-2xl font-semibold text-white mt-1">{stat.value}</div>
                </div>
              ))}
            </motion.div>

            {/* Favorites Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-6"
            >
              {favorites.map((favorite) => (
                <motion.div
                  key={favorite.id}
                  variants={cardVariants}
                  className="group relative bg-[#0A0A0F]/95 rounded-xl border border-white/[0.05] overflow-hidden backdrop-blur-[5px] shadow-xl"
                >
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-lg bg-[#1A1A23] flex items-center justify-center">
                          <Image
                            src={MODEL_ICONS[favorite.model_id] || "https://api.iconify.design/fluent:brain-circuit-24-filled.svg"}
                            alt={favorite.model_id}
                            width={24}
                            height={24}
                            className="w-6 h-6"
                            style={{ filter: 'invert(1)' }}
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white group-hover:text-violet-400 transition-colors">
                            {favorite.model_id}
                          </h3>
                          <span className="px-3 py-1 text-xs rounded-full bg-[#1A1A23] text-white/70 border border-white/[0.05]">
                            Dil Modeli
                          </span>
                        </div>
                      </div>
                      
                      <button
                        onClick={() => removeFavorite(favorite.model_id)}
                        className="h-8 w-8 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-400"
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
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/[0.05]">
                      <div className="flex items-center gap-6">
                        <div>
                          <div className="text-sm text-white/40">Eklenme</div>
                          <div className="text-sm text-white/70">
                            {new Date(favorite.created_at).toLocaleDateString('tr-TR')}
                          </div>
                        </div>
                      </div>

                      <Link href={`/models/${favorite.model_id}`}>
                        <div className="flex items-center gap-2 text-white/70 group-hover:text-violet-400 transition-colors">
                          <span>Modeli Kullan</span>
                          <svg
                            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </div>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-violet-500/10 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-violet-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Henüz Favori Modeliniz Yok
            </h3>
            <p className="text-white/60 mb-6">
              AI modellerini keşfedin ve favorilerinize ekleyin
            </p>
            <Link href="/models">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg bg-violet-500 text-white font-medium hover:bg-violet-600 transition-colors"
              >
                Modelleri Keşfet
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
} 