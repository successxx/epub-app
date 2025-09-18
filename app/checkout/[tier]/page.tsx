'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { PRODUCTS } from '@/lib/stripe'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function CheckoutPage({
  params
}: {
  params: { tier: 'basic' | 'premium' }
}) {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const product = PRODUCTS[params.tier]

  const handleCheckout = async () => {
    if (!email) {
      setError('Please enter your email address')
      return
    }

    if (!websiteUrl) {
      setError('Please enter your website URL')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productType: params.tier,
          userEmail: email,
          websiteUrl: websiteUrl
        })
      })

      const { sessionId, url, error: apiError } = await response.json()

      if (apiError) {
        throw new Error(apiError)
      }

      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url
      } else {
        const stripe = await stripePromise
        if (stripe && sessionId) {
          const { error: stripeError } = await stripe.redirectToCheckout({ sessionId })
          if (stripeError) {
            throw stripeError
          }
        }
      }
    } catch (err) {
      console.error('Checkout error:', err)
      setError('Failed to start checkout. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              ${(product.price / 100).toFixed(2)}
            </div>
            <div className="text-gray-600">One-time payment</div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What's Included:</h2>
            <ul className="space-y-3">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t pt-6">
            <div className="mb-4">
              <label htmlFor="websiteUrl" className="block text-sm font-medium text-gray-700 mb-2">
                Website URL
              </label>
              <input
                type="url"
                id="websiteUrl"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://yourcompany.com"
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="your@email.com"
                required
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <button
              onClick={handleCheckout}
              disabled={loading}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                loading
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {loading ? 'Processing...' : `Continue to Payment`}
            </button>

            <p className="text-sm text-gray-500 mt-4 text-center">
              Secure payment powered by Stripe. Your payment information is never stored on our servers.
            </p>
          </div>
        </div>

        {params.tier === 'basic' && (
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Looking for more chapters and advanced features?{' '}
              <a href="/checkout/premium" className="text-blue-600 hover:underline">
                Check out our Premium plan
              </a>
            </p>
          </div>
        )}
      </div>
    </div>
  )
}