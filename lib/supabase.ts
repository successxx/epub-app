import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY environment variable')
}

// Client-side Supabase client
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

// Server-side Supabase client
export const createSupabaseServer = async () => {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // Handle cookie errors in Server Components
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // Handle cookie errors in Server Components
          }
        },
      },
    }
  )
}

// Alias for API routes
export { createSupabaseServer as createClient }

// Admin client for server-side operations
export const createSupabaseAdmin = () => {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable')
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}

// Schema configuration for epub_ai tables
export const EPUB_SCHEMA = 'epub_ai'

// Database types
export interface User {
  id: string
  email: string
  name?: string
  company_name?: string
  created_at: string
}

export interface Order {
  id: string
  user_id: string
  stripe_session_id?: string
  stripe_payment_intent?: string
  amount: number
  tier: 'starter' | 'professional'
  status: 'pending' | 'paid' | 'processing' | 'completed' | 'failed'
  website_url?: string
  created_at: string
  paid_at?: string
  completed_at?: string
}

export interface Ebook {
  id: string
  order_id: string
  user_id: string
  title: string
  subtitle?: string
  company_data?: any
  generation_data?: any
  cover_url?: string
  pdf_url?: string
  epub_url?: string
  page_count?: number
  status: 'generating' | 'completed' | 'failed'
  started_at: string
  completed_at?: string
  sent_via_email: boolean
}

export interface GenerationProgress {
  id: string
  ebook_id: string
  step: string
  message: string
  percentage: number
  created_at: string
}

export interface CompanyAnalysis {
  id: string
  website_url: string
  scraped_data?: any
  analysis?: any
  variables?: any
  created_at: string
  updated_at: string
}