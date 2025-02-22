"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
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
            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative bg-black/40 border border-white/[0.1] rounded-xl p-8 backdrop-blur-sm text-center">
              {/* 404 Icon */}
              <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-violet-500/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              {/* 404 Title */}
              <h2 className="text-2xl font-bold text-white mb-2">
                Sayfa Bulunamadı
              </h2>

              {/* 404 Description */}
              <p className="text-white/60 mb-6">
                Aradığınız sayfa mevcut değil veya taşınmış olabilir.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2 rounded-lg bg-violet-500 text-white font-medium hover:bg-violet-600 transition-colors"
                  >
                    Ana Sayfaya Dön
                  </motion.button>
                </Link>
                <Link href="/models">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-2 rounded-lg bg-white/5 text-white/70 font-medium border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    Modelleri Keşfet
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 