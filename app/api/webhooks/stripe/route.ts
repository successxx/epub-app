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
            // Retry logic for critical book generation
            let retries = 3
            let success = false

            while (retries > 0 && !success) {
              try {
                // Call book generation API with timeout
                const controller = new AbortController()
                const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout

                const bookResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/generate-book`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'X-Webhook-Secret': process.env.STRIPE_WEBHOOK_SECRET!, // Add internal auth
                  },
                  body: JSON.stringify({
                    sessionId,
                    websiteUrl,
                    companyData: {}, // Will be populated by scraping
                    orderId: orderResult.data.id
                  }),
                  signal: controller.signal
                })

                clearTimeout(timeoutId)

                if (bookResponse.ok) {
                  console.log('✅ Automatic book generation triggered for order:', orderResult.data.id)
                  success = true

                  // Update order with generation status
                  await supabase
                    .from('orders')
                    .update({ generation_status: 'triggered' })
                    .eq('id', orderResult.data.id)
                } else {
                  const errorText = await bookResponse.text()
                  console.error(`❌ Book generation failed (attempt ${4 - retries}/3):`, errorText)
                  retries--

                  if (retries > 0) {
                    // Wait before retry with exponential backoff
                    await new Promise(resolve => setTimeout(resolve, (4 - retries) * 1000))
                  }
                }
              } catch (error) {
                console.error(`❌ Error triggering book generation (attempt ${4 - retries}/3):`, error)
                retries--

                if (retries > 0) {
                  await new Promise(resolve => setTimeout(resolve, (4 - retries) * 1000))
                }
              }
            }

            if (!success) {
              // Log critical failure for manual intervention
              console.error('🚨 CRITICAL: Failed to trigger book generation after 3 attempts for order:', orderResult.data.id)

              // Store failure for manual retry
              await supabase
                .from('orders')
                .update({
                  generation_status: 'failed',
                  generation_error: 'Failed to trigger automatic generation'
                })
                .eq('id', orderResult.data.id)
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