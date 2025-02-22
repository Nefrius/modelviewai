"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useSupabase } from "@/components/providers/supabase-provider";
import { motion } from "framer-motion";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CATEGORIES } from "../constants";
import { toast } from "sonner";
import { use } from "react";
import { useSoundEffects } from "@/hooks/use-sound-effects";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default function CategoryDetailPage({ params }: Props) {
  const { user } = useAuth();
  const { supabase } = useSupabase();
  const { playWooshSound } = useSoundEffects();
  const [isLoading, setIsLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [stats, setStats] = useState({
    likes: 0,
    comments: 0,
    favorites: 0
  });

  // params'ı unwrap et
  const resolvedParams = use(params);
  const category = CATEGORIES.find(c => c.id === resolvedParams.id);

  useEffect(() => {
    if (!category) return;

    async function loadStats() {
      try {
        const modelIds = category?.popularModels.map(model => 
          model.toLowerCase().replace(/\s+/g, '-')
        ) ?? [];

        const [likesCount, commentsCount, favoritesCount] = await Promise.all([
          supabase
            .from('likes')
            .select('id', { count: 'exact' })
            .in('model_id', modelIds),
          supabase
            .from('comments')
            .select('id', { count: 'exact' })
            .in('model_id', modelIds),
          supabase
            .from('favorites')
            .select('id', { count: 'exact' })
            .in('model_id', modelIds)
        ]);

        setStats({
          likes: likesCount.count || 0,
          comments: commentsCount.count || 0,
          favorites: favoritesCount.count || 0
        });
      } catch (error) {
        console.error('Stats yüklenirken hata:', error);
        toast.error('İstatistikler yüklenirken bir hata oluştu');
      }
    }

    async function checkFollowStatus() {
      if (!user) return;
      
      try {
        const { data } = await supabase
          .from('category_follows')
          .select('id')
          .eq('user_id', user.id)
          .eq('category_id', resolvedParams.id)
          .single();

        setIsFollowing(!!data);
      } catch (error) {
        console.error('Takip durumu kontrol edilirken hata:', error);
      }
    }

    loadStats();
    checkFollowStatus();
    setIsLoading(false);
  }, [category, supabase, user, resolvedParams.id]);

  if (!category) {
    return notFound();
  }

  const toggleFollow = async () => {
    if (!user) {
      toast.error('Takip etmek için giriş yapmalısınız');
      return;
    }

    try {
      setIsLoading(true);

      if (isFollowing) {
        await supabase
          .from('category_follows')
          .delete()
          .eq('user_id', user.id)
          .eq('category_id', resolvedParams.id);
        
        toast.success('Kategori takibi bırakıldı');
      } else {
        await supabase
          .from('category_follows')
          .insert({
            user_id: user.id,
            category_id: resolvedParams.id
          });
        
        toast.success('Kategori takip edilmeye başlandı');
      }

      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error('Takip işlemi sırasında hata:', error);
      toast.error('Bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full py-32">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />

      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <Link 
            href="/categories"
            className="inline-flex items-center text-white/60 hover:text-violet-400 mb-8 group transition-colors"
          >
            <motion.svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ x: [0, -5, 0] }}
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
                d="M15 19l-7-7 7-7"
              />
            </motion.svg>
            <span>Kategorilere Dön</span>
          </Link>

          <div className="bg-[#1A1A23]/50 rounded-xl p-8 backdrop-blur-sm border border-white/[0.05] mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <motion.h1 
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl font-bold text-white mb-2"
                >
                  {category.name}
                </motion.h1>
                <p className="text-white/60 text-lg max-w-2xl">
                  {category.description}
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  playWooshSound();
                  toggleFollow();
                }}
                disabled={isLoading}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  isFollowing 
                    ? 'bg-white/10 text-white hover:bg-white/20' 
                    : 'bg-violet-500 text-white hover:bg-violet-600'
                }`}
              >
                {isFollowing ? 'Takibi Bırak' : 'Takip Et'}
              </motion.button>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-[#1A1A23] rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">{stats.likes}</div>
                <div className="text-white/60">Beğeni</div>
              </div>
              <div className="bg-[#1A1A23] rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">{stats.comments}</div>
                <div className="text-white/60">Yorum</div>
              </div>
              <div className="bg-[#1A1A23] rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-white mb-1">{stats.favorites}</div>
                <div className="text-white/60">Favori</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Alt Kategoriler */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#1A1A23]/50 rounded-xl p-6 backdrop-blur-sm border border-white/[0.05]"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Alt Kategoriler</h2>
              <div className="space-y-3">
                {category.subCategories.map((sub, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#1A1A23] border border-white/[0.05]"
                  >
                    <span className="text-white/80">{sub.name}</span>
                    <span className="text-white/40 text-sm">{sub.count} model</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Özellikler */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#1A1A23]/50 rounded-xl p-6 backdrop-blur-sm border border-white/[0.05]"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Özellikler</h2>
              <div className="grid grid-cols-2 gap-3">
                {category.features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 p-3 rounded-lg bg-[#1A1A23] border border-white/[0.05]"
                  >
                    <div className="h-2 w-2 rounded-full bg-violet-500"></div>
                    <span className="text-white/80 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Popüler Modeller */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-[#1A1A23]/50 rounded-xl p-6 backdrop-blur-sm border border-white/[0.05]"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Popüler Modeller</h2>
              <div className="space-y-3">
                {category.popularModels.map((model, index) => (
                  <Link 
                    key={index}
                    href={`/models/${model.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <motion.div
                      whileHover={{ 
                        scale: 1.02,
                        backgroundColor: "rgba(255,255,255,0.05)"
                      }}
                      className="flex items-center justify-between p-3 rounded-lg bg-[#1A1A23] border border-white/[0.05] transition-colors"
                    >
                      <span className="text-white/80">{model}</span>
                      <motion.svg
                        className="w-5 h-5 text-white/40"
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
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 