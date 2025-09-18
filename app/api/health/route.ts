import { NextResponse } from 'next/server'
import { createSupabaseAdmin } from '@/lib/supabase'
import { stripe } from '@/lib/stripe'
import { getHealthStatus } from '@/lib/monitoring'

export async function GET() {
  const health: any = {
    status: 'checking',
    timestamp: new Date().toISOString(),
    services: {},
    monitoring: getHealthStatus()
  }

  // Check database
  try {
    const supabase = createSupabaseAdmin()
    const { error } = await supabase
      .from('users')
      .select('count')
      .limit(1)
      .single()

    health.services.database = {
      status: error ? 'unhealthy' : 'healthy',
      error: error?.message
    }
  } catch (error) {
    health.services.database = {
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }

  // Check Stripe
  try {
    await stripe.products.list({ limit: 1 })
    health.services.stripe = { status: 'healthy' }
  } catch (error) {
    health.services.stripe = {
      status: 'unhealthy',
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }

  // Check OpenAI (lightweight check)
  health.services.openai = {
    status: process.env.OPENAI_API_KEY ? 'configured' : 'not_configured'
  }

  // Check SendGrid
  health.services.sendgrid = {
    status: process.env.SENDGRID_API_KEY ? 'configured' : 'not_configured'
  }

  // Overall status
  const unhealthyServices = Object.values(health.services).filter(
    (s: any) => s.status === 'unhealthy' || s.status === 'not_configured'
  )

  if (unhealthyServices.length === 0 && health.monitoring.status === 'healthy') {
    health.status = 'healthy'
  } else if (unhealthyServices.length > 0) {
    health.status = 'unhealthy'
  } else {
    health.status = 'degraded'
  }

  const statusCode = health.status === 'healthy' ? 200 :
                     health.status === 'degraded' ? 206 : 503

  return NextResponse.json(health, { status: statusCode })
}