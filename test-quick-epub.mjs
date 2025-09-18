#!/usr/bin/env node

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import { EPub } from 'epub-gen-memory'
import fs from 'fs/promises'

// Helper functions
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

async function testQuick() {
  console.log('🧪 Quick EPUB Generation Test\n')

  // Test data
  const testTitle = '** Scale to Success'
  const testSubtitle = '** Your Path to Growth'

  console.log('Original title:', testTitle)
  console.log('Cleaned title:', cleanTitle(testTitle))
  console.log('Filename:', cleanFilename(testTitle))
  console.log('')

  // Create test EPUB
  const epubConfig = {
    title: cleanTitle(testTitle),
    author: 'Test Author',
    description: cleanTitle(testSubtitle)
  }

  const chapters = [
    {
      title: 'Introduction',
      content: '<h1>Introduction</h1><p>Welcome to <strong>Scale to Success</strong>!</p><p>This is a test of the <em>premium</em> EPUB generation system.</p>'
    },
    {
      title: 'Chapter 1: Getting Started',
      content: '<div class="chapter-header"><div class="chapter-number">Chapter 1</div><h1 class="chapter-title">Getting Started</h1></div><p>This chapter has <strong>bold text</strong> and <em>italic text</em>.</p>'
    },
    {
      title: 'Chapter 2: Advanced Topics',
      content: '<div class="chapter-header"><div class="chapter-number">Chapter 2</div><h1 class="chapter-title">Advanced Topics</h1></div><p>Here we explore more complex concepts.</p>'
    },
    {
      title: 'Conclusion',
      content: '<h1>Conclusion</h1><p>Thank you for reading!</p><div style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 2em; border-radius: 10px; text-align: center;"><h2 style="color: white;">Ready to Transform?</h2><p>Get started today!</p></div>'
    }
  ]

  try {
    const epub = new EPub(epubConfig, chapters)
    const epubBuffer = await epub.genEpub()

    const filename = `${cleanFilename(testTitle)}_test.epub`
    await fs.writeFile(filename, epubBuffer)

    console.log('✅ EPUB created successfully:', filename)
    console.log('   Size:', (epubBuffer.length / 1024).toFixed(2), 'KB')
    console.log('   Chapters:', chapters.length)
    console.log('\n✨ Test complete!')
  } catch (error) {
    console.error('❌ Error:', error.message)
  }
}

testQuick()