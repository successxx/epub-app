import { EPub } from 'epub-gen-memory'
import { GeneratedBook } from './bookGenerator'
import { ScrapedCompanyData } from './webscraper'
import { cleanTitle, formatMarkdownToHtml } from './bookCleanup'
import industryStandardCSS from './epubIndustryCSS'

export interface PremiumEPubOptions {
  book: GeneratedBook
  companyData: ScrapedCompanyData
  coverImageUrl?: string
  bookType: 'basic' | 'premium'
}

// Use the shared formatting function with premium styling
function formatPremiumContent(text: string): string {
  return formatMarkdownToHtml(text)
}

// Generate premium chapter HTML with styling
function generateChapterHTML(chapter: any, chapterNumber: number): string {
  // Clean the title of any asterisks or formatting
  const cleanedTitle = cleanTitle(chapter.title)
  const formattedContent = formatPremiumContent(chapter.content)

  return `
    <div class="chapter-container">
      <div class="chapter-header">
        <div class="chapter-number">Chapter ${chapterNumber}</div>
        <h1 class="chapter-title">${cleanedTitle}</h1>
        <div class="chapter-divider"></div>
      </div>
      <div class="chapter-content">
        ${formattedContent}
      </div>
    </div>
  `
}

// Generate table of contents with clickable links
function generateTableOfContents(book: GeneratedBook): string {
  const tocItems = book.chapters.map((chapter, index) => `
    <li class="toc-item">
      <a href="#chapter-${index + 1}" class="toc-link">
        <span class="toc-number">Chapter ${chapter.number}</span>
        <span class="toc-title">${cleanTitle(chapter.title)}</span>
        <span class="toc-dots"></span>
        <span class="toc-page">${Math.floor((index + 1) * 15 + 10)}</span>
      </a>
    </li>
  `).join('\n')

  return `
    <div class="table-of-contents">
      <h1 class="toc-heading">Table of Contents</h1>
      <div class="toc-divider"></div>

      <ul class="toc-list">
        <li class="toc-item">
          <a href="#introduction" class="toc-link">
            <span class="toc-title">Introduction</span>
            <span class="toc-dots"></span>
            <span class="toc-page">7</span>
          </a>
        </li>
        ${tocItems}
        <li class="toc-item">
          <a href="#conclusion" class="toc-link">
            <span class="toc-title">Conclusion</span>
            <span class="toc-dots"></span>
            <span class="toc-page">${book.chapters.length * 15 + 20}</span>
          </a>
        </li>
        <li class="toc-item toc-special">
          <a href="#about" class="toc-link">
            <span class="toc-title">About the Author</span>
            <span class="toc-dots"></span>
            <span class="toc-page">${book.chapters.length * 15 + 30}</span>
          </a>
        </li>
        <li class="toc-item toc-special">
          <a href="#resources" class="toc-link">
            <span class="toc-title">Resources & Next Steps</span>
            <span class="toc-dots"></span>
            <span class="toc-page">${book.chapters.length * 15 + 35}</span>
          </a>
        </li>
      </ul>
    </div>
  `
}

