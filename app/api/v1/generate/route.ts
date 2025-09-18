import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdmin } from '@/lib/supabase'
import { scrapeWebsite } from '@/lib/scraper'
import { generateEbook } from '@/lib/generation/ebook-generator'
import { generatePDF } from '@/lib/generation/pdf-generator'
import { generateEPUB } from '@/lib/generation/epub-generator'
import { sendEbookDeliveryEmail } from '@/lib/sendgrid'
import crypto from 'crypto'

// Validate API key
async function validateAPIKey(request: NextRequest) {
  const apiKey = request.headers.get('x-api-key') || request.headers.get('authorization')?.replace('Bearer ', '')

  if (!apiKey) {
    return { valid: false, error: 'Missing API key' }
  }

  const supabase = createSupabaseAdmin()

  // Hash the API key for comparison
  const keyHash = crypto.createHash('sha256').update(apiKey).digest('hex')

  const { data: key, error } = await supabase
    .from('epub_ai.api_keys')
    .select('*, users(email)')
    .eq('key_hash', keyHash)
    .eq('is_active', true)
    .single()

  if (error || !key) {
    return { valid: false, error: 'Invalid API key' }
  }

  // Update last used timestamp
  await supabase
    .from('epub_ai.api_keys')
    .update({ last_used: new Date().toISOString() })
    .eq('id', key.id)

  return { valid: true, client: key }
}

export async function POST(request: NextRequest) {
  try {
    // Validate API key
    const auth = await validateAPIKey(request)
    if (!auth.valid) {
      return NextResponse.json(
        { error: auth.error },
        { status: 401 }
      )
    }

    const { websiteUrl, tier = 'starter', webhookUrl, email } = await request.json()

    // Validate input
    if (!websiteUrl) {
      return NextResponse.json(
        { error: 'Missing required field: websiteUrl' },
        { status: 400 }
      )
    }

    if (!['starter', 'professional'].includes(tier)) {
      return NextResponse.json(
        { error: 'Invalid tier. Must be "starter" or "professional"' },
        { status: 400 }
      )
    }

    const supabase = createSupabaseAdmin()

    // Create order
    const { data: order, error: orderError } = await supabase
      .from('epub_ai.orders')
      .insert({
        user_id: auth.client.user_id,
        amount: tier === 'starter' ? 49900 : 99900,
        tier,
        website_url: websiteUrl,
        status: 'paid', // API orders are pre-paid
        paid_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (orderError || !order) {
      return NextResponse.json(
        { error: 'Failed to create order' },
        { status: 500 }
      )
    }

    // Create ebook record
    const { data: ebookRecord, error: ebookError } = await supabase
      .from('epub_ai.ebooks')
      .insert({
        order_id: order.id,
        user_id: auth.client.user_id,
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

    // Start generation in background
    generateAPIEbook(
      order.id,
      ebookRecord.id,
      websiteUrl,
      tier,
      auth.client.user_id,
      email || auth.client.users?.email,
      webhookUrl
    )

    return NextResponse.json({
      success: true,
      orderId: order.id,
      ebookId: ebookRecord.id,
      message: 'eBook generation started',
      estimatedTime: '5 minutes',
      statusUrl: `${process.env.NEXT_PUBLIC_URL}/api/v1/status/${ebookRecord.id}`,
      webhookUrl: webhookUrl || null,
    })
  } catch (error) {
    console.error('API generate error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function generateAPIEbook(
  orderId: string,
  ebookId: string,
  websiteUrl: string,
  tier: 'starter' | 'professional',
  userId: string,
  email: string | undefined,
  webhookUrl: string | undefined
) {
  const supabase = createSupabaseAdmin()

  try {
    // Scrape website
    const companyData = await scrapeWebsite(websiteUrl)

    // Generate ebook
    const ebook = await generateEbook(companyData, orderId, tier)

    // Generate PDF
    const pdfBuffer = await generatePDF(ebook)

    // Upload PDF
    const pdfFileName = `${userId}/${ebookId}/ebook.pdf`
    await supabase.storage
      .from('epub-ai')
      .upload(pdfFileName, pdfBuffer, {
        contentType: 'application/pdf',
        upsert: true,
      })

    const pdfUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/epub-ai/${pdfFileName}`

    // Generate EPUB
    const epubBuffer = await generateEPUB(ebook)

    // Upload EPUB
    const epubFileName = `${userId}/${ebookId}/ebook.epub`
    await supabase.storage
      .from('epub-ai')
      .upload(epubFileName, epubBuffer, {
        contentType: 'application/epub+zip',
        upsert: true,
      })

    const epubUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/epub-ai/${epubFileName}`

    // Update ebook record
    await supabase
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

    // Update order
    await supabase
      .from('epub_ai.orders')
      .update({
        status: 'completed',
        completed_at: new Date().toISOString(),
      })
      .eq('id', orderId)

    // Send email if provided
    if (email) {
      await sendEbookDeliveryEmail(email, {
        title: ebook.title,
        subtitle: ebook.subtitle,
        pdfUrl,
        epubUrl,
        companyName: companyData.companyName,
      })
    }

    // Call webhook if provided
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'ebook.completed',
            orderId,
            ebookId,
            data: {
              title: ebook.title,
              subtitle: ebook.subtitle,
              pdfUrl,
              epubUrl,
              pageCount: ebook.metadata.pageCount,
            },
          }),
        })
      } catch (webhookError) {
        console.error('Webhook call failed:', webhookError)
      }
    }
  } catch (error) {
    console.error('API ebook generation failed:', error)

    // Update status to failed
    await supabase
      .from('epub_ai.ebooks')
      .update({ status: 'failed' })
      .eq('id', ebookId)

    await supabase
      .from('epub_ai.orders')
      .update({ status: 'failed' })
      .eq('id', orderId)

    // Call webhook with failure if provided
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'ebook.failed',
            orderId,
            ebookId,
            error: 'Generation failed',
          }),
        })
      } catch (webhookError) {
        console.error('Webhook call failed:', webhookError)
      }
    }
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'ePub.AI API v1',
    endpoints: {
      generate: 'POST /api/v1/generate',
      status: 'GET /api/v1/status/:ebookId',
      ebooks: 'GET /api/v1/ebooks',
    },
    documentation: 'https://epub.ai/docs/api',
  })
}