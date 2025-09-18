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
      const websiteUrl = metadata?.websiteUrl

      if (userId && productType) {
        // Create order record
        const orderResult = await supabase
          .from('orders')
          .insert({
            user_id: userId,
            stripe_session_id: sessionId,
            stripe_payment_intent: event.data.object.payment_intent || '',
            amount: result.amountTotal || 0,
            tier: productType === 'basic' ? 'starter' : 'professional',
            status: 'paid',
            paid_at: new Date().toISOString()
          })
          .select()
          .single()

        if (orderResult.error) {
          console.error('Failed to create order:', orderResult.error)
        } else {
          console.log('Order created successfully:', orderResult.data.id)

          // CRITICAL: Trigger automatic book generation if website URL provided
          if (websiteUrl) {
            try {
              // Call book generation API
              const bookResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/generate-book`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  sessionId,
                  websiteUrl,
                  companyData: {} // Will be populated by scraping
                })
              })

              if (bookResponse.ok) {
                console.log('Automatic book generation triggered for order:', orderResult.data.id)
              } else {
                console.error('Failed to trigger book generation:', await bookResponse.text())
              }
            } catch (error) {
              console.error('Error triggering book generation:', error)
            }
          }
        }
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