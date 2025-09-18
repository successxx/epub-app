#!/usr/bin/env node
require('dotenv').config({ path: '.env.local' })

const fs = require('fs').promises
const path = require('path')

async function testGeneration() {
  console.log('🚀 Testing Book Generation System\n')

  // Check if OpenAI API key is set
  if (!process.env.OPENAI_API_KEY) {
    console.error('❌ OPENAI_API_KEY not found in .env.local')
    console.log('\nPlease create .env.local file with:')
    console.log('OPENAI_API_KEY=your_api_key_here')
    process.exit(1)
  }

  // Import modules after env is loaded
  const { comprehensiveScrape } = require('./lib/services/webscraper')
  const { generateBook, generateCoverImage } = require('./lib/services/bookGenerator')
  const { generateEPUB } = require('./lib/services/epubGenerator')
  const { generatePDF } = require('./lib/services/pdfGenerator')

  // Test company data
  const testData = {
    senderName: 'John Smith',
    companyName: 'Digital Success Agency',
    website: 'https://example.com',
    industry: 'Digital Marketing',
    businessDescription: 'We help businesses grow their online presence and generate more leads through proven digital marketing strategies.',
    companyGoal: 'To empower businesses with cutting-edge digital marketing solutions that drive real results',
    targetAudience: 'Small to medium-sized businesses looking to scale their online presence',
    audiencePainPoints: [
      'Low website traffic',
      'Poor conversion rates',
      'Unclear marketing strategy',
      'Limited budget for advertising',
      'Difficulty measuring ROI'
    ],
    companyTestimonials: [
      'Increased our leads by 300% in just 3 months! - Sarah Johnson, CEO of TechStart',
      'Finally, a marketing strategy that actually works. - Mike Chen, Founder of GrowthCo'
    ],
    offerName: 'Complete Digital Marketing Transformation',
    offerPrice: '$1,997',
    offerDescription: 'A comprehensive 90-day program to transform your digital marketing and triple your leads',
    offerBenefits: [
      'Custom marketing strategy',
      'Website optimization',
      'Social media management',
      'Email marketing setup',
      'Analytics and reporting'
    ],
    offerResult: 'A fully optimized digital marketing system that generates consistent leads on autopilot',
    checkoutLink: 'https://example.com/checkout',
    offerTestimonials: [
      'Best investment we ever made for our business. - David Lee',
      'The ROI was visible within the first month! - Emma Wilson'
    ],
    allBonuses: [
      'Free website audit ($500 value)',
      '30-minute strategy call each week',
      'Access to premium marketing tools'
    ],
    guarantee: '30-day money-back guarantee if you are not completely satisfied'
  }

  try {
    console.log('📚 Starting book generation...')
    console.log(`   Company: ${testData.companyName}`)
    console.log(`   Type: Basic (15 chapters)\n`)

    const startTime = Date.now()

    // Generate the book
    const book = await generateBook({
      type: 'basic',
      companyData: testData
    })

    const generationTime = ((Date.now() - startTime) / 1000 / 60).toFixed(1)

    console.log(`\n✅ Book generated successfully!`)
    console.log(`   Title: ${book.title}`)
    if (book.subtitle) {
      console.log(`   Subtitle: ${book.subtitle}`)
    }
    console.log(`   Chapters: ${book.chapters.length}`)
    console.log(`   Generation time: ${generationTime} minutes`)

    // Generate EPUB
    console.log('\n📖 Creating EPUB...')
    const epubBuffer = await generateEPUB({
      book,
      companyData: testData
    })

    // Generate PDF
    console.log('📄 Creating PDF...')
    const pdfBuffer = await generatePDF({
      book,
      companyData: testData
    })

    // Save files to Desktop
    const desktopPath = path.join(require('os').homedir(), 'Desktop')
    const filename = book.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()

    const epubPath = path.join(desktopPath, `${filename}.epub`)
    const pdfPath = path.join(desktopPath, `${filename}.pdf`)
    const jsonPath = path.join(desktopPath, `${filename}_content.json`)

    await fs.writeFile(epubPath, epubBuffer)
    await fs.writeFile(pdfPath, pdfBuffer)
    await fs.writeFile(jsonPath, JSON.stringify(book, null, 2))

    console.log('\n✅ Files saved to Desktop:')
    console.log(`   • ${filename}.epub`)
    console.log(`   • ${filename}.pdf`)
    console.log(`   • ${filename}_content.json`)

    // Print sample
    console.log('\n' + '='.repeat(60))
    console.log('SAMPLE - CHAPTER 1')
    console.log('='.repeat(60))
    const chapter1 = book.chapters[0]
    console.log(`\n${chapter1.title}\n`)
    console.log(chapter1.content.substring(0, 500) + '...\n')

    console.log('='.repeat(60))
    console.log('✨ Generation complete! Check your Desktop for the files.')
    console.log('='.repeat(60))

  } catch (error) {
    console.error('\n❌ Error:', error.message)
    console.error('\nMake sure your .env.local file has:')
    console.error('OPENAI_API_KEY=your_api_key_here')
    process.exit(1)
  }
}

// Run the test
testGeneration().catch(console.error)