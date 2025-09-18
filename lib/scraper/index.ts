import * as cheerio from 'cheerio'
import axios from 'axios'

export interface CompanyData {
  companyName: string
  tagline: string
  description: string
  services: string[]
  products: string[]
  teamMembers: Array<{
    name: string
    role: string
    bio?: string
  }>
  testimonials: Array<{
    text: string
    author: string
    role?: string
    company?: string
  }>
  contactInfo: {
    email?: string
    phone?: string
    address?: string
    social?: Record<string, string>
  }
  valuePropositions: string[]
  targetAudience: string
  industryPositioning: string
  features: string[]
  benefits: string[]
  caseStudies: Array<{
    title: string
    description: string
    results?: string
  }>
  faqs: Array<{
    question: string
    answer: string
  }>
  logoUrl?: string
  primaryColor?: string
  secondaryColor?: string
}

export async function scrapeWebsite(url: string): Promise<CompanyData> {
  try {
    // Ensure URL has protocol
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = `https://${url}`
    }

    // Fetch the main page
    const response = await axios.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      },
      timeout: 10000
    })

    const $ = cheerio.load(response.data)

    // Extract company data
    const companyData: CompanyData = {
      companyName: extractCompanyName($),
      tagline: extractTagline($),
      description: extractDescription($),
      services: extractServices($),
      products: extractProducts($),
      teamMembers: extractTeamMembers($),
      testimonials: extractTestimonials($),
      contactInfo: extractContactInfo($),
      valuePropositions: extractValueProps($),
      targetAudience: extractTargetAudience($),
      industryPositioning: extractIndustryPositioning($),
      features: extractFeatures($),
      benefits: extractBenefits($),
      caseStudies: extractCaseStudies($),
      faqs: extractFAQs($),
      logoUrl: extractLogoUrl($, url),
      primaryColor: extractPrimaryColor($),
      secondaryColor: extractSecondaryColor($)
    }

    // Try to fetch additional pages
    const additionalPages = await fetchAdditionalPages($, url)

    // Merge additional data
    if (additionalPages.about) {
      mergeAboutData(companyData, additionalPages.about)
    }
    if (additionalPages.services) {
      mergeServicesData(companyData, additionalPages.services)
    }
    if (additionalPages.team) {
      mergeTeamData(companyData, additionalPages.team)
    }

    return companyData
  } catch (error) {
    console.error('Error scraping website:', error)
    // Return partial data even if scraping fails
    return getDefaultCompanyData(url)
  }
}

function extractCompanyName($: cheerio.CheerioAPI): string {
  // Try various selectors for company name
  const selectors = [
    'meta[property="og:site_name"]',
    'meta[name="application-name"]',
    '.logo-text',
    '.brand-name',
    '.company-name',
    '.site-title',
    'h1.logo',
    '.navbar-brand',
    'title'
  ]

  for (const selector of selectors) {
    const element = $(selector)
    if (element.length) {
      const content = element.attr('content') || element.text().trim()
      if (content) return content.split('|')[0].split('-')[0].trim()
    }
  }

  return 'Company'
}

function extractTagline($: cheerio.CheerioAPI): string {
  const selectors = [
    'meta[name="description"]',
    'meta[property="og:description"]',
    '.tagline',
    '.hero-subtitle',
    '.slogan',
    'h2.subtitle',
    '.header-tagline'
  ]

  for (const selector of selectors) {
    const element = $(selector)
    if (element.length) {
      const content = element.attr('content') || element.text().trim()
      if (content && content.length < 200) return content
    }
  }

  return ''
}

function extractDescription($: cheerio.CheerioAPI): string {
  const selectors = [
    'meta[name="description"]',
    'meta[property="og:description"]',
    '.about-us',
    '.company-description',
    '.intro-text',
    'section.about p',
    '.hero-description'
  ]

  for (const selector of selectors) {
    const element = $(selector)
    if (element.length) {
      const content = element.attr('content') || element.text().trim()
      if (content && content.length > 50) return content
    }
  }

  // Try to extract from paragraphs
  const paragraphs = $('p').slice(0, 5)
  let description = ''
  paragraphs.each((_, el) => {
    const text = $(el).text().trim()
    if (text.length > 100 && text.length < 500) {
      description = text
      return false
    }
  })

  return description
}

