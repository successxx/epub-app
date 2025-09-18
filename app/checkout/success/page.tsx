'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircleIcon, BookOpenIcon, DownloadIcon } from 'lucide-react'

function CheckoutSuccessContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const type = searchParams.get('type')

  const [bookStatus, setBookStatus] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (sessionId) {
      // Poll for book generation status
      const checkStatus = async () => {
        try {
          // First, get the book ID from the order
          const orderRes = await fetch(`/api/orders/by-session?session_id=${sessionId}`)
          const orderData = await orderRes.json()

          if (orderData.error) {
            setError('Order not found')
            setLoading(false)
            return
          }

          // If we have a book ID, check its status
          if (orderData.bookId) {
            const bookRes = await fetch(`/api/generate-book?bookId=${orderData.bookId}`)
            const bookData = await bookRes.json()

            setBookStatus(bookData)

            if (bookData.status === 'completed' || bookData.status === 'failed') {
              setLoading(false)
            }
          } else {
            // Book generation might not have started yet
            setTimeout(checkStatus, 2000)
          }
        } catch (err) {
          console.error('Error checking status:', err)
          setTimeout(checkStatus, 5000)
        }
      }

      checkStatus()

      // Set up polling interval
      const interval = setInterval(checkStatus, 5000)

      return () => clearInterval(interval)
    }
  }, [sessionId])

  const downloadBook = () => {
    if (bookStatus?.epub_url) {
      const link = document.createElement('a')
      link.href = bookStatus.epub_url
      link.download = `${bookStatus.title || 'ebook'}.epub`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <h1 className="text-2xl font-bold mb-2 text-gray-900">Something went wrong</h1>
          <p className="text-gray-600 mb-4">{error}</p>
          <p className="text-sm text-gray-500">Please contact support if this issue persists.</p>
        </div>
      </div>
    )
  }

  if (loading || !bookStatus) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircleIcon className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Payment Successful!</h1>
          <p className="text-gray-600 mb-8">Your ebook is being generated automatically...</p>

          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
              <div className="animate-spin w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full"></div>
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Generating Your Lead Magnet eBook
            </h2>
            <p className="text-gray-600">
              Creating {type === 'premium' ? '250' : '100'} pages of professional content...
            </p>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-2">What's happening now:</h3>
            <ul className="space-y-2 text-sm text-gray-600 text-left">
              <li className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">✓</span>
                <span>Analyzing your website and extracting company information</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-500 mt-0.5">⏳</span>
                <span>AI generating custom content based on your business</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">⏳</span>
                <span>Creating professional EPUB and PDF files</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gray-400 mt-0.5">⏳</span>
                <span>Preparing your download and email delivery</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    )
  }

  if (bookStatus.status === 'failed') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">❌</span>
          </div>
          <h1 className="text-2xl font-bold mb-2 text-gray-900">Generation Failed</h1>
          <p className="text-gray-600 mb-4">We encountered an issue generating your ebook.</p>
          <p className="text-sm text-gray-500">Please contact support for assistance. Your payment will be refunded.</p>
        </div>
      </div>
    )
  }

  if (bookStatus.status === 'completed') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpenIcon className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-2 text-gray-900">Your eBook is Ready!</h1>
          <p className="text-xl text-gray-600 mb-6">
            "{bookStatus.title}"
          </p>

          {bookStatus.cover_image_url && (
            <img
              src={bookStatus.cover_image_url}
              alt="Book Cover"
              className="mx-auto mb-6 rounded-lg shadow-lg max-w-xs"
            />
          )}

          <button
            onClick={downloadBook}
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
          >
            <DownloadIcon className="w-5 h-5 mr-2" />
            Download Your eBook
          </button>

          <div className="mt-8 p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-900 mb-2">🎉 Success!</h3>
            <ul className="space-y-1 text-sm text-green-700 text-left">
              <li>✓ Professional {type === 'premium' ? '250' : '100'}-page ebook generated</li>
              <li>✓ Custom content tailored to your business</li>
              <li>✓ EPUB format ready for distribution</li>
              <li>✓ Email copy sent to your inbox</li>
            </ul>
          </div>

          <p className="text-sm text-gray-500 mt-6">
            Use this ebook as a lead magnet to grow your email list and establish authority in your industry.
          </p>
        </div>
      </div>
    )
  }

  return null
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <CheckoutSuccessContent />
    </Suspense>
  )
}