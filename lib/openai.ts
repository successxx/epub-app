import OpenAI from 'openai'

if (!process.env.OPENAI_API_KEY) {
  console.warn('Warning: OPENAI_API_KEY not set. AI features will not work.')
}

export const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    })
  : null

export async function generateContent(
  prompt: string,
  systemPrompt: string = 'You are an expert business writer creating a professional lead magnet ebook.',
  model: 'gpt-4o' | 'gpt-4o-mini' | 'gpt-4' = 'gpt-4o-mini',
  maxTokens: number = 2000
): Promise<string> {
  if (!openai) {
    throw new Error('OpenAI API key not configured')
  }

  try {
    const completion = await openai.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: maxTokens,
    })

    return completion.choices[0]?.message?.content || ''
  } catch (error) {
    console.error('OpenAI API error:', error)
    throw error
  }
}

export async function analyzeCompanyData(
  companyData: any,
  additionalContext?: string
): Promise<any> {
  if (!openai) {
    throw new Error('OpenAI API key not configured')
  }

  const prompt = `
    Analyze the following company data and extract key insights for creating a lead magnet ebook:

    Company Data:
    ${JSON.stringify(companyData, null, 2)}

    ${additionalContext ? `Additional Context: ${additionalContext}` : ''}

    Please provide:
    1. Main value propositions (3-5)
    2. Target audience description
    3. Key pain points the company solves
    4. Unique selling points
    5. Industry positioning
    6. Recommended ebook topics (3-5)
    7. Suggested title and subtitle for the lead magnet

    Return your analysis in JSON format.
  `

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: 'You are a business analyst specializing in lead generation and content marketing.'
      },
      { role: 'user', content: prompt }
    ],
    temperature: 0.5,
    response_format: { type: 'json_object' },
  })

  try {
    return JSON.parse(completion.choices[0]?.message?.content || '{}')
  } catch {
    return {}
  }
}