function extractServices($: cheerio.CheerioAPI): string[] {
  const services: string[] = []

  // Common service section selectors
  const sectionSelectors = [
    '.services',
    '#services',
    '.our-services',
    '.service-list',
    'section[data-section="services"]'
  ]

  for (const selector of sectionSelectors) {
    const section = $(selector)
    if (section.length) {
      section.find('h3, h4, .service-title, .service-name').each((_, el) => {
        const text = $(el).text().trim()
        if (text && text.length < 100) {
          services.push(text)
        }
      })
    }
  }

  // Also check list items
  $('.services-list li, .service-items li').each((_, el) => {
    const text = $(el).text().trim()
    if (text && text.length < 100) {
      services.push(text)
    }
  })

  return [...new Set(services)].slice(0, 10)
}

function extractProducts($: cheerio.CheerioAPI): string[] {
  const products: string[] = []

  const sectionSelectors = [
    '.products',
    '#products',
    '.product-list',
    '.our-products',
    'section[data-section="products"]'
  ]

  for (const selector of sectionSelectors) {
    const section = $(selector)
    if (section.length) {
      section.find('h3, h4, .product-title, .product-name').each((_, el) => {
        const text = $(el).text().trim()
        if (text && text.length < 100) {
          products.push(text)
        }
      })
    }
  }

  return [...new Set(products)].slice(0, 10)
}

function extractTeamMembers($: cheerio.CheerioAPI): Array<{ name: string; role: string; bio?: string }> {
  const team: Array<{ name: string; role: string; bio?: string }> = []

  const teamSelectors = [
    '.team-member',
    '.team-card',
    '.staff-member',
    '.team-item',
    '.member-card'
  ]

  for (const selector of teamSelectors) {
    $(selector).each((_, el) => {
      const element = $(el)
      const name = element.find('.member-name, .team-member-name, h3, h4').first().text().trim()
      const role = element.find('.member-role, .member-title, .job-title, .position').first().text().trim()
      const bio = element.find('.member-bio, .member-description, p').first().text().trim()

      if (name) {
        team.push({
          name,
          role: role || 'Team Member',
          bio: bio || undefined
        })
      }
    })
  }

  return team.slice(0, 10)
}

function extractTestimonials($: cheerio.CheerioAPI): Array<{ text: string; author: string; role?: string; company?: string }> {
  const testimonials: Array<{ text: string; author: string; role?: string; company?: string }> = []

  const testimonialSelectors = [
    '.testimonial',
    '.review',
    '.testimony',
    '.customer-review',
    'blockquote'
  ]

  for (const selector of testimonialSelectors) {
    $(selector).each((_, el) => {
      const element = $(el)
      const text = element.find('.testimonial-text, .review-text, p, .content').first().text().trim()
      const author = element.find('.author, .reviewer, .name, cite').first().text().trim()
      const role = element.find('.role, .position, .title').first().text().trim()
      const company = element.find('.company, .organization').first().text().trim()

      if (text && author) {
        testimonials.push({
          text,
          author,
          role: role || undefined,
          company: company || undefined
        })
      }
    })
  }

  return testimonials.slice(0, 10)
}

function extractContactInfo($: cheerio.CheerioAPI): CompanyData['contactInfo'] {
  const contactInfo: CompanyData['contactInfo'] = {
    social: {}
  }

  // Email
  $('a[href^="mailto:"]').each((_, el) => {
    const href = $(el).attr('href')
    if (href) {
      contactInfo.email = href.replace('mailto:', '')
      return false
    }
  })

  // Phone
  $('a[href^="tel:"]').each((_, el) => {
    const href = $(el).attr('href')
    if (href) {
      contactInfo.phone = href.replace('tel:', '')
      return false
    }
  })

  // Address
  const addressSelectors = ['.address', '.location', '.contact-address']
  for (const selector of addressSelectors) {
    const element = $(selector)
    if (element.length) {
      contactInfo.address = element.text().trim()
      break
    }
  }

  // Social Media
  const socialPatterns = {
    facebook: /facebook\.com/,
    twitter: /twitter\.com|x\.com/,
    linkedin: /linkedin\.com/,
    instagram: /instagram\.com/,
    youtube: /youtube\.com/
  }

  $('a[href]').each((_, el) => {
    const href = $(el).attr('href')
    if (href) {
      for (const [platform, pattern] of Object.entries(socialPatterns)) {
        if (pattern.test(href)) {
          contactInfo.social![platform] = href
        }
      }
    }
  })

  return contactInfo
}

