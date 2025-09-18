import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe, handleWebhookEvent } from '@/lib/stripe'
import { createSupabaseAdmin } from '@/lib/supabase'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = (await headers()).get('stripe-signature')

    if (!signature) {
      return NextResponse.json({ error: 'No signature' }, { status: 400 })
    }

    // Verify webhook signature
    let event: any
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // Handle the event
    const result = await handleWebhookEvent(event)

    if (!result) {
      return NextResponse.json({ received: true })
    }

    const supabase = createSupabaseAdmin()

    // Process based on event type
    if (result.type === 'checkout.completed') {
      const { sessionId, customerEmail, metadata } = result
      const userId = metadata?.userId
      const productType = metadata?.productType

      if (userId && productType) {
        // Update user subscription status
        await supabase
          .from('users')
          .update({
            subscription_status: 'active',
            subscription_tier: productType,
            stripe_customer_id: result.customerId
          })
          .eq('id', userId)

        // Create payment record
        await supabase
          .from('payments')
          .insert({
            user_id: userId,
            stripe_payment_intent_id: event.data.object.payment_intent || '',
            stripe_session_id: sessionId,
            amount: result.amountTotal || 0,
            currency: 'usd',
            status: 'succeeded',
            product_type: productType,
            metadata: {
              customerEmail,
              ...metadata
            }
          })
      }
    } else if (result.type === 'payment.failed') {
      console.error('Payment failed:', result.error)

      // You could send a notification to the user here
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}

// Stripe requires raw body for webhook verification
export const config = {
  api: {
    bodyParser: false,
  },
}