"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center py-32">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />

      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="w-24 h-24 mx-auto rounded-full bg-violet-500/10 flex items-center justify-center">
              <svg
                className="w-12 h-12 text-violet-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            <div>
              <h1 className="text-4xl font-bold text-white mb-4">
                Sayfa Bulunamadı
              </h1>
              <p className="text-lg text-white/60">
                Aradığınız sayfa mevcut değil veya taşınmış olabilir.
              </p>
            </div>

            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 rounded-lg bg-violet-500 text-white font-medium hover:bg-violet-600 transition-colors"
              >
                Ana Sayfaya Dön
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 