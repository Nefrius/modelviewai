"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useFavorites } from "@/hooks/use-favorites";
import { useLikes } from '@/hooks/use-likes'
import { useComments } from '@/hooks/use-comments'
import { useAuth } from '@/hooks/use-auth'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { formatDistanceToNow } from 'date-fns'
import { tr } from 'date-fns/locale'
import Link from 'next/link'
import { toast } from 'sonner'
import Image from "next/image";

const MODEL_DETAILS = {
  "gpt-4-turbo": {
    name: "GPT-4 Turbo",
    description: "En gelişmiş dil modeli ile metin üretimi ve analizi yapın. Gelişmiş bağlam anlama ve doğal dil işleme yetenekleri ile projelerinizi bir üst seviyeye taşıyın.",
    category: "Dil Modeli",
    icon: "https://api.iconify.design/fluent:brain-circuit-24-filled.svg",
    provider: "OpenAI",
    version: "1.0.0",
    features: [
      "Çoklu dil desteği",
      "Kod üretimi",
      "Metin analizi",
      "Soru cevaplama"
    ],
    stats: {
      accuracy: "98%",
      speed: "0.1s",
      usage: "10M+",
      rating: "4.9"
    },
    pricing: {
      free: true,
      price: "0.01$/1K token"
    },
    techSpecs: [
      { label: "Bağlam Penceresi", value: "128K token" },
      { label: "Model Boyutu", value: "1.76T parametre" },
      { label: "Desteklenen Diller", value: "100+" },
      { label: "API Latency", value: "100ms" },
      { label: "Günlük Limit", value: "Sınırsız" },
      { label: "Paralel İstek", value: "100/dk" }
    ]
  },
  "dall-e-3": {
    name: "DALL-E 3",
    description: "Metinden gerçekçi ve yaratıcı görseller oluşturun. Yüksek çözünürlüklü, detaylı ve özelleştirilebilir görsel üretimi için ideal çözüm.",
    category: "Görsel Üretimi",
    icon: "https://api.iconify.design/fluent:image-sparkle-24-filled.svg",
    provider: "OpenAI",
    version: "3.0.0",
    features: [
      "4K çözünürlük",
      "Stil kontrolü",
      "Nesne manipülasyonu",
      "Batch üretim"
    ],
    stats: {
      accuracy: "95%",
      speed: "2.5s",
      usage: "5M+",
      rating: "4.8"
    },
    pricing: {
      free: false,
      price: "0.02$/görsel"
    },
    techSpecs: [
      { label: "Maksimum Çözünürlük", value: "4096x4096px" },
      { label: "Minimum Boyut", value: "512x512px" },
      { label: "Desteklenen Formatlar", value: "PNG, JPEG" },
      { label: "API Latency", value: "2-3s" },
      { label: "Günlük Limit", value: "1000 görsel" },
      { label: "Paralel İstek", value: "10/dk" }
    ]
  },
  "stable-diffusion-xl": {
    name: "Stable Diffusion XL",
    description: "Yüksek kaliteli ve özelleştirilebilir görsel üretimi. Gelişmiş kontrol seçenekleri ve hızlı üretim kapasitesi ile yaratıcı projeleriniz için mükemmel çözüm.",
    category: "Görsel Üretimi",
    icon: "https://api.iconify.design/fluent:image-edit-24-filled.svg",
    provider: "Stability AI",
    version: "1.0.0",
    features: [
      "8K çözünürlük",
      "LoRA desteği",
      "Inpainting",
      "Outpainting"
    ],
    stats: {
      accuracy: "94%",
      speed: "1.8s",
      usage: "8M+",
      rating: "4.7"
    },
    pricing: {
      free: true,
      price: "0.015$/görsel"
    },
    techSpecs: [
      { label: "Maksimum Çözünürlük", value: "8192x8192px" },
      { label: "Model Boyutu", value: "6.9B parametre" },
      { label: "Desteklenen Formatlar", value: "PNG, JPEG, WebP" },
      { label: "API Latency", value: "1.5-2s" },
      { label: "Günlük Limit", value: "500 görsel" },
      { label: "Paralel İstek", value: "5/dk" }
    ]
  },
  "whisper-ai": {
    name: "Whisper AI",
    description: "Gelişmiş ses tanıma ve çeviri teknolojisi. 90'dan fazla dilde konuşma tanıma ve çeviri yapabilme yeteneği ile ses projeleriniz için ideal çözüm.",
    category: "Ses İşleme",
    icon: "https://api.iconify.design/fluent:mic-sparkle-24-filled.svg",
    provider: "OpenAI",
    version: "2.0.0",
    features: [
      "90+ dil desteği",
      "Gerçek zamanlı çeviri",
      "Gürültü filtresi",
      "Konuşmacı ayrıştırma"
    ],
    stats: {
      accuracy: "97%",
      speed: "1.2s",
      usage: "3M+",
      rating: "4.6"
    },
    pricing: {
      free: true,
      price: "0.006$/dakika"
    },
    techSpecs: [
      { label: "Maksimum Süre", value: "4 saat" },
      { label: "Desteklenen Formatlar", value: "MP3, WAV, M4A" },
      { label: "Örnekleme Hızı", value: "16kHz" },
      { label: "API Latency", value: "1-1.5s" },
      { label: "Günlük Limit", value: "100 saat" },
      { label: "Paralel İstek", value: "10/dk" }
    ]
  },
  "claude-3": {
    name: "Claude 3",
    description: "Çok yönlü ve güçlü yapay zeka asistanı. Gelişmiş anlama ve yanıtlama yetenekleri ile her türlü metin tabanlı görev için ideal çözüm.",
    category: "Dil Modeli",
    icon: "https://api.iconify.design/fluent:bot-24-filled.svg",
    provider: "Anthropic",
    version: "3.0.0",
    features: [
      "Uzun bağlam desteği",
      "Çoklu format işleme",
      "Güvenlik kontrolleri",
      "Özelleştirilebilir yanıtlar"
    ],
    stats: {
      accuracy: "96%",
      speed: "0.2s",
      usage: "4M+",
      rating: "4.8"
    },
    pricing: {
      free: false,
      price: "0.008$/1K token"
    },
    techSpecs: [
      { label: "Bağlam Penceresi", value: "100K token" },
      { label: "Model Boyutu", value: "1.5T parametre" },
      { label: "Desteklenen Diller", value: "50+" },
      { label: "API Latency", value: "150ms" },
      { label: "Günlük Limit", value: "Sınırsız" },
      { label: "Paralel İstek", value: "50/dk" }
    ]
  },
  "midjourney-v6": {
    name: "Midjourney V6",
    description: "Sanatsal ve yaratıcı görsel üretim modeli. Gelişmiş stil kontrolü ve yüksek kaliteli görsel üretimi ile sanatsal projeleriniz için mükemmel çözüm.",
    category: "Görsel Üretimi",
    icon: "https://api.iconify.design/fluent:paint-brush-24-filled.svg",
    provider: "Midjourney",
    version: "6.0.0",
    features: [
      "Sanatsal stil kontrolü",
      "Yüksek çözünürlük",
      "Kompozisyon kontrolü",
      "Stil karışımı"
    ],
    stats: {
      accuracy: "93%",
      speed: "3.0s",
      usage: "6M+",
      rating: "4.7"
    },
    pricing: {
      free: false,
      price: "0.03$/görsel"
    },
    techSpecs: [
      { label: "Maksimum Çözünürlük", value: "16384x16384px" },
      { label: "Stil Sayısı", value: "1000+" },
      { label: "Desteklenen Formatlar", value: "PNG, JPEG, WebP" },
      { label: "API Latency", value: "2.5-3.5s" },
      { label: "Günlük Limit", value: "200 görsel" },
      { label: "Paralel İstek", value: "3/dk" }
    ]
  }
};

