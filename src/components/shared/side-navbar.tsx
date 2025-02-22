"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/auth-context";

const MENU_ITEMS = [
  {
    id: 1,
    name: "Ana Sayfa",
    icon: "https://api.iconify.design/fluent:home-24-regular.svg",
    activeIcon: "https://api.iconify.design/fluent:home-24-filled.svg",
    href: "/"
  },
  {
    id: 2,
    name: "AI Modelleri",
    icon: "https://api.iconify.design/fluent:brain-circuit-24-regular.svg",
    activeIcon: "https://api.iconify.design/fluent:brain-circuit-24-filled.svg",
    href: "/models"
  },
  {
    id: 3,
    name: "Kategoriler",
    icon: "https://api.iconify.design/fluent:grid-24-regular.svg",
    activeIcon: "https://api.iconify.design/fluent:grid-24-filled.svg",
    href: "/categories"
  },
  {
    id: 4,
    name: "Favoriler",
    icon: "https://api.iconify.design/fluent:star-24-regular.svg",
    activeIcon: "https://api.iconify.design/fluent:star-24-filled.svg",
    href: "/favorites",
    requiresAuth: true
  },
  {
    id: 5,
    name: "Duyurular",
    icon: "https://api.iconify.design/fluent:megaphone-24-regular.svg",
    activeIcon: "https://api.iconify.design/fluent:megaphone-24-filled.svg",
    href: "/announcements"
  },
  {
    id: 6,
    name: "Ayarlar",
    icon: "https://api.iconify.design/fluent:settings-24-regular.svg",
    activeIcon: "https://api.iconify.design/fluent:settings-24-filled.svg",
    href: "/settings",
    requiresAuth: true
  },
  {
    id: 7,
    name: "Admin Paneli",
    icon: "https://api.iconify.design/fluent:shield-24-regular.svg",
    activeIcon: "https://api.iconify.design/fluent:shield-24-filled.svg",
    href: "/admin",
    requiresAuth: true,
    requiresAdmin: true
  }
];

