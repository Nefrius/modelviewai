"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useSupabase } from "@/components/providers/supabase-provider";
import { motion } from "framer-motion";
import Image from "next/image";
import { toast } from "sonner";

interface Profile {
  username: string;
  full_name: string;
  bio: string;
  avatar_url: string;
}

export default function ProfilePage() {
  const { user } = useAuth();
  const { supabase } = useSupabase();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (error) {
        console.error("Profil yüklenirken hata:", error);
        toast.error("Profil bilgileri yüklenemedi");
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, [user, supabase]);

  if (!user) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Giriş Yapılmadı</h1>
          <p className="text-white/60">Bu sayfayı görüntülemek için giriş yapmalısınız.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full py-32">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />

      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-white mb-8"
          >
            Profilim
          </motion.h1>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500" />
            </div>
          ) : profile ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1A1A23]/50 rounded-xl p-6 backdrop-blur-sm border border-white/[0.05]"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-20 w-20 rounded-full bg-violet-500/10 flex items-center justify-center overflow-hidden">
                  {profile.avatar_url ? (
                    <Image
                      src={profile.avatar_url}
                      alt={profile.username}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-violet-400">
                      {profile.username?.[0]?.toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">
                    {profile.full_name || profile.username}
                  </h2>
                  <p className="text-white/60">@{profile.username}</p>
                </div>
              </div>

              {profile.bio && (
                <p className="text-white/70 mb-6">
                  {profile.bio}
                </p>
              )}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <p className="text-white/60">Profil bilgileri bulunamadı.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 