export default function ModelDetailPage() {
  const params = useParams();
  const modelId = params.id as string;
  const model = MODEL_DETAILS[modelId as keyof typeof MODEL_DETAILS];
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { likes, isLiked, toggleLike } = useLikes();
  const { comments, isLoading, addComment, deleteComment } = useComments(modelId);
  const { user } = useAuth();
  const [newComment, setNewComment] = useState("");
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'comments'>('overview');

  if (!model) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Model Bulunamadı</h1>
          <p className="text-white/60">Aradığınız model mevcut değil.</p>
        </div>
      </div>
    );
  }

  const handleCommentSubmit = async () => {
    if (!user) {
      toast.error('Yorum yapmak için giriş yapmalısınız');
      return;
    }
    if (!newComment.trim()) {
      toast.error('Yorum boş olamaz');
      return;
    }
    await addComment(newComment);
    setNewComment("");
    toast.success('Yorumunuz eklendi');
  };

  const handleLike = async () => {
    if (!user) {
      toast.error('Beğenmek için giriş yapmalısınız');
      return;
    }
    await toggleLike(modelId);
  };

  const handleFavorite = async () => {
    if (!user) {
      toast.error('Favorilere eklemek için giriş yapmalısınız');
      return;
    }
    if (isFavorite(modelId)) {
      await removeFavorite(modelId);
      toast.success('Favorilerden kaldırıldı');
    } else {
      await addFavorite(modelId);
      toast.success('Favorilere eklendi');
    }
  };

  return (
    <div className="min-h-screen w-full py-32">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Navigation */}
          <Link 
            href="/models"
            className="inline-flex items-center text-sm text-white/40 hover:text-violet-400 mb-8 group"
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
            <span>AI Modellerine Dön</span>
          </Link>

          {/* Model Header */}
          <div className="bg-[#1A1A23]/50 rounded-xl p-8 mb-8 backdrop-blur-sm border border-white/[0.05]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="h-16 w-16 rounded-2xl bg-[#1A1A23] flex items-center justify-center"
                >
                  <Image
                    src={model.icon}
                    alt={model.name}
                    width={32}
                    height={32}
                    className="w-8 h-8"
                    style={{ filter: 'invert(1)' }}
                  />
                </motion.div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-1">
                    {model.name}
                  </h1>
                  <div className="flex items-center gap-3 text-sm text-white/40">
                    <span>{model.provider}</span>
                    <span>•</span>
                    <span>v{model.version}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleLike}
                  className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${
                    isLiked[modelId]
                      ? "bg-violet-500 text-white"
                      : "bg-white/5 text-white/40 hover:bg-violet-500/10 hover:text-violet-400"
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleFavorite}
                  className={`h-10 w-10 rounded-full flex items-center justify-center transition-colors ${
                    isFavorite(modelId)
                      ? "bg-violet-500 text-white"
                      : "bg-white/5 text-white/40 hover:bg-violet-500/10 hover:text-violet-400"
                  }`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                  </svg>
                </motion.button>
              </div>
            </div>

            <p className="text-lg text-white/60 mb-8">
              {model.description}
            </p>

            <div className="grid grid-cols-4 gap-4">
              {Object.entries(model.stats).map(([key, value]) => (
                <div
                  key={key}
                  className="bg-[#1A1A23] rounded-lg p-4 text-center"
                >
                  <div className="text-sm text-white/40 mb-1">
                    {key === "accuracy" ? "Doğruluk" :
                     key === "speed" ? "Hız" :
                     key === "usage" ? "Kullanım" :
                     "Puan"}
                  </div>
                  <div className="text-xl font-semibold text-white">
                    {value}
                  </div>
                </div>
              ))}
              <div className="bg-[#1A1A23] rounded-lg p-4 text-center">
                <div className="text-sm text-white/40 mb-1">
                  Beğeni
                </div>
                <div className="text-xl font-semibold text-white">
                  {likes[modelId] || 0}
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/[0.05] mb-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'overview'
                  ? "text-violet-400 border-b-2 border-violet-400"
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              Genel Bakış
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'specs'
                  ? "text-violet-400 border-b-2 border-violet-400"
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              Teknik Özellikler
            </button>
            <button
              onClick={() => setActiveTab('comments')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                activeTab === 'comments'
                  ? "text-violet-400 border-b-2 border-violet-400"
                  : "text-white/40 hover:text-white/60"
              }`}
            >
              Yorumlar
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Features */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">
                  Özellikler
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {model.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-[#1A1A23]/50 rounded-lg p-4 backdrop-blur-sm border border-white/[0.05]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                          <svg className="w-4 h-4 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-white/80">{feature}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">
                  Fiyatlandırma
                </h2>
                <div className="bg-[#1A1A23]/50 rounded-lg p-6 backdrop-blur-sm border border-white/[0.05]">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {model.pricing.free ? (
                        <span className="px-3 py-1 text-sm bg-green-500/10 text-green-400 rounded-full">
                          Ücretsiz Kullanım
                        </span>
                      ) : (
                        <span className="px-3 py-1 text-sm bg-violet-500/10 text-violet-400 rounded-full">
                          Ücretli
                        </span>
                      )}
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {model.pricing.price}
                    </div>
                  </div>
                  <p className="text-sm text-white/40">
                    * Fiyatlar kullanım miktarına göre değişiklik gösterebilir.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'specs' && (
            <div className="grid grid-cols-2 gap-4">
              {model.techSpecs.map((spec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#1A1A23]/50 rounded-lg p-6 backdrop-blur-sm border border-white/[0.05]"
                >
                  <div className="text-sm text-white/40 mb-2">{spec.label}</div>
                  <div className="text-lg font-semibold text-white">{spec.value}</div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'comments' && (
            <div className="space-y-6">
              {/* Comment Input */}
              {user && (
                <div className="bg-[#1A1A23]/50 rounded-lg p-6 backdrop-blur-sm border border-white/[0.05]">
                  <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Yorumunuzu yazın..."
                    className="mb-4 bg-[#1A1A23] border-white/[0.05] text-white"
                  />
                  <div className="flex justify-end">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleCommentSubmit}
                      className="px-4 py-2 bg-violet-500 text-white rounded-lg text-sm font-medium hover:bg-violet-600 transition-colors"
                    >
                      Yorum Yap
                    </motion.button>
                  </div>
                </div>
              )}

              {/* Comments List */}
              {isLoading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                </div>
              ) : comments.length > 0 ? (
                comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-[#1A1A23]/50 rounded-lg p-6 backdrop-blur-sm border border-white/[0.05]"
                  >
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage
                          src={comment.profiles?.avatar_url || ""}
                          alt={comment.profiles?.username || "User"}
                        />
                        <AvatarFallback>
                          {comment.profiles?.username?.[0]?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <span className="font-medium text-white">
                              {comment.profiles?.username || "Anonim"}
                            </span>
                            <span className="text-sm text-white/40 ml-2">
                              {formatDistanceToNow(new Date(comment.created_at), {
                                addSuffix: true,
                                locale: tr
                              })}
                            </span>
                          </div>
                          {user?.id === comment.user_id && (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => deleteComment(comment.id)}
                              className="text-white/40 hover:text-red-400"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </motion.button>
                          )}
                        </div>
                        <p className="text-white/80">{comment.content}</p>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-8 text-white/40">
                  Henüz yorum yapılmamış. İlk yorumu siz yapın!
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 