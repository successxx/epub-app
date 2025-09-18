import { openaiText, openaiImage } from '../config/openai'
import { ScrapedCompanyData } from './webscraper'
import { generateChapterPrompt, getPremiumChapterThemes } from './promptGenerator'
import { cleanTitle, cleanFilename, cleanChapterContent, formatMarkdownToHtml } from './bookCleanup'
import fs from 'fs/promises'
import path from 'path'

export interface BookChapter {
  number: number
  title: string
  content: string
}

export interface GeneratedBook {
  title: string
  subtitle?: string
  introduction: string
  chapters: BookChapter[]
  conclusion: string
  summary: string
  coverImageUrl?: string
}

interface BookGenerationOptions {
  type: 'basic' | 'premium'
  companyData: ScrapedCompanyData
  previousChapters?: BookChapter[]
}

// Load prompt templates
async function loadPromptTemplate(filename: string): Promise<string> {
  const promptPath = path.join(process.cwd(), 'app', 'prompts', filename)
  return await fs.readFile(promptPath, 'utf-8')
}

// Replace variables in prompt
function replaceVariables(template: string, data: ScrapedCompanyData): string {
  // Parse the name into first and last
  const nameParts = (data.senderName || 'Author').split(' ')
  const firstName = nameParts[0] || 'Author'
  const lastName = nameParts.slice(1).join(' ') || ''

  // Map the original prompt placeholders to our data
  const replacements: Record<string, string> = {
    // Original ClientsAI format placeholders
    '{{14.`1`]': data.email || '', // Email
    '{{14.`2`]': firstName, // First name
    '{{14.`3`]': lastName, // Last name
    '{{14.`4`]': data.headline || data.businessDescription?.substring(0, 100) || '', // Headline
    '{{14.`5`]': data.bio || data.businessDescription || '', // Bio
    '{{14.`6`]': data.companyName, // Company
    '{{14.`7`]': data.position || 'CEO', // Position

    // Also support our format
    '[SENDER_NAME]': data.senderName || 'Author',
    '[FIRST_NAME]': firstName,
    '[LAST_NAME]': lastName,
    '[COMPANY_NAME]': data.companyName,
    '[WEBSITE]': data.website,
    '[INDUSTRY]': data.industry,
    '[BUSINESS_DESCRIPTION]': data.businessDescription,
    '[COMPANY_GOAL]': data.companyGoal,
    '[TARGET_AUDIENCE]': data.targetAudience,
    '[AUDIENCE_PAIN_POINTS]': data.audiencePainPoints?.join(', ') || '',
    '[COMPANY_TESTIMONIALS]': data.companyTestimonials?.join('\n\n') || '',
    '[OFFER_NAME]': data.offerName || '',
    '[OFFER_PRICE]': data.offerPrice || '',
    '[OFFER_DESCRIPTION]': data.offerDescription || '',
    '[OFFER_BENEFITS]': data.offerBenefits?.join(', ') || '',
    '[OFFER_RESULT]': data.offerResult || '',
    '[CHECKOUT_LINK]': data.checkoutLink || '',
    '[OFFER_TESTIMONIALS]': data.offerTestimonials?.join('\n\n') || '',
    '[ALL_BONUSES]': data.allBonuses?.join(', ') || '',
    '[GUARANTEE]': data.guarantee || ''
  }

  let result = template
  for (const [key, value] of Object.entries(replacements)) {
    // Handle both exact matches and regex patterns
    const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    result = result.replace(new RegExp(escapedKey, 'g'), value)
  }

  return result
}

