// This module should only be imported in server-side code (API routes, server components)
// Dynamic import to prevent client-side bundling

let openaiText: any = null
let openaiImage: any = null

if (typeof window === 'undefined') {
  // Server-side only initialization with dynamic require
  try {
    const OpenAI = require('openai')

    if (process.env.OPENAI_API_KEY) {
      // Text generation client (existing API key)
      openaiText = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      })

      // Image generation client (separate API key for DALL-E)
      // Uses the same API key as text generation if no separate key is configured
      openaiImage = new OpenAI({
        apiKey: process.env.OPENAI_IMAGE_API_KEY || process.env.OPENAI_API_KEY,
      })
    } else {
      console.warn('OpenAI API key not configured')
    }
  } catch (error) {
    console.error('Failed to initialize OpenAI clients:', error)
  }
}

export { openaiText, openaiImage }

// Cover image generation prompt template
export function generateCoverPrompt(title: string, subtitle: string, industry: string): string {
  return `Create a professional, world-class eBook cover design for:

Title: "${title}"
Subtitle: "${subtitle}"
Industry: ${industry}

Requirements:
- Modern, clean, professional business book aesthetic
- Bold, eye-catching design suitable for digital lead magnets
- Abstract or symbolic imagery (no people)
- Professional color palette with strong contrast
- Design that conveys transformation, growth, and success
- Minimalist yet impactful composition
- Similar quality to bestselling business books from major publishers
- Suitable for both thumbnail and full-size viewing
- Professional typography layout space for title and subtitle

Style: Professional business book cover, modern design, high-end corporate aesthetic, clean minimalist layout, premium quality similar to Harvard Business Review Press or Penguin Business books.`
}