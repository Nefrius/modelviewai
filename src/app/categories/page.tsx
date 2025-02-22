"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { useSupabase } from "@/components/providers/supabase-provider";
import Link from "next/link";
import { CATEGORIES } from "./constants";
import Image from "next/image";

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

export default function CategoriesPage() {
  const { user } = useAuth();
  const { supabase } = useSupabase();
  const [followedCategories, setFollowedCategories] = useState<string[]>([]);
  const [categoryStats, setCategoryStats] = useState<{[key: string]: {
    likes: number;
    comments: number;
    favorites: number;
  }}>({});

  // Kategori istatistiklerini yükle
  useEffect(() => {
    const loadCategoryStats = async () => {
      const stats: {[key: string]: {likes: number; comments: number; favorites: number}} = {};
      
      for (const category of CATEGORIES) {
        const models = category.popularModels;
        
        // Beğeni sayısını al
        const { count: likes } = await supabase
          .from('likes')
          .select('*', { count: 'exact' })
          .in('model_id', models);

        // Yorum sayısını al
        const { count: comments } = await supabase
          .from('comments')
          .select('*', { count: 'exact' })
          .in('model_id', models);

        // Favori sayısını al
        const { count: favorites } = await supabase
          .from('favorites')
          .select('*', { count: 'exact' })
          .in('model_id', models);

        stats[category.id] = {
          likes: likes || 0,
          comments: comments || 0,
          favorites: favorites || 0
        };
      }

      setCategoryStats(stats);
    };

    loadCategoryStats();
  }, [supabase]);

  // Kullanıcının takip ettiği kategorileri yükle
  useEffect(() => {
    const loadFollowedCategories = async () => {
      if (!user) return;

      const { data } = await supabase
        .from('category_follows')
        .select('category_id')
        .eq('user_id', user.id);

      if (data) {
        setFollowedCategories(data.map(item => item.category_id));
      }
    };

    loadFollowedCategories();
  }, [user, supabase]);

  // Kategori takip etme/takibi bırakma
  const toggleFollow = async (categoryId: string) => {
    if (!user) {
      toast.error("Bu işlem için giriş yapmalısınız");
      return;
    }

    const isFollowing = followedCategories.includes(categoryId);

    if (isFollowing) {
      const { error } = await supabase
        .from('category_follows')
        .delete()
        .eq('user_id', user.id)
        .eq('category_id', categoryId);

      if (error) {
        toast.error("Takipten çıkarma işlemi başarısız oldu");
        return;
      }

      setFollowedCategories(prev => prev.filter(id => id !== categoryId));
      toast.success("Kategori takipten çıkarıldı");
    } else {
      const { error } = await supabase
        .from('category_follows')
        .insert({
          user_id: user.id,
          category_id: categoryId
        });

      if (error) {
        toast.error("Takip etme işlemi başarısız oldu");
        return;
      }

      setFollowedCategories(prev => [...prev, categoryId]);
      toast.success("Kategori takip edilmeye başlandı");
    }
  };

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
            AI Kategorileri
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto">
            İhtiyacınıza uygun AI modellerini kategorilere göre keşfedin
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {CATEGORIES.map((category) => (
            <motion.div
              key={category.id}
              variants={cardVariants}
              whileHover={{ 
                y: -5, 
                scale: 1.02,
                transition: { type: "spring", stiffness: 400 }
              }}
              className="group relative bg-[#0A0A0F]/95 rounded-xl border border-white/[0.05] overflow-hidden backdrop-blur-[5px] shadow-xl"
            >
              <div className={`absolute inset-0 -z-10 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative p-6 space-y-6">
                {/* Header with Follow Button */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="h-12 w-12 rounded-lg bg-[#1A1A23] flex items-center justify-center"
                    >
                      <Image
                        src={category.icon}
                        alt={category.name}
                        width={24}
                        height={24}
                        className="w-6 h-6"
                        style={{ filter: 'invert(1)' }}
                      />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-semibold text-white group-hover:text-violet-400 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-sm text-white/40">
                        {category.modelCount} model
                      </p>
                    </div>
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFollow(category.id);
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      followedCategories.includes(category.id)
                        ? "bg-violet-500 text-white"
                        : "bg-[#1A1A23] text-white/70 hover:bg-violet-500/10 hover:text-violet-400"
                    }`}
                  >
                    {followedCategories.includes(category.id) ? "Takip Ediliyor" : "Takip Et"}
                  </motion.button>
                </div>

                {/* Description */}
                <p className="text-white/60">
                  {category.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="flex flex-col items-center p-3 rounded-lg bg-[#1A1A23] border border-white/[0.05]">
                    <span className="text-lg font-semibold text-white">
                      {categoryStats[category.id]?.likes || 0}
                    </span>
                    <span className="text-xs text-white/40">Beğeni</span>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-lg bg-[#1A1A23] border border-white/[0.05]">
                    <span className="text-lg font-semibold text-white">
                      {categoryStats[category.id]?.comments || 0}
                    </span>
                    <span className="text-xs text-white/40">Yorum</span>
                  </div>
                  <div className="flex flex-col items-center p-3 rounded-lg bg-[#1A1A23] border border-white/[0.05]">
                    <span className="text-lg font-semibold text-white">
                      {categoryStats[category.id]?.favorites || 0}
                    </span>
                    <span className="text-xs text-white/40">Favori</span>
                  </div>
                </div>

                {/* Sub Categories */}
                <div className="grid grid-cols-2 gap-2">
                  {category.subCategories.map((sub, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#1A1A23] border border-white/[0.05]"
                    >
                      <span className="text-sm text-white/70">{sub.name}</span>
                      <span className="text-xs text-white/40">{sub.count}</span>
                    </div>
                  ))}
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-sm font-medium text-white/40 mb-2">Özellikler</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-xs rounded-full bg-[#1A1A23] text-white/70 border border-white/[0.05]"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Popular Models */}
                <div>
                  <h4 className="text-sm font-medium text-white/40 mb-2">Popüler Modeller</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {category.popularModels.map((model, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 text-sm text-white/70 rounded-lg bg-[#1A1A23] border border-white/[0.05]"
                      >
                        {model}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action */}
                <Link 
                  href={`/categories/${category.id}`} 
                  className="block"
                >
                  <div className="flex items-center justify-between pt-4 border-t border-white/[0.05] group/link">
                    <div className="text-sm text-white/40 group-hover/link:text-violet-400">
                      Tüm modelleri görüntüle
                    </div>
                    <motion.svg
                      className="w-5 h-5 text-white/70 group-hover/link:text-violet-400"
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
                  </div>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
} 