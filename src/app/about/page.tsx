"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useSoundEffects } from "@/hooks/use-sound-effects";

const TECH_STACK = [
  {
    category: "Frontend",
    icon: "https://api.iconify.design/fluent:app-store-24-filled.svg",
    technologies: [
      { name: "Next.js 14", description: "React Framework", icon: "https://api.iconify.design/logos:nextjs-icon.svg" },
      { name: "TypeScript", description: "Tip Güvenli JavaScript", icon: "https://api.iconify.design/logos:typescript-icon.svg" },
      { name: "Tailwind CSS", description: "Utility-First CSS Framework", icon: "https://api.iconify.design/logos:tailwindcss-icon.svg" },
      { name: "Framer Motion", description: "Animasyon Kütüphanesi", icon: "https://api.iconify.design/logos:framer.svg" },
      { name: "Shadcn UI", description: "Modern UI Komponentleri", icon: "https://api.iconify.design/fluent:dark-theme-24-filled.svg" },
      { name: "Radix UI", description: "Headless UI Primitives", icon: "https://api.iconify.design/fluent:box-24-filled.svg" }
    ]
  },
  {
    category: "Backend",
    icon: "https://api.iconify.design/fluent:server-24-filled.svg",
    technologies: [
      { name: "Supabase", description: "Backend as a Service", icon: "https://api.iconify.design/logos:supabase-icon.svg" },
      { name: "PostgreSQL", description: "Veritabanı", icon: "https://api.iconify.design/logos:postgresql.svg" },
      { name: "Row Level Security", description: "Veri Güvenliği", icon: "https://api.iconify.design/fluent:shield-24-filled.svg" }
    ]
  },
  {
    category: "Deployment & Analytics",
    icon: "https://api.iconify.design/fluent:rocket-24-filled.svg",
    technologies: [
      { name: "Vercel", description: "Hosting & Deployment", icon: "https://api.iconify.design/logos:vercel-icon.svg" },
      { name: "Google Analytics", description: "Kullanıcı Analizi", icon: "https://api.iconify.design/logos:google-analytics.svg" },
      { name: "Vercel Analytics", description: "Performans İzleme", icon: "https://api.iconify.design/fluent:data-trending-24-filled.svg" }
    ]
  }
];

const PROJECT_STATS = [
  { 
    label: "Toplam Dosya", 
    value: "50+",
    icon: "https://api.iconify.design/fluent:folder-24-filled.svg",
    color: "from-blue-500/20 to-violet-500/20"
  },
  { 
    label: "Kod Satırı", 
    value: "5000+",
    icon: "https://api.iconify.design/fluent:code-24-filled.svg",
    color: "from-violet-500/20 to-fuchsia-500/20"
  },
  { 
    label: "Komponent", 
    value: "30+",
    icon: "https://api.iconify.design/fluent:cube-24-filled.svg",
    color: "from-fuchsia-500/20 to-pink-500/20"
  },
  { 
    label: "AI Model", 
    value: "50+",
    icon: "https://api.iconify.design/fluent:brain-circuit-24-filled.svg",
    color: "from-pink-500/20 to-rose-500/20"
  }
];

