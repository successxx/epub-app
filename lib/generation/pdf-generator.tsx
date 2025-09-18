import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  pdf
} from '@react-pdf/renderer'
import { GeneratedEbook } from './ebook-generator'

// Register fonts - we'll use standard fonts for now
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'Helvetica' },
    { src: 'Helvetica-Bold', fontWeight: 700 }
  ]
})

// Styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    paddingTop: 60,
    paddingBottom: 60,
    paddingHorizontal: 60,
    lineHeight: 1.6
  },
  coverPage: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#667eea',
    color: 'white',
    padding: 60
  },
  title: {
    fontSize: 36,
    fontWeight: 700,
    marginBottom: 20,
    textAlign: 'center',
    color: 'white'
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 400,
    marginBottom: 40,
    textAlign: 'center',
    color: '#e0e7ff'
  },
  author: {
    fontSize: 20,
    fontWeight: 600,
    textAlign: 'center',
    color: 'white'
  },
  chapterTitle: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 20,
    marginTop: 0,
    color: '#1a202c'
  },
  heading1: {
    fontSize: 20,
    fontWeight: 700,
    marginTop: 20,
    marginBottom: 10,
    color: '#2d3748'
  },
  heading2: {
    fontSize: 18,
    fontWeight: 600,
    marginTop: 16,
    marginBottom: 8,
    color: '#2d3748'
  },
  heading3: {
    fontSize: 16,
    fontWeight: 600,
    marginTop: 12,
    marginBottom: 6,
    color: '#4a5568'
  },
  paragraph: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'justify',
    color: '#4a5568'
  },
  listItem: {
    fontSize: 12,
    marginBottom: 6,
    marginLeft: 20,
    color: '#4a5568'
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 10,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#a0aec0'
  },
  tocPage: {
    paddingTop: 60,
    paddingBottom: 60,
    paddingHorizontal: 60
  },
  tocTitle: {
    fontSize: 28,
    fontWeight: 700,
    marginBottom: 30,
    color: '#1a202c'
  },
  tocItem: {
    fontSize: 14,
    marginBottom: 12,
    color: '#4a5568',
    textDecoration: 'none'
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 60,
    right: 60,
    height: 20,
    fontSize: 10,
    color: '#a0aec0',
    borderTop: '1px solid #e2e8f0',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})

// Parse HTML content to simple text
function parseHtmlToText(html: string): string[] {
  const lines: string[] = []

  // Remove all HTML tags and split by line
  const cleanText = html
    .replace(/<h[123]>/g, '\n\n')
    .replace(/<\/h[123]>/g, '\n')
    .replace(/<p>/g, '\n')
    .replace(/<\/p>/g, '\n')
    .replace(/<li>/g, '\n• ')
    .replace(/<\/li>/g, '')
    .replace(/<\/?ul>/g, '')
    .replace(/<\/?ol>/g, '')
    .replace(/<strong>/g, '')
    .replace(/<\/strong>/g, '')
    .replace(/<em>/g, '')
    .replace(/<\/em>/g, '')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<[^>]*>/g, '')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)

  return cleanText
}

// PDF Document Component
const PDFDocument: React.FC<{ ebook: GeneratedEbook }> = ({ ebook }) => (
  <Document>
    {/* Cover Page */}
    <Page size="A4" style={styles.coverPage}>
      <Text style={styles.title}>{ebook.title}</Text>
      <Text style={styles.subtitle}>{ebook.subtitle}</Text>
      <View style={{ marginTop: 'auto' }}>
        <Text style={styles.author}>{ebook.author}</Text>
      </View>
    </Page>

    {/* Table of Contents */}
    <Page size="A4" style={styles.tocPage}>
      <Text style={styles.tocTitle}>Table of Contents</Text>
      {ebook.chapters.map((chapter, index) => (
        <Text key={index} style={styles.tocItem}>
          {index + 1}. {chapter.title}
        </Text>
      ))}
      <Text style={styles.pageNumber} render={({ pageNumber }) => `${pageNumber}`} fixed />
    </Page>

    {/* Chapters */}
    {ebook.chapters.map((chapter, chapterIndex) => (
      <Page key={chapterIndex} size="A4" style={styles.page} wrap>
        <Text style={styles.chapterTitle}>
          Chapter {chapter.order}: {chapter.title}
        </Text>
        <View>
          {parseHtmlToText(chapter.content).map((text, idx) => (
            <Text key={idx} style={text.startsWith('•') ? styles.listItem : styles.paragraph}>
              {text}
            </Text>
          ))}
        </View>
        <Text style={styles.pageNumber} render={({ pageNumber }) => `${pageNumber}`} fixed />
        <View style={styles.footer} fixed>
          <Text>{ebook.metadata.companyName}</Text>
          <Text>{ebook.title}</Text>
        </View>
      </Page>
    ))}

    {/* Back Cover */}
    <Page size="A4" style={styles.coverPage}>
      <Text style={styles.title}>Thank You</Text>
      <Text style={styles.subtitle}>
        We hope you found this guide valuable for your business growth.
      </Text>
      <View style={{ marginTop: 40 }}>
        <Text style={{ ...styles.paragraph, color: 'white', textAlign: 'center' }}>
          For more information and personalized solutions,
        </Text>
        <Text style={{ ...styles.paragraph, color: 'white', textAlign: 'center' }}>
          visit our website or contact our team.
        </Text>
      </View>
      <View style={{ marginTop: 'auto' }}>
        <Text style={styles.author}>© {new Date().getFullYear()} {ebook.metadata.companyName}</Text>
      </View>
    </Page>
  </Document>
)

export async function generatePDF(ebook: GeneratedEbook): Promise<Buffer> {
  const document = <PDFDocument ebook={ebook} />
  const pdfBlob = await pdf(document).toBuffer()
  return pdfBlob
}

export { PDFDocument }