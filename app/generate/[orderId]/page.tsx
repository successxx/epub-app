'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { CheckIcon, DownloadIcon, FileTextIcon, BookIcon } from 'lucide-react'

interface EbookData {
  id: string
  title: string
  subtitle: string
  pdfUrl: string
  epubUrl: string
  pageCount: number
  completedAt: string
}

interface ProgressStep {
  name: string
  percentage: number
}

const steps: ProgressStep[] = [
  { name: 'Analyzing your website', percentage: 10 },
  { name: 'Extracting company information', percentage: 20 },
  { name: 'Generating content with AI', percentage: 40 },
  { name: 'Creating professional cover', percentage: 50 },
  { name: 'Formatting chapters', percentage: 60 },
  { name: 'Generating PDF version', percentage: 75 },
  { name: 'Creating EPUB version', percentage: 85 },
  { name: 'Sending email notification', percentage: 95 },
  { name: 'Finalizing your ebook', percentage: 100 },
]

export default function GenerationPage() {
  const params = useParams()
  const router = useRouter()
  const orderId = params.orderId as string

  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState('Initializing...')
  const [ebook, setEbook] = useState<EbookData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!orderId) return

    // Start generation
    startGeneration()

    // Poll for progress
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/generate/progress?orderId=${orderId}`)
        const data = await res.json()

        if (data.error) {
          setError(data.error)
          clearInterval(interval)
          return
        }

        setProgress(data.percentage || 0)
        setCurrentStep(data.message || 'Processing...')

        if (data.status === 'completed' && data.ebook) {
          clearInterval(interval)
          setEbook(data.ebook)
        } else if (data.status === 'failed') {
          clearInterval(interval)
          setError('Generation failed. Please try again or contact support.')
        }
      } catch (err) {
        console.error('Progress check error:', err)
      }
    }, 2000)

    return () => clearInterval(interval)
  }, [orderId])

  async function startGeneration() {
    // Get website URL from localStorage (set during checkout success)
    const websiteUrl = localStorage.getItem('generation_website_url')

    if (!websiteUrl) {
      setError('Website URL not found. Please start over.')
      return
    }

    try {
      await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, websiteUrl })
      })
    } catch (err) {
      console.error('Failed to start generation:', err)
      setError('Failed to start generation. Please try again.')
    }
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-4xl">❌</span>
            </div>
            <h1 className="text-2xl font-bold mb-4 text-gray-900">Generation Error</h1>
            <p className="text-gray-600 mb-8">{error}</p>
            <Button onClick={() => router.push('/')} size="lg">
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    )
  }

  if (ebook) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckIcon className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2 text-gray-900">Your eBook is Ready!</h1>
            <h2 className="text-xl text-gray-600 mb-2">{ebook.title}</h2>
            {ebook.subtitle && (
              <p className="text-gray-500 mb-8 italic">{ebook.subtitle}</p>
            )}

            <div className="bg-gray-50 rounded-lg p-6 mb-8">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">Pages:</span>
                  <span className="ml-2 font-semibold">{ebook.pageCount}</span>
                </div>
                <div>
                  <span className="text-gray-500">Formats:</span>
                  <span className="ml-2 font-semibold">PDF & EPUB</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <a
                href={ebook.pdfUrl}
                download
                className="flex items-center justify-center gap-3 w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition"
              >
                <FileTextIcon className="w-5 h-5" />
                Download PDF Version
              </a>
              <a
                href={ebook.epubUrl}
                download
                className="flex items-center justify-center gap-3 w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition"
              >
                <BookIcon className="w-5 h-5" />
                Download EPUB Version
              </a>
            </div>

            <p className="mt-8 text-sm text-gray-500">
              We've also sent these files to your email address. Downloads will remain available for 30 days.
            </p>

            <Button
              variant="outline"
              className="mt-6"
              onClick={() => router.push('/dashboard')}
            >
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold mb-2 text-gray-900">Generating Your eBook</h1>
        <p className="text-gray-600 mb-8">
          This process takes approximately 5 minutes. Please don't close this page.
        </p>

        <div className="space-y-8">
          {/* Overall Progress */}
          <div>
            <div className="flex justify-between text-sm mb-3">
              <span className="text-gray-600 font-medium">{currentStep}</span>
              <span className="text-gray-600 font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-3" />
          </div>

          {/* Step List */}
          <div className="space-y-3">
            {steps.map((step, index) => {
              const isComplete = progress >= step.percentage
              const isCurrent = progress >= (steps[index - 1]?.percentage || 0) && progress < step.percentage

              return (
                <div key={step.name} className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isComplete ? 'bg-green-500' : isCurrent ? 'bg-blue-500' : 'bg-gray-200'
                  }`}>
                    {isComplete ? (
                      <CheckIcon className="w-5 h-5 text-white" />
                    ) : isCurrent ? (
                      <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                    ) : (
                      <div className="w-3 h-3 bg-gray-400 rounded-full" />
                    )}
                  </div>
                  <span className={`text-sm ${
                    isComplete ? 'text-green-600 font-medium' : isCurrent ? 'text-blue-600 font-medium' : 'text-gray-400'
                  }`}>
                    {step.name}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-800">
              <strong>Did you know?</strong> Your ebook is being generated using advanced AI that analyzes your website's content,
              brand voice, and value propositions to create perfectly aligned content.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}