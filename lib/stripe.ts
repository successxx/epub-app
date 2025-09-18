import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

export const PRODUCTS = {
  basic: {
    name: 'Lead Magnet eBook - Basic',
    description: '15-chapter professionally written lead magnet eBook with AI-powered content generation',
    price: 4900, // $49 in cents
    priceId: process.env.STRIPE_BASIC_PRICE_ID || '',
    features: [
      '15 professionally written chapters',
      'AI-powered content personalization',
      'Website analysis and data extraction',
      'Custom cover design',
      'EPUB format delivery',
      'Introduction and conclusion',
      'Instant generation after payment'
    ]
  },
  premium: {
    name: 'Lead Magnet eBook - Premium',
    description: '30-chapter comprehensive lead magnet eBook with advanced AI content generation',
    price: 99900, // $999 in cents
    priceId: process.env.STRIPE_PREMIUM_PRICE_ID || '',
    features: [
      '30 comprehensive chapters',
      'Advanced AI-powered content personalization',
      'Deep website analysis and competitor research',
      'Premium custom cover design',
      'Multiple format delivery (EPUB, PDF)',
      'Extended introduction and conclusion',
      'Priority generation and support',
      'Content optimization for conversions',
      'Industry-specific customization',
      'Bonus content chapters'
    ]
  }
}

export interface CreateCheckoutSessionOptions {
  productType: 'basic' | 'premium'
  userEmail?: string
  userId?: string
  successUrl: string
  cancelUrl: string
  metadata?: Record<string, string>
}

export async function createCheckoutSession(options: CreateCheckoutSessionOptions) {
  const product = PRODUCTS[options.productType]

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
              metadata: {
                product_type: options.productType
              }
            },
            unit_amount: product.price,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: options.successUrl,
      cancel_url: options.cancelUrl,
      customer_email: options.userEmail,
      // Collect customer name during checkout
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'AU', 'NZ', 'IE']
      },
      metadata: {
        userId: options.userId || '',
        productType: options.productType,
        ...options.metadata
      },
      allow_promotion_codes: true,
      billing_address_collection: 'auto',
    })

    return session
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}

export async function retrieveCheckoutSession(sessionId: string) {
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['payment_intent', 'customer']
    })
    return session
  } catch (error) {
    console.error('Error retrieving checkout session:', error)
    throw error
  }
}

export async function handleWebhookEvent(event: Stripe.Event) {
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session
      return {
        type: 'checkout.completed',
        sessionId: session.id,
        customerId: session.customer,
        customerEmail: session.customer_email,
        metadata: session.metadata,
        amountTotal: session.amount_total,
        paymentStatus: session.payment_status
      }

    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      return {
        type: 'payment.succeeded',
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount,
        metadata: paymentIntent.metadata
      }

    case 'payment_intent.payment_failed':
      const failedPayment = event.data.object as Stripe.PaymentIntent
      return {
        type: 'payment.failed',
        paymentIntentId: failedPayment.id,
        error: failedPayment.last_payment_error?.message
      }

    default:
      return null
  }
}