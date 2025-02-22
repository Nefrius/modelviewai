"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthForm } from '@/components/auth/auth-form';

const formVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.5
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1
  },
  exit: (direction: number) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
    scale: 0.5
  })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export default function AuthPage() {
  const [[mode, direction], setMode] = useState<['signin' | 'signup', number]>(['signin', 0]);
  const [isDragging, setIsDragging] = useState(false);

  const paginate = (newDirection: number) => {
    setMode([mode === 'signin' ? 'signup' : 'signin', newDirection]);
  };

  return (
    <div className="min-h-screen w-full py-32">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4 mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              {mode === 'signin' ? 'Hesabınıza Giriş Yapın' : 'Yeni Hesap Oluşturun'}
            </h1>
            <p className="text-lg text-white/60 max-w-2xl mx-auto">
              {mode === 'signin'
                ? 'AI modellerini kullanmak için giriş yapın'
                : 'AI modellerini kullanmak için ücretsiz hesap oluşturun'}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Auth Form with Animation */}
        <div className="relative h-[420px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={mode}
              custom={direction}
              variants={formVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
                scale: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragStart={() => setIsDragging(true)}
              onDragEnd={(e, { offset, velocity }) => {
                setIsDragging(false);
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full"
            >
              {/* Swipe Indicators */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: isDragging ? 1 : 0 }}
                className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none px-4"
              >
                <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center">
                  <svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </motion.div>

              <AuthForm mode={mode} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mode Toggle with Animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => paginate(mode === 'signin' ? 1 : -1)}
            className="text-white/60 hover:text-violet-400 transition-colors"
          >
            {mode === 'signin'
              ? 'Hesabınız yok mu? Kayıt olun'
              : 'Zaten hesabınız var mı? Giriş yapın'}
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
} 