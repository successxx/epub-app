import Epub from 'epub-gen-memory'
import { GeneratedEbook } from './ebook-generator'

export interface EpubOptions {
  title: string
  author: string
  publisher: string
  cover?: string
  content: Array<{
    title: string
    data: string
  }>
}

function cleanHtmlForEpub(html: string): string {
  // Clean and format HTML for EPUB compatibility
  let cleaned = html

  // Ensure valid HTML structure
  if (!cleaned.includes('<html>')) {
    cleaned = `
      <!DOCTYPE html>
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta charset="utf-8" />
      </head>
      <body>
        ${cleaned}
      </body>
      </html>
    `
  }

  // Fix common HTML issues
  cleaned = cleaned.replace(/<br>/g, '<br />')
  cleaned = cleaned.replace(/&nbsp;/g, ' ')
  cleaned = cleaned.replace(/&mdash;/g, '—')
  cleaned = cleaned.replace(/&ndash;/g, '–')
  cleaned = cleaned.replace(/&ldquo;/g, '"')
  cleaned = cleaned.replace(/&rdquo;/g, '"')
  cleaned = cleaned.replace(/&lsquo;/g, "'")
  cleaned = cleaned.replace(/&rsquo;/g, "'")

  return cleaned
}

export async function generateEPUB(ebook: GeneratedEbook): Promise<Buffer> {
  const options: EpubOptions = {
    title: ebook.title,
    author: ebook.author,
    publisher: ebook.metadata.companyName,
    content: []
  }

  // Add cover page
  options.content.push({
    title: 'Cover',
    data: `
      <div style="text-align: center; padding: 50px;">
        <h1 style="font-size: 36px; color: #667eea; margin-bottom: 20px;">
          ${ebook.title}
        </h1>
        <h2 style="font-size: 20px; color: #4a5568; margin-bottom: 40px;">
          ${ebook.subtitle}
        </h2>
        <p style="font-size: 18px; color: #718096;">
          ${ebook.author}
        </p>
      </div>
    `
  })

  // Add table of contents
  const tocHtml = `
    <h1>Table of Contents</h1>
    <ol style="font-size: 16px; line-height: 1.8;">
      ${ebook.chapters
        .map(
          (chapter, index) =>
            `<li><a href="#chapter${index + 1}">${chapter.title}</a></li>`
        )
        .join('')}
    </ol>
  `

  options.content.push({
    title: 'Table of Contents',
    data: cleanHtmlForEpub(tocHtml)
  })

  // Add chapters
  for (const chapter of ebook.chapters) {
    const chapterHtml = `
      <h1 id="chapter${chapter.order}">
        Chapter ${chapter.order}: ${chapter.title}
      </h1>
      ${chapter.content}
    `

    options.content.push({
      title: chapter.title,
      data: cleanHtmlForEpub(chapterHtml)
    })
  }

  // Add back matter
  options.content.push({
    title: 'About',
    data: cleanHtmlForEpub(`
      <div style="padding: 30px;">
        <h1>Thank You for Reading</h1>
        <p>
          We hope you found this guide valuable for your business growth.
          This ebook was created specifically for ${ebook.metadata.companyName}
          to help ${ebook.author} achieve their business goals.
        </p>
        <p>
          For more information and personalized solutions, please visit our
          website or contact our team.
        </p>
        <hr />
        <p style="text-align: center; color: #718096;">
          © ${new Date().getFullYear()} ${ebook.metadata.companyName}. All rights reserved.
        </p>
        <p style="text-align: center; color: #a0aec0; font-size: 12px;">
          Generated on ${new Date(ebook.metadata.generatedAt).toLocaleDateString()}
        </p>
      </div>
    `)
  })

  try {
    // Generate EPUB
    const epub = new Epub(options, options.content)
    const buffer = await epub.generate('nodebuffer' as any)
    return buffer as Buffer
  } catch (error) {
    console.error('Error generating EPUB:', error)
    throw error
  }
}

export function generateEpubMetadata(ebook: GeneratedEbook): any {
  return {
    title: ebook.title,
    author: ebook.author,
    publisher: ebook.metadata.companyName,
    subject: 'Business',
    description: ebook.subtitle,
    language: 'en',
    date: new Date().toISOString(),
    modified: new Date().toISOString(),
    creator: 'ePub.AI',
    copyright: `© ${new Date().getFullYear()} ${ebook.metadata.companyName}`,
    identifier: `epub-ai-${Date.now()}`,
    source: 'https://epub.ai'
  }
}