function extractValueProps($: cheerio.CheerioAPI): string[] {
  const valueProps: string[] = []

  const selectors = [
    '.value-proposition',
    '.benefit',
    '.advantage',
    '.feature-title',
    '.why-choose-us li'
  ]

  for (const selector of selectors) {
    $(selector).each((_, el) => {
      const text = $(el).text().trim()
      if (text && text.length < 200) {
        valueProps.push(text)
      }
    })
  }

  return [...new Set(valueProps)].slice(0, 5)
}

function extractTargetAudience($: cheerio.CheerioAPI): string {
  // Try to infer from content
  const text = $('body').text().toLowerCase()

  const audiences = {
    'small business': /small business|smb|startup/,
    'enterprise': /enterprise|fortune 500|large organization/,
    'individual': /personal|individual|freelance/,
    'B2B': /b2b|business to business/,
    'B2C': /b2c|consumer|retail/
  }

  for (const [audience, pattern] of Object.entries(audiences)) {
    if (pattern.test(text)) {
      return audience
    }
  }

  return 'businesses'
}

function extractIndustryPositioning($: cheerio.CheerioAPI): string {
  const text = $('body').text()

  // Look for industry keywords
  const industries = [
    'technology', 'healthcare', 'finance', 'education', 'retail',
    'manufacturing', 'consulting', 'marketing', 'real estate', 'legal'
  ]

  const found: string[] = []
  for (const industry of industries) {
    if (text.toLowerCase().includes(industry)) {
      found.push(industry)
    }
  }

  return found.length > 0 ? found.join(', ') : 'general business'
}

function extractFeatures($: cheerio.CheerioAPI): string[] {
  const features: string[] = []

  $('.feature, .features li, .feature-item').each((_, el) => {
    const text = $(el).text().trim()
    if (text && text.length < 200) {
      features.push(text)
    }
  })

  return [...new Set(features)].slice(0, 10)
}

function extractBenefits($: cheerio.CheerioAPI): string[] {
  const benefits: string[] = []

  $('.benefit, .benefits li, .advantage').each((_, el) => {
    const text = $(el).text().trim()
    if (text && text.length < 200) {
      benefits.push(text)
    }
  })

  return [...new Set(benefits)].slice(0, 10)
}

function extractCaseStudies($: cheerio.CheerioAPI): Array<{ title: string; description: string; results?: string }> {
  const caseStudies: Array<{ title: string; description: string; results?: string }> = []

  $('.case-study, .portfolio-item, .project').each((_, el) => {
    const element = $(el)
    const title = element.find('h3, h4, .title').first().text().trim()
    const description = element.find('p, .description').first().text().trim()
    const results = element.find('.results, .outcome').first().text().trim()

    if (title && description) {
      caseStudies.push({
        title,
        description,
        results: results || undefined
      })
    }
  })

  return caseStudies.slice(0, 5)
}

function extractFAQs($: cheerio.CheerioAPI): Array<{ question: string; answer: string }> {
  const faqs: Array<{ question: string; answer: string }> = []

  $('.faq-item, .faq, .question-answer').each((_, el) => {
    const element = $(el)
    const question = element.find('.question, h3, h4, dt').first().text().trim()
    const answer = element.find('.answer, p, dd').first().text().trim()

    if (question && answer) {
      faqs.push({ question, answer })
    }
  })

  return faqs.slice(0, 10)
}

