import { NextRequest, NextResponse } from 'next/server'
import { analyzeWebsiteWithAI } from '@/lib/services/webscraper'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json(
        { error: 'Website URL is required' },
        { status: 400 }
      )
    }

    // Validate URL format
    try {
      new URL(url)
    } catch {
      return NextResponse.json(
        { error: 'Invalid URL format' },
        { status: 400 }
      )
    }

    // Analyze website with AI
    const companyData = await analyzeWebsiteWithAI(url)

    return NextResponse.json(companyData)
  } catch (error) {
    console.error('Website analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze website' },
      { status: 500 }
    )
  }
}