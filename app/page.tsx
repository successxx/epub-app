"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/utils"
import { CheckIcon, BookOpenIcon, ClockIcon, SparklesIcon, RocketIcon, ShieldIcon } from "lucide-react"

const tiers = [
  {
    name: "Basic",
    id: "basic",
    price: 4900,
    description: "Perfect for small businesses and startups",
    features: [
      "15 professionally written chapters",
      "AI-powered content personalization",
      "Website analysis and data extraction",
      "Custom cover design with DALL-E 3",
      "EPUB format delivery",
      "Introduction and conclusion",
      "Instant generation after payment",
      "Based on your website data",
      "Professional formatting",
    ],
  },
  {
    name: "Premium",
    id: "premium",
    price: 99900,
    description: "For serious businesses wanting comprehensive lead magnets",
    features: [
      "30 comprehensive chapters",
      "Advanced AI-powered personalization",
      "Deep website analysis and competitor research",
      "Premium custom cover design",
      "Multiple format delivery (EPUB, PDF)",
      "Extended introduction and conclusion",
      "Priority generation and support",
      "Content optimization for conversions",
      "Industry-specific customization",
      "Bonus content chapters",
      "Advanced scaling strategies",
      "Team building and leadership content",
      "Innovation and growth frameworks",
      "Legacy building chapters",
    ],
    popular: true,
  },
]

export default function Home() {
  const router = useRouter()
  const [selectedTier, setSelectedTier] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleCheckout = async (tierId: string) => {
    setSelectedTier(tierId)
    setLoading(true)

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productType: tierId, userEmail: '' }),
      })

      const data = await response.json()

      if (data.url) {
        window.location.href = data.url
      } else if (data.error && data.error.includes("logged in")) {
        router.push("/login")
      }
    } catch (error) {
      console.error("Checkout error:", error)
      alert("Failed to start checkout. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-blue-600 to-purple-700 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-6 py-24 md:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-200">
              ePub.AI
            </h1>
            <p className="text-2xl md:text-3xl mb-8">
              Generate Professional Lead Magnet eBooks in 5 Minutes
            </p>
            <p className="text-lg md:text-xl mb-12 text-gray-100">
              Transform your website into a powerful 15-30 chapter lead magnet ebook.
              No writing required. Just enter your URL and let AI do the rest.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-gray-100"
                onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Started Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={() => router.push('/login')}
              >
                Sign In
              </Button>
            </div>
            <div className="flex flex-wrap gap-8 justify-center text-sm">
              <div className="flex items-center gap-2">
                <ClockIcon className="w-5 h-5" />
                <span>5-minute generation</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpenIcon className="w-5 h-5" />
                <span>15-30 chapters</span>
              </div>
              <div className="flex items-center gap-2">
                <SparklesIcon className="w-5 h-5" />
                <span>AI-powered content</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-purple-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose Your Plan</h3>
              <p className="text-gray-600">
                Select between our Basic (15 chapters) or Premium (30 chapters) plans
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-purple-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Enter Your Website</h3>
              <p className="text-gray-600">
                Provide your company website URL and we'll analyze your content automatically
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Download Your eBook</h3>
              <p className="text-gray-600">
                Receive your professional lead magnet in EPUB format ready to use
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose ePub.AI?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <RocketIcon className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-600">
                Generate complete ebooks in just 5 minutes, not days or weeks
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <SparklesIcon className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">AI-Powered Quality</h3>
              <p className="text-gray-600">
                Advanced AI creates professional, engaging content tailored to your business
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <ShieldIcon className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Brand Aligned</h3>
              <p className="text-gray-600">
                Content automatically matches your company's voice and value propositions
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <BookOpenIcon className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Comprehensive Content</h3>
              <p className="text-gray-600">
                15-30 chapters of valuable, actionable content for your audience
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <CheckIcon className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ready to Use</h3>
              <p className="text-gray-600">
                Professional formatting, cover design, and multiple formats included
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <ClockIcon className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Save Time & Money</h3>
              <p className="text-gray-600">
                Replace expensive writers and designers with automated excellence
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 text-center mb-16">
            One-time payment. No subscriptions. Instant delivery.
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {tiers.map((tier) => (
              <div
                key={tier.id}
                className={`relative rounded-2xl p-8 ${
                  tier.popular
                    ? "border-2 border-purple-600 shadow-2xl"
                    : "border border-gray-200 shadow-lg"
                }`}
              >
                {tier.popular && (
                  <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-4 py-1 rounded-full text-sm">
                    Most Popular
                  </span>
                )}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-2">{tier.name}</h3>
                  <p className="text-gray-600 mb-4">{tier.description}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold">{formatPrice(tier.price)}</span>
                    <span className="text-gray-600">one-time</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className="w-full"
                  size="lg"
                  variant={tier.popular ? "default" : "outline"}
                  onClick={() => handleCheckout(tier.id)}
                  disabled={loading}
                >
                  {loading && selectedTier === tier.id
                    ? "Processing..."
                    : `Get Started with ${tier.name}`}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Create Your Lead Magnet?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of businesses using ePub.AI to generate leads on autopilot
          </p>
          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100"
            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Start Generating Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-gray-400">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-white font-bold text-xl">ePub.AI</p>
              <p className="text-sm mt-1">Professional lead magnet generation</p>
            </div>
            <div className="flex gap-6">
              <Link href="/api/v1" className="hover:text-white">
                API
              </Link>
              <Link href="/terms" className="hover:text-white">
                Terms
              </Link>
              <Link href="/privacy" className="hover:text-white">
                Privacy
              </Link>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
            © {new Date().getFullYear()} ePub.AI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