// Generate a single chapter
async function generateChapter(
  chapterNumber: number,
  companyData: ScrapedCompanyData,
  previousChapters: BookChapter[],
  totalChapters: number
): Promise<BookChapter> {
  try {
    // Load the appropriate chapter prompt template
    let promptTemplate: string

    // For chapters 1-11, we have specific templates
    if (chapterNumber <= 11) {
      const filename = chapterNumber === 1
        ? 'ClientsAI Prompts (1).txt'
        : `ClientsAI Prompts (${chapterNumber - 1}).txt`
      promptTemplate = await loadPromptTemplate(filename)
    } else {
      // For chapters 12+, use a modified version of chapter 11's template
      promptTemplate = await loadPromptTemplate('ClientsAI Prompts (10).txt')
      // Adjust chapter references in the prompt
      promptTemplate = promptTemplate.replace(/chapter 11/gi, `chapter ${chapterNumber}`)
      promptTemplate = promptTemplate.replace(/h211:/g, `h2${chapterNumber}:`)
      promptTemplate = promptTemplate.replace(/content11:/g, `content${chapterNumber}:`)
    }

    // Replace variables
    const prompt = replaceVariables(promptTemplate, companyData)

    // Add previous chapters context
    const previousContext = previousChapters.map(ch =>
      `Chapter ${ch.number}: ${ch.title}\n${ch.content.substring(0, 500)}...`
    ).join('\n\n')

    // Replace the previous chapters context placeholder
    const finalPrompt = prompt
      .replace('{{103.result]', previousContext)
      .replace('{{103.result}', previousContext) // Handle different bracket styles
      .replace('Total Chapters: The book will have 19 chapters.', `Total Chapters: The book will have ${totalChapters} chapters.`)

    const completion = await openaiText.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a world-class author and copywriter creating a lead magnet ebook.
          You're writing chapter ${chapterNumber} of ${totalChapters} total chapters.
          Write in first person as the business owner, creating valuable, actionable content.`
        },
        {
          role: "user",
          content: finalPrompt
        }
      ],
      temperature: 0.8,
      max_tokens: 4000
    })

    const response = completion.choices[0].message?.content || ''

    // Parse the response to extract title and content
    const titleMatch = response.match(/h2\d+:\s*(.+?)###/)
    const contentMatch = response.match(/content\d+:\s*(.+?)###/s)

    const rawTitle = titleMatch ? titleMatch[1].trim() : `Chapter ${chapterNumber}`
    const rawContent = contentMatch ? contentMatch[1].trim() : response

    // Clean up the title and content
    const title = cleanTitle(rawTitle)
    const content = cleanChapterContent(rawContent)

    return {
      number: chapterNumber,
      title,
      content
    }
  } catch (error) {
    console.error(`Error generating chapter ${chapterNumber}:`, error)
    throw error
  }
}

// Generate book summary
async function generateSummary(chapters: BookChapter[], companyData: ScrapedCompanyData): Promise<string> {
  try {
    const summaryPrompt = await loadPromptTemplate('summary.txt')
    const promptWithData = replaceVariables(summaryPrompt, companyData)

    const chaptersSummary = chapters.map(ch =>
      `Chapter ${ch.number}: ${ch.title}`
    ).join('\n')

    const completion = await openaiText.chat.completions.create({
      model: "gpt-4o-mini", // Using cheaper model for summary
      messages: [
        {
          role: "system",
          content: "You are creating a compelling book summary for a lead magnet ebook."
        },
        {
          role: "user",
          content: `${promptWithData}\n\nChapters Overview:\n${chaptersSummary}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    })

    return completion.choices[0].message?.content || ''
  } catch (error) {
    console.error('Error generating summary:', error)
    return 'A comprehensive guide to transforming your business.'
  }
}

// Generate introduction
async function generateIntroduction(summary: string, companyData: ScrapedCompanyData): Promise<string> {
  try {
    const introPrompt = await loadPromptTemplate('intro.txt')
    const promptWithData = replaceVariables(introPrompt, companyData)

    const completion = await openaiText.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are writing an engaging introduction for a lead magnet ebook."
        },
        {
          role: "user",
          content: `${promptWithData}\n\nBook Summary:\n${summary}`
        }
      ],
      temperature: 0.8,
      max_tokens: 2000
    })

    return completion.choices[0].message?.content || ''
  } catch (error) {
    console.error('Error generating introduction:', error)
    return 'Welcome to this transformative journey.'
  }
}

