import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseServer } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const orderId = searchParams.get('orderId')
    const ebookId = searchParams.get('ebookId')

    if (!orderId && !ebookId) {
      return NextResponse.json(
        { error: 'Missing orderId or ebookId' },
        { status: 400 }
      )
    }

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

    let ebook

    if (ebookId) {
      // Get ebook by ID
      const { data, error } = await supabase
        .from('epub_ai.ebooks')
        .select('*')
        .eq('id', ebookId)
        .eq('user_id', user.id)
        .single()

      if (error || !data) {
        return NextResponse.json(
          { error: 'Ebook not found' },
          { status: 404 }
        )
      }

      ebook = data
    } else if (orderId) {
      // Get ebook by order ID
      const { data, error } = await supabase
        .from('epub_ai.ebooks')
        .select('*')
        .eq('order_id', orderId)
        .eq('user_id', user.id)
        .single()

      if (error || !data) {
        return NextResponse.json(
          { error: 'Ebook not found for this order' },
          { status: 404 }
        )
      }

      ebook = data
    }

    // Get latest progress
    const { data: progress } = await supabase
      .from('epub_ai.generation_progress')
      .select('*')
      .eq('ebook_id', ebook.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .single()

    // Get all progress for history
    const { data: progressHistory } = await supabase
      .from('epub_ai.generation_progress')
      .select('*')
      .eq('ebook_id', ebook.id)
      .order('created_at', { ascending: true })

    return NextResponse.json({
      status: ebook.status,
      percentage: progress?.percentage || 0,
      message: progress?.message || 'Starting generation...',
      ebook: ebook.status === 'completed' ? {
        id: ebook.id,
        title: ebook.title,
        subtitle: ebook.subtitle,
        pdfUrl: ebook.pdf_url,
        epubUrl: ebook.epub_url,
        pageCount: ebook.page_count,
        completedAt: ebook.completed_at,
      } : null,
      history: progressHistory || [],
    })
  } catch (error) {
    console.error('Progress check error:', error)
    return NextResponse.json(
      { error: 'Failed to check progress' },
      { status: 500 }
    )
  }
}