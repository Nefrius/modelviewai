"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useFavorites } from "@/hooks/use-favorites";
import { useComments } from "@/hooks/use-comments";
import { useAuth } from "@/hooks/use-auth";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { MODELS } from "../page";

interface Model {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  provider: string;
  website: string;
  pricing: string;
  features: string[];
    stats: {
    accuracy: string;
    speed: string;
    usage: string;
  };
  badges: string[];
}

interface Comment {
  id: string;
  content: string;
  created_at: string;
  user_id: string;
  profiles: {
    username: string | null;
    avatar_url: string | null;
  } | null;
}

export default function ModelDetailPage() {
  const params = useParams();
  const { user } = useAuth();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { comments, isLoading: isLoadingComments, addComment, deleteComment } = useComments(params.id as string);
  const [newComment, setNewComment] = useState("");

  // Modeli bul
  const model = MODELS.find((m: Model) => m.id === params.id);

  if (!model) {
    return (
      <div className="min-h-screen w-full py-32">
        <div className="container mx-auto px-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Model Bulunamadı</h1>
            <Link href="/models">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg bg-violet-500 text-white font-medium hover:bg-violet-600 transition-colors"
              >
                Modellere Dön
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const handleCommentSubmit = async () => {
    if (!user) {
      toast.error("Yorum yapmak için giriş yapmalısınız");
      return;
    }
    if (!newComment.trim()) {
      toast.error("Yorum boş olamaz");
      return;
    }
    await addComment(newComment);
    setNewComment("");
    toast.success("Yorumunuz eklendi");
  };

  const handleLike = async () => {
    if (!user) {
      toast.error("Beğenmek için giriş yapmalısınız");
      return;
    }
    if (isFavorite(model.id)) {
      await removeFavorite(model.id);
      toast.success("Model favorilerden kaldırıldı");
    } else {
      await addFavorite(model.id);
      toast.success("Model favorilere eklendi");
    }
  };

  return (
    <div className="min-h-screen w-full">
      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.3),transparent)]" />
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        
        {/* Content */}
        <div className="relative container mx-auto px-4 py-20 text-center">
          <Link href="/models">
              <motion.div
              whileHover={{ x: -5 }}
              className="inline-flex items-center gap-2 text-white/60 hover:text-violet-400 mb-8 group transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>Modellere Dön</span>
            </motion.div>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-6"
          >
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-violet-500/20 to-violet-500/5 p-4 backdrop-blur-sm border border-white/[0.05]">
              <Image
                  src={model.icon}
                  alt={model.name}
                width={48}
                height={48}
                className="w-12 h-12"
                  style={{ filter: 'invert(1)' }}
                />
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white">{model.name}</h1>
              <div className="flex items-center justify-center gap-3">
                {model.badges?.map((badge: string) => (
                  <span
                    key={badge}
                    className="px-3 py-1.5 text-sm rounded-full bg-violet-500/10 text-violet-400 border border-violet-500/20"
                  >
                    {badge}
                  </span>
                ))}
                </div>
              <div className="flex items-center justify-center gap-3">
                <span className="px-4 py-2 text-sm rounded-full bg-[#1A1A23] text-white/70 border border-white/[0.05]">
                  {model.category}
                </span>
                <span className={`px-4 py-2 text-sm rounded-full ${
                  model.pricing === "Ücretsiz"
                    ? "bg-green-500/10 text-green-400 border border-green-500/20"
                    : model.pricing === "Ücretli"
                    ? "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                    : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                }`}>
                  {model.pricing}
                </span>
              </div>
            </div>
          </motion.div>
              </div>
            </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Description & Stats */}
          <div className="bg-[#0A0A0F]/95 rounded-2xl border border-white/[0.05] overflow-hidden backdrop-blur-[5px] shadow-xl mb-8">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <p className="text-xl text-white/70">{model.description}</p>
              <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLike}
                  className={`h-12 w-12 rounded-xl flex items-center justify-center transition-colors ${
                    isFavorite(model.id)
                    ? "bg-violet-500 text-white"
                      : "bg-white/5 text-white/40 hover:text-violet-400"
                }`}
              >
                <svg
                    className="w-6 h-6"
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

              <div className="grid grid-cols-3 gap-6">
            {Object.entries(model.stats).map(([key, value]) => (
              <motion.div
                key={key}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative bg-[#1A1A23] rounded-xl p-6 overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                      <div className="text-3xl font-bold text-white group-hover:text-violet-400 transition-colors">
                        {value}
                      </div>
                      <div className="text-sm text-white/40 mt-1">
                  {key === "accuracy" ? "Doğruluk" :
                   key === "speed" ? "Hız" :
                         "Kullanım"}
                </div>
                </div>
              </motion.div>
            ))}
              </div>
            </div>
          </div>

          {/* Features and Provider Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-[#0A0A0F]/95 rounded-2xl border border-white/[0.05] p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Özellikler</h2>
              <div className="grid gap-4">
                {model.features.map((feature: string, index: number) => (
                <motion.div
                  key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 rounded-xl bg-[#1A1A23] border border-white/[0.05] group hover:border-violet-500/20 transition-colors"
                  >
                    <div className="h-3 w-3 rounded-full bg-violet-500/20 group-hover:bg-violet-500 transition-colors" />
                    <span className="text-white/70 group-hover:text-violet-400 transition-colors">{feature}</span>
                </motion.div>
              ))}
            </div>
          </div>

            <div className="bg-[#0A0A0F]/95 rounded-2xl border border-white/[0.05] p-8">
              <h2 className="text-2xl font-semibold text-white mb-6">Sağlayıcı Bilgileri</h2>
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 rounded-xl bg-[#1A1A23] border border-white/[0.05]"
                >
                  <div className="text-sm text-white/40 mb-2">Sağlayıcı</div>
                  <div className="text-xl text-white/90">{model.provider}</div>
                </motion.div>
                
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  href={model.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="group p-6 rounded-xl bg-violet-500/10 border border-violet-500/20 hover:bg-violet-500/20 transition-all">
                    <div className="flex items-center justify-between text-violet-400">
                      <span className="text-lg">Website&apos;yi Ziyaret Et</span>
                      <svg
                        className="w-6 h-6 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                  </div>
                  </div>
                </motion.a>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-[#0A0A0F]/95 rounded-2xl border border-white/[0.05] p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Image
                    src="https://api.iconify.design/fluent:chat-multiple-24-filled.svg"
                    alt="comments"
                    width={28}
                    height={28}
                    className="w-7 h-7"
                    style={{ filter: 'invert(0.4) sepia(1) saturate(3) hue-rotate(220deg)' }}
                  />
                  <h2 className="text-2xl font-semibold text-white">Yorumlar</h2>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
                    <span className="text-sm text-violet-400">{comments.length} yorum</span>
                  </div>
                  {comments.length > 0 && (
                    <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                      <span className="text-sm text-emerald-400">En son {new Date(comments[0]?.created_at).toLocaleDateString("tr-TR", { month: 'short', day: 'numeric' })}</span>
                    </div>
                  )}
                </div>
              </div>
              {!user && (
                <Link href="/auth">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-4 py-2 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20 hover:bg-violet-500/20 transition-all flex items-center gap-2"
                  >
                    <Image
                      src="https://api.iconify.design/fluent:person-add-24-regular.svg"
                      alt="login"
                      width={20}
                      height={20}
                      className="w-5 h-5"
                      style={{ filter: 'invert(0.4) sepia(1) saturate(3) hue-rotate(220deg)' }}
                    />
                    <span>Yorum yapmak için giriş yap</span>
                  </motion.button>
                </Link>
              )}
            </div>
            
            {/* Comment Input */}
            {user && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <div className="flex items-start gap-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="h-12 w-12 rounded-xl bg-violet-500/10 flex items-center justify-center flex-shrink-0 overflow-hidden border border-violet-500/20"
                  >
                    {user.user_metadata?.avatar_url ? (
                      <Image
                        src={user.user_metadata.avatar_url}
                        alt={user.user_metadata?.username || ""}
                        width={48}
                        height={48}
                        className="rounded-xl"
                      />
                    ) : (
                      <span className="text-lg font-medium text-violet-400">
                        {user.email?.[0]?.toUpperCase()}
                      </span>
                    )}
                  </motion.div>
                  <div className="flex-1">
                    <div className="relative">
                      <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Bu model hakkında deneyimlerinizi paylaşın..."
                        className="w-full px-6 py-4 bg-[#1A1A23] border border-white/[0.05] rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50 min-h-[120px] transition-all pr-12"
                      />
                      <div className="absolute right-4 top-4 text-white/20">
                        <Image
                          src="https://api.iconify.design/fluent:emoji-sparkle-24-regular.svg"
                          alt="emoji"
                          width={24}
                          height={24}
                          className="w-6 h-6 opacity-60 hover:opacity-100 cursor-pointer transition-opacity"
                          style={{ filter: 'invert(0.4)' }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-4 text-sm text-white/40">
                        <div className="flex items-center gap-1">
                          <Image
                            src="https://api.iconify.design/fluent:markdown-24-regular.svg"
                            alt="markdown"
                            width={16}
                            height={16}
                            className="w-4 h-4"
                            style={{ filter: 'invert(0.4)' }}
                          />
                          <span>Markdown</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Image
                            src="https://api.iconify.design/fluent:timer-24-regular.svg"
                            alt="timer"
                            width={16}
                            height={16}
                            className="w-4 h-4"
                            style={{ filter: 'invert(0.4)' }}
                          />
                          <span>Otomatik kayıt</span>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleCommentSubmit}
                        className="px-6 py-3 bg-violet-500 text-white rounded-xl hover:bg-violet-600 transition-colors flex items-center gap-2 relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-violet-500 transform translate-x-[-100%] group-hover:translate-x-0 transition-transform" />
                        <Image
                          src="https://api.iconify.design/fluent:send-24-filled.svg"
                          alt="send"
                          width={20}
                          height={20}
                          className="w-5 h-5 relative z-10"
                          style={{ filter: 'invert(1)' }}
                        />
                        <span className="relative z-10">Yorum Yap</span>
                      </motion.button>
                    </div>
                  </div>
              </div>
              </motion.div>
            )}

            {/* Comments List */}
            <div className="space-y-6">
              {isLoadingComments ? (
                <div className="flex items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-500" />
                </div>
              ) : comments.length > 0 ? (
                comments.map((comment: Comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="group p-6 rounded-xl bg-[#1A1A23] border border-white/[0.05] hover:border-violet-500/20 transition-all relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="h-12 w-12 rounded-xl bg-violet-500/10 flex items-center justify-center overflow-hidden border border-violet-500/20"
                          >
                            {comment.profiles?.avatar_url ? (
                              <Image
                                src={comment.profiles.avatar_url}
                                alt={comment.profiles.username || ""}
                                width={48}
                                height={48}
                                className="rounded-xl"
                              />
                            ) : (
                              <span className="text-lg font-medium text-violet-400">
                                {comment.profiles?.username?.[0]?.toUpperCase()}
                              </span>
                            )}
                          </motion.div>
                          <div>
                            <div className="text-lg font-medium text-white group-hover:text-violet-400 transition-colors flex items-center gap-2">
                              {comment.profiles?.username || "Anonim"}
                              {user?.id === comment.user_id && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400">
                                  Yazar
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-3 text-sm text-white/40">
                              <div className="flex items-center gap-1">
                                <Image
                                  src="https://api.iconify.design/fluent:calendar-24-regular.svg"
                                  alt="calendar"
                                  width={16}
                                  height={16}
                                  className="w-4 h-4"
                                  style={{ filter: 'invert(0.4)' }}
                                />
                                <span>
                                  {new Date(comment.created_at).toLocaleDateString("tr-TR", {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                            </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Image
                                  src="https://api.iconify.design/fluent:clock-24-regular.svg"
                                  alt="time"
                                  width={16}
                                  height={16}
                                  className="w-4 h-4"
                                  style={{ filter: 'invert(0.4)' }}
                                />
                                <span>
                                  {new Date(comment.created_at).toLocaleTimeString("tr-TR", {
                                    hour: '2-digit',
                                    minute: '2-digit'
                              })}
                            </span>
                              </div>
                            </div>
                          </div>
                          </div>
                          {user?.id === comment.user_id && (
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => deleteComment(comment.id)}
                            className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-500 p-2 transition-all rounded-lg hover:bg-red-500/10"
                          >
                            <Image
                              src="https://api.iconify.design/fluent:delete-24-filled.svg"
                              alt="delete"
                              width={24}
                              height={24}
                              className="w-6 h-6"
                              style={{ filter: 'invert(0.4) sepia(1) saturate(20) hue-rotate(340deg)' }}
                            />
                            </motion.button>
                          )}
                        </div>
                      <div className="mt-4 text-white/70 text-lg relative">
                        <Image
                          src="https://api.iconify.design/fluent:chat-24-regular.svg"
                          alt="quote"
                          width={24}
                          height={24}
                          className="absolute -left-2 -top-2 w-6 h-6 opacity-10"
                          style={{ filter: 'invert(1)' }}
                        />
                        <p className="pl-6 leading-relaxed">{comment.content}</p>
                      </div>
                      <div className="mt-4 flex items-center gap-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-white/40 hover:text-violet-400 transition-colors flex items-center gap-1 text-sm"
                        >
                          <Image
                            src="https://api.iconify.design/fluent:arrow-reply-24-regular.svg"
                            alt="reply"
                            width={16}
                            height={16}
                            className="w-4 h-4"
                            style={{ filter: 'invert(0.4)' }}
                          />
                          <span>Yanıtla</span>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="text-white/40 hover:text-violet-400 transition-colors flex items-center gap-1 text-sm"
                        >
                          <Image
                            src="https://api.iconify.design/fluent:share-24-regular.svg"
                            alt="share"
                            width={16}
                            height={16}
                            className="w-4 h-4"
                            style={{ filter: 'invert(0.4)' }}
                          />
                          <span>Paylaş</span>
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-violet-500/10 flex items-center justify-center border border-violet-500/20">
                    <Image
                      src="https://api.iconify.design/fluent:chat-bubbles-question-24-regular.svg"
                      alt="no comments"
                      width={40}
                      height={40}
                      className="w-10 h-10"
                      style={{ filter: 'invert(0.4) sepia(1) saturate(3) hue-rotate(220deg)' }}
                    />
                </div>
                  <p className="text-white/40 text-lg font-medium">Henüz yorum yapılmamış</p>
                  <p className="text-white/30 text-sm mt-2 max-w-md mx-auto">
                    Bu model hakkında ilk yorumu siz yapın ve tartışmayı başlatın! Deneyimlerinizi paylaşarak topluluğa katkıda bulunun.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 