"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSupabase } from "@/components/providers/supabase-provider";
import { toast } from "sonner";
import { VerifyOtpParams, EmailOtpType } from "@supabase/supabase-js";

export default function AuthCallbackPage() {
  const { supabase } = useSupabase();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const verifyOtp = async () => {
      const token_hash = searchParams.get("token_hash");
      const type = searchParams.get("type") as EmailOtpType | null;
      const next = searchParams.get("next") ?? "/";

      if (token_hash && type) {
        const params: VerifyOtpParams = {
          type,
          token_hash,
        };

        const { error } = await supabase.auth.verifyOtp(params);

        if (!error) {
          toast.success("E-posta adresiniz doğrulandı");
          router.push(next);
        } else {
          toast.error("Doğrulama işlemi başarısız oldu");
          router.push("/auth");
        }
      }
    };

    verifyOtp();
  }, [router, searchParams, supabase.auth]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4">
          <div className="w-full h-full border-4 border-t-violet-500 border-r-violet-500 border-b-violet-200 border-l-violet-200 rounded-full animate-spin" />
        </div>
        <h1 className="text-xl font-semibold text-white mb-2">E-posta Doğrulanıyor</h1>
        <p className="text-white/60">Lütfen bekleyin...</p>
      </div>
    </div>
  );
} 