import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

export const PRODUCTS = {
  basic: {
    name: 'Lead Magnet eBook - Starter',
    description: '100-page professionally written lead magnet eBook with AI-powered content generation',
    price: 49999, // $499.99 in cents
    priceId: process.env.STRIPE_PRICE_STARTER || '',
    features: [
      '100 pages of professional content',
      'AI-powered content personalization',
      'Website analysis and data extraction',
      'Custom cover design',
      'EPUB & PDF format delivery',
      'Introduction and conclusion',
      'Instant generation after payment'
    ]
  },
  premium: {
    name: 'Lead Magnet eBook - Professional',
    description: '250-page comprehensive lead magnet eBook with advanced AI content generation',
    price: 99999, // $999.99 in cents
    priceId: process.env.STRIPE_PRICE_PRO || '',
    features: [
      '250 pages of comprehensive content',
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

  // Validate that we have a price ID
  if (!product.priceId) {
    console.error(`Missing Stripe price ID for product: ${options.productType}`)
    console.error('Available env vars:', {
      STRIPE_PRICE_STARTER: process.env.STRIPE_PRICE_STARTER,
      STRIPE_PRICE_PRO: process.env.STRIPE_PRICE_PRO
    })
    throw new Error(`Missing Stripe price ID for product: ${options.productType}. Please configure STRIPE_PRICE_STARTER and STRIPE_PRICE_PRO in your environment variables.`)
  }

  try {
    console.log(`Creating checkout session for ${options.productType} with price ID: ${product.priceId}`)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: product.priceId, // Use existing price IDs from Stripe
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: options.successUrl,
      cancel_url: options.cancelUrl,
      customer_email: options.userEmail,
      billing_address_collection: 'auto',
      metadata: {
        userId: options.userId || '',
        productType: options.productType,
        ...options.metadata
      },
      allow_promotion_codes: true,
    })

    console.log('Checkout session created successfully:', session.id)
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