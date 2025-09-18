import { NextRequest, NextResponse } from 'next/server'
import { createSupabaseAdmin } from '@/lib/supabase'
import { cleanFilename } from '@/lib/services/bookCleanup'

export async function GET(
  request: NextRequest,
  { params }: { params: { bookId: string } }
) {
  try {
    const { bookId } = params

    if (!bookId) {
      return NextResponse.json({ error: 'Book ID required' }, { status: 400 })
    }

    const supabase = createSupabaseAdmin()

    // Get book data
    const { data: book, error } = await supabase
      .from('books')
      .select('title, epub_url, user_id, book_type')
      .eq('id', bookId)
      .single()

    if (error || !book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 })
    }

    // Verify book is complete
    if (!book.epub_url) {
      return NextResponse.json({ error: 'Book is still generating' }, { status: 202 })
    }

    // Extract base64 data from data URL
    const base64Match = book.epub_url.match(/^data:application\/epub\+zip;base64,(.+)$/)
    if (!base64Match) {
      return NextResponse.json({ error: 'Invalid EPUB format' }, { status: 500 })
    }

    // Convert base64 to buffer
    const epubBuffer = Buffer.from(base64Match[1], 'base64')

    // Generate clean filename
    const filename = `${cleanFilename(book.title)}.epub`

    // Return EPUB file
    return new NextResponse(epubBuffer, {
      headers: {
        'Content-Type': 'application/epub+zip',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': epubBuffer.length.toString(),
        'Cache-Control': 'private, max-age=3600'
      }
    })
  } catch (error) {
    console.error('Download error:', error)
    return NextResponse.json(
      { error: 'Failed to download book' },
      { status: 500 }
    )
  }
}