"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useSupabase } from "@/components/providers/supabase-provider";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion, Variants } from "framer-motion";
import { toast } from "sonner";
import { useSoundEffects } from "@/hooks/use-sound-effects";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const formControlVariants: Variants = {
  hidden: { 
    opacity: 0,
    x: -20
  },
  visible: { 
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export default function SettingsPage() {
  const { user } = useAuth();
  const { supabase } = useSupabase();
  const { playWooshSound } = useSoundEffects();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    bio: "",
    website: "",
    avatarUrl: ""
  });

  // Profil verilerini yükle
  useEffect(() => {
    async function loadProfile() {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) throw error;

        if (data) {
          setFormData({
            username: data.username || "",
            fullName: data.full_name || "",
            email: data.email || "",
            bio: data.bio || "",
            website: data.website || "",
            avatarUrl: data.avatar_url || ""
          });
        }
      } catch (error) {
        console.error('Profil yüklenirken hata:', error);
        toast.error('Profil bilgileri yüklenemedi');
      }
    }

    loadProfile();
  }, [user, supabase]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) return;

    playWooshSound();
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          username: formData.username,
          full_name: formData.fullName,
          email: formData.email,
          bio: formData.bio,
          website: formData.website,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) throw error;

      toast.success('Profil güncellendi');
    } catch (error) {
      console.error('Profil güncellenirken hata:', error);
      toast.error('Profil güncellenemedi');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDeleteAccount = async () => {
    if (!user || !confirm('Hesabınızı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.')) return;

    playWooshSound();
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.admin.deleteUser(user.id);
      if (error) throw error;

      toast.success('Hesabınız silindi');
      // Kullanıcıyı ana sayfaya yönlendir
      window.location.href = '/';
    } catch (error) {
      console.error('Hesap silinirken hata:', error);
      toast.error('Hesap silinemedi');
    } finally {
      setIsLoading(false);
    }
  };

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
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen w-full py-32"
    >
      {/* Background Glow */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" 
      />

      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="text-3xl font-bold text-white mb-8"
          >
            Hesap Ayarları
          </motion.h1>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* Profil Bölümü */}
            <motion.div 
              variants={itemVariants}
              className="bg-[#1A1A23]/50 rounded-xl p-6 backdrop-blur-sm border border-white/[0.05]"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Profil</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <motion.div 
                  variants={formControlVariants}
                  className="flex items-center gap-4 mb-6"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Avatar className="h-20 w-20">
                      <AvatarImage src={formData.avatarUrl} />
                      <AvatarFallback>
                        {formData.username?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    className="px-4 py-2 bg-white/5 text-white/80 rounded-lg text-sm transition-colors"
                  >
                    Fotoğraf Değiştir
                  </motion.button>
                </motion.div>

                <div className="grid grid-cols-2 gap-4">
                  <motion.div variants={formControlVariants}>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      Kullanıcı Adı
                    </label>
                    <Input
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      className="bg-[#1A1A23] border-white/[0.05] text-white"
                      placeholder="Kullanıcı adınız"
                    />
                  </motion.div>
                  <motion.div variants={formControlVariants}>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      Ad Soyad
                    </label>
                    <Input
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="bg-[#1A1A23] border-white/[0.05] text-white"
                      placeholder="Ad ve soyadınız"
                    />
                  </motion.div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">
                    E-posta
                  </label>
                  <Input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-[#1A1A23] border-white/[0.05] text-white"
                    placeholder="E-posta adresiniz"
                    type="email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">
                    Hakkımda
                  </label>
                  <Textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    className="bg-[#1A1A23] border-white/[0.05] text-white"
                    placeholder="Kendinizden bahsedin"
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white/60 mb-2">
                    Website
                  </label>
                  <Input
                    name="website"
                    value={formData.website}
                    onChange={handleInputChange}
                    className="bg-[#1A1A23] border-white/[0.05] text-white"
                    placeholder="Website adresiniz"
                    type="url"
                  />
                </div>

                <motion.div 
                  variants={formControlVariants}
                  className="flex justify-end"
                >
                  <motion.button
                    whileHover={{ scale: 1.02, backgroundColor: "rgb(124 58 237)" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 bg-violet-500 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>

            {/* Bildirim Tercihleri */}
            <motion.div 
              variants={itemVariants}
              className="bg-[#1A1A23]/50 rounded-xl p-6 backdrop-blur-sm border border-white/[0.05]"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Bildirim Tercihleri</h2>
              <div className="space-y-4">
                {["Yeni yorum bildirimleri", "Beğeni bildirimleri", "Yeni model bildirimleri"].map((text, index) => (
                  <motion.label 
                    key={text}
                    variants={formControlVariants}
                    custom={index}
                    className="flex items-center gap-3"
                  >
                    <motion.input
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      type="checkbox"
                      className="rounded border-white/[0.05] bg-[#1A1A23]"
                    />
                    <span className="text-white/80">{text}</span>
                  </motion.label>
                ))}
              </div>
            </motion.div>

            {/* Hesap Silme */}
            <motion.div 
              variants={itemVariants}
              className="bg-[#1A1A23]/50 rounded-xl p-6 backdrop-blur-sm border border-white/[0.05]"
            >
              <h2 className="text-xl font-semibold text-white mb-6">Hesap Silme</h2>
              <p className="text-white/60 mb-4">
                Hesabınızı sildiğinizde, tüm verileriniz kalıcı olarak silinecektir. Bu işlem geri alınamaz.
              </p>
              <motion.button
                whileHover={{ 
                  scale: 1.02, 
                  backgroundColor: "rgba(239, 68, 68, 0.2)",
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
                onClick={handleDeleteAccount}
                disabled={isLoading}
                className="px-6 py-2 bg-red-500/10 text-red-400 rounded-lg font-medium transition-colors disabled:opacity-50"
              >
                Hesabımı Sil
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
} 