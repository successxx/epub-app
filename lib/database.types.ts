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
      users: {
        Row: {
          id: string
          created_at: string
          email: string
          full_name: string | null
          stripe_customer_id: string | null
          subscription_status: 'active' | 'inactive' | 'pending' | null
          subscription_tier: 'basic' | 'premium' | null
        }
        Insert: {
          id?: string
          created_at?: string
          email: string
          full_name?: string | null
          stripe_customer_id?: string | null
          subscription_status?: 'active' | 'inactive' | 'pending' | null
          subscription_tier?: 'basic' | 'premium' | null
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          full_name?: string | null
          stripe_customer_id?: string | null
          subscription_status?: 'active' | 'inactive' | 'pending' | null
          subscription_tier?: 'basic' | 'premium' | null
        }
      }
      company_profiles: {
        Row: {
          id: string
          user_id: string
          created_at: string
          updated_at: string
          website_url: string
          sender_name: string | null
          company_name: string | null
          industry: string | null
          business_description: string | null
          company_goal: string | null
          target_audience: string | null
          audience_pain_points: string | null
          company_testimonials: Json | null
          offer_name: string | null
          offer_price: string | null
          offer_description: string | null
          offer_benefits: string | null
          offer_result: string | null
          checkout_link: string | null
          offer_testimonials: Json | null
          all_bonuses: string | null
          guarantee: string | null
          scraped_data: Json | null
        }
        Insert: {
          id?: string
          user_id: string
          created_at?: string
          updated_at?: string
          website_url: string
          sender_name?: string | null
          company_name?: string | null
          industry?: string | null
          business_description?: string | null
          company_goal?: string | null
          target_audience?: string | null
          audience_pain_points?: string | null
          company_testimonials?: Json | null
          offer_name?: string | null
          offer_price?: string | null
          offer_description?: string | null
          offer_benefits?: string | null
          offer_result?: string | null
          checkout_link?: string | null
          offer_testimonials?: Json | null
          all_bonuses?: string | null
          guarantee?: string | null
          scraped_data?: Json | null
        }
        Update: {
          id?: string
          user_id?: string
          created_at?: string
          updated_at?: string
          website_url?: string
          sender_name?: string | null
          company_name?: string | null
          industry?: string | null
          business_description?: string | null
          company_goal?: string | null
          target_audience?: string | null
          audience_pain_points?: string | null
          company_testimonials?: Json | null
          offer_name?: string | null
          offer_price?: string | null
          offer_description?: string | null
          offer_benefits?: string | null
          offer_result?: string | null
          checkout_link?: string | null
          offer_testimonials?: Json | null
          all_bonuses?: string | null
          guarantee?: string | null
          scraped_data?: Json | null
        }
      }
      books: {
        Row: {
          id: string
          user_id: string
          company_profile_id: string
          created_at: string
          title: string
          subtitle: string | null
          chapters: Json
          introduction: string | null
          conclusion: string | null
          summary: string | null
          cover_image_url: string | null
          epub_url: string | null
          status: 'pending' | 'generating' | 'completed' | 'failed'
          book_type: 'basic' | 'premium'
          total_chapters: number
          generation_metadata: Json | null
        }
        Insert: {
          id?: string
          user_id: string
          company_profile_id: string
          created_at?: string
          title?: string
          subtitle?: string | null
          chapters?: Json
          introduction?: string | null
          conclusion?: string | null
          summary?: string | null
          cover_image_url?: string | null
          epub_url?: string | null
          status?: 'pending' | 'generating' | 'completed' | 'failed'
          book_type: 'basic' | 'premium'
          total_chapters?: number
          generation_metadata?: Json | null
        }
        Update: {
          id?: string
          user_id?: string
          company_profile_id?: string
          created_at?: string
          title?: string
          subtitle?: string | null
          chapters?: Json
          introduction?: string | null
          conclusion?: string | null
          summary?: string | null
          cover_image_url?: string | null
          epub_url?: string | null
          status?: 'pending' | 'generating' | 'completed' | 'failed'
          book_type?: 'basic' | 'premium'
          total_chapters?: number
          generation_metadata?: Json | null
        }
      }
      payments: {
        Row: {
          id: string
          user_id: string
          created_at: string
          stripe_payment_intent_id: string
          stripe_session_id: string | null
          amount: number
          currency: string
          status: 'pending' | 'processing' | 'succeeded' | 'failed'
          product_type: 'basic' | 'premium'
          metadata: Json | null
        }
        Insert: {
          id?: string
          user_id: string
          created_at?: string
          stripe_payment_intent_id: string
          stripe_session_id?: string | null
          amount: number
          currency?: string
          status?: 'pending' | 'processing' | 'succeeded' | 'failed'
          product_type: 'basic' | 'premium'
          metadata?: Json | null
        }
        Update: {
          id?: string
          user_id?: string
          created_at?: string
          stripe_payment_intent_id?: string
          stripe_session_id?: string | null
          amount?: number
          currency?: string
          status?: 'pending' | 'processing' | 'succeeded' | 'failed'
          product_type?: 'basic' | 'premium'
          metadata?: Json | null
        }
      }
    }
  }
}

export type User = Database['public']['Tables']['users']['Row']
export type CompanyProfile = Database['public']['Tables']['company_profiles']['Row']
export type Book = Database['public']['Tables']['books']['Row']
export type Payment = Database['public']['Tables']['payments']['Row']