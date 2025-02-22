"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useSupabase } from "@/components/providers/supabase-provider";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  email: string;
  role: string;
  created_at: string;
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export default function AdminPage() {
  const { user } = useAuth();
  const { supabase } = useSupabase();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: ""
  });

  const checkAdminStatus = useCallback(async () => {
    try {
      if (!user) {
        toast.error("Lütfen giriş yapın");
        router.push("/");
        return;
      }

      if (user.email !== "nefriusbuss@gmail.com") {
        toast.error("Bu sayfaya erişim yetkiniz yok");
        router.push("/");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        const { error: insertError } = await supabase
          .from("profiles")
          .insert({
            id: user.id,
            email: user.email,
            role: "admin",
            username: user.email?.split('@')[0],
            updated_at: new Date().toISOString(),
            created_at: new Date().toISOString()
          });

        if (insertError) {
          console.error("Profil oluşturulurken hata:", insertError);
          toast.error("Profil oluşturulamadı");
          router.push("/");
          return;
        }
      } else if (profile && profile.role !== "admin") {
        const { error: updateError } = await supabase
          .from("profiles")
          .update({ 
            role: "admin",
            updated_at: new Date().toISOString()
          })
          .eq('id', user.id);

        if (updateError) {
          console.error("Profil güncellenirken hata:", updateError);
          toast.error("Profil güncellenemedi");
          router.push("/");
          return;
        }
      }

      toast.success("Admin paneline hoş geldiniz");

    } catch (error) {
      console.error("Admin kontrolü sırasında hata:", error);
      toast.error("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
      router.push("/");
    }
  }, [user, supabase, router]);

  const loadUsers = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Kullanıcılar yüklenirken hata:", error);
        return;
      }
      setUsers(data || []);
    } catch (error) {
      console.error("Kullanıcılar yüklenirken hata:", error);
      toast.error("Kullanıcılar yüklenirken bir hata oluştu");
    }
  }, [supabase]);

  const loadAnnouncements = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from("announcements")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Duyurular yüklenirken hata:", error);
        return;
      }
      setAnnouncements(data || []);
    } catch (error) {
      console.error("Duyurular yüklenirken hata:", error);
      toast.error("Duyurular yüklenirken bir hata oluştu");
    }
  }, [supabase]);

  useEffect(() => {
    if (!user) {
      router.push("/");
      return;
    }

    checkAdminStatus();
    loadUsers();
    loadAnnouncements();
  }, [user, router, checkAdminStatus, loadUsers, loadAnnouncements]);

  async function createAnnouncement() {
    try {
      if (!newAnnouncement.title || !newAnnouncement.content) {
        toast.error("Lütfen başlık ve içerik alanlarını doldurun");
        return;
      }

      const { error } = await supabase
        .from("announcements")
        .insert([newAnnouncement]);

      if (error) throw error;

      toast.success("Duyuru başarıyla oluşturuldu");
      setNewAnnouncement({ title: "", content: "" });
      loadAnnouncements();
    } catch (error) {
      console.error("Duyuru oluşturulurken hata:", error);
      toast.error("Duyuru oluşturulurken bir hata oluştu");
    }
  }

  async function deleteAnnouncement(id: string) {
    try {
      const { error } = await supabase
        .from("announcements")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast.success("Duyuru başarıyla silindi");
      loadAnnouncements();
    } catch (error) {
      console.error("Duyuru silinirken hata:", error);
      toast.error("Duyuru silinirken bir hata oluştu");
    }
  }

  async function updateUserRole(userId: string, newRole: string) {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ role: newRole })
        .eq("id", userId);

      if (error) throw error;

      toast.success("Kullanıcı rolü güncellendi");
      loadUsers();
    } catch (error) {
      console.error("Rol güncellenirken hata:", error);
      toast.error("Rol güncellenirken bir hata oluştu");
    }
  }

  return (
    <div className="min-h-screen w-full py-32">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />

      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-white mb-8"
          >
            Admin Paneli
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Kullanıcı Yönetimi */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#1A1A23]/50 rounded-xl p-6 backdrop-blur-sm border border-white/[0.05]"
            >
              <h2 className="text-xl font-semibold text-white mb-4">
                Kullanıcı Yönetimi
              </h2>
              <div className="space-y-4">
                {users.map((user) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-[#1A1A23] rounded-lg p-4 border border-white/[0.05]"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white/90">{user.email}</p>
                        <p className="text-sm text-white/50">
                          Kayıt: {new Date(user.created_at).toLocaleDateString("tr-TR")}
                        </p>
                      </div>
                      <select
                        value={user.role}
                        onChange={(e) => updateUserRole(user.id, e.target.value)}
                        className="bg-[#0A0A0F] text-white border border-white/[0.05] rounded-lg px-3 py-1.5"
                      >
                        <option value="user">Kullanıcı</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Duyuru Oluşturma */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#1A1A23]/50 rounded-xl p-6 backdrop-blur-sm border border-white/[0.05]"
            >
              <h2 className="text-xl font-semibold text-white mb-4">
                Duyuru Oluştur
              </h2>
              <div className="space-y-4">
                <input
                  type="text"
                  value={newAnnouncement.title}
                  onChange={(e) => setNewAnnouncement(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Duyuru Başlığı"
                  className="w-full bg-[#0A0A0F] text-white border border-white/[0.05] rounded-lg px-4 py-2"
                />
                <textarea
                  value={newAnnouncement.content}
                  onChange={(e) => setNewAnnouncement(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Duyuru İçeriği"
                  rows={4}
                  className="w-full bg-[#0A0A0F] text-white border border-white/[0.05] rounded-lg px-4 py-2"
                />
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={createAnnouncement}
                  className="w-full px-4 py-2 bg-violet-500 text-white rounded-lg hover:bg-violet-600 transition-colors"
                >
                  Duyuru Oluştur
                </motion.button>
              </div>

              <div className="mt-8 space-y-4">
                <h3 className="text-lg font-medium text-white">Mevcut Duyurular</h3>
                {announcements.map((announcement) => (
                  <motion.div
                    key={announcement.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-[#1A1A23] rounded-lg p-4 border border-white/[0.05]"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-white/90 font-medium">
                          {announcement.title}
                        </h4>
                        <p className="text-white/60 text-sm mt-1">
                          {announcement.content}
                        </p>
                        <p className="text-white/40 text-xs mt-2">
                          {new Date(announcement.created_at).toLocaleDateString("tr-TR")}
                        </p>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteAnnouncement(announcement.id)}
                        className="text-red-400 hover:text-red-500"
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
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
} 