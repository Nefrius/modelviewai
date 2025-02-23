"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSupabase } from '@/components/providers/supabase-provider';
import { toast } from 'sonner';
import { 
  User, 
  AuthError, 
  AuthChangeEvent, 
  SignInWithPasswordCredentials,
  SignUpWithPasswordCredentials,
  AuthSession
} from '@supabase/supabase-js';

interface SignInResponse {
  error: AuthError | null;
}

interface SignUpResponse {
  error: AuthError | null;
}

interface AuthContextType {
  user: User | null;
  signIn: (email: string, password: string) => Promise<SignInResponse>;
  signUp: (email: string, password: string) => Promise<SignUpResponse>;
  signOut: () => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PROTECTED_ROUTES = ['/admin', '/settings', '/favorites'];

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { supabase } = useSupabase();
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event: AuthChangeEvent, session: AuthSession | null) => {
      if (session) {
        setUser(session.user);
        if (event === 'SIGNED_IN') {
          toast.success('Başarıyla giriş yapıldı');
          if (pathname === '/auth') {
            router.push('/');
          }
        } else if (event === 'SIGNED_OUT') {
          toast.success('Başarıyla çıkış yapıldı');
          if (PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
            router.push('/');
          }
        } else if (event === 'PASSWORD_RECOVERY') {
          toast.success('Şifreniz başarıyla güncellendi');
          router.push('/');
        }
      } else {
        setUser(null);
        if (PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
          router.push('/auth');
          toast.error('Bu sayfaya erişmek için giriş yapmalısınız');
        }
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router, pathname]);

  const signIn = async (email: string, password: string): Promise<SignInResponse> => {
    const credentials: SignInWithPasswordCredentials = {
      email,
      password,
    };

    const { error } = await supabase.auth.signInWithPassword(credentials);
    return { error };
  };

  const signUp = async (email: string, password: string): Promise<SignUpResponse> => {
    const credentials: SignUpWithPasswordCredentials = {
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    };

    const { error } = await supabase.auth.signUp(credentials);
    return { error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  return (
    <AuthContext.Provider value={{ user, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
} 