// Premium CSS for the EPUB
export const premiumCSS = `
  /* Premium Typography */
  @import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600;700&family=Inter:wght@400;500;600;700&display=swap');

  body {
    font-family: 'Crimson Pro', Georgia, serif;
    font-size: 18px;
    line-height: 1.8;
    color: #1a1a1a;
    margin: 0;
    padding: 20px;
    background-color: #fdfcfb;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }

  /* Premium Headings */
  h1, h2, h3, h4 {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    font-weight: 700;
    color: #0a0a0a;
    margin-top: 2.5em;
    margin-bottom: 1.2em;
    line-height: 1.3;
  }

  h1 {
    font-size: 2.5em;
    text-align: center;
    margin-top: 1.5em;
    letter-spacing: -0.02em;
  }

  h2 {
    font-size: 2em;
    margin-top: 2em;
    border-bottom: 2px solid #e0e0e0;
    padding-bottom: 0.5em;
  }

  h3 {
    font-size: 1.5em;
    font-weight: 600;
  }

  /* Premium Paragraphs */
  p {
    margin-bottom: 1.8em;
    text-align: justify;
    text-indent: 1.5em;
    hyphens: auto;
  }

  p:first-of-type {
    text-indent: 0;
  }

  .premium-paragraph {
    margin-bottom: 2em;
    line-height: 1.9;
  }

  .premium-paragraph:first-letter {
    font-size: 3.5em;
    float: left;
    line-height: 0.8;
    margin: 0.1em 0.1em 0 0;
    font-weight: 700;
    color: #2c3e50;
  }

  /* Chapter Styling */
  .chapter-container {
    page-break-before: always;
    padding-top: 3em;
  }

  .chapter-header {
    text-align: center;
    margin-bottom: 3em;
  }

  .chapter-number {
    font-family: 'Inter', sans-serif;
    font-size: 1.2em;
    font-weight: 500;
    color: #7a7a7a;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    margin-bottom: 1em;
  }

  .chapter-title {
    font-size: 2.8em;
    font-weight: 700;
    color: #1a1a1a;
    margin: 0.5em 0;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  .chapter-divider {
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    margin: 2em auto 3em;
    border-radius: 2px;
  }

  .chapter-content {
    max-width: 650px;
    margin: 0 auto;
  }

  /* Table of Contents */
  .table-of-contents {
    page-break-after: always;
    padding: 2em 0;
  }

  .toc-heading {
    text-align: center;
    font-size: 2.5em;
    margin-bottom: 1em;
  }

  .toc-divider {
    width: 100px;
    height: 3px;
    background: linear-gradient(90deg, #3b82f6, #8b5cf6);
    margin: 0 auto 2em;
    border-radius: 2px;
  }

  .toc-list {
    list-style: none;
    padding: 0;
    margin: 2em 0;
  }

  .toc-item {
    margin-bottom: 1.5em;
    padding: 0.8em 0;
    border-bottom: 1px dotted #e0e0e0;
  }

  .toc-link {
    display: flex;
    align-items: baseline;
    text-decoration: none;
    color: #1a1a1a;
    transition: all 0.3s ease;
  }

  .toc-link:hover {
    color: #3b82f6;
    padding-left: 0.5em;
  }

  .toc-number {
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    margin-right: 1em;
    color: #7a7a7a;
    min-width: 80px;
  }

  .toc-title {
    flex: 1;
    font-size: 1.1em;
  }

  .toc-dots {
    flex: 0 0 auto;
    margin: 0 0.5em;
    border-bottom: 1px dotted #c0c0c0;
    min-width: 20px;
    flex-grow: 1;
  }

  .toc-page {
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    color: #7a7a7a;
    min-width: 40px;
    text-align: right;
  }

  .toc-special {
    margin-top: 2em;
    padding-top: 1.5em;
    border-top: 2px solid #e0e0e0;
  }

  /* Premium Text Elements */
  strong {
    font-weight: 700;
    color: #0a0a0a;
    letter-spacing: 0.02em;
  }

  em {
    font-style: italic;
    color: #2c3e50;
  }

  blockquote {
    margin: 2.5em 0;
    padding: 1.5em 2em;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    border-left: 4px solid #3b82f6;
    font-style: italic;
    font-size: 1.1em;
    line-height: 1.8;
    color: #495057;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    border-radius: 0 8px 8px 0;
  }

  /* Lists with Premium Styling */
  ul, ol {
    margin: 2em 0;
    padding-left: 2.5em;
    line-height: 1.9;
  }

  li {
    margin-bottom: 1em;
    position: relative;
  }

  ul li::before {
    content: "▪";
    color: #3b82f6;
    font-weight: bold;
    position: absolute;
    left: -1.5em;
  }

  /* Call to Action Boxes */
  .cta-box {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 2.5em;
    margin: 3em 0;
    border-radius: 12px;
    text-align: center;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  }

  .cta-box h3 {
    color: white;
    margin-top: 0;
    font-size: 1.8em;
  }

  .cta-box p {
    text-align: center;
    text-indent: 0;
    font-size: 1.1em;
    line-height: 1.6;
  }

  .cta-button {
    display: inline-block;
    background: white;
    color: #667eea;
    padding: 1em 2.5em;
    border-radius: 50px;
    text-decoration: none;
    font-family: 'Inter', sans-serif;
    font-weight: 600;
    margin-top: 1.5em;
    transition: transform 0.3s ease;
  }

  .cta-button:hover {
    transform: translateY(-2px);
  }

  /* Premium Page Breaks and Spacing */
  .page-break {
    page-break-after: always;
  }

  .section-break {
    text-align: center;
    margin: 3em 0;
    font-size: 1.5em;
    color: #c0c0c0;
  }

  .section-break::before {
    content: "❋ ❋ ❋";
  }

  /* About Author Section */
  .about-author {
    background: #f8f9fa;
    padding: 3em;
    border-radius: 12px;
    margin-top: 3em;
  }

  .author-image {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin: 0 auto 2em;
    display: block;
  }

  /* Resources Section */
  .resources {
    margin-top: 3em;
  }

  .resource-item {
    background: white;
    border: 2px solid #e9ecef;
    padding: 2em;
    margin-bottom: 2em;
    border-radius: 8px;
    transition: all 0.3s ease;
  }

  .resource-item:hover {
    border-color: #3b82f6;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
  }

  /* Footer */
  .book-footer {
    margin-top: 5em;
    padding-top: 3em;
    border-top: 2px solid #e0e0e0;
    text-align: center;
    font-family: 'Inter', sans-serif;
    color: #7a7a7a;
    font-size: 0.9em;
  }
`

