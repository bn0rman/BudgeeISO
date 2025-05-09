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
      organizations: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          logo_url: string | null
          website: string | null
          industry: string | null
          size: string | null
          description: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          logo_url?: string | null
          website?: string | null
          industry?: string | null
          size?: string | null
          description?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          logo_url?: string | null
          website?: string | null
          industry?: string | null
          size?: string | null
          description?: string | null
        }
      }
      documents: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          description: string | null
          file_url: string | null
          status: string
          organization_id: string
          user_id: string
          document_type: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          description?: string | null
          file_url?: string | null
          status?: string
          organization_id: string
          user_id: string
          document_type?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          description?: string | null
          file_url?: string | null
          status?: string
          organization_id?: string
          user_id?: string
          document_type?: string | null
        }
      }
      controls: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          name: string
          description: string | null
          status: string
          organization_id: string
          user_id: string
          control_number: string
          evidence_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          name: string
          description?: string | null
          status?: string
          organization_id: string
          user_id: string
          control_number: string
          evidence_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          name?: string
          description?: string | null
          status?: string
          organization_id?: string
          user_id?: string
          control_number?: string
          evidence_url?: string | null
        }
      }
      users: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          kinde_id: string
          email: string
          name: string | null
          avatar_url: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          kinde_id: string
          email: string
          name?: string | null
          avatar_url?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          kinde_id?: string
          email?: string
          name?: string | null
          avatar_url?: string | null
        }
      }
      user_organizations: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          user_id: string
          organization_id: string
          role: string
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id: string
          organization_id: string
          role?: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          user_id?: string
          organization_id?: string
          role?: string
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