export default function AboutPage() {
  const { playWooshSound } = useSoundEffects();

  return (
    <div className="min-h-screen w-full py-32">
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Geliştirici Bilgileri */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 p-[2px]"
            >
              <div className="w-full h-full rounded-full bg-[#1A1A23] flex items-center justify-center">
                <Image
                  src="https://api.iconify.design/fluent:person-24-filled.svg"
                  alt="Developer"
                  width={32}
                  height={32}
                  className="w-8 h-8"
                  style={{ filter: 'invert(1)' }}
                />
              </div>
            </motion.div>

            <h1 className="text-4xl font-bold text-white mb-4">
              ModelView AI Hakkında
            </h1>
            <p className="text-lg text-white/60 mb-8">
              Modern teknolojiler ile geliştirilmiş yapay zeka model kataloğu
            </p>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-[#1A1A23]/50 rounded-xl p-8 backdrop-blur-sm border border-white/[0.05] text-left relative group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-3">
                <div className="h-8 w-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                  <Image
                    src="https://api.iconify.design/fluent:person-info-24-filled.svg"
                    alt="Developer Info"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                    style={{ filter: 'invert(1)' }}
                  />
                </div>
                Geliştirici
              </h2>

              <div className="space-y-4">
                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3"
                >
                  <div className="h-6 w-6 rounded-lg bg-violet-500/10 flex items-center justify-center">
                    <Image
                      src="https://api.iconify.design/fluent:person-24-filled.svg"
                      alt="Name"
                      width={16}
                      height={16}
                      className="w-4 h-4"
                      style={{ filter: 'invert(1)' }}
                    />
                  </div>
                  <p className="text-white/80">
                    <span className="text-violet-400">Ad Soyad:</span> Enes Baş
                  </p>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3"
                >
                  <div className="h-6 w-6 rounded-lg bg-violet-500/10 flex items-center justify-center">
                    <Image
                      src="https://api.iconify.design/fluent:calendar-24-filled.svg"
                      alt="Age"
                      width={16}
                      height={16}
                      className="w-4 h-4"
                      style={{ filter: 'invert(1)' }}
                    />
                  </div>
                  <p className="text-white/80">
                    <span className="text-violet-400">Yaş:</span> 16
                  </p>
                </motion.div>

                <motion.div 
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-3"
                >
                  <div className="h-6 w-6 rounded-lg bg-violet-500/10 flex items-center justify-center">
                    <Image
                      src="https://api.iconify.design/fluent:link-24-filled.svg"
                      alt="Portfolio"
                      width={16}
                      height={16}
                      className="w-4 h-4"
                      style={{ filter: 'invert(1)' }}
                    />
                  </div>
                  <p className="text-white/80">
                    <span className="text-violet-400">Portfolio:</span>{" "}
                    <Link 
                      href="https://enesbas.vercel.app" 
                      target="_blank"
                      className="text-violet-400 hover:text-violet-300 transition-colors"
                      onClick={() => playWooshSound()}
                    >
                      enesbas.vercel.app
                    </Link>
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* İstatistikler */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
          >
            {PROJECT_STATS.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                <div className="relative bg-[#1A1A23]/50 rounded-xl p-6 backdrop-blur-sm border border-white/[0.05] text-center">
                  <div className="h-12 w-12 mx-auto mb-3 rounded-lg bg-violet-500/10 flex items-center justify-center">
                    <Image
                      src={stat.icon}
                      alt={stat.label}
                      width={24}
                      height={24}
                      className="w-6 h-6"
                      style={{ filter: 'invert(1)' }}
                    />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-sm text-white/60">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Teknoloji Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {TECH_STACK.map((stack, stackIndex) => (
              <motion.div
                key={stackIndex}
                whileHover={{ scale: 1.02 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative bg-[#1A1A23]/50 rounded-xl p-6 backdrop-blur-sm border border-white/[0.05]">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                      <Image
                        src={stack.icon}
                        alt={stack.category}
                        width={24}
                        height={24}
                        className="w-6 h-6"
                        style={{ filter: 'invert(1)' }}
                      />
                    </div>
                    <h2 className="text-xl font-semibold text-white">{stack.category}</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {stack.technologies.map((tech, techIndex) => (
                      <motion.div
                        key={techIndex}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1 * techIndex }}
                        whileHover={{ scale: 1.05 }}
                        className="bg-[#0A0A0F] rounded-lg p-4 border border-white/[0.05] relative group/tech"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 rounded-lg opacity-0 group-hover/tech:opacity-100 transition-opacity duration-300" />
                        <div className="relative">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="h-8 w-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                              <Image
                                src={tech.icon}
                                alt={tech.name}
                                width={20}
                                height={20}
                                className="w-5 h-5"
                                style={{ filter: 'invert(1)' }}
                              />
                            </div>
                            <div className="font-medium text-white">{tech.name}</div>
                          </div>
                          <div className="text-sm text-white/60">{tech.description}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Proje Yapısı */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
            className="mt-8 relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative bg-[#1A1A23]/50 rounded-xl p-6 backdrop-blur-sm border border-white/[0.05]">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-lg bg-violet-500/10 flex items-center justify-center">
                  <Image
                    src="https://api.iconify.design/fluent:folder-open-24-filled.svg"
                    alt="Project Structure"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                    style={{ filter: 'invert(1)' }}
                  />
                </div>
                <h2 className="text-xl font-semibold text-white">Proje Yapısı</h2>
              </div>

              <div className="space-y-4">
                {[
                  { path: "📁 src/app", desc: "Next.js App Router sayfaları", icon: "https://api.iconify.design/fluent:app-folder-24-filled.svg" },
                  { path: "📁 src/components", desc: "Yeniden kullanılabilir UI komponentleri", icon: "https://api.iconify.design/fluent:box-multiple-24-filled.svg" },
                  { path: "📁 src/lib", desc: "Utility fonksiyonları ve yapılandırmalar", icon: "https://api.iconify.design/fluent:library-24-filled.svg" },
                  { path: "📁 src/hooks", desc: "Custom React hooks", icon: "https://api.iconify.design/fluent:hook-right-24-filled.svg" },
                  { path: "📁 src/context", desc: "React context providers", icon: "https://api.iconify.design/fluent:share-24-filled.svg" },
                  { path: "📁 public", desc: "Statik dosyalar ve görseller", icon: "https://api.iconify.design/fluent:image-24-filled.svg" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-3 group/item"
                  >
                    <div className="h-8 w-8 rounded-lg bg-violet-500/10 flex items-center justify-center">
                      <Image
                        src={item.icon}
                        alt={item.path}
                        width={20}
                        height={20}
                        className="w-5 h-5"
                        style={{ filter: 'invert(1)' }}
                      />
                    </div>
                    <p className="text-white/80">
                      <span className="text-violet-400 group-hover/item:text-violet-300 transition-colors">{item.path}:</span>{" "}
                      {item.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 