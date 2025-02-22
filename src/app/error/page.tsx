"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

const ERROR_MESSAGES: { [key: string]: string } = {
  'access_denied': 'Erişim reddedildi',
  'otp_expired': 'Doğrulama kodunun süresi doldu',
  'invalid_request': 'Geçersiz istek',
  'default': 'Bir hata oluştu'
};

const ERROR_DESCRIPTIONS: { [key: string]: string } = {
  'otp_expired': 'E-posta doğrulama bağlantısının süresi dolmuş veya geçersiz.',
  'access_denied': 'Bu işlemi gerçekleştirmek için yetkiniz bulunmuyor.',
  'invalid_request': 'Geçersiz veya hatalı bir istek yapıldı.',
  'default': 'Beklenmeyen bir hata oluştu.'
};

export default function ErrorPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState(5);

  const errorCode = searchParams.get('error_code') || searchParams.get('error') || 'default';
  const errorMessage = ERROR_MESSAGES[errorCode] || ERROR_MESSAGES.default;
  const errorDescription = searchParams.get('error_description') || ERROR_DESCRIPTIONS[errorCode] || ERROR_DESCRIPTIONS.default;

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      router.push('/auth');
    }
  }, [countdown, router]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center py-32">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-violet-500/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-black/40 border border-white/[0.1] rounded-xl p-8 backdrop-blur-sm text-center">
              {/* Error Icon */}
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>

              {/* Error Title */}
              <h2 className="text-2xl font-bold text-white mb-2">
                {errorMessage}
              </h2>

              {/* Error Description */}
              <p className="text-white/60 mb-6">
                {errorDescription}
              </p>

              {/* Countdown */}
              <p className="text-sm text-white/40 mb-6">
                {countdown} saniye içinde giriş sayfasına yönlendirileceksiniz
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/auth">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2 rounded-lg bg-violet-500 text-white font-medium hover:bg-violet-600 transition-colors"
                  >
                    Giriş Sayfasına Dön
                  </motion.button>
                </Link>
                <Link href="/">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2 rounded-lg bg-white/5 text-white/70 font-medium border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    Ana Sayfaya Git
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <motion.div
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 5, ease: "linear" }}
            className="h-1 bg-violet-500/50 rounded-full mt-6"
          />
        </motion.div>
      </div>
    </div>
  );
} 