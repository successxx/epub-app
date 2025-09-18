import { NextRequest, NextResponse } from 'next/server'
import { createCheckoutSession, PRODUCTS } from '@/lib/stripe'
import { createSupabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { productType, userEmail, websiteUrl } = await request.json()

    if (!productType || !['basic', 'premium'].includes(productType)) {
      return NextResponse.json({ error: 'Invalid product type' }, { status: 400 })
    }

    // Get or create user in database
    const supabase = createSupabaseAdmin()
    let userId = null

    if (userEmail) {
      // Check if user exists
      const { data: existingUser, error: userError } = await supabase
        .from('users')
        .select('id')
        .eq('email', userEmail)
        .single()

      if (existingUser) {
        userId = existingUser.id
      } else {
        // Create new user
        const { data: newUser, error: createError } = await supabase
          .from('users')
          .insert({
            email: userEmail,
            subscription_status: 'pending',
            subscription_tier: productType
          })
          .select('id')
          .single()

        if (newUser) {
          userId = newUser.id
        }
      }
    }

    // Ensure we have the base URL
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `http://localhost:${process.env.PORT || 3000}`

    // Create Stripe checkout session
    const session = await createCheckoutSession({
      productType,
      userEmail,
      userId: userId || undefined,
      successUrl: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&type=${productType}`,
      cancelUrl: `${baseUrl}/checkout/${productType}`,
      metadata: {
        productType,
        userId: userId || '',
        websiteUrl: websiteUrl || ''
      }
    })

    return NextResponse.json({
      sessionId: session.id,
      url: session.url
    })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}