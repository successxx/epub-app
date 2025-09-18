'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

function GeneratePageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get('session_id')
  const type = searchParams.get('type') as 'basic' | 'premium'

  const [step, setStep] = useState<'scraping' | 'form' | 'generating' | 'complete'>('scraping')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [companyData, setCompanyData] = useState<any>({})
  const [scrapedData, setScrapedData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [bookId, setBookId] = useState('')
  const [bookStatus, setBookStatus] = useState<any>(null)

  // Poll for book status
  useEffect(() => {
    if (bookId && step === 'generating') {
      const interval = setInterval(async () => {
        try {
          const response = await fetch(`/api/generate-book?bookId=${bookId}`)
          const data = await response.json()

          setBookStatus(data)

          if (data.status === 'completed') {
            setStep('complete')
            clearInterval(interval)
          } else if (data.status === 'failed') {
            setError('Book generation failed. Please contact support.')
            clearInterval(interval)
          }
        } catch (error) {
          console.error('Error checking book status:', error)
        }
      }, 5000) // Check every 5 seconds

      return () => clearInterval(interval)
    }
  }, [bookId, step])

  const handleWebsiteScrape = async () => {
    if (!websiteUrl) {
      setError('Please enter a website URL')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: websiteUrl })
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setScrapedData(data)
      setCompanyData({
        ...data,
        senderName: data.senderName || '',
        offerName: data.offerName || '',
        offerPrice: data.offerPrice || '',
        offerDescription: data.offerDescription || '',
        offerBenefits: data.offerBenefits?.join(', ') || '',
        offerResult: data.offerResult || '',
        checkoutLink: data.checkoutLink || '',
        offerTestimonials: data.offerTestimonials?.join('\n') || '',
        allBonuses: data.allBonuses?.join(', ') || '',
        guarantee: data.guarantee || ''
      })
      setStep('form')
    } catch (err) {
      console.error('Scraping error:', err)
      setError('Failed to analyze website. You can still fill in the information manually.')
      setStep('form')
    } finally {
      setLoading(false)
    }
  }

  const handleGenerateBook = async () => {
    setLoading(true)
    setError('')
    setStep('generating')

    try {
      const response = await fetch('/api/generate-book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sessionId,
          websiteUrl,
          companyData
        })
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      setBookId(data.bookId)
    } catch (err) {
      console.error('Generation error:', err)
      setError('Failed to start book generation. Please try again.')
      setStep('form')
      setLoading(false)
    }
  }

  const downloadEpub = () => {
    if (bookStatus?.epub_url) {
      const link = document.createElement('a')
      link.href = bookStatus.epub_url
      link.download = `${bookStatus.title || 'ebook'}.epub`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  if (!sessionId || !type) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Session</h1>
          <p className="text-gray-600 mb-4">Please complete checkout first.</p>
          <a href="/" className="text-blue-600 hover:underline">
            Return to Home
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className={`flex items-center ${step === 'scraping' ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step === 'scraping' ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}>
                  1
                </div>
                <span className="ml-2 font-medium">Website Analysis</span>
              </div>
              <div className={`flex items-center ${step === 'form' ? 'text-blue-600' : 'text-gray-400'}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step === 'form' ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}>
                  2
                </div>
                <span className="ml-2 font-medium">Company Details</span>
              </div>
              <div className={`flex items-center ${
                step === 'generating' || step === 'complete' ? 'text-blue-600' : 'text-gray-400'
              }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  step === 'generating' || step === 'complete' ? 'bg-blue-600 text-white' : 'bg-gray-200'
                }`}>
                  3
                </div>
                <span className="ml-2 font-medium">Generate Book</span>
              </div>
            </div>
          </div>

          {/* Step 1: Website Scraping */}
          {step === 'scraping' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Let's Analyze Your Website
              </h2>
              <p className="text-gray-600 mb-6">
                Enter your website URL and we'll automatically extract your company information.
                You can also skip this step and enter the details manually.
              </p>

              <div className="mb-4">
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                  Website URL
                </label>
                <input
                  type="url"
                  id="website"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="https://yourwebsite.com"
                />
              </div>

              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
                  {error}
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  onClick={handleWebsiteScrape}
                  disabled={loading}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                    loading
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  {loading ? 'Analyzing...' : 'Analyze Website'}
                </button>
                <button
                  onClick={() => setStep('form')}
                  className="flex-1 py-3 px-6 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50"
                >
                  Skip & Enter Manually
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Company Form */}
          {step === 'form' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Company & Offer Details
              </h2>
              <p className="text-gray-600 mb-6">
                Review and complete your company information. The more details you provide,
                the better your book will be.
              </p>

              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={companyData.senderName || ''}
                    onChange={(e) => setCompanyData({ ...companyData, senderName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={companyData.companyName || ''}
                    onChange={(e) => setCompanyData({ ...companyData, companyName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Acme Corp"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Industry
                  </label>
                  <input
                    type="text"
                    value={companyData.industry || ''}
                    onChange={(e) => setCompanyData({ ...companyData, industry: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Technology, Healthcare, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Business Description
                  </label>
                  <textarea
                    value={companyData.businessDescription || ''}
                    onChange={(e) => setCompanyData({ ...companyData, businessDescription: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="What does your company do?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Primary Company Goal
                  </label>
                  <input
                    type="text"
                    value={companyData.companyGoal || ''}
                    onChange={(e) => setCompanyData({ ...companyData, companyGoal: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Help businesses grow, Save time, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Audience
                  </label>
                  <input
                    type="text"
                    value={companyData.targetAudience || ''}
                    onChange={(e) => setCompanyData({ ...companyData, targetAudience: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Small businesses, entrepreneurs, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Audience Pain Points
                  </label>
                  <textarea
                    value={companyData.audiencePainPoints || ''}
                    onChange={(e) => setCompanyData({ ...companyData, audiencePainPoints: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={2}
                    placeholder="What problems does your audience face?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Main Offer Name
                  </label>
                  <input
                    type="text"
                    value={companyData.offerName || ''}
                    onChange={(e) => setCompanyData({ ...companyData, offerName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Your product or service name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Offer Price
                  </label>
                  <input
                    type="text"
                    value={companyData.offerPrice || ''}
                    onChange={(e) => setCompanyData({ ...companyData, offerPrice: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="$99, Free Trial, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Offer Description
                  </label>
                  <textarea
                    value={companyData.offerDescription || ''}
                    onChange={(e) => setCompanyData({ ...companyData, offerDescription: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={2}
                    placeholder="What does your offer include?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Key Benefits
                  </label>
                  <textarea
                    value={companyData.offerBenefits || ''}
                    onChange={(e) => setCompanyData({ ...companyData, offerBenefits: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows={2}
                    placeholder="List the main benefits of your offer"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Expected Result
                  </label>
                  <input
                    type="text"
                    value={companyData.offerResult || ''}
                    onChange={(e) => setCompanyData({ ...companyData, offerResult: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="What outcome can customers expect?"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Checkout Link (Optional)
                  </label>
                  <input
                    type="url"
                    value={companyData.checkoutLink || ''}
                    onChange={(e) => setCompanyData({ ...companyData, checkoutLink: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="https://yoursite.com/buy"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Guarantee (Optional)
                  </label>
                  <input
                    type="text"
                    value={companyData.guarantee || ''}
                    onChange={(e) => setCompanyData({ ...companyData, guarantee: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="30-day money back guarantee"
                  />
                </div>
              </div>

              <div className="mt-6 flex space-x-4">
                <button
                  onClick={() => setStep('scraping')}
                  className="flex-1 py-3 px-6 rounded-lg font-semibold border border-gray-300 hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  onClick={handleGenerateBook}
                  disabled={loading || !companyData.companyName}
                  className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-colors ${
                    loading || !companyData.companyName
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
                >
                  Generate Book
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Generating */}
          {step === 'generating' && (
            <div className="text-center py-12">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100">
                  <svg
                    className="animate-spin h-10 w-10 text-blue-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Generating Your Book
              </h2>
              <p className="text-gray-600 mb-4">
                This may take a few minutes. We're creating {type === 'premium' ? '30' : '15'} chapters
                of personalized content just for you.
              </p>
              <div className="text-sm text-gray-500">
                {bookStatus?.status === 'generating' && 'Writing chapters...'}
              </div>
            </div>
          )}

          {/* Step 4: Complete */}
          {step === 'complete' && bookStatus && (
            <div className="text-center py-12">
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100">
                  <svg
                    className="w-10 h-10 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Your Book is Ready!
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                "{bookStatus.title}"
              </p>
              {bookStatus.subtitle && (
                <p className="text-gray-500 mb-6">{bookStatus.subtitle}</p>
              )}

              {bookStatus.cover_image_url && (
                <img
                  src={bookStatus.cover_image_url}
                  alt="Book Cover"
                  className="mx-auto mb-6 rounded-lg shadow-lg max-w-xs"
                />
              )}

              <button
                onClick={downloadEpub}
                className="py-3 px-8 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white"
              >
                Download EPUB
              </button>

              <p className="text-sm text-gray-500 mt-4">
                Your book has been generated and is ready for download.
                You can use this as a lead magnet to grow your email list!
              </p>
            </div>
          )}

          {error && step !== 'scraping' && (
            <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function GeneratePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <GeneratePageContent />
    </Suspense>
  )
}