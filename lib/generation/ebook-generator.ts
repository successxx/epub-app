import { generateContent } from '../openai'
import { createSupabaseAdmin } from '../supabase'
import {
  BOOK_GENERATION_PROMPTS,
  getPromptsForTier,
  prepareVariables,
  substituteVariables
} from './prompts'

export interface Chapter {
  title: string
  content: string
  order: number
}

export interface GeneratedEbook {
  title: string
  subtitle: string
  author: string
  chapters: Chapter[]
  coverPrompt: string
  metadata: {
    companyName: string
    generatedAt: string
    pageCount: number
    tier: 'starter' | 'professional'
  }
}

export async function generateEbook(
  companyData: any,
  orderId: string,
  tier: 'starter' | 'professional' = 'starter'
): Promise<GeneratedEbook> {
  const supabase = createSupabaseAdmin()

  // Get appropriate prompts based on tier
  const prompts = getPromptsForTier(tier)
  const variables = prepareVariables(companyData)

  // Generate book metadata
  const bookTitle = await generateBookTitle(companyData)
  const bookSubtitle = await generateBookSubtitle(companyData)

  // Update initial progress
  await updateProgress(supabase, orderId, 'Starting ebook generation', 5)

  const chapters: Chapter[] = []
  let currentProgress = 5
  const progressIncrement = 85 / prompts.length

  // Generate each chapter
  for (let i = 0; i < prompts.length; i++) {
    const promptConfig = prompts[i]

    try {
      // Update progress
      await updateProgress(
        supabase,
        orderId,
        `Generating: ${promptConfig.name}`,
        currentProgress
      )

      // Substitute variables in prompt
      const prompt = substituteVariables(promptConfig.prompt, variables)

      // Generate content
      const content = await generateContent(
        prompt,
        'You are an expert business writer creating a professional, high-value lead magnet ebook. Write comprehensive, detailed content that provides real value to readers. Use proper formatting with headers, subheaders, bullet points, and numbered lists where appropriate.',
        tier === 'professional' ? 'gpt-4o' : 'gpt-4o-mini',
        4000 // Increased token limit for longer chapters
      )

      chapters.push({
        title: promptConfig.name,
        content: formatChapterContent(content),
        order: i + 1
      })

      currentProgress += progressIncrement

      // Small delay to avoid rate limits
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (error) {
      console.error(`Error generating chapter ${promptConfig.name}:`, error)
      // Continue with next chapter even if one fails
      chapters.push({
        title: promptConfig.name,
        content: `[Chapter content generation in progress]`,
        order: i + 1
      })
    }
  }

  // Generate cover design prompt
  const coverPrompt = await generateCoverPrompt(companyData, bookTitle)

  await updateProgress(supabase, orderId, 'Finalizing ebook content', 95)

  return {
    title: bookTitle,
    subtitle: bookSubtitle,
    author: companyData.companyName || 'Your Company',
    chapters,
    coverPrompt,
    metadata: {
      companyName: companyData.companyName,
      generatedAt: new Date().toISOString(),
      pageCount: tier === 'starter' ? 100 : 250,
      tier
    }
  }
}

async function generateBookTitle(companyData: any): Promise<string> {
  const prompt = `
    Based on this company data, generate a compelling lead magnet ebook title:

    Company: ${companyData.companyName}
    Industry: ${companyData.industryPositioning}
    Target Audience: ${companyData.targetAudience}
    Value Props: ${companyData.valuePropositions?.join(', ')}

    Create a professional, benefit-focused title that would appeal to ${companyData.targetAudience}.
    The title should be 5-10 words, clear, and emphasize transformation or value.
    Return ONLY the title, nothing else.
  `

  try {
    const title = await generateContent(
      prompt,
      'You are an expert at creating compelling business book titles.',
      'gpt-4o-mini',
      100
    )
    return title.trim().replace(/['"]/g, '') || 'The Ultimate Business Growth Guide'
  } catch {
    return `The ${companyData.companyName || 'Ultimate'} Business Success Playbook`
  }
}

async function generateBookSubtitle(companyData: any): Promise<string> {
  const prompt = `
    Based on this company data, generate a compelling ebook subtitle:

    Company: ${companyData.companyName}
    Industry: ${companyData.industryPositioning}
    Services: ${companyData.services?.join(', ')}

    Create a subtitle that expands on the main title and clarifies the value proposition.
    Should be 10-15 words and focus on outcomes/benefits.
    Return ONLY the subtitle, nothing else.
  `

  try {
    const subtitle = await generateContent(
      prompt,
      'You are an expert at creating compelling business book subtitles.',
      'gpt-4o-mini',
      100
    )
    return subtitle.trim().replace(/['"]/g, '') || 'Proven Strategies for Sustainable Growth and Success'
  } catch {
    return 'Transform Your Business with Proven Strategies and Expert Insights'
  }
}

async function generateCoverPrompt(companyData: any, bookTitle: string): Promise<string> {
  return `
    Create a professional ebook cover design for:
    Title: "${bookTitle}"
    Company: ${companyData.companyName}
    Industry: ${companyData.industryPositioning}
    Brand Colors: ${companyData.primaryColor || '#667eea'}, ${companyData.secondaryColor || '#764ba2'}

    Design requirements:
    - Modern, professional business book aesthetic
    - Clean, minimalist design with strong typography
    - Incorporate subtle geometric patterns or abstract shapes
    - Use gradient overlays for depth
    - Include space for title, subtitle, and company name
    - Professional color scheme based on brand colors
    - Convey authority, trust, and value

    Style: Corporate, modern, premium, trustworthy
  `
}

function formatChapterContent(content: string): string {
  // Ensure proper formatting
  let formatted = content

  // Add proper spacing between paragraphs
  formatted = formatted.replace(/\n\n/g, '</p><p>')
  formatted = `<p>${formatted}</p>`

  // Format headers
  formatted = formatted.replace(/^#{3} (.+)$/gm, '<h3>$1</h3>')
  formatted = formatted.replace(/^#{2} (.+)$/gm, '<h2>$1</h2>')
  formatted = formatted.replace(/^# (.+)$/gm, '<h1>$1</h1>')

  // Format lists
  formatted = formatted.replace(/^\* (.+)$/gm, '<li>$1</li>')
  formatted = formatted.replace(/(<li>.*<\/li>)\n(?!<li>)/g, '</ul>')
  formatted = formatted.replace(/(?<!<\/li>\n)(<li>)/g, '<ul>$1')

  // Format numbered lists
  formatted = formatted.replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
  formatted = formatted.replace(/(<li>.*<\/li>)\n(?!<li>)/g, '</ol>')
  formatted = formatted.replace(/(?<!<\/li>\n)(<li>)/g, '<ol>$1')

  // Bold and italic
  formatted = formatted.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  formatted = formatted.replace(/\*(.+?)\*/g, '<em>$1</em>')

  return formatted
}

async function updateProgress(
  supabase: any,
  orderId: string,
  message: string,
  percentage: number
) {
  try {
    // Get ebook ID from order
    const { data: order } = await supabase
      .from('epub_ai.orders')
      .select('id')
      .eq('id', orderId)
      .single()

    if (!order) return

    // Get ebook for this order
    const { data: ebook } = await supabase
      .from('epub_ai.ebooks')
      .select('id')
      .eq('order_id', orderId)
      .single()

    if (!ebook) {
      // Create ebook record if it doesn't exist
      const { data: newEbook } = await supabase
        .from('epub_ai.ebooks')
        .insert({
          order_id: orderId,
          user_id: order.user_id,
          title: 'Generating...',
          status: 'generating'
        })
        .select()
        .single()

      if (newEbook) {
        await supabase
          .from('epub_ai.generation_progress')
          .insert({
            ebook_id: newEbook.id,
            step: message,
            message,
            percentage
          })
      }
    } else {
      await supabase
        .from('epub_ai.generation_progress')
        .insert({
          ebook_id: ebook.id,
          step: message,
          message,
          percentage
        })
    }
  } catch (error) {
    console.error('Error updating progress:', error)
  }
}