import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Simple in-memory rate limiting (consider Redis for production scale)
const rateLimit = new Map<string, { count: number; resetTime: number }>()

// Rate limit configuration
const RATE_LIMITS = {
  '/api/generate-book': { requests: 5, windowMs: 60000 }, // 5 requests per minute
  '/api/checkout': { requests: 10, windowMs: 60000 }, // 10 checkouts per minute
  '/api/webhooks/stripe': { requests: 100, windowMs: 60000 }, // 100 webhook calls per minute
  '/api/scrape': { requests: 10, windowMs: 60000 }, // 10 scrapes per minute
  '/api/download': { requests: 30, windowMs: 60000 }, // 30 downloads per minute
}

function getRateLimitKey(request: NextRequest): string {
  const ip = request.headers.get('x-forwarded-for') ||
             request.headers.get('x-real-ip') ||
             'unknown'
  const path = request.nextUrl.pathname
  return `${ip}:${path}`
}

function checkRateLimit(key: string, path: string): boolean {
  const limit = Object.entries(RATE_LIMITS).find(([route]) =>
    path.startsWith(route)
  )?.[1]

  if (!limit) return true // No rate limit for this path

  const now = Date.now()
  const record = rateLimit.get(key)

  if (!record || record.resetTime < now) {
    rateLimit.set(key, { count: 1, resetTime: now + limit.windowMs })
    return true
  }

  if (record.count >= limit.requests) {
    return false
  }

  record.count++
  return true
}

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now()
  for (const [key, record] of rateLimit.entries()) {
    if (record.resetTime < now) {
      rateLimit.delete(key)
    }
  }
}, 60000) // Clean every minute

export function middleware(request: NextRequest) {
  // Skip rate limiting for static assets and Next.js internals
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/static') ||
    request.nextUrl.pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Apply rate limiting to API routes
  if (request.nextUrl.pathname.startsWith('/api')) {
    const key = getRateLimitKey(request)

    // Skip rate limiting for Stripe webhooks (they have their own verification)
    if (request.nextUrl.pathname === '/api/webhooks/stripe') {
      // Verify Stripe signature instead
      const signature = request.headers.get('stripe-signature')
      if (!signature) {
        return NextResponse.json(
          { error: 'Missing Stripe signature' },
          { status: 401 }
        )
      }
      return NextResponse.next()
    }

    if (!checkRateLimit(key, request.nextUrl.pathname)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429, headers: { 'Retry-After': '60' } }
      )
    }
  }

  // Security headers for all responses
  const response = NextResponse.next()

  // Security headers
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()'
  )

  // HSTS for production
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security',
      'max-age=31536000; includeSubDomains'
    )
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}