// Generate conclusion
async function generateConclusion(chapters: BookChapter[], companyData: ScrapedCompanyData): Promise<string> {
  try {
    const conclusionPrompt = await loadPromptTemplate('conclusion.txt')
    const promptWithData = replaceVariables(conclusionPrompt, companyData)

    const keyPoints = chapters.slice(-3).map(ch =>
      `${ch.title}: ${ch.content.substring(0, 200)}...`
    ).join('\n\n')

    const completion = await openaiText.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are writing a powerful conclusion for a lead magnet ebook that drives action."
        },
        {
          role: "user",
          content: `${promptWithData}\n\nKey Points from Final Chapters:\n${keyPoints}`
        }
      ],
      temperature: 0.8,
      max_tokens: 2000
    })

    return completion.choices[0].message?.content || ''
  } catch (error) {
    console.error('Error generating conclusion:', error)
    return 'Thank you for reading. Now take action!'
  }
}

// Generate book title
async function generateTitle(summary: string, companyData: ScrapedCompanyData): Promise<{ title: string; subtitle?: string }> {
  try {
    const titlePrompt = await loadPromptTemplate('titler.txt')
    const promptWithData = replaceVariables(titlePrompt, companyData)

    const completion = await openaiText.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are creating a compelling, benefit-driven title and subtitle for a lead magnet ebook."
        },
        {
          role: "user",
          content: `${promptWithData}\n\nBook Summary:\n${summary}\n\nProvide a title and subtitle in JSON format: {"title": "...", "subtitle": "..."}`
        }
      ],
      temperature: 0.9,
      response_format: { type: "json_object" }
    })

    const result = JSON.parse(completion.choices[0].message?.content || '{}')
    return {
      title: cleanTitle(result.title || 'The Ultimate Business Guide'),
      subtitle: result.subtitle ? cleanTitle(result.subtitle) : undefined
    }
  } catch (error) {
    console.error('Error generating title:', error)
    return {
      title: `The ${companyData.companyName} Success Guide`,
      subtitle: 'Transform Your Business Today'
    }
  }
}


// Main book generation function
export async function generateBook(options: BookGenerationOptions): Promise<GeneratedBook> {
  // Check if OpenAI clients are available (server-side only)
  if (!openaiText || !openaiImage) {
    throw new Error('OpenAI is not initialized. This function must be called on the server side.')
  }

  const { type, companyData } = options
  const totalChapters = type === 'basic' ? 15 : 30

  console.log(`Starting ${type} book generation with ${totalChapters} chapters`)

  const chapters: BookChapter[] = []

  // Generate chapters sequentially to maintain context
  for (let i = 1; i <= totalChapters; i++) {
    console.log(`Generating chapter ${i}/${totalChapters}...`)

    const chapter = await generateChapter(
      i,
      companyData,
      chapters,
      totalChapters
    )

    chapters.push(chapter)

    // Add a small delay to avoid rate limits
    if (i % 5 === 0) {
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
  }

  console.log('Generating summary...')
  const summary = await generateSummary(chapters, companyData)

  console.log('Generating introduction...')
  const introduction = await generateIntroduction(summary, companyData)

  console.log('Generating conclusion...')
  const conclusion = await generateConclusion(chapters, companyData)

  console.log('Generating title...')
  const { title, subtitle } = await generateTitle(summary, companyData)

  // Generate cover image URL using world-class standards
  console.log('Generating cover image...')
  let coverImageUrl: string | undefined
  try {
    const coverPromptTemplate = await loadPromptTemplate('cover.txt')
    const coverPrompt = coverPromptTemplate.replace('{{91.result]', title)
    coverImageUrl = await generateCoverImage(coverPrompt)
  } catch (error) {
    console.error('Error generating cover:', error)
  }

  return {
    title,
    subtitle,
    introduction,
    chapters,
    conclusion,
    summary,
    coverImageUrl
  }
}

// Generate cover image using DALL-E with premium API key
export async function generateCoverImage(prompt: string): Promise<string> {
  // Check if OpenAI image client is available
  if (!openaiImage) {
    console.warn('OpenAI image client not initialized, returning empty cover URL')
    return ''
  }

  try {
    const response = await openaiImage.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1792", // Portrait orientation for ebook cover
      quality: "hd", // HD quality for premium covers
      style: "natural"
    })

    return response.data[0].url || ''
  } catch (error) {
    console.error('Error generating cover image:', error)
    // Return a placeholder or default image URL
    return ''
  }
}