export async function generatePremiumEPUB(options: PremiumEPubOptions): Promise<Buffer> {
  const { book, companyData, coverImageUrl, bookType } = options

  // Prepare premium chapters with IDs for navigation
  const epubChapters = []

  // Add Table of Contents
  epubChapters.push({
    title: 'Table of Contents',
    content: generateTableOfContents(book),
    beforeToc: true
  })

  // Add Introduction
  epubChapters.push({
    id: 'introduction',
    title: 'Introduction',
    content: `
      <div class="chapter-container">
        <div class="chapter-header">
          <h1 class="chapter-title">Introduction</h1>
          <div class="chapter-divider"></div>
        </div>
        <div class="chapter-content">
          ${formatPremiumContent(book.introduction)}
        </div>
      </div>
    `
  })

  // Add all chapters with premium formatting
  book.chapters.forEach((chapter, index) => {
    epubChapters.push({
      id: `chapter-${index + 1}`,
      title: `Chapter ${chapter.number}: ${cleanTitle(chapter.title)}`,
      content: generateChapterHTML(chapter, chapter.number)
    })
  })

  // Add Conclusion
  epubChapters.push({
    id: 'conclusion',
    title: 'Conclusion',
    content: `
      <div class="chapter-container">
        <div class="chapter-header">
          <h1 class="chapter-title">Conclusion</h1>
          <div class="chapter-divider"></div>
        </div>
        <div class="chapter-content">
          ${formatPremiumContent(book.conclusion)}

          <div class="cta-box">
            <h3>Ready to Transform Your Business?</h3>
            <p>You've learned the strategies. Now it's time to implement them.</p>
            <a href="${companyData.checkoutLink || companyData.website}" class="cta-button">
              Get Started Today
            </a>
          </div>
        </div>
      </div>
    `
  })

  // Add About the Author
  epubChapters.push({
    id: 'about',
    title: 'About the Author',
    content: `
      <div class="chapter-container">
        <div class="chapter-header">
          <h1 class="chapter-title">About the Author</h1>
          <div class="chapter-divider"></div>
        </div>
        <div class="chapter-content">
          <div class="about-author">
            <h2>${companyData.senderName || companyData.companyName}</h2>
            <p><strong>${companyData.companyName}</strong></p>
            <p>${companyData.businessDescription}</p>

            <div class="section-break"></div>

            <h3>Our Mission</h3>
            <p>${companyData.companyGoal}</p>

            <h3>Who We Serve</h3>
            <p>${companyData.targetAudience}</p>

            <h3>Connect With Us</h3>
            <p>Website: <a href="${companyData.website}">${companyData.website}</a></p>
            ${companyData.checkoutLink ? `<p>Learn More: <a href="${companyData.checkoutLink}">Explore Our Solutions</a></p>` : ''}
          </div>
        </div>
      </div>
    `
  })

  // Add Resources & Next Steps
  epubChapters.push({
    id: 'resources',
    title: 'Resources & Next Steps',
    content: `
      <div class="chapter-container">
        <div class="chapter-header">
          <h1 class="chapter-title">Resources & Next Steps</h1>
          <div class="chapter-divider"></div>
        </div>
        <div class="chapter-content">
          <h2>Your Action Plan</h2>
          <p>Now that you've completed this guide, here's your roadmap to success:</p>

          <div class="resource-item">
            <h3>Step 1: Assess Your Current State</h3>
            <p>Take inventory of where you are now versus where you want to be.</p>
          </div>

          <div class="resource-item">
            <h3>Step 2: Prioritize Your Actions</h3>
            <p>Focus on the strategies that will have the biggest impact first.</p>
          </div>

          <div class="resource-item">
            <h3>Step 3: Implement Systematically</h3>
            <p>Take consistent action and measure your results.</p>
          </div>

          <div class="resource-item">
            <h3>Step 4: Get Expert Support</h3>
            <p>Don't go it alone. Partner with experts who can accelerate your success.</p>
            <p><strong>Ready to take the next step?</strong></p>
            <p>Visit <a href="${companyData.website}">${companyData.website}</a> to learn how we can help.</p>
          </div>

          ${companyData.offerName ? `
          <div class="cta-box">
            <h3>${companyData.offerName}</h3>
            <p>${companyData.offerDescription || 'Transform your business with our proven solutions.'}</p>
            ${companyData.offerPrice ? `<p><strong>Investment: ${companyData.offerPrice}</strong></p>` : ''}
            <a href="${companyData.checkoutLink || companyData.website}" class="cta-button">
              Learn More
            </a>
          </div>
          ` : ''}

          <div class="book-footer">
            <p>© ${new Date().getFullYear()} ${companyData.companyName}. All rights reserved.</p>
            <p>This book was created as a valuable resource for our community.</p>
            <p>Share it with others who could benefit from these insights.</p>
          </div>
        </div>
      </div>
    `
  })

  // EPUB configuration with premium settings
  const epubConfig = {
    title: cleanTitle(book.title),
    author: companyData.senderName || companyData.companyName,
    publisher: companyData.companyName,
    description: book.subtitle ? cleanTitle(book.subtitle) : (book.summary || 'A comprehensive guide to transform your business'),
    cover: coverImageUrl,
    css: industryStandardCSS,
    fonts: [],
    lang: 'en',
    tocTitle: 'Table of Contents',
    appendChapterTitles: false,
    customOpfTemplatePath: undefined,
    customNcxTocTemplatePath: undefined,
    customHtmlTocTemplatePath: undefined,
    version: 3
  }

  try {
    const epub = new EPub(epubConfig, epubChapters)
    const epubBuffer = await epub.genEpub()
    return epubBuffer
  } catch (error) {
    console.error('Error generating premium EPUB:', error)
    throw new Error('Failed to generate premium EPUB file')
  }
}