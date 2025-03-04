"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSupabase } from "@/components/providers/supabase-provider";
import { toast } from "sonner";
import { 
  VerifyOtpParams, 
  EmailOtpType,
  AuthResponse
} from "@supabase/supabase-js";

function CallbackContent() {
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

        const { data, error }: AuthResponse = await supabase.auth.verifyOtp(params);

        if (!error && data.session) {
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
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4">
        <div className="w-full h-full border-4 border-t-violet-500 border-r-violet-500 border-b-violet-200 border-l-violet-200 rounded-full animate-spin" />
      </div>
      <h1 className="text-xl font-semibold text-white mb-2">E-posta Doğrulanıyor</h1>
      <p className="text-white/60">Lütfen bekleyin...</p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Suspense
        fallback={
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4">
              <div className="w-full h-full border-4 border-t-violet-500 border-r-violet-500 border-b-violet-200 border-l-violet-200 rounded-full animate-spin" />
            </div>
            <h1 className="text-xl font-semibold text-white mb-2">Yükleniyor</h1>
            <p className="text-white/60">Lütfen bekleyin...</p>
          </div>
        }
      >
        <CallbackContent />
      </Suspense>
    </div>
  );
} 