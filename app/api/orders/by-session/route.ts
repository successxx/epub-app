import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServer } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const sessionId = searchParams.get('session_id')

    if (!sessionId) {
      return NextResponse.json(
        { error: 'Missing session_id' },
        { status: 400 }
      )
    }

    const supabase = await createSupabaseServer()

    // Get user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get order by stripe session ID
    const { data: order, error } = await supabase
      .from('epub_ai.orders')
      .select('id, status, tier, amount')
      .eq('stripe_session_id', sessionId)
      .eq('user_id', user.id)
      .single()

    if (error || !order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      orderId: order.id,
      status: order.status,
      tier: order.tier,
      amount: order.amount,
    })
  } catch (error) {
    console.error('Order lookup error:', error)
    return NextResponse.json(
      { error: 'Failed to find order' },
      { status: 500 }
    )
  }
}