#!/usr/bin/env node

import { EPub } from 'epub-gen-memory'
import fs from 'fs/promises'

const options = {
  title: "Test EPUB Book",
  author: "Test Author"
}

const content = [
  {
    title: "Chapter 1",
    content: "<h1>Chapter 1</h1><p>This is the first chapter content with <strong>bold text</strong> and <em>italic text</em>.</p>"
  },
  {
    title: "Chapter 2",
    content: "<h1>Chapter 2</h1><p>This is the second chapter content. It has multiple paragraphs.</p><p>Here is the second paragraph with more content.</p>"
  },
  {
    title: "Chapter 3",
    content: "<h1>Chapter 3</h1><p>This is the third and final chapter.</p><p>It demonstrates that the EPUB generation is working correctly.</p>"
  }
]

try {
  console.log('Creating EPUB...')
  const epub = new EPub(options, content)
  const epubBuffer = await epub.genEpub()

  await fs.writeFile('test-simple.epub', epubBuffer)
  console.log('✅ EPUB created successfully: test-simple.epub')
  console.log(`   Size: ${(epubBuffer.length / 1024).toFixed(2)} KB`)
} catch (error) {
  console.error('❌ Error:', error)
}