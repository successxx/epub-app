#!/usr/bin/env node

// Simple test script to generate a book without TypeScript compilation

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import OpenAI from 'openai'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Test company data
const testData = {
  companyName: 'Tech Innovations Inc',
  website: 'https://example.com',
  industry: 'Technology & Digital Marketing',
  businessDescription: 'We help businesses transform through innovative technology solutions and digital marketing strategies that drive real results.',
  targetAudience: 'Small to medium businesses looking to scale',
}

async function generateSimpleBook() {
  console.log('🚀 Generating Test eBook...\n')
  console.log(`Company: ${testData.companyName}`)
  console.log(`Industry: ${testData.industry}\n`)

  const chapters = []
  const totalChapters = 3 // Generate 3 chapters for quick test

  // Generate chapters
  for (let i = 1; i <= totalChapters; i++) {
    console.log(`📝 Generating Chapter ${i}...`)

    const prompt = `Write Chapter ${i} of a lead magnet ebook for ${testData.companyName}.

Company Description: ${testData.businessDescription}
Target Audience: ${testData.targetAudience}
Industry: ${testData.industry}

Write a compelling chapter (about 500 words) that provides value to the target audience.
Chapter ${i} should focus on ${
      i === 1 ? 'identifying the main problems the audience faces' :
      i === 2 ? 'presenting solutions and strategies' :
      'implementation and getting started'
    }.

Format your response as:
TITLE: [Chapter Title]
CONTENT: [Chapter Content]`

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a professional business writer creating valuable lead magnet content.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 1000
      })

      const response = completion.choices[0].message?.content || ''
      const titleMatch = response.match(/TITLE:\s*(.+)/)
      const contentMatch = response.match(/CONTENT:\s*([\s\S]+)/)

      chapters.push({
        number: i,
        title: titleMatch ? titleMatch[1].trim() : `Chapter ${i}`,
        content: contentMatch ? contentMatch[1].trim() : response
      })

      console.log(`   ✅ Chapter ${i} complete: ${chapters[i-1].title}`)
    } catch (error) {
      console.error(`   ❌ Failed to generate chapter ${i}:`, error.message)
      chapters.push({
        number: i,
        title: `Chapter ${i}`,
        content: 'Content generation failed.'
      })
    }
  }

  // Generate title
  console.log('\n📚 Generating book title...')
  const titlePrompt = `Create a compelling title and subtitle for a lead magnet ebook.
Company: ${testData.companyName}
Industry: ${testData.industry}
Audience: ${testData.targetAudience}

Provide a short, benefit-driven title and optional subtitle.
Format:
TITLE: [Title]
SUBTITLE: [Subtitle]`

  let bookTitle = 'Digital Transformation Guide'
  let bookSubtitle = 'Your Path to Business Success'

  try {
    const titleCompletion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'user', content: titlePrompt }
      ],
      temperature: 0.9,
      max_tokens: 100
    })

    const titleResponse = titleCompletion.choices[0].message?.content || ''
    const titleMatch = titleResponse.match(/TITLE:\s*(.+)/)
    const subtitleMatch = titleResponse.match(/SUBTITLE:\s*(.+)/)

    if (titleMatch) bookTitle = titleMatch[1].trim()
    if (subtitleMatch) bookSubtitle = subtitleMatch[1].trim()
  } catch (error) {
    console.error('   ⚠️  Title generation failed, using defaults')
  }

  console.log(`   Title: ${bookTitle}`)
  console.log(`   Subtitle: ${bookSubtitle}`)

  // Create PDF
  console.log('\n📄 Creating PDF...')
  const pdfDoc = await PDFDocument.create()
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman)

  // Title page
  let page = pdfDoc.addPage()
  const { width, height } = page.getSize()

  page.drawText(bookTitle, {
    x: 50,
    y: height - 100,
    size: 32,
    font: helveticaBold,
    color: rgb(0.1, 0.1, 0.1)
  })

  page.drawText(bookSubtitle, {
    x: 50,
    y: height - 140,
    size: 18,
    font: helvetica,
    color: rgb(0.3, 0.3, 0.3)
  })

  page.drawText(testData.companyName, {
    x: 50,
    y: 100,
    size: 16,
    font: helvetica,
    color: rgb(0.2, 0.2, 0.2)
  })

  // Add chapters
  for (const chapter of chapters) {
    page = pdfDoc.addPage()
    let yPosition = height - 80

    // Chapter header
    page.drawText(`Chapter ${chapter.number}`, {
      x: 50,
      y: yPosition,
      size: 14,
      font: helvetica,
      color: rgb(0.3, 0.3, 0.3)
    })

    yPosition -= 30

    // Chapter title
    page.drawText(chapter.title, {
      x: 50,
      y: yPosition,
      size: 24,
      font: helveticaBold,
      color: rgb(0.1, 0.1, 0.1)
    })

    yPosition -= 40

    // Chapter content (simplified - just first part)
    // Clean the content to remove newlines and special characters
    const cleanContent = chapter.content
      .replace(/\n/g, ' ')
      .replace(/[^\x20-\x7E]/g, '') // Remove non-ASCII characters
      .trim()

    const words = cleanContent.split(' ')
    let line = ''
    const maxWidth = width - 100
    const lines = []

    for (const word of words) {
      const testLine = line ? `${line} ${word}` : word
      const testWidth = timesRoman.widthOfTextAtSize(testLine, 12)

      if (testWidth > maxWidth) {
        lines.push(line)
        line = word
      } else {
        line = testLine
      }

      if (lines.length > 30) break // Limit lines per page for simplicity
    }
    if (line) lines.push(line)

    for (const textLine of lines) {
      if (yPosition < 50) break

      page.drawText(textLine, {
        x: 50,
        y: yPosition,
        size: 12,
        font: timesRoman,
        color: rgb(0, 0, 0)
      })
      yPosition -= 16
    }
  }

  // Save PDF
  const pdfBytes = await pdfDoc.save()
  const pdfPath = path.join(process.env.HOME || '/Users/ktown', 'Desktop', 'test_ebook.pdf')
  await fs.writeFile(pdfPath, pdfBytes)

  // Save content as JSON
  const jsonPath = path.join(process.env.HOME || '/Users/ktown', 'Desktop', 'test_ebook_content.json')
  await fs.writeFile(jsonPath, JSON.stringify({
    title: bookTitle,
    subtitle: bookSubtitle,
    company: testData,
    chapters: chapters.map(ch => ({
      number: ch.number,
      title: ch.title,
      wordCount: ch.content.split(' ').length
    })),
    fullContent: chapters
  }, null, 2))

  console.log('\n' + '='.repeat(60))
  console.log('✅ GENERATION COMPLETE!')
  console.log('='.repeat(60))
  console.log(`📕 Title: ${bookTitle}`)
  console.log(`📝 Chapters: ${chapters.length}`)
  console.log(`📁 Files saved to Desktop:`)
  console.log(`   • test_ebook.pdf`)
  console.log(`   • test_ebook_content.json`)
  console.log('\n✨ Open the PDF on your Desktop to preview the generated eBook!')
  console.log('='.repeat(60))
}

// Run the test
generateSimpleBook().catch(error => {
  console.error('\n❌ Error:', error.message)
  console.error('\nMake sure OPENAI_API_KEY is set in .env.local')
  process.exit(1)
})