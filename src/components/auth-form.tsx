"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { motion } from "framer-motion";

export function AuthForm() {
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode") || "signin";
  const { signIn, signUp } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error("Lütfen tüm alanları doldurun");
      return;
    }

    setLoading(true);
    try {
      const { error } = mode === "signin" 
        ? await signIn(formData.email, formData.password)
        : await signUp(formData.email, formData.password);

      if (!error) {
        setFormData({ email: "", password: "" });
      }
    } catch (error) {
      console.error("Form gönderme hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
      <Card className="p-6 bg-black/40 border border-white/[0.1] backdrop-blur-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">E-posta</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="ornek@email.com"
              className="bg-white/5 border-white/10"
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Şifre</Label>
            <Input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="bg-white/5 border-white/10"
              disabled={loading}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-violet-500 hover:bg-violet-600"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>İşleniyor...</span>
              </div>
            ) : mode === "signin" ? (
              "Giriş Yap"
            ) : (
              "Kayıt Ol"
            )}
          </Button>
        </form>
      </Card>
    </motion.div>
  );
} 