import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/auth-context';
import { useSupabase } from '@/components/providers/supabase-provider';
import { toast } from 'sonner';

export interface AuthFormProps {
  mode: 'signin' | 'signup' | 'reset';
}

export function AuthForm({ mode }: AuthFormProps) {
  const { signIn, signUp } = useAuth();
  const { supabase } = useSupabase();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      
      if (showResetForm) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth/reset-password`,
        });

        if (error) throw error;
        
        setResetSent(true);
        toast.success('Şifre sıfırlama bağlantısı e-posta adresinize gönderildi');
        return;
      }

      if (mode === 'signin') {
        const { error } = await signIn(email, password);
        if (error) {
          switch (error.message) {
            case 'Invalid login credentials':
              throw new Error('E-posta veya şifre hatalı');
            case 'Email not confirmed':
              throw new Error('Lütfen e-posta adresinizi onaylayın');
            default:
              throw error;
          }
        }
      } else {
        const { error } = await signUp(email, password);
        if (error) {
          switch (error.message) {
            case 'User already registered':
              throw new Error('Bu e-posta adresi zaten kullanılıyor');
            case 'Weak password':
              throw new Error('Şifre çok zayıf. Lütfen daha güçlü bir şifre seçin');
            default:
              throw error;
          }
        }
        toast.success('Kayıt başarılı! Lütfen e-posta adresinizi onaylayın');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto"
    >
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 to-fuchsia-500/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative bg-black/40 border border-white/[0.1] rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-2xl font-bold text-white mb-6">
            {showResetForm ? 'Şifre Sıfırlama' : mode === 'signin' ? 'Giriş Yap' : 'Kayıt Ol'}
          </h2>

          {resetSent ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-violet-500/10 flex items-center justify-center">
                <svg className="w-8 h-8 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-white/70 mb-4">
                Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.
                Lütfen gelen kutunuzu kontrol edin.
              </p>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setShowResetForm(false);
                  setResetSent(false);
                }}
                className="text-violet-400 hover:text-violet-300 transition-colors"
              >
                Giriş sayfasına dön
              </motion.button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-1">
                  E-posta
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                  placeholder="ornek@email.com"
                  required
                />
              </div>

              {!showResetForm && (
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white/70 mb-1">
                    Şifre
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                    placeholder="••••••••"
                    required
                  />
                </div>
              )}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 bg-violet-500 hover:bg-violet-600 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    <span>İşleniyor...</span>
                  </div>
                ) : showResetForm ? 'Şifre Sıfırlama Bağlantısı Gönder' : mode === 'signin' ? 'Giriş Yap' : 'Kayıt Ol'}
              </motion.button>

              <div className="flex items-center justify-center gap-2 pt-4 text-sm">
                {mode === 'signin' && !showResetForm ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setShowResetForm(true)}
                      className="text-violet-400 hover:text-violet-300 transition-colors"
                    >
                      Şifremi Unuttum
                    </button>
                    <span className="text-white/30">•</span>
                    <a
                      href="/auth?mode=signup"
                      className="text-violet-400 hover:text-violet-300 transition-colors"
                    >
                      Hesap Oluştur
                    </a>
                  </>
                ) : mode === 'signup' && !showResetForm ? (
                  <a
                    href="/auth?mode=signin"
                    className="text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    Zaten hesabın var mı? Giriş yap
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowResetForm(false)}
                    className="text-violet-400 hover:text-violet-300 transition-colors"
                  >
                    Giriş sayfasına dön
                  </button>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </motion.div>
  );
} 