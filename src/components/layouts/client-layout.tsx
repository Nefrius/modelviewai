"use client";

import { BackgroundEffects } from "@/components/ui/background-effects";
import { SideNavbar } from "@/components/shared/side-navbar";
import { AuthProvider } from "@/context/auth-context";
import { Toaster } from "sonner";
import SupabaseProvider from "@/components/providers/supabase-provider";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useSoundEffects } from "@/hooks/use-sound-effects";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { playTransitionSound } = useSoundEffects();

  // Sayfa değiştiğinde ses çal
  useEffect(() => {
    playTransitionSound();
  }, [pathname, playTransitionSound]);

  return (
    <SupabaseProvider>
      <AuthProvider>
        <BackgroundEffects />
        <SideNavbar />
        <main className="relative min-h-screen">
          {children}
        </main>
        <Toaster 
          position="bottom-right" 
          toastOptions={{
            style: {
              background: 'rgba(0, 0, 0, 0.8)',
              color: '#fff',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(8px)',
            },
            className: 'rounded-lg'
          }}
        />
      </AuthProvider>
    </SupabaseProvider>
  );
} 