import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdmin } from '@/lib/supabase'
import { comprehensiveScrape } from '@/lib/services/webscraper'
import { generateBook, generateCoverImage } from '@/lib/services/bookGenerator'
import { generateEPUB } from '@/lib/services/epubGenerator'
import { retrieveCheckoutSession } from '@/lib/stripe'
import { sendBookDeliveryEmail } from '@/lib/services/email'

export const maxDuration = 300 // 5 minutes for book generation

export async function POST(request: NextRequest) {
  try {
    const {
      sessionId,
      websiteUrl,
      companyData: manualData,
      additionalInfo
    } = await request.json()

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 })
    }

    // Verify payment session
    const session = await retrieveCheckoutSession(sessionId)
    if (session.payment_status !== 'paid') {
      return NextResponse.json({ error: 'Payment not completed' }, { status: 400 })
    }

    const productType = session.metadata?.productType as 'basic' | 'premium'
    const userId = session.metadata?.userId

    if (!productType || !userId) {
      return NextResponse.json({ error: 'Invalid session metadata' }, { status: 400 })
    }

    const supabase = createSupabaseAdmin()

    // Create or update company profile
    let companyProfileId: string

    // Check if profile exists
    const { data: existingProfile } = await supabase
      .from('company_profiles')
      .select('id')
      .eq('user_id', userId)
      .single()

    // Scrape website or use manual data
    let scrapedData = null
    if (websiteUrl) {
      console.log('Starting website scraping for:', websiteUrl)
      scrapedData = await comprehensiveScrape(websiteUrl)
    }

    // Merge manual data with scraped data
    const finalCompanyData = {
      ...scrapedData,
      ...manualData,
      website: websiteUrl || manualData?.website || ''
    }

    if (existingProfile) {
      // Update existing profile
      const { data: updatedProfile } = await supabase
        .from('company_profiles')
        .update({
          website_url: finalCompanyData.website,
          sender_name: finalCompanyData.senderName,
          company_name: finalCompanyData.companyName,
          industry: finalCompanyData.industry,
          business_description: finalCompanyData.businessDescription,
          company_goal: finalCompanyData.companyGoal,
          target_audience: finalCompanyData.targetAudience,
          audience_pain_points: finalCompanyData.audiencePainPoints?.join(', '),
          company_testimonials: finalCompanyData.companyTestimonials,
          offer_name: finalCompanyData.offerName,
          offer_price: finalCompanyData.offerPrice,
          offer_description: finalCompanyData.offerDescription,
          offer_benefits: finalCompanyData.offerBenefits?.join(', '),
          offer_result: finalCompanyData.offerResult,
          checkout_link: finalCompanyData.checkoutLink,
          offer_testimonials: finalCompanyData.offerTestimonials,
          all_bonuses: finalCompanyData.allBonuses?.join(', '),
          guarantee: finalCompanyData.guarantee,
          scraped_data: scrapedData?.rawData || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', existingProfile.id)
        .select('id')
        .single()

      companyProfileId = existingProfile.id
    } else {
      // Create new profile
      const { data: newProfile } = await supabase
        .from('company_profiles')
        .insert({
          user_id: userId,
          website_url: finalCompanyData.website,
          sender_name: finalCompanyData.senderName,
          company_name: finalCompanyData.companyName,
          industry: finalCompanyData.industry,
          business_description: finalCompanyData.businessDescription,
          company_goal: finalCompanyData.companyGoal,
          target_audience: finalCompanyData.targetAudience,
          audience_pain_points: finalCompanyData.audiencePainPoints?.join(', '),
          company_testimonials: finalCompanyData.companyTestimonials,
          offer_name: finalCompanyData.offerName,
          offer_price: finalCompanyData.offerPrice,
          offer_description: finalCompanyData.offerDescription,
          offer_benefits: finalCompanyData.offerBenefits?.join(', '),
          offer_result: finalCompanyData.offerResult,
          checkout_link: finalCompanyData.checkoutLink,
          offer_testimonials: finalCompanyData.offerTestimonials,
          all_bonuses: finalCompanyData.allBonuses?.join(', '),
          guarantee: finalCompanyData.guarantee,
          scraped_data: scrapedData?.rawData || null
        })
        .select('id')
        .single()

      if (!newProfile) {
        throw new Error('Failed to create company profile')
      }

      companyProfileId = newProfile.id
    }

    // Create book record
    const { data: bookRecord, error: bookError } = await supabase
      .from('books')
      .insert({
        user_id: userId,
        company_profile_id: companyProfileId,
        status: 'generating',
        book_type: productType,
        total_chapters: productType === 'basic' ? 15 : 30,
        title: 'Generating...',
        chapters: []
      })
      .select('id')
      .single()

    if (!bookRecord || bookError) {
      throw new Error('Failed to create book record')
    }

    // Merge additional info if provided
    if (additionalInfo) {
      finalCompanyData.additionalContext = additionalInfo
    }

    // Start async book generation
    generateBookAsync(bookRecord.id, finalCompanyData, productType, supabase)

    return NextResponse.json({
      success: true,
      bookId: bookRecord.id,
      message: 'Book generation started. This may take a few minutes.'
    })
  } catch (error) {
    console.error('Book generation error:', error)
    return NextResponse.json(
      { error: 'Failed to start book generation' },
      { status: 500 }
    )
  }
}

