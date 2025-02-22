"use client";

import { useState, useEffect } from "react";
import { useSupabase } from "@/components/providers/supabase-provider";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Image from "next/image";

interface User {
  id: string;
  username: string;
  full_name: string;
  avatar_url: string;
  role: string;
  created_at: string;
}

export default function UsersPage() {
  const { supabase } = useSupabase();
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;
        setUsers(data || []);
      } catch (error) {
        console.error("Kullanıcılar yüklenirken hata:", error);
        toast.error("Kullanıcılar yüklenirken bir hata oluştu");
      } finally {
        setIsLoading(false);
      }
    }

    loadUsers();
  }, [supabase]);

  return (
    <div className="min-h-screen w-full py-32">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-white mb-8"
          >
            Kullanıcılar
          </motion.h1>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500" />
            </div>
          ) : users.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-white/60">Henüz kullanıcı bulunmuyor</p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {users.map((user, index) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-[#1A1A23]/50 rounded-xl p-6 backdrop-blur-sm border border-white/[0.05]"
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-full bg-violet-500/10 flex items-center justify-center overflow-hidden">
                      {user.avatar_url ? (
                        <Image
                          src={user.avatar_url}
                          alt={user.username}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-lg font-bold text-violet-400">
                          {user.username?.[0]?.toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold text-white">
                        {user.full_name || user.username}
                      </h2>
                      <div className="flex items-center gap-3 text-sm">
                        <span className="text-white/60">@{user.username}</span>
                        <span className="px-2 py-0.5 rounded-full bg-violet-500/10 text-violet-400 text-xs">
                          {user.role === "admin" ? "Admin" : "Kullanıcı"}
                        </span>
                      </div>
                    </div>
                    <div className="ml-auto text-sm text-white/40">
                      {new Date(user.created_at).toLocaleDateString("tr-TR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 