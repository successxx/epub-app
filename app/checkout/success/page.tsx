'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { CheckCircleIcon, ArrowRightIcon } from 'lucide-react'

function CheckoutSuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get('session_id')

  const [websiteUrl, setWebsiteUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [orderId, setOrderId] = useState<string | null>(null)

  useEffect(() => {
    // Get order ID from session
    if (sessionId) {
      fetchOrder()
    }
  }, [sessionId])

  async function fetchOrder() {
    try {
      const res = await fetch(`/api/orders/by-session?session_id=${sessionId}`)
      const data = await res.json()
      if (data.orderId) {
        setOrderId(data.orderId)
      }
    } catch (err) {
      console.error('Failed to fetch order:', err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!websiteUrl) {
      setError('Please enter your website URL')
      return
    }

    // Basic URL validation
    try {
      const url = websiteUrl.startsWith('http') ? websiteUrl : `https://${websiteUrl}`
      new URL(url)
    } catch {
      setError('Please enter a valid website URL')
      return
    }

    setLoading(true)

    // Store website URL for generation page
    localStorage.setItem('generation_website_url', websiteUrl)

    // Navigate to generation page
    if (orderId) {
      router.push(`/generate/${orderId}`)
    } else {
      setError('Order not found. Please contact support.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircleIcon className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Payment Successful!</h1>
          <p className="text-gray-600">
            Now let&apos;s generate your professional lead magnet ebook
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
              Enter Your Company Website URL
            </label>
            <Input
              id="website"
              type="text"
              placeholder="https://yourcompany.com"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              className="w-full"
              disabled={loading}
              autoFocus
            />
            <p className="mt-2 text-sm text-gray-500">
              We&apos;ll analyze your website to create custom content aligned with your brand
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={loading}
          >
            {loading ? (
              'Starting Generation...'
            ) : (
              <>
                Start Generating My eBook
                <ArrowRightIcon className="ml-2 w-5 h-5" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>We&apos;ll analyze your website and extract company information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>AI generates custom content based on your business</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>Your ebook will be ready in about 5 minutes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-500 mt-0.5">✓</span>
              <span>Download in both PDF and EPUB formats</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  )
}