export function SideNavbar() {
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  return (
    <motion.nav
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed md:left-6 top-0 h-full z-[100] flex items-center pointer-events-none"
    >
      {/* Mobil Navbar */}
      <div className="fixed md:hidden top-4 left-[40%] -translate-x-1/2 flex items-center bg-black/40 border border-white/[0.05] backdrop-blur-md rounded-2xl pointer-events-auto mx-4 w-[calc(100%-6rem)]">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 to-fuchsia-500/10 rounded-2xl opacity-50" />
        
        {/* Sol Ok */}
        <button 
          onClick={() => {
            const container = document.getElementById('mobile-nav-items');
            if (container) {
              container.scrollLeft -= 200;
            }
          }}
          className="flex items-center justify-center w-12 h-12 backdrop-blur-sm"
        >
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center w-8 h-8 rounded-xl bg-white/5 text-white/70 hover:bg-white/10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.div>
        </button>

        {/* Kaydırılabilir Menü */}
        <div 
          id="mobile-nav-items"
          className="flex items-center gap-3 overflow-x-auto px-6 py-2 no-scrollbar scroll-smooth"
          style={{
            msOverflowStyle: 'none',
            scrollbarWidth: 'none'
          }}
        >
          {MENU_ITEMS.filter(item => !item.requiresAuth || user).map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <Link key={item.id} href={item.href}>
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className={`relative flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl transition-colors ${
                    isActive 
                      ? "bg-white/[0.15] text-violet-400" 
                      : "hover:bg-white/[0.05] text-white/70"
                  }`}
                >
                  <Image
                    src={isActive ? item.activeIcon : item.icon}
                    alt={item.name}
                    width={16}
                    height={16}
                    className="w-4 h-4"
                    style={{ filter: 'invert(1)' }}
                  />
                </motion.div>
              </Link>
            );
          })}

          {/* Auth Buton */}
          {user ? (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => signOut()}
              className="relative flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl hover:bg-white/[0.05] text-white/70 transition-colors"
            >
              <Image
                src="https://api.iconify.design/fluent:sign-out-24-regular.svg"
                alt="Çıkış Yap"
                width={16}
                height={16}
                className="w-4 h-4"
                style={{ filter: 'invert(1)' }}
              />
            </motion.button>
          ) : (
            <Link href="/auth">
              <motion.div
                whileTap={{ scale: 0.95 }}
                className="relative flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl hover:bg-white/[0.05] text-white/70 transition-colors"
              >
                <Image
                  src="https://api.iconify.design/fluent:person-24-regular.svg"
                  alt="Giriş Yap"
                  width={16}
                  height={16}
                  className="w-4 h-4"
                  style={{ filter: 'invert(1)' }}
                />
              </motion.div>
            </Link>
          )}
        </div>

        {/* Sağ Ok */}
        <button 
          onClick={() => {
            const container = document.getElementById('mobile-nav-items');
            if (container) {
              container.scrollLeft += 200;
            }
          }}
          className="flex items-center justify-center w-12 h-12 backdrop-blur-sm"
        >
          <motion.div
            whileTap={{ scale: 0.9 }}
            className="flex items-center justify-center w-8 h-8 rounded-xl bg-white/5 text-white/70 hover:bg-white/10"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        </button>
      </div>

      {/* Desktop Navbar */}
      <div className="relative hidden md:flex flex-col p-2.5 bg-black/40 border border-white/[0.05] backdrop-blur-md rounded-2xl pointer-events-auto">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 to-fuchsia-500/10 rounded-2xl opacity-50" />
        
        {MENU_ITEMS.filter(item => !item.requiresAuth || user).map((item, index) => {
          const isActive = pathname === item.href;
          
          return (
            <div key={item.id} className="relative group">
              {/* Aktif gösterge çizgisi */}
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-5 bg-violet-500 rounded-full"
                  initial={false}
                />
              )}

              <Link href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative flex items-center justify-center w-11 h-11 my-1 rounded-xl transition-colors ${
                    isActive 
                      ? "bg-white/[0.15] text-violet-400" 
                      : "hover:bg-white/[0.05] text-white/70"
                  }`}
                >
                  <Image
                    src={isActive ? item.activeIcon : item.icon}
                    alt={item.name}
                    width={16}
                    height={16}
                    className="w-5 h-5"
                    style={{ filter: 'invert(1)' }}
                  />

                  {/* Tooltip */}
                  <motion.div
                    initial={{ opacity: 0, x: 10, scale: 0.9 }}
                    whileHover={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-full top-1/2 -translate-y-1/2 ml-2 pointer-events-none origin-left"
                  >
                    <div className="relative flex items-center">
                      <div className="absolute right-full mr-1 w-2 h-2 rotate-45 bg-black/40 border-l border-b border-white/[0.1]" />
                      <div className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/[0.1] backdrop-blur-md whitespace-nowrap">
                        <p className="text-sm font-medium text-white">
                          {item.name}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </Link>

              {/* Ayırıcı çizgi (son öğe hariç) */}
              {index !== MENU_ITEMS.length - 1 && (
                <div className="mx-2 my-1 h-[1px] bg-white/[0.05]" />
              )}
            </div>
          );
        })}

        {/* Auth Butonları */}
        <div className="mt-2 pt-2 border-t border-white/[0.05]">
          {user ? (
            <motion.button
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => signOut()}
              className="relative flex items-center justify-center w-11 h-11 rounded-xl hover:bg-white/[0.05] text-white/70 transition-colors"
            >
              <Image
                src="https://api.iconify.design/fluent:sign-out-24-regular.svg"
                alt="Çıkış Yap"
                width={16}
                height={16}
                className="w-5 h-5"
                style={{ filter: 'invert(1)' }}
              />

              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.9 }}
                whileHover={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.2 }}
                className="absolute left-full top-1/2 -translate-y-1/2 ml-2 pointer-events-none origin-left"
              >
                <div className="relative flex items-center">
                  <div className="absolute right-full mr-1 w-2 h-2 rotate-45 bg-black/40 border-l border-b border-white/[0.1]" />
                  <div className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/[0.1] backdrop-blur-md whitespace-nowrap">
                    <p className="text-sm font-medium text-white">
                      Çıkış Yap
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.button>
          ) : (
            <Link href="/auth">
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center justify-center w-11 h-11 rounded-xl hover:bg-white/[0.05] text-white/70 transition-colors"
              >
                <Image
                  src="https://api.iconify.design/fluent:person-24-regular.svg"
                  alt="Giriş Yap"
                  width={16}
                  height={16}
                  className="w-5 h-5"
                  style={{ filter: 'invert(1)' }}
                />

                {/* Tooltip */}
                <motion.div
                  initial={{ opacity: 0, x: 10, scale: 0.9 }}
                  whileHover={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-full top-1/2 -translate-y-1/2 ml-2 pointer-events-none origin-left"
                >
                  <div className="relative flex items-center">
                    <div className="absolute right-full mr-1 w-2 h-2 rotate-45 bg-black/40 border-l border-b border-white/[0.1]" />
                    <div className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/[0.1] backdrop-blur-md whitespace-nowrap">
                      <p className="text-sm font-medium text-white">
                        Giriş Yap
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </Link>
          )}
        </div>

        {/* Hover efekti için gradient arka plan */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
      </div>
    </motion.nav>
  );
} 