// Async book generation function
async function generateBookAsync(
  bookId: string,
  companyData: any,
  productType: 'basic' | 'premium',
  supabase: any
) {
  try {
    console.log(`Starting book generation for book ID: ${bookId}`)

    // Generate the book content
    const book = await generateBook({
      type: productType,
      companyData
    })

    // Generate cover image
    let coverImageUrl = ''
    if (book.coverPrompt) {
      try {
        coverImageUrl = await generateCoverImage(book.coverPrompt)
      } catch (error) {
        console.error('Cover generation failed:', error)
      }
    }

    // Generate EPUB
    const epubBuffer = await generateEPUB({
      book,
      companyData,
      coverImageUrl
    })

    // Convert to base64 for storage (you might want to upload to cloud storage instead)
    const epubBase64 = epubBuffer.toString('base64')

    // Update book record with generated content
    await supabase
      .from('books')
      .update({
        title: book.title,
        subtitle: book.subtitle,
        introduction: book.introduction,
        conclusion: book.conclusion,
        summary: book.summary,
        chapters: book.chapters,
        cover_image_url: coverImageUrl,
        epub_url: `data:application/epub+zip;base64,${epubBase64}`,
        status: 'completed',
        generation_metadata: {
          generatedAt: new Date().toISOString(),
          chaptersCount: book.chapters.length,
          productType
        }
      })
      .eq('id', bookId)

    console.log(`Book generation completed for book ID: ${bookId}`)

    // Send email with the book
    try {
      // Get user email
      const { data: bookData } = await supabase
        .from('books')
        .select('user_id, title')
        .eq('id', bookId)
        .single()

      if (bookData) {
        const { data: userData } = await supabase
          .from('users')
          .select('email')
          .eq('id', bookData.user_id)
          .single()

        if (userData?.email) {
          const downloadUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/download/${bookId}`
          await sendBookDeliveryEmail(
            userData.email,
            book.title,
            downloadUrl,
            productType,
            epubBuffer
          )
          console.log(`Email sent to ${userData.email}`)
        }
      }
    } catch (emailError) {
      console.error('Failed to send email:', emailError)
      // Don't fail the whole process if email fails
    }
  } catch (error) {
    console.error(`Book generation failed for book ID: ${bookId}`, error)

    // Update book status to failed
    await supabase
      .from('books')
      .update({
        status: 'failed',
        generation_metadata: {
          error: error instanceof Error ? error.message : 'Unknown error',
          failedAt: new Date().toISOString()
        }
      })
      .eq('id', bookId)
  }
}

// GET endpoint to check book status
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const bookId = searchParams.get('bookId')

  if (!bookId) {
    return NextResponse.json({ error: 'Book ID required' }, { status: 400 })
  }

  const supabase = createClient()

  const { data: book, error } = await supabase
    .from('books')
    .select('id, title, subtitle, status, cover_image_url, epub_url, created_at')
    .eq('id', bookId)
    .single()

  if (error || !book) {
    return NextResponse.json({ error: 'Book not found' }, { status: 404 })
  }

  return NextResponse.json(book)
}