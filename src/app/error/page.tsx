"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

function ErrorContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  return (
    <div className="text-center">
      <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-red-500/10 flex items-center justify-center">
        <svg
          className="w-12 h-12 text-red-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h1 className="text-2xl font-bold text-white mb-4">
        {error || "Bir Hata Oluştu"}
      </h1>
      <p className="text-white/60 mb-8">
        İşlem sırasında beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.
      </p>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => router.push("/")}
        className="px-6 py-3 rounded-lg bg-violet-500 text-white font-medium hover:bg-violet-600 transition-colors"
      >
        Ana Sayfaya Dön
      </motion.button>
    </div>
  );
}

export default function ErrorPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center py-32">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />

      <div className="container mx-auto px-4">
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
          <ErrorContent />
        </Suspense>
      </div>
    </div>
  );
} 