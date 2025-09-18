import { NextRequest, NextResponse } from 'next/server'
import { comprehensiveScrape } from '@/lib/services/webscraper'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      )
    }

    // Scrape the website using the enhanced scraper
    const companyData = await comprehensiveScrape(url)

    return NextResponse.json(companyData)
  } catch (error) {
    console.error('Scraping error:', error)
    return NextResponse.json(
      { error: 'Failed to scrape website' },
      { status: 500 }
    )
  }
}