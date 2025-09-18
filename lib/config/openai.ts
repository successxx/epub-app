import OpenAI from 'openai'

// Text generation client (existing API key)
export const openaiText = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Image generation client (separate API key for DALL-E)
// Uses the same API key as text generation if no separate key is configured
export const openaiImage = new OpenAI({
  apiKey: process.env.OPENAI_IMAGE_API_KEY || process.env.OPENAI_API_KEY,
})

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