function extractLogoUrl($: cheerio.CheerioAPI, baseUrl: string): string | undefined {
  const logoSelectors = [
    '.logo img',
    '.navbar-brand img',
    '.site-logo img',
    'header img',
    'img[alt*="logo"]'
  ]

  for (const selector of logoSelectors) {
    const element = $(selector)
    if (element.length) {
      const src = element.attr('src')
      if (src) {
        if (src.startsWith('http')) return src
        if (src.startsWith('//')) return `https:${src}`
        if (src.startsWith('/')) return new URL(src, baseUrl).href
        return new URL(src, baseUrl).href
      }
    }
  }

  return undefined
}

function extractPrimaryColor($: cheerio.CheerioAPI): string | undefined {
  // Try to find primary color from CSS variables or inline styles
  const colorRegex = /#[0-9a-fA-F]{6}|rgb\([^)]+\)/

  // Check style tags
  $('style').each((_, el) => {
    const text = $(el).text()
    const primaryMatch = text.match(/--primary[^:]*:\s*([^;]+)/i)
    if (primaryMatch) return primaryMatch[1].trim()
  })

  return undefined
}

function extractSecondaryColor($: cheerio.CheerioAPI): string | undefined {
  // Similar to primary color
  $('style').each((_, el) => {
    const text = $(el).text()
    const secondaryMatch = text.match(/--secondary[^:]*:\s*([^;]+)/i)
    if (secondaryMatch) return secondaryMatch[1].trim()
  })

  return undefined
}

async function fetchAdditionalPages($: cheerio.CheerioAPI, baseUrl: string): Promise<any> {
  const pages: any = {}
  const links = {
    about: ['about', 'about-us', 'who-we-are'],
    services: ['services', 'what-we-do', 'solutions'],
    team: ['team', 'our-team', 'people', 'staff']
  }

  for (const [key, patterns] of Object.entries(links)) {
    for (const pattern of patterns) {
      const link = $(`a[href*="${pattern}"]`).first()
      if (link.length) {
        try {
          const href = link.attr('href')
          if (href) {
            const url = new URL(href, baseUrl).href
            const response = await axios.get(url, {
              headers: { 'User-Agent': 'Mozilla/5.0' },
              timeout: 5000
            })
            pages[key] = cheerio.load(response.data)
            break
          }
        } catch (error) {
          console.error(`Error fetching ${key} page:`, error)
        }
      }
    }
  }

  return pages
}

function mergeAboutData(companyData: CompanyData, $: cheerio.CheerioAPI): void {
  // Extract additional about information
  const description = extractDescription($)
  if (description && description.length > companyData.description.length) {
    companyData.description = description
  }

  const valueProps = extractValueProps($)
  companyData.valuePropositions = [...new Set([...companyData.valuePropositions, ...valueProps])].slice(0, 5)
}

function mergeServicesData(companyData: CompanyData, $: cheerio.CheerioAPI): void {
  const services = extractServices($)
  companyData.services = [...new Set([...companyData.services, ...services])].slice(0, 10)

  const products = extractProducts($)
  companyData.products = [...new Set([...companyData.products, ...products])].slice(0, 10)
}

function mergeTeamData(companyData: CompanyData, $: cheerio.CheerioAPI): void {
  const team = extractTeamMembers($)
  const existing = new Set(companyData.teamMembers.map(m => m.name))

  for (const member of team) {
    if (!existing.has(member.name)) {
      companyData.teamMembers.push(member)
    }
  }

  companyData.teamMembers = companyData.teamMembers.slice(0, 10)
}

function getDefaultCompanyData(url: string): CompanyData {
  const domain = new URL(url).hostname.replace('www.', '')
  const companyName = domain.split('.')[0]
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  return {
    companyName,
    tagline: `Welcome to ${companyName}`,
    description: `${companyName} provides professional services and solutions.`,
    services: [],
    products: [],
    teamMembers: [],
    testimonials: [],
    contactInfo: {},
    valuePropositions: [],
    targetAudience: 'businesses',
    industryPositioning: 'general business',
    features: [],
    benefits: [],
    caseStudies: [],
    faqs: []
  }
}