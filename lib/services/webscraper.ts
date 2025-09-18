import * as cheerio from 'cheerio'
import axios from 'axios'

// Dynamic import to prevent client-side bundling
let openai: any = null

if (typeof window === 'undefined') {
  try {
    const OpenAI = require('openai')
    if (process.env.OPENAI_API_KEY) {
      openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      })
    }
  } catch (error) {
    console.error('Failed to initialize OpenAI in webscraper:', error)
  }
}

export interface ScrapedCompanyData {
  senderName?: string
  companyName: string
  website: string
  industry: string
  businessDescription: string
  companyGoal: string
  targetAudience: string
  audiencePainPoints: string[]
  companyTestimonials: string[]
  offerName?: string
  offerPrice?: string
  offerDescription?: string
  offerBenefits?: string[]
  offerResult?: string
  checkoutLink?: string
  offerTestimonials?: string[]
  allBonuses?: string[]
  guarantee?: string
  rawData?: any
}

async function fetchWebsiteContent(url: string): Promise<string> {
  try {
    // Ensure URL has protocol
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`
    }

    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 15000
    })

    const $ = cheerio.load(response.data)

    // Remove script tags, style tags, and comments
    $('script').remove()
    $('style').remove()
    $('noscript').remove()

    // Get meta tags for additional context
    const metaDescription = $('meta[name="description"]').attr('content') || ''
    const metaKeywords = $('meta[name="keywords"]').attr('content') || ''
    const ogDescription = $('meta[property="og:description"]').attr('content') || ''
    const title = $('title').text() || ''

    // Get main content
    const mainContent = $('main, article, .content, #content, [role="main"]').text() || ''
    const bodyContent = $('body').text()

    // Prioritize main content areas
    const textContent = (mainContent || bodyContent)
      .replace(/\s+/g, ' ')
      .trim()

    // Combine meta info with content
    const fullContent = `
      Title: ${title}
      Meta Description: ${metaDescription}
      OG Description: ${ogDescription}
      Keywords: ${metaKeywords}

      Content:
      ${textContent.substring(0, 8000)}
    `.trim()

    return fullContent
  } catch (error) {
    console.error('Error fetching website content:', error)
    throw new Error('Failed to fetch website content')
  }
}

export async function analyzeWebsiteWithAI(url: string): Promise<ScrapedCompanyData> {
  // Check if OpenAI is available (server-side only)
  if (!openai) {
    throw new Error('OpenAI is not initialized. This function must be called on the server side.')
  }

  try {
    const websiteContent = await fetchWebsiteContent(url)

    const prompt = `
    Analyze the following website content and extract detailed business information for creating a lead magnet ebook.

    Website URL: ${url}
    Website Content:
    ${websiteContent}

    Please extract and provide the following information in JSON format:

    {
      "companyName": "The company name",
      "industry": "The industry or sector",
      "businessDescription": "A comprehensive description of what the business does",
      "companyGoal": "The primary goal or mission of the company",
      "targetAudience": "Who their target customers are",
      "audiencePainPoints": ["List of main pain points their audience faces"],
      "companyTestimonials": ["Any testimonials or social proof found"],
      "offerName": "Main product/service offer name if found",
      "offerPrice": "Price of the main offer if mentioned",
      "offerDescription": "Description of what the offer includes",
      "offerBenefits": ["List of benefits of their main offer"],
      "offerResult": "The end result or transformation promised",
      "checkoutLink": "Link to purchase or sign up if found",
      "offerTestimonials": ["Testimonials specific to the offer"],
      "allBonuses": ["Any bonuses or extras mentioned"],
      "guarantee": "Any guarantee or risk reversal offered"
    }

    Be thorough and extract as much relevant information as possible. If something is not found, use null for that field.
    Focus on understanding their value proposition, customer needs, and how they position their solutions.
    `

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are an expert business analyst specializing in extracting comprehensive company information from websites for lead generation purposes. You understand marketing, sales funnels, and value propositions."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      response_format: { type: "json_object" }
    })

    const analysis = JSON.parse(completion.choices[0].message?.content || '{}')

    // Ensure all required fields are present
    const scrapedData: ScrapedCompanyData = {
      companyName: analysis.companyName || 'Company',
      website: url,
      industry: analysis.industry || 'General Business',
      businessDescription: analysis.businessDescription || 'Professional services and solutions provider',
      companyGoal: analysis.companyGoal || 'Helping businesses grow and succeed',
      targetAudience: analysis.targetAudience || 'Businesses and professionals',
      audiencePainPoints: Array.isArray(analysis.audiencePainPoints) ? analysis.audiencePainPoints : [],
      companyTestimonials: Array.isArray(analysis.companyTestimonials) ? analysis.companyTestimonials : [],
      offerName: analysis.offerName || undefined,
      offerPrice: analysis.offerPrice || undefined,
      offerDescription: analysis.offerDescription || undefined,
      offerBenefits: Array.isArray(analysis.offerBenefits) ? analysis.offerBenefits : [],
      offerResult: analysis.offerResult || undefined,
      checkoutLink: analysis.checkoutLink || undefined,
      offerTestimonials: Array.isArray(analysis.offerTestimonials) ? analysis.offerTestimonials : [],
      allBonuses: Array.isArray(analysis.allBonuses) ? analysis.allBonuses : [],
      guarantee: analysis.guarantee || undefined,
      rawData: analysis
    }

    return scrapedData
  } catch (error) {
    console.error('Error analyzing website with AI:', error)

    // Return minimal data if analysis fails
    return {
      companyName: new URL(url).hostname.replace('www.', '').split('.')[0],
      website: url,
      industry: 'General Business',
      businessDescription: 'Professional services provider',
      companyGoal: 'Delivering value to customers',
      targetAudience: 'Businesses',
      audiencePainPoints: [],
      companyTestimonials: []
    }
  }
}

// Multi-page scraping for more comprehensive data
export async function comprehensiveScrape(url: string): Promise<ScrapedCompanyData> {
  try {
    // First get the main page analysis
    const mainPageData = await analyzeWebsiteWithAI(url)

    // Try to fetch additional pages for more context
    const additionalPages = ['/about', '/services', '/products', '/testimonials']
    const additionalData: any[] = []

    for (const page of additionalPages) {
      try {
        const pageUrl = new URL(page, url).href
        const pageData = await analyzeWebsiteWithAI(pageUrl)
        additionalData.push(pageData)
      } catch (error) {
        // Silently continue if page doesn't exist
      }
    }

    // Merge data from all pages (main page takes precedence)
    for (const data of additionalData) {
      // Add testimonials
      if (data.companyTestimonials?.length > 0) {
        mainPageData.companyTestimonials = [
          ...(mainPageData.companyTestimonials || []),
          ...data.companyTestimonials
        ]
      }

      // Add pain points
      if (data.audiencePainPoints?.length > 0) {
        mainPageData.audiencePainPoints = [
          ...(mainPageData.audiencePainPoints || []),
          ...data.audiencePainPoints
        ]
      }

      // Fill in missing fields
      if (!mainPageData.offerName && data.offerName) {
        mainPageData.offerName = data.offerName
        mainPageData.offerDescription = data.offerDescription
        mainPageData.offerBenefits = data.offerBenefits
      }
    }

    // Deduplicate arrays
    if (mainPageData.companyTestimonials) {
      mainPageData.companyTestimonials = [...new Set(mainPageData.companyTestimonials)]
    }
    if (mainPageData.audiencePainPoints) {
      mainPageData.audiencePainPoints = [...new Set(mainPageData.audiencePainPoints)]
    }

    return mainPageData
  } catch (error) {
    console.error('Error in comprehensive scrape:', error)
    return analyzeWebsiteWithAI(url)
  }
}