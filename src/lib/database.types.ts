export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          role: string
          created_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          role?: string
          created_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          role?: string
          created_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          created_at: string
          user_id: string
          model_id: string
          content: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          model_id: string
          content: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          model_id?: string
          content?: string
        }
      }
      favorites: {
        Row: {
          id: string
          created_at: string
          user_id: string
          model_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          model_id: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          model_id?: string
        }
      }
      likes: {
        Row: {
          id: string
          created_at: string
          user_id: string
          model_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          model_id: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          model_id?: string
        }
      }
      category_follows: {
        Row: {
          id: string
          created_at: string
          user_id: string
          category_id: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          category_id: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          category_id?: string
        }
      }
      announcements: {
        Row: {
          id: string
          created_at: string
          title: string
          content: string
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          content: string
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          content?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
