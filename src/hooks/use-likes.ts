import { useState, useEffect } from 'react'
import { useSupabase } from '@/components/providers/supabase-provider'
import { useAuth } from '@/hooks/use-auth'

export function useLikes() {
  const { supabase } = useSupabase()
  const { user } = useAuth()
  const [likes, setLikes] = useState<{ [key: string]: number }>({})
  const [isLiked, setIsLiked] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    if (!user) return

    const fetchLikes = async () => {
      const { data: likesData, error: likesError } = await supabase
        .from('likes')
        .select('model_id')

      if (likesError) {
        console.error('Error fetching likes:', likesError)
        return
      }

      const likesCount: { [key: string]: number } = {}
      likesData.forEach(like => {
        likesCount[like.model_id] = (likesCount[like.model_id] || 0) + 1
      })
      setLikes(likesCount)

      if (user) {
        const { data: userLikes, error: userLikesError } = await supabase
          .from('likes')
          .select('model_id')
          .eq('user_id', user.id)

        if (userLikesError) {
          console.error('Error fetching user likes:', userLikesError)
          return
        }

        const userLikedModels: { [key: string]: boolean } = {}
        userLikes.forEach(like => {
          userLikedModels[like.model_id] = true
        })
        setIsLiked(userLikedModels)
      }
    }

    fetchLikes()
  }, [supabase, user])

  const toggleLike = async (modelId: string) => {
    if (!user) return

    const isCurrentlyLiked = isLiked[modelId]

    if (isCurrentlyLiked) {
      const { error } = await supabase
        .from('likes')
        .delete()
        .eq('user_id', user.id)
        .eq('model_id', modelId)

      if (error) {
        console.error('Error removing like:', error)
        return
      }

      setIsLiked(prev => ({ ...prev, [modelId]: false }))
      setLikes(prev => ({ ...prev, [modelId]: (prev[modelId] || 1) - 1 }))
    } else {
      const { error } = await supabase
        .from('likes')
        .insert({ user_id: user.id, model_id: modelId })

      if (error) {
        console.error('Error adding like:', error)
        return
      }

      setIsLiked(prev => ({ ...prev, [modelId]: true }))
      setLikes(prev => ({ ...prev, [modelId]: (prev[modelId] || 0) + 1 }))
    }
  }

  return {
    likes,
    isLiked,
    toggleLike
  }
} 