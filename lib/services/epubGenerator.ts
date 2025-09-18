import EPub from 'epub-gen-memory'
import { GeneratedBook } from './bookGenerator'
import { ScrapedCompanyData } from './webscraper'

export interface EPubOptions {
  book: GeneratedBook
  companyData: ScrapedCompanyData
  coverImageUrl?: string
}

export async function generateEPUB(options: EPubOptions): Promise<Buffer> {
  const { book, companyData, coverImageUrl } = options

  // Prepare chapters for EPUB
  const epubChapters = book.chapters.map(chapter => ({
    title: chapter.title,
    data: `
      <h2>${chapter.title}</h2>
      ${chapter.content.split('\n\n').map(paragraph =>
        `<p>${paragraph}</p>`
      ).join('\n')}
    `
  }))

  // Add introduction as first chapter
  epubChapters.unshift({
    title: 'Introduction',
    data: `
      <h2>Introduction</h2>
      ${book.introduction.split('\n\n').map(paragraph =>
        `<p>${paragraph}</p>`
      ).join('\n')}
    `
  })

  // Add conclusion as last chapter
  epubChapters.push({
    title: 'Conclusion',
    data: `
      <h2>Conclusion</h2>
      ${book.conclusion.split('\n\n').map(paragraph =>
        `<p>${paragraph}</p>`
      ).join('\n')}
    `
  })

  // EPUB configuration
  const epubConfig = {
    title: book.title,
    author: companyData.senderName || companyData.companyName,
    publisher: companyData.companyName,
    description: book.summary,
    cover: coverImageUrl,
    content: epubChapters,
    css: `
      body {
        font-family: Georgia, serif;
        font-size: 16px;
        line-height: 1.6;
        color: #333;
        margin: 20px;
      }
      h1, h2, h3 {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        color: #111;
        margin-top: 2em;
        margin-bottom: 1em;
      }
      h1 { font-size: 2em; }
      h2 { font-size: 1.5em; }
      h3 { font-size: 1.2em; }
      p {
        margin-bottom: 1em;
        text-align: justify;
      }
      blockquote {
        margin: 1.5em 2em;
        padding-left: 1em;
        border-left: 3px solid #ddd;
        font-style: italic;
        color: #666;
      }
      strong {
        font-weight: bold;
        color: #111;
      }
      em {
        font-style: italic;
      }
      ul, ol {
        margin: 1em 0;
        padding-left: 2em;
      }
      li {
        margin-bottom: 0.5em;
      }
      .chapter-title {
        page-break-before: always;
        margin-top: 3em;
      }
      .cta {
        background-color: #f0f0f0;
        padding: 1.5em;
        margin: 2em 0;
        border-radius: 5px;
        text-align: center;
      }
      .cta a {
        color: #0066cc;
        font-weight: bold;
        text-decoration: none;
      }
    `,
    fonts: [],
    lang: 'en',
    appendChapterTitles: true,
    customOpfTemplatePath: undefined,
    customNcxTocTemplatePath: undefined,
    customHtmlTocTemplatePath: undefined
  }

  try {
    // Generate EPUB buffer
    const epub = new EPub(epubConfig, [])
    const epubBuffer = await epub.genEpub()
    return epubBuffer
  } catch (error) {
    console.error('Error generating EPUB:', error)
    throw new Error('Failed to generate EPUB file')
  }
}

// Convert EPUB buffer to base64 for storage or transmission
export function epubToBase64(buffer: Buffer): string {
  return buffer.toString('base64')
}

// Convert base64 back to buffer for download
export function base64ToEpub(base64: string): Buffer {
  return Buffer.from(base64, 'base64')
}