import { useState, useEffect } from 'react'
import { useSupabase } from '@/components/providers/supabase-provider'
import { useAuth } from '@/hooks/use-auth'

type Profile = {
  username: string | null
  avatar_url: string | null
}

type RawComment = {
  id: string
  created_at: string
  user_id: string
  model_id: string
  content: string
  profiles: Profile[]
}

type Comment = Omit<RawComment, 'profiles'> & {
  profiles: Profile | null
}

export function useComments(modelId: string) {
  const { supabase } = useSupabase()
  const { user } = useAuth()
  const [comments, setComments] = useState<Comment[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true)
      const { data, error } = await supabase
        .from('comments')
        .select(`
          id,
          created_at,
          user_id,
          model_id,
          content,
          profiles:user_id (
            username,
            avatar_url
          )
        `)
        .eq('model_id', modelId)
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching comments:', error)
        return
      }

      setComments((data as RawComment[]).map(item => ({
        ...item,
        profiles: item.profiles[0] || null
      })))
      setIsLoading(false)
    }

    fetchComments()
  }, [supabase, modelId])

  const addComment = async (content: string) => {
    if (!user) return

    const { error } = await supabase
      .from('comments')
      .insert({
        user_id: user.id,
        model_id: modelId,
        content
      })

    if (error) {
      console.error('Error adding comment:', error)
      return
    }

    // Yeni yorumu ekledikten sonra yorumları yeniden yükle
    const { data, error: fetchError } = await supabase
      .from('comments')
      .select(`
        id,
        created_at,
        user_id,
        model_id,
        content,
        profiles:user_id (
          username,
          avatar_url
        )
      `)
      .eq('model_id', modelId)
      .order('created_at', { ascending: false })

    if (fetchError) {
      console.error('Error fetching comments:', fetchError)
      return
    }

    setComments((data as RawComment[]).map(item => ({
      ...item,
      profiles: item.profiles[0] || null
    })))
  }

  const deleteComment = async (commentId: string) => {
    if (!user) return

    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId)
      .eq('user_id', user.id)

    if (error) {
      console.error('Error deleting comment:', error)
      return
    }

    setComments(prev => prev.filter(comment => comment.id !== commentId))
  }

  return {
    comments,
    isLoading,
    addComment,
    deleteComment
  }
} 