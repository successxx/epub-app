-- Create epub_books table
CREATE TABLE IF NOT EXISTS epub_books (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subtitle TEXT,
    company_name TEXT NOT NULL,
    company_data JSONB,
    book_type TEXT CHECK (book_type IN ('basic', 'premium')),
    chapters_count INTEGER,
    file_path TEXT,
    cover_image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create epub_sessions table
CREATE TABLE IF NOT EXISTS epub_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    book_id UUID REFERENCES epub_books(id) ON DELETE CASCADE,
    stripe_session_id TEXT UNIQUE,
    customer_email TEXT,
    customer_name TEXT,
    payment_status TEXT,
    amount INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create epub_book_purchases table
CREATE TABLE IF NOT EXISTS epub_book_purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    book_id UUID REFERENCES epub_books(id) ON DELETE CASCADE,
    session_id UUID REFERENCES epub_sessions(id) ON DELETE CASCADE,
    customer_email TEXT NOT NULL,
    customer_name TEXT,
    purchase_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    book_type TEXT CHECK (book_type IN ('basic', 'premium')),
    amount_paid INTEGER,
    stripe_payment_id TEXT,
    email_sent BOOLEAN DEFAULT false,
    email_sent_at TIMESTAMP WITH TIME ZONE
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_epub_books_created_at ON epub_books(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_epub_sessions_stripe_id ON epub_sessions(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_epub_sessions_book_id ON epub_sessions(book_id);
CREATE INDEX IF NOT EXISTS idx_epub_purchases_email ON epub_book_purchases(customer_email);
CREATE INDEX IF NOT EXISTS idx_epub_purchases_book_id ON epub_book_purchases(book_id);

-- Add RLS policies
ALTER TABLE epub_books ENABLE ROW LEVEL SECURITY;
ALTER TABLE epub_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE epub_book_purchases ENABLE ROW LEVEL SECURITY;

-- Allow anonymous read for books (for download links)
CREATE POLICY "Books are viewable by anyone" ON epub_books
    FOR SELECT USING (true);

-- Allow service role full access
CREATE POLICY "Service role has full access to books" ON epub_books
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to sessions" ON epub_sessions
    FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to purchases" ON epub_book_purchases
    FOR ALL USING (auth.role() = 'service_role');