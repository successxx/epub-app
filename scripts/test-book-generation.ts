#!/usr/bin/env node
import { config } from 'dotenv'
import { comprehensiveScrape, ScrapedCompanyData } from '../lib/services/webscraper'
import { generateBook, generateCoverImage } from '../lib/services/bookGenerator'
import { generateEPUB } from '../lib/services/epubGenerator'
import { generatePDF } from '../lib/services/pdfGenerator'
import fs from 'fs/promises'
import path from 'path'

// Load environment variables
config({ path: '.env.local' })

async function testBookGeneration() {
  console.log('🚀 Starting book generation test...\n')

  // Test data - you can modify this or use real website
  const testWebsite = 'https://www.apple.com'

  // Default company data (will be overridden by scraping if successful)
  let companyData: ScrapedCompanyData = {
    senderName: 'John Smith',
    companyName: 'Tech Innovations Inc',
    website: testWebsite,
    industry: 'Technology',
    businessDescription: 'We help businesses transform through innovative technology solutions',
    companyGoal: 'Empowering businesses to achieve digital excellence',
    targetAudience: 'Small to medium businesses looking to scale',
    audiencePainPoints: [
      'Struggling with outdated systems',
      'Need for digital transformation',
      'Lack of technical expertise',
      'High operational costs'
    ],
    companyTestimonials: [
      'This solution transformed our business completely! - Sarah Johnson, CEO',
      'Incredible results within just 30 days. - Mike Chen, CTO'
    ],
    offerName: 'Digital Transformation Package',
    offerPrice: '$2,999',
    offerDescription: 'Complete digital transformation for your business',
    offerBenefits: [
      'Streamlined operations',
      'Increased productivity',
      'Cost reduction',
      'Scalable growth'
    ],
    offerResult: 'A fully transformed, efficient digital business',
    checkoutLink: 'https://example.com/checkout',
    offerTestimonials: [
      'The package exceeded all expectations! - David Lee',
      'ROI within 3 months. Amazing! - Emma Wilson'
    ],
    allBonuses: [
      '30-day implementation support',
      'Free training for your team',
      'Lifetime updates'
    ],
    guarantee: '100% money-back guarantee within 60 days'
  }

  try {
    // Step 1: Scrape website (optional)
    console.log(`📊 Attempting to scrape website: ${testWebsite}`)
    try {
      const scrapedData = await comprehensiveScrape(testWebsite)
      console.log('✅ Website scraped successfully!')

      // Merge scraped data with defaults
      companyData = {
        ...companyData,
        ...scrapedData,
        // Keep some test data for demonstration
        senderName: companyData.senderName || scrapedData.senderName,
        audiencePainPoints: scrapedData.audiencePainPoints?.length > 0
          ? scrapedData.audiencePainPoints
          : companyData.audiencePainPoints
      }

      console.log(`   Company: ${companyData.companyName}`)
      console.log(`   Industry: ${companyData.industry}`)
    } catch (scrapeError) {
      console.log('⚠️  Website scraping failed, using test data')
      console.error('   Error:', scrapeError)
    }

    // Step 2: Generate book content
    console.log('\n📚 Generating book content...')
    console.log('   Type: Basic (15 chapters)')

    const startTime = Date.now()
    const book = await generateBook({
      type: 'basic', // Change to 'premium' for 30 chapters
      companyData
    })

    const generationTime = ((Date.now() - startTime) / 1000).toFixed(1)
    console.log(`✅ Book generated in ${generationTime} seconds!`)
    console.log(`   Title: ${book.title}`)
    if (book.subtitle) {
      console.log(`   Subtitle: ${book.subtitle}`)
    }
    console.log(`   Chapters: ${book.chapters.length}`)

    // Step 3: Generate cover image (optional)
    let coverImageUrl: string | undefined
    console.log('\n🎨 Generating cover image...')
    try {
      if (book.coverPrompt) {
        coverImageUrl = await generateCoverImage(book.coverPrompt)
        console.log('✅ Cover image generated!')
      }
    } catch (coverError) {
      console.log('⚠️  Cover generation failed, continuing without cover')
    }

    // Step 4: Generate EPUB
    console.log('\n📖 Generating EPUB file...')
    const epubBuffer = await generateEPUB({
      book,
      companyData,
      coverImageUrl
    })

    // Save EPUB to desktop
    const epubPath = path.join(
      process.env.HOME || '/Users/ktown',
      'Desktop',
      `${book.title.replace(/[^a-z0-9]/gi, '_')}.epub`
    )
    await fs.writeFile(epubPath, epubBuffer)
    console.log(`✅ EPUB saved to: ${epubPath}`)

    // Step 5: Generate PDF
    console.log('\n📄 Generating PDF file...')
    const pdfBuffer = await generatePDF({
      book,
      companyData,
      coverImageUrl
    })

    // Save PDF to desktop
    const pdfPath = path.join(
      process.env.HOME || '/Users/ktown',
      'Desktop',
      `${book.title.replace(/[^a-z0-9]/gi, '_')}.pdf`
    )
    await fs.writeFile(pdfPath, pdfBuffer)
    console.log(`✅ PDF saved to: ${pdfPath}`)

    // Step 6: Save book data as JSON for inspection
    const jsonPath = path.join(
      process.env.HOME || '/Users/ktown',
      'Desktop',
      `${book.title.replace(/[^a-z0-9]/gi, '_')}_data.json`
    )
    await fs.writeFile(jsonPath, JSON.stringify({
      companyData,
      book: {
        title: book.title,
        subtitle: book.subtitle,
        summary: book.summary,
        chaptersCount: book.chapters.length,
        chapters: book.chapters.map(ch => ({
          number: ch.number,
          title: ch.title,
          wordCount: ch.content.split(' ').length
        }))
      },
      coverImageUrl,
      generationTime: `${generationTime} seconds`
    }, null, 2))
    console.log(`✅ Book data saved to: ${jsonPath}`)

    // Print summary
    console.log('\n' + '='.repeat(60))
    console.log('📊 GENERATION COMPLETE - SUMMARY')
    console.log('='.repeat(60))
    console.log(`Title: ${book.title}`)
    if (book.subtitle) console.log(`Subtitle: ${book.subtitle}`)
    console.log(`Author: ${companyData.senderName || companyData.companyName}`)
    console.log(`Chapters: ${book.chapters.length}`)
    console.log(`Total Words: ~${book.chapters.reduce((acc, ch) => acc + ch.content.split(' ').length, 0).toLocaleString()}`)
    console.log(`Generation Time: ${generationTime} seconds`)
    console.log('\n📁 Files saved to your Desktop:')
    console.log(`   • ${path.basename(epubPath)} (EPUB)`)
    console.log(`   • ${path.basename(pdfPath)} (PDF)`)
    console.log(`   • ${path.basename(jsonPath)} (Data)`)
    console.log('\n✨ You can now open and preview the generated files!')

    // Print sample content
    console.log('\n' + '='.repeat(60))
    console.log('📖 SAMPLE CONTENT - FIRST CHAPTER')
    console.log('='.repeat(60))
    const firstChapter = book.chapters[0]
    console.log(`\nChapter ${firstChapter.number}: ${firstChapter.title}`)
    console.log('-'.repeat(40))
    console.log(firstChapter.content.substring(0, 500) + '...')
    console.log('\n[... rest of chapter content ...]')

  } catch (error) {
    console.error('\n❌ Error during book generation:', error)
    if (error instanceof Error) {
      console.error('   Details:', error.message)
      console.error('   Stack:', error.stack)
    }
    process.exit(1)
  }
}

// Run the test
testBookGeneration().catch(console.error)