#!/usr/bin/env node

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import OpenAI from 'openai'
import { EPub } from 'epub-gen-memory'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Helper functions to clean titles and filenames
function cleanTitle(title) {
  return title
    .replace(/^\*+\s*/, '')
    .replace(/\*+$/, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function cleanFilename(title) {
  const cleaned = cleanTitle(title)
  return cleaned
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .replace(/_+/g, '_')
    .substring(0, 100)
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Separate API key for image generation (uses same key if not configured separately)
const openaiImage = new OpenAI({
  apiKey: process.env.OPENAI_IMAGE_API_KEY || process.env.OPENAI_API_KEY,
})

// Premium test data
const testData = {
  senderName: 'John Smith',
  companyName: 'Digital Success Agency',
  website: 'https://digitalsuccessagency.com',
  industry: 'Digital Marketing & Business Growth',
  businessDescription: 'We help ambitious businesses unlock their full potential through cutting-edge digital marketing strategies and transformative growth solutions.',
  companyGoal: 'To empower 10,000 businesses to achieve exponential growth through proven digital strategies',
  targetAudience: 'Small to medium businesses ready to scale from $1M to $10M in revenue',
  audiencePainPoints: [
    'Struggling to generate consistent, qualified leads',
    'Low conversion rates despite high traffic',
    'Unclear on which marketing channels deliver ROI',
    'Limited budget but need maximum impact',
    'Difficulty measuring and tracking marketing effectiveness'
  ],
  companyTestimonials: [
    '"Increased our revenue by 400% in just 6 months!" - Sarah Johnson, CEO of TechStart',
    '"Finally, a strategy that actually delivers results." - Mike Chen, Founder of GrowthCo',
    '"Worth every penny. ROI was visible within 30 days." - Emma Wilson, Director at ScaleUp Inc'
  ],
  offerName: 'Digital Transformation Accelerator Program',
  offerPrice: '$4,997',
  offerDescription: 'A comprehensive 90-day program to transform your digital presence and triple your qualified leads',
  offerBenefits: [
    'Complete digital audit and strategy',
    'Website optimization for conversions',
    'Social media automation system',
    'Email marketing funnel setup',
    'Weekly coaching calls',
    'Lifetime access to our tools'
  ],
  offerResult: 'A fully optimized digital marketing machine that generates 3-5x more qualified leads on autopilot',
  checkoutLink: 'https://digitalsuccessagency.com/accelerator',
  offerTestimonials: [
    '"This program changed everything for our business" - David Lee, CEO',
    '"We went from 10 leads/month to 150 leads/month" - Jessica Park, CMO'
  ],
  allBonuses: [
    'Free website audit ($1,500 value)',
    '30-minute strategy calls every week',
    'Access to premium marketing tools ($500/mo value)',
    'Private mastermind community access'
  ],
  guarantee: '100% money-back guarantee within 30 days if you are not completely satisfied'
}

// Premium formatting functions
function formatPremiumContent(text) {
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim())

  return paragraphs.map(paragraph => {
    let formatted = paragraph.trim()
    // Convert **bold** to <strong>
    formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Convert *italic* to <em>
    formatted = formatted.replace(/\*(.+?)\*/g, '<em>$1</em>')

    return `<p style="margin-bottom: 1.5em; line-height: 1.8; text-align: justify;">${formatted}</p>`
  }).join('\n')
}

// Premium CSS
const premiumCSS = `
  body {
    font-family: 'Crimson Pro', Georgia, serif;
    font-size: 18px;
    line-height: 1.9;
    color: #1a1a1a;
    margin: 40px;
    text-rendering: optimizeLegibility;
  }

  h1 {
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: 2.5em;
    font-weight: 700;
    color: #0a0a0a;
    text-align: center;
    margin: 1.5em 0;
    letter-spacing: -0.02em;
  }

  h2 {
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: 2em;
    font-weight: 600;
    color: #1a1a1a;
    margin-top: 2em;
    margin-bottom: 1em;
    border-bottom: 2px solid #e0e0e0;
    padding-bottom: 0.5em;
  }

  h3 {
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: 1.5em;
    font-weight: 600;
    color: #2c3e50;
    margin: 1.5em 0 1em;
  }

  p {
    margin-bottom: 1.5em;
    text-align: justify;
    text-indent: 1.5em;
  }

  p:first-of-type {
    text-indent: 0;
  }

  .chapter-header {
    text-align: center;
    margin-bottom: 3em;
    page-break-before: always;
  }

  .chapter-number {
    font-family: 'Inter', sans-serif;
    font-size: 1.2em;
    font-weight: 500;
    color: #7a7a7a;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    margin-bottom: 0.5em;
  }

  .chapter-title {
    font-size: 2.5em;
    font-weight: 700;
    margin: 0.5em 0;
  }

  .chapter-divider {
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    margin: 2em auto;
  }

  strong {
    font-weight: 700;
    color: #0a0a0a;
  }

  em {
    font-style: italic;
    color: #2c3e50;
  }

  blockquote {
    margin: 2em 0;
    padding: 1.5em;
    background: #f8f9fa;
    border-left: 4px solid #3b82f6;
    font-style: italic;
    color: #495057;
  }

  .toc-item {
    margin: 1em 0;
    padding: 0.5em 0;
    border-bottom: 1px dotted #e0e0e0;
  }

  .toc-link {
    text-decoration: none;
    color: #1a1a1a;
  }
`

async function generatePremiumBook() {
  console.log('🚀 Generating Premium Lead Magnet eBook...\n')
  console.log(`Company: ${testData.companyName}`)
  console.log(`Type: Premium (15 chapters)\n`)

  const startTime = Date.now()
  const book = {
    title: '',
    subtitle: '',
    introduction: '',
    chapters: [],
    conclusion: '',
    summary: '',
    coverImageUrl: ''
  }

  const totalChapters = 15 // Can be 30 for premium version

  // Step 1: Generate chapters sequentially
  console.log('📚 Generating chapters sequentially...\n')

  for (let i = 1; i <= totalChapters; i++) {
    console.log(`📝 Chapter ${i}/${totalChapters}...`)

    // Build context from previous chapters
    const previousContext = book.chapters.map(ch =>
      `Chapter ${ch.number}: ${ch.title}\nKey Points: ${ch.content.substring(0, 200)}...`
    ).join('\n\n')

    const chapterPrompt = `You are writing Chapter ${i} of ${totalChapters} for a premium lead magnet ebook.

Company: ${testData.companyName}
Industry: ${testData.industry}
Target Audience: ${testData.targetAudience}
Business Description: ${testData.businessDescription}
Company Goal: ${testData.companyGoal}

Audience Pain Points:
${testData.audiencePainPoints.map(p => `- ${p}`).join('\n')}

${previousContext ? `Previous Chapters Summary:\n${previousContext}\n` : ''}

Write Chapter ${i} focusing on: ${
  i <= 3 ? 'identifying and understanding the core problems' :
  i <= 6 ? 'presenting foundational solutions and frameworks' :
  i <= 9 ? 'advanced strategies and implementation' :
  i <= 12 ? 'scaling and optimization techniques' :
  'mastery, future-proofing, and long-term success'
}

Requirements:
- Make it approximately 800-1000 words
- Use **bold** for emphasis (will be converted to proper formatting)
- Use *italics* for subtle emphasis
- Include actionable advice
- Build upon previous chapters without repeating
- End with a transition to the next chapter
- Write in first person as the business owner/expert
- Make it valuable, engaging, and professional

Format:
TITLE: [Compelling chapter title]
CONTENT: [Full chapter content with proper paragraphs]`

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a world-class business author writing a premium lead magnet that provides immense value.'
          },
          {
            role: 'user',
            content: chapterPrompt
          }
        ],
        temperature: 0.8,
        max_tokens: 2000
      })

      const response = completion.choices[0].message?.content || ''
      const titleMatch = response.match(/TITLE:\s*(.+?)(?:\n|CONTENT:)/s)
      const contentMatch = response.match(/CONTENT:\s*([\s\S]+)/s)

      const rawTitle = titleMatch ? titleMatch[1].trim() : `Chapter ${i}`
      const chapter = {
        number: i,
        title: cleanTitle(rawTitle),
        content: contentMatch ? contentMatch[1].trim() : response
      }

      book.chapters.push(chapter)
      console.log(`   ✅ "${chapter.title}"`)
    } catch (error) {
      console.error(`   ❌ Failed: ${error.message}`)
      book.chapters.push({
        number: i,
        title: `Chapter ${i}`,
        content: 'Chapter generation failed. Please try again.'
      })
    }
  }

  // Step 2: Generate summary based on all chapters
  console.log('\n📊 Generating book summary...')
  const summaryPrompt = `Create a compelling summary for this lead magnet ebook.

Company: ${testData.companyName}
Chapters: ${book.chapters.map(ch => ch.title).join(', ')}

Write a 200-word summary that captures the value and transformation readers will experience.`

  try {
    const summaryCompletion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: summaryPrompt }],
      temperature: 0.7,
      max_tokens: 400
    })
    book.summary = summaryCompletion.choices[0].message?.content || ''
    console.log('   ✅ Summary generated')
  } catch (error) {
    console.error('   ❌ Summary failed')
    book.summary = 'A comprehensive guide to digital transformation and business growth.'
  }

  // Step 3: Generate introduction
  console.log('\n✍️  Generating introduction...')
  const introPrompt = `Write a compelling introduction for this lead magnet ebook.

Company: ${testData.companyName}
Summary: ${book.summary}
First Chapter: ${book.chapters[0]?.title}

Write a 500-word introduction that:
- Welcomes the reader
- Establishes credibility
- Previews the transformation
- Creates excitement
- Sets expectations`

  try {
    const introCompletion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: introPrompt }],
      temperature: 0.8,
      max_tokens: 1000
    })
    book.introduction = introCompletion.choices[0].message?.content || ''
    console.log('   ✅ Introduction generated')
  } catch (error) {
    console.error('   ❌ Introduction failed')
    book.introduction = 'Welcome to your transformation journey.'
  }

  // Step 4: Generate conclusion
  console.log('\n🎯 Generating conclusion...')
  const conclusionPrompt = `Write a powerful conclusion for this lead magnet ebook.

Company: ${testData.companyName}
Offer: ${testData.offerName} - ${testData.offerPrice}
Final Chapter: ${book.chapters[book.chapters.length - 1]?.title}

Write a 500-word conclusion that:
- Summarizes key insights
- Inspires action
- Presents the next step (the offer)
- Includes a strong call to action`

  try {
    const conclusionCompletion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: conclusionPrompt }],
      temperature: 0.8,
      max_tokens: 1000
    })
    book.conclusion = conclusionCompletion.choices[0].message?.content || ''
    console.log('   ✅ Conclusion generated')
  } catch (error) {
    console.error('   ❌ Conclusion failed')
    book.conclusion = 'Thank you for reading. Your transformation starts now.'
  }

  // Step 5: Generate title
  console.log('\n📖 Generating book title...')
  const titlePrompt = `Create a compelling title and subtitle for this lead magnet ebook.

Company: ${testData.companyName}
Industry: ${testData.industry}
Target Audience: ${testData.targetAudience}
Summary: ${book.summary}

Provide a benefit-driven title and subtitle that will make the target audience eager to read.

Format:
TITLE: [Short, powerful title]
SUBTITLE: [Longer explanatory subtitle]`

  try {
    const titleCompletion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: titlePrompt }],
      temperature: 0.9,
      max_tokens: 200
    })
    const titleResponse = titleCompletion.choices[0].message?.content || ''
    const titleMatch = titleResponse.match(/TITLE:\s*(.+?)(?:\n|SUBTITLE:)/s)
    const subtitleMatch = titleResponse.match(/SUBTITLE:\s*(.+)/s)

    book.title = cleanTitle(titleMatch ? titleMatch[1].trim() : 'The Digital Success Blueprint')
    book.subtitle = cleanTitle(subtitleMatch ? subtitleMatch[1].trim() : 'Your Roadmap to Exponential Business Growth')

    console.log(`   ✅ Title: "${book.title}"`)
    console.log(`   ✅ Subtitle: "${book.subtitle}"`)
  } catch (error) {
    console.error('   ❌ Title generation failed')
    book.title = 'The Digital Success Blueprint'
    book.subtitle = 'Your Roadmap to Exponential Business Growth'
  }

  // Step 6: Generate cover image with world-class standards
  console.log('\n🎨 Generating cover image...')
  try {
    const coverPrompt = `Create a professional, world-class eBook cover design for:

Title: "${book.title}"
Subtitle: "${book.subtitle}"
Industry: ${testData.industry}

Requirements:
- Modern, clean, professional business book aesthetic
- Bold, eye-catching design suitable for digital lead magnets
- Abstract or symbolic imagery (no people)
- Professional color palette with strong contrast
- Design that conveys transformation, growth, and success
- Minimalist yet impactful composition
- Similar quality to bestselling business books from major publishers
- Suitable for both thumbnail and full-size viewing
- Professional typography layout space for title and subtitle

Style: Professional business book cover, modern design, high-end corporate aesthetic, clean minimalist layout, premium quality similar to Harvard Business Review Press or Penguin Business books.`

    const imageResponse = await openaiImage.images.generate({
      model: 'dall-e-3',
      prompt: coverPrompt,
      n: 1,
      size: '1024x1792', // Portrait for ebook
      quality: 'hd', // HD quality for premium covers
      style: 'natural'
    })

    book.coverImageUrl = imageResponse.data[0].url || ''
    console.log('   ✅ Cover image generated')
  } catch (error) {
    console.error('   ❌ Cover generation failed:', error.message)
    book.coverImageUrl = ''
  }

  // Step 7: Create premium EPUB with all content
  console.log('\n📚 Creating premium EPUB...')

  // Prepare chapters with premium formatting
  const epubChapters = []

  // Table of Contents
  epubChapters.push({
    title: 'Table of Contents',
    content: `
      <h1>Table of Contents</h1>
      <div style="margin: 2em 0;">
        <div class="toc-item"><a href="#intro" class="toc-link">Introduction</a></div>
        ${book.chapters.map((ch, i) =>
          `<div class="toc-item"><a href="#chapter${i+1}" class="toc-link">Chapter ${ch.number}: ${ch.title}</a></div>`
        ).join('\n')}
        <div class="toc-item"><a href="#conclusion" class="toc-link">Conclusion</a></div>
        <div class="toc-item"><a href="#about" class="toc-link">About ${testData.companyName}</a></div>
      </div>
    `,
    beforeToc: true
  })

  // Introduction
  epubChapters.push({
    title: 'Introduction',
    content: `
      <div id="intro" class="chapter-header">
        <h1 class="chapter-title">Introduction</h1>
        <div class="chapter-divider"></div>
      </div>
      ${formatPremiumContent(book.introduction)}
    `
  })

  // All chapters
  book.chapters.forEach((chapter, index) => {
    epubChapters.push({
      title: `Chapter ${chapter.number}: ${chapter.title}`,
      content: `
        <div id="chapter${index+1}" class="chapter-header">
          <div class="chapter-number">Chapter ${chapter.number}</div>
          <h1 class="chapter-title">${chapter.title}</h1>
          <div class="chapter-divider"></div>
        </div>
        ${formatPremiumContent(chapter.content)}
      `
    })
  })

  // Conclusion
  epubChapters.push({
    title: 'Conclusion',
    content: `
      <div id="conclusion" class="chapter-header">
        <h1 class="chapter-title">Conclusion</h1>
        <div class="chapter-divider"></div>
      </div>
      ${formatPremiumContent(book.conclusion)}

      <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 2em; margin: 2em 0; border-radius: 10px; text-align: center;">
        <h2 style="color: white; margin-top: 0;">${testData.offerName}</h2>
        <p style="font-size: 1.1em;">${testData.offerDescription}</p>
        <p style="font-size: 1.3em; font-weight: bold;">${testData.offerPrice}</p>
        <p><a href="${testData.checkoutLink}" style="background: white; color: #667eea; padding: 1em 2em; border-radius: 25px; text-decoration: none; font-weight: bold; display: inline-block; margin-top: 1em;">Get Started Today</a></p>
      </div>
    `
  })

  // About section
  epubChapters.push({
    title: `About ${testData.companyName}`,
    content: `
      <div id="about" class="chapter-header">
        <h1 class="chapter-title">About ${testData.companyName}</h1>
        <div class="chapter-divider"></div>
      </div>
      <p><strong>${testData.businessDescription}</strong></p>
      <h2>Our Mission</h2>
      <p>${testData.companyGoal}</p>
      <h2>Who We Serve</h2>
      <p>${testData.targetAudience}</p>
      <h2>What Our Clients Say</h2>
      ${testData.companyTestimonials.map(t => `<blockquote>${t}</blockquote>`).join('\n')}
      <h2>Ready to Transform Your Business?</h2>
      <p>Visit us at <a href="${testData.website}">${testData.website}</a></p>
    `
  })

  // Create EPUB
  const epubOptions = {
    title: book.title,
    author: testData.senderName || testData.companyName,
    publisher: testData.companyName,
    description: book.subtitle,
    cover: book.coverImageUrl,
    css: premiumCSS,
    lang: 'en',
    tocTitle: 'Table of Contents',
    appendChapterTitles: false,
    version: 3
  }

  try {
    const epub = new EPub(epubOptions, epubChapters)
    const epubBuffer = await epub.genEpub()

    // Save EPUB to Desktop with clean filename
    const filename = cleanFilename(book.title)
    const epubPath = path.join(process.env.HOME || '/Users/ktown', 'Desktop', `${filename}_premium.epub`)
    await fs.writeFile(epubPath, epubBuffer)

    console.log(`   ✅ Premium EPUB saved: ${filename}_premium.epub`)

    // Save metadata
    const metadataPath = path.join(process.env.HOME || '/Users/ktown', 'Desktop', `${filename}_metadata.json`)
    await fs.writeFile(metadataPath, JSON.stringify({
      title: book.title,
      subtitle: book.subtitle,
      author: testData.companyName,
      chapters: book.chapters.length,
      totalWords: book.chapters.reduce((sum, ch) => sum + ch.content.split(' ').length, 0),
      generationTime: ((Date.now() - startTime) / 1000).toFixed(1) + ' seconds',
      coverImage: book.coverImageUrl ? 'Generated' : 'Not generated',
      features: [
        'Premium formatting',
        'Clickable table of contents',
        'Professional typography',
        'Chapter navigation',
        'About section',
        'Call to action boxes'
      ]
    }, null, 2))

    // Print summary
    const totalWords = book.chapters.reduce((sum, ch) => sum + ch.content.split(' ').length, 0)
    const generationTime = ((Date.now() - startTime) / 1000 / 60).toFixed(1)

    console.log('\n' + '='.repeat(60))
    console.log('✨ PREMIUM EBOOK GENERATION COMPLETE!')
    console.log('='.repeat(60))
    console.log(`📕 Title: ${book.title}`)
    console.log(`📝 Subtitle: ${book.subtitle}`)
    console.log(`👤 Author: ${testData.companyName}`)
    console.log(`📚 Chapters: ${book.chapters.length}`)
    console.log(`📖 Total Words: ~${totalWords.toLocaleString()}`)
    console.log(`⏱️  Generation Time: ${generationTime} minutes`)
    console.log(`🎨 Cover Image: ${book.coverImageUrl ? 'Generated' : 'Not generated'}`)
    console.log('\n📁 Files saved to Desktop:')
    console.log(`   • ${filename}_premium.epub (Premium EPUB with all features)`)
    console.log(`   • ${filename}_metadata.json (Book metadata)`)
    console.log('\n✅ Features included:')
    console.log('   • Sequential chapter generation with context')
    console.log('   • Premium formatting and typography')
    console.log('   • Clickable table of contents')
    console.log('   • Introduction and conclusion')
    console.log('   • About the author section')
    console.log('   • Call to action integration')
    console.log('   • Cover image (if generated)')
    console.log('\n🎉 Your premium lead magnet is ready!')
    console.log('   Open the EPUB file to see the beautiful formatting.')
    console.log('='.repeat(60))

  } catch (error) {
    console.error('   ❌ EPUB generation failed:', error.message)
  }
}

// Run the generation
generatePremiumBook().catch(error => {
  console.error('\n❌ Error:', error.message)
  console.error('\nMake sure OPENAI_API_KEY is set in .env.local')
  process.exit(1)
})