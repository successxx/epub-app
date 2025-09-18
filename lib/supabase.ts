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

// Singleton admin client for better connection management
let adminClient: ReturnType<typeof createClient> | null = null

// Admin client for server-side operations with connection pooling
export const createSupabaseAdmin = () => {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY environment variable')
  }

  if (!adminClient) {
    adminClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        },
        global: {
          headers: {
            'x-application-name': 'epub-ai-production'
          }
        }
      }
    )
  }

  return adminClient
}

// Helper function with retry logic for critical database operations
export async function withRetry<T>(
  operation: () => Promise<T>,
  maxRetries = 3,
  delayMs = 1000
): Promise<T> {
  let lastError: any

  for (let i = 0; i < maxRetries; i++) {
    try {
      return await operation()
    } catch (error) {
      lastError = error
      console.error(`Database operation failed (attempt ${i + 1}/${maxRetries}):`, error)

      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, delayMs * Math.pow(2, i)))
      }
    }
  }

  throw lastError
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