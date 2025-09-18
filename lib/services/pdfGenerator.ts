import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { GeneratedBook } from './bookGenerator'
import { ScrapedCompanyData } from './webscraper'

export interface PDFOptions {
  book: GeneratedBook
  companyData: ScrapedCompanyData
  coverImageUrl?: string
}

export async function generatePDF(options: PDFOptions): Promise<Buffer> {
  const { book, companyData, coverImageUrl } = options

  // Create a new PDF document
  const pdfDoc = await PDFDocument.create()

  // Embed fonts
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const timesRoman = await pdfDoc.embedFont(StandardFonts.TimesRoman)

  // Add metadata
  pdfDoc.setTitle(book.title)
  pdfDoc.setAuthor(companyData.senderName || companyData.companyName)
  pdfDoc.setSubject(book.subtitle || 'Lead Magnet eBook')
  pdfDoc.setCreator('EPUB AI - Professional Lead Magnet Generator')
  pdfDoc.setProducer('EPUB AI')
  pdfDoc.setCreationDate(new Date())
  pdfDoc.setModificationDate(new Date())

  // Title Page
  let page = pdfDoc.addPage()
  const { width, height } = page.getSize()

  // Add cover image if available
  if (coverImageUrl && coverImageUrl.startsWith('http')) {
    try {
      const response = await fetch(coverImageUrl)
      const imageBytes = await response.arrayBuffer()
      const image = await pdfDoc.embedJpg(new Uint8Array(imageBytes))

      const imageSize = 300
      const x = (width - imageSize) / 2
      const y = height - imageSize - 100

      page.drawImage(image, {
        x,
        y,
        width: imageSize,
        height: imageSize * 1.4, // Book cover aspect ratio
      })
    } catch (error) {
      console.error('Failed to embed cover image:', error)
    }
  }

  // Title
  const titleSize = 32
  const titleLines = wrapText(book.title, helveticaBold, titleSize, width - 100)
  let yPosition = coverImageUrl ? 250 : height - 150

  for (const line of titleLines) {
    const titleWidth = helveticaBold.widthOfTextAtSize(line, titleSize)
    page.drawText(line, {
      x: (width - titleWidth) / 2,
      y: yPosition,
      size: titleSize,
      font: helveticaBold,
      color: rgb(0.1, 0.1, 0.1),
    })
    yPosition -= titleSize + 5
  }

  // Subtitle
  if (book.subtitle) {
    const subtitleSize = 18
    const subtitleLines = wrapText(book.subtitle, helvetica, subtitleSize, width - 100)
    yPosition -= 20

    for (const line of subtitleLines) {
      const subtitleWidth = helvetica.widthOfTextAtSize(line, subtitleSize)
      page.drawText(line, {
        x: (width - subtitleWidth) / 2,
        y: yPosition,
        size: subtitleSize,
        font: helvetica,
        color: rgb(0.3, 0.3, 0.3),
      })
      yPosition -= subtitleSize + 5
    }
  }

  // Author
  const authorSize = 16
  const authorText = companyData.senderName || companyData.companyName
  const authorWidth = helvetica.widthOfTextAtSize(authorText, authorSize)

  page.drawText(authorText, {
    x: (width - authorWidth) / 2,
    y: 100,
    size: authorSize,
    font: helvetica,
    color: rgb(0.2, 0.2, 0.2),
  })

  // Table of Contents
  page = pdfDoc.addPage()
  yPosition = height - 80

  page.drawText('Table of Contents', {
    x: 50,
    y: yPosition,
    size: 24,
    font: helveticaBold,
    color: rgb(0.1, 0.1, 0.1),
  })

  yPosition -= 40

  // Introduction
  page.drawText('Introduction', {
    x: 50,
    y: yPosition,
    size: 14,
    font: helvetica,
    color: rgb(0.2, 0.2, 0.2),
  })
  yPosition -= 20

  // Chapters
  for (const chapter of book.chapters) {
    if (yPosition < 100) {
      page = pdfDoc.addPage()
      yPosition = height - 80
    }

    const chapterTitle = `Chapter ${chapter.number}: ${chapter.title}`
    const lines = wrapText(chapterTitle, helvetica, 14, width - 100)

    for (const line of lines) {
      page.drawText(line, {
        x: 50,
        y: yPosition,
        size: 14,
        font: helvetica,
        color: rgb(0.2, 0.2, 0.2),
      })
      yPosition -= 18
    }
  }

  // Conclusion
  page.drawText('Conclusion', {
    x: 50,
    y: yPosition,
    size: 14,
    font: helvetica,
    color: rgb(0.2, 0.2, 0.2),
  })

  // Introduction Page
  page = pdfDoc.addPage()
  yPosition = height - 80

  page.drawText('Introduction', {
    x: 50,
    y: yPosition,
    size: 24,
    font: helveticaBold,
    color: rgb(0.1, 0.1, 0.1),
  })

  yPosition -= 40

  const introLines = wrapText(book.introduction, timesRoman, 12, width - 100)
  for (const line of introLines) {
    if (yPosition < 50) {
      page = pdfDoc.addPage()
      yPosition = height - 50
    }

    page.drawText(line, {
      x: 50,
      y: yPosition,
      size: 12,
      font: timesRoman,
      color: rgb(0, 0, 0),
    })
    yPosition -= 16
  }

  // Chapters
  for (const chapter of book.chapters) {
    // Chapter title page
    page = pdfDoc.addPage()
    yPosition = height - 80

    page.drawText(`Chapter ${chapter.number}`, {
      x: 50,
      y: yPosition,
      size: 18,
      font: helvetica,
      color: rgb(0.3, 0.3, 0.3),
    })

    yPosition -= 30

    const titleLines = wrapText(chapter.title, helveticaBold, 24, width - 100)
    for (const line of titleLines) {
      page.drawText(line, {
        x: 50,
        y: yPosition,
        size: 24,
        font: helveticaBold,
        color: rgb(0.1, 0.1, 0.1),
      })
      yPosition -= 30
    }

    yPosition -= 20

    // Chapter content
    const contentParagraphs = chapter.content.split('\n\n')

    for (const paragraph of contentParagraphs) {
      const lines = wrapText(paragraph, timesRoman, 12, width - 100)

      for (const line of lines) {
        if (yPosition < 50) {
          page = pdfDoc.addPage()
          yPosition = height - 50
        }

        page.drawText(line, {
          x: 50,
          y: yPosition,
          size: 12,
          font: timesRoman,
          color: rgb(0, 0, 0),
        })
        yPosition -= 16
      }

      yPosition -= 8 // Extra space between paragraphs
    }
  }

  // Conclusion
  page = pdfDoc.addPage()
  yPosition = height - 80

  page.drawText('Conclusion', {
    x: 50,
    y: yPosition,
    size: 24,
    font: helveticaBold,
    color: rgb(0.1, 0.1, 0.1),
  })

  yPosition -= 40

  const conclusionLines = wrapText(book.conclusion, timesRoman, 12, width - 100)
  for (const line of conclusionLines) {
    if (yPosition < 50) {
      page = pdfDoc.addPage()
      yPosition = height - 50
    }

    page.drawText(line, {
      x: 50,
      y: yPosition,
      size: 12,
      font: timesRoman,
      color: rgb(0, 0, 0),
    })
    yPosition -= 16
  }

  // About the Author - Final Page
  page = pdfDoc.addPage()
  yPosition = height - 80

  page.drawText('About the Author', {
    x: 50,
    y: yPosition,
    size: 24,
    font: helveticaBold,
    color: rgb(0.1, 0.1, 0.1),
  })

  yPosition -= 40

  const aboutText = `${companyData.senderName || companyData.companyName} is the founder of ${companyData.companyName}. ${companyData.businessDescription}

Industry: ${companyData.industry}
Target Audience: ${companyData.targetAudience}
Mission: ${companyData.companyGoal}

For more information, visit: ${companyData.website}`

  const aboutLines = wrapText(aboutText, timesRoman, 12, width - 100)
  for (const line of aboutLines) {
    if (yPosition < 50) {
      page = pdfDoc.addPage()
      yPosition = height - 50
    }

    page.drawText(line, {
      x: 50,
      y: yPosition,
      size: 12,
      font: timesRoman,
      color: rgb(0, 0, 0),
    })
    yPosition -= 16
  }

  // Save the PDF
  const pdfBytes = await pdfDoc.save()
  return Buffer.from(pdfBytes)
}

// Helper function to wrap text
function wrapText(
  text: string,
  font: any,
  fontSize: number,
  maxWidth: number
): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let currentLine = ''

  for (const word of words) {
    const testLine = currentLine ? `${currentLine} ${word}` : word
    const width = font.widthOfTextAtSize(testLine, fontSize)

    if (width > maxWidth && currentLine) {
      lines.push(currentLine)
      currentLine = word
    } else {
      currentLine = testLine
    }
  }

  if (currentLine) {
    lines.push(currentLine)
  }

  return lines
}

// Convert PDF buffer to base64 for storage or transmission
export function pdfToBase64(buffer: Buffer): string {
  return buffer.toString('base64')
}

// Convert base64 back to buffer for download
export function base64ToPdf(base64: string): Buffer {
  return Buffer.from(base64, 'base64')
}