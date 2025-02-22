'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabase } from '@/components/providers/supabase-provider';

export default function AuthCallbackPage() {
  const { supabase } = useSupabase();
  const router = useRouter();

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const token_hash = searchParams.get('token_hash');
      const type = searchParams.get('type');

      if (token_hash && type) {
        const { error } = await supabase.auth.verifyOtp({
          token_hash,
          type: type as any,
        });

        if (!error) {
          router.push('/');
        }
      }
    };

    handleEmailConfirmation();
  }, [supabase, router]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-32">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />

      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-violet-500/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-violet-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            E-posta Doğrulanıyor
          </h2>
          <p className="text-white/60">
            Lütfen bekleyin, e-posta adresiniz doğrulanıyor...
          </p>
        </div>
      </div>
    </div>
  );
} 