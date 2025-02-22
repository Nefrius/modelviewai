import { useState, useEffect } from 'react';
import { useSupabase } from '@/components/providers/supabase-provider';
import { useAuth } from '@/hooks/use-auth';
import { toast } from 'sonner';

interface BaseFavorite {
  id: string;
  created_at: string;
  user_id: string;
  model_id: string;
}

export function useFavorites<T extends BaseFavorite = BaseFavorite>() {
  const { supabase } = useSupabase();
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    const loadFavorites = async () => {
      try {
        const { data, error } = await supabase
          .from('favorites')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setFavorites(data as T[]);
      } catch (error) {
        console.error('Favoriler yüklenirken hata:', error);
        toast.error('Favoriler yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [user, supabase]);

  const isFavorite = (modelId: string) => {
    return favorites.some(fav => fav.model_id === modelId);
  };

  const addFavorite = async (modelId: string) => {
    if (!user) {
      toast.error('Favorilere eklemek için giriş yapmalısınız');
      return;
    }

    try {
      const { error } = await supabase
        .from('favorites')
        .insert({
          user_id: user.id,
          model_id: modelId
        });

      if (error) throw error;

      const { data, error: fetchError } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)
        .eq('model_id', modelId)
        .single();

      if (fetchError) throw fetchError;

      setFavorites(prev => [...prev, data as T]);
      toast.success('Model favorilere eklendi');
    } catch (error) {
      console.error('Favorilere eklenirken hata:', error);
      toast.error('Favorilere eklenirken bir hata oluştu');
    }
  };

  const removeFavorite = async (modelId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('model_id', modelId);

      if (error) throw error;

      setFavorites(prev => prev.filter(fav => fav.model_id !== modelId));
      toast.success('Model favorilerden kaldırıldı');
    } catch (error) {
      console.error('Favorilerden kaldırılırken hata:', error);
      toast.error('Favorilerden kaldırılırken bir hata oluştu');
    }
  };

  return {
    favorites,
    loading,
    isFavorite,
    addFavorite,
    removeFavorite
  };
} 