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
          created_at: string
          updated_at: string
          username: string | null
          full_name: string | null
          avatar_url: string | null
          website: string | null
          email: string
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          email: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          website?: string | null
          email?: string
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