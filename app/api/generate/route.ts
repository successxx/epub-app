import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServer, createSupabaseAdmin } from '@/lib/supabase'
import { scrapeWebsite } from '@/lib/scraper'
import { generateEbook } from '@/lib/generation/ebook-generator'
import { generatePDF } from '@/lib/generation/pdf-generator'
import { generateEPUB } from '@/lib/generation/epub-generator'
import { sendEbookDeliveryEmail } from '@/lib/sendgrid'

export async function POST(request: NextRequest) {
  try {
    const { orderId, websiteUrl } = await request.json()

    if (!orderId || !websiteUrl) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Get user
    const supabase = await createSupabaseServer()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get order details
    const adminSupabase = createSupabaseAdmin()
    const { data: order, error: orderError } = await adminSupabase
      .from('epub_ai.orders')
      .select('*')
      .eq('id', orderId)
      .eq('user_id', user.id)
      .single()

    if (orderError || !order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    if (order.status !== 'paid') {
      return NextResponse.json(
        { error: 'Payment not completed' },
        { status: 400 }
      )
    }

    // Update order with website URL and processing status
    await adminSupabase
      .from('epub_ai.orders')
      .update({
        website_url: websiteUrl,
        status: 'processing',
      })
      .eq('id', orderId)

    // Create ebook record
    const { data: ebookRecord, error: ebookError } = await adminSupabase
      .from('epub_ai.ebooks')
      .insert({
        order_id: orderId,
        user_id: user.id,
        title: 'Generating...',
        status: 'generating',
      })
      .select()
      .single()

    if (ebookError || !ebookRecord) {
      return NextResponse.json(
        { error: 'Failed to create ebook record' },
        { status: 500 }
      )
    }

    // Start background generation
    generateInBackground(orderId, websiteUrl, order.tier, user.email, ebookRecord.id)

    return NextResponse.json({
      success: true,
      message: 'Generation started',
      ebookId: ebookRecord.id,
    })
  } catch (error) {
    console.error('Generation error:', error)
    return NextResponse.json(
      { error: 'Failed to start generation' },
      { status: 500 }
    )
  }
}

async function generateInBackground(
  orderId: string,
  websiteUrl: string,
  tier: 'starter' | 'professional',
  userEmail: string | undefined,
  ebookId: string
) {
  const adminSupabase = createSupabaseAdmin()

  try {
    // Update progress: Scraping website
    await updateProgress(adminSupabase, ebookId, 'Analyzing your website', 10)

    // Scrape website
    const companyData = await scrapeWebsite(websiteUrl)

    // Save company analysis
    await adminSupabase
      .from('epub_ai.company_analysis')
      .upsert({
        website_url: websiteUrl,
        scraped_data: companyData,
        analysis: companyData,
        variables: companyData,
        updated_at: new Date().toISOString(),
      })
      .eq('website_url', websiteUrl)

    // Update progress: Generating content
    await updateProgress(adminSupabase, ebookId, 'Generating ebook content with AI', 20)

    // Generate ebook content
    const ebook = await generateEbook(companyData, orderId, tier)

    // Update progress: Creating PDF
    await updateProgress(adminSupabase, ebookId, 'Creating PDF version', 85)

    // Generate PDF
    const pdfBuffer = await generatePDF(ebook)

    // Upload PDF to Supabase storage
    const pdfFileName = `${user.id}/${ebookId}/ebook.pdf`
    const { error: pdfUploadError } = await adminSupabase.storage
      .from('epub-ai')
      .upload(pdfFileName, pdfBuffer, {
        contentType: 'application/pdf',
        upsert: true,
      })

    if (pdfUploadError) {
      throw new Error('Failed to upload PDF')
    }

    const pdfUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/epub-ai/${pdfFileName}`

    // Update progress: Creating EPUB
    await updateProgress(adminSupabase, ebookId, 'Creating EPUB version', 90)

    // Generate EPUB
    const epubBuffer = await generateEPUB(ebook)

    // Upload EPUB to Supabase storage
    const epubFileName = `${user.id}/${ebookId}/ebook.epub`
    const { error: epubUploadError } = await adminSupabase.storage
      .from('epub-ai')
      .upload(epubFileName, epubBuffer, {
        contentType: 'application/epub+zip',
        upsert: true,
      })

    if (epubUploadError) {
      throw new Error('Failed to upload EPUB')
    }

    const epubUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/epub-ai/${epubFileName}`

    // Update ebook record
    await adminSupabase
      .from('epub_ai.ebooks')
      .update({
        title: ebook.title,
        subtitle: ebook.subtitle,
        company_data: companyData,
        generation_data: ebook.metadata,
        pdf_url: pdfUrl,
        epub_url: epubUrl,
        page_count: ebook.metadata.pageCount,
        status: 'completed',
        completed_at: new Date().toISOString(),
      })
      .eq('id', ebookId)

    // Update order status
    await adminSupabase
      .from('epub_ai.orders')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
      })
      .eq('id', orderId)

    // Update progress: Sending email
    await updateProgress(adminSupabase, ebookId, 'Sending your ebook via email', 95)

    // Send email with download links
    if (userEmail) {
      await sendEbookDeliveryEmail(userEmail, {
        title: ebook.title,
        subtitle: ebook.subtitle,
        pdfUrl,
        epubUrl,
        companyName: companyData.companyName,
      })

      // Mark as sent
      await adminSupabase
        .from('epub_ai.ebooks')
        .update({ sent_via_email: true })
        .eq('id', ebookId)
    }

    // Final progress update
    await updateProgress(adminSupabase, ebookId, 'Generation complete!', 100)
  } catch (error) {
    console.error('Background generation error:', error)

    // Update ebook status to failed
    await adminSupabase
      .from('epub_ai.ebooks')
      .update({
        status: 'failed',
        completed_at: new Date().toISOString(),
      })
      .eq('id', ebookId)

    // Update order status to failed
    await adminSupabase
      .from('epub_ai.orders')
      .update({ status: 'failed' })
      .eq('id', orderId)

    // Update progress
    await updateProgress(adminSupabase, ebookId, 'Generation failed. Please try again.', 0)
  }
}

async function updateProgress(
  supabase: any,
  ebookId: string,
  message: string,
  percentage: number
) {
  await supabase
    .from('epub_ai.generation_progress')
    .insert({
      ebook_id: ebookId,
      step: message,
      message,
      percentage,
    })
}