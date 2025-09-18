// Environment variable validation for production
const REQUIRED_ENV_VARS = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_SERVICE_ROLE_KEY',
  'STRIPE_SECRET_KEY',
  'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
  'STRIPE_PRICE_STARTER',
  'STRIPE_PRICE_PRO',
  'STRIPE_WEBHOOK_SECRET',
  'OPENAI_API_KEY',
  'SENDGRID_API_KEY',
  'SENDGRID_FROM_EMAIL',
  'NEXT_PUBLIC_URL',
  'NEXT_PUBLIC_BASE_URL'
]

export function validateEnvironment(): { valid: boolean; missing: string[] } {
  const missing: string[] = []

  for (const envVar of REQUIRED_ENV_VARS) {
    if (!process.env[envVar]) {
      missing.push(envVar)
    }
  }

  if (missing.length > 0) {
    console.error('⚠️  Missing required environment variables:', missing)
  }

  return {
    valid: missing.length === 0,
    missing
  }
}

// Run validation on startup
if (process.env.NODE_ENV === 'production') {
  const { valid, missing } = validateEnvironment()

  if (!valid) {
    console.error('🚨 CRITICAL: Production environment is not properly configured!')
    console.error('Missing environment variables:', missing)
    // Don't exit process, but log critical error
  }
}